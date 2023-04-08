const GoldenBadge = artifacts.require("GoldenBadge");
const SilverBadge = artifacts.require("SilverBadge");
const BronzeBadge = artifacts.require("BronzeBadge");
const BadgeDelivery = artifacts.require("BadgeDelivery");

contract ("GoldenBadge",async(accounts)=>{
    let  badges;
    // We use this beforeEach to test exclusively the working of MyToken contract without crowdsale contract 
    // To do this we just need to deploy MyToken but in the migrations we've added both the contracts
    // So beforeEach function is used so that only this is deployed so that it can be tested exclusively.
  
    beforeEach( async()=>{
    badges = await GoldenBadge.new(1000,"Golden Badge","GLD");
    badgeDelivery = await BadgeDelivery.new(); 
  })

    it("should add all tokens in my account1", async function () {
        const badgeInstance = badges;
        console.log(await badgeInstance.totalSupply());
        let totalSupply = await badgeInstance.totalSupply();
        let balance = await badgeInstance.balanceOf(accounts[0]);
       
        
        assert.equal(totalSupply,1000,"not equal totalSupply");
        assert.equal(balance,1000,"not equal balance");
        assert.equal(totalSupply.toNumber(),balance.toNumber(),"not equal total supply and balance");
      });
      it("should be able to deliver badges",async ()=>{
        const badgeInstance =badges;
        await badgeInstance.transfer(accounts[1],100);
        
        let balance1 = await badgeInstance.balanceOf(accounts[1]);
        let balance = await badgeInstance.balanceOf(accounts[0]);
        assert.equal(balance1,100,"not equal");
        assert.equal(balance,900,"not equal ");
        //console.log("the balance in account 1 is now "+balance1+ " and that in account 0 is "+ balance);
      });
      it("should be able to approve contract to deliver tokens and deliver tokens",async ()=>{
        const badgeInstance =badges;
        const badgeDeliveryInstance = badgeDelivery;
        await badgeInstance.approve(accounts[1],1000);
        let balance = await badgeInstance.balanceOf(accounts[1]);
        console.log(balance.toNumber());
        let value = await badgeInstance.allowance(accounts[0],accounts[1]);
        assert.equal(value,1000,"account 2 is not approved");

        let tx = await badgeDeliveryInstance.deliverGoldenBadge(GoldenBadge.address,{from:accounts[1]});

        let balance2 = await badgeInstance.balanceOf(accounts[1]);
        console.log(balance2.toNumber());
        //assert.equal(balance,1,"account 2 was not able to get badge");
        // assert.equal(balance,900,"not equal ");
        //console.log("the balance in account 1 is now "+balance1+ " and that in account 0 is "+ balance);
      });
  })