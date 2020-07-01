import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'swiper/css/swiper.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router basename={''}>

      <Navbar />

      <Switch>
        <Route exact path={'/'}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
