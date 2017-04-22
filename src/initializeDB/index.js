import academy from './academy';
import system from './system';
import { Academy, System } from '../models';

export default function () {
  return new Promise((resolve, reject) => {
    const initializeAcademy = Academy.remove().then(() => Academy.create(academy));
    const initializeSystem = System.remove().then(() => System.create(system));
    Promise.all([initializeAcademy, initializeSystem])
    .then(() => resolve('数据库初始化成功'))
    .catch(err => reject(`数据库初始化失败————${err}`));
  });
}
