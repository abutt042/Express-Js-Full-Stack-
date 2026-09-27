import { findAll  , create, deleteById } from '../model/usermodel.js';
import emailTransporter from '../config/emailerconfig.js';
export async function listUsers(req, res) {
  res.render('user', {
    users: await findAll(req.user._id),
    active: 'users',
  });
}




export const sendmail = async (req, res) => {
  try {
    const mailOptions = {
      from: 'abutt042@gmail.com',
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.body,  
    };

    await emailTransporter.sendMail(mailOptions);

    return res.json({ status: 'success', message: 'Mail sent' });  // ✅ respond!
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ status: 'fail', message: err.message });
  }
};
 
export async function createUser(req, res) {
  try {
    const userData = req.body;
      if (req.file) {
      userData.profileImage = `/uploads/${req.file.filename}`;
    }
    console.log('Received user data:', userData); // Debugging line
    const user = await create(userData);
    
    res.status(201).json({
 status: 'success',
      message: 'User created successfully',
    }
     );
  } catch (error) {
    res.status(500).json({ error: error.message });
  } }

  export async function deleteuser(req, res) {

  try {
    const userId = req.params.id;
    // console.log('Deleting user with ID:', userId); // Debugging line
    await deleteById(userId);
    res.status(200).json({ message: 'User deleted successfully' }); 
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }



  }