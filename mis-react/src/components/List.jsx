import React from 'react'
import axios from 'axios'

export default class List extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            partsData: []
        }
    }

    componentWillMount() {
        const that = this
        axios.get('/api/partsdata')
        .then(function(res) {
            const filted = res.filter(item => {
                item.creation = item.creation.split('',10).join('')
                item.marks = item.marks == 'null'?'':item.marks
                return item
            })
            that.setState({
                partsData: filted
            })
        })
        .catch(function(err) {
            that.props.history.push('/home')
        })
    }

    render() {
        return <div className="container">
        <div className="page-header"></div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h1 className="panel-title"><strong> Latest Commits </strong><span className="label label-warning">New</span></h1>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-condensed table-bordered">
                    <thead>
                        <tr>
                            <th>Original NO.</th>
                            <th>Material NO.</th>
                            <th>Description</th>
                            <th>Vandor</th>
                            <th>Contributor</th>
                            <th>Creation Time</th>
                            <th>Marks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.partsData.map(item => <tr key={item.id}>
                                <td>{item.original}</td>
                                <td>{item.material}</td>
                                <td>{item.description}</td>
                                <td>{item.vandor}</td>
                                <td>{item.contributor}</td>
                                <td>{item.creation.split('',10).join('')}</td>
                                <td>{item.marks}</td>
                                <td>{item.status}</td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  }
}