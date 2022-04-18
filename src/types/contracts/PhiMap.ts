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
}

export interface PhiMapInterface extends utils.Interface {
  functions: {
    "claimStarterObject(string)": FunctionFragment;
    "create(string,address)": FunctionFragment;
    "deposit(uint256,uint256)": FunctionFragment;
    "depositInfo(address,uint256)": FunctionFragment;
    "depositTime(address,uint256)": FunctionFragment;
    "mapSettings()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "owner(address)": FunctionFragment;
    "ownerLists(string)": FunctionFragment;
    "ownerOfPhiland(string)": FunctionFragment;
    "removeObjectToLand(string,uint256)": FunctionFragment;
    "removeOwner(address)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "undeposit(uint256)": FunctionFragment;
    "view_philand(string)": FunctionFragment;
    "writeObjectToLand(string,(address,uint256,uint256,uint256))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "claimStarterObject"
      | "create"
      | "deposit"
      | "depositInfo"
      | "depositTime"
      | "mapSettings"
      | "onERC1155BatchReceived"
      | "onERC1155Received"
      | "owner"
      | "ownerLists"
      | "ownerOfPhiland"
      | "removeObjectToLand"
      | "removeOwner"
      | "setOwner"
      | "undeposit"
      | "view_philand"
      | "writeObjectToLand"
  ): FunctionFragment;

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
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositInfo",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositTime",
    values: [string, BigNumberish]
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
    functionFragment: "removeObjectToLand",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "removeOwner", values: [string]): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "undeposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "view_philand",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "writeObjectToLand",
    values: [string, PhiMap.ObjectStruct]
  ): string;

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
    functionFragment: "removeObjectToLand",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "undeposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "view_philand",
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
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositInfo(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; timestamp: BigNumber }
    >;

    depositTime(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

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

    removeObjectToLand(
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

    undeposit(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    view_philand(
      user: string,
      overrides?: CallOverrides
    ): Promise<[PhiMap.ObjectInfoStructOutput[]]>;

    writeObjectToLand(
      name: string,
      objectdata: PhiMap.ObjectStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

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
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositInfo(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount: BigNumber; timestamp: BigNumber }
  >;

  depositTime(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

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

  removeObjectToLand(
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

  undeposit(
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  view_philand(
    user: string,
    overrides?: CallOverrides
  ): Promise<PhiMap.ObjectInfoStructOutput[]>;

  writeObjectToLand(
    name: string,
    objectdata: PhiMap.ObjectStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claimStarterObject(name: string, overrides?: CallOverrides): Promise<void>;

    create(
      name: string,
      caller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    depositInfo(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; timestamp: BigNumber }
    >;

    depositTime(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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

    removeObjectToLand(
      name: string,
      i: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    removeOwner(oldOwner: string, overrides?: CallOverrides): Promise<void>;

    setOwner(newOwner: string, overrides?: CallOverrides): Promise<void>;

    undeposit(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    view_philand(
      user: string,
      overrides?: CallOverrides
    ): Promise<PhiMap.ObjectInfoStructOutput[]>;

    writeObjectToLand(
      name: string,
      objectdata: PhiMap.ObjectStruct,
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
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositInfo(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    depositTime(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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

    removeObjectToLand(
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

    undeposit(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    view_philand(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    writeObjectToLand(
      name: string,
      objectdata: PhiMap.ObjectStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
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
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositInfo(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    depositTime(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

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

    removeObjectToLand(
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

    undeposit(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    view_philand(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    writeObjectToLand(
      name: string,
      objectdata: PhiMap.ObjectStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
