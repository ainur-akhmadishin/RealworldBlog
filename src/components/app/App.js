import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/actions';
import ArticlesList from '../articlesList';
import Header from '../header';
import Article from '../article';
import SignIn from '../signIn';
import SignUp from '../signUp';
import UserEdit from '../userEdit';
import NewArticle from '../newArticle';
import ArticleEdit from '../articleEdit';
import PrivateRoute from '../private-route';
import classes from './App.module.scss';

const App = ({ getUser }) => {
  App.defaultProps = {
    getUser: () => {},
  };

  useEffect(() => {
    getUser();
  });

  return (
    <BrowserRouter>
      <Header />
      <div className={classes.App}>
        <Switch>
          <Route path={['/', '/articles']} exact component={ArticlesList} />
          <Route path="/article/:slug" component={Article} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" component={UserEdit} />
          <PrivateRoute path="/new-article" component={NewArticle} />
          <Route path="/articles/:slug/edit" component={ArticleEdit} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  getUser: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(getProfile()),
  };
}

export default connect(null, mapDispatchToProps)(App);
