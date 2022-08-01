require("dotenv").config()
const ethers = require("ethers")
const API_URL = process.env.RINKEBY_API
const PUBLIC_KEY = "0x04957297B19a707eB949CdB9bbd0765B18314D30"
const PRIVATE_KEY = process.env.PRIVATE_KEY
var fs = require("fs");
var path = require("path");
const Web3 = require("web3");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  API_URL
);
const contract = require("../artifacts/contracts/Product.sol/Product.json");
const contractAddress = "0x7f06c36140Bd23BC2C8d4cbC4ACEC5391f521A49";

//Function to mint NFT Token while placing order
async function mintNFT(tokenURI,toAddress) {
    try {
        //get latest nonce
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
        const nftContract = new web3.eth.Contract(
          contract.abi,
          contractAddress
        );
        //the transaction data
        const tx = {
          //seller address
          from: PUBLIC_KEY,
          //buyer
          to: contractAddress,
          //description
          nonce: nonce,
          gas: 500000,
          data: nftContract.methods
            .safeMint(toAddress, PUBLIC_KEY, tokenURI).encodeABI(),
        };
        
        //Siginig transaction details
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
