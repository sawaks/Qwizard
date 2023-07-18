const { gql } = require('@apollo/client');

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_QUIZ = gql`
  mutation removeQuiz($quizId: ID!) {
    removeQuiz(quizId: $quizId) {
      _id
      quizAuthor
      description
      title
      imageURL
      questions {
        _id
      }
      leaderboard {
        playerID
        points
      }
    }
  }
`;

export const REMOVE_QUESTION = gql`
  mutation removeQuestion($quizId: ID!, $questionId: ID!) {
    removeQuestion(quizId: $quizId, questionId: $questionId) {
      _id
      questionText
      questionType
      timeLimit
      answers {
        answerText
      }
      correctAnswer
    }
  }
`;

export const EDIT_QUIZ = gql`
  mutation editQuizDetails($quizId: ID!, $input: QuizInput!) {
    removeQuestion(quizId: $quizId, input: $input) {
      _id
      quizAuthor
      description
      title
      imageURL
      questions {
        _id
      }
      leaderboard {
        playerID
        points
      }
    }
  }
`;

export const EDIT_QUESTION = gql`
  mutation editQuestion($questionId: ID!, $input: QuestionInput!) {
    editQuestion(questionId: $questionId, input: $input) {
      _id
      questionText
      questionType
      timeLimit
      answers {
        answerText
      }
      correctAnswer
    }
  }
`;

export const ADD_QUIZ = gql`
  mutation addQuiz($quizAuthor: ID!, $input: QuizInput!) {
    addQuiz(quizAuthor: $quizAuthor, input: $input) {
      _id
      quizAuthor
      description
      title
      imageURL
    }
  }`;

export const ADD_QUESTION = gql`
  mutation addQuestion($quizId: ID!, $input: QuestionInput!) {
    addQuestion(quizId: $quizId, input: $input) {
      _id
      questionText
      questionType
      timeLimit

      answers {
        answerText
      }
      correctAnswer
    }
  }`;