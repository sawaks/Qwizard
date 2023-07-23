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
      imgURL
      questions {
        _id
      }
      leaderboard {
        player
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
    editQuizDetails(quizId: $quizId, input: $input) {
      _id
      quizAuthor
      description
      title
      imgURL
      questions {
        _id
      }
      leaderboard {
        player
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
      timeLimit
      answers {
        answerText
      }
      correctAnswer
    }
  }
`;

export const ADD_QUIZ = gql`
  mutation addQuiz( $input: QuizInput!) {
    addQuiz( input: $input) {
      _id
      quizAuthor 
      description
      title
      imgURL
    }
  }`;

export const ADD_QUESTION = gql`
  mutation addQuestion($quizId: ID!, $input: QuestionInput!) {
    addQuestion(quizId: $quizId, input: $input) {
      _id
      questionText
      timeLimit
      answers {
        answerText
      }
      correctAnswer
    }
  }
`;

export const ADD_LEADERBOARD = gql`
  mutation addLeaderboard($quizId: ID!, $points: Int!) {
    addLeaderboard(quizId: $quizId, points: $points) {
      _id
      quizAuthor
      description
      title
      imgURL
      leaderboard {
        player
        points
      }
    }
  }
`;