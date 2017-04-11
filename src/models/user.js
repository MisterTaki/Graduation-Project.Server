import { Schema, model } from 'mongoose';

const userSchema = Schema({
  // common
  id: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  pwd: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  academy: {
    type: String,
    required: true
  },
  email: String,
  mobile: String,
  // student
  class: String,
  major: String,
  choosedTopic: String,
  // teacher
  teacher: String,
  education: String,
  position: String,
  topics: [String],
  students: [String],
  // admin
  level: Number
});

export default model('User', userSchema);
