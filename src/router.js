import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/map'
        },
        {
            path: '/map',
            name: 'MapView',
            component: () => import('./views/MapView.vue')
        },
        {
            path: '/live',
            name: 'LiveView',
            component: () => import('./views/LiveView.vue')
        },
        {
            path: '/time',
            name: 'TimeView',
            component: () => import('./views/TimeView.vue')
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => import('./views/NotFound.vue')
        }
    ]
})
