import { readFileSync } from "fs";
import hre, { ethers } from "hardhat";

import { getAddress } from "../deploy/utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CSV = require("comma-separated-values");

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
  const phiRegistryAbiName = "PhiRegistry";
  const premiumObjectAbiName = "PremiumObject";
  const phiObjectAbiName = "PhiObject";
  const freeObjectAbiName = "FreeObject";
  const wallPaperAbiName = "WallPaper";

  const phiClaimAddress = getAddress(phiClaimAbiName, NETWORK);
  const phiMapAddress = getAddress(phiMapAbiName, NETWORK);
  const phiRegistryAddress = getAddress(phiRegistryAbiName, NETWORK);
  const premiumObjectAddress = getAddress(premiumObjectAbiName, NETWORK);
  const phiObjectAddress = getAddress(phiObjectAbiName, NETWORK);
  const freeObjectAddress = getAddress(freeObjectAbiName, NETWORK);
  const wallPaperAddress = getAddress(wallPaperAbiName, NETWORK);

  const phiClaimContractFactory = (await hre.ethers.getContractFactory(phiClaimAbiName)) as any;
  const phiMapContractFactory = (await hre.ethers.getContractFactory(phiMapAbiName)) as any;
  const premiumObjectContractFactory = (await hre.ethers.getContractFactory(premiumObjectAbiName)) as any;
  const phiObjectContractFactory = (await hre.ethers.getContractFactory(phiObjectAbiName)) as any;
  const freeObjectContractFactory = (await hre.ethers.getContractFactory(freeObjectAbiName)) as any;
  const wallPaperContractFactory = (await hre.ethers.getContractFactory(wallPaperAbiName)) as any;

  const phiClaimContractInstance = await phiClaimContractFactory.attach(phiClaimAddress);
  const phiMapContractInstance = await phiMapContractFactory.attach(phiMapAddress);
  const premiumObjectContractInstance = await premiumObjectContractFactory.attach(premiumObjectAddress);
  const phiObjectContractInstance = await phiObjectContractFactory.attach(phiObjectAddress);
  const freeObjectContractInstance = await freeObjectContractFactory.attach(freeObjectAddress);
  const wallPaperContractInstance = await wallPaperContractFactory.attach(wallPaperAddress);

  // const wallPaperscsv = readFileSync(`${__dirname}/csv/setting_wallPapers.csv`, {
  //   encoding: "utf8",
  // });
  // const wallPaperRowList = new CSV(wallPaperscsv, { header: true, cast: false }).parse();
  // funcName = "createWallPaper";
  // for (let i = 0; i < wallPaperRowList.length; i++) {
  //   const size = String(wallPaperRowList[i].size);
  //   const metadataURL = String(wallPaperRowList[i].json_url).split("/");
  //   calldata = [
  //     String(wallPaperRowList[i].tokenId),
  //     metadataURL.slice(-1)[0],
  //     { x: size[1] + size[2], y: size[4] + size[5], z: "0" },
  //     l1Signer.address,
  //     String(wallPaperRowList[i].maxClaimed),
  //     ethers.utils.parseEther("0"),
  //   ];
  //   console.log(calldata);
  //   res = await wallPaperContractInstance[funcName](...calldata);
  //   console.log("create Object Response:", res);
  // }
  // const premiumObjectscsv = readFileSync(`${__dirname}/csv/setting_premiumObjects.csv`, {
  //   encoding: "utf8",
  // });
  // const premiumObjectRowList = new CSV(premiumObjectscsv, { header: true, cast: false }).parse();
  // funcName = "createObject";
  // for (let i = 0; i < premiumObjectRowList.length; i++) {
  //   const size = String(premiumObjectRowList[i].size);
  //   const metadataURL = String(premiumObjectRowList[i].json_url).split("/");
  //   calldata = [
  //     String(premiumObjectRowList[i].tokenId),
  //     metadataURL.slice(-1)[0],
  //     { x: size[1], y: size[3], z: size[5] },
  //     l1Signer.address,
  //     String(premiumObjectRowList[i].maxClaimed),
  //     ethers.utils.parseEther(premiumObjectRowList[i].price),
  //   ];
  //   console.log(calldata);
  //   res = await premiumObjectContractInstance[funcName](...calldata);
  //   console.log("create Object Response:", res);
  // }

  // const freeObjectscsv = readFileSync(`${__dirname}/csv/setting_freeObjects.csv`, {
  //   encoding: "utf8",
  // });
  // const freeObjectRowList = new CSV(freeObjectscsv, { header: true, cast: false }).parse();
  // funcName = "createObject";
  // for (let i = 0; i < freeObjectRowList.length; i++) {
  //   const size = String(freeObjectRowList[i].size);
  //   const metadataURL = String(freeObjectRowList[i].json_url).split("/");
  //   calldata = [
  //     String(freeObjectRowList[i].tokenId),
  //     metadataURL.slice(-1)[0],
  //     { x: size[1], y: size[3], z: size[5] },
  //     l1Signer.address,
  //   ];
  //   console.log(calldata);
  //   res = await freeObjectContractInstance[funcName](...calldata);
  //   console.log("create Object Response:", res);
  // }
  // const conditioncsv = readFileSync(`${__dirname}/csv/condition.csv`, {
  //   encoding: "utf8",
  // });
  // const conditionRowList = new CSV(conditioncsv, { header: true, cast: false }).parse();
  // funcName = "setCouponType";
  // for (let i = 0; i < conditionRowList.length; i++) {
  //   calldata = [
  //     String(conditionRowList[i].Condition) + String(conditionRowList[i].Value),
  //     String(conditionRowList[i].TokenId),
  //   ];
  //   console.log(calldata);
  //   res = await phiClaimContractInstance[funcName](...calldata);
  //   console.log("phiClaim setCouponType Response:", res);
  // }

  // const phiObjectscsv = readFileSync(`${__dirname}/csv/setting_phiObjects.csv`, {
  //   encoding: "utf8",
  // });
  // const phiObjectRowList = new CSV(phiObjectscsv, { header: true, cast: false }).parse();
  // funcName = "createObject";
  // for (let i = 0; i < phiObjectRowList.length; i++) {
  //   const size = String(phiObjectRowList[i].size);
  //   const metadataURL = String(phiObjectRowList[i].json_url).split("/");
  //   calldata = [
  //     String(phiObjectRowList[i].tokenId),
  //     metadataURL.slice(-1)[0],
  //     { x: size[1], y: size[3], z: size[5] },
  //     l1Signer.address,
  //     String(phiObjectRowList[i].maxClaimed),
  //     String(phiObjectRowList[i].EXP),
  //   ];
  //   console.log(calldata);
  //   res = await phiObjectContractInstance[funcName](...calldata);
  //   console.log("create Object Response:", res);
  // }

  funcName = "setOwner";
  calldata = [phiMapAddress];
  res = await phiObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);
  calldata = [phiClaimAddress];
  res = await phiObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);

  const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
  funcName = "grantRole";
  calldata = [DEFAULT_ADMIN_ROLE, phiRegistryAddress];
  res = await phiMapContractInstance.grantRole(...calldata);
  console.log("grantRole Response:", res);

  // for oji3 test
  funcName = "setOwner";
  calldata = ["0xFe3DdB7883c3f09e1fdc9908B570C6C79fB25f7C"];
  res = await phiObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);
  res = await premiumObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);
  res = await freeObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);
  res = await wallPaperContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);

  funcName = "grantRole";
  calldata = [DEFAULT_ADMIN_ROLE, "0xFe3DdB7883c3f09e1fdc9908B570C6C79fB25f7C"];
  res = await phiMapContractInstance.grantRole(...calldata);
  console.log("grantRole Response:", res);
  res = await phiClaimContractInstance.grantRole(...calldata);
  console.log("grantRole Response:", res);
}
