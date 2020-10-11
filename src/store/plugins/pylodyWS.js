function createPylodyWebSocketPlugin(socket) {
    return store => {
        socket.on('data', data => {
            console.log("got data")
            store.commit('receiveData', data)
        })
        store.subscribe(mutation => {
            console.log("store changed !")
            if (mutation.type === 'UPDATE_DATA') {
                socket.emit('update', mutation.payload)
            }
        })
    }
}


import Emitter from './Emitter'


class PylodyWebSocket {
    constructor(prefix, connectionUrl, opts = {}) {
        this.format = opts.format && opts.format.toLowerCase()

        if (connectionUrl.startsWith('//')) {
            const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
            connectionUrl = `${scheme}:${connectionUrl}`
        }

        this.connectionUrl = connectionUrl
        this.opts = opts

        this.reconnection = this.opts.reconnection || false
        this.reconnectionAttempts = this.opts.reconnectionAttempts || Infinity
        this.reconnectionDelay = this.opts.reconnectionDelay || 1000
        this.reconnectTimeoutId = 0
        this.reconnectionCount = 0

        this.passToStoreHandler = this.opts.passToStoreHandler || false

        this.connect(connectionUrl, opts)

        if (opts.store) { this.store = opts.store }
        if (opts.mutations) { this.mutations = opts.mutations }
        this.onEvent()
    }

    connect (connectionUrl, opts = {}) {
        let protocol = opts.protocol || ''
        this.WebSocket = opts.WebSocket || (protocol === '' ? new WebSocket(connectionUrl) : new WebSocket(connectionUrl, protocol))
        if (this.format === 'json') {
          if (!('sendObj' in this.WebSocket)) {
            this.WebSocket.sendObj = (obj) => this.WebSocket.send(JSON.stringify(obj))
          }
        }
    
        return this.WebSocket
      }
    
      reconnect () {
        if (this.reconnectionCount <= this.reconnectionAttempts) {
          this.reconnectionCount++
          clearTimeout(this.reconnectTimeoutId)
    
          this.reconnectTimeoutId = setTimeout(() => {
            if (this.store) { this.passToStore('SOCKET_RECONNECT', this.reconnectionCount) }
    
            this.connect(this.connectionUrl, this.opts)
            this.onEvent()
          }, this.reconnectionDelay)
        } else {
          if (this.store) { this.passToStore('SOCKET_RECONNECT_ERROR', true) }
        }
      }
}

var pylodyWebSocket = function (url, options) {
    var websocket = new PylodyWebSocket(url, options);

    return createPylodyWebSocketPlugin(websocket);
}
  export default {
    pylodyWebSocket
};