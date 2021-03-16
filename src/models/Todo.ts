import * as mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  }
});

export default mongoose.model('todos', TodoSchema);
