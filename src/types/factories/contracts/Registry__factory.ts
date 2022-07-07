/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { Registry, RegistryInterface } from "../../contracts/Registry";
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
        internalType: "struct Registry.Coupon",
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
        internalType: "address",
        name: "_phiMapAddress",
        type: "address",
      },
    ],
    name: "LogChangePhilandAddress",
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
        internalType: "bytes32",
        name: "basenode",
        type: "bytes32",
      },
    ],
    name: "SetBaseNode",
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
        name: "_phiMapAddress",
        type: "address",
      },
    ],
    name: "changePhilandAddress",
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
        internalType: "struct Registry.Coupon",
        name: "coupon",
        type: "tuple",
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
        internalType: "struct Registry.Coupon",
        name: "coupon",
        type: "tuple",
      },
    ],
    name: "createPhiland",
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
        name: "_map",
        type: "address",
      },
      {
        internalType: "address",
        name: "_adminSigner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "map",
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
        name: "",
        type: "address",
      },
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
        internalType: "bytes32",
        name: "_basenode",
        type: "bytes32",
      },
    ],
    name: "setBaseNode",
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
  "0x60806040523480156200001157600080fd5b50600062000020600162000087565b9050801562000039576000805461ff0019166101001790555b801562000080576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50620001a8565b60008054610100900460ff161562000120578160ff166001148015620000c05750620000be306200019960201b62000b031760201c565b155b620001185760405162461bcd60e51b815260206004820152602e60248201526000805160206200175c83398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b506000919050565b60005460ff8084169116106200017f5760405162461bcd60e51b815260206004820152602e60248201526000805160206200175c83398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016200010f565b506000805460ff191660ff92909216919091179055600190565b6001600160a01b03163b151590565b6115a480620001b86000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c8063a217fddf116100b2578063c758118411610081578063cbe9ae3411610066578063cbe9ae34146102c2578063d547741f146102d5578063e834a834146102e857600080fd5b8063c75811841461029c578063c911aabc146102af57600080fd5b8063a217fddf1461025d578063a38a50fc14610265578063a4cfd20a14610278578063c0c53b8b1461028957600080fd5b80632f2ff15d116100ee5780632f2ff15d146101a157806336568abe146101b457806346a316d9146101c757806391d148541461022457600080fd5b806301ffc9a71461012057806313e9eaab14610148578063183bbe801461015d578063248a9ca314610170575b600080fd5b61013361012e366004611107565b6102f1565b60405190151581526020015b60405180910390f35b61015b610156366004611131565b610328565b005b61015b61016b366004611161565b6103b9565b61019361017e366004611131565b60009081526065602052604090206001015490565b60405190815260200161013f565b61015b6101af36600461117c565b610454565b61015b6101c236600461117c565b61047e565b61020c6101d536600461124b565b609b60209081526000928352604090922081518083018401805192815290840192909301919091209152546001600160a01b031681565b6040516001600160a01b03909116815260200161013f565b61013361023236600461117c565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610193600081565b61015b610273366004611299565b61050a565b6098546001600160a01b031661020c565b61015b61029736600461133f565b61072a565b60975461020c906001600160a01b031681565b61015b6102bd366004611161565b61082f565b61015b6102d0366004611299565b6108d6565b61015b6102e336600461117c565b610ade565b61019360995481565b60006001600160e01b03198216637965db0b60e01b148061032257506301ffc9a760e01b6001600160e01b03198316145b92915050565b3360009081527fffdfc1249c027f9191656349feb0761381bb32c9f557e01f419fd08754bf5a1b602052604090205460ff1661037e57604051631a35241360e31b81523360048201526024015b60405180910390fd5b609a8190556040518181527fed065924cb720d2ab3ca7676485ce3a88b2bbee023cd6b3af8b010acad4a05ec9060200160405180910390a150565b3360009081527fffdfc1249c027f9191656349feb0761381bb32c9f557e01f419fd08754bf5a1b602052604090205460ff1661040a57604051631a35241360e31b8152336004820152602401610375565b609880546001600160a01b0319166001600160a01b0383169081179091556040517fe962aa622975becd620ca7b16db507022a2b43cc5657b30c4b907a7ecfb8042590600090a250565b60008281526065602052604090206001015461046f81610b12565b6104798383610b1f565b505050565b6001600160a01b03811633146104fc5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c6600000000000000000000000000000000006064820152608401610375565b6105068282610bc1565b5050565b81816000823330604051602001610523939291906113da565b6040516020818303038152906040528051906020012090506105458183610c44565b6105825760405162461bcd60e51b815260206004820152600e60248201526d24b73b30b634b21031b7bab837b760911b6044820152606401610375565b6097546001600160a01b03166000908152609b602052604080822090516105aa90889061140d565b908152604051908190036020019020546001600160a01b031614610629576097546001600160a01b03166000908152609b60205260409081902090513391906105f490889061140d565b90815260405190819003602001812054632c064ce160e01b825261037592916001600160a01b03909116908890600401611429565b6099805460010190556097546001600160a01b03166000908152609b602052604090819020905133919061065e90889061140d565b90815260405190819003602001812080546001600160a01b039384166001600160a01b03199091161790556097546384b47b0f60e01b8252909116906384b47b0f906106b0908890339060040161145e565b600060405180830381600087803b1580156106ca57600080fd5b505af11580156106de573d6000803e3d6000fd5b50505050336001600160a01b03167f55da0857a5df23f43c9be98b1707bc6a2d42d5ec8ee76089999c188f8afcf8618660405161071b9190611489565b60405180910390a25050505050565b60006107366001610d33565b9050801561074e576000805461ff0019166101001790555b610756610e4e565b610761600085610ecd565b609780546001600160a01b038086166001600160a01b0319928316179092556098805492851692909116919091179055600060998190557f93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae609a556040517fbcdfe0d5b27dd186282e187525415c57ea3077c34efb39148111e4d342e7ab0e9190a18015610829576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b3360009081527fffdfc1249c027f9191656349feb0761381bb32c9f557e01f419fd08754bf5a1b602052604090205460ff1661088057604051631a35241360e31b8152336004820152602401610375565b609780546001600160a01b0319166001600160a01b03831690811790915560405190815233907fdeb3fa3d21df17f711c7e426784f572b181d40b774cd30fb9f17f84863da6c829060200160405180910390a250565b818160008233306040516020016108ef939291906113da565b6040516020818303038152906040528051906020012090506109118183610c44565b61094e5760405162461bcd60e51b815260206004820152600e60248201526d24b73b30b634b21031b7bab837b760911b6044820152606401610375565b6097546001600160a01b03166000908152609b6020526040808220905161097690889061140d565b908152604051908190036020019020546001600160a01b0316036109f5576097546001600160a01b03166000908152609b60205260409081902090513391906109c090889061140d565b908152604051908190036020018120546325c38edf60e11b825261037592916001600160a01b03909116908890600401611429565b6097546001600160a01b03166000908152609b6020526040908190209051339190610a2190889061140d565b90815260405190819003602001812080546001600160a01b039384166001600160a01b03199091161790556097546348d740a560e01b8252909116906348d740a590610a73908890339060040161145e565b600060405180830381600087803b158015610a8d57600080fd5b505af1158015610aa1573d6000803e3d6000fd5b50505050336001600160a01b03167fbb24c9ef8c34dc16b2f4623e6e8b415fe38c43a9a6b435cd3330e92146f1a51b8660405161071b9190611489565b600082815260656020526040902060010154610af981610b12565b6104798383610bc1565b6001600160a01b03163b151590565b610b1c8133610ed7565b50565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff166105065760008281526065602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610b7d3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff16156105065760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60008060018484604001518560000151866020015160405160008152602001604052604051610c8f949392919093845260ff9290921660208401526040830152606082015260800190565b6020604051602081039080840390855afa158015610cb1573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610d1b576040805163d1c36d9d60e01b81523360048201526001600160a01b03831660248201526044810186905284516064820152602085015160848201529084015160ff1660a482015260c401610375565b6098546001600160a01b039081169116149392505050565b60008054610100900460ff1615610dc1578160ff166001148015610d565750303b155b610db95760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610375565b506000919050565b60005460ff808416911610610e2f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610375565b506000805460ff191660ff92909216919091179055600190565b919050565b600054610100900460ff16610ecb5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610375565b565b6105068282610b1f565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff1661050657610f15816001600160a01b03166014610f57565b610f20836020610f57565b604051602001610f3192919061149c565b60408051601f198184030181529082905262461bcd60e51b825261037591600401611489565b60606000610f66836002611533565b610f71906002611552565b67ffffffffffffffff811115610f8957610f896111a8565b6040519080825280601f01601f191660200182016040528015610fb3576020820181803683370190505b509050600360fc1b81600081518110610fce57610fce61156a565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610ffd57610ffd61156a565b60200101906001600160f81b031916908160001a9053506000611021846002611533565b61102c906001611552565b90505b60018111156110b1577f303132333435363738396162636465660000000000000000000000000000000085600f166010811061106d5761106d61156a565b1a60f81b8282815181106110835761108361156a565b60200101906001600160f81b031916908160001a90535060049490941c936110aa81611580565b905061102f565b5083156111005760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610375565b9392505050565b60006020828403121561111957600080fd5b81356001600160e01b03198116811461110057600080fd5b60006020828403121561114357600080fd5b5035919050565b80356001600160a01b0381168114610e4957600080fd5b60006020828403121561117357600080fd5b6111008261114a565b6000806040838503121561118f57600080fd5b8235915061119f6020840161114a565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126111cf57600080fd5b813567ffffffffffffffff808211156111ea576111ea6111a8565b604051601f8301601f19908116603f01168101908282118183101715611212576112126111a8565b8160405283815286602085880101111561122b57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806040838503121561125e57600080fd5b6112678361114a565b9150602083013567ffffffffffffffff81111561128357600080fd5b61128f858286016111be565b9150509250929050565b60008082840360808112156112ad57600080fd5b833567ffffffffffffffff808211156112c557600080fd5b6112d1878388016111be565b94506060601f19840112156112e557600080fd5b60405192506060830191508282108183111715611304576113046111a8565b5080604052506020840135815260408401356020820152606084013560ff8116811461132f57600080fd5b6040820152919491935090915050565b60008060006060848603121561135457600080fd5b61135d8461114a565b925061136b6020850161114a565b91506113796040850161114a565b90509250925092565b60005b8381101561139d578181015183820152602001611385565b838111156108295750506000910152565b600081518084526113c6816020860160208601611382565b601f01601f19169290920160200192915050565b6060815260006113ed60608301866113ae565b6001600160a01b0394851660208401529290931660409091015292915050565b6000825161141f818460208701611382565b9190910192915050565b60006001600160a01b0380861683528085166020840152506060604083015261145560608301846113ae565b95945050505050565b60408152600061147160408301856113ae565b90506001600160a01b03831660208301529392505050565b60208152600061110060208301846113ae565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516114d4816017850160208801611382565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351611511816028840160208801611382565b01602801949350505050565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561154d5761154d61151d565b500290565b600082198211156115655761156561151d565b500190565b634e487b7160e01b600052603260045260246000fd5b60008161158f5761158f61151d565b50600019019056fea164736f6c634300080d000a496e697469616c697a61626c653a20636f6e747261637420697320616c726561";

type RegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Registry__factory extends ContractFactory {
  constructor(...args: RegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Registry> {
    return super.deploy(overrides || {}) as Promise<Registry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Registry {
    return super.attach(address) as Registry;
  }
  override connect(signer: Signer): Registry__factory {
    return super.connect(signer) as Registry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RegistryInterface {
    return new utils.Interface(_abi) as RegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Registry {
    return new Contract(address, _abi, signerOrProvider) as Registry;
  }
}
