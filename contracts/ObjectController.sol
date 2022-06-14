// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.9;

import { IENS } from "./interfaces/IENS.sol";
import { IObject } from "./interfaces/IObject.sol";

contract ObjectController {
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    address private phiMapAddress;
    /* --------------------------------- ****** --------------------------------- */
    /* --------------------------------- APPROVE -------------------------------- */
    event SuccessApproveSet(address indexed sender, address[] addresses);

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    constructor(address _phiMapAddress) {
        phiMapAddress = _phiMapAddress;
    }

    /* -------------------------------------------------------------------------- */
    /*                                    APPROVE                                 */
    /* -------------------------------------------------------------------------- */
    /*
     * @title setApproveForBasicObject
     * @notice Functions for addresses
     * @param addresses : addresses objects
     */
    function setApproveForBasicObjects(address[] memory addresses) external {
        bool check;
        for (uint256 i = 0; i < addresses.length; i++) {
            IObject _object = IObject(addresses[i]);
            (bool success, ) = addresses[i].delegatecall(
                abi.encodeWithSignature("setApprovalForAll(address,bool)", address(phiMapAddress), true)
            );
            require(success);
        }
        emit SuccessApproveSet(msg.sender, addresses);
    }
}
