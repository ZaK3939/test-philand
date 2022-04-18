// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { IENS } from "./interfaces/IENS.sol";
import { IPhiObject } from "./interfaces/IPhiObject.sol";
import { IPhiRegistry } from "./interfaces/IPhiRegistry.sol";
import { MultiOwner } from "./utils/MultiOwner.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiMap is MultiOwner {
    IPhiObject private _object;

    struct MapSettings {
        uint256 minX;
        uint256 maxX;
        uint256 minY;
        uint256 maxY;
    }

    MapSettings public mapSettings;

    struct Size {
        uint8 x;
        uint8 y;
        uint8 z;
    }

    struct Object {
        address contractAddress;
        uint256 tokenId;
        uint256 xStart;
        uint256 yStart;
    }

    struct ObjectInfo {
        address contractAddress;
        uint256 tokenId;
        uint256 xStart;
        uint256 yStart;
        uint256 xEnd;
        uint256 yEnd;
    }
    mapping(string => address) public ownerLists;

    error NotReadyPhiland(address sender, address owner);
    error NotDeposit(address sender, address owner, uint256 token_id);
    error OutofMapRange(uint256 a, string error_boader);
    error objectCollision(ObjectInfo writeObjectInfo, ObjectInfo userObjectInfo, string error_boader);

    constructor(IPhiObject object) {
        _object = object;
        mapSettings = MapSettings(0, 0, 10, 10);
    }

    mapping(string => ObjectInfo[]) private userObject;

    function create(string calldata name, address caller) external {
        ownerLists[name] = caller;
    }

    function writeObjectToLand(string calldata name, Object calldata objectdata) external {
        address owner = ownerOfPhiland(name);
        if (owner == address(0)) {
            revert NotReadyPhiland({ sender: msg.sender, owner: owner });
        }
        if (depositInfo[msg.sender][objectdata.tokenId].amount == 0) {
            revert NotDeposit({ sender: msg.sender, owner: owner, token_id: objectdata.tokenId });
        }
        IPhiObject.Size memory size = _object.getSize(objectdata.tokenId);
        ObjectInfo memory objectinfo = ObjectInfo(
            objectdata.contractAddress,
            objectdata.tokenId,
            objectdata.xStart,
            objectdata.yStart,
            objectdata.xStart + size.x,
            objectdata.yStart + size.y
        );
        checkCollision(name, objectinfo);
        userObject[name].push(objectinfo);
    }

    function removeObjectToLand(string calldata name, uint256 i) external {
        delete userObject[name][i];
    }

    function checkCollision(string calldata name, ObjectInfo memory objectInfo) private view {
        if (objectInfo.xStart < mapSettings.minX || objectInfo.xStart > mapSettings.maxX) {
            revert OutofMapRange({ a: objectInfo.xStart, error_boader: "invalid xStart" });
        }
        if (objectInfo.xEnd < mapSettings.minX || objectInfo.xEnd > mapSettings.maxX) {
            revert OutofMapRange({ a: objectInfo.xEnd, error_boader: "invalid xEnd" });
        }
        if (objectInfo.yStart < mapSettings.minY || objectInfo.yStart > mapSettings.maxY) {
            revert OutofMapRange({ a: objectInfo.yStart, error_boader: "invalid yStart" });
        }
        if (objectInfo.yEnd < mapSettings.minY || objectInfo.yEnd > mapSettings.maxY) {
            revert OutofMapRange({ a: objectInfo.yEnd, error_boader: "invalid yEnd" });
        }

        if (userObject[name].length == 0) {
            return;
        }

        for (uint256 i = 0; i < userObject[name].length; i++) {
            if (
                objectInfo.xEnd <= userObject[name][i].xStart ||
                userObject[name][i].xEnd <= objectInfo.xStart ||
                objectInfo.yEnd <= userObject[name][i].yStart ||
                userObject[name][i].yEnd <= objectInfo.yStart
            ) {
                continue;
            } else {
                revert objectCollision({
                    writeObjectInfo: objectInfo,
                    userObjectInfo: userObject[name][i],
                    error_boader: "invalid objectInfo"
                });
            }
        }
        return;
    }

    function claimStarterObject(string calldata name) external {
        address owner = ownerOfPhiland(name);
        if (owner == address(0)) {
            revert NotReadyPhiland({ sender: msg.sender, owner: owner });
        }
        uint256[] memory ids = new uint256[](5);
        uint256[] memory amounts = new uint256[](5);

        for (uint256 i = 0; i < 5; i++) {
            ids[i] = i + 1;
            amounts[i] = 1;
        }
        _object.mintBatchObject(msg.sender, ids, amounts, "");
    }

    struct Deposit {
        uint256 amount;
        uint256 timestamp;
    }
    // map staker address to stake details
    mapping(address => mapping(uint256 => Deposit)) public depositInfo;
    // map staker to total staking time
    mapping(address => mapping(uint256 => uint256)) public depositTime;

    function deposit(uint256 _tokenId, uint256 _amount) public {
        depositInfo[msg.sender][_tokenId] = Deposit(_amount, block.timestamp);
        _object.safeTransferFrom(msg.sender, address(this), _tokenId, _amount, "0x00");
    }

    function undeposit(uint256 _tokenId) public {
        _object.safeTransferFrom(address(this), msg.sender, _tokenId, depositInfo[msg.sender][_tokenId].amount, "0x00");
        depositTime[msg.sender][_tokenId] += (block.timestamp - depositInfo[msg.sender][_tokenId].timestamp);
        delete depositInfo[msg.sender][_tokenId];
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external pure returns (bytes4) {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] memory ids,
        uint256[] memory values,
        bytes calldata data
    ) external pure returns (bytes4) {
        return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
    }

    function view_philand(string calldata user) external view returns (ObjectInfo[] memory) {
        return userObject[user];
    }

    /// @dev check that the user has already claimed Philand
    function ownerOfPhiland(string memory name) public view returns (address) {
        if (ownerLists[name] != address(0)) return ownerLists[name];
        else return address(0);
    }
}
