<template>
    <div class="container">
        <div class="page-header"></div>
        <div class="panel panel-info">
            <div class="panel-heading">
                <h1 class="panel-title"><strong> Contributor </strong></h1>
            </div>
            <div class="panel-body">
                <p><strong> Users Permissions </strong></p>
                <div class="table-responsive">
                    <table class="table table-striped table-condensed table-bordered">
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
                                <td><span class="glyphicon glyphicon-ok"></span></td>
                                <td><span class="glyphicon glyphicon-ok"></span></td>
                                <td><span class="glyphicon glyphicon-ok"></span></td>
                                <td><span class="glyphicon glyphicon-ban-circle"></span></td>
                                <td><span class="glyphicon glyphicon-ok"></span></td>
                            </tr>
                            <tr>
                                <td>Root</td>
                                <td><span class="glyphicon glyphicon-ok"></span></td>
                                <td><span class="glyphicon glyphicon-ok"></span></td>
                                <td><span class="glyphicon glyphicon-ban-circle"></span></td>
                                <td><span class="glyphicon glyphicon-ok"></span></td>
                                <td><span class="glyphicon glyphicon-ok"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <template v-if="isRoot">
                <p><strong> Admin Users List </strong></p>
                <div class="table-responsive">
                    <table class="table table-striped table-condensed table-bordered">
                        <thead>
                            <tr>
                                <th>Email Address</th>
                                <th>Created Time</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of adminList" :key="item.id">
                                <td>{{ item.email }}</td>
                                <td>{{ item.time }}</td>
                                <td><button @click.prevent="deleteUser(item.id, item.email)" type="button" title="delete user" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </template>
                <button v-show="isRoot&&!creating" class="btn btn-success"  @click.prevent="signUpPageShow">New Admin Sign up for MIS</button>
                <div id="fixedpage" class="container">
                    <div v-show="creating" id="signpage" class="panel panel-default">
                        <div class="panel-body">
                            <div class="page-header">
                            <button class="btn btn-danger pull-right" @click.prevent="signUpPageHide"><span class="glyphicon glyphicon-remove"></span></button>
                            <h3><strong>New Admin sign up</strong></h3>
                            </div>
                            <form id="newform" method="POST" @submit.prevent="newAdmin">
                                <div class="form-group">
                                    <label>Email address</label>
                                    <input type="email" class="form-control" v-model="adminData.email" required placeholder="Email">
                                    <p v-show="hasAccount" class="text-danger">{{ hasAccount }}</p>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control" v-model="adminData.pwd" required placeholder="Password">
                                </div>
                                <button type="submit" class="btn btn-warning">Sign up</button>
                            </form>
                        </div>
                    </div>
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
            isRoot: true,
            creating: false,
            adminList: [],
            hasAccount: '',
            adminData: {
                email: '',
                pwd: ''
            }
        }
    },
    async beforeRouteEnter(to, from, next) {
        try {
            const [user] = await axios.get('/api/session')
            if (user.identity === 'admin') {
                next(vm => {
                    vm.isRoot = false
                    vm.$emit('contActive')
                })
            }else {
                const users = await axios.get('/api/user')
                const filted = users.filter(item => {
                    item.time = item.time.split('',10).join('')
                    return item
                })
                next(vm => {
                    vm.isRoot = true
                    vm.adminList = filted
                    vm.$emit('contActive')
                })
            }
        } catch (err) {
            next(vm => {
                vm.$router.push('/')
            })
        }
    },
    methods: {
        signUpPageShow () {
            return this.creating = true
        },
        signUpPageHide () {
            return this.creating = false
        },
        newAdmin: _.debounce(async function () {
            const users = await axios.get('/api/user')
            const [filted] = users.filter(item => {
                return item.email == this.adminData.email
            })
            if (filted) {
                this.hasAccount = 'Existed Admin User'
            }else {
                const formData = this.adminData
                await axios.post('/api/user', formData)
                window.alert('New admin has been created.')
            }
        }),
        async deleteUser(_id, email) {
            const forsure = confirm('Are you sure to delete the user: ' + email)
            if (forsure) {
                await axios.get(`/api/user/${_id}`)
                window.alert('User: ' + email + ' has been deleted')
                window.location.reload()
            }else {
                return
            }
        }
    }
}
</script>

<style>
#signpage {
    margin-top: 10px;
    margin: 0 auto;
    max-width: 400px;
    min-width: 280px;
}
#newform {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
#fixedpage {
    position: fixed;
    top: 160px;
    left: 0px;
    width: 100%;
}
</style>