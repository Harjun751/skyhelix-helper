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
        localStorage.setItem("queue", JSON.stringify(state.queue.groups));
        localStorage.setItem("groupid", JSON.stringify(state.queue.id));
        localStorage.setItem("num_in_queue", JSON.stringify(state.queue.num_in_queue));
      }
      if (state.ride){
        localStorage.setItem("rides", JSON.stringify(state.ride.rides, function replacer(key,value){
          var blocklist = ['next']
          return blocklist.indexOf(key) === -1 ? value : undefined
        }));
        localStorage.setItem("ridenum", JSON.stringify(state.ride.rideNum));
      }
    },
    { deep: true }
    );