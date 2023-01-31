# AgroConnect

## Overview

Local farmers are always competing with global markets. The consumers are more eager to know what they are buying, from whom, when it has been produced, is it even fresh enough, or what production method has been used. Consumers would love to help producers like farmers, directly if they want to support what farmers do for the community by producing healthy food.This would also eliminate the middleman therefore increasing profits for both and would also fulfill the need of more transparency in the whole agro food industry and  supply chain process.

## Working

This will allow farmers to list their products with their prices. Customers have to first connect to their web3 wallet (metamask) so that all the purchases can be made. Consumers have to  purchase some Tokens (AgroCoins) from the app by paying some amount (in ETH) through his web3 wallet. He then can use those tokens to purchase any of the items listed on the app by adding them to cart and pay the total amount in tokens (AGC). Then this cart value (in tokens) of each product  will be converted to ETH and will be transferred directly to the respective farmer’s account from whom they have purchased that item.


## Technology Stack & Tools

- React.js (Frontend Framework)
- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- Djano (User Authentication)
- Firebase (Database)
- Truffle (Development Framework)
- Ethers.js (Blockchain Interaction)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)
- Install [Django] (https://www.djangoproject.com/start/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`  (inside '/Frontend' and inside '/Frontend/client')

`$ npm install dotenv`

`$ pip install djangorestframework`

`$ pip install djangorestframework-simplejwt`

`$ pip install django-cors-headers`

`$ pip install python-dotenv`

### 3. Run tests
`$ truffle test --network goerli_infura`

### 5. Run deployment script
`$ truffle migrate --network localhost`

### 7. Start frontend
`$ npm run start` (inside '/Frontend/client')

### 8. Start backend
`$ python manage.py runserver` (inside '/Backend')

## Farmer’s Corner

This app also contains a special section called Farmer’s corner, a section completely dedicated to Farmers with the vision of providing informative and educational content specifically related to Agriculture.


