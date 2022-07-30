require('dotenv').config();
const API_URL = process.env.RINKEBY_API;
const PUBLIC_KEY = "0x04957297B19a707eB949CdB9bbd0765B18314D30";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);


const contract = require("../artifacts/contracts/Product.sol/Product.json");
const contractAddress = "0x1bc7dd19e817ad4d4096d324f3aaba910ed40603";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// const val = nftContract.methods.safeMint(PUBLIC_KEY, "0xf4B743D528f463325236FD5a87655F445A8D7be1", "https://gateway.pinata.cloud/ipfs/QmVogXgWNq5RSXFhWicC1fYLc3A9U5ktrbxNFQt25TQwrP").encodeABI();

// console.log(val);
// time is the time of the warranty in months
// ether is the amount of ether to be paid for the warranty
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.safeMint(PUBLIC_KEY, "0xf4B743D528f463325236FD5a87655F445A8D7be1", tokenURI).encodeABI()
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
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmdQBW4ttpstbu3yrepyCcJsbF5Drh9XZtyhzLBC1tMRYN");