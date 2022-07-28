import * as actionType from "../action-type/productActionType";
import axios from "axios";

export const getProducts = async (key) => {
  try {
    const { data } = await axios.get(`/products/get-products-by-key/${key}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSellersProducts = async () => {
  try {
    const { data } = await axios.get("/products/get-products/");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`/products/get-product/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getProductsByCategory = async (name) => {
  try {
    const { data } = await axios.get(`/products/get-products/${name}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
