import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async (next) => {
  const passwordHash = await bcrypt.hash(this.password, 8);
  this.password = passwordHash;

  next();
});

UserSchema.method('checkPassword', (password) => {
  return bcrypt.compare(password, this.password_hash);
});

export default mongoose.model('User', UserSchema);
