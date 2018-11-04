import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'


ReactDOM.render(
    <Router>
      <div>
        <Route exact path='/' component={ Login }/>
        <Route exact path='/home' component={ Home }/>
      </div>
    </Router>
, document.getElementById('app'))