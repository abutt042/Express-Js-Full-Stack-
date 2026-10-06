import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {pool} from '../config/database.js';
// 1. Map Mongoose to your existing database fields
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number },
  password: { type: String, required: true },
    profileImage: { type: String }, // <-- stores the file path, e.g. "uploads/1699...jpg"


});
const hashPassword = (password ) => {
const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt); 
}

userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    // Hash the password before saving
    this.password = await hashPassword(this.password); // Implement your hashing function
  }
});
const User = mongoose.model('User', userSchema, 'Users'); 

// 3. Updated Async Functions
export async function findAll(excludedUserId) {
  return await User.find({ _id: { $ne: excludedUserId } });
}



export async function create(userData) {
 if(!userData.name || !userData.email || !userData.password) {
    throw new Error('Name, email, and password are required fields.');
  }
  return await User.create(userData);
}
export async function findById(id) {
  const result = await pool.query(
    'SELECT id, name, email, age, profileimage FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] ?? null;
}

export async function signup(userData) {
  const { name, email, password, age, profileImage } = userData;

  // ---- Validation (replaces Mongoose schema validation) ----
  if (!name?.trim() || !email?.trim() || !password) {
    const err = new Error('Name, email, and password are required.');
    err.status = 400;
    throw err;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // ---- Check if user exists (replaces User.findOne) ----
  const existing = await pool.query(
    'SELECT id FROM users WHERE email = $1',
    [normalizedEmail]
  );
  if (existing.rows.length > 0) return null;   // email taken

  // ---- Hash password ----
  const hashedPassword = await bcrypt.hash(password, 10);

  // ---- Insert user (replaces User.create) ----
  const result = await pool.query(
    `INSERT INTO users (name, email, password, age, profileimage)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, profileimage`,
    [name.trim(), normalizedEmail, hashedPassword,age || null, profileImage || null]
  );

  return result.rows[0];   // the newly created user (no password!)
}

export async function findByCredentials(email, password) {

  const user =await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if(!user.rows[0]) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) {
    return null;
  }
 
  return user

}
export async function deleteById(id) {
  return await pool.query('DELETE FROM users WHERE id = $1', [id]);
}