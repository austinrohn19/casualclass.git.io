import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header'
import homePage from './pages/homePage';
import Footer from './components/Footer';

import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path='/' component={homePage} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default App;
