import {Router} from 'express';
import { authMid } from '../middleware/auth.middleware.js';
import { executeCode } from '../controllers/executeCode.controller.js';

const router = Router(); 

router.route("/")
.post(authMid , executeCode)




export default router;