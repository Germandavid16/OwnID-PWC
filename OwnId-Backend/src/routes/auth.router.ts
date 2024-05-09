import { Router, Request, Response } from 'express';
import {sign} from 'jsonwebtoken';
import {UserController} from "../controllers/user.contorller";
import {AppDataSource} from "../data-source";
import {User} from "../entity/user.entity";
const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Auth route api');
});

router.post('/', (req: Request, res: Response) => {
   return  res.send('Auth route api POST');
});


router.post('/setOwnIDDataByLoginId', async (req: Request, res: Response) => {
   console.log("=>(auth.router.ts:12) req.body", req.body);

    const email = req.body.loginId; //The unique id of
    // a user in your database, usually email or phone
    const ownIdData = req.body.ownIdData; //OwnID authentication information as string
    // const user = await User.findOne({ email: email }).exec();
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({where: {email: email}});

    if(user) {
        user.ownIdData = ownIdData;

        await userRepository.save(user)

        console.log("=>(auth.routes.ts:18) user", user);
        // await user.save();
        return res.sendStatus(204);
    }

    return res.sendStatus(404);

    // return res.sendStatus(204);
});


router.post('/getOwnIDDataByLoginId', async (req, res) => {
    console.log("=>(auth.router.ts:34) req.body", req.body);
    const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({where: {email: email}});

    console.log("=>(auth.router.ts:52) user", user);
    if (!user) { return res.json({ errorCode: 404 }) } //Error code when user doesn't exist

    res.json({ ownIdData: user.ownIdData }) //OwnID authentication information as string
});

router.post('/getSessionByLoginId', async (req, res) => {
    console.log("=>(auth.router.ts:45) req.body", req.body);
    const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where: {email: email}});
    if (!user) { return res.json({ errorCode: 404 }) } //Error code when user doesn't exist

    const jwt = sign({ email: user.email }, 'secret');
    return res.json({ token: jwt });
});

export default router;
