import express from 'express';
import { findFood, getFood } from '../Controllers/foodController.js';

const foodRoutes = express.Router();

foodRoutes.get("/get-food", getFood);
foodRoutes.get("/find-food", findFood);


export default foodRoutes;