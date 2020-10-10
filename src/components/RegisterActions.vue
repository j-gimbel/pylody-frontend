<template>
  <v-col sm="12" md="8" xl="10" class="grey darken-3">
      RegisterActions...
      <v-btn @click="senddata">click</v-btn>
  </v-col>  
</template>

<script>
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
      
      senddata() {
        console.log("sending")
        this.$socket.send(JSON.stringify({'command':'getLastUid'}))
      }
      
    }
  }
</script>
