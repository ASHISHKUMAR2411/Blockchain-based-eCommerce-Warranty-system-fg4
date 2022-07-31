# Blockchain-based eCommerce warranty system using NFTs

The objective is to replace the physical warranty and have block chain based warranty using NFT which will ensure authenticity and security.

## Table of Contents  ✨✨
- [Getting Started](#getting-started)
	- [Installation](#installation)
- [Problem Statement](#problem-statement)
- [Use Cases](#use-cases)
- [Tech Stack and tools](#tech-stack-and-tools)
- [System Architecture](#system-architecture)
- [Development](#development)
    - [Part 1: Gathering Information](#part-1-gathering-information)
    - [Part 2: Planning](#part-2-planning)
	  - [Step 1: Backend](#step-1-backend)
	  - [Step 2: Frontend](#step-2-frontend)
	  - [Step 3: Smart-contract](#step-2-smart-contract)
- [Running the App](#running-the-app)
- [Authors](#authors)

## Getting Started "https://github.githubassets.com/images/icons/emoji/unicode/1f4ab.png?v8"
```
  FG4
  ├── backend
  │   ├──controllers
  │   ├──models
  │   ├──routes
  │   ├──smart-contract
  |   |		      ├──contracts
  |   |		      └──pinata
  │   └──app.js
  └── frontend
      └──src
      	 ├──actions.js
         ├──components
	 ├──pages
	 ├──index.js
	 └──app.js
```

### Installation 💫💫

In order to install this application, please follow the following steps carefully:

1. Download the code in your local system
2. Open VS Code and open the project directory
3. Now open the console and type 'cd backend' and hit enter.
4. You will move to the backend directory. There is the console type npm install and press enter
5. This command will install all of the necessary node modules in your project folder. (Make sure you have a node      installed in your system)
6. Do the same in the frontend folder in another console.
7. Now in the backend console type 'nodemon start' and start the server. In the frontend console type, 'npm start' and start the frontend.
8. Now open smart contracts -> contracts -> product.sol and then npx hardhat run --network rinkeby scripts/deploy.js in terminal.
9. Run npx hardhat run --network rinkeby scripts/deploy.js command.
10. You have successfully installed the project. 🎉🎉🎉

## Problem Statement 💖💖

As a part of this challenge, we were expected to build a blockchain-based eCommerce system (a web prototype) that will replace the physical warranty of the product with a digital version using Non-Fungible Tokens (NFTs) which will ensure the authenticity and security of the products.

## Use Cases 🤩🤩

* Prove Authenticity
  * When Customers buy any product then they will receive NFT that will store the data of the product and all details of the sender and its product like serial number and purchase history that helps to prove the authenticity of the product.

* Secured Transactions
  * For providing a secured environment we used the openzeppelin security library that helps.
  *  Pull Payment(avoid reentrancy attack) 
  *  Reentrancy Guard 
  *  Pausable
 
* Decaying NFT
  * The user will receive an NFT token in the form of a digital warranty card that will carry its warranty
    the period also and when the warranty gets over the NFT will automatically get removed.
    
* Seamless GUI
  *The prototype itself shows the seamless experience for both customer and seller. The seller can list their products and sell without having previous knowledge of Blockchain or Web3. We have also introduced a loyalty program to engage and retain customers. 
  
## Tech Stack and tools ❤️❤️
* React.js
* Node.js
* Express.js
* Solidity
* Web3.js
* Ethereum
* Hardhat
* Mongo dB
* Etherscan
* Material UI
* Alchemy
* OpenZepplin
* Remix
* OpenSea
* Pinata
* Metamask

## System Architecture 🧑‍💻🧑‍💻
![image](https://user-images.githubusercontent.com/77338386/182043722-586d221b-f238-45a8-82f9-e3d32dadd754.png)

## Development

The following section deals with the development process, walkthrough, and features of this project.

### Part 1: Gathering Information

* The most important task at this point is to get a clear understanding of our future website purposes, and the main goals wish to get.
* A well-described and detailed plan based on this pre-development data protected us from spending extra resources on solving unexpected issues such as design changing or adding functionality that wasn’t, initially planned.

### Part 2: Planning

* Based on the information that was gathered together in the previous phase, a map is created for the project

#### Step 1: Backend

* We first came up with the architecture of the backend i.e MVC architecture
* Now designing the database was the main step. We came up with the following tables
  * User
  * Product
  * Cart
  * Order
* We will discuss the fields of these tables later on
* Controllers contain the functions that will be called on requests. We have separated each file by its controller type i.e user-controller, product-controller, etc.
* Routes contain routes of different features. i.e user-routes, cart-routes, order-routes etc
  
#### Step 2: Frontend

* During the frontend design phase, our website took shape
* We came up with the design of the Flipkart website itself
* The Whole website was divided into components and those components were further divided so that we can reuse them.
* Basic pages like homepage, and login page product page was created first.
* Then more complex functionality like cart, order, and seller pages were added later on.

#### Step 3: Smart-contract

## Running the App 😎😎

### User ✨✨

![image](https://user-images.githubusercontent.com/82510045/182043924-012b05d1-0e97-4812-8852-eb8c8cf236f9.png)
![image](https://user-images.githubusercontent.com/82510045/182043952-5b49f19f-5e4b-4427-bf69-cee6641b8b2d.png)
![image](https://user-images.githubusercontent.com/82510045/182043971-6afd7d0b-8b7f-4195-9b4f-1c2bcdb5b773.png)
![image](https://user-images.githubusercontent.com/82510045/182043996-a80d47d2-6da1-42da-b616-6520657d0e2b.png)
![image](https://user-images.githubusercontent.com/82510045/182044019-72e19188-3362-43d5-9fdf-4dfd00ca4332.png)
![image](https://user-images.githubusercontent.com/82510045/182044131-71929d5c-9fdd-470d-9b3e-74b205f65493.png)

### Seller ✨✨

![image](https://user-images.githubusercontent.com/82510045/182044062-2a31fb9d-7d6f-42ea-871e-d0cf064c5c5e.png)
![image](https://user-images.githubusercontent.com/82510045/182044076-51375d2e-36e7-478f-b6e1-57aa5e19fb71.png)

### NFT Generated ✨✨

![image](https://user-images.githubusercontent.com/82510045/182044362-479e5950-d1b7-475c-bb77-d51dbebc1524.png)


## Authors 🎉🎉🎉

#### Anurag Sharma
* [GitHub](https://github.com/AnuragSharma122)
* [LinkedIn](https://www.linkedin.com/in/anurag-sharma-77212b203/)

#### Ashish Kumar
* [GitHub](https://github.com/ASHISHKUMAR2411)
* [LinkedIn](https://www.linkedin.com/in/ashish-kumar-3100b3201/)

#### Dev Agrawal
* [GitHub](https://github.com/DevAgrawal1112)
* [LinkedIn](https://www.linkedin.com/in/dev-agrawal-223b211bb/)

