import { findByCredentials } from '../model/usermodel.js';
import jwt from 'jsonwebtoken';
export function showLogin(req, res) {
  res.render('login');
}

export function showSignup(req, res) {
  res.render('signup');
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Missing email or password' });
    }

    const user = await findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
    }


    // Sign the token
    const token = jwt.sign(
      { userId: user.rows[0].id }, 
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
    return res.status(200).json({ status: 'success',
      token : token,
      user:{
        id :user.rows[0].id,
        name : user.rows[0].name,
        email : user.rows[0].email,
        age : user.rows[0].age,
        profileImage : user.rows[0].profileimage
      }
     });

  } catch (err) {
    return res.status(500).json({ status: 'fail', message: err.message });
  }
}

export function logout(req, res) {
  res.clearCookie('authToken', { httpOnly: true, secure: false, sameSite: 'lax' });
  res.redirect('/login');
 
}
