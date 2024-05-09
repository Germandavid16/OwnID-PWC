import { Router, Request, Response } from 'express';
import {UserController} from "../controllers/user.contorller";
const router = Router();

router.post('/signup', UserController.signup);
router.get('/', async (req, res, next) => {
    const u = await UserController.getUserByEmail('alekseyideas@gmail.com');
    res.json({u})
});


export default router;

