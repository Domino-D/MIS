<template>
    <div>
        <div class="container">
            <div class="page-header"></div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h1 class="panel-title"><strong> Details </strong><button @click.prevent="toCreate" type="button" class="btn btn-success btn-xs pull-right">Create new data</button></h1>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped table-condensed table-bordered">
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
                            <tr v-for="item of partsData" :key="item.id">
                                <td>{{ item.original }}</td>
                                <td>{{ item.material }}</td>
                                <td>{{ item.description }}</td>
                                <td>{{ item.vandor }}</td>
                                <td>
                                    <div class="btn-group btn-group-xs">
                                        <button @click.prevent="toView(item.id)" type="button" title="details" class="btn btn-default"><span class="glyphicon glyphicon-option-horizontal"></span></button>
                                        <button @click.prevent="toEdit(item.id)" type="button" title="commit" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button>
                                        <button @click.prevent="toConfirm(item.id, item.original)" v-if="!isRoot" type="button" title="confirm" class="btn btn-success"><span class="glyphicon glyphicon-check"></span></button>
                                        <button @click.prevent="toDelete(item.id, item.original)" type="button" title="delete" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                    </table>
                </div>
                
            </div>
        </div>
        <div v-show="editing" id="item1" class="container">
            <div id="outter1" class="panel panel-primary">
                <div class="panel-heading">
                    <div class="page-header">
                    <button @click.prevent="notEdit" class="btn btn-danger pull-right"><span class="glyphicon glyphicon-remove"></span></button>
                    <h3><strong>Editing item</strong></h3>
                    </div>
                </div>
                <div class="panel-body">
                    <form method="POST" @submit.prevent="toSubmit">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Original NO. </strong></span>
                                        <input type="text" class="form-control" required v-model="dataDetail.original">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Material NO. </strong></span>
                                        <input type="text" class="form-control" required v-model="dataDetail.material">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Vandor </strong></span>
                                        <input type="text" class="form-control" required v-model="dataDetail.vandor">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" required v-model="dataDetail.description">
                        </div>
                        <div class="form-group">
                            <label>Marks</label>
                            <input type="text" class="form-control" v-model="dataDetail.marks">
                        </div>
                        <button type="submit" class="btn btn-warning pull-right"><strong> Submit </strong></button>
                    </form>
                </div>
            </div>
        </div>
        <div v-show="viewing" id="item2" class="container">
            <div id="outter2" class="panel panel-default">
                <div class="panel-heading">
                    <div class="page-header">
                    <button @click.prevent="notView" class="btn btn-danger pull-right"><span class="glyphicon glyphicon-remove"></span></button>
                    <h3><strong>Item details</strong></h3>
                    </div>
                </div>
                <div class="panel-body">
                    <form method="POST">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Original NO. </strong></span>
                                        <input type="text" class="form-control" disabled v-model="dataDetail.original">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Material NO. </strong></span>
                                        <input type="text" class="form-control" disabled v-model="dataDetail.material">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Vandor </strong></span>
                                        <input type="text" class="form-control" disabled v-model="dataDetail.vandor">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" disabled v-model="dataDetail.description">
                        </div>
                        <div class="form-group">
                            <label>Marks</label>
                            <input type="text" class="form-control" disabled v-model="dataDetail.marks">
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Status </strong></span>
                                        <input type="text" class="form-control" disabled v-model="dataDetail.status">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Contributor </strong></span>
                                        <input type="text" class="form-control" disabled v-model="dataDetail.contributor">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Creation Time </strong></span>
                                        <input type="text" class="form-control" disabled v-model="dataDetail.creation">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-show="creating" id="item3" class="container">
            <div id="outter3" class="panel panel-success">
                <div class="panel-heading">
                    <div class="page-header">
                    <button @click.prevent="notCreate" class="btn btn-danger pull-right"><span class="glyphicon glyphicon-remove"></span></button>
                    <h3><strong>Creating New Data</strong></h3>
                    </div>
                </div>
                <div class="panel-body">
                    <form method="POST" @submit.prevent="addData">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Original NO. </strong></span>
                                        <input type="text" class="form-control" required v-model="newData.original">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Material NO. </strong></span>
                                        <input type="text" class="form-control" required v-model="newData.material">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><strong> Vandor </strong></span>
                                        <input type="text" class="form-control" required v-model="newData.vandor">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" required v-model="newData.description">
                        </div>
                        <div class="form-group">
                            <label>Marks</label>
                            <input type="text" class="form-control" v-model="newData.marks">
                        </div>
                        <div class="alert alert-danger" v-show="exists"><span class="glyphicon glyphicon-alert"></span><strong>{{ exists }}</strong></div>
                        <button type="submit" class="btn btn-warning pull-right"><strong> Submit </strong></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            partsData: [],
            dataDetail: {},
            newData: {},
            isRoot: false,
            editing: false,
            viewing: false,
            creating: false,
            editingUser: {},
            exists: ''
        }
    },
    async beforeRouteEnter(to, from, next) {
        try {
            const [user] = await axios.get('/api/session')
            if (user.identity === 'admin') {
                const res = await axios.get('/api/partsdata')
                const filted = res.filter(item => {
                    item.creation = item.creation.split('',10).join('')
                    item.marks = item.marks == 'null'?'':item.marks
                    return item.contributor == user.email
                })
                next(vm => {
                    vm.partsData = filted
                    vm.isRoot = false
                    vm.editingUser = user
                    vm.$emit('detailActive')
                })
            }else{
                const res = await axios.get('/api/partsdata')
                const filted = res.filter(item => {
                    item.creation = item.creation.split('',10).join('')
                    item.marks = item.marks == 'null'?'':item.marks
                    return item.status == 'closed'
                })
                next(vm =>{
                    vm.partsData = filted
                    vm.isRoot = true
                    vm.editingUser = user
                    vm.$emit('detailActive')
                })
            }
        } catch (err) {
            next(vm => {
                vm.$router.push('/')
            })
        }
    },
    methods: {
        toEdit (_id) {
            const [dataDetail] = this.partsData.filter(item => {
                return item.id == _id
            })
            dataDetail.marks = dataDetail.marks == 'null'?'':dataDetail.marks
            this.dataDetail = dataDetail
            this.viewing = false
            this.creating = false
            this.editing = true
        },
        notEdit () {
            this.editing = false
        },
        toView (_id) {
            const [dataDetail] = this.partsData.filter(item => {
                return item.id == _id
            })
            dataDetail.marks = dataDetail.marks == 'null'?'':dataDetail.marks
            this.dataDetail = dataDetail
            this.editing = false
            this.creating = false
            this.viewing = true
        },
        notView () {
            this.viewing = false
        },
        toCreate () {
            this.newData = {}
            this.viewing = false
            this.editing = false
            this.creating = true
        },
        notCreate () {
            this.creating = false
            this.exists = ''
        },
        async addData () {
            const exists = await axios.get('/api/partsdata')
            const [exist] = exists.filter(item => {
                return item.original == this.newData.original||item.material == this.newData.material
            })
            if (exist) {
                return this.exists = 'Data exists'
            }
            if (!this.newData.marks) {
                this.newData.marks = null
            }
            const formData = this.newData
            const data = await axios.post('/api/partsdata', formData)
            if (data) {
                window.alert('New data saved')
                window.location.reload()
            }
        },
        async toConfirm (_id, num) {
            const forsure = confirm('Confirm for the original: ' + num)
            if (forsure) {
                const [dataDetail] = this.partsData.filter(item => {
                    return item.id == _id
                })
                await axios.post(`/api/partsdata/${_id}`, dataDetail)
                window.alert('One more data confirmed')
                window.location.reload()
            }else {
                return
            }
        },
        async toDelete (_id, num) {
            const forsure = confirm('Are you sure to delete the original: ' + num)
            if (forsure) {
                const res = await axios.get(`/api/partsdata/${_id}`)
                window.alert('One data deleted')
                window.location.reload()
            }else {
                return
            }
        },
        async toSubmit () {
            const formData = this.dataDetail
            const _id = formData.id
            formData.fromSub = this.isRoot===true?false:true
            this.notEdit()
            await axios.post(`/api/partsdata/${_id}`, formData)
            window.alert('One more data updated')
            window.location.reload()
        }
    }
}
</script>

<style>
#item1, #item2, #item3 {
    position: fixed;
    top: 80px;
    left: 0px;
    width: 100%;
}
#outter1, #outter2, #outter3 {
    margin-top: 10px;
    margin: 0 auto;
    max-width: 950px;
    min-width: 280px;
}
</style>
