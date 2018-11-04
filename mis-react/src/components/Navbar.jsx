import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbarcss from '../css/navbar.scss'

export default class Navbar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            identity: '',
            isHome: true,
            isDetail: false,
            isCont: false
        }
    }

    reloading() {
        this.props.history.push('/')
    }

    homeActive() {
        this.setState({
          isHome: true,
          isDetail: false,
          isCont: false
        })
    }
    
    detailActive() {
        this.setState({
          isHome: false,
          isDetail: true,
          isCont: false
        })
    }
    
    contActive() {
        this.setState({
          isHome: false,
          isDetail: false,
          isCont: true
        })
    }

    componentWillMount() {
        const that = this
        axios.get('/api/session')
            .then(function(res) {
                const [user] = res
                if (user) {
                    that.setState({
                        identity: user.identity.toUpperCase()
                    })
                }
            })
            .catch(function(err) {
                this.props.history.push('/')
            })
    }

    render() {
    return <div id={Navbarcss.outter}>
    <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">           
        <div className="navbar-header">
            <div className="dropdown navbar-brand">
                <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <span className="glyphicon glyphicon-th-list">MISMenu</span>
                </a>
                <div className="dropdown-menu">
                    <li className={this.state.isHome?'active':null} onClick={() => this.homeActive()}><Link to="/home"><span className="glyphicon glyphicon-home"> Home</span></Link></li>
                    <li className={this.state.isDetail?'active':null} onClick={() => this.detailActive()}><Link to="/home/detail"><span className="glyphicon glyphicon-tasks"> Details</span></Link></li>
                    <li className={this.state.isCont?'active':null} onClick={() => this.contActive()}><Link to="/home/cont"><span className="glyphicon glyphicon-pushpin"> Contributors</span></Link></li>
                </div>
            </div>
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbarcollapsetarget" aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
        </div>
        <div className="collapse navbar-collapse"  id="navbarcollapsetarget">
            <ul className="nav navbar-nav navbar-right">
                <li><a>{this.state.identity}</a></li>
                <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <span className="glyphicon glyphicon-user">User</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a id={Navbarcss.logout} onClick={ () => this.reloading() }><span className="glyphicon glyphicon-log-out"> Logout</span></a></li>
                </ul>
                </li>
            </ul>
        </div>
        </div>
    </nav>
</div>
  }
}