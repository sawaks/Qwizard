import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      
      createdQuizzes {
        _id
        quizAuthor
        description
        title
        imgURL
      }

      playedQuizzes {
        _id
        quizAuthor
        description
        title
        imgURL
      }
    }
  }
`;

export const GET_DB_QUIZZES = gql`
  query dbQuizzes {
    dbQuizzes {
      _id
      quizAuthor
      description
      title
      imgURL
      leaderboard {
        playerId
        points
      }
    }
  }
`;

export const GET_QUIZ_QUESTIONS = gql`
  query getQuizQuestions ($quizId: ID!) {
    getQuizQuestions (quizId: $quizId) {
      _id
      quizAuthor
      description
      title
      imgURL
      questions {
        _id
        questionText
        questionType
        timeLimit
        correctAnswer
        answers {
          answerText
        }
      }
    }
  }`;

export const GET_PLAYED_QUIZZES = gql`
  query getPlayedQuizzes {
    getPlayedQuizzes {
      _id
      quizAuthor
      description
      title
      imgURL
      leaderboard {
        playerId
        points
      }
    }
  }
`;

export const GET_LEADERBOARD = gql`
  query getLeaderboard ($quizId: ID!) {
    getLeaderboard (quizId: $quizId) {
      _id
      quizAuthor
      description
      title
      imgURL
      leaderboard {
        playerId
        points
      }
    }
  }
`;