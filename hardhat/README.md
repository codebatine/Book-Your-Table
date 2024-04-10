# How to setup a hardhat local node and deploy the contract.

1. First install hardhat, Open up a new Terminal make sure you are inside hardhat directory:
   `npm install hardhat`

2. Spin up a local chain:
   `npx hardhat node`

3. Deploy the solidity smartcontract to the local chain
   `npx hardhat run --network localhost ignition/deploy.js `

4. Connect your Metamask wallet to the local chain:

Add a network to you Metamask and paste in these details

Network name:
`Hardhat chain `
New RPC URL:
`http://127.0.0.1:8545/ `
Chain ID:
`31337 `
Currency symbol
`hETH`
