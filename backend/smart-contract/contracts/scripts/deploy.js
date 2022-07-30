async function main() {
    const Product = await ethers.getContractFactory("Product")

    // Start deployment, returning a promise that resolves to a contract object
    const product = await Product.deploy()
    await product.deployed();
    console.log("Contract deployed to address:", product.address)
}

// 0x271Dd0f273E65013f023390882c0b64582Ae0451
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
