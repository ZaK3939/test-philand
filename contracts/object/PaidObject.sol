// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { MultiOwner } from "../utils/MultiOwner.sol";

// PaidObjects smart contract inherits ERC1155 interface
contract PaidObject is ERC1155Supply, MultiOwner {
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

    // define object struct
    struct PaidObjects {
        string tokenURI;
        Size size;
        address payable creator;
        uint256 maxClaimed;
        uint256 price;
        bool forSale;
    }

    // map token id to Objects
    mapping(uint256 => PaidObjects) public allObjects;
    mapping(uint256 => bool) public created;

    event Sale(address from, address to, uint256 value);

    error InvalidTokenID();
    error ExistentToken();
    error NonExistentToken();
    error NoSetTokenSize();

    // initialize contract while deployment with contract's collection name and token
    constructor(address payable _treasuryAddress, uint256 _royalityFee) ERC1155("") {
        name = "PaidObjects";
        symbol = "POS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        royalityFee = _royalityFee;
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
        return allObjects[tokenId].creator;
    }

    function setCreator(uint256 tokenId, address payable _creator) public virtual onlyOwner {
        allObjects[tokenId].creator = _creator;
    }

    function changeTokenPrice(uint256 tokenId, uint256 _newPrice) public onlyOwner {
        // require caller of the function is not an empty address
        require(msg.sender != address(0));
        // update token's price with new price
        allObjects[tokenId].price = _newPrice;
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
        Size calldata _size,
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

    /* Utility Functions */
    function isValid(uint256 tokenId) internal view {
        // Validate that the token is within range when querying
        if (tokenId <= 0 || totalSupply(tokenId) >= allObjects[tokenId].maxClaimed) revert InvalidTokenID();
        if (!created[tokenId]) revert InvalidTokenID();
    }

    // by a token by passing in the token's id
    function buyObject(uint256 tokenId) public payable {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        // check if the token id of the token being bought exists or not
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

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        _payRoyalty(from, to, id);
        super.safeTransferFrom(from, to, id, amount, data);
    }

    function _payRoyalty(
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
