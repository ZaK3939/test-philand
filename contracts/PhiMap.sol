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
    uint256 public numberOfLand;
    mapping(string => address) public ownerLists;
    /* --------------------------------- OBJECT --------------------------------- */
    uint256 public numberOfObject;
    mapping(string => ObjectInfo[]) public userObject;
    /* --------------------------------- DEPOSIT -------------------------------- */
    mapping(string => DepositInfo[]) public userObjectDeposit;
    mapping(string => mapping(address => mapping(uint256 => Deposit))) public depositInfo;
    mapping(string => mapping(address => mapping(uint256 => uint256))) public depositTime;
    /* --------------------------------- LINK ----------------------------------- */
    uint256 public numberOfLink;
    mapping(string => mapping(uint256 => ObjectLinkInfo[])) public userObjectLink;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event Hello();
    /* ---------------------------------- Map ----------------------------------- */
    event CreatedMap(string indexed name, address indexed sender, uint256 numberOfLand);
    event ChangePhilandOwner(string indexed name, address indexed sender);
    /* --------------------------------- OBJECT --------------------------------- */
    event WriteObject(string indexed name, ObjectInfo writeObjectInfo);
    event RemoveObject(string indexed name, uint256 index);
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
    event WriteLink(string indexed name, uint256 index, string title, string url);
    event RemoveLink(string indexed name, uint256 index);
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
        numberOfLand = 0;
        numberOfObject = 0;
        numberOfLink = 0;
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
    /*
     * @title create
     * @notice Receive create map Message from PhiRegistry
     * @param name : ens name
     * @param caller : Address of the owner of the ens
     * @dev Basically only execution from phi registry contract
     */
    function create(string memory name, address caller) external onlyOwner {
        ownerLists[name] = caller;
        unchecked {
            numberOfLand++;
        }
        emit CreatedMap(name, caller, numberOfLand);
    }

    /*
     * @title changePhilandOwner
     * @notice Receive change map owner message from PhiRegistry
     * @param name : Ens name
     * @param caller : Address of the owner of the ens
     * @dev Basically only execution from phi registry contract
     */
    function changePhilandOwner(string memory name, address caller) external onlyOwner onlyIfNotPhilandCreated(name) {
        ownerLists[name] = caller;
        emit ChangePhilandOwner(name, caller);
    }

    /* ----------------------------------- VIEW --------------------------------- */
    /*
     * @title ownerOfPhiland
     * @notice Return philand owner address
     * @param name : Ens name
     * @dev check that the user has already claimed Philand
     */
    function ownerOfPhiland(string memory name) public view returns (address) {
        if (ownerLists[name] != address(0)) return ownerLists[name];
        else return address(0);
    }

    /*
     * @title viewPhiland
     * @notice Return philand object
     * @param name : Ens name
     * @dev List of objects written to map contract. Deleted Object is contract address == 0
     */
    function viewPhiland(string memory name) external view returns (ObjectInfo[] memory) {
        return userObject[name];
    }

    /* ----------------------------------- WRITE -------------------------------- */
    /*
     * @title writeObjectToLand
     * @notice Return philand object
     * @param name : Ens name
     * @param objectData : Object (address contractAddress,uint256 tokenId, uint256 xStart, uint256 yStart)
     * @dev NFT must be deposited in the contract before writing.
     */
    function writeObjectToLand(string memory name, Object memory objectData)
        public
        onlyIfNotPhilandOwner(name)
        onlyIfNotDepositObject(name, objectData)
    {
        // Check the number of deposit NFTs to write object
        checkDepositAvailable(name, objectData);
        depositInfo[name][objectData.contractAddress][objectData.tokenId].used++;

        IObject _object = IObject(objectData.contractAddress);
        // Object contract requires getSize functions for x,y,z
        IObject.Size memory size = _object.getSize(objectData.tokenId);
        ObjectInfo memory writeObjectInfo = ObjectInfo(
            objectData.contractAddress,
            objectData.tokenId,
            objectData.xStart,
            objectData.yStart,
            objectData.xStart + size.x,
            objectData.yStart + size.y
        );

        // Check the write Object do not collide with previous written objects
        checkCollision(name, writeObjectInfo);
        userObject[name].push(writeObjectInfo);

        unchecked {
            numberOfObject++;
        }
        emit WriteObject(name, writeObjectInfo);
    }

    /*
     * @title batchWriteObjectToLand
     * @notice batch write function
     * @param name : Ens name
     * @param objectData[] : Array of Object struct (address contractAddress, uint256 tokenId, uint256 xStart, uint256 yStart)
     * @dev NFT must be deposited in the contract before writing. Object contract requires getSize functions for x,y,z
     */
    function batchWriteObjectToLand(string memory name, Object[] memory objectData) public {
        for (uint256 i = 0; i < objectData.length; i++) {
            writeObjectToLand(name, objectData[i]);
        }
    }

    /* ----------------------------------- REMOVE -------------------------------- */
    /*
     * @title removeObjectFromLand
     * @notice remove object from philand
     * @param name : Ens name
     * @param index : Object index
     * @dev When deleting an object, link information is deleted at the same time.
     */
    function removeObjectFromLand(string memory name, uint256 index)
        public
        onlyIfNotPhilandCreated(name)
        onlyIfNotPhilandOwner(name)
    {
        delete userObject[name][index];
        emit RemoveObject(name, index);
        unchecked {
            numberOfObject--;
        }
        delete userObjectLink[name][index];
        unchecked {
            numberOfLink--;
        }
        emit RemoveLink(name, index);
    }

    /*
     * @title batchRemoveObjectFromLand
     * @notice batch remove objects from philand
     * @param name : Ens name
     * @param index : Array of Object index
     * @dev When deleting an object, link information is deleted at the same time.
     */
    function batchRemoveObjectFromLand(string memory name, uint256[] memory index_array) public {
        for (uint256 i = 0; i < index_array.length; i++) {
            removeObjectFromLand(name, index_array[i]);
        }
    }

    /* -------------------------------- WRITE/REMOVE ----------------------------- */
    /*
     * @title batchRemoveAndWrite
     * @notice Function for save to be executed after editing
     * @param name : Ens name
     * @param remove_index_array : Array of Object index
     * @param objectData[] : Array of Object struct (address contractAddress, uint256 tokenId, uint256 xStart, uint256 yStart)
     * @dev This function cannot set links at the same time.
     */
    function batchRemoveAndWrite(
        string memory name,
        uint256[] memory remove_index_array,
        Object[] memory objectData
    ) external {
        batchRemoveObjectFromLand(name, remove_index_array);
        batchWriteObjectToLand(name, objectData);
    }

    /* ----------------------------------- INTERNAL ------------------------------ */
    /*
     * @title checkCollision
     * @notice Functions for collision detection
     * @param name : Ens name
     * @param writeObjectInfo : Information about the object you want to write.
     * @dev execute when writing an object.
     */
    function checkCollision(string memory name, ObjectInfo memory writeObjectInfo) private view {
        // fails if writing object is out of range of map
        if (writeObjectInfo.xStart < mapSettings.minX || writeObjectInfo.xStart > mapSettings.maxX) {
            revert OutofMapRange({ a: writeObjectInfo.xStart, error_boader: "invalid xStart" });
        }
        if (writeObjectInfo.xEnd < mapSettings.minX || writeObjectInfo.xEnd > mapSettings.maxX) {
            revert OutofMapRange({ a: writeObjectInfo.xEnd, error_boader: "invalid xEnd" });
        }
        if (writeObjectInfo.yStart < mapSettings.minY || writeObjectInfo.yStart > mapSettings.maxY) {
            revert OutofMapRange({ a: writeObjectInfo.yStart, error_boader: "invalid yStart" });
        }
        if (writeObjectInfo.yEnd < mapSettings.minY || writeObjectInfo.yEnd > mapSettings.maxY) {
            revert OutofMapRange({ a: writeObjectInfo.yEnd, error_boader: "invalid yEnd" });
        }

        if (userObject[name].length == 0) {
            return;
        }

        for (uint256 i = 0; i < userObject[name].length; i++) {
            // Skip if already deleted
            if (userObject[name][i].contractAddress == address(0)) {
                continue;
            }
            // Rectangular objects do not collide when any of the following four conditions are satisfied
            if (
                writeObjectInfo.xEnd <= userObject[name][i].xStart ||
                userObject[name][i].xEnd <= writeObjectInfo.xStart ||
                writeObjectInfo.yEnd <= userObject[name][i].yStart ||
                userObject[name][i].yEnd <= writeObjectInfo.yStart
            ) {
                continue;
            } else {
                revert ObjectCollision({
                    writeObjectInfo: writeObjectInfo,
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
    /*
     * @title claimStarterObject
     * @notice Functions for mint free object
     * @param name : Ens name
     * @dev Functions for testing. May be turned off for production.
     */
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
    /*
     * @title checkDepositAvailable
     * @notice Functions for collision detection
     * @param name : Ens name
     * @param objectData : Object (address contractAddress,uint256 tokenId, uint256 xStart, uint256 yStart)
     * @dev Check the number of deposit NFTs to write object
     */
    function checkDepositAvailable(string memory name, Object memory objectData) private view {
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
        return;
    }

    /*
     * @title checkDepositStatus
     * @notice Functions for check deposit status for specific token
     * @param name : Ens name
     * @param _contractAddress : contract address you want to check
     * @param _tokenId : token id you want to check
     * @dev Check deposit information
     */
    function checkDepositStatus(
        string memory name,
        address _contractAddress,
        uint256 _tokenId
    ) public view returns (Deposit memory) {
        return depositInfo[name][_contractAddress][_tokenId];
    }

    /*
     * @title checkAllDepositStatus
     * @notice Functions for check deposit status for all token
     * @param name : Ens name
     * @dev Check users' all deposit information
     */
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
    /*
     * @title deposit
     * @notice Functions for deposit token to this(map) contract
     * @param name : Ens name
     * @param _contractAddress : deposit contract address
     * @param _tokenId : deposit token id
     * @param _amount : deposit amount
     * @dev Need approve. With deposit, ENS transfer allows user to transfer philand with token.
     */
    function deposit(
        string memory name,
        address _contractAddress,
        uint256 _tokenId,
        uint256 _amount
    ) public onlyIfNotPhilandOwner(name) {
        uint256 currentDepositAmount = depositInfo[name][_contractAddress][_tokenId].amount;
        uint256 updateDepositAmount = currentDepositAmount + _amount;
        uint256 currentDepositUsed = depositInfo[name][_contractAddress][_tokenId].used;

        IObject _object = IObject(_contractAddress);
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

        // Maintain a list of deposited contract addresses and token ids for checkAllDepositStatus.
        DepositInfo memory depositObjectInfo = DepositInfo(_contractAddress, _tokenId);
        bool check;
        for (uint256 i = 0; i < userObjectDeposit[name].length; i++) {
            DepositInfo memory depositObjectToken = userObjectDeposit[name][i];
            if (depositObjectToken.contractAddress == _contractAddress && depositObjectToken.tokenId == _tokenId) {
                check = true;
                break;
            }
        }
        if (!check) {
            userObjectDeposit[name].push(depositObjectInfo);
        }

        _object.safeTransferFrom(msg.sender, address(this), _tokenId, _amount, "0x00");
        emit DepositSuccess(msg.sender, name, _contractAddress, _tokenId, _amount);
    }

    /*
     * @title batchDeposit
     * @notice Functions for batch deposit tokens to this(map) contract
     * @param name : Ens name
     * @param _contractAddresses : array of deposit contract addresses
     * @param _tokenIds :  array of deposit token ids
     * @param _amounts :  array of deposit amounts
     */
    function batchDeposit(
        string memory name,
        address[] memory _contractAddresses,
        uint256[] memory _tokenIds,
        uint256[] memory _amounts
    ) public onlyIfNotPhilandOwner(name) {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            deposit(name, _contractAddresses[i], _tokenIds[i], _amounts[i]);
        }
    }

    /* --------------------------------- unDeposit ------------------------------ */
    /*
     * @title UnDeposit
     * @notice Functions for deposit token from this(map) contract
     * @param name : Ens name
     * @param _contractAddress : deposit contract address
     * @param _tokenId : deposit token id
     * @param _amount : deposit amount
     * @dev Return ERROR when attempting to undeposit over unused
     */
    function unDeposit(
        string memory name,
        address _contractAddress,
        uint256 _tokenId,
        uint256 _amount
    ) public onlyIfNotPhilandOwner(name) {
        uint256 used = depositInfo[name][_contractAddress][_tokenId].used;
        uint256 mapUnusedAmount = depositInfo[name][_contractAddress][_tokenId].amount - used;
        if (_amount > mapUnusedAmount) {
            revert UnDepositError(_amount, mapUnusedAmount);
        }
        IObject _object = IObject(_contractAddress);
        _object.safeTransferFrom(address(this), msg.sender, _tokenId, _amount, "0x00");
        depositTime[name][_contractAddress][_tokenId] += (block.timestamp -
            depositInfo[name][_contractAddress][_tokenId].timestamp);
        depositInfo[name][_contractAddress][_tokenId].amount =
            depositInfo[name][_contractAddress][_tokenId].amount -
            _amount;

        emit UnDepositSuccess(msg.sender, name, _contractAddress, _tokenId, _amount);
    }

    /*
     * @title batchUnDeposit
     * @notice Functions for batch undeposit tokens from this(map) contract
     * @param name : Ens name
     * @param _contractAddresses : array of deposit contract addresses
     * @param _tokenIds :  array of deposit token ids
     * @param _amounts :  array of deposit amounts
     */
    function batchUnDeposit(
        string memory name,
        address[] memory _contractAddresses,
        uint256[] memory _tokenIds,
        uint256[] memory _amounts
    ) public onlyIfNotPhilandOwner(name) {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            unDeposit(name, _contractAddresses[i], _tokenIds[i], _amounts[i]);
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
    /*
     * @title viewObjectLink
     * @notice Functions for check link status for specificed object
     * @param name : Ens name
     * @param object_index : object_index you want to check
     * @dev Check link information
     */
    function viewObjectLink(string memory name, uint256 object_index) external view returns (ObjectLinkInfo[] memory) {
        return userObjectLink[name][object_index];
    }

    /*
     * @title viewLinks
     * @notice Functions for check all link status
     * @param name : Ens name
     * @dev Check all link information
     */
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
    /*
     * @title writeLinkToObject
     * @notice Functions for write link
     * @param name : Ens name
     * @param object_index : object index
     * @param title : Link title
     * @param url : https://
     * @dev Check all link information
     */
    function writeLinkToObject(
        string memory name,
        uint256 object_index,
        string memory title,
        string memory url
    ) public onlyIfNotPhilandCreated(name) onlyIfNotPhilandOwner(name) onlyIfNotReadyObject(name, object_index) {
        ObjectLinkInfo memory objectLinkInfo = ObjectLinkInfo(title, url);
        userObjectLink[name][object_index].push(objectLinkInfo);
        unchecked {
            numberOfLink--;
        }
        emit WriteLink(name, object_index, title, url);
    }

    /* ---------------------------------- REMOVE --------------------------------- */
    /*
     * @title removeLinkFromObject
     * @notice Functions for remove link
     * @param name : Ens name
     * @param object_index : object index
     * @dev delete link information
     */
    function removeLinkFromObject(string memory name, uint256 object_index) external onlyIfNotPhilandOwner(name) {
        delete userObjectLink[name][object_index];
        unchecked {
            numberOfLink--;
        }
        emit RemoveLink(name, object_index);
    }
}
