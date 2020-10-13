<template>
  <v-col sm="12" md="8" xl="10" class="grey darken-3">
      RegisterActions...
      <v-btn @click="testAPI">click</v-btn>
  </v-col>  
</template>

<script>

import axios from 'axios';
  export default {
    name: 'RegisterActions',
    created: async function() {
      console.log("hier",this)
      
      //this.$store.dispatch("pylody/startPolling");
      
    },
    beforeDestroy: async function() {
      //await this.$store.dispatch("pylody/stopPolling");
    },
    data: () => ({

    }),
    methods: {
      /*
      senddata() {
        console.log("sending",this)
        this.$store.sockets.send('pylody',JSON.stringify({'command':'getLastUid'}))
      }*/
      

      testAPI() {
        axios.get("http://192.168.178.2:5000/rfid").then(response=> {
          console.log(response)
        })
      }
    }
  }
</script>
