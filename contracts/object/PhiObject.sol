// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.8;

// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import { MultiOwner } from "../utils/MultiOwner.sol";
import "../utils/Strings.sol";
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
    mapping(uint256 => uint256) private maxClaimed;
    // Errors
    error InvalidTokenID();
    error NonExistentToken();
    error NoSetTokenSize();

    constructor() public ERC1155("") {
        baseMetadataURI = "https://www.arweave.net/";
    }

    /**
     * @dev Returns the maxClaimed
     */
    function getMaxClaimed(uint256 tokenId) public view virtual returns (uint256) {
        return maxClaimed[tokenId];
    }

    /**
     * @dev Set the new maxClaimed
     */
    function setMaxClaimed(uint256 tokenId, uint256 newMaxClaimed) public virtual onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        maxClaimed[tokenId] = newMaxClaimed;
    }

    function getSize(uint256 tokenId) public view returns (Size memory) {
        if (!exists(tokenId)) revert NonExistentToken();
        Size memory size = objectSize[tokenId];
        if (size.x == 0) revert NoSetTokenSize();
        return objectSize[tokenId];
    }

    function setSize(uint256 tokenId, Size calldata size) public virtual onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        objectSize[tokenId] = size;
    }

    function getBaseMetadataURI() public view returns (string memory) {
        return baseMetadataURI;
    }

    function setbaseMetadataURI(string memory baseuri) external onlyOwner {
        baseMetadataURI = baseuri;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        if (!exists(tokenId)) revert NonExistentToken();
        return tokenURL[tokenId];
    }

    function setTokenURI(uint256 tokenId, string memory _uri) public virtual onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        tokenURL[tokenId] = _uri;
    }

    function initToken(
        uint256 tokenId,
        uint256 newMaxClaimed,
        string memory _uri,
        Size calldata size
    ) external onlyOwner {
        setMaxClaimed(tokenId, newMaxClaimed);
        setTokenURI(tokenId, _uri);
        setSize(tokenId, size);
    }

    /* Utility Functions */
    function isValid(uint256 tokenId) internal view {
        // Validate that the token is within range when querying
        if (tokenId <= 0 || totalSupply(tokenId) >= maxClaimed[tokenId]) revert InvalidTokenID();
        if (!exists(tokenId)) revert NonExistentToken();
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        if (!exists(tokenId)) revert NonExistentToken();
        return string(abi.encodePacked(baseMetadataURI, getTokenURI(tokenId)));
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
        // todo for loop check token supply
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
