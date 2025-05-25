import {Router} from 'express';
import { check, login, logout, register, googleLogin } from '../controllers/auth.controllers.js';
import { authMid } from '../middleware/auth.middleware.js';

const router = Router();

router.post("/login",login);
router.post("/logout",authMid,logout);
router.post("/register",register);
router.get("/check",authMid,check);
router.post("/google",googleLogin);

export default router;
