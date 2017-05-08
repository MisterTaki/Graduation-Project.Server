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
  switch (type) {
    case 'receive':
      getMessageMethod = 'getReceiveMessagesById';
      break;
    case 'send':
      getMessageMethod = 'getSendMessagesById';
      break;
    case 'deleted':
      getMessageMethod = 'getDeletedMessagesById';
      break;
    case 'latest':
      getMessageMethod = 'getLatestMessagesById';
      break;
    default:
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

function mark ({ user }, res, next) {
  const { _id } = user;
  return Message.markByReceiverId(_id)
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

function remove ({ user, body }, res, next) {
  const { messageID } = body;
  return Message.deleteById(messageID)
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

export default {
  send,
  load,
  remove,
  mark
};
