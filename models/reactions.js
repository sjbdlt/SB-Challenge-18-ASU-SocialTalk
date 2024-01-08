const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionbody: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280
    },
    username: {
        type: String,
        required: true,        
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },   
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;