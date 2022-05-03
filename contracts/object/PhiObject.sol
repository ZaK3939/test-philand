// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.8;

// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

import { MultiOwner } from "../utils/MultiOwner.sol";
import "../utils/Strings.sol";
import "hardhat/console.sol";

contract PhiObject is ERC1155Supply, IERC2981, MultiOwner {
    string public name;
    string public symbol;
    string public baseMetadataURI;
    uint256 public royalityFee;
    address payable private treasuryAddress;

    struct Size {
        uint8 x;
        uint8 y;
        uint8 z;
    }

    // define object struct
    struct PhiObjects {
        string tokenURI;
        Size size;
        address payable creator;
        uint256 maxClaimed;
    }

    mapping(uint256 => PhiObjects) public allObjects;
    mapping(uint256 => bool) public created;

    event Sale(address from, address to, uint256 value);

    // Errors
    error InvalidTokenID();
    error ExistentToken();
    error NonExistentToken();
    error NoSetTokenSize();

    constructor(address payable _treasuryAddress, uint256 _royalityFee) ERC1155("") {
        name = "Onchain PhiObjects";
        symbol = "OOS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        royalityFee = _royalityFee;
    }

    // EIP2981 standard Interface return. Adds to ERC1155 and ERC165 Interface returns.
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, IERC165) returns (bool) {
        return (interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId));
    }

    // EIP2981 standard royalties return.
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (treasuryAddress, (_salePrice * royalityFee));
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        if (!exists(tokenId)) revert NonExistentToken();
        return string(abi.encodePacked(baseMetadataURI, getTokenURI(tokenId)));
    }

    function getBaseMetadataURI() public view returns (string memory) {
        return baseMetadataURI;
    }

    function setbaseMetadataURI(string memory baseuri) external onlyOwner {
        baseMetadataURI = baseuri;
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
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return allObjects[tokenId].tokenURI;
    }

    function setTokenURI(uint256 tokenId, string memory _uri) public virtual onlyOwner {
        allObjects[tokenId].tokenURI = _uri;
    }

    function getSize(uint256 tokenId) public view returns (Size memory) {
        if (allObjects[tokenId].size.x == 0) revert NoSetTokenSize();
        return allObjects[tokenId].size;
    }

    function setSize(uint256 tokenId, Size calldata _size) public virtual onlyOwner {
        allObjects[tokenId].size = _size;
    }

    function getCreator(uint256 tokenId) public view returns (address payable) {
        return allObjects[tokenId].creator;
    }

    function setCreator(uint256 tokenId, address payable _creator) public virtual onlyOwner {
        allObjects[tokenId].creator = _creator;
    }

    function setRoyalityFee(uint256 _royalityFee) public onlyOwner {
        royalityFee = _royalityFee;
    }

    function setTreasuryAddress(address payable _treasuryAddress) public onlyOwner {
        treasuryAddress = _treasuryAddress;
    }

    function initObject(
        uint256 tokenId,
        string memory _uri,
        Size calldata _size,
        address payable _creator,
        uint256 _maxClaimed
    ) external onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        setMaxClaimed(tokenId, _maxClaimed);
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
    }

    // mint a new Object
    function createObject(
        uint256 tokenId,
        string memory _uri,
        Size calldata _size,
        address payable _creator,
        uint256 _maxClaimed
    ) external onlyOwner {
        // check if thic fucntion caller is not an zero address account
        require(msg.sender != address(0));
        if (exists(tokenId)) revert ExistentToken();
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        setMaxClaimed(tokenId, _maxClaimed);
        created[tokenId] = true;
    }

    /* Utility Functions */
    function isValid(uint256 tokenId) internal view {
        // Validate that the token is within range when querying
        if (tokenId <= 0 || totalSupply(tokenId) >= allObjects[tokenId].maxClaimed) revert InvalidTokenID();
        if (!created[tokenId]) revert InvalidTokenID();
    }

    // by a token by passing in the token's id
    function getPhiObject(address to, uint256 tokenId) public payable {
        // check if the function caller is not an zero account address
        require(to != address(0));
        // check if the token id of the token being bought exists or not
        isValid(tokenId);
        // mint the token
        super._mint(to, tokenId, 1, "0x00");
    }

    function mintBatchObject(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyOwner {
        // todo for loop check token supply
        super._mintBatch(to, ids, amounts, data);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        _payLoyalty(from, to, id);
        super.safeTransferFrom(from, to, id, amount, data);
    }

    function _payLoyalty(
        address from,
        address to,
        uint256 id
    ) internal {
        if (msg.value > 0) {
            uint256 royality = ((msg.value * royalityFee) / 100);
            (bool success1, ) = payable(allObjects[id].creator).call{ value: royality }("");
            require(success1);

            (bool success2, ) = payable(from).call{ value: msg.value - royality }("");
            require(success2);
            emit Sale(from, to, msg.value);
        }
    }
}
