import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  totalTrades: number;
  successRate: number;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Don't include password by default
  },
  totalTrades: {
    type: Number,
    default: 0,
  },
  successRate: {
    type: Number,
    default: 100,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

// Create non-unique indexes for performance
userSchema.index({ totalTrades: -1 });
userSchema.index({ successRate: -1 });

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Delete existing model if it exists to prevent the index error
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
