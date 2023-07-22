const { Schema, model } = require('mongoose');

const Question = require('./Question');

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
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
