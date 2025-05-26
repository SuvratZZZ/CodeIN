import {Router} from 'express';
import { authMid } from '../middleware/auth.middleware.js';
import { executeCode , runCode } from '../controllers/executeCode.controller.js';

const router = Router(); 

router.route("/")
.post(authMid , executeCode)

router.route("/run-code")
.post(authMid , runCode)


export default router;