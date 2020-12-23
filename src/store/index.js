import Vue from 'vue'
import Vuex from 'vuex'
import pylody from './modules/pylody';
Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    //socket: {}
    uid: null,
    action: {
      'uid': null,
      'mopidy_uri': "",
      settings: {}

    }
  },
  mutations: {

    SOCKET_ONOPEN(state, event) {
      console.log("SOCKET_ONOPEN", event)
    },
    SOCKET_newUID(state, message) {
      console.log("SOCKET_newUID", message)
      console.log(this, message)
      message = JSON.parse(message)
      state.uid = message.uid
      state.action = message.action
    },

    setSocket(state, socket) {
      state.socket = socket
    },
    testMessage(state, message) {
      state.socket.emit('clientQuestion', message)
    }

    /*
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
    },*/

  },
  actions: {

  },
  modules: {
    pylody
  },
  plugins: [
    //pylodyWS
  ]


})
