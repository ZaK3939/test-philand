// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.8;

interface IPhiObject {
    struct Size {
        uint8 x;
        uint8 y;
        uint8 z;
    }

    function getSize(uint256 tokenId) external view returns (Size memory);

    function balanceOf(address account, uint256 id) external view returns (uint256);

    function setOwner(address newOwner) external;

    function getPhiObject(address to, uint256 tokenId) external;

    function mintBatchObject(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external;

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;
}
