import { ref } from 'vue'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { Group } from '@/algo'

export const useQueueStore = defineStore('queue', () => {
  const groups = ref([]);
  const id = ref(1);
  const num_in_queue = ref(0);



  if (localStorage.getItem("groupid")) {
    id.value = Number(localStorage.getItem("groupid"));
  }
  if (localStorage.getItem("queue")) {
    groups.value = JSON.parse(localStorage.getItem("queue"));
  }
  if (localStorage.getItem("num_in_queue")) {
    num_in_queue.value = JSON.parse(localStorage.getItem("num_in_queue"));
  }

  function addGroup(plus, normal, kids) {
    if (plus == 0 && normal == 0 && kids == 0){
      return;
    }
    groups.value.push(new Group(plus, normal, kids, id.value++));
    num_in_queue.value += (plus + normal + kids);
  }

  function updateGroup(plus, normal, kids, id) {
    let n = groups.value.findIndex(x => x.id == id);
    num_in_queue.value -= (groups.value[n].size);
    groups.value[n] = new Group(plus, normal, kids, id);
    num_in_queue.value += (plus, normal, kids);
  }

  function deleteGroup(id) {
    let n = groups.value.findIndex(x => x.id == Number(id));
    if (n > -1) {
      num_in_queue.value -= groups.value[n].size;
      groups.value.splice(n, 1);
    }
  }

  return { groups, addGroup, updateGroup, deleteGroup, id, num_in_queue }
})

export const useRideStore = defineStore('ride', () => {
  // ride format => [number, state, lift-off-time, [groups], seatplan]
  let latest_liftoff = ref(null);

  const rides = ref([]);
  if (localStorage.getItem("rides")) {
    rides.value = JSON.parse(localStorage.getItem("rides"));
  }
  const rideNum = ref(1);
  if (localStorage.getItem("ridenum")) {
    rideNum.value = Number(localStorage.getItem("ridenum"));
  }
  const queueStore = useQueueStore();


  function liftoff() {
    let ride = rides.value[rides.value.length - 1]
    // set state to lifted-off
    ride[1] = 1;
    ride[2] = Date.now();
    // cleanup queue store, remove lifted-off groups
    let groups = ride[3];
    for (let x = 0; x < groups.length; x++) {
      let id = groups[x].id;
      queueStore.deleteGroup(id);
    }
    latest_liftoff.value = ride;
  }

  function addRide(groups, seats) {
    let latest_ride = rides.value[rides.value.length - 1];
    if (latest_ride != null && latest_ride[1] == 0) {
      // update ride only
      let ride = [rideNum.value - 1, 0, null, groups, seats];
      rides.value.pop();
      rides.value.push(ride);
      // rides.value[rides.value.length - 1] = ride;
    } else {
      let ride = [rideNum.value++, 0, null, groups, seats];
      rides.value.push(ride);
    }
  }

  function deleteRides() {
    rides.value = [];
    latest_liftoff.value = null;
    rideNum.value = 1;
  }

  const nextLanding = computed(() => {
    if (latest_liftoff.value != null) {
      let time = new Date(latest_liftoff.value[2]);
      let land_time = new Date(time.getTime() + 12 * 60000);

      let hours = land_time.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      let minutes = land_time.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return String(hours) + String(minutes)
    }
    return null
  })

  const capacity = computed(() => {
    return Math.ceil(queueStore.num_in_queue / 16);
  })

  const waitTime = computed(() => {
    let time = new Date(latest_liftoff.value[2]);
    let land_time = new Date(time.getTime() + 12 * 60000);
    let next_free_ride = new Date(land_time.getTime() + capacity.value * 12 * 60000);
    var diff = Math.abs(new Date() - next_free_ride);
    var minutes = Math.floor((diff/1000)/60);
    return minutes
  })
  return { rides, liftoff, addRide, rideNum, nextLanding, deleteRides, capacity, waitTime }
})
