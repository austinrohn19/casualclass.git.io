//Import Needed Modules
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

<<<<<<< HEAD
import Header from './Containers/Header/Header'
import homePage from './pages/homePage';
import Footer from './Containers/Footer/Footer';
=======
//Import Components and Pages
import Header from './components/Header'
import homePage from './pages/homePage';
import Footer from './components/Footer';
import Login from './components/login/login'
import Register from './components/login/register'
>>>>>>> 718b4b30a3a014eb38901e42a8857a140c14452e

//Import Semantic UI CSS for all components and pages to use
import 'semantic-ui-css/semantic.min.css'

const httpLink = createHttpLink({
  uri: '/graphql'
})

// Create request middleware that will attach the JWT to every request as an authorization header
const authLink = setContext((_, { headers }) => {
  //get the token from local storage is it exists
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//Set up the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Switch>
            <Route exact path='/' component={homePage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
