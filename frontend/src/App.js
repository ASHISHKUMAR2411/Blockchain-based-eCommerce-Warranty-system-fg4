import {React, useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile, isDesktop, isTablet, deviceType,    } from 'react-device-detect';
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ProductPage from "./pages/ProductPage";
import AccountPage from "./pages/MyAccountsPage";
import CartPage from "./pages/CartPage";
import Header from "./components/header/Header";
import authentication from "./adapters/authentication";


//css
import "./App.css";


function App() { 
  
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [cartItems, setcartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({});
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
  
  useEffect(() => {
    if (!isAuthenticate) {
      authentication().then((res) => {
        setIsAuthenticate(res.isAuth);
        setUserInfo(res.user);
      });
    }
    // getCartItems(isAuthenticate, cartItems, userInfo).then((data) => {
    //   setcartItems(data);
    // });
    console.log(isUser);
  }, [userInfo,isAuthenticate]);

  // useEffect(() => {
  //   if(isAuthenticate){
      
  //   }
  // }, [userInfo, isAuthenticate]);
  

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
                    />
                  }
                />
                <Route
                  exact
                  path="/accounts"
                  element={
                    <AccountPage
                      isAuthenticate={isAuthenticate}
                      userInfo={userInfo}
                      updateIsAuthenticate={updateIsAuthenticate}
                      updateUserInfo={updateUserInfo}
                      cartItems={cartItems}
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
                      updateIsAuthenticate={updateIsAuthenticate}
                    />
                  }
                />
                <Route component={ErrorPage} />
              </Routes>
            </BrowserRouter>
          }
        </>
      ) : (
        <div className="container">
          <img className="img" src="/monitors-laptop.png" alt="Mobile Laptop" />
          <div className="text-container">
            <h2 className="heading">Please use Laptop or desktop</h2>
            <p className="para">
              We don't support small screen yet. Please use laptop or desktop
              for the best experience.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;