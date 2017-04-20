import { System } from '../models';
import { system as systemConfig } from '../config';

export default function () {
  return new Promise((resolve, reject) => {
    const { id, ...others } = systemConfig;
    System.findById(id).exec()
    .then((user) => {
      if (user) return resolve('系统设置已初始化');
      return System.create({
        _id: id,
        ...others
      });
    }, () => reject('系统设置查询错误'))
    .then(() => resolve('系统设置初始化成功'), () => reject('系统设置初始化错误'));
  });
}
