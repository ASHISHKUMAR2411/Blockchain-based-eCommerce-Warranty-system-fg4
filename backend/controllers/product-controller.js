const Product = require("../models/productSchema");

const getProducts = async (req, res) => {
  try {
    const result = await Product.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addProducts = async (req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ code: 201, productAdded: true });
    }catch(error){
        console.log(error);
        res
          .status(400)
          .json({ code: 400, message: "invalid data or invalid syntax" });
    }
}

module.exports ={
  getProducts,
  addProducts,
};

