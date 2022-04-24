// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { MultiOwner } from "../utils/MultiOwner.sol";

// PaidObjects smart contract inherits ERC1155 interface
contract PaidObject is ERC1155Supply, MultiOwner {
    string public baseMetadataURI;
    address payable private treasuryAddress;

    struct Size {
        uint8 x;
        uint8 y;
        uint8 z;
    }

    // define object struct
    struct PaidObjects {
        string tokenURI;
        Size size;
        address payable creator;
        uint256 maxClaimed;
        uint256 price;
        bool forSale;
    }

    // map cryptoboy's token id to Objects
    mapping(uint256 => PaidObjects) public allObjects;

    error ExistentToken();
    error NonExistentToken();
    error NoSetTokenSize();

    // initialize contract while deployment with contract's collection name and token
    constructor() ERC1155("") {
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = payable(msg.sender);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseMetadataURI, getTokenURI(tokenId)));
    }

    function getBaseMetadataURI() public view returns (string memory) {
        return baseMetadataURI;
    }

    function setbaseMetadataURI(string memory baseuri) external onlyOwner {
        baseMetadataURI = baseuri;
    }

    /**
     * @dev Returns the maxClaimed
     */
    function getMaxClaimed(uint256 tokenId) public view virtual returns (uint256) {
        return allObjects[tokenId].maxClaimed;
    }

    /**
     * @dev Set the new maxClaimed
     */
    function setMaxClaimed(uint256 tokenId, uint256 newMaxClaimed) public virtual onlyOwner {
        allObjects[tokenId].maxClaimed = newMaxClaimed;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return allObjects[tokenId].tokenURI;
    }

    function setTokenURI(uint256 tokenId, string memory _uri) public virtual onlyOwner {
        allObjects[tokenId].tokenURI = _uri;
    }

    function getSize(uint256 tokenId) public view returns (Size memory) {
        if (allObjects[tokenId].size.x == 0) revert NoSetTokenSize();
        return allObjects[tokenId].size;
    }

    function setSize(uint256 tokenId, Size calldata _size) public virtual onlyOwner {
        allObjects[tokenId].size = _size;
    }

    function getCreator(uint256 tokenId) public view returns (address payable) {
        if (!exists(tokenId)) revert NonExistentToken();
        return allObjects[tokenId].creator;
    }

    function setCreator(uint256 tokenId, address payable _creator) public virtual onlyOwner {
        allObjects[tokenId].creator = _creator;
    }

    function changeTokenPrice(uint256 tokenId, uint256 _newPrice) public {
        // require caller of the function is not an empty address
        require(msg.sender != address(0));
        // require that token should exist
        if (!exists(tokenId)) revert NonExistentToken();
        // update token's price with new price
        allObjects[tokenId].price = _newPrice;
    }

    // mint a new crypto boy
    function createObject(
        uint256 tokenId,
        string memory _uri,
        Size calldata _size,
        address payable _creator,
        uint256 _maxClaimed,
        uint256 _price
    ) external onlyOwner {
        // check if thic fucntion caller is not an zero address account
        require(msg.sender != address(0));
        if (exists(tokenId)) revert ExistentToken();
        allObjects[tokenId].maxClaimed = _maxClaimed;
        allObjects[tokenId].tokenURI = _uri;
        allObjects[tokenId].size = _size;
        allObjects[tokenId].creator = _creator;
        allObjects[tokenId].price = _price;
        allObjects[tokenId].forSale = false;
    }

    // by a token by passing in the token's id
    function buyObject(uint256 tokenId) public payable {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        // check if the token id of the token being bought exists or not
        if (!exists(tokenId)) revert NonExistentToken();

        // price sent in to buy should be equal to or more than the token's price
        require(msg.value >= allObjects[tokenId].price);
        // token should be for sale
        require(allObjects[tokenId].forSale);
        // check token's MaxClaimed
        require(super.totalSupply(tokenId) <= allObjects[tokenId].maxClaimed);

        // get owner of the token
        address payable sendTo = treasuryAddress;
        // send token's worth of ethers to the owner
        sendTo.transfer(msg.value);
        // mint the token
        super._mint(msg.sender, tokenId, 1, "0x");
    }
}
