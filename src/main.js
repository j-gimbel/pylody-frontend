import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
Vue.config.productionTip = false

import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'ws://192.168.178.2:6680/mopidy/ws', { connectManually: true// (Boolean) whether to reconnect automatically (false)
//reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
//reconnectionDelay: 3000 // (Number) how long to initially wait before attempting a new (1000) })
});


class VueNativeSockManager {
  constructor(vueInstance) {
    this.v = vueInstance
    this.sockets = {}
  }
   
  addWebSocket (name,uri,settings) {
    this.v.$connect(uri,settings)
    this.sockets[name] = {
      instance : this.v.$socket,
      settings : settings
    }
    this.sockets[name].instance.onmessage = message => { 
      console.log(this,message) 
      console.log(this.sockets[name].settings.format)
      let data = message.data
      if (this.sockets[name].settings.format == "json") {
        data = JSON.parse(data)
      }
      this.v.$store.commit("pylody/handleMessage",data)
    }
  }

  send(name,message) {
    this.sockets[name].instance.send(message)

  }

}




new Vue({
  vuetify,
  store,
  render: h => h(App),
  created: function () {
    console.log("created",this)
    const vueNativeSockManager = new VueNativeSockManager(this)
    vueNativeSockManager.addWebSocket('pylody','ws://192.168.178.2:5000/ws', {format: 'json'})
    this.$store.sockets = vueNativeSockManager
    /*this.$connect('ws://192.168.178.2:5000/ws', { format: 'json', store:store})
    this.$store.ws1 = this.$socket
    this.$connect('ws://192.168.178.2:6680/mopidy/ws', { format: 'json', store:store})
    this.$store.ws2 = this.$socket
    this.$store.ws2.onmessage = data => { console.log(data) }*/
    
  }
}).$mount('#app')
