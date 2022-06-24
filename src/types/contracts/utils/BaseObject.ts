/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";
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

export declare namespace BaseObject {
  export type SizeStruct = {
    x: BigNumberish;
    y: BigNumberish;
    z: BigNumberish;
  };

  export type SizeStructOutput = [number, number, number] & {
    x: number;
    y: number;
    z: number;
  };
}

export interface BaseObjectInterface extends utils.Interface {
  functions: {
    "allObjects(uint256)": FunctionFragment;
    "baseMetadataURI()": FunctionFragment;
    "changeTokenPrice(uint256,uint256)": FunctionFragment;
    "created(uint256)": FunctionFragment;
    "getBaseMetadataURI()": FunctionFragment;
    "getCreator(uint256)": FunctionFragment;
    "getExp(uint256)": FunctionFragment;
    "getMaxClaimed(uint256)": FunctionFragment;
    "getSize(uint256)": FunctionFragment;
    "getTokenPrice(uint256)": FunctionFragment;
    "getTokenURI(uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "owner(address)": FunctionFragment;
    "paymentBalanceOwner()": FunctionFragment;
    "removeOwner(address)": FunctionFragment;
    "royalityFee()": FunctionFragment;
    "royaltyInfo(uint256,uint256)": FunctionFragment;
    "secondaryRoyalty()": FunctionFragment;
    "setCreator(uint256,address)": FunctionFragment;
    "setExp(uint256,uint256)": FunctionFragment;
    "setMaxClaimed(uint256,uint256)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "setRoyalityFee(uint256)": FunctionFragment;
    "setSecondaryRoyalityFee(uint256)": FunctionFragment;
    "setSize(uint256,(uint8,uint8,uint8))": FunctionFragment;
    "setTokenURI(uint256,string)": FunctionFragment;
    "setTreasuryAddress(address)": FunctionFragment;
    "setbaseMetadataURI(string)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "treasuryAddress()": FunctionFragment;
    "withdrawOwnerBalance(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "allObjects"
      | "baseMetadataURI"
      | "changeTokenPrice"
      | "created"
      | "getBaseMetadataURI"
      | "getCreator"
      | "getExp"
      | "getMaxClaimed"
      | "getSize"
      | "getTokenPrice"
      | "getTokenURI"
      | "name"
      | "owner"
      | "paymentBalanceOwner"
      | "removeOwner"
      | "royalityFee"
      | "royaltyInfo"
      | "secondaryRoyalty"
      | "setCreator"
      | "setExp"
      | "setMaxClaimed"
      | "setOwner"
      | "setRoyalityFee"
      | "setSecondaryRoyalityFee"
      | "setSize"
      | "setTokenURI"
      | "setTreasuryAddress"
      | "setbaseMetadataURI"
      | "supportsInterface"
      | "symbol"
      | "treasuryAddress"
      | "withdrawOwnerBalance"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "allObjects",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "baseMetadataURI",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "changeTokenPrice",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "created",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseMetadataURI",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCreator",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getExp",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxClaimed",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSize",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "paymentBalanceOwner",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "removeOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "royalityFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "royaltyInfo",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "secondaryRoyalty",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setCreator",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setExp",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setMaxClaimed",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setRoyalityFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setSecondaryRoyalityFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setSize",
    values: [BigNumberish, BaseObject.SizeStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenURI",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setTreasuryAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setbaseMetadataURI",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "treasuryAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawOwnerBalance",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "allObjects", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "baseMetadataURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "created", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBaseMetadataURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getCreator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getExp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMaxClaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getSize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "paymentBalanceOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "royalityFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "royaltyInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "secondaryRoyalty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setCreator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setExp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMaxClaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRoyalityFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSecondaryRoyalityFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setSize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTokenURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTreasuryAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setbaseMetadataURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "treasuryAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawOwnerBalance",
    data: BytesLike
  ): Result;

  events: {
    "ChangeTokenPrice(uint256,uint256)": EventFragment;
    "OwnershipGranted(address,address)": EventFragment;
    "OwnershipRemoved(address,address)": EventFragment;
    "PaymentReceivedOwner(uint256)": EventFragment;
    "PaymentWithdrawnOwner(uint256)": EventFragment;
    "SetCreator(uint256,address)": EventFragment;
    "SetExp(uint256,uint256)": EventFragment;
    "SetMaxClaimed(uint256,uint256)": EventFragment;
    "SetRoyalityFee(uint256)": EventFragment;
    "SetSecondaryRoyalityFee(uint256)": EventFragment;
    "SetSize(uint256,uint8,uint8,uint8)": EventFragment;
    "SetTokenURI(uint256,string)": EventFragment;
    "SetTreasuryAddress(address)": EventFragment;
    "SetbaseMetadataURI(string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ChangeTokenPrice"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PaymentReceivedOwner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PaymentWithdrawnOwner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetCreator"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetExp"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetMaxClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetRoyalityFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetSecondaryRoyalityFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetSize"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetTokenURI"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetTreasuryAddress"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetbaseMetadataURI"): EventFragment;
}

export interface ChangeTokenPriceEventObject {
  tokenId: BigNumber;
  _newPrice: BigNumber;
}
export type ChangeTokenPriceEvent = TypedEvent<
  [BigNumber, BigNumber],
  ChangeTokenPriceEventObject
>;

export type ChangeTokenPriceEventFilter =
  TypedEventFilter<ChangeTokenPriceEvent>;

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

export interface PaymentReceivedOwnerEventObject {
  amount: BigNumber;
}
export type PaymentReceivedOwnerEvent = TypedEvent<
  [BigNumber],
  PaymentReceivedOwnerEventObject
>;

export type PaymentReceivedOwnerEventFilter =
  TypedEventFilter<PaymentReceivedOwnerEvent>;

export interface PaymentWithdrawnOwnerEventObject {
  amount: BigNumber;
}
export type PaymentWithdrawnOwnerEvent = TypedEvent<
  [BigNumber],
  PaymentWithdrawnOwnerEventObject
>;

export type PaymentWithdrawnOwnerEventFilter =
  TypedEventFilter<PaymentWithdrawnOwnerEvent>;

export interface SetCreatorEventObject {
  tokenId: BigNumber;
  _creator: string;
}
export type SetCreatorEvent = TypedEvent<
  [BigNumber, string],
  SetCreatorEventObject
>;

export type SetCreatorEventFilter = TypedEventFilter<SetCreatorEvent>;

export interface SetExpEventObject {
  tokenId: BigNumber;
  exp: BigNumber;
}
export type SetExpEvent = TypedEvent<[BigNumber, BigNumber], SetExpEventObject>;

export type SetExpEventFilter = TypedEventFilter<SetExpEvent>;

export interface SetMaxClaimedEventObject {
  tokenId: BigNumber;
  newMaxClaimed: BigNumber;
}
export type SetMaxClaimedEvent = TypedEvent<
  [BigNumber, BigNumber],
  SetMaxClaimedEventObject
>;

export type SetMaxClaimedEventFilter = TypedEventFilter<SetMaxClaimedEvent>;

export interface SetRoyalityFeeEventObject {
  _royalityFee: BigNumber;
}
export type SetRoyalityFeeEvent = TypedEvent<
  [BigNumber],
  SetRoyalityFeeEventObject
>;

export type SetRoyalityFeeEventFilter = TypedEventFilter<SetRoyalityFeeEvent>;

export interface SetSecondaryRoyalityFeeEventObject {
  _secondaryRoyalty: BigNumber;
}
export type SetSecondaryRoyalityFeeEvent = TypedEvent<
  [BigNumber],
  SetSecondaryRoyalityFeeEventObject
>;

export type SetSecondaryRoyalityFeeEventFilter =
  TypedEventFilter<SetSecondaryRoyalityFeeEvent>;

export interface SetSizeEventObject {
  tokenId: BigNumber;
  x: number;
  y: number;
  z: number;
}
export type SetSizeEvent = TypedEvent<
  [BigNumber, number, number, number],
  SetSizeEventObject
>;

export type SetSizeEventFilter = TypedEventFilter<SetSizeEvent>;

export interface SetTokenURIEventObject {
  tokenId: BigNumber;
  _uri: string;
}
export type SetTokenURIEvent = TypedEvent<
  [BigNumber, string],
  SetTokenURIEventObject
>;

export type SetTokenURIEventFilter = TypedEventFilter<SetTokenURIEvent>;

export interface SetTreasuryAddressEventObject {
  _treasuryAddress: string;
}
export type SetTreasuryAddressEvent = TypedEvent<
  [string],
  SetTreasuryAddressEventObject
>;

export type SetTreasuryAddressEventFilter =
  TypedEventFilter<SetTreasuryAddressEvent>;

export interface SetbaseMetadataURIEventObject {
  baseuri: string;
}
export type SetbaseMetadataURIEvent = TypedEvent<
  [string],
  SetbaseMetadataURIEventObject
>;

export type SetbaseMetadataURIEventFilter =
  TypedEventFilter<SetbaseMetadataURIEvent>;

export interface BaseObject extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BaseObjectInterface;

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
    allObjects(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        BaseObject.SizeStructOutput,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ] & {
        tokenURI: string;
        size: BaseObject.SizeStructOutput;
        creator: string;
        maxClaimed: BigNumber;
        price: BigNumber;
        exp: BigNumber;
        forSale: boolean;
      }
    >;

    baseMetadataURI(overrides?: CallOverrides): Promise<[string]>;

    changeTokenPrice(
      tokenId: BigNumberish,
      _newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    created(arg0: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    getBaseMetadataURI(overrides?: CallOverrides): Promise<[string]>;

    getCreator(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getExp(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMaxClaimed(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSize(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BaseObject.SizeStructOutput]>;

    getTokenPrice(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    owner(
      targetAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    paymentBalanceOwner(overrides?: CallOverrides): Promise<[BigNumber]>;

    removeOwner(
      oldOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    royalityFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    royaltyInfo(
      arg0: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { receiver: string; royaltyAmount: BigNumber }
    >;

    secondaryRoyalty(overrides?: CallOverrides): Promise<[BigNumber]>;

    setCreator(
      tokenId: BigNumberish,
      _creator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setExp(
      tokenId: BigNumberish,
      _exp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMaxClaimed(
      tokenId: BigNumberish,
      _newMaxClaimed: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRoyalityFee(
      _royalityFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSecondaryRoyalityFee(
      _secondaryRoyalty: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSize(
      tokenId: BigNumberish,
      _size: BaseObject.SizeStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTokenURI(
      tokenId: BigNumberish,
      _uri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTreasuryAddress(
      _treasuryAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setbaseMetadataURI(
      _baseMetadataURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    treasuryAddress(overrides?: CallOverrides): Promise<[string]>;

    withdrawOwnerBalance(
      withdrawTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  allObjects(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      BaseObject.SizeStructOutput,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean
    ] & {
      tokenURI: string;
      size: BaseObject.SizeStructOutput;
      creator: string;
      maxClaimed: BigNumber;
      price: BigNumber;
      exp: BigNumber;
      forSale: boolean;
    }
  >;

  baseMetadataURI(overrides?: CallOverrides): Promise<string>;

  changeTokenPrice(
    tokenId: BigNumberish,
    _newPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  created(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  getBaseMetadataURI(overrides?: CallOverrides): Promise<string>;

  getCreator(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getExp(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getMaxClaimed(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSize(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BaseObject.SizeStructOutput>;

  getTokenPrice(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTokenURI(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  name(overrides?: CallOverrides): Promise<string>;

  owner(
    targetAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  paymentBalanceOwner(overrides?: CallOverrides): Promise<BigNumber>;

  removeOwner(
    oldOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  royalityFee(overrides?: CallOverrides): Promise<BigNumber>;

  royaltyInfo(
    arg0: BigNumberish,
    salePrice: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber] & { receiver: string; royaltyAmount: BigNumber }
  >;

  secondaryRoyalty(overrides?: CallOverrides): Promise<BigNumber>;

  setCreator(
    tokenId: BigNumberish,
    _creator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setExp(
    tokenId: BigNumberish,
    _exp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMaxClaimed(
    tokenId: BigNumberish,
    _newMaxClaimed: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOwner(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRoyalityFee(
    _royalityFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSecondaryRoyalityFee(
    _secondaryRoyalty: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSize(
    tokenId: BigNumberish,
    _size: BaseObject.SizeStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTokenURI(
    tokenId: BigNumberish,
    _uri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTreasuryAddress(
    _treasuryAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setbaseMetadataURI(
    _baseMetadataURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  treasuryAddress(overrides?: CallOverrides): Promise<string>;

  withdrawOwnerBalance(
    withdrawTo: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    allObjects(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        BaseObject.SizeStructOutput,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ] & {
        tokenURI: string;
        size: BaseObject.SizeStructOutput;
        creator: string;
        maxClaimed: BigNumber;
        price: BigNumber;
        exp: BigNumber;
        forSale: boolean;
      }
    >;

    baseMetadataURI(overrides?: CallOverrides): Promise<string>;

    changeTokenPrice(
      tokenId: BigNumberish,
      _newPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    created(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    getBaseMetadataURI(overrides?: CallOverrides): Promise<string>;

    getCreator(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getExp(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxClaimed(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSize(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BaseObject.SizeStructOutput>;

    getTokenPrice(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    name(overrides?: CallOverrides): Promise<string>;

    owner(targetAddress: string, overrides?: CallOverrides): Promise<boolean>;

    paymentBalanceOwner(overrides?: CallOverrides): Promise<BigNumber>;

    removeOwner(oldOwner: string, overrides?: CallOverrides): Promise<void>;

    royalityFee(overrides?: CallOverrides): Promise<BigNumber>;

    royaltyInfo(
      arg0: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { receiver: string; royaltyAmount: BigNumber }
    >;

    secondaryRoyalty(overrides?: CallOverrides): Promise<BigNumber>;

    setCreator(
      tokenId: BigNumberish,
      _creator: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setExp(
      tokenId: BigNumberish,
      _exp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMaxClaimed(
      tokenId: BigNumberish,
      _newMaxClaimed: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setOwner(newOwner: string, overrides?: CallOverrides): Promise<void>;

    setRoyalityFee(
      _royalityFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setSecondaryRoyalityFee(
      _secondaryRoyalty: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setSize(
      tokenId: BigNumberish,
      _size: BaseObject.SizeStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenURI(
      tokenId: BigNumberish,
      _uri: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setTreasuryAddress(
      _treasuryAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setbaseMetadataURI(
      _baseMetadataURI: string,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    treasuryAddress(overrides?: CallOverrides): Promise<string>;

    withdrawOwnerBalance(
      withdrawTo: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ChangeTokenPrice(uint256,uint256)"(
      tokenId?: null,
      _newPrice?: null
    ): ChangeTokenPriceEventFilter;
    ChangeTokenPrice(
      tokenId?: null,
      _newPrice?: null
    ): ChangeTokenPriceEventFilter;

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

    "PaymentReceivedOwner(uint256)"(
      amount?: null
    ): PaymentReceivedOwnerEventFilter;
    PaymentReceivedOwner(amount?: null): PaymentReceivedOwnerEventFilter;

    "PaymentWithdrawnOwner(uint256)"(
      amount?: null
    ): PaymentWithdrawnOwnerEventFilter;
    PaymentWithdrawnOwner(amount?: null): PaymentWithdrawnOwnerEventFilter;

    "SetCreator(uint256,address)"(
      tokenId?: null,
      _creator?: null
    ): SetCreatorEventFilter;
    SetCreator(tokenId?: null, _creator?: null): SetCreatorEventFilter;

    "SetExp(uint256,uint256)"(tokenId?: null, exp?: null): SetExpEventFilter;
    SetExp(tokenId?: null, exp?: null): SetExpEventFilter;

    "SetMaxClaimed(uint256,uint256)"(
      tokenId?: null,
      newMaxClaimed?: null
    ): SetMaxClaimedEventFilter;
    SetMaxClaimed(
      tokenId?: null,
      newMaxClaimed?: null
    ): SetMaxClaimedEventFilter;

    "SetRoyalityFee(uint256)"(_royalityFee?: null): SetRoyalityFeeEventFilter;
    SetRoyalityFee(_royalityFee?: null): SetRoyalityFeeEventFilter;

    "SetSecondaryRoyalityFee(uint256)"(
      _secondaryRoyalty?: null
    ): SetSecondaryRoyalityFeeEventFilter;
    SetSecondaryRoyalityFee(
      _secondaryRoyalty?: null
    ): SetSecondaryRoyalityFeeEventFilter;

    "SetSize(uint256,uint8,uint8,uint8)"(
      tokenId?: null,
      x?: null,
      y?: null,
      z?: null
    ): SetSizeEventFilter;
    SetSize(tokenId?: null, x?: null, y?: null, z?: null): SetSizeEventFilter;

    "SetTokenURI(uint256,string)"(
      tokenId?: null,
      _uri?: null
    ): SetTokenURIEventFilter;
    SetTokenURI(tokenId?: null, _uri?: null): SetTokenURIEventFilter;

    "SetTreasuryAddress(address)"(
      _treasuryAddress?: null
    ): SetTreasuryAddressEventFilter;
    SetTreasuryAddress(_treasuryAddress?: null): SetTreasuryAddressEventFilter;

    "SetbaseMetadataURI(string)"(baseuri?: null): SetbaseMetadataURIEventFilter;
    SetbaseMetadataURI(baseuri?: null): SetbaseMetadataURIEventFilter;
  };

  estimateGas: {
    allObjects(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    baseMetadataURI(overrides?: CallOverrides): Promise<BigNumber>;

    changeTokenPrice(
      tokenId: BigNumberish,
      _newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    created(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getBaseMetadataURI(overrides?: CallOverrides): Promise<BigNumber>;

    getCreator(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExp(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxClaimed(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSize(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenPrice(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    owner(
      targetAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    paymentBalanceOwner(overrides?: CallOverrides): Promise<BigNumber>;

    removeOwner(
      oldOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    royalityFee(overrides?: CallOverrides): Promise<BigNumber>;

    royaltyInfo(
      arg0: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    secondaryRoyalty(overrides?: CallOverrides): Promise<BigNumber>;

    setCreator(
      tokenId: BigNumberish,
      _creator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setExp(
      tokenId: BigNumberish,
      _exp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMaxClaimed(
      tokenId: BigNumberish,
      _newMaxClaimed: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRoyalityFee(
      _royalityFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSecondaryRoyalityFee(
      _secondaryRoyalty: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSize(
      tokenId: BigNumberish,
      _size: BaseObject.SizeStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTokenURI(
      tokenId: BigNumberish,
      _uri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTreasuryAddress(
      _treasuryAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setbaseMetadataURI(
      _baseMetadataURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    treasuryAddress(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawOwnerBalance(
      withdrawTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allObjects(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    baseMetadataURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    changeTokenPrice(
      tokenId: BigNumberish,
      _newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    created(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBaseMetadataURI(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCreator(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExp(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxClaimed(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSize(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenPrice(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(
      targetAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    paymentBalanceOwner(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeOwner(
      oldOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    royalityFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    royaltyInfo(
      arg0: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    secondaryRoyalty(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setCreator(
      tokenId: BigNumberish,
      _creator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setExp(
      tokenId: BigNumberish,
      _exp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMaxClaimed(
      tokenId: BigNumberish,
      _newMaxClaimed: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRoyalityFee(
      _royalityFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSecondaryRoyalityFee(
      _secondaryRoyalty: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSize(
      tokenId: BigNumberish,
      _size: BaseObject.SizeStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTokenURI(
      tokenId: BigNumberish,
      _uri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTreasuryAddress(
      _treasuryAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setbaseMetadataURI(
      _baseMetadataURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    treasuryAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawOwnerBalance(
      withdrawTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
