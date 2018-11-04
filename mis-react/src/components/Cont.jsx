import React from 'react'
import axios from 'axios'
import Contcss from '../css/cont.scss'

export default class Cont extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            isRoot: true,
            creating: false,
            adminList: [],
            hasAccount: '',
            adminData: {
                email: '',
                pwd: ''
            }
        }
    }

    signUpPageShow () {
        this.setState({
            creating: true
        })
    }

    signUpPageHide () {
        const admin = {
            email: '',
            pwd: ''
        }
        this.setState({
            creating: false,
            adminData: admin
        })
    }

    changeEmail() {
        const emailInput = this.refs.newEmail.value
        const newAdmin = this.state.adminData
        newAdmin.email = emailInput
        this.setState({
            adminData: newAdmin
        })
    }
    
    changePwd() {
        const pwdInput = this.refs.newPwd.value
        const newAdmin = this.state.adminData
        newAdmin.pwd = pwdInput
        this.setState({
            adminData: newAdmin
        })
    }

    newAdmin() {
        const that = this
        axios.get('/api/user')
            .then(function(res) {
                const [filted] = res.filter(item => {
                    return item.email == that.state.adminData.email
                })
                if (filted) {
                    that.setState({
                        hasAccount: 'Existed Admin User'
                    })
                }else {
                    const formData = that.state.adminData
                    axios.post('/api/user', formData)
                    window.alert('New admin has been created.')
                    that.props.history.push('/home')
                    that.props.history.push('/home/cont')
                }
            })
    }

    deleteUser(item) {
        const _id = item.id
        const email = item.email
        const forsure = confirm('Are you sure to delete the user: ' + email)
        if (forsure) {
            axios.get(`/api/user/${_id}`)
            window.alert('User: ' + email + ' has been deleted')
            that.props.history.push('/home')
            that.props.history.push('/home/cont')
        }else {
            return
        }
    }

    componentWillMount() {
        const that = this
        axios.get('/api/session')
            .then(function(res) {
                const [user] = res
                if (user.identity === 'admin') {
                    that.setState({
                        isRoot: false
                    })
                }else {
                    axios.get('/api/user')
                        .then(function(resp) {
                            const filted = resp.filter(item => {
                                item.time = item.time.split('',10).join('')
                                return item
                            })
                            that.setState({
                                isRoot: true,
                                adminList: filted
                            })
                        })
                        .catch(function(err) {
                            window.alert('Something wrong with the connection, please try later.')
                            that.props.history.push('/home')
                            that.props.history.push('/home/cont')
                        })
                }
            })
            .catch(function(err) {
                window.alert('Something wrong with the connection, please try later.')
                that.props.history.push('/home')
                that.props.history.push('/home/cont')
            })
    }

    render() {
    return <div className="container">
    {this.props.contActive}
    <div className="page-header"></div>
    <div className="panel panel-info">
        <div className="panel-heading">
            <h1 className="panel-title"><strong> Contributor </strong></h1>
        </div>
        <div className="panel-body">
            <p><strong> Users Permissions </strong></p>
            <div className="table-responsive">
                <table className="table table-striped table-condensed table-bordered">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Details</th>
                            <th>Commit</th>
                            <th>Confirm</th>
                            <th>Pass</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Admin</td>
                            <td><span className="glyphicon glyphicon-ok"></span></td>
                            <td><span className="glyphicon glyphicon-ok"></span></td>
                            <td><span className="glyphicon glyphicon-ok"></span></td>
                            <td><span className="glyphicon glyphicon-ban-circle"></span></td>
                            <td><span className="glyphicon glyphicon-ok"></span></td>
                        </tr>
                        <tr>
                            <td>Root</td>
                            <td><span className="glyphicon glyphicon-ok"></span></td>
                            <td><span className="glyphicon glyphicon-ok"></span></td>
                            <td><span className="glyphicon glyphicon-ban-circle"></span></td>
                            <td><span className="glyphicon glyphicon-ok"></span></td>
                            <td><span className="glyphicon glyphicon-ok"></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {this.state.isRoot?<div>
                <p><strong> Admin Users List </strong></p>
                <div className="table-responsive">
                    <table className="table table-striped table-condensed table-bordered">
                        <thead>
                            <tr>
                                <th>Email Address</th>
                                <th>Created Time</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.adminList.map(item => <tr key={item.id}>
                                <td>{item.email}</td>
                                <td>{item.time}</td>
                            <td>{this.state.creating?null:<button type="button" title="delete user" className="btn btn-danger btn-xs" onClick={() =>this.deleteUser(item)}><span className="glyphicon glyphicon-remove"></span></button>}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                {this.state.creating?null:<button className="btn btn-success" onClick={() =>this.signUpPageShow()}>New Admin Sign up for MIS</button>}
            </div>:null}
            {this.state.creating?<div id={ Contcss.fixedpage } className="container">
                <div id={ Contcss.signpage } className="panel panel-default">
                    <div className="panel-body">
                        <div className="page-header">
                        <button className="btn btn-danger pull-right" onClick={() =>this.signUpPageHide()}><span className="glyphicon glyphicon-remove"></span></button>
                        <h3><strong>New Admin sign up</strong></h3>
                        </div>
                        <form id={ Contcss.newform } method="POST">
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" required placeholder="Email" value={this.state.adminData.email} onChange={() => this.changeEmail()} ref='newEmail'/>
                                {this.state.hasAccount?<p className="text-danger">{this.state.hasAccount}</p>:null}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" required placeholder="Password" value={this.state.adminData.pwd} onChange={() => this.changePwd()} ref='newPwd'/>
                            </div>
                            <button type="submit" className="btn btn-warning"  onClick={() =>this.newAdmin()}>Sign up</button>
                        </form>
                    </div>
                </div>
            </div>:null}
        </div>
    </div>
</div>
  }
}