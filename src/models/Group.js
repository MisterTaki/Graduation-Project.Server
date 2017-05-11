import mongoose from '../mongoose';

const groupSchema = mongoose.Schema({
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher'
  },
  students: [
    {
      type: String,
      ref: 'Student'
    }
  ]
});

groupSchema.statics = {
  hasCreatedByTeacher (teacher) {
    return new Promise((resolve, reject) => {
      this.findOne({ teacher }).exec()
      .then(result => resolve(!!result))
      .catch(err => reject(err));
    });
  },
  addStudents (teacher, newStudents) {
    return new Promise((resolve, reject) => {
      let groupInfo = {};
      this.findOne({ teacher }).exec()
      .then((group) => {
        const oldStudents = group.students;
        const students = oldStudents.concat(newStudents);
        groupInfo = group;
        group.update({ students }).exec();
      })
      .then(() => resolve(groupInfo))
      .catch(err => reject(err));
    });
  },
  getStudentsById (_id) {
    return new Promise((resolve, reject) => {
      this.findOne({ _id }, 'students')
      .populate('students', '_id username').exec()
      .then(result => resolve(result.students.map(item => ({
        _id: item._id,
        username: item.username,
        identity: 'student'
      }))))
      .catch(err => reject(err));
    });
  },
  getMembersById (_id, selfID) {
    return new Promise((resolve, reject) => {
      this.findOne({ _id }, 'teacher students')
      .populate('teacher', '_id username')
      .populate('students', '_id username').exec()
      .then((result) => {
        const { teacher, students } = result;
        const receiverOptions = [{
          _id: teacher._id,
          username: teacher.username,
          identity: 'teacher'
        }];
        students.forEach((item) => {
          if (item._id !== selfID) {
            receiverOptions.push({
              _id: item._id,
              username: item.username,
              identity: 'student'
            });
          }
        });
        resolve(receiverOptions);
      })
      .catch(err => reject(err));
    });
  }
};

export default mongoose.model('group', groupSchema);
