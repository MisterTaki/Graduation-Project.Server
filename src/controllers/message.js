import { titleCase, successRes } from '../utils';
import { Message, User } from '../models';


function send ({ body, user }, res, next) {
  const { receiverID, receiverName, receiverIdentity, title, content, remark } = body;
  const { _id, identity } = user;
  return User[titleCase(identity)].getUserById(_id)
    .then(({ username }) => Message.create({
      senderID: _id,
      senderName: username,
      senderIdentity: identity,
      receiverID,
      receiverName,
      receiverIdentity,
      title,
      content,
      remark
    }))
    .then(newMessage => res.json({
      ...successRes,
      result: {
        newMessage
      }
    }))
    .catch(next);
}

function load ({ user, query }, res, next) {
  const { _id } = user;
  const { type } = query;
  let getMessageMethod;
  if (type === 'receive') {
    getMessageMethod = 'getReceiveMessagesById';
  } else if (type === 'send') {
    getMessageMethod = 'getSendMessagesById';
  }
  return Message[getMessageMethod](_id)
    .then(messageList => res.json({
      ...successRes,
      result: {
        messageList
      }
    }))
    .catch(next);
}

export default {
  send,
  load
};
