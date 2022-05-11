import { getRequiredEnv } from "@makerdao/hardhat-utils";
import hre from "hardhat";
import { isEmpty } from "lodash";

import { getAddress, save } from "./utils";

export async function deployPhi(): Promise<void> {
  const [l1Signer] = await hre.ethers.getSigners();

  let NETWORK;
  if (hre.network.name === "fork") {
    NETWORK = "mainnet";
  } else {
    NETWORK = hre.network.name;
  }

  const ENS_ADDRESS = getRequiredEnv(`${NETWORK.toUpperCase()}_ENS_ADDRESS`);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const BLOCK_NUMBER = await l1Signer.provider.getBlockNumber();
  console.log(l1Signer.address);
  console.log(`Deploying from:`);
  console.log(`\tl1: ${(await l1Signer.getAddress()).toString()}`);

  const paidObject = await deployL1(NETWORK, "PaidObject", BLOCK_NUMBER, [l1Signer.address, 1]);
  const freeObject = await deployL1(NETWORK, "FreeObject", BLOCK_NUMBER, [l1Signer.address]);
  // const soulObject = await deployL1(NETWORK, "SoulObject", BLOCK_NUMBER, []);
  const phiObject = await deployL1(NETWORK, "PhiObject", BLOCK_NUMBER, [l1Signer.address]);
  const phiMap = await deployL1(NETWORK, "PhiMap", BLOCK_NUMBER, [freeObject.address]);
  const phiRegistry = await deployL1(NETWORK, "PhiRegistry", BLOCK_NUMBER, [ENS_ADDRESS, phiMap.address]);
  const phiClaim = await deployL1(NETWORK, "PhiClaim", BLOCK_NUMBER, [l1Signer.address, phiObject.address]);
}

export function printAddresses() {
  const NETWORK = hre.network.name;

  const contracts = ["PaidObject", "FreeObject", "SoulObject", "PhiObject", "PhiMap", "PhiRegistry", "PhiClaim"];

  const addresses = contracts.reduce((a, c) => Object.assign(a, { [c]: getAddress(c, NETWORK) }), {});

  console.log(addresses);
}

async function deployL1(network: string, name: string, blockNumber: number, calldata: any = [], saveName?: string) {
  console.log(`Deploying: ${name}${(saveName && "/" + saveName) || ""}...`);
  const contractFactory = await hre.ethers.getContractFactory(name);
  console.log(calldata);
  const contract = await contractFactory.deploy(...calldata);
  save(saveName || name, contract, hre.network.name, blockNumber);

  console.log(`Waiting for deployment to complete`);
  await contract.deployTransaction.wait();

  console.log(`Deployed: ${saveName || name} to: ${contract.address}`);
  console.log(
    `To verify: npx hardhat verify --network ${network} ${contract.address} ${calldata
      .filter((a: any) => !isEmpty(a))
      .join(" ")}`,
  );
  await contract.deployed();
  return contract;
}
