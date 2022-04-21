// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { IENS } from "./interfaces/IENS.sol";
import { IPhiMap } from "./interfaces/IPhiMap.sol";
import { MultiOwner } from "./utils/MultiOwner.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiRegistry is MultiOwner {
    IENS private _ens;
    IPhiMap private _map;

    bytes32 public label;

    //@notice baseNode = eth
    bytes32 private baseNode = 0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae;

    //@notice for owner
    mapping(string => address) public ownerLists;

    error InvalidENS(address sender, string name, bytes32 label, address owner);
    error AllreadyClaimedPhiland(address sender, address owner, string name);
    error NotReadyPhiland(address sender, address owner, string name);

    event LogCreatePhiland(address indexed sender, string name);
    event LogChangePhilandOwner(address indexed sender, string name);

    uint256 public claimed = 0;

    constructor(IENS ens, IPhiMap map) {
        _ens = ens;
        _map = map;
    }

    /**
      Set ENS baseNode default is .eth
    */
    function setEnsBaseNode(bytes32 _basenode) external onlyOwner {
        baseNode = _basenode;
    }

    /// @dev For ENS subDomain
    function createENSLable(string calldata name) private returns (bytes32) {
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

    /*
     * @title createPhiland
     * @notice Send philand create Message from L1 to Starknet
     * @param name : ENS name
     * @dev include check ENS
     */
    function createPhiland(string calldata name) external {
        label = createENSLable(name);

        // Check whether the user is ens owner or not
        if (msg.sender != _ens.owner(label)) {
            revert InvalidENS({ sender: msg.sender, name: name, label: label, owner: _ens.owner(label) });
        }
        if (ownerLists[name] != address(0)) {
            revert AllreadyClaimedPhiland({ sender: msg.sender, owner: ownerLists[name], name: name });
        }
        ownerLists[name] = msg.sender;
        emit LogCreatePhiland(msg.sender, name);
        claimed++;
        _map.create(name, msg.sender);
    }

    /*
     * @title changePhilandOwner
     * @notice Send philand owner change Message from L1 to Starknet
     * @param name : ENS name
     * @dev include check ENS
     */
    function changePhilandOwner(string calldata name) external {
        label = createENSLable(name);
        // Check whether the user is ens owner or not
        if (msg.sender != _ens.owner(label)) {
            revert InvalidENS({ sender: msg.sender, name: name, label: label, owner: _ens.owner(label) });
        }
        ownerLists[name] = msg.sender;
        emit LogChangePhilandOwner(msg.sender, name);
    }
}
