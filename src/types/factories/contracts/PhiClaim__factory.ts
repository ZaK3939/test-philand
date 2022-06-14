/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PhiClaim, PhiClaimInterface } from "../../contracts/PhiClaim";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "AllreadyClaimedObject",
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
        name: "signer",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "digest",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
        ],
        internalType: "struct PhiClaim.Coupon",
        name: "coupon",
        type: "tuple",
      },
    ],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "NotAdminCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [],
    name: "Hello",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
        internalType: "uint256",
        name: "tokenid",
        type: "uint256",
      },
    ],
    name: "LogClaimObject",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "verifierAddress",
        type: "address",
      },
    ],
    name: "SetAdminSigner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "condition",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenid",
        type: "uint256",
      },
    ],
    name: "SetCoupon",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "condition",
        type: "string",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
        ],
        internalType: "struct PhiClaim.Coupon",
        name: "coupon",
        type: "tuple",
      },
    ],
    name: "claimPhiObject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAdminSigner",
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
        internalType: "string",
        name: "condition",
        type: "string",
      },
    ],
    name: "getCouponType",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "adminSigner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "phiClaimedLists",
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
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "verifierAdderss",
        type: "address",
      },
    ],
    name: "setAdminSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "condition",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "setCouponType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50600062000020600162000087565b9050801562000039576000805461ff0019166101001790555b801562000080576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50620001a8565b60008054610100900460ff161562000120578160ff166001148015620000c05750620000be306200019960201b620007a01760201c565b155b620001185760405162461bcd60e51b815260206004820152602e60248201526000805160206200143e83398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b506000919050565b60005460ff8084169116106200017f5760405162461bcd60e51b815260206004820152602e60248201526000805160206200143e83398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016200010f565b506000805460ff191660ff92909216919091179055600190565b6001600160a01b03163b151590565b61128680620001b86000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806391d148541161008c578063a4cfd20a11610066578063a4cfd20a14610218578063a8bc401d14610233578063cb568fd414610246578063d547741f1461025957600080fd5b806391d14854146101c457806392ca3180146101fd578063a217fddf1461021057600080fd5b80632f2ff15d116100c85780632f2ff15d1461015d57806334d0d7b41461017057806336568abe1461019e578063485cc955146101b157600080fd5b806301ffc9a7146100ef578063183bbe8014610117578063248a9ca31461012c575b600080fd5b6101026100fd366004610da4565b61026c565b60405190151581526020015b60405180910390f35b61012a610125366004610de5565b6102a3565b005b61014f61013a366004610e00565b60009081526065602052604090206001015490565b60405190815260200161010e565b61012a61016b366004610e19565b610350565b61010261017e366004610e45565b609860209081526000928352604080842090915290825290205460ff1681565b61012a6101ac366004610e19565b61037a565b61012a6101bf366004610e6f565b610406565b6101026101d2366004610e19565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61014f61020b366004610f65565b6104d8565b61014f600081565b6097546040516001600160a01b03909116815260200161010e565b61012a610241366004610fa2565b610500565b61012a61025436600461107c565b6106ca565b61012a610267366004610e19565b61077b565b60006001600160e01b03198216637965db0b60e01b148061029d57506301ffc9a760e01b6001600160e01b03198316145b92915050565b3360009081527fffdfc1249c027f9191656349feb0761381bb32c9f557e01f419fd08754bf5a1b602052604090205460ff166102f957604051631a35241360e31b81523360048201526024015b60405180910390fd5b6097805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383169081179091556040517fe962aa622975becd620ca7b16db507022a2b43cc5657b30c4b907a7ecfb8042590600090a250565b60008281526065602052604090206001015461036b816107af565b61037583836107bc565b505050565b6001600160a01b03811633146103f85760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016102f0565b610402828261085e565b5050565b600061041260016108e1565b9050801561042a576000805461ff0019166101001790555b6097805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03841617905561045a6109fc565b610465600084610a7b565b6040517fbcdfe0d5b27dd186282e187525415c57ea3077c34efb39148111e4d342e7ab0e90600090a18015610375576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b60006099826040516104ea91906110f1565b9081526020016040518091039020549050919050565b336000908152609860209081526040808320878452909152902054849060ff16151560010361054b57604051636ed7bf2b60e11b8152336004820152602481018290526044016102f0565b60008690506000876099878760405161056592919061110d565b908152604080519182900360209081018320546001600160a01b03909416908301528101919091523360608201526080016040516020818303038152906040528051906020012090506105b88185610a85565b6106045760405162461bcd60e51b815260206004820152600e60248201527f496e76616c696420636f75706f6e00000000000000000000000000000000000060448201526064016102f0565b3360008181526098602090815260408083208b845290915290819020805460ff191660011790555163330343c160e11b81526004810191909152602481018890526001600160a01b03831690636606878290604401600060405180830381600087803b15801561067357600080fd5b505af1158015610687573d6000803e3d6000fd5b50506040518981523392507fa7257a8b02d81b3fb6715b360a5b4f02dcdc4a4b36e79108b7738ee77706d8cb915060200160405180910390a25050505050505050565b3360009081527fffdfc1249c027f9191656349feb0761381bb32c9f557e01f419fd08754bf5a1b602052604090205460ff1661071b57604051631a35241360e31b81523360048201526024016102f0565b8060998360405161072c91906110f1565b9081526020016040518091039020819055507fd48ea628c05cf728666ea64aa7f8a243f1b39c14c572c1bfffb231d92cba27f1828260405161076f929190611149565b60405180910390a15050565b600082815260656020526040902060010154610796816107af565b610375838361085e565b6001600160a01b03163b151590565b6107b98133610b74565b50565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff166104025760008281526065602090815260408083206001600160a01b03851684529091529020805460ff1916600117905561081a3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff16156104025760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60008054610100900460ff161561096f578160ff1660011480156109045750303b155b6109675760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016102f0565b506000919050565b60005460ff8084169116106109dd5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016102f0565b506000805460ff191660ff92909216919091179055600190565b919050565b600054610100900460ff16610a795760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e6700000000000000000000000000000000000000000060648201526084016102f0565b565b61040282826107bc565b60008060018484604001518560000151866020015160405160008152602001604052604051610ad0949392919093845260ff9290921660208401526040830152606082015260800190565b6020604051602081039080840390855afa158015610af2573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610b5c576040805163d1c36d9d60e01b81523360048201526001600160a01b03831660248201526044810186905284516064820152602085015160848201529084015160ff1660a482015260c4016102f0565b6097546001600160a01b039081169116149392505050565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff1661040257610bb2816001600160a01b03166014610bf4565b610bbd836020610bf4565b604051602001610bce92919061116b565b60408051601f198184030181529082905262461bcd60e51b82526102f0916004016111ec565b60606000610c03836002611215565b610c0e906002611234565b67ffffffffffffffff811115610c2657610c26610e99565b6040519080825280601f01601f191660200182016040528015610c50576020820181803683370190505b509050600360fc1b81600081518110610c6b57610c6b61124c565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610c9a57610c9a61124c565b60200101906001600160f81b031916908160001a9053506000610cbe846002611215565b610cc9906001611234565b90505b6001811115610d4e577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110610d0a57610d0a61124c565b1a60f81b828281518110610d2057610d2061124c565b60200101906001600160f81b031916908160001a90535060049490941c93610d4781611262565b9050610ccc565b508315610d9d5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016102f0565b9392505050565b600060208284031215610db657600080fd5b81356001600160e01b031981168114610d9d57600080fd5b80356001600160a01b03811681146109f757600080fd5b600060208284031215610df757600080fd5b610d9d82610dce565b600060208284031215610e1257600080fd5b5035919050565b60008060408385031215610e2c57600080fd5b82359150610e3c60208401610dce565b90509250929050565b60008060408385031215610e5857600080fd5b610e6183610dce565b946020939093013593505050565b60008060408385031215610e8257600080fd5b610e8b83610dce565b9150610e3c60208401610dce565b634e487b7160e01b600052604160045260246000fd5b6040516060810167ffffffffffffffff81118282101715610ed257610ed2610e99565b60405290565b600082601f830112610ee957600080fd5b813567ffffffffffffffff80821115610f0457610f04610e99565b604051601f8301601f19908116603f01168101908282118183101715610f2c57610f2c610e99565b81604052838152866020858801011115610f4557600080fd5b836020870160208301376000602085830101528094505050505092915050565b600060208284031215610f7757600080fd5b813567ffffffffffffffff811115610f8e57600080fd5b610f9a84828501610ed8565b949350505050565b600080600080600085870360c0811215610fbb57600080fd5b610fc487610dce565b955060208701359450604087013567ffffffffffffffff80821115610fe857600080fd5b818901915089601f830112610ffc57600080fd5b81358181111561100b57600080fd5b8a602082850101111561101d57600080fd5b6020929092019550909350506060605f198201121561103b57600080fd5b50611044610eaf565b606087013581526080870135602082015260a087013560ff8116811461106957600080fd5b6040820152949793965091945092919050565b6000806040838503121561108f57600080fd5b823567ffffffffffffffff8111156110a657600080fd5b6110b285828601610ed8565b95602094909401359450505050565b60005b838110156110dc5781810151838201526020016110c4565b838111156110eb576000848401525b50505050565b600082516111038184602087016110c1565b9190910192915050565b8183823760009101908152919050565b600081518084526111358160208601602086016110c1565b601f01601f19169290920160200192915050565b60408152600061115c604083018561111d565b90508260208301529392505050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516111a38160178501602088016110c1565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516111e08160288401602088016110c1565b01602801949350505050565b602081526000610d9d602083018461111d565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561122f5761122f6111ff565b500290565b60008219821115611247576112476111ff565b500190565b634e487b7160e01b600052603260045260246000fd5b600081611271576112716111ff565b50600019019056fea164736f6c634300080d000a496e697469616c697a61626c653a20636f6e747261637420697320616c726561";

type PhiClaimConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PhiClaimConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PhiClaim__factory extends ContractFactory {
  constructor(...args: PhiClaimConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PhiClaim> {
    return super.deploy(overrides || {}) as Promise<PhiClaim>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PhiClaim {
    return super.attach(address) as PhiClaim;
  }
  override connect(signer: Signer): PhiClaim__factory {
    return super.connect(signer) as PhiClaim__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PhiClaimInterface {
    return new utils.Interface(_abi) as PhiClaimInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PhiClaim {
    return new Contract(address, _abi, signerOrProvider) as PhiClaim;
  }
}
