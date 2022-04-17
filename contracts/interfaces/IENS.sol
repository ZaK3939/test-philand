// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.8;

interface IENS {
    function resolver(bytes32 node) external view returns (Resolver);

    function owner(bytes32 node) external view returns (address);
}

abstract contract Resolver {
    function addr(bytes32 node) public view virtual returns (address);
}
