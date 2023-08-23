import express from 'express';
import {createUser, deleteUser, getLikedRestaurants, getUser, getUserById, getUserByName, getUserLikes, getUserOrders, getUserRatings, placeOrder, updateUser} from '../Controllers/userController.js'

const userRoutes = express.Router();

// R
userRoutes.get("/get-user", getUser);
userRoutes.get("/get-user-by-id/:id", getUserById);

//CUD
userRoutes.post("/create-user", createUser);
userRoutes.put("/update-user/:id", updateUser);
userRoutes.delete("/delete-user/:id", deleteUser);

userRoutes.get("/get-user-by-name/:fullName", getUserByName);

// Xử lý like nhà hàng
userRoutes.get('/liked-restaurants', getLikedRestaurants);
userRoutes.get('/:user_id/likes', getUserLikes);

// Xử lý đánh giá nhà hàng
userRoutes.get('/:user_id/ratings', getUserRatings);

// User đăt món
userRoutes.post('/order', placeOrder);
userRoutes.get('/:user_id/orders', getUserOrders);

export default userRoutes;
