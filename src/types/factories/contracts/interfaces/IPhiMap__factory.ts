/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IPhiMap,
  IPhiMapInterface,
} from "../../../contracts/interfaces/IPhiMap";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "changePhilandOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IPhiMap__factory {
  static readonly abi = _abi;
  static createInterface(): IPhiMapInterface {
    return new utils.Interface(_abi) as IPhiMapInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPhiMap {
    return new Contract(address, _abi, signerOrProvider) as IPhiMap;
  }
}
