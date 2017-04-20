import nodemailer from 'nodemailer';
import { APIError } from '../helpers';
import { createCaptcha } from '../utils';
import { email as emailConfig } from '../config';

const transporter = nodemailer.createTransport(emailConfig);

function resetPwd (toEmail) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: `毕业设计（论文）管理系统<${emailConfig.auth.user}>`,
      to: toEmail,
      subject: '验证码',
      text: `您的验证码是：${createCaptcha()}（区分大小写），将于5分钟后失效。`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(new APIError('发送验证码失败'));
      }
      return resolve(info);
    });
  });
}

export default {
  resetPwd
};
