// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { BaseObject } from "../utils/BaseObject.sol";

// FreeObjects smart contract inherits ERC1155 interface
contract FreeObject is ERC1155Supply, BaseObject {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    // initialize contract while deployment with contract's collection name and token
    constructor(address payable _treasuryAddress) ERC1155("") {
        name = "FreeObjects";
        symbol = "FOS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        secondaryRoyalty = 100;
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
     * @dev check that token is already created and init object settings
     */
    function initObject(
        uint256 tokenId,
        string memory _uri,
        Size calldata _size,
        address payable _creator
    ) external onlyOwner {
        if (!created[tokenId]) revert InvalidTokenID();
        setMaxClaimed(tokenId, 9999999999);
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
     * @dev check that token is not created and set object settings
     */
    function createObject(
        uint256 tokenId,
        string memory _uri,
        Size calldata _size,
        address payable _creator
    ) external onlyOwner {
        if (exists(tokenId)) revert ExistentToken();
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        changeTokenPrice(tokenId, 0);
        allObjects[tokenId].forSale = true;
        created[tokenId] = true;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                SHOP METHOD                                 */
    /* -------------------------------------------------------------------------- */
    /*
     * @title  getFreeObject
     * @notice mint Object to token buyer
     * @param tokenId : object nft token_id
     * @dev pay royality to phi wallet and creator
     */
    function getFreeObject(uint256 tokenId) public {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        // token should be for sale
        require(allObjects[tokenId].forSale);
        // check if the token id of the token exists
        isValid(tokenId);
        // check token's MaxClaimed
        // require(super.totalSupply(tokenId) <= allObjects[tokenId].maxClaimed);
        // mint the token
        super._mint(msg.sender, tokenId, 1, "0x00");
    }

    function batchGetFreeObject(uint256[] memory tokenIds) public {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            getFreeObject(tokenIds[i]);
        }
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  ERC1155                                   */
    /* -------------------------------------------------------------------------- */
    function mintBatchObject(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyOwner {
        super._mintBatch(to, ids, amounts, data);
    }
}
