<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">           
            <div class="navbar-header">
                <div class="dropdown navbar-brand">
                    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span class="glyphicon glyphicon-th-list">MISMenu</span>
                    </a>
                    <div class="dropdown-menu">
                        <li :class="{ active: isHome }"><router-link to="/"><span class="glyphicon glyphicon-home"> Home</span></router-link></li>
                        <li :class="{ active: isDetail }"><router-link to="/detail"><span class="glyphicon glyphicon-tasks"> Details</span></router-link></li>
                        <li :class="{ active: isCont }"><router-link to="/cont"><span class="glyphicon glyphicon-pushpin"> Contributors</span></router-link></li>
                    </div>
                </div>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbarcollapsetarget" aria-expanded="false">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse"  id="navbarcollapsetarget">
                <ul class="nav navbar-nav navbar-right">
                    <li v-if="identity"><a>{{ identity }}</a></li>
                    <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span class="glyphicon glyphicon-user">User</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li v-if="!islogin"><router-link to="/login"><a><span class="glyphicon glyphicon-log-in"> Login</span></a></router-link></li>
                        <li v-if="islogin"><a href="#" @click.prevent="logOut"><span class="glyphicon glyphicon-log-out"> Logout</span></a></li>
                    </ul>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: [
        'isHome',
        'isDetail',
        'isCont'
    ],
    data () {
        return {
            homeactive: true,
            detailactive: false,
            contributoractive: false,
            islogin: false,
            identity: ''
        }
    },
    created () {
        this.checkSession()
    },
    methods: {
        async checkSession () {
            const [user] = await axios.get('/api/session')
            if (user) {
                this.islogin = true
                this.identity = user.identity.toUpperCase()
            }
        },
        async logOut () {
            await axios.get('/api/session/delete')
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>
