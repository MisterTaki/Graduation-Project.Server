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
  topic: String,
  teacher: {
    type: String,
    ref: 'Teacher'
  },
  group: {
    type: String,
    ref: 'Group'
  }
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
  students: [{
    type: String,
    ref: 'Student'
  }],
  group: {
    type: String,
    ref: 'Group'
  }
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

studentSchema.statics = Object.assign({
  getAll () {
    return new Promise((resolve, reject) => {
      this.find({}, '_id username gender _class major academyID ID email mobile teacher topic')
      .then(results => resolve(results))
      .catch(err => reject(err));
    });
  },
  addVolunteerInfos (studentIDs, teacherID, topics, group) {
    return new Promise((resolve, reject) => {
      const tasks = [];
      for (let i = 0; i < studentIDs.length; i += 1) {
        tasks.push(this.findOneAndUpdate({ _id: studentIDs[i] }, { teacher: teacherID, topic: topics[i], group }).exec());
      }
      Promise.all(tasks).then(() => resolve()).catch(err => reject(err));
    });
  },
  getTeacherById (_id) {
    return new Promise((resolve, reject) => {
      this.findOne({ _id }, 'teacher topic')
      .populate('teacher', 'username gender position education academyID mobile email').exec()
      .then(({ topic, teacher }) => resolve({
        topic,
        username: teacher.username,
        gender: teacher.gender,
        position: teacher.position,
        education: teacher.education,
        academyID: teacher.academyID,
        mobile: teacher.mobile,
        email: teacher.email
      }))
      .catch(err => reject(err));
    });
  },
}, statics);

teacherSchema.statics = Object.assign({
  getAll () {
    return new Promise((resolve, reject) => {
      this.find({}, '_id username gender position education academyID ID email mobile students topics')
      .then(results => resolve(results))
      .catch(err => reject(err));
    });
  },
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
  },
  getStudentsById (_id) {
    return new Promise((resolve, reject) => {
      this.findOne({ _id }, 'students')
      .populate('students', '_id username gender _class topic major academyID mobile email').exec()
      .then(({ students }) => resolve(students))
      .catch(err => reject(err));
    });
  },
  addVolunteerInfos (_id, newStudents, group) {
    return new Promise((resolve, reject) => {
      this.findById(_id).exec()
      .then((user) => {
        const oldStudents = user.students;
        const students = oldStudents.concat(newStudents);
        user.update({ students, group }).exec();
      })
      .then(() => resolve())
      .catch(err => reject(err));
    });
  }
}, statics);

adminSchema.statics = Object.assign({
  getAll () {
    return new Promise((resolve, reject) => {
      this.find({}, '_id username gender level academyID ID email mobile')
      .then(results => resolve(results))
      .catch(err => reject(err));
    });
  },
}, statics);

applyStudentSchema.statics = {
  notUserById: statics.notUserById,
  getAll () {
    return new Promise((resolve, reject) => {
      this.find({}, '_id username gender _class major academyID ID email mobile')
      .then(results => resolve(results))
      .catch(err => reject(err));
    });
  },
};

export default {
  Student: mongoose.model('Student', studentSchema),
  Teacher: mongoose.model('Teacher', teacherSchema),
  Admin: mongoose.model('Admin', adminSchema),
  ApplyStudent: mongoose.model('ApplyStudent', applyStudentSchema),
};
