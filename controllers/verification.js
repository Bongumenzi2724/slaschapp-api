const { NotFoundError } = require('../errors');
const Auction=require('../models/AuctionSchema');
const BusinessOwner=require('../models/BusinessOwnerRegistration');

const auctionVerification=async(req,res)=>{

    try {

        const{auctionID,userId}=req.body;

        const auction=await Auction.findOne({_id:auctionID});

        if(!auction){
            throw new NotFoundError(`No auction with id ${auctionID}`);
        }
        const auction_owner_id=(auction.createdBy).toString();
        console.log("True Or False");
        console.log(auction_owner_id===userId);

        if(auction_owner_id===userId){
            console.log("Successful Checkout");
            return res.status(200).json({message:"Authorized to checkout",status:true});
        }else{
            console.log("Unsuccessful Checkout");
            return res.status(404).json({message:"Not Authorized To checkout",status:false});
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports={auctionVerification}