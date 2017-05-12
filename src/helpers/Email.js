import nodemailer from 'nodemailer';
import { Captcha } from '../models';
import { APIError } from '../helpers';
import { createCaptcha } from '../utils';
import { email as emailConfig } from '../config';

const transporter = nodemailer.createTransport(emailConfig);

function sendCaptcha (toEmail, type) {
  return new Promise((resolve, reject) => {
    const captchaCode = createCaptcha();
    const mailOptions = {
      from: `毕业设计（论文）管理系统<${emailConfig.auth.user}>`,
      to: toEmail,
      subject: `您此次的验证码是：${captchaCode}（区分大小写）`,
      text: `您此次的验证码是：${captchaCode}（区分大小写），请在 30 分钟内输入验证码进行下一步操作。 如非你本人操作，请忽略此邮件。`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(new APIError('发送验证码失败'));
      }
      return Captcha.create({
        type,
        code: captchaCode,
        email_address: toEmail
      })
      .then(() => resolve(info))
      .catch(err => reject(err));
    });
  });
}

function applyReply (toEmail, type, id) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: `毕业设计（论文）管理系统<${emailConfig.auth.user}>`,
      to: toEmail,
      subject: `账号：${id} 申请回复`,
      text: type === 'success' ? `你申请的账号：${id} ，申请成功，初始密码为身份证号后6位，欢迎使用系统。` : `你申请的账号：${id} ，申请失败。`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(new APIError('发送邮件通知失败'));
      }
      return resolve(info);
    });
  });
}

export default {
  sendCaptcha,
  applyReply
};
