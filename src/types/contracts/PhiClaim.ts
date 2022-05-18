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

export declare namespace PhiClaim {
  export type CouponStruct = { r: BytesLike; s: BytesLike; v: BigNumberish };

  export type CouponStructOutput = [string, string, number] & {
    r: string;
    s: string;
    v: number;
  };
}

export interface PhiClaimInterface extends utils.Interface {
  functions: {
    "claimPhiObject(uint256,string,(bytes32,bytes32,uint8))": FunctionFragment;
    "getCouponType(string)": FunctionFragment;
    "owner(address)": FunctionFragment;
    "phiClaimedLists(address,uint256)": FunctionFragment;
    "removeOwner(address)": FunctionFragment;
    "setAdminSigner(address)": FunctionFragment;
    "setCouponType(string,uint256)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "claimPhiObject"
      | "getCouponType"
      | "owner"
      | "phiClaimedLists"
      | "removeOwner"
      | "setAdminSigner"
      | "setCouponType"
      | "setOwner"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "claimPhiObject",
    values: [BigNumberish, string, PhiClaim.CouponStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getCouponType",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "phiClaimedLists",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "removeOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setAdminSigner",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setCouponType",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "claimPhiObject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCouponType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "phiClaimedLists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAdminSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCouponType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;

  events: {
    "LogClaimObject(address,uint256)": EventFragment;
    "OwnershipGranted(address,address)": EventFragment;
    "OwnershipRemoved(address,address)": EventFragment;
    "SetAdminSigner(address)": EventFragment;
    "SetCoupon(string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogClaimObject"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetAdminSigner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetCoupon"): EventFragment;
}

export interface LogClaimObjectEventObject {
  sender: string;
  tokenid: BigNumber;
}
export type LogClaimObjectEvent = TypedEvent<
  [string, BigNumber],
  LogClaimObjectEventObject
>;

export type LogClaimObjectEventFilter = TypedEventFilter<LogClaimObjectEvent>;

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

export interface SetAdminSignerEventObject {
  verifierAdderss: string;
}
export type SetAdminSignerEvent = TypedEvent<
  [string],
  SetAdminSignerEventObject
>;

export type SetAdminSignerEventFilter = TypedEventFilter<SetAdminSignerEvent>;

export interface SetCouponEventObject {
  condition: string;
  tokenid: BigNumber;
}
export type SetCouponEvent = TypedEvent<
  [string, BigNumber],
  SetCouponEventObject
>;

export type SetCouponEventFilter = TypedEventFilter<SetCouponEvent>;

export interface PhiClaim extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PhiClaimInterface;

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
    claimPhiObject(
      tokenId: BigNumberish,
      condition: string,
      coupon: PhiClaim.CouponStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getCouponType(
      condition: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(
      targetAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    phiClaimedLists(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removeOwner(
      oldOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAdminSigner(
      verifierAdderss: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setCouponType(
      condition: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  claimPhiObject(
    tokenId: BigNumberish,
    condition: string,
    coupon: PhiClaim.CouponStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getCouponType(
    condition: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(
    targetAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  phiClaimedLists(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removeOwner(
    oldOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAdminSigner(
    verifierAdderss: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setCouponType(
    condition: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOwner(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claimPhiObject(
      tokenId: BigNumberish,
      condition: string,
      coupon: PhiClaim.CouponStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    getCouponType(
      condition: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(targetAddress: string, overrides?: CallOverrides): Promise<boolean>;

    phiClaimedLists(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeOwner(oldOwner: string, overrides?: CallOverrides): Promise<void>;

    setAdminSigner(
      verifierAdderss: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setCouponType(
      condition: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setOwner(newOwner: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "LogClaimObject(address,uint256)"(
      sender?: string | null,
      tokenid?: null
    ): LogClaimObjectEventFilter;
    LogClaimObject(
      sender?: string | null,
      tokenid?: null
    ): LogClaimObjectEventFilter;

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

    "SetAdminSigner(address)"(
      verifierAdderss?: string | null
    ): SetAdminSignerEventFilter;
    SetAdminSigner(verifierAdderss?: string | null): SetAdminSignerEventFilter;

    "SetCoupon(string,uint256)"(
      condition?: null,
      tokenid?: null
    ): SetCouponEventFilter;
    SetCoupon(condition?: null, tokenid?: null): SetCouponEventFilter;
  };

  estimateGas: {
    claimPhiObject(
      tokenId: BigNumberish,
      condition: string,
      coupon: PhiClaim.CouponStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getCouponType(
      condition: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(
      targetAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    phiClaimedLists(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeOwner(
      oldOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAdminSigner(
      verifierAdderss: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setCouponType(
      condition: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimPhiObject(
      tokenId: BigNumberish,
      condition: string,
      coupon: PhiClaim.CouponStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getCouponType(
      condition: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(
      targetAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    phiClaimedLists(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeOwner(
      oldOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAdminSigner(
      verifierAdderss: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setCouponType(
      condition: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
