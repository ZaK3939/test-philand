import hre from "hardhat";

import { getAddress } from "../deploy/utils";

settingPhi()
  .then(() => console.log("Successfully invoked"))
  .catch(err => console.log(err));

export async function settingPhi(): Promise<void> {
  const [l1Signer] = await hre.ethers.getSigners();
  let calldata: any = [];
  let funcName: any = "";
  let res: any = {};

  let NETWORK;
  if (hre.network.name === "fork") {
    NETWORK = "mainnet";
  } else {
    NETWORK = hre.network.name;
  }
  console.log("Account balance:", (await l1Signer.getBalance()).toString());
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const BLOCK_NUMBER = await l1Signer.provider.getBlockNumber();
  console.log(l1Signer.address);
  console.log(`Deploying from:`);
  console.log(`\tl1: ${(await l1Signer.getAddress()).toString()}`);

  const phiClaimAbiName = "PhiClaim";
  const phiMapAbiName = "PhiMap";
  const paidObjectAbiName = "PaidObject";
  const soulObjectAbiName = "SoulObject";
  const phiObjectAbiName = "PhiObject";

  const phiClaimAddress = getAddress(phiClaimAbiName, NETWORK);
  const phiObjectAddress = getAddress(phiObjectAbiName, NETWORK);
  const phiMapAddress = getAddress(phiMapAbiName, NETWORK);
  const paidObjectAddress = getAddress(paidObjectAbiName, NETWORK);
  const soulObjectAddress = getAddress(soulObjectAbiName, NETWORK);

  const phiClaimContractFactory = (await hre.ethers.getContractFactory(phiClaimAbiName)) as any;
  const paidObjectContractFactory = (await hre.ethers.getContractFactory(paidObjectAbiName)) as any;
  const phiObjectContractFactory = (await hre.ethers.getContractFactory(phiObjectAbiName)) as any;
  const soulObjectContractFactory = (await hre.ethers.getContractFactory(soulObjectAbiName)) as any;

  const phiClaimContractInstance = await phiClaimContractFactory.attach(phiClaimAddress);
  const paidObjectContractInstance = await paidObjectContractFactory.attach(paidObjectAddress);
  const phiObjectContractInstance = await phiObjectContractFactory.attach(phiObjectAddress);
  const soulObjectContractInstance = await soulObjectContractFactory.attach(soulObjectAddress);

  funcName = "setCouponType";
  calldata = ["lootbalance", 1];
  res = await phiClaimContractInstance[funcName](...calldata);
  console.log("phiClaim setCouponType Response:", res);

  funcName = "createObject";
  calldata = [0, "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw", { x: 1, y: 1, z: 2 }, l1Signer.address, 200, 1];
  res = await paidObjectContractInstance[funcName](...calldata);
  console.log("create Object Response:", res);

  funcName = "setOwner";
  calldata = [phiMapAddress];
  res = await phiObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);

  calldata = [phiClaimAddress];
  res = await phiObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);

  funcName = "setOwner";
  calldata = [phiMapAddress];
  res = await soulObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);

  calldata = [phiClaimAddress];
  res = await soulObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);
}
