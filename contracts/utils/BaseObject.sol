// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { MultiOwner } from "../utils/MultiOwner.sol";

/**
 * @dev Contracts to manage base Objects.
 */
abstract contract BaseObject is MultiOwner {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    string public name;
    string public symbol;
    string public baseMetadataURI;
    uint256 public royalityFee;
    address payable public treasuryAddress;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   STORAGE                                  */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- OBJECT --------------------------------- */
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
    event SetSize(uint256 tokenId, Size _size);
    event SetCreator(uint256 tokenId, address payable _creator);
    event ChangeTokenPrice(uint256 tokenId, uint256 _newPrice);
    event SetRoyalityFee(uint256 _royalityFee);
    event SetTreasuryAddress(address payable _treasuryAddress);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    error InvalidTokenID();
    error ExistentToken();
    error NonExistentToken();
    error NoSetTokenSize();

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   OBJECT                                   */
    /* -------------------------------------------------------------------------- */

    function getBaseMetadataURI() public view returns (string memory) {
        return baseMetadataURI;
    }

    function setbaseMetadataURI(string memory baseuri) external onlyOwner {
        baseMetadataURI = baseuri;
        emit SetbaseMetadataURI(baseuri);
    }

    /**
     * @dev Returns the maxClaimed
     */
    function getMaxClaimed(uint256 tokenId) public view virtual returns (uint256) {
        return allObjects[tokenId].maxClaimed;
    }

    /**
     * @dev Set the new maxClaimed
     */
    function setMaxClaimed(uint256 tokenId, uint256 newMaxClaimed) public virtual onlyOwner {
        allObjects[tokenId].maxClaimed = newMaxClaimed;
        emit SetMaxClaimed(tokenId, newMaxClaimed);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return allObjects[tokenId].tokenURI;
    }

    function setTokenURI(uint256 tokenId, string memory _uri) public virtual onlyOwner {
        allObjects[tokenId].tokenURI = _uri;
        emit SetTokenURI(tokenId, _uri);
    }

    function getSize(uint256 tokenId) public view returns (Size memory) {
        if (allObjects[tokenId].size.x == 0) revert NoSetTokenSize();
        return allObjects[tokenId].size;
    }

    function setSize(uint256 tokenId, Size memory _size) public virtual onlyOwner {
        allObjects[tokenId].size = _size;
        emit SetSize(tokenId, _size);
    }

    function getCreator(uint256 tokenId) public view returns (address payable) {
        return allObjects[tokenId].creator;
    }

    function setCreator(uint256 tokenId, address payable _creator) public virtual onlyOwner {
        allObjects[tokenId].creator = _creator;
        emit SetCreator(tokenId, _creator);
    }

    function getTokenPrice(uint256 tokenId) public view returns (uint256) {
        return allObjects[tokenId].price;
    }

    function changeTokenPrice(uint256 tokenId, uint256 _newPrice) public onlyOwner {
        // update token's price with new price
        allObjects[tokenId].price = _newPrice;
        emit ChangeTokenPrice(tokenId, _newPrice);
    }

    function setRoyalityFee(uint256 _royalityFee) public onlyOwner {
        royalityFee = _royalityFee;
        emit SetRoyalityFee(_royalityFee);
    }

    function setTreasuryAddress(address payable _treasuryAddress) public onlyOwner {
        treasuryAddress = _treasuryAddress;
        emit SetTreasuryAddress(_treasuryAddress);
    }
}
