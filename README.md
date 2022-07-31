# Blockchain-based eCommerce warranty system using NFTs

The objective is to replace the physical warranty and have block chain based warranty using NFT which will ensure authenticity and security.

## Problem Statement

* Blockchain-based eCommerce warranty system using NFTs
  * As a part of this challenge, we were expected to build a blockchain-based eCommerce system (a web prototype)     that will replace the physical warranty of the product with a digital version using Non-Fungible Tokens         (NFTs) which will ensure the authenticity and security of the products.

## Use Cases

* Prove Authenticity
  * When Customer buy any product then they will receive NFT that will store the data of product and all details     of sender and its product like serial number and purchase history that helps to prove the authenticity of       the product.

* Secured Transactions
  * For providing secured environment we had used openzeppelin security library that helps to.
  *  Pull Payment(avoid reentrancy attack) 
  *  Reentrancy Guard 
  *  Pausable
 
* Decaying NFT
  * The user will receive an NFT token in the form of a digital warranty card that will carry its warranty
    period also and when the warranty gets over the NFT will automatically get removed.
    
* Seamless GUI
  *The prototype itself shows the seamless experience for both customer and seller. The seller can list their      products and sell without having previous knowledge of Blockchain or Web3. We have also introduced a loyalty    program to engage and retain customers. 
  
## Tech Stack and tools


## Table of Contents
- [Getting Started](#getting-started)
	- [Tech Stack](#tech-stack)
	- [Installation](#installation)
- [Development](#development)
    - [Part 1: Heading](#part-1-heading)
	  - [Step 1: Subheading](#step-1-subheading)
	  - [Step 2: Subheading](#step-2-subheading)
	- [Part 2: Heading](#part-2-heading)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

```
  FG4
  ├── Backend
  │   ├──controllers
  │   ├──models
  │   ├──node_modules
  │   ├──public
  │   ├──routes
  │   ├──smart-contract
  │   └──app.js
  └── frontend
      ├──node_modules
      ├──public
      ├──src
      └──.gitignore
```

### Tech Stack

//Tech Stack

### Installation

In order to install this application , follow the following steps carefully:

1. Download the code in your local system
2. Open VS Code and open the project directory
3. Now open console and type 'cd backend' and hit enter.
4. You will move in backend directory. There in console type npm install and press enter
5. This command will install all of the neccesary nodemodules in your project folder.(Make sure you have node      installed in your system)
6. Do the same in frontend folder in another console.
7. Now in bakend console type 'nodemon start' and start the server. In frontend console type 'npm start' and        start the frontend.
8. You have sucessfully installed the project.

## Development

The following section deals with the development process, walkthrough and features of this project.

### Gathering Information

* The most important task at this point is to get a clear understanding of our future website purposes, the main   goals wish to get.
* A well-described and detailed plan based on this pre-development data protected us from spending extra       resources on solving the unexpected issues such as design changing or adding the functionality that wasn’t,     initially planned.

### Planning

* Based on the information that was gathered together in the previous phase, a map is created fro the project

#### Step 1: Backend

* We first came up with architecture of backend i.e MVC architecture
* Now desiging the database was main step. We came up with following tables
  * User
  * Product
  * Cart
  * Order
* We will discuss the fields of these tables later on
* Controllers contains the functions that will be called on requests. We have separated each file by its           controller tpye i.e user-controller, product-controller etc.
* Routes contains routes of different features. i.e user-routes, cart-routes, order-routes etc
  
#### Step 2: Frontend

* During the frontend design phase, our website took shape
* We came up with the design of flipkart website itself
* Whole website was divided in componenets and those components were further divided so that we can reuse them.
* Basic pages like homepage, login page product page were created first.
* Then more complex functionlity like cart, order, seller page were added later on.

#### Step 3: Smart-contract

### Part 2: Features

* We will discuss key features of this website


## Running the App

Steps and commands for running the app are to be included here

* Example steps:
  ```
    Example command
  ```

## Authors

#### Anurag 
* [GitHub]
* [LinkedIn]

You can also see the complete [list of contributors][contributors] who participated in this project.

## License

`Project Title` is open source software [licensed as MIT][license].

## Acknowledgments

This section can also be called as `Resources` or `References`

* Code Honor if someone's work was referred to
* Tutorials followed
* Articles that helped
* Inspiration
* etc

[//]: # (HyperLinks)

[GitHub Repository]: https://github.com/madhur-taneja/README-Template
[GitHub Pages]: https://madhur-taneja.github.io/README-Template
[CONTRIBUTING.md]: https://github.com/madhur-taneja/README-template/blob/master/CONTRIBUTING.md
[tags]: https://github.com/madhur-taneja/README-template/tags

[GitHub]: https://github.com/madhur-taneja
[LinkedIn]: https://www.linkedin.com/in/madhur-taneja/

[contributors]: https://github.com/madhur-taneja/README-template/contributors
[license]: https://github.com/madhur-taneja/README-template/blob/master/LICENSE.md
