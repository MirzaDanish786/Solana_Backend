import express from 'express'
import upload from '../middlewares/uploads.js';
import { addSliderController, deleteSliderController, getSliderController, updateSliderController } from '../controllers/sliderController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
const route = express.Router();

route.post('/', isAuthenticated, upload.single('image'), addSliderController);
route.get('/',getSliderController);
route.put('/:id', isAuthenticated, upload.single('image'), updateSliderController)
route.delete('/:id',isAuthenticated, deleteSliderController)
export default route;