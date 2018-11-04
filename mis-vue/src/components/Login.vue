<template>
  <div class="container">
    <form class="form-signin" @submit.prevent="loggedin">
      <div class="alert alert-danger" v-show="errorMsg"><span class="glyphicon glyphicon-alert"></span><strong> {{ errorMsg }}</strong></div>
      <h2 class="form-signin-heading"><strong>Sign in to MIS</strong></h2>
      <label for="inputEmail">Email address</label>
      <input v-model="formData.email" type="email" class="form-control" placeholder="Email" required autofocus>
      <label for="inputPassword">Password</label>
      <input v-model="formData.pwd" type="password" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-warning btn-block" type="submit">Sign in</button>
    </form>
    <div class="foottext">
      <h3>Fisheep Studio</h3>
      <img :src="img" class="img-rounded" alt="LOGO">
      <p><small>REV.D _July 2018</small></p>
      <p><small>@V _1.0/EN</small></p>
    </div>
  </div>
</template>

<script>
import img from '../../static/images/fisheeplogo.png'
import axios from 'axios'
import _ from 'lodash'

export default {
  data () {
    return {
      img,
      formData: {
        email: '',
        pwd: ''
      },
      errorMsg: ''
    }
  },
  methods: {
    loggedin: _.debounce( async function () {
      try {
        const formData = this.formData
        const res = await axios.post('/api/session', formData)
        if (!res[0]) {
            this.errorMsg = 'Invalid Email or Password'
            this.formData.pwd = ''
            return
        }
        this.$router.push('/')
      } catch (err) {
        const {status} = err
        switch (status) {
          case 500:
            this.errorMsg = 'Server Error. Try Later.'
            break
        }
      }
    }, 500)
  }
}
</script>

<style>
body {
  padding-top: 40px;
  padding-bottom: 40px;
}
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin-heading {
  margin-bottom: 10px;
  text-align: center;
}
.foottext {
  text-align: center;
  margin-top: 60px;
}
.img-rounded {
  height: 45px;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>