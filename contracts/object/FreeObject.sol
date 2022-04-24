// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { MultiOwner } from "../utils/MultiOwner.sol";

// FreeObjects smart contract inherits ERC1155 interface
contract FreeObject is ERC1155Supply, MultiOwner {
    string public baseMetadataURI;
    address payable private treasuryAddress;

    struct Size {
        uint8 x;
        uint8 y;
        uint8 z;
    }

    // define crypto boy struct
    struct FreeObjects {
        string tokenURI;
        Size size;
        address payable creator;
        bool forSale;
    }

    // map cryptoboy's token id to Objects
    mapping(uint256 => FreeObjects) public allObjects;

    error ExistentToken();
    error NonExistentToken();
    error NoSetTokenSize();

    // initialize contract while deployment with contract's collection name and token
    constructor() ERC1155("") {
        baseMetadataURI = "https://www.arweave.net/";
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

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        if (!exists(tokenId)) revert NonExistentToken();
        return allObjects[tokenId].tokenURI;
    }

    function setTokenURI(uint256 tokenId, string memory _uri) public virtual onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        allObjects[tokenId].tokenURI = _uri;
    }

    function getSize(uint256 tokenId) public view returns (Size memory) {
        if (!exists(tokenId)) revert NonExistentToken();
        if (allObjects[tokenId].size.x == 0) revert NoSetTokenSize();
        return allObjects[tokenId].size;
    }

    function setSize(uint256 tokenId, Size calldata _size) public virtual onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        allObjects[tokenId].size = _size;
    }

    function getCreator(uint256 tokenId) public view returns (address payable) {
        if (!exists(tokenId)) revert NonExistentToken();
        return allObjects[tokenId].creator;
    }

    function setCreator(uint256 tokenId, address payable _creator) public virtual onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        allObjects[tokenId].creator = _creator;
    }

    // mint a new crypto boy
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
    }

    // by a token by passing in the token's id
    function getFreeObject(uint256 tokenId) public payable {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        // check if the token id of the token being bought exists or not
        if (!exists(tokenId)) revert NonExistentToken();
        // mint the token
        super._mint(msg.sender, tokenId, 1, "0x00");
    }
}
