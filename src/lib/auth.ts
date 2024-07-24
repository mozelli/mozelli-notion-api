import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

function generateAccessToken(user: User) {
    const authSecret = process.env.AUTH_SECRET as string;
    const accessToken = jwt.sign({
        id: user.id
    }, 
    authSecret, { 
        expiresIn: 86400  
    });

    return accessToken;
}

export { generateAccessToken }