/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  PhiRegistry,
  PhiRegistryInterface,
} from "../../contracts/PhiRegistry";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IENS",
        name: "ens",
        type: "address",
      },
      {
        internalType: "contract IPhiMap",
        name: "map",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "AllreadyClaimedPhiland",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
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
    name: "InvalidENS",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "NotReadyPhiland",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "LogChangePhilandOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "LogCreatePhiland",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "OwnershipGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "OwnershipRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "changePhilandOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "createPhiland",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "label",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetAddress",
        type: "address",
      },
    ],
    name: "owner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "ownerLists",
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
        name: "oldOwner",
        type: "address",
      },
    ],
    name: "removeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_basenode",
        type: "bytes32",
      },
    ],
    name: "setEnsBaseNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040527f93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae600455600060065534801561003957600080fd5b506040516112d63803806112d6833981016040819052610058916100bc565b336000908152602081905260409020805460ff1916600190811790915580546001600160a01b039384166001600160a01b031991821617909155600280549290931691161790556100f6565b6001600160a01b03811681146100b957600080fd5b50565b600080604083850312156100cf57600080fd5b82516100da816100a4565b60208401519092506100eb816100a4565b809150509250929050565b6111d1806101056000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c80639068f12d11610076578063c8c28b791161005b578063c8c28b791461014a578063cb4774c414610196578063e834a834146101ad57600080fd5b80639068f12d146101245780639452f04d1461013757600080fd5b806313af4035146100a8578063173825d9146100bd57806351cfbbd9146100d0578063666e1b39146100e3575b600080fd5b6100bb6100b6366004610da8565b6101b6565b005b6100bb6100cb366004610da8565b610233565b6100bb6100de366004610dcc565b6102ad565b61010f6100f1366004610da8565b6001600160a01b031660009081526020819052604090205460ff1690565b60405190151581526020015b60405180910390f35b6100bb610132366004610de5565b6102e2565b6100bb610145366004610de5565b6104a0565b61017e610158366004610e6d565b80516020818301810180516005825292820191909301209152546001600160a01b031681565b6040516001600160a01b03909116815260200161011b565b61019f60035481565b60405190815260200161011b565b61019f60065481565b3360009081526020819052604090205460ff166101e6576040516349e27cff60e01b815260040160405180910390fd5b6001600160a01b038116600081815260208190526040808220805460ff191660011790555133917f619792ba07bec101df538ab277befa333e4cf1c0274f11de7be2a9507b9c9a0691a350565b3360009081526020819052604090205460ff16610263576040516349e27cff60e01b815260040160405180910390fd5b6001600160a01b038116600081815260208190526040808220805460ff191690555133917fc191551a88c5609788f3532bd94c06479b61b0040eec65f9cd985428ffea643091a350565b3360009081526020819052604090205460ff166102dd576040516349e27cff60e01b815260040160405180910390fd5b600455565b6102ec82826106fa565b60038190556001546040516302571be360e01b815260048101929092526001600160a01b0316906302571be390602401602060405180830381865afa158015610339573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035d9190610f1e565b6001600160a01b0316336001600160a01b031614610413576003546001546040516302571be360e01b8152600481018390523392859285926001600160a01b03909116906302571be3906024015b602060405180830381865afa1580156103c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ec9190610f1e565b604051631506b0c360e11b815260040161040a959493929190610f64565b60405180910390fd5b3360058383604051610426929190610fa2565b90815260405190819003602001812080546001600160a01b039390931673ffffffffffffffffffffffffffffffffffffffff199093169290921790915533907fbb24c9ef8c34dc16b2f4623e6e8b415fe38c43a9a6b435cd3330e92146f1a51b906104949085908590610fb2565b60405180910390a25050565b6104aa82826106fa565b60038190556001546040516302571be360e01b815260048101929092526001600160a01b0316906302571be390602401602060405180830381865afa1580156104f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051b9190610f1e565b6001600160a01b0316336001600160a01b03161461056d576003546001546040516302571be360e01b8152600481018390523392859285926001600160a01b03909116906302571be3906024016103ab565b60006001600160a01b03166005838360405161058a929190610fa2565b908152604051908190036020019020546001600160a01b0316146105f25733600583836040516105bb929190610fa2565b90815260405190819003602001812054632c064ce160e01b825261040a92916001600160a01b039091169085908590600401610fc6565b3360058383604051610605929190610fa2565b90815260405190819003602001812080546001600160a01b039390931673ffffffffffffffffffffffffffffffffffffffff199093169290921790915533907f55da0857a5df23f43c9be98b1707bc6a2d42d5ec8ee76089999c188f8afcf861906106739085908590610fb2565b60405180910390a26006805490600061068b83611013565b90915550506002546040516384b47b0f60e01b81526001600160a01b03909116906384b47b0f906106c49085908590339060040161102c565b600060405180830381600087803b1580156106de57600080fd5b505af11580156106f2573d6000803e3d6000fd5b505050505050565b60008061073c84848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506109f392505050565b60408051808201825260018152601760f91b6020808301918252835180850185526000808252908201819052845180860190955292518452830152919250906107858383610a20565b610790906001611059565b67ffffffffffffffff8111156107a8576107a8610e57565b6040519080825280602002602001820160405280156107db57816020015b60608152602001906001900390816107c65790505b50905060005b815181101561082c576107fc6107f78585610ac1565b610ae0565b82828151811061080e5761080e611071565b6020026020010181905250808061082490611013565b9150506107e1565b508051600103610888576004548686604051610849929190610fa2565b6040519081900381206108689291602001918252602082015260400190565b60408051601f1981840301815291905280516020909101206003556109e4565b6000600182516108989190611087565b90505b80156109e257600182516108af9190611087565b8103610913576004548282815181106108ca576108ca611071565b6020026020010151805190602001206040516020016108f3929190918252602082015260400190565b60408051601f19818403018152919052805160209091012060035561096d565b60035482828151811061092857610928611071565b602002602001015180519060200120604051602001610951929190918252602082015260400190565b60408051601f1981840301815291905280516020909101206003555b806001036109d0576003548260008151811061098b5761098b611071565b6020026020010151805190602001206040516020016109b4929190918252602082015260400190565b60408051601f1981840301815291905280516020909101206003555b806109da8161109e565b91505061089b565b505b60035493505050505b92915050565b60408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b6000808260000151610a448560000151866020015186600001518760200151610b49565b610a4e9190611059565b90505b83516020850151610a629190611059565b8111610aba5781610a7281611013565b9250508260000151610aa9856020015183610a8d9190611087565b8651610a999190611087565b8386600001518760200151610b49565b610ab39190611059565b9050610a51565b5092915050565b6040805180820190915260008082526020820152610aba838383610c6b565b60606000826000015167ffffffffffffffff811115610b0157610b01610e57565b6040519080825280601f01601f191660200182016040528015610b2b576020820181803683370190505b5090506000602082019050610aba8185602001518660000151610d16565b60008381868511610c545760208511610c035760008515610b95576001610b71876020611087565b610b7c9060086110b5565b610b879060026111b8565b610b919190611087565b1990505b84518116600087610ba68b8b611059565b610bb09190611087565b855190915083165b828114610bf557818610610bdd57610bd08b8b611059565b9650505050505050610c63565b85610be781611013565b965050838651169050610bb8565b859650505050505050610c63565b508383206000905b610c158689611087565b8211610c5257858320808203610c315783945050505050610c63565b610c3c600185611059565b9350508180610c4a90611013565b925050610c0b565b505b610c5e8787611059565b925050505b949350505050565b60408051808201909152600080825260208201526000610c9d8560000151866020015186600001518760200151610b49565b602080870180519186019190915251909150610cb99082611087565b835284516020860151610ccc9190611059565b8103610cdb5760008552610d0d565b83518351610ce99190611059565b85518690610cf8908390611087565b9052508351610d079082611059565b60208601525b50909392505050565b60208110610d4e5781518352610d2d602084611059565b9250610d3a602083611059565b9150610d47602082611087565b9050610d16565b6000198115610d7d576001610d64836020611087565b610d70906101006111b8565b610d7a9190611087565b90505b9151835183169219169190911790915250565b6001600160a01b0381168114610da557600080fd5b50565b600060208284031215610dba57600080fd5b8135610dc581610d90565b9392505050565b600060208284031215610dde57600080fd5b5035919050565b60008060208385031215610df857600080fd5b823567ffffffffffffffff80821115610e1057600080fd5b818501915085601f830112610e2457600080fd5b813581811115610e3357600080fd5b866020828501011115610e4557600080fd5b60209290920196919550909350505050565b634e487b7160e01b600052604160045260246000fd5b600060208284031215610e7f57600080fd5b813567ffffffffffffffff80821115610e9757600080fd5b818401915084601f830112610eab57600080fd5b813581811115610ebd57610ebd610e57565b604051601f8201601f19908116603f01168101908382118183101715610ee557610ee5610e57565b81604052828152876020848701011115610efe57600080fd5b826020860160208301376000928101602001929092525095945050505050565b600060208284031215610f3057600080fd5b8151610dc581610d90565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60006001600160a01b03808816835260806020840152610f88608084018789610f3b565b604084019590955292909216606090910152509392505050565b8183823760009101908152919050565b602081526000610c63602083018486610f3b565b60006001600160a01b03808716835280861660208401525060606040830152610ff3606083018486610f3b565b9695505050505050565b634e487b7160e01b600052601160045260246000fd5b60006001820161102557611025610ffd565b5060010190565b604081526000611040604083018587610f3b565b90506001600160a01b0383166020830152949350505050565b6000821982111561106c5761106c610ffd565b500190565b634e487b7160e01b600052603260045260246000fd5b60008282101561109957611099610ffd565b500390565b6000816110ad576110ad610ffd565b506000190190565b60008160001904831182151516156110cf576110cf610ffd565b500290565b600181815b8085111561110f5781600019048211156110f5576110f5610ffd565b8085161561110257918102915b93841c93908002906110d9565b509250929050565b600082611126575060016109ed565b81611133575060006109ed565b816001811461114957600281146111535761116f565b60019150506109ed565b60ff84111561116457611164610ffd565b50506001821b6109ed565b5060208310610133831016604e8410600b8410161715611192575081810a6109ed565b61119c83836110d4565b80600019048211156111b0576111b0610ffd565b029392505050565b6000610dc5838361111756fea164736f6c634300080d000a";

type PhiRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PhiRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PhiRegistry__factory extends ContractFactory {
  constructor(...args: PhiRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    ens: string,
    map: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PhiRegistry> {
    return super.deploy(ens, map, overrides || {}) as Promise<PhiRegistry>;
  }
  override getDeployTransaction(
    ens: string,
    map: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(ens, map, overrides || {});
  }
  override attach(address: string): PhiRegistry {
    return super.attach(address) as PhiRegistry;
  }
  override connect(signer: Signer): PhiRegistry__factory {
    return super.connect(signer) as PhiRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PhiRegistryInterface {
    return new utils.Interface(_abi) as PhiRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PhiRegistry {
    return new Contract(address, _abi, signerOrProvider) as PhiRegistry;
  }
}
