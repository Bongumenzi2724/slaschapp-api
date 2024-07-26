const express=require('express');
const router=express.Router()
const { getAllPastOrders,updateUserProfile,activateUserProfile,get_user_profile,deleteUserProfile,suspendUserProfile, userWalletUpdate, user_completed_cart } = require('../controllers/user_profile');

router.get('/user/history',getAllPastOrders);

router.get('/user/:id',get_user_profile);

router.get('/user/complete/cart',user_completed_cart);

router.patch('/user/delete/:id',deleteUserProfile);

router.patch('/user/suspend/:id',suspendUserProfile);

router.patch('/user/wallet',userWalletUpdate);

router.patch('/user/update/:id',updateUserProfile)

router.patch('/user/status/profile',activateUserProfile);

module.exports=router;