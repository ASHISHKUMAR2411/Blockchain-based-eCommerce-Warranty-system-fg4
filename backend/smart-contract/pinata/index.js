const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const fs = require('fs');


// connecting to pinata account
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

// IPFS data 
const options = {
  pinataMetadata: {
    name: "My NFT Collection",
    keyvalues: {
      customKey: "customValue",
      customKey2: "customValue2",
    },
  },
  pinataOptions: {
    cidVersion: 0,
  },
};


  // function to pin file to ipfs and get the hash
const pinFileToIPFS = (readableStreamForFile, options) => {
  return pinata
    .pinFileToIPFS(readableStreamForFile, options)
    .then((result) => {
      return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
      // console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// to pin json file to ipfs and get the hash of the file, we try a function 
const pinJSONToIPFS = (body) => {
    return pinata.pinJSONToIPFS(body, options).then((result) => {
        console.log(result);
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}


// function for image ipfs hash link
const getMetadata = async (
  shortTitle,
  longTitle,
  price,
  category,
  tagline,
  waranty,
  imgname,
  uniqueId
) => {
  try {
    const readableStreamForFile = fs.createReadStream("./public/" + imgname);

    const imageIpfsLink = await pinFileToIPFS(readableStreamForFile, options);

    // the body contains the metadata of the Product
    const body = {
      name: shortTitle,
      description: longTitle,
      image: imageIpfsLink,
      properties: {
        price: price,
        category: category,
        tagline: tagline,
        waranty: waranty,
        uniqueId: uniqueId,
      },
    };

    // options for the json file and geting the hash of the file
    const jsonFileLink = await pinJSONToIPFS(body, options);
    console.log(jsonFileLink);
    return jsonFileLink;
  } catch (error) {
    console.log("GetMetaData");
    console.log(error);
  }
};

module.exports = { getMetadata };