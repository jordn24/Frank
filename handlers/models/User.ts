import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema ({
  user: { type: String, required: true },
  tag: { type: String, required: true },
  bottomFrags: { type: String, required: true },
  allTimeBottomFrags: { type: String, required: true },
  matches: { type: String, required: true },
  allTimeMatches: {type : String, required: true},
  allTimePercentage: {type: String, required: true},
  percentage: {type: String, required: true},
  discId: {type: String, required: true},
  latestMatch: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

export default User;
