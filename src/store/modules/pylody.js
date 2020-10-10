import axios from 'axios';


const state = {
    timerID:null,
    currentRfidUID : 0,
    oldRfidUID : 0
  };
  
  const getters = {
  
  };
  
  const actions = {
   async startPolling({state,commit } ) {
    console.log("start...")
   
    function poll() {
      return axios.get("http://192.168.178.2:5000/rfid").then(response=> {
        commit('handlePollResponse',response.data);
      }).catch(function(err) {
       console.log(err)
      })
    }
    state.timerID = setInterval(
      poll
     , 1000);

   }
  };

  
  const mutations = {
    handlePollResponse(state,data) {
      state.currentRfidUID = data
      if (state.currentRfidUID != state.oldRfidUID) {
        alert("new UID")
        state.oldRfidUID = state.currentRfidUID
      }
      console.log(data)
    },

    newRfidUid (state,uid) {
      console.log(state,uid)
    }
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };
  