import mongoose from '../mongoose';

const groupSchema = mongoose.Schema({
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher'
  },
  students: [
    {
      type: String,
      ref: 'Student'
    }
  ],
  resources: [
    {
      type: String,
      ref: 'Resource'
    }
  ]
});

groupSchema.statics = {
  getResourcesById (_id) {
    return new Promise((resolve, reject) => {
      this.findOne({ _id }, 'resources')
      .populate('resources', 'uploaderName resourcePath resourceName resourceSize created_at').exec()
      .then(result => resolve(result.resources))
      .catch(err => reject(err));
    });
  }
};

export default mongoose.model('group', groupSchema);
