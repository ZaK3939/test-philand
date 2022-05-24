import { readFileSync } from "fs";
import hre from "hardhat";

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
  const premiumObjectAbiName = "PremiumObject";
  const phiObjectAbiName = "PhiObject";
  const freeObjectAbiName = "FreeObject";

  const phiClaimAddress = getAddress(phiClaimAbiName, NETWORK);
  const phiMapAddress = getAddress(phiMapAbiName, NETWORK);
  const premiumObjectAddress = getAddress(premiumObjectAbiName, NETWORK);
  const phiObjectAddress = getAddress(phiObjectAbiName, NETWORK);
  const freeObjectAddress = getAddress(freeObjectAbiName, NETWORK);

  const phiClaimContractFactory = (await hre.ethers.getContractFactory(phiClaimAbiName)) as any;
  const phiMapContractFactory = (await hre.ethers.getContractFactory(phiMapAbiName)) as any;
  const premiumObjectContractFactory = (await hre.ethers.getContractFactory(premiumObjectAbiName)) as any;
  const phiObjectContractFactory = (await hre.ethers.getContractFactory(phiObjectAbiName)) as any;
  const freeObjectContractFactory = (await hre.ethers.getContractFactory(freeObjectAbiName)) as any;

  const phiClaimContractInstance = await phiClaimContractFactory.attach(phiClaimAddress);
  const phiMapContractInstance = await phiMapContractFactory.attach(phiMapAddress);
  const premiumObjectContractInstance = await premiumObjectContractFactory.attach(premiumObjectAddress);
  const phiObjectContractInstance = await phiObjectContractFactory.attach(phiObjectAddress);
  const freeObjectContractInstance = await freeObjectContractFactory.attach(freeObjectAddress);

  const conditioncsv = readFileSync(`${__dirname}/csv/condition.csv`, {
    encoding: "utf8",
  });
  const conditionRowList = new CSV(conditioncsv, { header: true, cast: false }).parse();
  funcName = "setCouponType";
  for (let i = 0; i < conditionRowList.length; i++) {
    calldata = [
      String(conditionRowList[i].Condition) + String(conditionRowList[i].Value),
      String(conditionRowList[i].TokenId),
    ];
    console.log(calldata);
    res = await phiClaimContractInstance[funcName](...calldata);
    console.log("phiClaim setCouponType Response:", res);
  }

  const objectscsv = readFileSync(`${__dirname}/csv/objects.csv`, {
    encoding: "utf8",
  });
  const objectRowList = new CSV(objectscsv, { header: true, cast: false }).parse();
  funcName = "createObject";
  for (let i = 0; i < objectRowList.length; i++) {
    const size = String(objectRowList[i].size);
    const metadataURL = String(objectRowList[i].json_url).split("/");
    calldata = [
      String(objectRowList[i].tokenId),
      metadataURL.slice(-1)[0],
      { x: size[1], y: size[3], z: "1" },
      l1Signer.address,
      String(objectRowList[i].maxClaimed),
    ];
    console.log(calldata);
    res = await phiObjectContractInstance[funcName](...calldata);
    console.log("create Object Response:", res);
  }

  funcName = "createObject";
  calldata = [0, "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw", { x: 1, y: 1, z: 2 }, l1Signer.address, 200, 1];
  console.log(calldata);
  res = await premiumObjectContractInstance[funcName](...calldata);
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
  res = await freeObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);

  calldata = [phiClaimAddress];
  res = await freeObjectContractInstance[funcName](...calldata);
  console.log("setOwner Response:", res);

  // for oji3 test
  funcName = "setOwner";
  calldata = ["0xFe3DdB7883c3f09e1fdc9908B570C6C79fB25f7C"];
  res = await phiObjectContractInstance[funcName](...calldata);
  res = await premiumObjectContractInstance[funcName](...calldata);
  res = await freeObjectContractInstance[funcName](...calldata);
  res = await phiMapContractInstance[funcName](...calldata);
  res = await phiClaimContractInstance[funcName](...calldata);
}
