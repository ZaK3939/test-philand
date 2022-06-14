/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import * as Contracts from ".";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "ethers";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "ENS",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ENS__factory>;
    getContractFactory(
      name: "ENSRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ENSRegistry__factory>;
    getContractFactory(
      name: "AccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlUpgradeable__factory>;
    getContractFactory(
      name: "IAccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlUpgradeable__factory>;
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "IERC1155ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC2981",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC2981__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "ERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155__factory>;
    getContractFactory(
      name: "ERC1155Supply",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155Supply__factory>;
    getContractFactory(
      name: "IERC1155MetadataURI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155MetadataURI__factory>;
    getContractFactory(
      name: "IERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155__factory>;
    getContractFactory(
      name: "IERC1155Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Receiver__factory>;
    getContractFactory(
      name: "ERC1155Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "TestRegistrar",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestRegistrar__factory>;
    getContractFactory(
      name: "TestResolver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestResolver__factory>;
    getContractFactory(
      name: "IENS",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IENS__factory>;
    getContractFactory(
      name: "Resolver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Resolver__factory>;
    getContractFactory(
      name: "IObject",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IObject__factory>;
    getContractFactory(
      name: "IPhiMap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPhiMap__factory>;
    getContractFactory(
      name: "IPhiObject",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPhiObject__factory>;
    getContractFactory(
      name: "IPhiRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPhiRegistry__factory>;
    getContractFactory(
      name: "ISoulObject",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISoulObject__factory>;
    getContractFactory(
      name: "FreeObject",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FreeObject__factory>;
    getContractFactory(
      name: "PhiObject",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PhiObject__factory>;
    getContractFactory(
      name: "PremiumObject",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PremiumObject__factory>;
    getContractFactory(
      name: "WallPaper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WallPaper__factory>;
    getContractFactory(
      name: "ObjectController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ObjectController__factory>;
    getContractFactory(
      name: "PhiClaim",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PhiClaim__factory>;
    getContractFactory(
      name: "PhiMap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PhiMap__factory>;
    getContractFactory(
      name: "PhiRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PhiRegistry__factory>;
    getContractFactory(
      name: "BaseObject",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseObject__factory>;
    getContractFactory(
      name: "MultiOwner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MultiOwner__factory>;

    getContractAt(
      name: "ENS",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ENS>;
    getContractAt(
      name: "ENSRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ENSRegistry>;
    getContractAt(
      name: "AccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlUpgradeable>;
    getContractAt(
      name: "IAccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlUpgradeable>;
    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "IERC1155ReceiverUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155ReceiverUpgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC2981",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC2981>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "ERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155>;
    getContractAt(
      name: "ERC1155Supply",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155Supply>;
    getContractAt(
      name: "IERC1155MetadataURI",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155MetadataURI>;
    getContractAt(
      name: "IERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155>;
    getContractAt(
      name: "IERC1155Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Receiver>;
    getContractAt(
      name: "ERC1155Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "TestRegistrar",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestRegistrar>;
    getContractAt(
      name: "TestResolver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestResolver>;
    getContractAt(
      name: "IENS",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IENS>;
    getContractAt(
      name: "Resolver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Resolver>;
    getContractAt(
      name: "IObject",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IObject>;
    getContractAt(
      name: "IPhiMap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPhiMap>;
    getContractAt(
      name: "IPhiObject",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPhiObject>;
    getContractAt(
      name: "IPhiRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPhiRegistry>;
    getContractAt(
      name: "ISoulObject",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISoulObject>;
    getContractAt(
      name: "FreeObject",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FreeObject>;
    getContractAt(
      name: "PhiObject",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PhiObject>;
    getContractAt(
      name: "PremiumObject",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PremiumObject>;
    getContractAt(
      name: "WallPaper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WallPaper>;
    getContractAt(
      name: "ObjectController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ObjectController>;
    getContractAt(
      name: "PhiClaim",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PhiClaim>;
    getContractAt(
      name: "PhiMap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PhiMap>;
    getContractAt(
      name: "PhiRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PhiRegistry>;
    getContractAt(
      name: "BaseObject",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseObject>;
    getContractAt(
      name: "MultiOwner",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MultiOwner>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
