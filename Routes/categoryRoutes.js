import express from 'express'
import {requireSignIn} from '../Middlewares/authMiddleware.js'
import {createCategoryPOSTController, updateCategoryPUTController ,getAllCategoryGETController, getSingleCategoryGETController, deleteCategoryDELETEController} from '../Controllers/categoryController.js'
const router = express.Router();

router.post('/create-category', requireSignIn, createCategoryPOSTController)

router.put('/update-category/:id', requireSignIn,updateCategoryPUTController);

router.get('/categories', getAllCategoryGETController);

router.get('/single-category/:slug ', getSingleCategoryGETController);

router.delete('/delete-category/:id' ,deleteCategoryDELETEController);

export default router;