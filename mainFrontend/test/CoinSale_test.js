const AgroCoin = artifacts.require("AgroCoin");
const CoinSale = artifacts.require("CoinSale");
const Wallet = artifacts.require("Wallet");

contract  ("CoinSale", (accounts)=>{
    it("should have deployer's balance as zero", async function () {
    
        let CoinInstance = await AgroCoin.deployed();
        
        let deployerBalance =await CoinInstance.balanceOf(accounts[0]);
        return assert.equal(deployerBalance,0);
      });
     it("should transfer all the tokens to coinsale contract",async ()=>{
        let coinInstance = await AgroCoin.deployed();
        let balanceOfCoinSale = await coinInstance.balanceOf(CoinSale.address);
        let totalSupply = await coinInstance.totalSupply();
        return assert.equal(balanceOfCoinSale.toNumber(),totalSupply.toNumber(),"tokens not transferred to coinsale contract");
     });
     it("costumers should be able to buy tokens",async()=>{
        
        //let accounts[1] is respective costumer to whom the tokens must be supplied 
        let coinInstance = await AgroCoin.deployed();
        let coinSaleInstance = await CoinSale.deployed();
        let walletInstance = await Wallet.deployed();

        let balanceofCustomerbeforePurchase = await coinInstance.balanceOf(accounts[1]);
        console.log("customer balance before purchase "+ balanceofCustomerbeforePurchase);
        let availabelTokensBefore = await coinInstance.balanceOf(CoinSale.address);
        console.log("available tokens for sale before purchase "+availabelTokensBefore);
        
        //costumer purchases the token
        let purchase = await coinSaleInstance.sendTransaction({from:accounts[1],value:2});
        
        console.log(purchase);

        //check the updated balances
        let balanceofCustomerAfterPurchase = await coinInstance.balanceOf(accounts[1]);
        console.log("customer balance after purchase "+ balanceofCustomerAfterPurchase);
        let availabelTokensAfter = await coinInstance.balanceOf(CoinSale.address);
        console.log("available tokens for sale after purchase "+availabelTokensAfter+"  ");
        let WalletBalance = await walletInstance.viewBalance();
        console.log("the wallet balance is "+ WalletBalance);        
        return assert.equal(balanceofCustomerAfterPurchase,2,"token not purchased");

         
     }) 
     it("should transfer cart amount to respective farmers",async()=>{
      let coinInstance = await AgroCoin.deployed();
      let coinSaleInstance = await CoinSale.deployed();
      let walletInstance = await Wallet.deployed();
      //let accounts[2] be the respective farmer to whom the ETH is to be transferred
      
      let transaction = await walletInstance.sendToFarmer(accounts[2],1,"potato");
      console.log(transaction);
      let WalletBalanceAfterTransfer = await walletInstance.viewBalance();
      console.log("the wallet balance is "+ WalletBalanceAfterTransfer); 
      let farmerBalance = await coinInstance.getBalanceof(accounts[2]);
      console.log("the farmer's balance in account is "+farmerBalance);
  }) 

})