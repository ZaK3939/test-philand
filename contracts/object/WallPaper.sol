// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { BaseObject } from "../utils/BaseObject.sol";

// WallPapers smart contract inherits ERC1155 interface
contract WallPaper is ERC1155Supply, BaseObject {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event InitWallPaper(
        uint256 tokenId,
        string _uri,
        Size _size,
        address payable _creator,
        uint256 _maxClaimed,
        uint256 _price
    );
    event CreateWallPaper(
        uint256 tokenId,
        string _uri,
        Size _size,
        address payable _creator,
        uint256 _maxClaimed,
        uint256 _price
    );
    event LogbuyWallPaper(address indexed sender, uint256 tokenId, uint256 value);

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
        name = "WallPapers";
        symbol = "WALL";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        royalityFee = 3000;
        secondaryRoyalty = 500;
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
     * @title initWallPaper
     * @notice init WallPaper for already created token
     * @param tokenId : WallPaper nft tokenId
     * @param _uri : baseMetadataURI + _url
     * @param _size : WallPaper's size
     * @param _creator : creator address, 0 also allowed.
     * @param _maxClaimed : Maximum number
     * @param _price : WallPaper price
     * @dev check that token is already created and init WallPaper settings
     */
    function initWallPaper(
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
        emit InitWallPaper(tokenId, _uri, _size, _creator, _maxClaimed, _price);
    }

    /*
     * @title createWallPaper
     * @notice create WallPaper for first time
     * @param tokenId : WallPaper nft tokenId
     * @param _uri : baseMetadataURI + _url
     * @param _size : WallPaper's size
     * @param _creator : creator address, 0 also allowed.
     * @param _maxClaimed : Maximum number
     * @param _price : WallPaper price
     * @dev check that token is not created and set WallPaper settings
     */
    function createWallPaper(
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
        emit CreateWallPaper(tokenId, _uri, _size, _creator, _maxClaimed, _price);
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                SHOP METHOD                                 */
    /* -------------------------------------------------------------------------- */

    /*
     * @title  getFreeWallPaper
     * @notice mint WallPaper to token buyer
     * @param tokenId : WallPaper nft token_id
     * @dev pay royality to phi wallet and creator
     */
    function getFreeWallPaper(uint256 tokenId) public {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        require(0 == allObjects[tokenId].price);
        // token should be for sale
        require(allObjects[tokenId].forSale);
        // check if the token id of the token exists
        isValid(tokenId);
        // check token's MaxClaimed
        require(super.totalSupply(tokenId) <= allObjects[tokenId].maxClaimed);
        // mint the token
        super._mint(msg.sender, tokenId, 1, "0x00");
    }

    /*
     * @title buyWallPaper
     * @notice mint WallPaper to token buyer
     * @param tokenId : WallPaper nft token_id
     * @dev pay royality to phi wallet and creator
     */
    function buyWallPaper(uint256 tokenId) public payable {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        // check if the token id of the token exists
        isValid(tokenId);
        // price sent in to buy should be equal to or more than the token's price
        require(msg.value == allObjects[tokenId].price);
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
        emit LogbuyWallPaper(msg.sender, tokenId, msg.value);
    }

    function batchWallPaper(uint256[] memory tokenIds) public payable {
        uint256 allprice;
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        for (uint256 i = 0; i < tokenIds.length; i++) {
            allprice = allprice + allObjects[tokenIds[i]].price;
        }
        require(msg.value == allprice);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            // check if the token id of the token exists
            isValid(tokenIds[i]);

            // token should be for sale
            require(allObjects[tokenIds[i]].forSale);
            // check token's MaxClaimed
            require(super.totalSupply(tokenIds[i]) <= allObjects[tokenIds[i]].maxClaimed);

            // Pay royality to artist, and remaining to deployer of contract
            uint256 royality = (allObjects[tokenIds[i]].price * royalityFee) / 10000;
            (bool success1, ) = payable(allObjects[tokenIds[i]].creator).call{ value: royality }("");
            require(success1);

            (bool success2, ) = payable(treasuryAddress).call{ value: (allObjects[tokenIds[i]].price - royality) }("");
            require(success2);
            // mint the token
            super._mint(msg.sender, tokenIds[i], 1, "0x");
            emit LogbuyWallPaper(msg.sender, tokenIds[i], allObjects[tokenIds[i]].price);
        }
    }

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                  ERC1155                                   */
    /* -------------------------------------------------------------------------- */
}
