import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Leo from 'leo-ui'
import 'leo-ui/dist/css/app.css'

Vue.use(Leo);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
