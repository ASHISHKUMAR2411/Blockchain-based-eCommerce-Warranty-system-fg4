import { Card, makeStyles, Box, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { removeFromCart } from "../../actions/cartActions";
import { fassured } from "../../constants/data";
import GroupButton from "./GroupButton";
// import AlertDialogBox from "../AlertDialgBox";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



const useStyle = makeStyles({
  component: {
    borderTop: "1px solid #f0f0f0",
    borderRadius: 0,
    display: "flex",
    "&:hover": {
      cursor: "pointer",
      "& $itemTitle": {
        color: "#2874f0",
      },
    },
  },
  leftComponent: {
    margin: 20,
    display: "flex",
    flexDirection: "column",
  },
  itemTitle: {
    color: "#000",
  },
  image: {
    height: 110,
    width: 110,
    objectFit: "contain",
  },
  mid: {
    margin: 20,
  },
  greyTextColor: {
    color: "#878787",
  },
  smallText: {
    fontSize: 14,
  },
  price: {
    fontSize: 18,
    fontWeight: 600,
  },
  remove: {
    marginTop: 12,
    fontSize: 16,
  },
});

const CartItem = ({
  item,
  isAuthenticate,
  userInfo,
  updateCart,
}) => {
  const classes = useStyle();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const history = useNavigate();

  const dialogClose = () => {
    setIsOpenDialog(false);
  };

  const dialogOpen = () => {
    setIsOpenDialog(true);
  };

  const remove = (isAuthenticate, userInfo, item) => {
    removeFromCart(isAuthenticate, userInfo, item._id);
    updateCart();
    history("/cart");
  };

  return (
    <>
      <Card className={classes.component}>
        <Box className={classes.leftComponent}>
          <img src={item.url} className={classes.image} />
          <h1>{item.qty}</h1>
          <GroupButton product={item} />
        </Box>
        <Box className={classes.mid}>
          <Link to={`/product/${item._id}`}>
            <Typography className={classes.itemTitle}>
              {item.title.longTitle}
            </Typography>

            <Typography
              className={clsx(classes.greyTextColor, classes.smallText)}
              style={{ marginTop: 10 }}
            >
              Seller:RetailNet
              <span>
                <img src={fassured} style={{ height: 18, marginLeft: 10 }} />
              </span>
            </Typography>
            <Typography style={{ margin: "20px 0", color: "#000" }}>
              <span className={classes.price}>₹{item.price.cost}</span>
              &nbsp;&nbsp;&nbsp;
              <span className={classes.greyTextColor}>
                <strike>₹{item.price.mrp}</strike>
              </span>
              &nbsp;&nbsp;&nbsp;
              <span style={{ color: "#388E3C" }}>
                {item.price.discount} off
              </span>
            </Typography>
          </Link>
          <Button
            className={classes.remove}
            onClick={(event) => remove(isAuthenticate, userInfo, item)}
          >
            Remove
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default CartItem;
