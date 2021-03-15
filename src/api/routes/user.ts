import { Router } from 'express';
import * as handler from '../controllers/user'

export const userRouter = Router();

userRouter.get('/',
    handler.userGet);

userRouter.get('/:id',
    handler.userGetId);

userRouter.post('/',
    handler.userPost);

userRouter.put('/:id',
    handler.userPut);

userRouter.patch('/:id',
    handler.userPatch);

userRouter.delete('/:id',
    handler.userDelete);