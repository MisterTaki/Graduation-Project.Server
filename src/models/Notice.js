import mongoose from '../mongoose';

const noticeSchema = mongoose.Schema({
  author: {
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
  remark: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
});

noticeSchema.statics = {
  findByIdAndRemove (_id) {
    return new Promise((resolve, reject) => {
      this.findOneAndUpdate({ _id }, { isDeleted: true }).exec()
      .then(() => resolve())
      .catch(err => reject(err));
    });
  }
};

export default mongoose.model('notice', noticeSchema);
