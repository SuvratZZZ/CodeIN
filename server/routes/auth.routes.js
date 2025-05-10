import {Router} from 'express';
import { check, login, logout, register } from '../controllers/auth.controllers';
import { authMid } from '../middleware/auth.middleware';

const router = Router();

router.post("/login",login);
router.post("/logout",authMid,logout);
router.post("/register",register);
router.post("/check",authMid,check);