// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { IPhiMap } from "./interfaces/IPhiMap.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract Registry is AccessControlUpgradeable {
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------- INTERFACE ------------------------------- */
    address public map;
    address private adminSigner;
    /* --------------------------------- COUNTER -------------------------------- */
    uint256 public claimed;
    /* ----------------------------------- ENS ---------------------------------- */
    //@notice baseNode = eth
    bytes32 private baseNode;
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
    mapping(address => mapping(string => address)) public ownerLists;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event Hello();
    event SetBaseNode(bytes32 basenode);
    event SetAdminSigner(address indexed verifierAddress);
    event LogCreatePhiland(address indexed sender, string name);
    event LogChangePhilandOwner(address indexed sender, string name);
    event LogChangePhilandAddress(address indexed sender, address _phiMapAddress);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    error NotAdminCall(address sender);
    error InvalidENS(address sender, string name, bytes32 label, address owner);
    error AllreadyClaimedPhiland(address sender, address owner, string name);
    error NotReadyPhiland(address sender, address owner, string name);
    error ECDSAInvalidSignature(address sender, address signer, bytes32 digest, Coupon coupon);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  MODIFIERS                                 */
    /* -------------------------------------------------------------------------- */
    modifier onlyIfNotOnwer() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert NotAdminCall({ sender: msg.sender });
        }
        _;
    }
    modifier onlyIfNotENSOwner(string memory name, Coupon memory coupon) {
        // Check that the coupon sent was signed by the admin signer
        bytes32 digest = keccak256(abi.encode(name, msg.sender, address(this)));
        require(isVerifiedCoupon(digest, coupon), "Invalid coupon");
        _;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(
        address _admin,
        address _map,
        address _adminSigner
    ) public initializer {
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
        map = _map;
        adminSigner = _adminSigner;
        claimed = 0;
        baseNode = 0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae;
        emit Hello();
    }

    /* ---------------------------------- ADMIN --------------------------------- */
    /**
      Set ENS baseNode default is .eth
    */
    function setBaseNode(bytes32 _basenode) external onlyIfNotOnwer {
        baseNode = _basenode;
        emit SetBaseNode(_basenode);
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   Coupon                                   */
    /* -------------------------------------------------------------------------- */
    /// @dev get adminsigner
    function getAdminSigner() public view returns (address) {
        return adminSigner;
    }

    /// @dev set adminsigner
    function setAdminSigner(address verifierAdderss) public onlyIfNotOnwer {
        adminSigner = verifierAdderss;
        emit SetAdminSigner(verifierAdderss);
    }

    /// @dev check that the coupon sent was signed by the admin signer
    function isVerifiedCoupon(bytes32 digest, Coupon memory coupon) internal view returns (bool) {
        address signer = ecrecover(digest, coupon.v, coupon.r, coupon.s);
        if (signer == address(0)) {
            revert ECDSAInvalidSignature({ sender: msg.sender, signer: signer, digest: digest, coupon: coupon });
        }
        return signer == adminSigner;
    }

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                               PUBLIC FUNCTION                              */
    /* -------------------------------------------------------------------------- */
    /* ------------------------------ Map Contract -------------------------- -- */
    /*
     * @title createPhiland
     * @notice Send philand create Message
     * @param name : ENS name
     * @dev include check ENS
     */
    function createPhiland(string memory name, Coupon memory coupon) external onlyIfNotENSOwner(name, coupon) {
        if (ownerLists[map][name] != address(0)) {
            revert AllreadyClaimedPhiland({ sender: msg.sender, owner: ownerLists[map][name], name: name });
        }
        unchecked {
            claimed++;
        }
        ownerLists[map][name] = msg.sender;
        IPhiMap(map).create(name, msg.sender);
        emit LogCreatePhiland(msg.sender, name);
    }

    /*
     * @title changePhilandOwner
     * @notice Send philand owner change Message from L1
     * @param name : ENS name
     * @dev include check ENS
     */
    function changePhilandOwner(string memory name, Coupon memory coupon) external onlyIfNotENSOwner(name, coupon) {
        if (ownerLists[map][name] == address(0)) {
            revert NotReadyPhiland({ sender: msg.sender, owner: ownerLists[map][name], name: name });
        }
        ownerLists[map][name] = msg.sender;
        IPhiMap(map).changePhilandOwner(name, msg.sender);
        emit LogChangePhilandOwner(msg.sender, name);
    }

    /*
     * @title changePhilandAddress
     * @notice Send philand address
     * @param _phiMapAddress : _phiMapAddress
     */
    function changePhilandAddress(address _phiMapAddress) external onlyIfNotOnwer {
        map = _phiMapAddress;
        emit LogChangePhilandAddress(msg.sender, _phiMapAddress);
    }
}
