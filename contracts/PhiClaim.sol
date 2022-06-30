// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { IENS } from "./interfaces/IENS.sol";
import { IPhiObject } from "./interfaces/IPhiObject.sol";

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiClaim is AccessControlUpgradeable {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    address private _adminSigner;
    bool private initialized;
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
    mapping(address => mapping(address => mapping(uint256 => bool))) public phiClaimedLists;
    mapping(string => uint256) private couponType;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event Hello();
    event SetAdminSigner(address indexed verifierAddress);
    event SetCoupon(string condition, uint256 tokenid);
    event LogClaimObject(address indexed sender, uint256 tokenid);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    error AllreadyClaimedObject(address sender, uint256 tokenId);
    error NotAdminCall(address sender);
    error ECDSAInvalidSignature(address sender, address signer, bytes32 digest, Coupon coupon);

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(address _admin, address adminSigner) public initializer {
        _adminSigner = adminSigner;
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
        emit Hello();
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  MODIFIERS                                 */
    /* -------------------------------------------------------------------------- */
    modifier onlyIfAllreadyClaimedObject(address contractAddress, uint256 tokenId) {
        if (phiClaimedLists[msg.sender][contractAddress][tokenId] == true) {
            revert AllreadyClaimedObject({ sender: msg.sender, tokenId: tokenId });
        }
        _;
    }

    modifier onlyIfNotOnwer() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert NotAdminCall({ sender: msg.sender });
        }
        _;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   Coupon                                   */
    /* -------------------------------------------------------------------------- */
    /// @dev get adminsigner
    function getAdminSigner() public view returns (address) {
        return _adminSigner;
    }

    /// @dev set adminsigner
    function setAdminSigner(address verifierAdderss) public onlyIfNotOnwer {
        _adminSigner = verifierAdderss;
        emit SetAdminSigner(verifierAdderss);
    }

    /// @dev get object conditon and number (related with offcahin validation)
    function getCouponType(string memory condition) public view returns (uint256) {
        return couponType[condition];
    }

    /// @dev set object conditon and number (related with offcahin validation)
    function setCouponType(string memory condition, uint256 tokenId) public onlyIfNotOnwer {
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
     * @title claimPhiObject
     * @notice Send create Message to PhiObject
     * @param contractAddress : object contractAddress
     * @param tokenId : object nft token_id
     * @param condition : object related name. ex.uniswap,loot,ethbalance,...
     * @param coupon : coupon api response
     * @dev check that the coupon sent was signed by the admin signer
     */
    function claimPhiObject(
        address contractAddress,
        uint256 tokenId,
        string calldata condition,
        Coupon memory coupon
    ) external onlyIfAllreadyClaimedObject(contractAddress, tokenId) {
        IPhiObject _phiObject = IPhiObject(contractAddress);
        // Check that the coupon sent was signed by the admin signer
        bytes32 digest = keccak256(abi.encode(contractAddress, couponType[condition], msg.sender));
        require(isVerifiedCoupon(digest, coupon), "Invalid coupon");
        phiClaimedLists[msg.sender][contractAddress][tokenId] = true;
        _phiObject.getPhiObject(msg.sender, tokenId);
        emit LogClaimObject(msg.sender, tokenId);
    }

    /*
     * @title checkClaimedStatus
     * @notice check PhiObject claim status
     * @param contractAddress : object contractAddress
     * @param tokenId : object nft token_id
     * @dev check that the coupon was already used
     */
    function checkClaimedStatus(address contractAddress, uint256 tokenId) public view returns (bool) {
        phiClaimedLists[msg.sender][contractAddress][tokenId];
    }
}
