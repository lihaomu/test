import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import * as Sentry from '@sentry/browser'
// import * as Integrations from '@sentry/integrations'
//
// Sentry.init({
//     dsn: 'https://0425a5e36b0a4038b1e9f522d85b3486@sentry.io/1689489',
//     integrations: [new Integrations.Vue({Vue, attachProps: true})],
// })

// import LogRocket from 'logrocket'
// LogRocket.init('7xsaxe/sgxq_ingame')
//
// LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
//     name: 'leoli@tenvine.cn',
//     email: 'leoli@tenvine.cn',
// });

import VuePreview from 'vue-preview'

Vue.use(VuePreview)

import './styles/index.less'

import leo from 'leo-ui'
import 'leo-ui/lib/leo-ui.css'

Vue.use(leo);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
