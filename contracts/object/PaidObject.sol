// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { MultiOwner } from "../utils/MultiOwner.sol";
import { BaseObject } from "../utils/BaseObject.sol";

// PaidObjects smart contract inherits ERC1155 interface
contract PaidObject is ERC1155Supply, MultiOwner, BaseObject {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    // initialize contract while deployment with contract's collection name and token
    constructor(address payable _treasuryAddress, uint256 _royalityFee) ERC1155("") {
        name = "PaidObjects";
        symbol = "POS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        royalityFee = _royalityFee;
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

    function initObject(
        uint256 tokenId,
        string memory _uri,
        Size memory _size,
        address payable _creator,
        uint256 _maxClaimed,
        uint256 _price
    ) external onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        setMaxClaimed(tokenId, _maxClaimed);
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        changeTokenPrice(tokenId, _price);
    }

    // mint
    function createObject(
        uint256 tokenId,
        string memory _uri,
        Size memory _size,
        address payable _creator,
        uint256 _maxClaimed,
        uint256 _price
    ) external onlyOwner {
        // check if thic fucntion caller is not an zero address account
        require(msg.sender != address(0));
        if (exists(tokenId)) revert ExistentToken();
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        setMaxClaimed(tokenId, _maxClaimed);
        changeTokenPrice(tokenId, _price);
        allObjects[tokenId].forSale = false;
        created[tokenId] = true;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                SHOP METHOD                                 */
    /* -------------------------------------------------------------------------- */
    // by a token by passing in the token's id
    function buyObject(uint256 tokenId) public payable {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        // check if the token id of the token exists
        isValid(tokenId);
        // price sent in to buy should be equal to or more than the token's price
        require(msg.value >= allObjects[tokenId].price);
        // token should be for sale
        require(allObjects[tokenId].forSale);
        // check token's MaxClaimed
        require(super.totalSupply(tokenId) <= allObjects[tokenId].maxClaimed);

        // Pay royality to artist, and remaining to deployer of contract
        uint256 royality = (msg.value * royalityFee) / 100;
        (bool success1, ) = payable(allObjects[tokenId].creator).call{ value: royality }("");
        require(success1);

        (bool success2, ) = payable(treasuryAddress).call{ value: (msg.value - royality) }("");
        require(success2);
        // mint the token
        super._mint(msg.sender, tokenId, 1, "0x");
    }
}
