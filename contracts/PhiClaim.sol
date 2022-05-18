// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { IENS } from "./interfaces/IENS.sol";
import { IPhiObject } from "./interfaces/IPhiObject.sol";
import { ISoulObject } from "./interfaces/ISoulObject.sol";
import { MultiOwner } from "./utils/MultiOwner.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiClaim is MultiOwner {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    IPhiObject private _phiObject;
    address private _adminSigner;
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   STORAGE                                  */
    /* -------------------------------------------------------------------------- */
    //@notice the coupon sent was signed by the admin signer
    struct Coupon {
        bytes32 r;
        bytes32 s;
        uint8 v;
    }
    mapping(address => mapping(uint256 => bool)) public phiClaimedLists;
    mapping(string => uint256) private couponType;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event SetAdminSigner(address indexed verifierAdderss);
    event SetCoupon(string condition, uint256 tokenid);
    event LogClaimObject(address indexed sender, uint256 tokenid);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    error AllreadyClaimedObject(address sender, uint256 tokenId);
    error ECDSAInvalidSignature(address sender, address signer, bytes32 digest, Coupon coupon);

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    constructor(address adminSigner, IPhiObject phiObject) {
        _adminSigner = adminSigner;
        _phiObject = phiObject;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  MODIFIERS                                 */
    /* -------------------------------------------------------------------------- */
    modifier onlyIfAllreadyClaimedObject(uint256 tokenId) {
        if (phiClaimedLists[msg.sender][tokenId] == true) {
            revert AllreadyClaimedObject({ sender: msg.sender, tokenId: tokenId });
        }
        _;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   Coupon                                   */
    /* -------------------------------------------------------------------------- */
    /// @dev set adminsigner
    function setAdminSigner(address verifierAdderss) public onlyOwner {
        _adminSigner = verifierAdderss;
        emit SetAdminSigner(verifierAdderss);
    }

    /// @dev get object conditon and number (related with offcahin validation)
    function getCouponType(string memory condition) public view returns (uint256) {
        return couponType[condition];
    }

    /// @dev set object conditon and number (related with offcahin validation)
    function setCouponType(string memory condition, uint256 tokenId) public onlyOwner {
        couponType[condition] = tokenId;
        emit SetCoupon(condition, tokenId);
    }

    /// @dev check that the coupon sent was signed by the admin signer
    function isVerifiedCoupon(bytes32 digest, Coupon memory coupon) internal view returns (bool) {
        address signer = ecrecover(digest, coupon.v, coupon.r, coupon.s);
        if (signer == address(0)) {
            revert ECDSAInvalidSignature({ sender: msg.sender, signer: signer, digest: digest, coupon: coupon });
        }
        return signer == _adminSigner;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   OBJECT                                   */
    /* -------------------------------------------------------------------------- */
    /*
     * @title claimObject
     * @notice Send object create Message from L1 to Starknet
     * @param tokenId : object nft token_id
     * @param condition : object related name. ex.uniswap,loot,ethbalance,...
     * @param coupon : get offchain api
     * @dev check that the coupon sent was signed by the admin signer
     */
    function claimPhiObject(
        uint256 tokenId,
        string calldata condition,
        Coupon memory coupon
    ) external onlyIfAllreadyClaimedObject(tokenId) {
        // Check that the coupon sent was signed by the admin signer
        bytes32 digest = keccak256(abi.encode(couponType[condition], msg.sender));
        require(isVerifiedCoupon(digest, coupon), "Invalid coupon");
        phiClaimedLists[msg.sender][tokenId] = true;
        _phiObject.getPhiObject(msg.sender, tokenId);
        emit LogClaimObject(msg.sender, tokenId);
    }
}
