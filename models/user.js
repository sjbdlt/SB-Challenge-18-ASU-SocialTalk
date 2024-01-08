const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unquie: true,
      validate: [validateEmail, "Please enter a valid email"],
    },
    thoughts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Thought' }],
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' }]
  },  
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;