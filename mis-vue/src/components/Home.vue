<template>
    <div>
        <NavbarPage :isHome="isHome" :isDetail="isDetail" :isCont="isCont"/>
        <router-view @detailActive="getDetailParam" @homeActive="getHomeParam" @contActive="getContParam"></router-view>
    </div>
</template>

<script>
import NavbarPage from './Navbar.vue'

export default {
    components: {
        NavbarPage
    },
    data () {
        return {
            isHome: true,
            isDetail: false,
            isCont: false
        }
    },
    methods: {
        getDetailParam () {
            this.isDetail = true
            this.isHome = false
            this.isCont = false
        },
        getHomeParam () {
            this.isHome = true
            this.isDetail = false
            this.isCont = false
        },
        getContParam () {
            this.isCont = true
            this.isHome = false
            this.isDetail = false
        }
    }
}
</script>

<style>

</style>
