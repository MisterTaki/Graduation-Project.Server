import mongoose from '../mongoose';

const messageSchema = mongoose.Schema({
  isMarkedByReceiver: {
    type: Boolean,
    defalut: false
  },
  isDeletedByReceiver: {
    type: Boolean,
    defalut: false
  },
  senderID: {
    type: String,
    required: true
  },
  senderIdentity: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  receiverID: {
    type: String,
    required: true
  },
  receiverIdentity: {
    type: String,
    required: true
  },
  receiverName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  remark: String
});

messageSchema.statics = {
  getReceiveMessagesById (receiverID) {
    return new Promise((resolve, reject) => {
      this.find({ receiverID, isDeletedByReceiver: false }, 'senderID senderIdentity senderName title content remark created_at').exec()
      .then(messageList => resolve(messageList))
      .catch(err => reject(err));
    });
  },
  getSendMessagesById (senderID) {
    return new Promise((resolve, reject) => {
      this.find({ senderID }, 'receiverID receiverIdentity receiverName title content remark created_at').exec()
      .then(messageList => resolve(messageList))
      .catch(err => reject(err));
    });
  },
  getDeleteMessagesById (receiverID) {
    return new Promise((resolve, reject) => {
      this.find({ receiverID, isDeletedByReceiver: true }, 'receiverID receiverIdentity receiverName title content remark created_at').exec()
      .then(messageList => resolve(messageList))
      .catch(err => reject(err));
    });
  }
};

export default mongoose.model('message', messageSchema);
