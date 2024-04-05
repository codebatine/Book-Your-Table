// import hre from 'hardhat';
// const { ethers } = hre;

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   console.log('Deploying contracts with the account', deployer.address);
//   const RestaurantsContract = await ethers.getContractFactory('Restaurants');
//   const deployed = await RestaurantsContract.deploy();

//   console.log(deployed);

//   await deployed.deployed();

//   console.log('Restaurants contract deployed to:', deployed.address);
// }

// main().catch((error) => {
//   console.error(error);
// });

const hre = require('hardhat');
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account', deployer.address);
  const RestaurantsContract = await ethers.getContractFactory('Restaurants');
  const deployed = await RestaurantsContract.deploy();

  console.log(deployed);

  console.log('Restaurants contract deployed to:', deployed.address);
}

main().catch((error) => {
  console.error(error);
});
