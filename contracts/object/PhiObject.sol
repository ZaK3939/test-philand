// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.8;

// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import { MultiOwner } from "../utils/MultiOwner.sol";
import { BaseObject } from "../utils/BaseObject.sol";
import "../utils/Strings.sol";
import "hardhat/console.sol";

contract PhiObject is ERC1155Supply, MultiOwner, BaseObject {
    constructor(address payable _treasuryAddress) ERC1155("") {
        name = "Onchain PhiObjects";
        symbol = "OOS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        if (!exists(tokenId)) revert NonExistentToken();
        return string(abi.encodePacked(baseMetadataURI, getTokenURI(tokenId)));
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
        changeTokenPrice(tokenId, 0);
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
        changeTokenPrice(tokenId, 0);
        allObjects[tokenId].forSale = true;
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
}
