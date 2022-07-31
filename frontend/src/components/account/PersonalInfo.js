import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import toastMessage from "../../utils/toastMessage";

// import { makeCapitalizeText } from "../../utils/makeCapitalizeText";

    const useStyles = makeStyles((theme) => ({
    component: {
        padding: "30px 40px 0 40px",
    },
    form: {
        display: "flex",
        alignItems: "flex-start",
        margin: "10px 0",
    },
    saveBtn: {
        width: "150px",
        padding: "12px",
        color: "rgb(255, 255, 255)",
        borderRadius: "3px",
        fontSize: "16px",
        boxShadow: "none",
    },
    input: {
        width: "270px",
        fontSize: "14px",
        outline: "none",
        borderRadius: "2px",
        boxShadow: "none",
        marginRight: 10,
    },
    title: {
        fontSize: "18px",
        fontWeight: 600,
        paddingRight: "24px",
        display: "inline-block",
    },
    editLink: {
        display: "inline-block",
        fontSize: "14px",
        fontWeight: 500,
        color: "#2874f0",
        cursor: "pointer",
    },
    }));

function PersonalInfo({userInfo,walletAddress}) {
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [values, setValues] = useState({
    shortTitle: null,
    longTitle: null,
    mrp: null,
    cost: null,
    discount: null,
    category: null,
    tagline: null,
    img: null,
    waranty:null,
  });
  const [errors, setErrors] = useState({
    shortTitle: false,
    longTitle: false,
    mrp: false,
    cost: false,
    discount: false,
    category: false,
    tagline: false,
    img: false,
    waranty: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    shortTitle: "",
    longTitle: "",
    mrp: "",
    cost: "",
    discount: "",
    category: "",
    tagline: "",
    img: "",
    waranty: "",
  });

//   //hooks
  const classes = useStyles();

//   //Save Counter
  const [saveProduct, setSaveProduct] = useState(0);

  useEffect(() => {
      if (
        values.shortTitle != null &&
        values.longTitle != null &&
        values.mrp != null &&
        values.cost != null &&
        values.discount != null &&
        values.category != null &&
        values.tagline != null &&
        values.waranty != null
      ) {
        // const formData = new FormData();
        // formData.append("file", values.img);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        axios
          .post(
            "/products/add-products",
            {
              title: {
                shortTitle: values.shortTitle,
                longTitle: values.longTitle,
              },
              price: {
                mrp: values.mrp,
                cost: values.cost,
                discount: values.discount,
              },
              qty: values.qty,
              category: values.category,
              tagline: values.tagline,
              sellerWalletAddress: walletAddress,
              file: values.img,
              waranty: values.waranty,
            },
            config
          )
          .then(() => {
            toastMessage("Product Added !", "success");
            setValues({ shortTitle: null });
          })
          .catch((e) => {
            toastMessage("Something went wrong.", "error");
          });
        setIsEditProduct(false);
      } else {
        toastMessage("Please fill all the fields", "error");
      }
  }, [saveProduct]);

//   //reg for name

  const regName = /^[a-zA-Z]+$/;
  const regEmail =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const regPrice = /^[0-9]/;

  const validateField = (name, fieldName) => {
    if (name === "") {
      return {
        isError: true,
        errorMsg: `${fieldName} can not be empty`,
      };
    } else if (name.length < 3) {
      return {
        isError: true,
        errorMsg: "Minimum 3 charterers required",
      };
    } else if (name.length > 50) {
      return {
        isError: true,
        errorMsg: "Maximum 20 charterers allowed",
      };
    } else if (!regName.test(name)) {
      return {
        isError: true,
        errorMsg: `Invalid ${fieldName}`,
      };
    } else {
      return {
        isError: false,
        errorMsg: "",
      };
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeimg = (e) => {
    setValues({ ...values, [e.target.name]: e.target.files[0] });
  };

  const savePersonalInfo = () => {
    // const validatedShortTitle = validateField(values.title.shortTitle, "First Name");
    // const validatedLongTitle = validateField(
    //   values.title.longTitle,
    //   "Last Name"
    // );
    // const validatedCategory = validateField(values.category, "Last Name");
    // const validatedTagline = validateField(values.tagline, "Last Name");

    //Set Error
    // setErrorMsg({
    //   ...errorMsg,
    //   title: {
    //     shortTitle: validatedShortTitle.errorMsg,
    //     longTitle: validatedLongTitle.errorMsg,
    //   },
    //   category: validatedCategory.errorMsg,
    //   tagline: validatedTagline.errorMsg,
    // });

    // setErrors({
    //   ...errors,
    //   title: {
    //     shortTitle: validatedShortTitle.isError,
    //     longTitle: validatedLongTitle.isError,
    //   },
    //   category: validatedCategory.isError,
    //   tagline: validatedTagline.isError,
    // });
    setSaveProduct((cnt) => cnt + 1);
    //     //checkout useEffect
  };

  return (
    <>
      <Box className={classes.component}>
        <FormControl component="fieldset" enctype="multipart/form-data">
          <Typography className={classes.title}>Title</Typography>
          <Box className={classes.form}>
            <TextField
              label="Short Title"
              placeholder="Short Title"
              variant="outlined"
              className={classes.input}
              // value={values.fname}
              name="shortTitle"
              onChange={handleChange}
              // error={errors.fname}
              // helperText={errors.fname && `${errorMsg.title.shortTitle}`}
            />
            <TextField
              label="Long Title"
              placeholder="Long Title"
              variant="outlined"
              className={classes.input}
              // value={values.fname}
              name="longTitle"
              onChange={handleChange}
              // error={errors.fname}
              // helperText={errors.fname && `${errorMsg.title.longTitle}`}
            />
          </Box>
          <Typography className={classes.title} style={{ marginTop: 50 }}>
            Price
          </Typography>
          <Box className={classes.form}>
            <TextField
              label="MRP in INR"
              placeholder="MRP"
              variant="outlined"
              className={classes.input}
              // value={values.fname}
              name="mrp"
              onChange={handleChange}
              // error={errors.fname}
              // helperText={errors.fname && `${errorMsg.title.longTitle}`}
            />
            <TextField
              label="Cost in Ether"
              placeholder="Cost"
              variant="outlined"
              className={classes.input}
              // value={values.fname}
              name="cost"
              onChange={handleChange}
              // error={errors.fname}
              // helperText={errors.fname && `${errorMsg.title.longTitle}`}
            />
            <TextField
              label="Discount (in INR)"
              placeholder="Discount"
              variant="outlined"
              className={classes.input}
              // value={values.fname}
              name="discount"
              onChange={handleChange}
              // error={errors.fname}
              // helperText={errors.fname && `${errorMsg.title.longTitle}`}
            />
          </Box>
          <Typography className={classes.title} style={{ marginTop: 50 }}>
            Other details
          </Typography>
          <Box className={classes.form}>
            <TextField
              label="Image"
              variant="outlined"
              placeholder=""
              className={classes.input}
              // value={values.fname}
              name="img"
              onChange={handleChangeimg}
              type="file"
              // error={errors.fname}
              // helperText={errors.fname && `${errorMsg.title.longTitle}`}
            />
            <TextField
              label="Category"
              placeholder="Category"
              variant="outlined"
              className={classes.input}
              // value={values.fname}
              name="category"
              onChange={handleChange}
              // error={errors.fname}
              // helperText={errors.fname && `${errorMsg.title.longTitle}`}
            />
            <TextField
              label="Tagline"
              placeholder="Tagline"
              variant="outlined"
              className={classes.input}
              // value={values.fname}
              name="tagline"
              onChange={handleChange}
              // error={errors.fname}
              // helperText={errors.fname && `${errorMsg.title.longTitle}`}
            />
            <br/>
            <TextField
              label="Waranty (in month)"
              placeholder="Waranty"
              variant="outlined"
              className={classes.input}
              // value={values.fname}
              name="waranty"
              onChange={handleChange}
              // error={errors.fname}
              // helperText={errors.fname && `${errorMsg.title.longTitle}`}
            />
          </Box>

          <br />

          <br />
          <Button
            variant="contained"
            className={classes.saveBtn}
            style={{ background: "#2874f0" }}
            onClick={savePersonalInfo}
          >
            SAVE
          </Button>
        </FormControl>
      </Box>
    </>
  );
}

export default PersonalInfo;
