
const hre = require("hardhat");

const { ethers } = require("ethers");

async function main() {
  const NODE_URL = "https://json-rpc.testnet.swisstronik.com";
  const provider = new ethers.JsonRpcProvider(NODE_URL);
  console.log(provider)

  const contractAddress = "0xf84Df872D385997aBc28E3f07A2E3cd707c9698a";

  // Use provider.getStorageAt, not contract.getStorageAt
  const storage = await provider.getStorageAt(contractAddress, 0);
  console.log(storage);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

