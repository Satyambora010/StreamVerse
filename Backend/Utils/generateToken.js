import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../Config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '2h' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: ENV_VARS.NODE_ENV !== 'development', maxAge: 3600000 });
    return token;
}

