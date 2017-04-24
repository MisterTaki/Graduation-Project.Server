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
  remark: String
});

export default mongoose.model('notice', noticeSchema);
