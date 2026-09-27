import { findByCredentials } from '../model/usermodel.js';
import jwt from 'jsonwebtoken';
export function showLogin(req, res) {
  res.render('login');
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Missing email or password' });
    }

    const user = await findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
    }

    // CRUCIAL CHECK: Make sure your .env variables are actually loading!
    if (!process.env.JWT_SECRET) {
      console.error("CRITICAL ERROR: process.env.JWT_SECRET is undefined! Check your dotenv setup.");
      return res.status(500).json({ status: 'fail', message: 'Server configuration error' });
    }

    // Sign the token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Set the cookie
    res.cookie('authToken', token, {
      httpOnly: true,     
      secure: false,      
      sameSite: 'lax',    
      maxAge: 1000 * 60 * 60 * 24 
    });

    // Return the response
    return res.json({ status: 'success', token });

  } catch (err) {
    return res.status(500).json({ status: 'fail', message: err.message });
  }
}

export function logout(req, res) {
  res.clearCookie('authToken', { httpOnly: true, secure: false, sameSite: 'lax' });
  res.redirect('/login');
 
}
