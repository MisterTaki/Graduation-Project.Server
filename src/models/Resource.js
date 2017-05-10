import mongoose from '../mongoose';

const resourceSchema = mongoose.Schema({
  uploaderID: {
    type: String,
    required: true
  },
  uploaderIdentity: {
    type: String,
    required: true
  },
  uploaderName: {
    type: String,
    required: true
  },
  resourcePath: {
    type: String,
    required: true
  },
  resourceName: {
    type: String,
    required: true
  },
  resourceSize: {
    type: String,
    required: true
  },
  group: {
    type: String,
    ref: 'Group'
  }
});

resourceSchema.statics = {
};

export default mongoose.model('resource', resourceSchema);
