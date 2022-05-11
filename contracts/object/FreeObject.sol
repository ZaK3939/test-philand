// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { MultiOwner } from "../utils/MultiOwner.sol";
import { BaseObject } from "../utils/BaseObject.sol";

// FreeObjects smart contract inherits ERC1155 interface
contract FreeObject is ERC1155Supply, MultiOwner, BaseObject {
    // initialize contract while deployment with contract's collection name and token
    constructor(address payable _treasuryAddress) ERC1155("") {
        name = "FreeObjects";
        symbol = "FOS";
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
        address payable _creator
    ) external onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        setMaxClaimed(tokenId, 99999999);
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        changeTokenPrice(tokenId, 0);
        created[tokenId] = true;
    }

    // mint a Object
    function createObject(
        uint256 tokenId,
        string memory _uri,
        Size calldata _size,
        address payable _creator
    ) external onlyOwner {
        // check if thic fucntion caller is not an zero address account
        require(msg.sender != address(0));
        if (exists(tokenId)) revert ExistentToken();
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        changeTokenPrice(tokenId, 0);
        allObjects[tokenId].forSale = true;
        created[tokenId] = true;
    }

    // by a token by passing in the token's id
    function getFreeObject(uint256 tokenId) public payable {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));

        if (!created[tokenId]) revert InvalidTokenID();
        // mint the token
        super._mint(msg.sender, tokenId, 1, "0x00");
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
