import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
//import VueSocketIO from 'vue-socket.io'
//import SocketIO from 'socket.io-client'
Vue.config.productionTip = false

import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'ws://192.168.178.2:5000/ws', { store:store, reconnection: true, format: 'json',// (Boolean) whether to reconnect automatically (false)
//reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
//reconnectionDelay: 3000 // (Number) how long to initially wait before attempting a new (1000) })
});

new Vue({
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
