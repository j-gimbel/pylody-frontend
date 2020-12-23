<template>
  <v-col sm="12" md="8" xl="10" class="grey darken-3">
    RegisterActions...
    <v-btn @click="testAPI">click</v-btn>
  </v-col>
</template>

<script>
export default {
  name: "RegisterActions",
  /*
  sockets: {
    serverAnswer: function (data) {
      console.log(data);
    },
  },
  created: async function () {
    console.log("hier", this);
    this.sockets.subscribe("serverAnswer", (data) => {
      console.log(data);
    });
  },
  */

  data: () => ({}),
  methods: {
    /*
      senddata() {
        console.log("sending",this)
        this.$store.sockets.send('pylody',JSON.stringify({'command':'getLastUid'}))
      }*/

    testAPI() {
      console.log(this.$socket);

      //this.$socket.emit('clientQuestion',{'some':'data'})
      //this.$store.commit("setSocket", this.$socket);
      //this.$store.commit("testMessage", "lala");
    },
  },
};
</script>
