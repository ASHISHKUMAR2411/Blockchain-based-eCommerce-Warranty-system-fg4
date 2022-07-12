import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile, isDesktop, isTablet, deviceType,    } from 'react-device-detect';
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/header/Header";
//css
import "./App.css";


function App() { 
  return (
    <div className="app">
      
      {isDesktop ? (
        <>
         <Header />
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<HomePage/>} />
              <Route element={ErrorPage} />
            </Routes>
          </BrowserRouter>
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