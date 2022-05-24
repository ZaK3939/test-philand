// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { BaseObject } from "../utils/BaseObject.sol";

// PremiumObjects smart contract inherits ERC1155 interface
contract PremiumObject is ERC1155Supply, BaseObject {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event InitObject(
        uint256 tokenId,
        string _uri,
        Size _size,
        address payable _creator,
        uint256 _maxClaimed,
        uint256 _price
    );
    event CreateObject(
        uint256 tokenId,
        string _uri,
        Size _size,
        address payable _creator,
        uint256 _maxClaimed,
        uint256 _price
    );
    event LogbuyObject(address indexed sender, uint256 tokenId, uint256 value);

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    // initialize contract while deployment with contract's collection name and token
    constructor(address payable _treasuryAddress) ERC1155("") {
        name = "PaidObjects";
        symbol = "POS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        royalityFee = 3000;
        secondaryRoyalty = 100;
    }

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
     * @param _price : object price
     * @dev check that token is already created and init object settings
     */
    function initObject(
        uint256 tokenId,
        string memory _uri,
        Size memory _size,
        address payable _creator,
        uint256 _maxClaimed,
        uint256 _price
    ) external onlyOwner {
        if (!created[tokenId]) revert InvalidTokenID();
        setMaxClaimed(tokenId, _maxClaimed);
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        changeTokenPrice(tokenId, _price);
        emit InitObject(tokenId, _uri, _size, _creator, _maxClaimed, _price);
    }

    /*
     * @title createObject
     * @notice create object for first time
     * @param tokenId : object nft tokenId
     * @param _uri : baseMetadataURI + _url
     * @param _size : object's size
     * @param _creator : creator address, 0 also allowed.
     * @param _maxClaimed : Maximum number
     * @param _price : object price
     * @dev check that token is not created and set object settings
     */
    function createObject(
        uint256 tokenId,
        string memory _uri,
        Size memory _size,
        address payable _creator,
        uint256 _maxClaimed,
        uint256 _price
    ) external onlyOwner {
        if (exists(tokenId)) revert ExistentToken();
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
        setMaxClaimed(tokenId, _maxClaimed);
        changeTokenPrice(tokenId, _price);
        allObjects[tokenId].forSale = true;
        created[tokenId] = true;
        emit CreateObject(tokenId, _uri, _size, _creator, _maxClaimed, _price);
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                SHOP METHOD                                 */
    /* -------------------------------------------------------------------------- */
    /*
     * @title buyObject
     * @notice mint Object to token buyer
     * @param tokenId : object nft token_id
     * @dev pay royality to phi wallet and creator
     */
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
        uint256 royality = (msg.value * royalityFee) / 10000;
        (bool success1, ) = payable(allObjects[tokenId].creator).call{ value: royality }("");
        require(success1);

        (bool success2, ) = payable(treasuryAddress).call{ value: (msg.value - royality) }("");
        require(success2);
        // mint the token
        super._mint(msg.sender, tokenId, 1, "0x");
        emit LogbuyObject(msg.sender, tokenId, msg.value);
    }
    /* --------------------------------- ****** --------------------------------- */
}
