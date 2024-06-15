import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
app.use(router)

app.mount('#app')

watch(
    pinia.state,
    (state) => {
      if (state.queue){
        localStorage.setItem("queue", JSON.stringify(state.queue));
      }
      if (state.ride){
        localStorage.setItem("rides", JSON.stringify(state.ride, function replacer(key,value){
          var blocklist = ['next']
          return blocklist.indexOf(key) === -1 ? value : undefined
        }));
        // localStorage.setItem("ridenum", JSON.stringify(state.ride.rideNum));
      }
      if (state.excel){
        localStorage.setItem("excel", JSON.stringify(state.excel));
      }
      if (state.user){
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    { deep: true }
    );