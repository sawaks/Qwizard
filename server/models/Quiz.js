const { Schema, model } = require('mongoose');

const Question = require('./Question');

// const User = require('./User');

const quizSchema = new Schema({
  quizAuthor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  // questions: [Question.schema],
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    }
  ],
  leaderboard: [
    {
      player: {
        type: String,
        required: true,
      },
      points: {
        type: Number,
        required: true,
      },
    }
  ],
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
