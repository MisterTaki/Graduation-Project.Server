import moment from 'moment';

export default function (schema, options) { // eslint-disable-line no-unused-vars
  schema.add({ created_at: 'string', updated_at: 'string' });

  schema.pre('save', function (next) {
    this.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    next();
  });

  schema.pre('update', function (next) {
    this.update({}, { updated_at: moment().format('YYYY-MM-DD HH:mm:ss') });
    next();
  });

  schema.pre('updateMany', function (next) {
    this.update({}, { updated_at: moment().format('YYYY-MM-DD HH:mm:ss') });
    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    this.update({ updated_at: moment().format('YYYY-MM-DD HH:mm:ss') });
    next();
  });
}
