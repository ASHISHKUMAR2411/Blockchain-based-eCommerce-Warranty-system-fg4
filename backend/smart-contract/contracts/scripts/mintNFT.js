// package import
require("dotenv").config()
const ethers = require("ethers")
var fs = require("fs");
var path = require("path");
const Web3 = require("web3");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const contract = require("../artifacts/contracts/Product.sol/Product.json");

// API keys which includes RINKEBY_API for rinkeby testnet account from ALCHEMY, 
// and we have address of smart contract, metamask account and private key of metamask account
const API_URL = process.env.RINKEBY_API;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const web3 = createAlchemyWeb3(API_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;



//Function to mint NFT Token while placing order
async function mintNFT(tokenURI,toAddress) {
    try {
        //get latest nonce
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
        const nftContract = new web3.eth.Contract(
          contract.abi,
          contractAddress
        );
        // the transaction data
        const tx = {
          //seller address
          from: PUBLIC_KEY,
          //buyer
          to: contractAddress,
          //description
          nonce: nonce,
          gas: 500000,
          data: nftContract.methods
            .safeMint(toAddress, PUBLIC_KEY, tokenURI, 12).encodeABI(),
        };
        
        //Signing transaction details
        const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        signPromise
          .then((signedTx) => {
            web3.eth.sendSignedTransaction(
              signedTx.rawTransaction,
              function (err, hash) {
                if (!err) {
                  console.log(
                    "The hash of your transaction is: ",
                    hash,
                    "\nCheck Alchemy's Mempool to view the status of your transaction!"
                  );
                  var transaction = web3.eth.getTransactionReceipt(hash);
                  //  rinkeby account
                  console.log(
                    `https://testnets.opensea.io/assets/rinkeby/${transaction.contractAddress}/${tx.data}`
                  );
                } else {
                  console.log(
                    "Something went wrong when submitting your transaction:",
                    err
                  );
                }
                return hash;
              }
            );
          })
          .catch((err) => {
            console.log("Promise failed:", err);
            return ""
          });
    } catch (error) {
        console.log(error);
        return ""
    }
}
//export mintNFT function
module.exports = {mintNFT};
