import mongoose from '../mongoose';

const volunteerSchema = mongoose.Schema({
  student: {
    type: String,
    required: true,
    ref: 'Student'
  },
  firstTeacher: {
    type: String,
    required: true,
    ref: 'Teacher'
  },
  firstTopic: {
    type: String,
    required: true,
  },
  secondTeacher: {
    type: String,
    required: true,
    ref: 'Teacher'
  },
  secondTopic: {
    type: String,
    required: true,
  },
  thirdTeacher: {
    type: String,
    required: true,
    ref: 'Teacher'
  },
  thirdTopic: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1
  },
  choosedBy: {
    type: String,
    ref: 'Teacher'
  }
});

/* eslint no-nested-ternary: 0 */
volunteerSchema.statics = {
  getChoosedTeachersById (student) {
    return new Promise((resolve, reject) => {
      this.findOne({ student }, 'firstTeacher firstTopic secondTeacher secondTopic thirdTeacher thirdTopic isCompleted status')
      .populate('firstTeacher', 'username gender education position academyID mobile email')
      .populate('secondTeacher', 'username gender education position academyID mobile email')
      .populate('thirdTeacher', 'username gender education position academyID mobile email')
      .exec()
      .then((result) => {
        const choosedTeachers = [];
        const { firstTeacher, secondTeacher, thirdTeacher } = result;
        choosedTeachers.push({
          order: 1,
          status: result.status === 1 ? '进行中' : '已拒绝',
          choosedTopic: result.firstTopic,
          username: firstTeacher.username,
          gender: firstTeacher.gender,
          education: firstTeacher.education,
          position: firstTeacher.position,
          academyID: firstTeacher.academyID,
          mobile: firstTeacher.mobile,
          email: firstTeacher.email
        });
        choosedTeachers.push({
          order: 2,
          status: result.status === 2 ? '进行中' : result.status < 2 ? '待进行' : '已拒绝',
          choosedTopic: result.secondTopic,
          username: secondTeacher.username,
          gender: secondTeacher.gender,
          education: secondTeacher.education,
          position: secondTeacher.position,
          academyID: secondTeacher.academyID,
          mobile: secondTeacher.mobile,
          email: secondTeacher.email,
        });
        choosedTeachers.push({
          order: 3,
          status: result.status === 3 ? '进行中' : result.status < 3 ? '待进行' : '已拒绝',
          choosedTopic: result.thirdTopic,
          username: thirdTeacher.username,
          gender: thirdTeacher.gender,
          education: thirdTeacher.education,
          position: thirdTeacher.position,
          academyID: thirdTeacher.academyID,
          mobile: thirdTeacher.mobile,
          email: thirdTeacher.email,
        });
        return resolve(choosedTeachers);
      })
      .catch(err => reject(err));
    });
  },
  getStudentOptionsById (teacherID) {
    return new Promise((resolve, reject) => {
      let studentOptions = [];
      this.find({ firstTeacher: teacherID }, 'student firstTopic isCompleted status')
      .populate('student', '_id username gender _class major academyID mobile email').exec()
      .then((firstOptions) => {
        if (firstOptions) {
          studentOptions = studentOptions.concat(firstOptions.map((item) => {
            const { status, isCompleted, firstTopic } = item;
            const { _id, username, gender, _class, major, academyID, mobile, email } = item.student;
            let optionStatus;
            if (isCompleted) {
              switch (status) {
                case 1:
                  optionStatus = '已确认选择为您的学生';
                  break;
                case 2:
                  optionStatus = '已被第二志愿老师选择';
                  break;
                case 3:
                  optionStatus = '已被第三志愿老师选择';
                  break;
                default:
              }
            } else {
              switch (status) {
                case 1:
                  optionStatus = '可以选择成为您的学生';
                  break;
                case 2:
                  optionStatus = '第二志愿老师正在选择';
                  break;
                case 3:
                  optionStatus = '第三志愿老师正在选择';
                  break;
                default:
              }
            }
            return {
              order: 1,
              status: optionStatus,
              choosedTopic: firstTopic,
              _id,
              username,
              gender,
              _class,
              major,
              academyID,
              mobile,
              email
            };
          }));
        }
        return this.find({ secondTeacher: teacherID }, 'student secondTopic isCompleted status')
        .populate('student', '_id username gender _class major academyID mobile email').exec();
      })
      .then((secondOptions) => {
        if (secondOptions) {
          studentOptions = studentOptions.concat(secondOptions.map((item) => {
            const { status, isCompleted, secondTopic } = item;
            const { _id, username, gender, _class, major, academyID, mobile, email } = item.student;
            let optionStatus;
            if (isCompleted) {
              switch (status) {
                case 1:
                  optionStatus = '已被第一志愿老师选择';
                  break;
                case 2:
                  optionStatus = '已确认选择为您的学生';
                  break;
                case 3:
                  optionStatus = '已被第三志愿老师选择';
                  break;
                default:
              }
            } else {
              switch (status) {
                case 1:
                  optionStatus = '第一志愿老师正在选择';
                  break;
                case 2:
                  optionStatus = '可以选择成为您的学生';
                  break;
                case 3:
                  optionStatus = '第三志愿老师正在选择';
                  break;
                default:
              }
            }
            return {
              order: 2,
              status: optionStatus,
              choosedTopic: secondTopic,
              _id,
              username,
              gender,
              _class,
              major,
              academyID,
              mobile,
              email
            };
          }));
        }
        return this.find({ thirdTeacher: teacherID }, 'student thirdTopic isCompleted status')
        .populate('student', '_id username gender _class major academyID mobile email').exec();
      })
      .then((thirdOptions) => {
        if (thirdOptions) {
          studentOptions = studentOptions.concat(thirdOptions.map((item) => {
            const { status, isCompleted, thirdTopic } = item;
            const { _id, username, gender, _class, major, academyID, mobile, email } = item.student;
            let optionStatus;
            if (isCompleted) {
              switch (status) {
                case 1:
                  optionStatus = '已被第一志愿老师选择';
                  break;
                case 2:
                  optionStatus = '已被第二志愿老师选择';
                  break;
                case 3:
                  optionStatus = '已确认选择为您的学生';
                  break;
                default:
              }
            } else {
              switch (status) {
                case 1:
                  optionStatus = '第一志愿老师正在选择';
                  break;
                case 2:
                  optionStatus = '第二志愿老师正在选择';
                  break;
                case 3:
                  optionStatus = '可以选择成为您的学生';
                  break;
                default:
              }
            }
            return {
              order: 3,
              status: optionStatus,
              choosedTopic: thirdTopic,
              _id,
              username,
              gender,
              _class,
              major,
              academyID,
              mobile,
              email
            };
          }));
        }
        return resolve(studentOptions);
      })
      .catch(err => reject(err));
    });
  },
  getStatusById (student) {
    return new Promise((resolve, reject) => {
      this.findOne({ student }, 'isCompleted').exec()
      .then((record) => {
        if (record) {
          if (record.isCompleted) {
            return resolve(2);
          }
          return resolve(1);
        }
        return resolve(0);
      })
      .catch(err => reject(err));
    });
  },
  chooseStudents (_id, studentIDs) {
    return new Promise((resolve, reject) => {
      const tasks = [];
      for (let i = 0; i < studentIDs.length; i += 1) {
        tasks.push(this.findOneAndUpdate({ student: studentIDs[i] }, { isCompleted: true, choosedBy: _id }).exec());
      }
      Promise.all(tasks).then(() => resolve()).catch(err => reject(err));
    });
  }
};

export default mongoose.model('volunteer', volunteerSchema);
