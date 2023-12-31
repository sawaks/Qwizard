const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Quiz.js
const Quiz = require('./Quiz');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // createdQuizzes: [Quiz.schema],
    // playedQuizzes: [Quiz.schema],
    createdQuizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
      }
    ],
    playedQuizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
      }
    ],
    

  },

);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);

module.exports = User;

