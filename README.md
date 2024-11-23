## Overview 📰

This repository is designed to build a simple, user-friendly, and functional interface to interact with a blockchain network. . The app facilitates:
- Connect to Sui blockchain
- Make a transfer Sui token transaction
- Change the network (testnet - mainnet)
- View transfer history

***🌈Demo: [https://frontend-assignment-one-self.vercel.app/](https://frontend-assignment-one-self.vercel.app/)

## Technical
- Nextjs14
- Sui typescript SDK
- TailwindCss
- Suiet/wallet-kit

## Get started

***Setup Project***
- Clone this repo:
  ```bash
   git clone https://github.com/tranvanhai0504/frontend-assignment.git
  ```
- Move to project
  ```bash
  cd blockchain-intergration
  ```
- Install dependencies (use --fore to overwrite the conflict code on Sui sdk):
  ```bash
   npm i --force
  ```
- Run project on your local:
   ```bash
  npm run dev
  ```

***⚠️ Switch your wallet network***

You must switch your network on your wallet to make sure that the network (application and wallet) matching and the transaction will be sign successfull:
- On Sui Wallet: Click on the ⚙️ icon on the top right corner and change network.
- On Suiet: Click on network name on top right corner and change network

![62_1x_shots_so](https://github.com/user-attachments/assets/52d709fb-9482-4db8-9096-fd78e9eca39f)
