import VueRouter from 'vue-router'
import LoginPage from './components/Login.vue'
import HomePage from './components/Home.vue'
import ListPage from './components/List.vue'
import DetailPage from './components/Detail.vue'
import ContributorPage from './components/Cont.vue'


export default new VueRouter({
    routes:[
        {
            path: '/login',
            component: LoginPage,
            meta: {allowBack: false}
        },
        {
            path: '/',
            component: HomePage,
            children: [
                {
                    name: 'list',
                    path: '',
                    component: ListPage
                },
                {
                    name: 'detail',
                    path: '/detail',
                    component: DetailPage
                },
                {
                    name: 'cont',
                    path: '/cont',
                    component: ContributorPage
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})