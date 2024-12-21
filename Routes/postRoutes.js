import express from 'express'
import {requireSignIn} from '../Middlewares/authMiddleware.js'
import { createPostPOSTController, getAllPostGETController, getAllPostPhotoGETController , getSinglePostPhotoPOSTController  ,getYourPostGETController  , getPostDELETEControllere, getSinglePostGETController, updatePostPUTController } from '../Controllers/PostController.js';
import formiddable from 'express-formidable'


const router= express.Router();

//router
router.post('/create-post',requireSignIn,formiddable(),createPostPOSTController);

router.get('/all-posts',  getAllPostGETController);

router.get('/posts/:_id', getSinglePostGETController);

router.get('/post-photo/:pid', getAllPostPhotoGETController);

router.delete('/delete-post/:pid',getPostDELETEControllere);

router.get('/singlePost-photo/:id', getSinglePostPhotoPOSTController)

router.put('/update-post/:pid',requireSignIn,formiddable(),updatePostPUTController);

router.get('/your-post/:id',requireSignIn, getYourPostGETController )



export default router;