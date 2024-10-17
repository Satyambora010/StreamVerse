import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../Config/envVars.js';
import User from '../Models/user.model.js';

export async function protectRoute(req, res, next) {
    try{
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token' });
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized - Internal Server Error' });
    }
}