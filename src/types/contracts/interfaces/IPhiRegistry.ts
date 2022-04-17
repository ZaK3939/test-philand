/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface IPhiRegistryInterface extends utils.Interface {
  functions: {
    "ownerOfPhiland(string)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "ownerOfPhiland"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ownerOfPhiland",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "ownerOfPhiland",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IPhiRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPhiRegistryInterface;

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
    ownerOfPhiland(name: string, overrides?: CallOverrides): Promise<[string]>;
  };

  ownerOfPhiland(name: string, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    ownerOfPhiland(name: string, overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    ownerOfPhiland(name: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ownerOfPhiland(
      name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
