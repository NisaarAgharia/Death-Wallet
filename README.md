# `Death-Wallet`

> A Product that secures your crypto assets by giving you an option to choose Nominee of your assets and NFTs in case of any unlikely events like Death or Lost Wallet

🚀DEMO: https://death-wallet.netlify.app/

This project is aimed to solve the problem of Loss of Crypto assets and NFTs due to unlikely events like death and Lost Wallet.
Users will be asked to register for Death Wallet Service, where they can add Nominee Addresses and inactivity time frame of users' addresses.
Nominee Address:- where the Crypto assets should go in case of an unlikely event.
Inactivity Timeframe:- Timeframe of inactivity on address selected by user eg. 1 year, 5 years, etc.

In the case of Unlikely events, the user's crypto-assets can be transferred to its Nominee Addresses.
This Application is built on [react-moralis](https://github.com/MoralisWeb3/react-moralis) and [Moralis](https://moralis.io?utm_source=github&utm_medium=readme&utm_campaign=ethereum-boilerplate). Also has its own context provider for quick access to `chainId` or `ethAddress`

There are many components in this boilerplate that do not require an active web3 provider, they use Moralis Web3 API. Moralis supports the most popular blockchains and their test networks. You can find a list of all available networks in [Moralis Supported Chains](https://docs.moralis.io/moralis-server/web3-sdk/intro#supported-chains)

Please check the [official documentation of Moralis](https://docs.moralis.io/#user) for all the functionalities of Moralis.

![Death_Wallet_Home](https://user-images.githubusercontent.com/22457544/152706881-3cf47fe8-21c9-43a2-a239-a1e8cdc189c0.PNG)
![Secure_Tokens](https://user-images.githubusercontent.com/22457544/152706884-5a24c77a-eb1b-4b01-87ad-18f5ae9999ab.PNG)
![Secure_NFT](https://user-images.githubusercontent.com/22457544/152706886-d420a9e1-2876-4db6-860c-67bd43c1b90a.PNG)

![daPPdemo](https://user-images.githubusercontent.com/78314301/147088732-e8bbd451-9351-4338-879c-b1535f4df319.gif)

# ⭐️ `Star us`
If this boilerplate helps you build Ethereum dapps faster - please star this project, every star makes us very happy!

# 🤝 `Need help?`
If you need help with setting up the boilerplate or have other question
s - don't hesitate to write in our community forum and we will check asap. [Forum link](https://forum.moralis.io/t/ethereum-boilerplate-questions/3951/86). The best thing about this boilerplate is the super active community ready to help at any time! We help each other.



# 🚀 Application Flow - 
During Registration Operator account is given allowance/access to the Users Tokens & NFTs.
(By Updating ERC-20, ERC721 Smart contracts for all tokens/NFTs)
When User gets Inactive i.e. (No Transaction for more than 1 or 5 years)
Moralis Cloud Job Runs and Sends inactive address to Operator for settlement.
The operator then Approves the Transaction and Send the Crypto assets to the Nominee Address
Nominee Now has the assets of the User.

FrontEnd - 
Web Application made with React, JavaScript, and Moralis Web3 SDK
Web App lets Users register Nominee in case of Unlikely Events, User can Secure ERC-20 Tokens and ERC-721 Token

Backend- 
Smart contracts - ERC 20, ERC 721
Backend made with Moralis Web3, Using Cloud Functions and Cloud Job for Batch processing
The validation service will check for addresses for which the inactivity time frame has been breached.
The Settlement service will transfer assets from the user address to the Nominee address.




