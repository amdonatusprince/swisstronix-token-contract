const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");



const sendShieldedTransaction = async (signer, destination, data, value) => {
    // Get the RPC link from the network configuration
    const rpclink = hre.network.config.url;
  
    // Encrypt transaction data
    const [encryptedData] = await encryptDataField(rpclink, data);
  
    // Construct and sign transaction with encrypted data
    return await signer.sendTransaction({
      from: signer.address,
      to: destination,
      data: encryptedData,
      value,
    });
  };

  async function main() {
    // Address of the deployed contract
    const contractAddress = "0xA2A3b38f6088d729a1454BCD2863ce87B9953079";

    // Get the signer (your account)
    const [signer] = await hre.ethers.getSigners();
    const mintAddress = signer.address
    const mintAmount = hre.ethers.parseEther('1000.0')
  
  
    // Construct a contract instance
    const contractFactory = await hre.ethers.getContractFactory("sNGN");
    const contract = contractFactory.attach(contractAddress);
  
    // Send a shielded transaction to mint 1000 sNGN token in the contract
    const mintToken = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData("mint", [mintAddress, mintAmount]), 0);
    await mintToken.wait();
  
    //It should return a TransactionResponse object
    console.log("Token Mint Receipt ", mintToken);
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });