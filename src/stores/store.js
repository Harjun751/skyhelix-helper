import { ref } from 'vue'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { Group, Ride } from '@/algo'

export const useQueueStore = defineStore('queue', () => {
  const groups = ref([]);
  const id = ref(1);
  const num_in_queue = ref(0);



  if (localStorage.getItem("queue")) {
    let json = JSON.parse(localStorage.getItem("queue"))
    groups.value = json.groups;
    id.value = json.id;
    num_in_queue.value = json.num_in_queue;
  }

  function addGroup(plus, normal, kids, nationality) {
    if (plus == 0 && normal == 0 && kids == 0){
      return;
    }
    groups.value.push(new Group(plus, normal, kids, nationality, id.value++));
    num_in_queue.value += (plus + normal + kids);
  }

  function updateGroup(plus, normal, kids,nationality, id) {
    let n = groups.value.findIndex(x => x.id == id);
    num_in_queue.value -= (groups.value[n].size);
    groups.value[n] = new Group(plus, normal, kids, nationality, id);
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
  const queueStore = useQueueStore();

  const latest_liftoff = ref(null);
  const rides = ref([]);
  const rideNum = ref(1);


  if (localStorage.getItem("rides")) {
    let json = JSON.parse(localStorage.getItem("rides"))
    rides.value = json.rides;
    rideNum.value = json.rideNum;
    latest_liftoff.value = json.latest_liftoff;
  }


  function liftoff() {
    let ride = rides.value[rides.value.length - 1]
    // set state to lifted-off
    ride.state = 1;
    ride.liftoff = Date.now();
    // cleanup queue store, remove lifted-off groups
    let groups = ride.groups;
    for (let x = 0; x < groups.length; x++) {
      let id = groups[x].id;
      queueStore.deleteGroup(id);
    }
    latest_liftoff.value = ride;
  }

  function addRide(groups, seats) {
    let latest_ride = rides.value[rides.value.length - 1];
    if (latest_ride != null && latest_ride.state == 0) {
      // update ride only
      let ride = new Ride(rideNum.value - 1, 0, null, groups, seats);
      rides.value.pop();
      rides.value.push(ride);
    } else {
      let ride = new Ride(rideNum.value++, 0, null, groups, seats);
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
      let time = new Date(latest_liftoff.value.liftoff);
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

  return { rides, liftoff, addRide, rideNum, nextLanding, deleteRides, latest_liftoff }
})
