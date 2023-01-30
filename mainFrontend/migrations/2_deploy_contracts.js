
const AgroCoin = artifacts.require("AgroCoin");
const CoinSale = artifacts.require("CoinSale");
const Wallet = artifacts.require("Wallet");

module.exports= async (deployer)=>{
    await deployer.deploy(AgroCoin,100000);
    await deployer.deploy(Wallet);
    await deployer.deploy(CoinSale,1,Wallet.address,AgroCoin.address);

    let AgroCoinInstance = await AgroCoin.deployed();
    await AgroCoinInstance.transfer(CoinSale.address,100000);
}