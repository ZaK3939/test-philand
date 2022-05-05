// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { MultiOwner } from "../utils/MultiOwner.sol";

/**
 * @dev Contracts to manage base Objects.
 */
abstract contract BaseObject is MultiOwner {
    string public name;
    string public symbol;
    string public baseMetadataURI;
    uint256 public royalityFee;
    address payable public treasuryAddress;

    struct Size {
        uint8 x;
        uint8 y;
        uint8 z;
    }

    // define object struct
    struct Objects {
        string tokenURI;
        Size size;
        address payable creator;
        uint256 maxClaimed;
        uint256 price;
        bool forSale;
    }

    // map token id to Objects
    mapping(uint256 => Objects) public allObjects;
    mapping(uint256 => bool) public created;

    event Sale(address from, address to, uint256 value);

    error InvalidTokenID();
    error ExistentToken();
    error NonExistentToken();
    error NoSetTokenSize();

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
}
