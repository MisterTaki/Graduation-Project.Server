import mongoose from '../mongoose';

const academySchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  value: String
});

export default mongoose.model('academy', academySchema);
