import { APIError } from '../helpers';
import { successRes } from '../utils';
import { User, Volunteer, Group } from '../models';

function load ({ user, query }, res, next) {
  const { _id, identity } = user;
  const { type } = query;
  if (identity === 'student' && type === 'option') {
    return User.Teacher.getVolunteerTeachers()
    .then(teachers => res.json({
      ...successRes,
      result: {
        teachers
      }
    }))
    .catch(next);
  } else if (identity === 'student' && type === 'choosed') {
    return Volunteer.getChoosedTeachersById(_id)
    .then(choosedTeachers => res.json({
      ...successRes,
      result: {
        choosedTeachers
      }
    }))
    .catch(next);
  } else if (identity === 'student' && type === 'status') {
    return Volunteer.getStatusById(_id)
    .then(status => res.json({
      ...successRes,
      result: {
        status
      }
    }))
    .catch(next);
  } else if (identity === 'student' && type === 'confirmed') {
    return User.Student.getTeacherById(_id)
    .then(confirmedTeacher => res.json({
      ...successRes,
      result: {
        confirmedTeacher
      }
    }))
    .catch(next);
  } else if (identity === 'teacher' && type === 'option') {
    return Volunteer.getStudentOptionsById(_id)
    .then(students => res.json({
      ...successRes,
      result: {
        students
      }
    }))
    .catch(next);
  } else if (identity === 'teacher' && type === 'confirmed') {
    return User.Teacher.getStudentsById(_id)
    .then(confirmedStudents => res.json({
      ...successRes,
      result: {
        confirmedStudents
      }
    }))
    .catch(next);
  }
  return next(new APIError('参数格式错误', 400));
}

function choose ({ user, body }, res, next) {
  const { _id, identity } = user;
  if (identity === 'student') {
    const { firstTeacherID, firstTopic, secondTeacherID, secondTopic, thirdTeacherID, thirdTopic } = body;
    return Volunteer.create({
      student: _id,
      firstTeacher: firstTeacherID,
      firstTopic,
      secondTeacher: secondTeacherID,
      secondTopic,
      thirdTeacher: thirdTeacherID,
      thirdTopic
    })
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
  } else if (identity === 'teacher') {
    const { ids, topics } = body;
    let group = '';
    return Volunteer.chooseStudents(_id, ids)
      .then(() => Group.hasCreatedByTeacher(_id))
      .then((hasCreated) => {
        if (hasCreated) {
          return Group.addStudents(_id, ids);
        }
        return Group.create({
          teacher: _id,
          students: ids
        });
      })
      .then((result) => {
        group = result._id;
        return User.Student.addVolunteerInfos(ids, _id, topics, group);
      })
      .then(() => User.Teacher.addVolunteerInfos(_id, ids, group))
      .then(() => res.json({
        ...successRes
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

function refuse ({ user, body }, res, next) {
  const { _id, identity } = user;
  const { student, order } = body;
  if (identity === 'teacher') {
    let orderText = '';
    switch (order) {
      case 1:
        orderText = 'firstTeacher';
        break;
      case 2:
        orderText = 'secondTeacher';
        break;
      case 3:
        orderText = 'thirdTeacher';
        break;
      default:
    }
    return Volunteer.refuseStudent(student, orderText, _id)
      .then(() => res.json({
        ...successRes
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

export default {
  load,
  choose,
  refuse
};
