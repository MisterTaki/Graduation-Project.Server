import { APIError } from '../helpers';
import { successRes } from '../utils';
import { User, Volunteer } from '../models';

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
    return Volunteer.chooseStudents(_id, ids)
      .then(() => User.Student.addTeacherAndTopic(ids, _id, topics))
      .then(() => User.Teacher.addStudents(_id, ids))
      .then(() => res.json({
        ...successRes
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

export default {
  load,
  choose
};
