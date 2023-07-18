//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//// NEEDS UPDATING!!!!!
//// Needs  update to routing mianly
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////



import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

import HomePage from './pages/Homepage';
import CreateQuiz from './pages/CreateQuiz';
// import SearchBooks from './pages/SearchBooks';
// import SavedBooks from './pages/SavedBooks';

const { Header, Content, Footer } = Layout;

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
        <>
          <Layout>
            <Header className='header-style' style={{height: 'fit-content'}}><AppHeader /></Header>
            <Routes>
              <Route
                path='/homepage'
                // path='/'
                element={<HomePage />}
              />
              <Route
                path='/'
                // path='/createQuiz'
                element={<CreateQuiz />}
              />
              <Route
                path='*'
                element={<h1 className='display-2'>Wrong page!</h1>}
              />
            </Routes>
            <Footer className='footer-style'>< AppFooter /></Footer>
          </Layout>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
