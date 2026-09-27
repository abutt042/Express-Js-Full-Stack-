import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
  console.log('Creating user with data:', userData); // Debugging line
 if(!userData.name || !userData.email || !userData.password) {
    throw new Error('Name, email, and password are required fields.');
  }
  return await User.create(userData);
}
export async function findById(id) {
  return await User.findById(id);
}

export async function findByCredentials(email, password) {

  const user = await User.findOne({ email: email});
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user

}
export async function deleteById(id) {
  return await User.findByIdAndDelete(id);
}