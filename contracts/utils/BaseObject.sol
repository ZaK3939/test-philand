// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { MultiOwner } from "../utils/MultiOwner.sol";
import { IERC2981 } from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @dev Contracts to manage base Objects.
 */
abstract contract BaseObject is MultiOwner, IERC2981, ReentrancyGuard {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    string public name;
    string public symbol;
    string public baseMetadataURI;
    /* -------------------------------- ROYALTIES ------------------------------- */
    address payable public treasuryAddress;
    uint256 public royalityFee;
    uint256 public secondaryRoyalty;
    uint256 public paymentBalanceOwner;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   STORAGE                                  */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- OBJECT -------------------------------- */
    struct Size {
        uint8 x;
        uint8 y;
        uint8 z;
    }
    struct Objects {
        string tokenURI;
        Size size;
        address payable creator;
        uint256 maxClaimed;
        uint256 price;
        bool forSale;
    }
    mapping(uint256 => Objects) public allObjects;
    mapping(uint256 => bool) public created;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event SetbaseMetadataURI(string baseuri);
    event SetMaxClaimed(uint256 tokenId, uint256 newMaxClaimed);
    event SetTokenURI(uint256 tokenId, string _uri);
    event SetSize(uint256 tokenId, uint8 x, uint8 y, uint8 z);
    event SetCreator(uint256 tokenId, address payable _creator);
    event ChangeTokenPrice(uint256 tokenId, uint256 _newPrice);
    event SetRoyalityFee(uint256 _royalityFee);
    event SetSecondaryRoyalityFee(uint256 _secondaryRoyalty);
    event SetTreasuryAddress(address payable _treasuryAddress);
    event PaymentWithdrawnOwner(uint256 amount);
    event PaymentReceivedOwner(uint256 amount);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    error InvalidTokenID();
    error ExistentToken();
    error NonExistentToken();
    error NoSetTokenSize();
    error PaymentBalanceZero();

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   OBJECT                                   */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- SETTER --------------------------------- */
    function setbaseMetadataURI(string memory _baseMetadataURI) external onlyOwner {
        baseMetadataURI = _baseMetadataURI;
        emit SetbaseMetadataURI(_baseMetadataURI);
    }

    function setMaxClaimed(uint256 tokenId, uint256 _newMaxClaimed) public virtual onlyOwner {
        allObjects[tokenId].maxClaimed = _newMaxClaimed;
        emit SetMaxClaimed(tokenId, _newMaxClaimed);
    }

    function setTokenURI(uint256 tokenId, string memory _uri) public virtual onlyOwner {
        allObjects[tokenId].tokenURI = _uri;
        emit SetTokenURI(tokenId, _uri);
    }

    function setSize(uint256 tokenId, Size memory _size) public virtual onlyOwner {
        allObjects[tokenId].size = _size;
        emit SetSize(tokenId, _size.x, _size.y, _size.z);
    }

    function setCreator(uint256 tokenId, address payable _creator) public virtual onlyOwner {
        allObjects[tokenId].creator = _creator;
        emit SetCreator(tokenId, _creator);
    }

    function changeTokenPrice(uint256 tokenId, uint256 _newPrice) public onlyOwner {
        // update token's price with new price
        allObjects[tokenId].price = _newPrice;
        emit ChangeTokenPrice(tokenId, _newPrice);
    }

    /* --------------------------------- GETTER --------------------------------- */
    function getBaseMetadataURI() public view returns (string memory) {
        return baseMetadataURI;
    }

    function getMaxClaimed(uint256 tokenId) public view virtual returns (uint256) {
        return allObjects[tokenId].maxClaimed;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return allObjects[tokenId].tokenURI;
    }

    function getSize(uint256 tokenId) public view returns (Size memory) {
        if (allObjects[tokenId].size.x == 0) revert NoSetTokenSize();
        return allObjects[tokenId].size;
    }

    function getCreator(uint256 tokenId) public view returns (address payable) {
        return allObjects[tokenId].creator;
    }

    function getTokenPrice(uint256 tokenId) public view returns (uint256) {
        return allObjects[tokenId].price;
    }

    /* -------------------------------------------------------------------------- */
    /*                                  ROYALTIES                                 */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- PUBLIC --------------------------------- */
    /// @notice EIP2981 royalty standard
    function royaltyInfo(uint256, uint256 salePrice) external view returns (address receiver, uint256 royaltyAmount) {
        return (address(this), (salePrice * secondaryRoyalty) / 10000);
    }

    /// @notice Receive royalties
    receive() external payable {
        addToOwnerBalance(msg.value);
    }

    /// @notice Adds funds to the payment balance for the owner.
    /// @param amount The amount to add to the balance.
    function addToOwnerBalance(uint256 amount) internal {
        emit PaymentReceivedOwner(amount);
        paymentBalanceOwner += amount;
    }

    /* ---------------------------------- ADMIN --------------------------------- */
    function setRoyalityFee(uint256 _royalityFee) public onlyOwner {
        royalityFee = _royalityFee;
        emit SetRoyalityFee(_royalityFee);
    }

    function setSecondaryRoyalityFee(uint256 _secondaryRoyalty) public onlyOwner {
        secondaryRoyalty = _secondaryRoyalty;
        emit SetSecondaryRoyalityFee(_secondaryRoyalty);
    }

    function setTreasuryAddress(address payable _treasuryAddress) public onlyOwner {
        treasuryAddress = _treasuryAddress;
        emit SetTreasuryAddress(_treasuryAddress);
    }

    /// @notice Sends you your full available balance.
    /// @param withdrawTo The address to send the balance to.
    function withdrawOwnerBalance(address withdrawTo) external onlyOwner nonReentrant {
        if (paymentBalanceOwner == 0) revert PaymentBalanceZero();
        uint256 balance = paymentBalanceOwner;
        paymentBalanceOwner = 0;

        (bool success, ) = withdrawTo.call{ value: balance }("");
        if (!success) revert PaymentBalanceZero();

        emit PaymentWithdrawnOwner(balance);
    }
    /* --------------------------------- ****** --------------------------------- */
}
