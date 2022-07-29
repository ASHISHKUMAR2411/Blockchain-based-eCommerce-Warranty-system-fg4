import React, { useEffect, useState } from "react";
import axios from "axios";
// import getSellersProducts from "../actions/productActions";
import { getSellersProducts } from "../../actions/productActions";
import {
  makeStyles,
  InputBase,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  component: {
    padding: "30px 40px 0 40px",
  },
  listItem: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#F0F6FF",
    },
    color: "#000",
  },
  listText: {
    margin: "0px 10px",
    color: "#000",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  productAvatar: {
    width: 75,
    height: 75,
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      width: 50,
      height: 50,
    },
  },
}));

function ProductList() {
const classes = useStyles();
const [products, setproducts] = useState([])
  useEffect(() => {
      getSellersProducts().then((data)=>{
        setproducts(data);
      })
  }, [])
  return (
    <>
      <Box className={classes.component}>
        <h1>Product List</h1>
        {/* {products.title.longTitle}    */}
        <List>
          {products.map((product) => {
            return (
              <ListItem className={classes.listItem}>
                <ListItemAvatar className={classes.listAvatar}>
                  <img className={classes.productAvatar} src={product.img} />
                  {console.log(product.img)}
                </ListItemAvatar>
                <ListItemText>
                  <Typography className={classes.listText}>
                    <h4>{product.title.shortTitle}</h4>
                    {product.title.longTitle} <br />
                    Mrp {product.price.mrp}
                    <br />
                    Cost {product.price.cost}
                    <br />
                    Discount {product.price.discount}
                    <br />
                    Quantity {product.qty}
                  </Typography>
                </ListItemText>
              </ListItem>
            );
          }
          )}
        </List>
      </Box>
    </>
  );
}

export default ProductList;
