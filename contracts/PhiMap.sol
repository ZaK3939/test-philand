// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import { IERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import { IObject } from "./interfaces/IObject.sol";
import { IPhiRegistry } from "./interfaces/IPhiRegistry.sol";
import "./utils/Strings.sol";
import "hardhat/console.sol";

contract PhiMap is AccessControlUpgradeable, IERC1155ReceiverUpgradeable {
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
        Link link;
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
    struct DepositAllInfo {
        address contractAddress;
        uint256 tokenId;
        uint256 amount;
        uint256 used;
        uint256 timestamp;
    }
    /* --------------------------------- LINK ----------------------------------- */
    struct Link {
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
    event Initialization(string indexed name, address indexed sender);
    event Save(
        string indexed name,
        address indexed sender,
        uint256[] remove_index_array,
        Object[] objectData,
        Link[] link
    );
    /* --------------------------------- DEPOSIT -------------------------------- */
    event DepositSuccess(
        address indexed sender,
        string indexed name,
        address contractAddress,
        uint256 tokenId,
        uint256 amount
    );
    event UnDepositSuccess(
        address indexed sender,
        string indexed name,
        address contractAddress,
        uint256 tokenId,
        uint256 amount
    );
    /* ---------------------------------- LINK ---------------------------------- */
    event WriteLink(string indexed name, uint256 index, Link link);
    event RemoveLink(string indexed name, uint256 index);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    error NotAdminCall(address sender);
    /* ---------------------------------- Map ----------------------------------- */
    error NotReadyPhiland(address sender, address owner);
    error NotPhilandOwner(address sender, address owner);
    error NotDepositEnough(string name, address contractAddress, uint256 tokenId, uint256 used, uint256 amount);
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
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(address _admin) public initializer {
        numberOfLand = 0;
        numberOfObject = 0;
        mapSettings = MapSettings(0, 16, 0, 16);
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
    }

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
    function create(string memory name, address caller) external onlyIfNotOnwer {
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
    function changePhilandOwner(string memory name, address caller)
        external
        onlyIfNotOnwer
        onlyIfNotPhilandCreated(name)
    {
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

    /*
     * @title viewNumberOfPhiland
     * @notice Return number of philand
     */
    function viewNumberOfPhiland() external view returns (uint256) {
        return numberOfLand;
    }

    /*
     * @title viewNumberOfObject
     * @notice Return number of philand
     */
    function viewNumberOfObject() external view returns (uint256) {
        return numberOfObject;
    }

    /* ----------------------------------- WRITE -------------------------------- */
    /*
     * @title writeObjectToLand
     * @notice Return philand object
     * @param name : Ens name
     * @param objectData : Object (address contractAddress,uint256 tokenId, uint256 xStart, uint256 yStart)
     * @param link : Link (stirng title, string url)
     * @dev NFT must be deposited in the contract before writing.
     */
    function writeObjectToLand(
        string memory name,
        Object memory objectData,
        Link memory link
    ) public onlyIfNotPhilandOwner(name) onlyIfNotDepositObject(name, objectData) {
        // Check the number of deposit NFTs to write object
        checkDepositAvailable(name, objectData.contractAddress, objectData.tokenId);
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
            objectData.yStart + size.y,
            link
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
     * @param objectData : Array of Object struct (address contractAddress, uint256 tokenId, uint256 xStart, uint256 yStart)
     * @param links : Array of Link struct(stirng title, string url)
     * @dev NFT must be deposited in the contract before writing. Object contract requires getSize functions for x,y,z
     */
    function batchWriteObjectToLand(
        string memory name,
        Object[] memory objectData,
        Link[] memory link
    ) public {
        for (uint256 i = 0; i < objectData.length; i++) {
            writeObjectToLand(name, objectData[i], link[i]);
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
        ObjectInfo memory depositItem = userObject[name][index];
        depositInfo[name][depositItem.contractAddress][depositItem.tokenId].used =
            depositInfo[name][depositItem.contractAddress][depositItem.tokenId].used -
            1;
        delete userObject[name][index];
        emit RemoveObject(name, index);
        unchecked {
            numberOfObject--;
        }
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
     * @param objectDatas : Array of Object struct (address contractAddress, uint256 tokenId, uint256 xStart, uint256 yStart)
     * @param links : Array of Link (stirng title, string url)
     * @dev This function cannot set links at the same time.
     */
    function batchRemoveAndWrite(
        string memory name,
        uint256[] memory remove_index_array,
        bool remove_check,
        Object[] memory objectDatas,
        Link[] memory links
    ) public {
        if (remove_check == true) {
            batchRemoveObjectFromLand(name, remove_index_array);
        }
        batchWriteObjectToLand(name, objectDatas, links);
    }

    /* -------------------------------- INITIALIZATION -------------------------- */
    /*
     * @title initialization
     * @notice Function for clear users map objects and links
     * @param name : Ens name
     * @dev [Carefully] This function init objects and links
     */
    function initialization(string memory name) external onlyIfNotPhilandCreated(name) onlyIfNotPhilandOwner(name) {
        uint256 objectLength = userObject[name].length;
        for (uint256 i = 0; i < objectLength; i++) {
            if (userObject[name][i].contractAddress != address(0)) {
                removeObjectFromLand(name, i);
            }
        }
        for (uint256 i = 0; i < objectLength; i++) {
            userObject[name].pop();
        }
        emit Initialization(name, msg.sender);
    }

    /* ------------------------------------ SAVE -------------------------------- */
    /*
     * @title initialization
     * @notice Function for clear users map objects and links
     * @param name : Ens name
     * @param remove_check : if remove_check == 1 then remove is skipped
     * @param remove_index_array : Array of Object index
     * @param objectData : Array of Object struct (address contractAddress, uint256 tokenId, uint256 xStart, uint256 yStart)
     * @param link : Array of Link struct(stirng title, string url)
     * @dev  Write Link method can also usefull for remove link
     */
    function save(
        string memory name,
        uint256[] memory remove_index_array,
        bool remove_check,
        Object[] memory objectDatas,
        Link[] memory links
    ) external onlyIfNotPhilandCreated(name) onlyIfNotPhilandOwner(name) {
        batchRemoveAndWrite(name, remove_index_array, remove_check, objectDatas, links);
        emit Save(name, msg.sender, remove_index_array, objectDatas, links);
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
    /*                                   DEPOSIT                                  */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- VIEW ---------------------------------- */
    /*
     * @title checkDepositAvailable
     * @notice Functions for collision detection
     * @param name : Ens name
     * @param contractAddress : contractAddress
     * @paramtokenId : tokenId
     * @dev Check the number of deposit NFTs to write object
     */
    function checkDepositAvailable(
        string memory name,
        address contractAddress,
        uint256 tokenId
    ) private view {
        if (depositInfo[name][contractAddress][tokenId].used + 1 > depositInfo[name][contractAddress][tokenId].amount) {
            revert NotDepositEnough(
                name,
                contractAddress,
                tokenId,
                depositInfo[name][contractAddress][tokenId].used,
                depositInfo[name][contractAddress][tokenId].amount
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
    function checkAllDepositStatus(string memory name) public view returns (DepositAllInfo[] memory) {
        DepositAllInfo[] memory deposits = new DepositAllInfo[](userObjectDeposit[name].length);
        for (uint256 i = 0; i < userObjectDeposit[name].length; i++) {
            DepositInfo memory depositObjectInfo = userObjectDeposit[name][i];
            Deposit memory tempItem = depositInfo[name][depositObjectInfo.contractAddress][depositObjectInfo.tokenId];
            DepositAllInfo memory item = DepositAllInfo(
                depositObjectInfo.contractAddress,
                depositObjectInfo.tokenId,
                tempItem.amount,
                tempItem.used,
                tempItem.timestamp
            );
            deposits[i] = item;
        }
        return deposits;
    }

    /* --------------------------------- DEPOSIT -------------------------------- */
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
        if (userBalance < updateDepositAmount - currentDepositAmount) {
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
    function viewObjectLink(string memory name, uint256 object_index) external view returns (Link memory) {
        return userObject[name][object_index].link;
    }

    /*
     * @title viewLinks
     * @notice Functions for check all link status
     * @param name : Ens name
     * @dev Check all link information
     */
    function viewLinks(string memory name) external view returns (Link[] memory) {
        Link[] memory links = new Link[](userObject[name].length);
        for (uint256 i = 0; i < userObject[name].length; i++) {
            links[i] = userObject[name][i].link;
        }
        return links;
    }

    /* ---------------------------------- WRITE --------------------------------- */
    /*
     * @title writeLinkToObject
     * @notice Functions for write link
     * @param name : Ens name
     * @param object_index : object index
     * @param link : Link struct(stirng title, string url)
     * @dev Check all link information
     */
    function writeLinkToObject(
        string memory name,
        uint256 object_index,
        Link memory link
    ) public onlyIfNotPhilandCreated(name) onlyIfNotPhilandOwner(name) onlyIfNotReadyObject(name, object_index) {
        userObject[name][object_index].link = link;
        emit WriteLink(name, object_index, link);
    }

    /*
     * @title batchWriteLinkToObject
     * @notice Functions for write link
     * @param name : Ens name
     * @param object_indexes : array of object index
     * @param links : Array of Link struct(stirng title, string url)
     * @dev Check all link information
     */
    function batchWriteLinkToObject(
        string memory name,
        uint256[] memory object_indexes,
        Link[] memory links
    ) public onlyIfNotPhilandCreated(name) onlyIfNotPhilandOwner(name) {
        for (uint256 i = 0; i < object_indexes.length; i++) {
            writeLinkToObject(name, object_indexes[i], links[i]);
        }
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
        userObject[name][object_index].link = Link("", "");
        emit RemoveLink(name, object_index);
    }
}
