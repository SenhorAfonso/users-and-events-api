import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import serverConfig from '../../config/config';

const MIN_NAME_LENGHT: number = 5;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLenght: [MIN_NAME_LENGHT, `User first name need to be more than ${MIN_NAME_LENGHT} characteres.`],
    require: [true, 'User first name is required.'],
    trim: true
  },
  lastName: {
    type: String,
    minLenght: [MIN_NAME_LENGHT, `User last name need to be more than ${MIN_NAME_LENGHT} characteres.`],
    require: [true, 'User last name is required.'],
    trim: true
  },
  birthDate: {
    type: Date,
    required: [true, 'Must provide a birth date'],
    trim: true,
    match: [/\d{4}-\d{2}-\d{2}/, 'Please fill a valid birth date']
  },
  city: {
    type: String,
    require: [true, 'User city is required.'],
    trim: true
  },
  country: {
    type: String,
    require: [true, 'User country is required.'],
    trim: true
  },
  email: {
    type: String,
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
    require: [true, 'User email is required.'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    match: [/^[a-zA-Z0-9]{6,30}$/, 'Please fill a valid password'],
    require: [true, 'User password is required.'],
    trim: true
  },

});

userSchema.pre('save', async function() {
  const salt: string = serverConfig.BCRYPT_SALT!;
  this.password = await bcrypt.hash(this.password!, salt);
});

export default mongoose.model('userSchema', userSchema);
