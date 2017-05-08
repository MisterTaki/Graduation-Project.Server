import mongoose from '../mongoose';

const messageSchema = mongoose.Schema({
  isMarkedByReceiver: {
    type: Boolean,
    default: false
  },
  isDeletedByReceiver: {
    type: Boolean,
    default: false
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
  getLatestMessagesById (receiverID) {
    return new Promise((resolve, reject) => {
      this.find({ receiverID, isMarkedByReceiver: false }, 'title').sort('-_id').exec()
      .then(messageList => resolve(messageList))
      .catch(err => reject(err));
    });
  },
  getReceiveMessagesById (receiverID) {
    return new Promise((resolve, reject) => {
      this.find({ receiverID, isDeletedByReceiver: false }, 'senderID senderIdentity senderName title content remark created_at').sort('-_id').exec()
      .then(messageList => resolve(messageList))
      .catch(err => reject(err));
    });
  },
  getSendMessagesById (senderID) {
    return new Promise((resolve, reject) => {
      this.find({ senderID }, 'receiverID receiverIdentity receiverName title content remark created_at').sort('-_id').exec()
      .then(messageList => resolve(messageList))
      .catch(err => reject(err));
    });
  },
  getDeletedMessagesById (receiverID) {
    return new Promise((resolve, reject) => {
      this.find({ receiverID, isDeletedByReceiver: true }, 'senderID senderIdentity senderName title content remark created_at').sort('-_id').exec()
      .then(messageList => resolve(messageList))
      .catch(err => reject(err));
    });
  },
  deleteById (_id) {
    return new Promise((resolve, reject) => {
      this.findOneAndUpdate({ _id }, { isDeletedByReceiver: true }).exec()
      .then(() => resolve())
      .catch(err => reject(err));
    });
  },
  markByReceiverId (receiverID) {
    return new Promise((resolve, reject) => {
      this.updateMany({ receiverID, isMarkedByReceiver: false }, { isMarkedByReceiver: true }).exec()
      .then(() => resolve())
      .catch(err => reject(err));
    });
  }
};

export default mongoose.model('message', messageSchema);
