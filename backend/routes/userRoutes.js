import express from "express";

const router = express.Router();

import {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile,getUsers,
    deleteUser,getUserById,updateUser} from '../controllers/userController.js';

import { protect,admin } from "../middleware/authMiddleware.js";

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').get(protect,admin,getUserById).delete(protect,admin,deleteUser).put(protect,admin,updateUser);

export default router;