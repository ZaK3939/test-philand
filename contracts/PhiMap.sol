// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import { IObject } from "./interfaces/IObject.sol";
import { IPhiRegistry } from "./interfaces/IPhiRegistry.sol";
import { MultiOwner } from "./utils/MultiOwner.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiMap is MultiOwner, ERC1155Receiver {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- Map ----------------------------------- */
    MapSettings public mapSettings;
    struct MapSettings {
        uint256 minX;
        uint256 maxX;
        uint256 minY;
        uint256 maxY;
    }
    /* --------------------------------- OBJECT --------------------------------- */
    IObject public freeObject;
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
    /* --------------------------------- DEPOSIT -------------------------------- */
    struct Deposit {
        uint256 amount;
        uint256 used;
        uint256 timestamp;
    }
    struct DepositInfo {
        address contractAddress;
        uint256 tokenId;
    }
    /* --------------------------------- LINK ----------------------------------- */
    struct ObjectLinkInfo {
        string title;
        string url;
    }
    struct Links {
        uint256 index;
        string title;
        string url;
    }
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   STORAGE                                  */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- Map ----------------------------------- */
    mapping(string => address) public ownerLists;
    /* --------------------------------- OBJECT --------------------------------- */
    mapping(string => ObjectInfo[]) public userObject;
    /* --------------------------------- DEPOSIT -------------------------------- */
    mapping(string => DepositInfo[]) public userObjectDeposit;
    mapping(string => mapping(address => mapping(uint256 => Deposit))) public depositInfo;
    mapping(string => mapping(address => mapping(uint256 => uint256))) public depositTime;
    /* --------------------------------- LINK ----------------------------------- */
    mapping(string => mapping(uint256 => ObjectLinkInfo[])) public userObjectLink;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event Hello();
    /* ---------------------------------- Map ----------------------------------- */
    event CreatedMap(string name, address indexed sender);
    event ChangePhilandOwner(string name, address indexed sender);
    /* --------------------------------- OBJECT --------------------------------- */
    event WriteObject(string name, ObjectInfo writeObjectInfo);
    event RemoveObject(string name, uint256 index);
    /* --------------------------------- DEPOSIT -------------------------------- */
    event DepositSuccess(address indexed sender, string name, address contractAddress, uint256 tokenId, uint256 amount);
    event UnDepositSuccess(
        address indexed sender,
        string name,
        address contractAddress,
        uint256 tokenId,
        uint256 amount
    );
    /* ---------------------------------- LINK ---------------------------------- */
    event WriteLink(string name, uint256 index, string title, string url);
    event RemoveLink(string name, uint256 index);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- Map ----------------------------------- */
    error NotReadyPhiland(address sender, address owner);
    error NotPhilandOwner(address sender, address owner);
    error NotDepositEnough(string name, Object objectData, uint256 used, uint256 amount);
    error OutofMapRange(uint256 a, string error_boader);
    error ObjectCollision(ObjectInfo writeObjectInfo, ObjectInfo userObjectInfo, string error_boader);
    /* --------------------------------- OBJECT --------------------------------- */
    error NotReadyObject(address sender, uint256 object_index);
    /* --------------------------------- DEPOSIT -------------------------------- */
    error NotDeposit(address sender, address owner, uint256 token_id);
    error NotBalanceEnough(
        string name,
        address sender,
        address contractAddress,
        uint256 tokenId,
        uint256 currentDepositAmount,
        uint256 currentDepositUsed,
        uint256 updateDepositAmount,
        uint256 userBalance
    );
    error UnDepositError(uint256 amount, uint256 mapUnUsedBalance);

    /* ---------------------------------- LINK ---------------------------------- */

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    constructor(IObject _freeObject) {
        freeObject = _freeObject;
        mapSettings = MapSettings(0, 16, 0, 16);
        emit Hello();
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  MODIFIERS                                 */
    /* -------------------------------------------------------------------------- */
    modifier onlyIfNotPhilandCreated(string memory name) {
        address owner = ownerOfPhiland(name);
        if (owner == address(0)) {
            revert NotReadyPhiland({ sender: msg.sender, owner: owner });
        }
        _;
    }

    modifier onlyIfNotPhilandOwner(string memory name) {
        address owner = ownerOfPhiland(name);
        if (owner != msg.sender) {
            revert NotPhilandOwner({ sender: msg.sender, owner: owner });
        }
        _;
    }

    modifier onlyIfNotDepositObject(string memory name, Object memory objectData) {
        address owner = ownerOfPhiland(name);
        if (depositInfo[name][objectData.contractAddress][objectData.tokenId].amount == 0) {
            revert NotDeposit({ sender: msg.sender, owner: owner, token_id: objectData.tokenId });
        }
        _;
    }

    modifier onlyIfNotReadyObject(string memory name, uint256 object_index) {
        address owner = ownerOfPhiland(name);
        if (userObject[name][object_index].contractAddress == address(0)) {
            revert NotReadyObject({ sender: msg.sender, object_index: object_index });
        }
        _;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                     Map                                    */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- ADMIN --------------------------------- */
    function create(string memory name, address caller) external onlyOwner {
        ownerLists[name] = caller;
        emit CreatedMap(name, caller);
    }

    function changePhilandOwner(string memory name, address caller) external onlyOwner onlyIfNotPhilandCreated(name) {
        ownerLists[name] = caller;
        emit ChangePhilandOwner(name, caller);
    }

    /* ----------------------------------- VIEW --------------------------------- */
    /// @dev check that the user has already claimed Philand
    function ownerOfPhiland(string memory name) public view returns (address) {
        if (ownerLists[name] != address(0)) return ownerLists[name];
        else return address(0);
    }

    function viewPhiland(string memory name) external view returns (ObjectInfo[] memory) {
        return userObject[name];
    }

    /* ----------------------------------- WRITE -------------------------------- */
    function writeObjectToLand(
        string memory name,
        Object memory objectData,
        IObject _object
    ) public onlyIfNotPhilandOwner(name) onlyIfNotDepositObject(name, objectData) {
        if (
            depositInfo[name][objectData.contractAddress][objectData.tokenId].used + 1 <
            depositInfo[name][objectData.contractAddress][objectData.tokenId].amount
        ) {
            revert NotDepositEnough(
                name,
                objectData,
                depositInfo[name][objectData.contractAddress][objectData.tokenId].used,
                depositInfo[name][objectData.contractAddress][objectData.tokenId].amount
            );
        }
        depositInfo[name][objectData.contractAddress][objectData.tokenId].used++;

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
        emit WriteObject(name, objectinfo);
    }

    function batchWriteObjectToLand(
        string memory name,
        Object[] memory objectData,
        IObject[] memory _object
    ) public {
        for (uint256 i = 0; i < objectData.length; i++) {
            writeObjectToLand(name, objectData[i], _object[i]);
        }
    }

    /* ----------------------------------- REMOVE -------------------------------- */
    function removeObjectFromLand(string memory name, uint256 i)
        public
        onlyIfNotPhilandCreated(name)
        onlyIfNotPhilandOwner(name)
    {
        delete userObject[name][i];
        emit RemoveObject(name, i);
        delete userObjectLink[name][i];
        emit RemoveLink(name, i);
    }

    function batchRemoveObjectFromLand(string memory name, uint256[] memory index_array) public {
        for (uint256 i = 0; i < index_array.length; i++) {
            removeObjectFromLand(name, index_array[i]);
        }
    }

    /* -------------------------------- WRITE/REMOVE ----------------------------- */
    function batchRemoveAndWrite(
        string memory name,
        uint256[] memory remove_index_array,
        Object[] memory objectData,
        IObject[] memory _object
    ) external {
        batchRemoveObjectFromLand(name, remove_index_array);
        batchWriteObjectToLand(name, objectData, _object);
    }

    /* ----------------------------------- INTERNAL ------------------------------ */
    function checkCollision(string memory name, ObjectInfo memory objectInfo) private view {
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
                revert ObjectCollision({
                    writeObjectInfo: objectInfo,
                    userObjectInfo: userObject[name][i],
                    error_boader: "invalid objectInfo"
                });
            }
        }
        return;
    }

    /* -------------------------------------------------------------------------- */
    /*                                    OBJECT                                  */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- ADMIN --------------------------------- */
    function claimStarterObject(string memory name) external {
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

    /* -------------------------------------------------------------------------- */
    /*                                   DEPOSIT                                  */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- VIEW ---------------------------------- */
    function checkDepositStatus(
        string memory name,
        address _contractAddress,
        uint256 _tokenId
    ) public view returns (Deposit memory) {
        return depositInfo[name][_contractAddress][_tokenId];
    }

    function checkAllDepositStatus(string memory name) public view returns (Deposit[] memory) {
        Deposit[] memory deposits = new Deposit[](userObjectDeposit[name].length);
        for (uint256 i = 0; i < userObjectDeposit[name].length; i++) {
            DepositInfo memory depositObjectInfo = userObjectDeposit[name][i];
            Deposit memory item = depositInfo[name][depositObjectInfo.contractAddress][depositObjectInfo.tokenId];
            deposits[i] = item;
        }
        return deposits;
    }

    /* --------------------------------- deposit -------------------------------- */
    function deposit(
        string memory name,
        address _contractAddress,
        uint256 _tokenId,
        uint256 _amount,
        IObject _object
    ) public onlyIfNotPhilandOwner(name) {
        uint256 currentDepositAmount = depositInfo[name][_contractAddress][_tokenId].amount;
        uint256 updateDepositAmount = currentDepositAmount + _amount;
        uint256 currentDepositUsed = depositInfo[name][_contractAddress][_tokenId].used;
        uint256 userBalance = _object.balanceOf(msg.sender, _tokenId);
        if (userBalance < updateDepositAmount) {
            revert NotBalanceEnough({
                name: name,
                sender: msg.sender,
                contractAddress: _contractAddress,
                tokenId: _tokenId,
                currentDepositAmount: currentDepositAmount,
                currentDepositUsed: currentDepositUsed,
                updateDepositAmount: updateDepositAmount,
                userBalance: userBalance
            });
        }
        depositInfo[name][_contractAddress][_tokenId] = Deposit(
            updateDepositAmount,
            currentDepositUsed,
            block.timestamp
        );
        DepositInfo memory depositObjectInfo = DepositInfo(_contractAddress, _tokenId);
        userObjectDeposit[name].push(depositObjectInfo);
        _object.safeTransferFrom(msg.sender, address(this), _tokenId, _amount, "0x00");
        emit DepositSuccess(msg.sender, name, _contractAddress, _tokenId, _amount);
    }

    function batchDeposit(
        string memory name,
        address[] memory _contractAddresses,
        uint256[] memory _tokenIds,
        uint256[] memory _amounts,
        IObject[] memory _object
    ) public onlyIfNotPhilandOwner(name) {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            deposit(name, _contractAddresses[i], _tokenIds[i], _amounts[i], _object[i]);
        }
    }

    /* --------------------------------- unDeposit ------------------------------ */
    function unDeposit(
        string memory name,
        address _contractAddress,
        uint256 _tokenId,
        uint256 _amount,
        IObject _object
    ) public onlyIfNotPhilandOwner(name) {
        uint256 used = depositInfo[name][_contractAddress][_tokenId].used;
        uint256 mapUnusedAmount = depositInfo[name][_contractAddress][_tokenId].amount - used;
        if (_amount > mapUnusedAmount) {
            revert UnDepositError(_amount, mapUnusedAmount);
        }
        _object.safeTransferFrom(address(this), msg.sender, _tokenId, _amount, "0x00");
        depositTime[name][_contractAddress][_tokenId] += (block.timestamp -
            depositInfo[name][_contractAddress][_tokenId].timestamp);
        depositInfo[name][_contractAddress][_tokenId].amount =
            depositInfo[name][_contractAddress][_tokenId].amount -
            _amount;

        // delete depositInfo[msg.sender][_contractAddresses][_tokenId];
        emit UnDepositSuccess(msg.sender, name, _contractAddress, _tokenId, _amount);
    }

    function batchUnDeposit(
        string memory name,
        address[] memory _contractAddresses,
        uint256[] memory _tokenIds,
        uint256[] memory _amounts,
        IObject[] memory _object
    ) public onlyIfNotPhilandOwner(name) {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            unDeposit(name, _contractAddresses[i], _tokenIds[i], _amounts[i], _object[i]);
        }
    }

    /* ----------------------------------- RECEIVE ------------------------------ */
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

    /* -------------------------------------------------------------------------- */
    /*                                    LINK                                    */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- VIEW ---------------------------------- */

    function viewObjectLink(string memory name, uint256 object_index) external view returns (ObjectLinkInfo[] memory) {
        return userObjectLink[name][object_index];
    }

    function viewLinks(string memory name) external view returns (Links[] memory) {
        Links[] memory links = new Links[](userObject[name].length);
        for (uint256 i = 0; i < userObject[name].length; i++) {
            if (userObjectLink[name][i].length != 0) {
                Links memory objectLink = Links(i, userObjectLink[name][i][0].title, userObjectLink[name][i][0].url);
                links[i] = objectLink;
            }
        }
        return links;
    }

    /* ---------------------------------- WRITE --------------------------------- */
    function writeLinkToObject(
        string memory name,
        uint256 object_index,
        string memory title,
        string memory url
    ) public onlyIfNotPhilandCreated(name) onlyIfNotPhilandOwner(name) onlyIfNotReadyObject(name, object_index) {
        ObjectLinkInfo memory objectLinkInfo = ObjectLinkInfo(title, url);
        userObjectLink[name][object_index].push(objectLinkInfo);
        emit WriteLink(name, object_index, title, url);
    }

    /* ---------------------------------- REMOVE --------------------------------- */
    function removeLinkFromObject(string memory name, uint256 object_index) external onlyIfNotPhilandOwner(name) {
        delete userObjectLink[name][object_index];
        emit RemoveLink(name, object_index);
    }
}
