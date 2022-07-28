const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const fs = require('fs');


// connecting to pinata account
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

// to test whether pinata account is connected or not
// pinata.testAuthentication().then((result) => {
//     //handle successful authentication here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });


// now to pin file to ipfs and get the hash
//TODO change path of the file of the images.
const readableStreamForFile = fs.createReadStream('./images/1.png');
// pinata metadata
const options = {
    //TODO change the metadata of the file
    pinataMetadata: {
        name: "My NFT Collection",
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

const pinFileToIPFS = () => {
    // as the below function is returning a promise, we need a async function to call it.
    // function to pin file to ipfs and get the hash
    return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        //handle results here
        // we get result as a json format like - 
        // {
        //        IpfsHash: 'QmbPsaZxrGzKYtrdNKkxqqCoZr4eTv6YjYfV9AiLRJr1HJ',
        //        PinSize: 6221,
        //        Timestamp: '2022-07-25T08:14:45.529Z'
        // }
        // this is called cid(content identifier) of the file which is a hash of the file.

        // we will return the image ipfs link 
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
        // console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}

// to pin json file to ipfs and get the hash of the file, we try a function 
const pinJSONToIPFS = (body) => {
    // as the below function is returning a promise, we need a async function to call it.
    return pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        // we get result as a json format like -
        // and we return the url
        console.log(result);
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}


// function for image ipfs hash link
const getMetadata = async () => {
    // we can also get the timestamps from the metadata of the file
    const imageIpfsLink = await pinFileToIPFS();
    console.log(imageIpfsLink);

    // Now creating a json file which contain the image url and metadata of the NFT
    // object body , option , pin

    // it is json format
    //TODO change body of the json file
    const body = {
        name: '100 White Diamond Earings',
        description: 'One of the most beautiful earning in the world with more than 100 white polished certified diamonds with a elegant design and with the finest quality.',
        image: imageIpfsLink,
        properties: {
            price: '$823000',
            weight: '24gm',
            quality: 'AGA certified',
            material: 'Diamonds and Gold',
            color: 'Golden white'
        }
    };

    // options for the json file and geting the hash of the file
    const jsonFileLink = await pinJSONToIPFS(body);
    console.log(jsonFileLink);
    // TODO return the json file link
    // return jsonFileLink;
}

// https://gateway.pinata.cloud/ipfs/QmePQKquwcUCcsa195u1pSFBCy1FMWQjJL1zXfdLB6QmWc

// TODO call this function from the file to create ipfs object.
getMetadata();


