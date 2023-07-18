import {gql} from '@apollo/client';

// GET_ME NEEDS UPDATING!!!!!!!
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
          bookId
          authors
          description
          title
          image
          link
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
      imageURL
      leaderboard {
        playerID
        points
      }
    }
  }
`;