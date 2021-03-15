import { Response, Request } from 'express';
import User from '../models/user';

export const userGet = async (req: Request, res: Response) => {
   
    const users = await User.findAll();

    res.status(200).json(users);

}

export const userGetId = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    if ( user ) {
        res.json( user );
    } else {
        res.status(404).json({
            msg: `Could not find user with ID: ${ id }`
        });
    }    
}

export const userPost = async (req: Request, res: Response) => {
    
    const { 
        company_id, 
        full_name, 
        phone, 
        age,
        email,
        position,
        address
    } = req.body;

    const user = User.build({
        company_id, 
        full_name, 
        phone, 
        age,
        email,
        position,
        address
    });

    await user.save();
    res.status(201).json(user);
}

export const userPut = async (req: Request, res: Response) => {
    
}

export const userPatch = async (req: Request, res: Response) => {
    
}

export const userDelete = async (req: Request, res: Response) => {
    
    const { id } = req.params;

    const user = await User.findByPk( id );

    if ( user ) {
        res.json( user );
    } else {
        res.status(404).json({
            msg: `Could not find user with ID: ${ id }`
        });
    }

    await user.update({ state: false });

    // await usuario.destroy();

    res.json(user);
}