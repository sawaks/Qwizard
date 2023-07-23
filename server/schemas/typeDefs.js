const { gql } = require('apollo-server-express');

const typeDefs = gql`  
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        createdQuizzes: [Quiz]
        playedQuizzes: [Quiz]
    }

    type Quiz {
        _id: ID!
        quizAuthor: String!
        description: String!
        title: String!
        imgURL: String!
        questions: [Question]
        leaderboard: [Leaderboard]
    }

    type Question {
        _id: ID!
        questionText: String!
        timeLimit: Int!
        correctAnswer: String!
        answers: [Answer]!
    }

    type Answer {
        answerText: String!
    }

    type Leaderboard {
        player: String!
        points: Int!
    }

    type Auth {
        token: ID!
        user: User
    }

    input AnswerInput {
        answerText: String!
    }

    input QuestionInput {
        questionText: String!
        timeLimit: Int!
        answers: [AnswerInput]!
        correctAnswer: String!
    }

    input QuizInput {
        description: String!
        title: String!
        imgURL: String!
    }

    type Query {
        me: User
        dbQuizzes: [Quiz]
        
        getQuizQuestions(quizId: ID!): Quiz
        getPlayedQuizzes: [Quiz]

        getLeaderboard(quizId: ID!): Quiz
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addLeaderboard(quizId: ID!, points: Int!): Quiz

        addQuiz( input: QuizInput!): Quiz
        addQuestion(quizId: ID!, input: QuestionInput!): Question

        removeQuiz(quizId: ID!): Quiz
        removeQuestion(quizId: ID!, questionId: ID!): Quiz
        editQuizDetails(quizId: ID!, input: QuizInput!): Quiz
        editQuestion(questionId: ID!, input: QuestionInput!): Question
    }
`;

module.exports = typeDefs;
