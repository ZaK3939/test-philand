// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.8;

// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import { MultiOwner } from "./utils/MultiOwner.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiObject is ERC1155Supply, MultiOwner {
    string public baseMetadataURI;

    struct Size {
        uint8 x;
        uint8 y;
        uint8 z;
    }

    mapping(uint256 => Size) public objectSize;
    mapping(uint256 => string) public tokenURL;
    mapping(uint256 => uint256) private _totalSupply;
    // Limit of supply
    uint256 private maxClaimed = 1000;
    // Errors
    error InvalidTokenID();
    error NonExistentToken();

    constructor() public ERC1155("") MultiOwner() {
        baseMetadataURI = "https://www.arweave.net/";
    }

    /**
     * @dev Returns the maxClaimed
     */
    function getMaxClaimed() public view virtual returns (uint256) {
        return maxClaimed;
    }

    /**
     * @dev Set the new maxClaimed
     */
    function setMaxClaimed(uint256 newMaxClaimed) public virtual onlyOwner {
        maxClaimed = newMaxClaimed;
    }

    function getSize(uint256 tokenId) public view returns (Size memory) {
        return objectSize[tokenId];
    }

    function setSize(uint256 tokenId, Size calldata size) external onlyOwner {
        isValid(tokenId);
        objectSize[tokenId] = size;
    }

    function getBaseMetadataURI() public view returns (string memory) {
        return baseMetadataURI;
    }

    function setbaseMetadataURI(string memory baseuri) external onlyOwner {
        baseMetadataURI = baseuri;
    }

    function getTokenLink(uint256 tokenId) public view returns (string memory) {
        isValid(tokenId);
        return tokenURL[tokenId];
    }

    function setTokenLink(uint256 tokenId, string memory _uri) external onlyOwner {
        isValid(tokenId);
        tokenURL[tokenId] = _uri;
    }

    /* Utility Functions */
    function isValid(uint256 tokenId) internal view {
        // Validate that the token is within range when querying
        if (tokenId <= 0 || tokenId >= maxClaimed) revert InvalidTokenID();
        if (!exists(tokenId)) revert NonExistentToken();
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        if (!exists(tokenId)) revert NonExistentToken();
        return string(abi.encodePacked(baseMetadataURI, getTokenLink(tokenId)));
    }

    function mintObject(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external onlyOwner {
        super._mint(to, id, amount, data);
    }

    function mintBatchObject(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyOwner {
        super._mintBatch(to, ids, amounts, data);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        super.safeTransferFrom(from, to, id, amount, data);
    }
}
