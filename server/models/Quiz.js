const { Schema, model } = require('mongoose');

const Question = require('./Question');

const quizSchema = new Schema({
  quizAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  questions: [Question.schema],
  leaderboard: [
    {
      playerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      points: {
        type: Number,
        required: true,
      },
    }
  ],
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
