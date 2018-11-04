import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './Navbar'
import List from './List'
import Detail from './Detail'
import Cont from './Cont'

export default class Home extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <Router>
        <div>
        <Navbar history={this.props.history}/>
          <Route exact path='/home' component={ List }/>
          <Route exact path='/home/detail' component={ Detail }/>
          <Route exact path='/home/cont' component={ Cont }/>
        </div>
      </Router>
    </div>
  }
}