const { Schema } = require('mongoose');

const questionSchema = new Schema({
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
});

module.exports = questionSchema;
