import React from 'react'
import axios from 'axios'
import Detailcss from '../css/detail.scss'

export default class Detail extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            partsData: [],
            dataDetail: {},
            newData: {
                original: '',
                material: '',
                vandor: '',
                description: '',
                marks: ''
            },
            isRoot: false,
            editing: false,
            viewing: false,
            creating: false,
            editingUser: {},
            exists: ''
        }
    }

    toEdit(item) {
        item.marks = item.marks == 'null'?'':item.marks
        this.setState({
            dataDetail: item,
            viewing: false,
            creating: false,
            editing: true
        })
    }

    notEdit() {
        this.setState({
            editing: false
        })
    }

    toView(item) {
        item.marks = item.marks == 'null'?'':item.marks
        this.setState({
            dataDetail: item,
            viewing: true,
            creating: false,
            editing: false
        })
    }

    notView() {
        this.setState({
            viewing: false
        })
    }

    toCreate() {
        this.setState({
            newData: {},
            viewing: false,
            editing: false,
            creating: true
        })
    }

    notCreate() {
        this.setState({
            creating: false,
            exists: ''
        })
    }

    changeOriginal() {
        const dataDetail = this.state.dataDetail
        const ori = this.refs.original.value
        dataDetail.original = ori
        this.setState({
            dataDetail: dataDetail
        })
    }

    changeMaterial() {
        const dataDetail = this.state.dataDetail
        const mat = this.refs.material.value
        dataDetail.material = mat
        this.setState({
            dataDetail: dataDetail
        })
    }

    changeVandor() {
        const dataDetail = this.state.dataDetail
        const van = this.refs.vandor.value
        dataDetail.vandor = van
        this.setState({
            dataDetail: dataDetail
        })
    }

    changeDescription() {
        const dataDetail = this.state.dataDetail
        const des = this.refs.description.value
        dataDetail.description = des
        this.setState({
            dataDetail: dataDetail
        })
    }

    changeMarks() {
        const dataDetail = this.state.dataDetail
        const mar = this.refs.marks.value
        dataDetail.marks = mar
        this.setState({
            dataDetail: dataDetail
        })
    }

    createOriginal() {
        const newData = this.state.newData
        const ori = this.refs.newOriginal.value
        newData.original = ori
        this.setState({
            newData: newData
        })
    }

    createMaterial() {
        const newData = this.state.newData
        const mat = this.refs.newMaterial.value
        newData.material = mat
        this.setState({
            newData: newData
        })
    }

    createVandor() {
        const newData = this.state.newData
        const van = this.refs.newVandor.value
        newData.vandor = van
        this.setState({
            newData: newData
        })
    }

    createDescription() {
        const newData = this.state.newData
        const des = this.refs.newDescription.value
        newData.description = des
        this.setState({
            newData: newData
        })
    }

    createMarks() {
        const newData = this.state.newData
        const mar = this.refs.newMarks.value
        newData.marks = mar
        this.setState({
            newData: newData
        })
    }

    addData(e) {
        e.preventDefault()
        const that = this
        axios.get('/api/partsdata')
            .then(function(res) {
                const [exist] = res.filter(item => {
                    return item.original == that.state.newData.original||item.material == that.state.newData.material
                })
                if (exist) {
                    return that.setState({
                        exists: 'Data exists.'
                    })
                }
                if (!that.state.newData.marks) {
                    const data = that.state.newData
                    data.marks = null
                    that.setState({
                        newData: data
                    })
                }
                const formData = that.state.newData
                axios.post('/api/partsdata', formData)
                    .then(function(resp) {
                        if (resp) {
                            window.alert('New data saved')
                            that.props.history.push('/home')
                            that.props.history.push('/home/detail')
                        }
                    })
                    .catch(function(err) {
                        window.alert('New data can not be saved, please try later.')
                    })
            })
            .catch(function(err) {
                window.alert('Something wrong with the connection, please try later.')
            })
    }

    toConfirm (item) {
        const _id =item.id
        const num = item.original
        const that = this
        const forsure = confirm('Confirm for the original: ' + num)
        if (forsure) {
            const [dataDetail] = that.state.partsData.filter(item => {
                return item.id == _id
            })
            axios.post(`/api/partsdata/${_id}`, dataDetail)
                .then(function(res) {
                    window.alert('One more data confirmed')
                    that.props.history.push('/home')
                    that.props.history.push('/home/detail')
                })
                .catch(function(err) {
                    window.alert('Something wrong with the connection, please try later.')
                })
        }else {
            return
        }
    }

    toDelete (item) {
        const _id =item.id
        const num = item.original
        const that = this
        const forsure = confirm('Are you sure to delete the original: ' + num)
        if (forsure) {
            axios.get(`/api/partsdata/${_id}`)
                .then(function(res) {
                    window.alert('One data deleted')
                    that.props.history.push('/home')
                    that.props.history.push('/home/detail')
                })
                .catch(function(err) {
                    window.alert('Something wrong with the connection, please try later.')
                })
        }else {
            return
        }
    }

    toSubmit () {
        const formData = this.state.dataDetail
        const _id = formData.id
        formData.fromSub = this.state.isRoot===true?false:true
        this.notEdit()
        const that = this
        axios.post(`/api/partsdata/${_id}`, formData)
            .then(function(res) {
                window.alert('One more data updated')
                that.props.history.push('/home')
                that.props.history.push('/home/detail')
            })
            .catch(function(err) {
                window.alert('Something wrong with the connection, please try later.')
            })
    }

    componentDidMount() {
        const that = this
        axios.get('/api/session')
            .then(function(res) {
                const [user] = res
                if (user.identity === 'admin') {
                    axios.get('/api/partsdata')
                        .then(function(resp) {
                            const filted = resp.filter(item => {
                                item.creation = item.creation.split('',10).join('')
                                item.marks = item.marks == 'null'?'':item.marks
                                return item.contributor == user.email
                            })
                            that.setState({
                                partsData: filted,
                                isRoot: false,
                                editingUser: false
                            })
                        })
                }else{
                    axios.get('/api/partsdata')
                        .then(function(resp) {
                            const filted = resp.filter(item => {
                                item.creation = item.creation.split('',10).join('')
                                item.marks = item.marks == 'null'?'':item.marks
                                return item.status == 'active'||item.contributor == user.email
                            })
                            that.setState({
                                partsData: filted,
                                isRoot: true,
                                editingUser: user
                            })
                        })
                }
            })
            .catch (function(err) {
                that.props.history.push('/home')
            })
    }

    render() {
    return <div>
    <div className="container">
    {this.props.detailActive}
        <div className="page-header"></div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h1 className="panel-title"><strong> Details </strong><button type="button" className="btn btn-success btn-xs pull-right" onClick={() =>this.toCreate()}>Create new data</button></h1>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-condensed table-bordered">
                    <thead>
                        <tr>
                            <th>Original NO.</th>
                            <th>Material NO.</th>
                            <th>Description</th>
                            <th>Vandor</th>
                            <th>Operations Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.partsData.map(item =><tr key={item.id}>
                            <td>{item.original}</td>
                            <td>{item.material}</td>
                            <td>{item.description}</td>
                            <td>{item.vandor}</td>
                            <td>
                                <div className="btn-group btn-group-xs">
                                    {this.state.viewing?null:<button type="button" title="details" className="btn btn-default" onClick={ () =>this.toView(item)}><span className="glyphicon glyphicon-option-horizontal"></span></button>}
                                    {this.state.editing?null:<button type="button" title="commit" className="btn btn-primary" onClick={ () =>this.toEdit(item)}><span className="glyphicon glyphicon-pencil"></span></button>}
                                    {this.state.isRoot?<button type="button" title="confirm" className="btn btn-success" onClick={ () =>this.toConfirm(item)}><span className="glyphicon glyphicon-check"></span></button>:null}
                                    <button type="button" title="delete" className="btn btn-danger" onClick={ () =>this.toDelete(item)}><span className="glyphicon glyphicon-remove"></span></button>
                                </div>
                            </td>
                        </tr>)}
                        </tbody>
                </table>
            </div>
            
        </div>
    </div>
    {this.state.editing?<div id={ Detailcss.item1 } className="container">
        <div id={ Detailcss.outter1 } className="panel panel-primary">
            <div className="panel-heading">
                <div className="page-header">
                <button className="btn btn-danger pull-right" onClick={ () =>this.notEdit() }><span className="glyphicon glyphicon-remove"></span></button>
                <h3><strong>Editing item</strong></h3>
                </div>
            </div>
            <div className="panel-body">
                <form onSubmit={(e) =>this.toSubmit(e)}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Original NO. </strong></span>
                                    <input type="text" className="form-control" required value={this.state.dataDetail.original} onChange={() =>this.changeOriginal()} ref='original'/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Material NO. </strong></span>
                                    <input type="text" className="form-control" required value={this.state.dataDetail.material} onChange={() =>this.changeMaterial()} ref='material'/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Vandor </strong></span>
                                    <input type="text" className="form-control" required value={this.state.dataDetail.vandor} onChange={() =>this.changeVandor()} ref='vandor'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" required value={this.state.dataDetail.description} onChange={() =>this.changeDescription()} ref='description'/>
                    </div>
                    <div className="form-group">
                        <label>Marks</label>
                        <input type="text" className="form-control" value={this.state.dataDetail.marks} onChange={() =>this.changeMarks()} ref='marks'/>
                    </div>
                    <button type="submit" className="btn btn-warning pull-right"><strong> Submit </strong></button>
                </form>
            </div>
        </div>
    </div>:null}
    {this.state.viewing?<div id={ Detailcss.item2 } className="container">
        <div id={ Detailcss.outter2 } className="panel panel-default">
            <div className="panel-heading">
                <div className="page-header">
                <button className="btn btn-danger pull-right" onClick={ () =>this.notView() }><span className="glyphicon glyphicon-remove"></span></button>
                <h3><strong>Item details</strong></h3>
                </div>
            </div>
            <div className="panel-body">
                <form method="POST">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Original NO. </strong></span>
                                    <input type="text" className="form-control" disabled placeholder={this.state.dataDetail.original}/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Material NO. </strong></span>
                                    <input type="text" className="form-control" disabled placeholder={this.state.dataDetail.material}/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Vandor </strong></span>
                                    <input type="text" className="form-control" disabled placeholder={this.state.dataDetail.vandor}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" disabled placeholder={this.state.dataDetail.description}/>
                    </div>
                    <div className="form-group">
                        <label>Marks</label>
                        <input type="text" className="form-control" disabled placeholder={this.state.dataDetail.marks}/>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Status </strong></span>
                                    <input type="text" className="form-control" disabled placeholder={this.state.dataDetail.status}/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Contributor </strong></span>
                                    <input type="text" className="form-control" disabled placeholder={this.state.dataDetail.contributor}/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Creation Time </strong></span>
                                    <input type="text" className="form-control" disabled placeholder={this.state.dataDetail.creation}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>:null}
    {this.state.creating?<div id={ Detailcss.item3 } className="container">
        <div id={ Detailcss.outter3 } className="panel panel-success">
            <div className="panel-heading">
                <div className="page-header">
                <button className="btn btn-danger pull-right" onClick={ () =>this.notCreate() }><span className="glyphicon glyphicon-remove"></span></button>
                <h3><strong>Creating New Data</strong></h3>
                </div>
            </div>
            <div className="panel-body">
                <form onSubmit={(e) => this.addData(e)}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Original NO. </strong></span>
                                    <input type="text" className="form-control" required value={this.state.newData.original} onChange={() => this.createOriginal()} ref='newOriginal'/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Material NO. </strong></span>
                                    <input type="text" className="form-control" required value={this.state.newData.material} onChange={() => this.createMaterial()} ref='newMaterial'/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-addon"><strong> Vandor </strong></span>
                                    <input type="text" className="form-control" required value={this.state.newData.vandor} onChange={() => this.createVandor()} ref='newVandor'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" required value={this.state.newData.description} onChange={() => this.createDescription()} ref='newDescription'/>
                    </div>
                    <div className="form-group">
                        <label>Marks</label>
                        <input type="text" className="form-control" value={this.state.newData.marks} onChange={() => this.createMarks()} ref='newMarks'/>
                    </div>
                    {this.state.exists?<div className="alert alert-danger"><span className="glyphicon glyphicon-alert"></span><strong>{this.state.exists}</strong></div>:null}
                    <button type="submit" className="btn btn-warning pull-right"><strong> Submit </strong></button>
                </form>
            </div>
        </div>
    </div>:null}
</div>
  }
}