require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
// using alchemy to api to deploy the smart contract
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_API,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
};
// "ethereum-waffle": "^3.4.4",
// 0x70cdE575D56Ce530dAc50434a812eeF257eEF6F9