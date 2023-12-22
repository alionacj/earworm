import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import HomePage from '../HomePage/HomePage';
import SessionOptions from '../SessionOptions/SessionOptions';
import Session from '../Session/Session';
import SessionReview from '../SessionReview/SessionReview';
import SessionHistory from '../SessionHistory/SessionHistory';
import Information from '../Information/Information';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>


          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/login" />

          <Route exact path="/login">
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>


          <Route exact path="/registration">
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <ProtectedRoute exact path="/home">
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/options">
            <SessionOptions />
          </ProtectedRoute>

          <ProtectedRoute exact path="/session">
            <Session />
          </ProtectedRoute>

          <ProtectedRoute exact path="/review">
            <SessionReview />
          </ProtectedRoute>

          <ProtectedRoute exact path="/history">
            <SessionHistory />
          </ProtectedRoute>

          <ProtectedRoute exact path="/info">
            <Information />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
          

        </Switch>
      </div>
    </Router>
  );
}

export default App;
