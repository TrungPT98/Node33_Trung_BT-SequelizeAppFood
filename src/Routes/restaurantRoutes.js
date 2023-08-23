import express from 'express';
import { getAllRatedRestaurants, likeRestaurant, rateRestaurant } from '../Controllers/restaurantController.js';


const restaurantRoutes = express.Router();

// Xử lý like nhà hàng
restaurantRoutes.post("/like", likeRestaurant);

// Xử lý đánh giá nhà hàng
restaurantRoutes.post('/rate', rateRestaurant);
restaurantRoutes.get('/rated-restaurants', getAllRatedRestaurants);

export default restaurantRoutes;
