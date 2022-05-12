/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export declare namespace PhiMap {
  export type ObjectStruct = {
    contractAddress: string;
    tokenId: BigNumberish;
    xStart: BigNumberish;
    yStart: BigNumberish;
  };

  export type ObjectStructOutput = [string, BigNumber, BigNumber, BigNumber] & {
    contractAddress: string;
    tokenId: BigNumber;
    xStart: BigNumber;
    yStart: BigNumber;
  };

  export type DepositStruct = { amount: BigNumberish; timestamp: BigNumberish };

  export type DepositStructOutput = [BigNumber, BigNumber] & {
    amount: BigNumber;
    timestamp: BigNumber;
  };

  export type ObjectLinkInfoStruct = { title: string; url: string };

  export type ObjectLinkInfoStructOutput = [string, string] & {
    title: string;
    url: string;
  };

  export type ObjectInfoStruct = {
    contractAddress: string;
    tokenId: BigNumberish;
    xStart: BigNumberish;
    yStart: BigNumberish;
    xEnd: BigNumberish;
    yEnd: BigNumberish;
  };

  export type ObjectInfoStructOutput = [
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    contractAddress: string;
    tokenId: BigNumber;
    xStart: BigNumber;
    yStart: BigNumber;
    xEnd: BigNumber;
    yEnd: BigNumber;
  };
}

export interface PhiMapInterface extends utils.Interface {
  functions: {
    "batchDeposit(address,uint256[],uint256[],address)": FunctionFragment;
    "batchRemoveAndWrite(string,uint256[],(address,uint256,uint256,uint256)[],address[])": FunctionFragment;
    "batchRemoveObjectFromLand(string,uint256[])": FunctionFragment;
    "batchWriteObjectToLand(string,(address,uint256,uint256,uint256)[],address[])": FunctionFragment;
    "checkDepositStatus(address,address,uint256)": FunctionFragment;
    "claimStarterObject(string)": FunctionFragment;
    "create(string,address)": FunctionFragment;
    "deposit(address,uint256,uint256,address)": FunctionFragment;
    "depositInfo(address,address,uint256)": FunctionFragment;
    "depositTime(address,address,uint256)": FunctionFragment;
    "freeObject()": FunctionFragment;
    "mapSettings()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "owner(address)": FunctionFragment;
    "ownerLists(string)": FunctionFragment;
    "ownerOfPhiland(string)": FunctionFragment;
    "removeLinkFromObject(string,uint256)": FunctionFragment;
    "removeObjectFromLand(string,uint256)": FunctionFragment;
    "removeOwner(address)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "undeposit(address,uint256,address)": FunctionFragment;
    "userObject(string,uint256)": FunctionFragment;
    "userObjectLink(string,uint256,uint256)": FunctionFragment;
    "viewObjectLink(string,uint256)": FunctionFragment;
    "viewPhiland(string)": FunctionFragment;
    "writeLinkToObject(string,uint256,string,string)": FunctionFragment;
    "writeObjectToLand(string,(address,uint256,uint256,uint256),address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "batchDeposit"
      | "batchRemoveAndWrite"
      | "batchRemoveObjectFromLand"
      | "batchWriteObjectToLand"
      | "checkDepositStatus"
      | "claimStarterObject"
      | "create"
      | "deposit"
      | "depositInfo"
      | "depositTime"
      | "freeObject"
      | "mapSettings"
      | "onERC1155BatchReceived"
      | "onERC1155Received"
      | "owner"
      | "ownerLists"
      | "ownerOfPhiland"
      | "removeLinkFromObject"
      | "removeObjectFromLand"
      | "removeOwner"
      | "setOwner"
      | "supportsInterface"
      | "undeposit"
      | "userObject"
      | "userObjectLink"
      | "viewObjectLink"
      | "viewPhiland"
      | "writeLinkToObject"
      | "writeObjectToLand"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "batchDeposit",
    values: [string, BigNumberish[], BigNumberish[], string]
  ): string;
  encodeFunctionData(
    functionFragment: "batchRemoveAndWrite",
    values: [string, BigNumberish[], PhiMap.ObjectStruct[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "batchRemoveObjectFromLand",
    values: [string, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "batchWriteObjectToLand",
    values: [string, PhiMap.ObjectStruct[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "checkDepositStatus",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "claimStarterObject",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "depositInfo",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositTime",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "freeObject",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mapSettings",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values: [string]): string;
  encodeFunctionData(functionFragment: "ownerLists", values: [string]): string;
  encodeFunctionData(
    functionFragment: "ownerOfPhiland",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLinkFromObject",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeObjectFromLand",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "removeOwner", values: [string]): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "undeposit",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "userObject",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userObjectLink",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "viewObjectLink",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "viewPhiland", values: [string]): string;
  encodeFunctionData(
    functionFragment: "writeLinkToObject",
    values: [string, BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "writeObjectToLand",
    values: [string, PhiMap.ObjectStruct, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "batchDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchRemoveAndWrite",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchRemoveObjectFromLand",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchWriteObjectToLand",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkDepositStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimStarterObject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "freeObject", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mapSettings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerLists", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownerOfPhiland",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLinkFromObject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeObjectFromLand",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "undeposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "userObject", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "userObjectLink",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewObjectLink",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewPhiland",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "writeLinkToObject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "writeObjectToLand",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipGranted(address,address)": EventFragment;
    "OwnershipRemoved(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipRemoved"): EventFragment;
}

export interface OwnershipGrantedEventObject {
  operator: string;
  target: string;
}
export type OwnershipGrantedEvent = TypedEvent<
  [string, string],
  OwnershipGrantedEventObject
>;

export type OwnershipGrantedEventFilter =
  TypedEventFilter<OwnershipGrantedEvent>;

export interface OwnershipRemovedEventObject {
  operator: string;
  target: string;
}
export type OwnershipRemovedEvent = TypedEvent<
  [string, string],
  OwnershipRemovedEventObject
>;

export type OwnershipRemovedEventFilter =
  TypedEventFilter<OwnershipRemovedEvent>;

export interface PhiMap extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PhiMapInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    batchDeposit(
      _contractAddresses: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    batchRemoveAndWrite(
      name: string,
      remove_index_array: BigNumberish[],
      objectData: PhiMap.ObjectStruct[],
      _object: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    batchRemoveObjectFromLand(
      name: string,
      index_array: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    batchWriteObjectToLand(
      name: string,
      objectData: PhiMap.ObjectStruct[],
      _object: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    checkDepositStatus(
      sender: string,
      _contractAddresses: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PhiMap.DepositStructOutput]>;

    claimStarterObject(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    create(
      name: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      _contractAddress: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositInfo(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; timestamp: BigNumber }
    >;

    depositTime(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    freeObject(overrides?: CallOverrides): Promise<[string]>;

    mapSettings(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        minX: BigNumber;
        maxX: BigNumber;
        minY: BigNumber;
        maxY: BigNumber;
      }
    >;

    onERC1155BatchReceived(
      operator: string,
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    onERC1155Received(
      operator: string,
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    owner(
      targetAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ownerLists(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    ownerOfPhiland(name: string, overrides?: CallOverrides): Promise<[string]>;

    removeLinkFromObject(
      name: string,
      object_index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeObjectFromLand(
      name: string,
      i: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeOwner(
      oldOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    undeposit(
      _contractAddresses: string,
      _tokenId: BigNumberish,
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userObject(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        contractAddress: string;
        tokenId: BigNumber;
        xStart: BigNumber;
        yStart: BigNumber;
        xEnd: BigNumber;
        yEnd: BigNumber;
      }
    >;

    userObjectLink(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string] & { title: string; url: string }>;

    viewObjectLink(
      user: string,
      object_index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PhiMap.ObjectLinkInfoStructOutput[]]>;

    viewPhiland(
      user: string,
      overrides?: CallOverrides
    ): Promise<[PhiMap.ObjectInfoStructOutput[]]>;

    writeLinkToObject(
      name: string,
      object_index: BigNumberish,
      title: string,
      url: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    writeObjectToLand(
      name: string,
      objectData: PhiMap.ObjectStruct,
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  batchDeposit(
    _contractAddresses: string,
    _tokenIds: BigNumberish[],
    _amounts: BigNumberish[],
    _object: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  batchRemoveAndWrite(
    name: string,
    remove_index_array: BigNumberish[],
    objectData: PhiMap.ObjectStruct[],
    _object: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  batchRemoveObjectFromLand(
    name: string,
    index_array: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  batchWriteObjectToLand(
    name: string,
    objectData: PhiMap.ObjectStruct[],
    _object: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  checkDepositStatus(
    sender: string,
    _contractAddresses: string,
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PhiMap.DepositStructOutput>;

  claimStarterObject(
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  create(
    name: string,
    caller: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    _contractAddress: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _object: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositInfo(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount: BigNumber; timestamp: BigNumber }
  >;

  depositTime(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  freeObject(overrides?: CallOverrides): Promise<string>;

  mapSettings(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      minX: BigNumber;
      maxX: BigNumber;
      minY: BigNumber;
      maxY: BigNumber;
    }
  >;

  onERC1155BatchReceived(
    operator: string,
    from: string,
    ids: BigNumberish[],
    values: BigNumberish[],
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  onERC1155Received(
    operator: string,
    from: string,
    id: BigNumberish,
    value: BigNumberish,
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  owner(
    targetAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ownerLists(arg0: string, overrides?: CallOverrides): Promise<string>;

  ownerOfPhiland(name: string, overrides?: CallOverrides): Promise<string>;

  removeLinkFromObject(
    name: string,
    object_index: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeObjectFromLand(
    name: string,
    i: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeOwner(
    oldOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOwner(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  undeposit(
    _contractAddresses: string,
    _tokenId: BigNumberish,
    _object: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userObject(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      contractAddress: string;
      tokenId: BigNumber;
      xStart: BigNumber;
      yStart: BigNumber;
      xEnd: BigNumber;
      yEnd: BigNumber;
    }
  >;

  userObjectLink(
    arg0: string,
    arg1: BigNumberish,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, string] & { title: string; url: string }>;

  viewObjectLink(
    user: string,
    object_index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PhiMap.ObjectLinkInfoStructOutput[]>;

  viewPhiland(
    user: string,
    overrides?: CallOverrides
  ): Promise<PhiMap.ObjectInfoStructOutput[]>;

  writeLinkToObject(
    name: string,
    object_index: BigNumberish,
    title: string,
    url: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  writeObjectToLand(
    name: string,
    objectData: PhiMap.ObjectStruct,
    _object: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    batchDeposit(
      _contractAddresses: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      _object: string,
      overrides?: CallOverrides
    ): Promise<void>;

    batchRemoveAndWrite(
      name: string,
      remove_index_array: BigNumberish[],
      objectData: PhiMap.ObjectStruct[],
      _object: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    batchRemoveObjectFromLand(
      name: string,
      index_array: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    batchWriteObjectToLand(
      name: string,
      objectData: PhiMap.ObjectStruct[],
      _object: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    checkDepositStatus(
      sender: string,
      _contractAddresses: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PhiMap.DepositStructOutput>;

    claimStarterObject(name: string, overrides?: CallOverrides): Promise<void>;

    create(
      name: string,
      caller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      _contractAddress: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _object: string,
      overrides?: CallOverrides
    ): Promise<void>;

    depositInfo(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; timestamp: BigNumber }
    >;

    depositTime(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    freeObject(overrides?: CallOverrides): Promise<string>;

    mapSettings(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        minX: BigNumber;
        maxX: BigNumber;
        minY: BigNumber;
        maxY: BigNumber;
      }
    >;

    onERC1155BatchReceived(
      operator: string,
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      operator: string,
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(targetAddress: string, overrides?: CallOverrides): Promise<boolean>;

    ownerLists(arg0: string, overrides?: CallOverrides): Promise<string>;

    ownerOfPhiland(name: string, overrides?: CallOverrides): Promise<string>;

    removeLinkFromObject(
      name: string,
      object_index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    removeObjectFromLand(
      name: string,
      i: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    removeOwner(oldOwner: string, overrides?: CallOverrides): Promise<void>;

    setOwner(newOwner: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    undeposit(
      _contractAddresses: string,
      _tokenId: BigNumberish,
      _object: string,
      overrides?: CallOverrides
    ): Promise<void>;

    userObject(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        contractAddress: string;
        tokenId: BigNumber;
        xStart: BigNumber;
        yStart: BigNumber;
        xEnd: BigNumber;
        yEnd: BigNumber;
      }
    >;

    userObjectLink(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string] & { title: string; url: string }>;

    viewObjectLink(
      user: string,
      object_index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PhiMap.ObjectLinkInfoStructOutput[]>;

    viewPhiland(
      user: string,
      overrides?: CallOverrides
    ): Promise<PhiMap.ObjectInfoStructOutput[]>;

    writeLinkToObject(
      name: string,
      object_index: BigNumberish,
      title: string,
      url: string,
      overrides?: CallOverrides
    ): Promise<void>;

    writeObjectToLand(
      name: string,
      objectData: PhiMap.ObjectStruct,
      _object: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipGranted(address,address)"(
      operator?: string | null,
      target?: string | null
    ): OwnershipGrantedEventFilter;
    OwnershipGranted(
      operator?: string | null,
      target?: string | null
    ): OwnershipGrantedEventFilter;

    "OwnershipRemoved(address,address)"(
      operator?: string | null,
      target?: string | null
    ): OwnershipRemovedEventFilter;
    OwnershipRemoved(
      operator?: string | null,
      target?: string | null
    ): OwnershipRemovedEventFilter;
  };

  estimateGas: {
    batchDeposit(
      _contractAddresses: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    batchRemoveAndWrite(
      name: string,
      remove_index_array: BigNumberish[],
      objectData: PhiMap.ObjectStruct[],
      _object: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    batchRemoveObjectFromLand(
      name: string,
      index_array: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    batchWriteObjectToLand(
      name: string,
      objectData: PhiMap.ObjectStruct[],
      _object: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    checkDepositStatus(
      sender: string,
      _contractAddresses: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimStarterObject(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    create(
      name: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      _contractAddress: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositInfo(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    depositTime(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    freeObject(overrides?: CallOverrides): Promise<BigNumber>;

    mapSettings(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      operator: string,
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC1155Received(
      operator: string,
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(
      targetAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ownerLists(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    ownerOfPhiland(name: string, overrides?: CallOverrides): Promise<BigNumber>;

    removeLinkFromObject(
      name: string,
      object_index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeObjectFromLand(
      name: string,
      i: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeOwner(
      oldOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    undeposit(
      _contractAddresses: string,
      _tokenId: BigNumberish,
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userObject(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userObjectLink(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    viewObjectLink(
      user: string,
      object_index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    viewPhiland(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    writeLinkToObject(
      name: string,
      object_index: BigNumberish,
      title: string,
      url: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    writeObjectToLand(
      name: string,
      objectData: PhiMap.ObjectStruct,
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    batchDeposit(
      _contractAddresses: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    batchRemoveAndWrite(
      name: string,
      remove_index_array: BigNumberish[],
      objectData: PhiMap.ObjectStruct[],
      _object: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    batchRemoveObjectFromLand(
      name: string,
      index_array: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    batchWriteObjectToLand(
      name: string,
      objectData: PhiMap.ObjectStruct[],
      _object: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    checkDepositStatus(
      sender: string,
      _contractAddresses: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimStarterObject(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    create(
      name: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      _contractAddress: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositInfo(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    depositTime(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    freeObject(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mapSettings(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      operator: string,
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      operator: string,
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(
      targetAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ownerLists(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ownerOfPhiland(
      name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeLinkFromObject(
      name: string,
      object_index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeObjectFromLand(
      name: string,
      i: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeOwner(
      oldOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    undeposit(
      _contractAddresses: string,
      _tokenId: BigNumberish,
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userObject(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userObjectLink(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    viewObjectLink(
      user: string,
      object_index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    viewPhiland(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    writeLinkToObject(
      name: string,
      object_index: BigNumberish,
      title: string,
      url: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    writeObjectToLand(
      name: string,
      objectData: PhiMap.ObjectStruct,
      _object: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
