// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { IENS } from "./interfaces/IENS.sol";
import { IPhiObject } from "./interfaces/IPhiObject.sol";
import { ISoulObject } from "./interfaces/ISoulObject.sol";
import { MultiOwner } from "./utils/MultiOwner.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiClaim is MultiOwner {
    address private _adminSigner;
    IPhiObject private _phiObject;

    mapping(address => mapping(uint256 => bool)) public claimedLists;
    mapping(address => mapping(uint256 => bool)) public claimedSoulLists;
    mapping(string => uint256) public couponType;

    error AllreadyClaimedObject(address sender, uint256 tokenId);
    event LogClaimObject(address sender, uint256 tokenid);

    //@notice the coupon sent was signed by the admin signer
    struct Coupon {
        bytes32 r;
        bytes32 s;
        uint8 v;
    }

    constructor(address adminSigner, IPhiObject phiObject) {
        _adminSigner = adminSigner;
        _phiObject = phiObject;
    }

    /// @dev check that the coupon sent was signed by the admin signer
    function isVerifiedCoupon(bytes32 digest, Coupon memory coupon) internal view returns (bool) {
        address signer = ecrecover(digest, coupon.v, coupon.r, coupon.s);
        require(signer != address(0), "ECDSA: invalid signature"); // Added check for zero address
        return signer == _adminSigner;
    }

    /// @dev get object conditon and number (related with offcahin validation)
    function getCouponType(string calldata condition) public view returns (uint256) {
        return couponType[condition];
    }

    /// @dev set object conditon and number (related with offcahin validation)
    function setCouponType(string calldata condition, uint256 tokenid) public onlyOwner {
        couponType[condition] = tokenid;
    }

    /*
     * @title claimObject
     * @notice Send object create Message from L1 to Starknet
     * @param tokenId : object nft token_id
     * @param condition : object related name. ex.uniswap,loot,ethbalance,...
     * @param coupon : get offchain api
     * @dev check that the coupon sent was signed by the admin signer
     */
    function claimObject(
        uint256 tokenId,
        string calldata condition,
        Coupon memory coupon
    ) external {
        bytes32 digest = keccak256(abi.encode(couponType[condition], msg.sender));

        // Check that the coupon sent was signed by the admin signer
        require(isVerifiedCoupon(digest, coupon), "Invalid coupon");

        if (claimedLists[msg.sender][tokenId] == true) {
            revert AllreadyClaimedObject({ sender: msg.sender, tokenId: tokenId });
        }
        claimedLists[msg.sender][tokenId] = true;
        emit LogClaimObject(msg.sender, tokenId);
        _phiObject.getPhiObject(msg.sender, tokenId);
    }
}
