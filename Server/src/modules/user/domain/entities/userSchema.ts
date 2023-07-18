import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'abcdefghijklmnop';

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Not a valid email',
    },
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  block: {
    type: Boolean
  },
  verifytoken: {
    type: String
  },
  Address: [
    {
      country: { type: String },
      address: { type: String},
      city: { type: String},
      state: { type: String},
      postcode: { type: String},
      phone: { type: String},
    },
  ],
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && typeof this.password === 'string') {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Generate authentication token
userSchema.methods.generateAuthToken = async function () {
  try {
    const newToken = jwt.sign({ _id: this._id }, SECRET_KEY, {
      expiresIn: '1d',
    });

    this.tokens = this.tokens.concat({ token: newToken });
    await this.save();
    return newToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userModel = mongoose.model('users', userSchema);
export default userModel;

