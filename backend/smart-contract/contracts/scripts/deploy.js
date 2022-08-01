// function to deploy the smart contract
async function main() {
    const Product = await ethers.getContractFactory("Product")
    // Start deployment, returning a promise that resolves to a contract object
    const product = await Product.deploy()
    await product.deployed();
    console.log("Contract deployed to address:", product.address)
    console.log(product);
    console.log(Product);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
