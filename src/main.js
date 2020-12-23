import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
Vue.config.productionTip = false
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import Mopidy from "mopidy";

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://192.168.178.2:5000', { path: '/ws/socket.io' }), //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);

const mopidy = new Mopidy({
  webSocketUrl: "ws://192.168.178.2:6680/mopidy/ws/",
});
console.log(mopidy);
mopidy.on("state", (e) => { console.log("state", e) });
mopidy.on("event", (e, data) => { console.log("event", e, data) });
mopidy.on("event:playbackStateChanged", (data) => { console.log("event:playbackStateChanged", data, JSON.stringify(data)) });
mopidy.on("event:trackPlaybackPaused", (data) => { console.log("event:trackPlaybackPaused", data, JSON.stringify(data)) });
mopidy.on("event:trackPlaybackStarted", (data) => {
  console.log("event:trackPlaybackStarted", data, JSON.stringify(data))
  /*
  const data =
  {
    "tl_track": {
      "__model__": "TlTrack", "tlid": 248,
      "track": {
        "__model__": "Track", "uri": "spotify:track:31O4NbahN7tUYsQVXa7daV", "name": "Inhaltsangabe: Der Dinosaurierknochen (Folge 139)",
        "artists": [
          {
            "__model__": "Artist", "uri": "spotify:artist:1l6d0RIxTL3JytlLGvWzYe", "name": "Benjamin Blümchen"
          }
        ]
        , "album": {
          "__model__": "Album", "uri": "spotify:album:4qQbfYDSaexEwY7dI95qMi", "name": "Folge 139: Der Dinosaurierknochen",
          "artists": [{
            "__model__": "Artist", "uri": "spotify:artist:1l6d0RIxTL3JytlLGvWzYe", "name": "Benjamin Blümchen"
          }]
          , "date": "2018"
        }, "track_no": 1, "disc_no": 1, "date": "2018", "length": 24000, "bitrate": 160
      }
    }
  }*/

});
mopidy.on("state:online", (e) => { console.log("state:online", e); })


new Vue({
  vuetify,
  store,
  render: h => h(App),
  created: function () {
    console.log("created", this)

    /*this.mopidy = new Mopidy({
      webSocketUrl: "ws://192.168.178.2:6680/mopidy/ws/",
    });
    console.log(this.mopidy)
    this.mopidy.on("state", console.log);*/
  }
}).$mount('#app')
