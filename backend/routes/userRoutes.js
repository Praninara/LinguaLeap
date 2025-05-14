// import express from 'express';
// import {
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
//   deleteUser,
//   updateUserXP,
//   getUserXP,
// } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';
//
// const router = express.Router();
//
// router.post('/', registerUser);
// router.post('/auth', authUser);
// router.post('/logout', logoutUser);
// router.route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router.delete('/:id', protect, deleteUser);
// router.post('/:name/addXP', updateUserXP);
// router.get('/:name/totalXP', getUserXP);
//
// export default router;
import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateUserXP,
  getUserXP,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);  // BACKEND_URL + '/users'
router.post('/auth', authUser);          // BACKEND_URL + '/users/auth'
router.post('/logout', logoutUser);      // BACKEND_URL + '/logout'

// Protected routes
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.delete('/:id', protect, deleteUser);

// XP routes
router.post('/:name/addXP', updateUserXP);    // BACKEND_URL + `/users/${user.name}/addXP`
router.get('/:name/totalXP', getUserXP);      // For leaderboard/profile XP updates

export default router;