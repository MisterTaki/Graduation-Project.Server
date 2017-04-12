import mongoose from 'mongoose';

mongoose.Promise = Promise;

const studentSchema = mongoose.Schema({
  account: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  pwd: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  name: {
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
  ID: {
    type: String,
    required: true
  },
  email: String,
  mobile: String,
  class: String,
  major: String,
  choosedTopic: String,
  teacher: String,
});

const teacherSchema = mongoose.Schema({
  account: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  pwd: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  name: {
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
  ID: {
    type: Number,
    required: true
  },
  email: String,
  mobile: String,
  education: String,
  position: String,
  topics: [String],
  students: [String]
});

const adminSchema = mongoose.Schema({
  account: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  level: {
    type: Number,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  name: {
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
  ID: {
    type: Number,
    required: true
  },
  email: String,
  mobile: String
});

export default {
  Student: mongoose.model('Student', studentSchema),
  Teacher: mongoose.model('Teacher', teacherSchema),
  Admin: mongoose.model('Admin', adminSchema),
};
