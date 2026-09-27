import { findById } from '../model/usermodel.js';
import jwt from 'jsonwebtoken';
export async function getSessionUser(req) {
  const token = req.cookies.authToken;
  console.log('Token extracted from cookies:', token);

  if (!token) return null;

  try {
    // Decode the token payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Query MongoDB to match the user by the ID saved inside the token
    const user = await findById(decoded.userId);
    return user || null; // Returns user object, or null if user was deleted from DB
  } catch (err) {
    console.error('JWT Verification Failed:', err.message);
    return null;
  }
}
export async function requireLogin(req, res, next) {
  const user = await getSessionUser(req);   // ← await!
  if (!user) {
      res.clearCookie('authToken');
    return res.redirect('/login');
  }

  
  req.user = user;
  next();
}