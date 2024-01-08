const { Schema, model } = require('mongoose');
const reactSchema = require('./reactions');

const thoughtSchema = new Schema(
  {
    thoughttext: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,        
    },
    reactions: [reactSchema.schema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;