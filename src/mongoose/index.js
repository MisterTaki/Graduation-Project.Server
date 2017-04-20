import mongoose from 'mongoose';
import Timestamp from './Timestamp';

mongoose.Promise = Promise;
mongoose.plugin(Timestamp);

export default mongoose;
