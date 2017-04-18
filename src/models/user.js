import mongoose from 'mongoose';
import { APIError } from '../helpers';

const studentSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
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
  username: {
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
  _id: {
    type: String,
    required: true,
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
  username: {
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
  _id: {
    type: String,
    required: true,
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
  username: {
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

const applyStudentSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
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
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  }
});

const statics = {
  getById (id) {
    return new Promise((resolve, reject) => {
      this.findById(id).exec().then((user) => {
        if (user) resolve(user);
        reject(new APIError('账号不存在或未申请'));
      });
    });
  },
  notUserById (id) {
    return new Promise((resolve, reject) => {
      this.findById(id).exec().then((user) => {
        if (user) reject(new APIError('账号已存在或已申请'));
        resolve();
      });
    });
  }
};

studentSchema.statics = statics;
teacherSchema.statics = statics;
adminSchema.statics = statics;
applyStudentSchema.statics = statics;

export default {
  Student: mongoose.model('Student', studentSchema),
  Teacher: mongoose.model('Teacher', teacherSchema),
  Admin: mongoose.model('Admin', adminSchema),
  ApplyStudent: mongoose.model('Apply_Student', applyStudentSchema),
};
