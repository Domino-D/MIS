import React from 'react'
import axios from 'axios'
import Logo from '../static/images/fisheeplogo.png'
import Logincss from '../css/login.scss'

export default class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pwd: '',
      errorMsg: ''
    }
  }

  login(e) {
    e.preventDefault()
    const formData = {
      email: this.state.email,
      pwd: this.state.pwd
    }
    const that = this
    axios.post('/api/session', formData)
      .then(function(res){
        if (!res[0]) {
          return that.setState({
            errorMsg: 'Invalid Email or Password',
            pwd: ''
          })
        }
        return that.props.history.push('/home')
      })
      .catch(function(err){
        const {status} = err
        switch (status) {
          case 500:
            that.setState({
              errorMsg: 'Server Error. Try Later.'
            })
            break
          case 504:
            that.setState({
              errorMsg: 'Connection timeout.'
            })
            break
        }
      })
  }

  emailChange() {
    const inputEmail = this.refs.email.value
    this.setState({
      email: inputEmail
    })
  }

  pwdChange() {
    const inputPwd = this.refs.pwd.value
    this.setState({
      pwd: inputPwd
    })
  }
  
  render() {
    return <div className="container">
    <form className={ Logincss.formsignin } onSubmit={ (e)=>this.login(e) }>
      {this.state.errorMsg==''?null:<div className="alert alert-danger"><span className="glyphicon glyphicon-alert"></span><strong> {this.state.errorMsg}</strong></div>}
      <h2 className={ Logincss.formsigninheading }><strong>Sign in to MIS</strong></h2>
      <label>Email address</label>
      <input type="email" className="form-control" placeholder="Email" required autoFocus value={this.state.email} onChange={ () => this.emailChange() } ref='email'/>
      <label>Password</label>
      <input type="password" className="form-control" placeholder="Password" required value={this.state.pwd} onChange={ () => this.pwdChange() } ref='pwd'/>
      <button className="btn btn-lg btn-warning btn-block" type="submit">Sign in</button>
    </form>
    <div className={ Logincss.foottext }>
      <h3>Fisheep Studio</h3>
      <img src={ Logo } className={ Logincss.imgrounded } alt="LOGO" />
      <p><small>REV.D _Aug 2018</small></p>
      <p><small>@V _1.0/EN</small></p>
    </div>
  </div>
  }
}