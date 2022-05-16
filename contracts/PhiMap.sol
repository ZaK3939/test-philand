// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import { IObject } from "./interfaces/IObject.sol";
import { IPhiRegistry } from "./interfaces/IPhiRegistry.sol";
import { MultiOwner } from "./utils/MultiOwner.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiMap is MultiOwner, ERC1155Receiver {
    IObject public freeObject;

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

    struct ObjectLinkInfo {
        string title;
        string url;
    }

    struct Links {
        uint256 index;
        string title;
        string url;
    }

    mapping(string => address) public ownerLists;

    error NotReadyPhiland(address sender, address owner);
    error NotReadyObject(address sender, uint256 object_index);
    error NotDeposit(address sender, address owner, uint256 token_id);
    error OutofMapRange(uint256 a, string error_boader);
    error objectCollision(ObjectInfo writeObjectInfo, ObjectInfo userObjectInfo, string error_boader);

    constructor(IObject _freeObject) {
        freeObject = _freeObject;
        mapSettings = MapSettings(0, 10, 0, 10);
    }

    mapping(string => ObjectInfo[]) public userObject;
    mapping(string => mapping(uint256 => ObjectLinkInfo[])) public userObjectLink;

    function create(string calldata name, address caller) external {
        ownerLists[name] = caller;
    }

    function writeObjectToLand(
        string calldata name,
        Object calldata objectData,
        IObject _object
    ) public {
        address owner = ownerOfPhiland(name);
        if (owner == address(0)) {
            revert NotReadyPhiland({ sender: msg.sender, owner: owner });
        }
        if (depositInfo[msg.sender][objectData.contractAddress][objectData.tokenId].amount == 0) {
            revert NotDeposit({ sender: msg.sender, owner: owner, token_id: objectData.tokenId });
        }
        IObject.Size memory size = _object.getSize(objectData.tokenId);
        ObjectInfo memory objectinfo = ObjectInfo(
            objectData.contractAddress,
            objectData.tokenId,
            objectData.xStart,
            objectData.yStart,
            objectData.xStart + size.x,
            objectData.yStart + size.y
        );
        checkCollision(name, objectinfo);
        userObject[name].push(objectinfo);
    }

    function batchWriteObjectToLand(
        string calldata name,
        Object[] calldata objectData,
        IObject[] calldata _object
    ) public {
        address owner = ownerOfPhiland(name);
        if (owner == address(0)) {
            revert NotReadyPhiland({ sender: msg.sender, owner: owner });
        }
        for (uint256 i = 0; i < objectData.length; i++) {
            writeObjectToLand(name, objectData[i], _object[i]);
        }
    }

    function removeObjectFromLand(string calldata name, uint256 i) external {
        delete userObject[name][i];
        delete userObjectLink[name][i];
    }

    function batchRemoveObjectFromLand(string calldata name, uint256[] calldata index_array) public {
        for (uint256 i = 0; i < index_array.length; i++) {
            uint256 tmp = index_array[i];
            delete userObject[name][tmp];
        }
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
        freeObject.mintBatchObject(msg.sender, ids, amounts, "");
    }

    struct Deposit {
        uint256 amount;
        uint256 timestamp;
    }

    // map staker address to stake details
    mapping(address => mapping(address => mapping(uint256 => Deposit))) public depositInfo;
    // map staker to total staking time
    mapping(address => mapping(address => mapping(uint256 => uint256))) public depositTime;

    function deposit(
        address _contractAddress,
        uint256 _tokenId,
        uint256 _amount,
        IObject _object
    ) public {
        uint256 currentAmount = depositInfo[msg.sender][_contractAddress][_tokenId].amount;
        depositInfo[msg.sender][_contractAddress][_tokenId] = Deposit(currentAmount + _amount, block.timestamp);
        _object.safeTransferFrom(msg.sender, address(this), _tokenId, _amount, "0x00");
    }

    function batchDeposit(
        address[] calldata _contractAddresses,
        uint256[] memory _tokenIds,
        uint256[] memory _amounts,
        IObject _object
    ) public {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            uint256 currentAmount = depositInfo[msg.sender][_contractAddresses[i]][_tokenIds[i]].amount;
            depositInfo[msg.sender][_contractAddresses[i]][_tokenIds[i]] = Deposit(
                currentAmount + _amounts[i],
                block.timestamp
            );
            _object.safeTransferFrom(msg.sender, address(this), _tokenIds[i], _amounts[i], "0x00");
        }
    }

    function checkDepositStatus(
        address sender,
        address _contractAddresses,
        uint256 _tokenId
    ) public view returns (Deposit memory) {
        return depositInfo[sender][_contractAddresses][_tokenId];
    }

    function undeposit(
        address _contractAddresses,
        uint256 _tokenId,
        IObject _object
    ) public {
        _object.safeTransferFrom(
            address(this),
            msg.sender,
            _tokenId,
            depositInfo[msg.sender][_contractAddresses][_tokenId].amount,
            "0x00"
        );
        depositTime[msg.sender][_contractAddresses][_tokenId] += (block.timestamp -
            depositInfo[msg.sender][_contractAddresses][_tokenId].timestamp);
        delete depositInfo[msg.sender][_contractAddresses][_tokenId];
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

    function viewPhiland(string calldata name) external view returns (ObjectInfo[] memory) {
        return userObject[name];
    }

    function viewObjectLink(string calldata name, uint256 object_index)
        external
        view
        returns (ObjectLinkInfo[] memory)
    {
        return userObjectLink[name][object_index];
    }

    function viewLinks(string calldata name) external view returns (Links[] memory) {
        Links[] memory links = new Links[](userObject[name].length);
        for (uint256 i = 0; i < userObject[name].length; i++) {
            if (userObjectLink[name][i].length != 0) {
                Links memory objectLink = Links(i, userObjectLink[name][i][0].title, userObjectLink[name][i][0].url);
                links[i] = objectLink;
            }
        }
        return links;
    }

    function writeLinkToObject(
        string calldata name,
        uint256 object_index,
        string calldata title,
        string calldata url
    ) public {
        address owner = ownerOfPhiland(name);
        if (owner == address(0)) {
            revert NotReadyPhiland({ sender: msg.sender, owner: owner });
        }
        if (userObject[name][object_index].contractAddress == address(0)) {
            revert NotReadyObject({ sender: msg.sender, object_index: object_index });
        }
        ObjectLinkInfo memory objectLinkInfo = ObjectLinkInfo(title, url);
        userObjectLink[name][object_index].push(objectLinkInfo);
    }

    function removeLinkFromObject(string calldata name, uint256 object_index) external {
        delete userObjectLink[name][object_index];
    }

    function batchRemoveAndWrite(
        string calldata name,
        uint256[] calldata remove_index_array,
        Object[] calldata objectData,
        IObject[] calldata _object
    ) external {
        batchRemoveObjectFromLand(name, remove_index_array);
        batchWriteObjectToLand(name, objectData, _object);
    }

    /// @dev check that the user has already claimed Philand
    function ownerOfPhiland(string memory name) public view returns (address) {
        if (ownerLists[name] != address(0)) return ownerLists[name];
        else return address(0);
    }
}
