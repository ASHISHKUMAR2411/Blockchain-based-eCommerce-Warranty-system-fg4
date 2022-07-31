require("dotenv").config()
const ethers = require("ethers")
const API_URL = process.env.RINKEBY_API
const PUBLIC_KEY = "0x04957297B19a707eB949CdB9bbd0765B18314D30"
const PRIVATE_KEY = process.env.PRIVATE_KEY
// const AbiItem  = require("web3-utils");
var fs = require("fs");
var path = require("path");
const Web3 = require("web3");


const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  API_URL
);
const contract = require("../artifacts/contracts/Product.sol/Product.json");
const contractAddress = "0x7f06c36140Bd23BC2C8d4cbC4ACEC5391f521A49";


// const transaction  = ""; 
async function mintNFT(tokenURI,toAddress) {
    try {
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
        const nftContract = new web3.eth.Contract(
          contract.abi,
          contractAddress
        );
        //the transaction
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

// var vari = 
// mintNFT("https://gateway.pinata.cloud/ipfs/QmUREG34ezjT1sP1oYVmvziHpYzyfW4uMSjoBKmsUfiqQa","0xf4B743D528f463325236FD5a87655F445A8D7be1" )
// console.log(vari);

module.exports = {mintNFT};