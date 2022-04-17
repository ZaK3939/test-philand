/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  ENSRegistry,
  ENSRegistryInterface,
} from "../../../../../@ensdomains/ens-contracts/contracts/registry/ENSRegistry";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "label",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "NewOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "NewResolver",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
    ],
    name: "NewTTL",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "recordExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "resolver",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
    ],
    name: "setRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "setResolver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "label",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "setSubnodeOwner",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "label",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
    ],
    name: "setSubnodeRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
    ],
    name: "setTTL",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "ttl",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060008080526020527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb580546001600160a01b031916331790556109be806100596000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80635b0fc9c311610081578063cf4088231161005b578063cf40882314610204578063e985e9c514610217578063f79fe5381461026357600080fd5b80635b0fc9c3146101cb5780635ef2c7f0146101de578063a22cb465146101f157600080fd5b806314ab9038116100b257806314ab90381461015657806316a25cbd1461016b5780631896f70a146101b857600080fd5b80630178b8bf146100d957806302571be31461012257806306ab592314610135575b600080fd5b6101056100e73660046107d6565b6000908152602081905260409020600101546001600160a01b031690565b6040516001600160a01b0390911681526020015b60405180910390f35b6101056101303660046107d6565b61028e565b61014861014336600461080b565b6102bc565b604051908152602001610119565b610169610164366004610858565b6103af565b005b61019f6101793660046107d6565b600090815260208190526040902060010154600160a01b900467ffffffffffffffff1690565b60405167ffffffffffffffff9091168152602001610119565b6101696101c6366004610884565b610482565b6101696101d9366004610884565b610547565b6101696101ec3660046108a7565b610606565b6101696101ff3660046108fe565b610628565b61016961021236600461093a565b610694565b610253610225366004610987565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b6040519015158152602001610119565b6102536102713660046107d6565b6000908152602081905260409020546001600160a01b0316151590565b6000818152602081905260408120546001600160a01b03163081036102b65750600092915050565b92915050565b60008381526020819052604081205484906001600160a01b03163381148061030757506001600160a01b038116600090815260016020908152604080832033845290915290205460ff165b61031057600080fd5b604080516020810188905290810186905260009060600160408051601f198184030181529181528151602092830120600081815292839052912080546001600160a01b0319166001600160a01b03881617905590506040516001600160a01b0386168152869088907fce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e829060200160405180910390a39695505050505050565b60008281526020819052604090205482906001600160a01b0316338114806103fa57506001600160a01b038116600090815260016020908152604080832033845290915290205460ff165b61040357600080fd5b60405167ffffffffffffffff8416815284907f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa689060200160405180910390a25050600091825260208290526040909120600101805467ffffffffffffffff909216600160a01b0267ffffffffffffffff60a01b19909216919091179055565b60008281526020819052604090205482906001600160a01b0316338114806104cd57506001600160a01b038116600090815260016020908152604080832033845290915290205460ff165b6104d657600080fd5b6040516001600160a01b038416815284907f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a09060200160405180910390a2505060009182526020829052604090912060010180546001600160a01b0319166001600160a01b03909216919091179055565b60008281526020819052604090205482906001600160a01b03163381148061059257506001600160a01b038116600090815260016020908152604080832033845290915290205460ff165b61059b57600080fd5b600084815260208190526040902080546001600160a01b0319166001600160a01b0385161790556040516001600160a01b038416815284907fd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d2669060200160405180910390a250505050565b60006106138686866102bc565b90506106208184846106af565b505050505050565b3360008181526001602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61069e8484610547565b6106a98483836106af565b50505050565b6000838152602081905260409020600101546001600160a01b03838116911614610735576000838152602081815260409182902060010180546001600160a01b0319166001600160a01b038616908117909155915191825284917f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a0910160405180910390a25b60008381526020819052604090206001015467ffffffffffffffff828116600160a01b90920416146107d15760008381526020818152604091829020600101805467ffffffffffffffff60a01b1916600160a01b67ffffffffffffffff861690810291909117909155915191825284917f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa68910160405180910390a25b505050565b6000602082840312156107e857600080fd5b5035919050565b80356001600160a01b038116811461080657600080fd5b919050565b60008060006060848603121561082057600080fd5b8335925060208401359150610837604085016107ef565b90509250925092565b803567ffffffffffffffff8116811461080657600080fd5b6000806040838503121561086b57600080fd5b8235915061087b60208401610840565b90509250929050565b6000806040838503121561089757600080fd5b8235915061087b602084016107ef565b600080600080600060a086880312156108bf57600080fd5b85359450602086013593506108d6604087016107ef565b92506108e4606087016107ef565b91506108f260808701610840565b90509295509295909350565b6000806040838503121561091157600080fd5b61091a836107ef565b91506020830135801515811461092f57600080fd5b809150509250929050565b6000806000806080858703121561095057600080fd5b84359350610960602086016107ef565b925061096e604086016107ef565b915061097c60608601610840565b905092959194509250565b6000806040838503121561099a57600080fd5b6109a3836107ef565b915061087b602084016107ef56fea164736f6c634300080d000a";

type ENSRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ENSRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ENSRegistry__factory extends ContractFactory {
  constructor(...args: ENSRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ENSRegistry> {
    return super.deploy(overrides || {}) as Promise<ENSRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ENSRegistry {
    return super.attach(address) as ENSRegistry;
  }
  override connect(signer: Signer): ENSRegistry__factory {
    return super.connect(signer) as ENSRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ENSRegistryInterface {
    return new utils.Interface(_abi) as ENSRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ENSRegistry {
    return new Contract(address, _abi, signerOrProvider) as ENSRegistry;
  }
}