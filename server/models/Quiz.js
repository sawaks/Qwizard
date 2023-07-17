//////////////////////////////////////////////////////////////////
//// NEEDS UPDATING!!!!!
//////////////////////////////////////////////////////////////////

const { Schema } = require('mongoose');

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
  questions: [
    {
      _id: true,
      questionText: {
        type: String,
        required: true,
      },
      questionType: {
        type: String,
        required: true,
      },
      timeLimit: {
        type: Number,
        required: true,
      },
      correctAnswer: {
        type: String,
        required: true,
      },
      answers: [
        {
          answerText: {
            type: String,
            required: true,
          },
        }
      ]
    }
  ],
  results: [],
});

module.exports = quizSchema;
