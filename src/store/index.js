import Vue from 'vue'
import Vuex from 'vuex'
//import ws from './utils/ws'
import pylody from './modules/pylody';
//import pylodyWS from './plugins/pylodyWS';
Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },
  mutations: {
    SOCKET_ONOPEN (state, event)  {
      console.log(event)
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event)  {
      console.log(event)
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event)  {
      console.log(event)
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      console.log(this,"message: ",message)
      state.socket.message = message


    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  actions: {
  },
  modules: {
    pylody
  },
 

})
