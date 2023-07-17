const { Schema } = require('mongoose');

const quizSchema = new Schema({
  _id: true,
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
  questions: [questionSchema],
  leaderboard: [
    {
      playerID: {
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

module.exports = quizSchema;
