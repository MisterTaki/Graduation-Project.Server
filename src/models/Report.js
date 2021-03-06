import mongoose from '../mongoose';

const reportSchema = mongoose.Schema({
  student: {
    type: String,
    required: true,
    ref: 'Student'
  },
  reportPath: {
    type: String,
    required: true
  },
  reportName: {
    type: String,
    required: true
  },
  reportSize: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher'
  }
});

reportSchema.statics = {
  getByTeacherId (teacher) {
    return new Promise((resolve, reject) => {
      this.find({ teacher }, '_id student reportPath reportName reportSize created_at')
      .populate('student', '_id username').exec()
      .then(results => resolve(results.map(item => ({
        _id: item._id,
        studentID: item.student._id,
        studentName: item.student.username,
        reportPath: item.reportPath,
        reportName: item.reportName,
        reportSize: item.reportSize,
        created_at: item.created_at,
      }))))
      .catch(err => reject(err));
    });
  },
  getByStudentId (student) {
    return new Promise((resolve, reject) => {
      this.find({ student }, 'reportName reportSize created_at')
      .then(results => resolve(results))
      .catch(err => reject(err));
    });
  },
};

export default mongoose.model('report', reportSchema);
