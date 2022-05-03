// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { MultiOwner } from "../utils/MultiOwner.sol";

// FreeObjects smart contract inherits ERC1155 interface
contract FreeObject is ERC1155Supply, MultiOwner {
    string public name;
    string public symbol;
    string public baseMetadataURI;
    uint256 public royalityFee;
    address payable private treasuryAddress;

    struct Size {
        uint8 x;
        uint8 y;
        uint8 z;
    }

    // define struct
    struct FreeObjects {
        string tokenURI;
        Size size;
        address payable creator;
        bool forSale;
    }

    // map token id to Objects
    mapping(uint256 => FreeObjects) public allObjects;
    mapping(uint256 => bool) public created;

    event Sale(address from, address to, uint256 value);

    error InvalidTokenID();
    error ExistentToken();
    error NonExistentToken();
    error NoSetTokenSize();

    // initialize contract while deployment with contract's collection name and token
    constructor(address payable _treasuryAddress, uint256 _royalityFee) ERC1155("") {
        name = "FreeObjects";
        symbol = "FOS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        royalityFee = _royalityFee;
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

    function setRoyalityFee(uint256 _royalityFee) public onlyOwner {
        royalityFee = _royalityFee;
    }

    function setTreasuryAddress(address payable _treasuryAddress) public onlyOwner {
        treasuryAddress = _treasuryAddress;
    }

    function initObject(
        uint256 tokenId,
        string memory _uri,
        Size calldata _size,
        address payable _creator
    ) external onlyOwner {
        if (!exists(tokenId)) revert NonExistentToken();
        setTokenURI(tokenId, _uri);
        setSize(tokenId, _size);
        setCreator(tokenId, _creator);
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

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        _payLoyalty(from, to, id);
        super.safeTransferFrom(from, to, id, amount, data);
    }

    function _payLoyalty(
        address from,
        address to,
        uint256 id
    ) internal {
        if (msg.value > 0) {
            uint256 royality = ((msg.value * royalityFee) / 100);
            (bool success1, ) = payable(allObjects[id].creator).call{ value: royality }("");
            require(success1);

            (bool success2, ) = payable(from).call{ value: msg.value - royality }("");
            require(success2);
            emit Sale(from, to, msg.value);
        }
    }
}
