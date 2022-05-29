// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import { BaseObject } from "../utils/BaseObject.sol";
import "../utils/Strings.sol";
import "hardhat/console.sol";

contract PhiObject is ERC1155Supply, BaseObject {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    constructor(address payable _treasuryAddress) ERC1155("") {
        name = "Standard Object";
        symbol = "OPS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        secondaryRoyalty = 500;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  TOKEN URI                                 */
    /* -------------------------------------------------------------------------- */
    function uri(uint256 tokenId) public view override returns (string memory) {
        if (!created[tokenId]) revert InvalidTokenID();
        return string(abi.encodePacked(baseMetadataURI, getTokenURI(tokenId)));
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                OBJECT METHOD                               */
    /* -------------------------------------------------------------------------- */
    /* Utility Functions */
    function isValid(uint256 tokenId) internal view {
        // Validate that the token is within range when querying
        if (tokenId <= 0 || totalSupply(tokenId) >= allObjects[tokenId].maxClaimed) revert InvalidTokenID();
        if (!created[tokenId]) revert InvalidTokenID();
    }

    /*
     * @title initObject
     * @notice init object for already created token
     * @param tokenId : object nft tokenId
     * @param _uri : baseMetadataURI + _url
     * @param _size : object's size
     * @param _creator : creator address, 0 also allowed.
     * @param _maxClaimed : Maximum number
     * @dev check that token is already created and init object settings
     */
    function initObject(
        uint256 tokenId,
        string memory _uri,
        Size calldata _size,
        address payable _creator,
        uint256 _maxClaimed
    ) external onlyOwner {
        if (!created[tokenId]) revert InvalidTokenID();
        setMaxClaimed(tokenId, _maxClaimed);
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        changeTokenPrice(tokenId, 0);
    }

    /*
     * @title createObject
     * @notice create object for first time
     * @param tokenId : object nft tokenId
     * @param _uri : baseMetadataURI + _url
     * @param _size : object's size
     * @param _creator : creator address, 0 also allowed.
     * @param _maxClaimed : Maximum number
     * @dev check that token is not created and set object settings
     */
    function createObject(
        uint256 tokenId,
        string memory _uri,
        Size memory _size,
        address payable _creator,
        uint256 _maxClaimed
    ) external onlyOwner {
        if (exists(tokenId)) revert ExistentToken();
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        setMaxClaimed(tokenId, _maxClaimed);
        changeTokenPrice(tokenId, 0);
        allObjects[tokenId].forSale = true;
        created[tokenId] = true;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                QUEST METHOD                                */
    /* -------------------------------------------------------------------------- */
    /*
     * @title getPhiObject
     * @notice mint Object to receiver who passed condition
     * @param to : receiver address
     * @param tokenId : object nft token_id
     * @dev onlyOwnerMethod. generally, this method is invoked by phiClaim contract
     */
    function getPhiObject(address to, uint256 tokenId) public onlyOwner {
        // check if the function caller is not an zero account address
        require(to != address(0));
        // token should be for sale
        require(allObjects[tokenId].forSale);
        // check if the token id of the token exists
        isValid(tokenId);
        // check token's MaxClaimed
        require(super.totalSupply(tokenId) <= allObjects[tokenId].maxClaimed);
        // mint the token
        super._mint(to, tokenId, 1, "0x00");
    }
}
