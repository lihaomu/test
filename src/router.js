import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/live'
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
            path: '/three',
            name: 'ThreeView',
            component: () => import('./views/ThreeView.vue')
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => import('./views/NotFound.vue')
        }
    ]
})
