import express from 'express'
import { registerPOSTController ,loginPOSTController, testGETController} from '../Controllers/authController.js';
import {isAdmin, requireSignIn} from'../Middlewares/authMiddleware.js'

const router = express.Router();

//Register POST
// router.get('/test',requireSignIn,isAdmin, testGETController)
router.post('/register',registerPOSTController);
router.post('/login', loginPOSTController);

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})



export default router;