import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// import { Layout } from 'antd';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Leaderboard from './pages/Leaderboard';
import HomePage from './pages/Homepage';
import UserPage from './pages/Userpage';
import CreateQuiz from './pages/CreateQuiz';
import PlayQuizPage from './pages/PlayQuizPage';

// const { Header, Content, Footer } = Layout;

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>

      <Router>
        <div className="app-container">
          <AppHeader />
          <HelmetProvider>
            <Routes>
              <Route
                path='/'
                // path='/homepage'
                element={<HomePage />}
              />
              <Route
                // path='/'
                path='/myQuizzes'
                element={<UserPage />}
              />
              <Route
                path='/createQuiz'
                // path='/'
                element={<CreateQuiz />}
              />
              <Route
                path='/editQuiz/:quizId'
                // path='/'
                element={<CreateQuiz />}
              />
              <Route
                path='/Quiz/:quizId'
                // path='/'
                element={<PlayQuizPage />}
              />
              <Route
                path='/Leaderboard/:quizId'
                // path='/'
                element={<Leaderboard />}
              />
              {/* <Route path='/saved' element={<SavedBooks />} /> */}
              <Route
                path='*'
                element={<h1 className='display-2'>Wrong page!</h1>}
              />
            </Routes>
          </HelmetProvider>
          < AppFooter />

        </div>
      </Router>

    </ApolloProvider>
  );
}

export default App;
