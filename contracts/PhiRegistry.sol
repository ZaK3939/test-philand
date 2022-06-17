// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { IENS } from "./interfaces/IENS.sol";
import { IPhiMap } from "./interfaces/IPhiMap.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiRegistry is AccessControlUpgradeable {
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------- INTERFACE ------------------------------- */
    IENS private _ens;
    IPhiMap private _map;
    /* --------------------------------- COUNTER -------------------------------- */
    uint256 public claimed;
    /* ----------------------------------- ENS ---------------------------------- */
    //@notice baseNode = eth
    bytes32 private baseNode;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   STORAGE                                  */
    /* -------------------------------------------------------------------------- */
    mapping(string => address) public ownerLists;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event Hello();
    event SetBaseNode(bytes32 basenode);
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
    modifier onlyIfNotENSOwner(string memory name) {
        bytes32 label = createENSLable(name);
        if (msg.sender != _ens.owner(label)) {
            revert InvalidENS({ sender: msg.sender, name: name, label: label, owner: _ens.owner(label) });
        }
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
        IENS ens,
        IPhiMap map
    ) public initializer {
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
        _ens = ens;
        _map = map;
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

    /* ------------------------------- ENS HELPER ------------------------------- */
    /// @dev For ENS subDomain
    function createENSLable(string memory name) private view returns (bytes32) {
        bytes32 label;
        strings.slice memory slicee = strings.toSlice(name);
        strings.slice memory delim = strings.toSlice(".");
        string[] memory parts = new string[](strings.count(slicee, delim) + 1);
        for (uint256 i = 0; i < parts.length; i++) {
            parts[i] = strings.toString(strings.split(slicee, delim));
        }
        if (parts.length == 1) {
            label = keccak256(abi.encodePacked(baseNode, keccak256(bytes(name))));
        } else {
            for (uint256 i = parts.length - 1; i > 0; i--) {
                if (i == parts.length - 1) {
                    label = keccak256(abi.encodePacked(baseNode, keccak256(bytes(parts[i]))));
                } else {
                    label = keccak256(abi.encodePacked(label, keccak256(bytes(parts[i]))));
                }
                if (i == 1) {
                    label = keccak256(abi.encodePacked(label, keccak256(bytes(parts[0]))));
                }
            }
        }
        return label;
    }

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
    function createPhiland(string memory name) external onlyIfNotENSOwner(name) {
        if (ownerLists[name] != address(0)) {
            revert AllreadyClaimedPhiland({ sender: msg.sender, owner: ownerLists[name], name: name });
        }
        unchecked {
            claimed++;
        }
        ownerLists[name] = msg.sender;
        _map.create(name, msg.sender);
        emit LogCreatePhiland(msg.sender, name);
    }

    /*
     * @title changePhilandOwner
     * @notice Send philand owner change Message from L1
     * @param name : ENS name
     * @dev include check ENS
     */
    function changePhilandOwner(string memory name) external onlyIfNotENSOwner(name) {
        if (ownerLists[name] == address(0)) {
            revert NotReadyPhiland({ sender: msg.sender, owner: ownerLists[name], name: name });
        }
        ownerLists[name] = msg.sender;
        _map.changePhilandOwner(name, msg.sender);
        emit LogChangePhilandOwner(msg.sender, name);
    }

    /*
     * @title changePhilandAddress
     * @notice Send philand address
     * @param _phiMapAddress : _phiMapAddress
     */
    function changePhilandAddress(address _phiMapAddress) external onlyIfNotOnwer {
        _map = IPhiMap(_phiMapAddress);
        emit LogChangePhilandAddress(msg.sender, _phiMapAddress);
    }
}
