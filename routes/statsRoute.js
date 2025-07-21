import express from 'express'
import { addStatsController, deleteStatController, getStatsController, updateStatController } from '../controllers/statsController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
const route = express.Router();

route.post('/',isAuthenticated, addStatsController);
route.get('/', getStatsController);
route.delete('/:id',isAuthenticated, deleteStatController)
route.put('/:id',isAuthenticated, updateStatController)
export default route;