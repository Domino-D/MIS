<template>
    <div class="container">
        <div class="page-header"></div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h1 class="panel-title"><strong> Latest Commits </strong><span class="label label-warning">New</span></h1>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-condensed table-bordered">
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
                        <tr v-for="item of partsData" :key="item.id">
                            <td>{{ item.original }}</td>
                            <td>{{ item.material }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.vandor }}</td>
                            <td>{{ item.contributor }}</td>
                            <td>{{ item.creation.split('',10).join('') }}</td>
                            <td>{{ item.marks }}</td>
                            <td>{{ item.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            partsData: []
        }
    },
    async beforeRouteEnter (to, from, next) {
        try {
                const res = await axios.get('/api/partsdata')
                const filted = res.filter(item => {
                    item.creation = item.creation.split('',10).join('')
                    item.marks = item.marks == 'null'?'':item.marks
                    return item
                })
                next(vm => {
                    vm.partsData = filted
                    vm.$emit('homeActive')
                })
            } catch (err) {
                next(vm => {
                    vm.$router.push('/login')
                })
            }
    }
}
</script>

<style>

</style>