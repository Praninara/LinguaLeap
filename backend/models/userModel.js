import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema
 * Defines the structure for user documents in MongoDB
 */
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    totalXP: {
      type: Number,
      default: 0,
    },
  },
   {
    timestamps: true,
  }
);

/**
 * Password comparison method
 * Compares provided password with hashed password in database
 * 
 * @param {string} enteredPassword - Password provided during login
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Pre-save middleware
 * Automatically hashes password before saving to database
 * Only runs if password field has been modified
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;