import mongoose from '../mongoose';
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
  academyID: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true,
  },
  email: String,
  mobile: String,
  _class: String,
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
  academyID: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true,
    unique: true
  },
  education: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  mobile: {
    type: String,
    unique: true
  },
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
  academyID: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  mobile: {
    type: String,
    unique: true
  }
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
  academyID: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  _class: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  }
});

const statics = {
  getUserById (id) {
    return new Promise((resolve, reject) => {
      this.findById(id).exec()
      .then((user) => {
        if (user) resolve(user);
        reject(new APIError('账号不存在或未申请'));
      })
      .catch(err => reject(err));
    });
  },
  hasUserByEmail (email) {
    return new Promise((resolve, reject) => {
      this.findOne({ email }).exec()
      .then((user) => {
        if (user) resolve(user);
        reject(new APIError('此邮箱未认证'));
      })
      .catch(err => reject(err));
    });
  },
  notUserById (id) {
    return new Promise((resolve, reject) => {
      this.findById(id).exec()
      .then((user) => {
        if (user) reject(new APIError('账号已存在或已申请'));
        resolve();
      })
      .catch(err => reject(err));
    });
  },
  setPwdByEmail (email, salt, pwd) {
    return new Promise((resolve, reject) => {
      this.findOneAndUpdate({ email }, { salt, pwd }).exec()
      .then(() => resolve())
      .catch(err => reject(err));
    });
  },
  modifyPwdById (_id, salt, pwd) {
    return new Promise((resolve, reject) => {
      this.findOneAndUpdate({ _id }, { salt, pwd }).exec()
      .then(() => resolve())
      .catch(err => reject(err));
    });
  },
  setEmailById (_id, email) {
    return new Promise((resolve, reject) => {
      this.findOneAndUpdate({ _id }, { email }).exec()
      .then(() => resolve())
      .catch(err => reject(err));
    });
  }
};

studentSchema.statics = statics;
teacherSchema.statics = Object.assign({
  addTopicById (_id, newTopics) {
    return new Promise((resolve, reject) => {
      this.findById(_id).exec()
      .then((user) => {
        const oldTopics = user.topics;
        const topics = oldTopics.concat(newTopics);
        user.update({ topics }).exec();
      })
      .then(() => resolve())
      .catch(err => reject(err));
    });
  },
  getVolunteerTeachers () {
    return new Promise((resolve, reject) => {
      this.find({}, '_id username gender education position academyID mobile email topics students').exec()
      .then(teachers => resolve(teachers))
      .catch(err => reject(err));
    });
  }
}, statics);
adminSchema.statics = statics;
applyStudentSchema.statics = statics;

export default {
  Student: mongoose.model('Student', studentSchema),
  Teacher: mongoose.model('Teacher', teacherSchema),
  Admin: mongoose.model('Admin', adminSchema),
  ApplyStudent: mongoose.model('Apply_Student', applyStudentSchema),
};
