const User=require('../models/UserRegistrationSchema')
const Auction=require('../models/AuctionSchema')
const Business=require('../models/BusinessRegistrationSchema')
const BusinessOwner=require('../models/BusinessOwnerRegistration')
const Bait = require('../models/BaitSchema');
const {StatusCodes}=require('http-status-codes')
const { create_category, get_all_categories } = require('./categories_controllers')
const { getAllUsersProfiles, deleteUserProfile, getUserProfile } = require('./feeds')
const { update_bait_plant } = require('./bait_plant_controllers')

const AllUsers=async(req,res)=>{
    const AllUsers=await User.aggregate([{$project:{password:0,resetToken:0,resetTokenExpiration:0,__v:0,wallet:0,AcceptTermsAndConditions:0,updatedAt:0}}])
    res.status(StatusCodes.OK).json({AllUsers:AllUsers,count:AllUsers.length});
}

const AllBusinessOwners=async(req,res)=>{
    const BusinessOwnersData=await BusinessOwner.aggregate([{$project:{password:0,__v:0,resetToken:0,resetTokenExpiration:0,IdDocumentLink:0,IdNumber:0,AcceptTermsAndConditions:0,updatedAt:0}}])
    res.status(StatusCodes.OK).json({BusinessOwnersData,count:BusinessOwnersData.length});
}

const AllBusiness=async(req,res)=>{
    const businesses=await Business.find({}).sort('createdAt')
    res.status(StatusCodes.OK).json({businesses,count:businesses.length});
}

const AllAuctions=async(req,res)=>{
    const auctionData=await Auction.find({}).sort('createdAt')
    res.status(StatusCodes.OK).json({auctionData,count:auctionData.length});
}

const AllBaitPlants=async(req,res)=>{
    try {
       const bait = await Bait.find({})
       return res.status(StatusCodes.OK).json(bait)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:error.message})
    }
}
module.exports={AllUsers,AllBaitPlants,AllBusiness,AllAuctions,AllBusinessOwners,get_all_categories,create_category,getAllUsersProfiles,deleteUserProfile,update_bait_plant,getUserProfile}