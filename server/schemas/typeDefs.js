//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//// NEEDS UPDATING!!!!!
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


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
        quizAuthor: ID!
        description: String!
        title: String!
        imageURL: String!
        questions: [Question]
        leaderboard: [Leaderboard]
    }

    type Question {
        _id: ID!
        questionText: String!
        questionType: String!
        timeLimit: Int!
        correctAnswer: String!
        answers: [Answer]!
    }

    type Answer {
        answerText: String!
    }

    type Leaderboard {
        playerID: ID!
        points: Int!
    }

    type Auth {
        token: ID!
        user: User
    }

    input QuestionInput {
        questionText: String!
        questionType: String!
        timeLimit: Int!
        answers: [AnswerInput]!
        correctAnswer: String!
    }

    input QuizInput {
        description: String!
        title: String!
        imageURL: String!
    }

    type Query {
        me: User
        dbQuizzes: [Quiz]
        
        getQuizQuestions(quizID: ID!): Quiz
        getPlayedQuizzes: [Quiz]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addLeaderboard(playerId: ID!, points:Int!): Quiz

        addQuiz( input: QuizInput!): Quiz
        addQuestion(quizId: ID!, input: QuestionInput!): Quiz

        removeQuiz(quizId: ID!): Quiz
        removeQuestion(quizId: ID!, questionId: ID!): Quiz
        editQuizDetails(quizId: ID!, input: QuizInput!): Quiz
        editQuestion(questionId: ID!, input: QuestionInput!): Question
    }
`;

module.exports = typeDefs;
