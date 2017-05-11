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
  groupID: {
    type: String,
    required: true
  }
});

resourceSchema.statics = {
  getById (groupID) {
    return new Promise((resolve, reject) => {
      this.find({ groupID }, 'uploaderName resourcePath resourceName resourceSize created_at').exec()
      .then(results => resolve(results))
      .catch(err => reject(err));
    });
  }
};

export default mongoose.model('resource', resourceSchema);
