import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Statistics from '../Statistics/Statistics';
import SessionSettings from '../SessionSettings/SessionSettings';
import Session from '../Session/Session';

import { Container, Box } from '@mui/material';
import './App.css';


function App() {

  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  // on load, gets user info
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  
  return (
    <Router>

        <Box 
          id="header"
          sx={{
            height: '12.5%',
            bgcolor:' #427df0',
            boxShadow: 2
          }}
        >
          <Header />
        </Box>

      <Container>
        <Box>
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
                <Redirect to="/home" />
                :
                <RegisterPage />
              }
            </Route>

            <ProtectedRoute exact path="/home">
              <HomePage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/options">
              <SessionSettings />
            </ProtectedRoute>

            <ProtectedRoute exact path="/session">
              <Session />
            </ProtectedRoute>

            <ProtectedRoute exact path="/stats">
              <Statistics />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
            
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
