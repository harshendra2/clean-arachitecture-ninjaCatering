import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const userOtpSchema = new mongoose.Schema({
  email: {
    type: 'string',
    unique: true,
    validate: {
      validator: (value: any) => {
        return validator.isEmail(value);
      },
      message: 'Not Valid Email',
    },
  },
  otp: {
    type: 'string',
  },
});

const userotp = mongoose.model('UserOtp', userOtpSchema);
export default userotp;
