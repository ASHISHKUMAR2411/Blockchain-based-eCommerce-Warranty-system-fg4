import {React, useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile, isDesktop, isTablet, deviceType,    } from 'react-device-detect';
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ProductPage from "./pages/ProductPage";
import AccountPage from "./pages/MyAccountsPage";
import SellersPage from "./pages/SellersPage";
import PersonalInfo from "./components/account/PersonalInfo";
import GamePage from "./pages/GamePage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import Header from "./components/header/Header";
import authentication from "./adapters/authentication";
import { getCartItems } from "./actions/cartActions";
import toastMessage from "./utils/toastMessage";
import ToastMessageContainer from "./components/ToastMessageContainer";
import { ethers } from "ethers";
//css
import "./App.css";
function App() { 
  
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [cartItems, setcartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [cartLength, setCartLength] = useState(0);
  const [walletAddress, setWallet] = useState("");
  const [walletBalance, setWalletBalance] = useState(null);

  function updateIsAuthenticate(value) {
    setIsAuthenticate(value);
  }
  function updateCartItems(value) {
    setcartItems(value);
  }
  function updateUserInfo(value) {
    setUserInfo(value);
  }
  function updateIsUser(value) {
    setIsUser(value);
  }
  function updateCartLength(value) {
    setCartLength(value);
  }

  const updateCart = () => {
    getCartItems(isAuthenticate, cartItems, userInfo).then((data) => {
      updateCartItems(data);
      setCartLength(data.length);
    });
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if(addressArray.length >0){
          return {
          address: addressArray[0],
          status: true
        };
        }else{
          return {
          address: "",
          status: false
        };
        }
      } catch (err) {
          alert(err)
      }
    } else {
      toastMessage("install metamask extension!!");
    }
  }

   const getbalance = (address) => {
     // Requesting balance method
     window.ethereum
       .request({
         method: "eth_getBalance",
         params: [address, "latest"],
       })
       .then((balance) => {
           setWalletBalance(ethers.utils.formatEther(balance));
       });
   };
  
  useEffect(() => {
    connectWallet().then((data)=>{
      if(data.status == true){
        setWallet(data.address);
        getbalance(data.address);
      }else{
        toastMessage("Create Metamask account first!!");
      }
    })
    if (!isAuthenticate) {
      authentication().then((res) => {
        if(res.role == "user"){
          setIsUser(true);
        }else{
          setIsUser(false);
        }
        setIsAuthenticate(res.isAuth);
        setUserInfo(res.user);
      });
    }
  }, [userInfo,isAuthenticate]);

  return (
    <div className="app">
      {isUser ? (
        <>
          {
            <BrowserRouter>
              <Header
                updateIsAuthenticate={updateIsAuthenticate}
                isAuthenticate={isAuthenticate}
                updateUserInfo={updateUserInfo}
                cartItems={cartItems}
                updateIsUser={updateIsUser}
                userInfo={userInfo}
                updateCartItems={updateCartItems}
                cartLength={cartLength}
                updateCartLength={updateCartLength}
                walletAddress={walletAddress}
              />

              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route
                  exact
                  path="/product/:id"
                  element={
                    <ProductPage
                      isAuthenticate={isAuthenticate}
                      user={userInfo}
                      cartItems={cartItems}
                      updateCart={updateCart}
                    />
                  }
                />
                <Route
                  exact
                  path="/cart"
                  element={
                    <CartPage
                      isAuthenticate={isAuthenticate}
                      cartItems={cartItems}
                      userInfo={userInfo}
                      updateCart={updateCart}
                      walletAddress={walletAddress}
                      walletBalance={walletBalance}
                    />
                  }
                />
                <Route
                  exact
                  path="/games"
                  element={
                    <GamePage
                    // isAuthenticate={isAuthenticate}
                    // cartItems={cartItems}
                    // userInfo={userInfo}
                    // updateCart={updateCart}
                    />
                  }
                />
                <Route
                  exact
                  path="/orders"
                  element={
                    <OrdersPage
                      isAuthenticate={isAuthenticate}
                      userInfo={userInfo}
                    />
                  }
                />
                <Route component={ErrorPage} />
              </Routes>
            </BrowserRouter>
          }
        </>
      ) : (
        <div className="con">
          <BrowserRouter>
            <Routes>
              <Route
                exact
                path="/*"
                element={
                  <SellersPage
                    userInfo={userInfo}
                    updateUserInfo={updateUserInfo}
                    updateIsAuthenticate={updateIsAuthenticate}
                    walletAddress={walletAddress}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      )}
      <ToastMessageContainer />
    </div>
  );
}

export default App;