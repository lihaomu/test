import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import leo from 'leo-ui'
import 'leo-ui/dist/css/app.css'

// import mui from 'vue-awesome-mui'
// import 'vue-awesome-mui/mui/dist/css/mui.css'

import VueHtml5Plus from 'vue-html5plus'

Vue.use(leo);
// Vue.use(mui);
Vue.use(VueHtml5Plus);

window.AV = require('leancloud-storage');

AV.init({
    appId: 'Uf0P2hwIWi702aa0ga5qjeWy-gzGzoHsz',
    appKey: '7M2aarAvQIy2zCH08V7W9T6G'
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
