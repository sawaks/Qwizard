const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
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
});

const Question = model('Question', questionSchema);

module.exports = Question;
