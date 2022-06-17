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

  // const phiClaimAbiName = "PhiClaim";
  // const phiMapAbiName = "PhiMap";
  // const phiRegistryAbiName = "PhiRegistry";
  // const premiumObjectAbiName = "PremiumObject";
  // const phiObjectAbiName = "PhiObject";
  // const freeObjectAbiName = "FreeObject";
  // const wallPaperAbiName = "WallPaper";
  //  const objectControllerAbiName = "ObjectController";

  // const phiClaimAddress = getAddress(phiClaimAbiName, NETWORK);
  // const phiMapAddress = getAddress(phiMapAbiName, NETWORK);
  // const phiRegistryAddress = getAddress(phiRegistryAbiName, NETWORK);
  // const premiumObjectAddress = getAddress(premiumObjectAbiName, NETWORK);
  // const phiObjectAddress = getAddress(phiObjectAbiName, NETWORK);
  // const freeObjectAddress = getAddress(freeObjectAbiName, NETWORK);
  // const wallPaperAddress = getAddress(wallPaperAbiName, NETWORK);
  // const objectControllerAddress = getAddress(objectControllerAbiName, NETWORK);

  // const premiumObject = await deployL1(NETWORK, "PremiumObject", BLOCK_NUMBER, [l1Signer.address]);
  // const freeObject = await deployL1(NETWORK, "FreeObject", BLOCK_NUMBER, [l1Signer.address]);
  // const phiObject = await deployL1(NETWORK, "PhiObject", BLOCK_NUMBER, [l1Signer.address]);
  // const wallPaper = await deployL1(NETWORK, "WallPaper", BLOCK_NUMBER, [l1Signer.address]);

  const phiClaim = await deployL1Upgrade(NETWORK, "PhiClaim", BLOCK_NUMBER, [l1Signer.address, l1Signer.address]);
  const phiMap = await deployL1Upgrade(NETWORK, "PhiMap", BLOCK_NUMBER, [l1Signer.address]);
  const phiRegistry = await deployL1Upgrade(NETWORK, "PhiRegistry", BLOCK_NUMBER, [
    l1Signer.address,
    ENS_ADDRESS,
    phiMap.address,
  ]);
  // const phiMap = await contractUpgrade(NETWORK, "PhiMap", BLOCK_NUMBER, phiMapAddress);
  // const phiRegistry = await contractUpgrade(NETWORK, "PhiRegistry", BLOCK_NUMBER, phiRegistryAddress);
  // const objectController = await deployL1(NETWORK, "ObjectController", BLOCK_NUMBER, [phiMap.address]);
}

export function printAddresses() {
  const NETWORK = hre.network.name;

  const contracts = ["PremiumObject", "FreeObject", "PhiObject", "WallPaper", "PhiMap", "PhiRegistry", "PhiClaim"];

  const addresses = contracts.reduce((a, c) => Object.assign(a, { [c]: getAddress(c, NETWORK) }), {});

  console.log(addresses);
}

export async function deployPhiPolygon(): Promise<void> {
  const [l1Signer] = await hre.ethers.getSigners();

  let NETWORK;
  if (hre.network.name === "fork") {
    NETWORK = "mainnet";
  } else {
    NETWORK = hre.network.name;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const BLOCK_NUMBER = await l1Signer.provider.getBlockNumber();
  console.log(l1Signer.address);
  console.log(`Deploying from:`);
  console.log(`\tl1: ${(await l1Signer.getAddress()).toString()}`);

  const premiumObject = await deployL1(NETWORK, "PremiumObject", BLOCK_NUMBER, [l1Signer.address]);
  const freeObject = await deployL1(NETWORK, "FreeObject", BLOCK_NUMBER, [l1Signer.address]);
  // const soulObject = await deployL1(NETWORK, "SoulObject", BLOCK_NUMBER, []);
  const phiObject = await deployL1(NETWORK, "PhiObject", BLOCK_NUMBER, [l1Signer.address]);
  const phiMap = await deployL1Upgrade(NETWORK, "PhiMap", BLOCK_NUMBER, [l1Signer.address]);
  const phiClaim = await deployL1Upgrade(NETWORK, "PhiClaim", BLOCK_NUMBER, [l1Signer.address, l1Signer.address]);
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

async function deployL1Upgrade(
  network: string,
  name: string,
  blockNumber: number,
  calldata: any = [],
  saveName?: string,
) {
  console.log(`Deploying: ${name}${(saveName && "/" + saveName) || ""}...`);
  const contractFactory = await hre.ethers.getContractFactory(name);
  console.log(calldata);
  const upgrade = await hre.upgrades.deployProxy(contractFactory, [...calldata]);
  const contract = await upgrade.deployed();
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

async function contractUpgrade(network: string, name: string, blockNumber: number, address: string, saveName?: string) {
  console.log(`Deploying: ${name}${(saveName && "/" + saveName) || ""}...`);
  const contractFactory = await hre.ethers.getContractFactory(name);
  console.log(address);
  const contract = await hre.upgrades.upgradeProxy(address, contractFactory);
  save(saveName || name, contract, hre.network.name, blockNumber);

  console.log(`Waiting for upgrade to complete`);
  console.log(`Deployed: ${saveName || name} to: ${contract.address}`);

  await contract.deployed();
  return contract;
}
