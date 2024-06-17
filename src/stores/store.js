import { ref } from 'vue'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { Group, Ride, SuspensionStart, SuspensionEnd } from '@/algo'


export const usePrefStore = defineStore('user', () => {
  let db;
  const request = indexedDB.open("configData", 2);
  var rollCallStore;
  request.onerror = (event) => {
    console.error(event);
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    const transac = db.transaction(["rollCall"], "readonly");
    let store = transac.objectStore("rollCall")
    const req2 = store.openCursor();
    let arr = [];
    req2.onsuccess = (event) =>{
      let cursor = event.target.result;
      if (cursor) {
          let key = cursor.primaryKey;
          let value = cursor.value;
          value["id"] = key;
          arr.push(value)
          cursor.continue();
      }
      else {
          // no more results
          console.log(arr);
          roll_call.value = arr;
      }
    }
  };
  request.onupgradeneeded = (event) => {
    // Save the IDBDatabase interface
    db = event.target.result;
  
    // Create an objectStore for this database
    db.createObjectStore("seatConfig");
    rollCallStore = db.createObjectStore("rollCall", { autoIncrement: true });
    rollCallStore.createIndex("name", "name", {unique:false});
    rollCallStore.createIndex("staffid", "staffid", { unique:false});
    rollCallStore.createIndex("type", "type", { unique:false});
    
    db.onerror = (event) => {
      // Generic error handler for all errors targeted at this database's
      // requests!
      console.error(`Database error: ${event.target.errorCode}`);
    };
  };
  
  const default_option = ref("India");
  const theme = ref("blue");
  const seat_config = ref({ 
    1: 'Normal',
    2: 'Normal',
    3: 'Normal',
    4: 'Normal',
    5: 'Long',
    6: 'Long',
    7: 'Normal',
    8: 'Normal',
    9: 'Normal',
    10: 'Long',
    11: 'Normal',
    12: 'Normal',
    13: 'Short',
    14: 'Short',
    15: 'Long',
    16: 'Short',
  })
  const roll_call = ref({ })

  if (localStorage.getItem("user")) {
    let json = JSON.parse(localStorage.getItem("user"))
    default_option.value = json.default_option;
    theme.value = json.theme;
    seat_config.value = json.seat_config;
  }

  function addEmployee(name,staffid, type){
    const transaction = db.transaction(["rollCall"], "readwrite");
    const objectStore = transaction.objectStore("rollCall");
    const request = objectStore.add({ "name":name, "staffid":staffid, "type":type});
    request.onsuccess = () => {
      roll_call.value.push({ "id":request.result, "name":name, "staffid":staffid, "type":type});
    };
  }

  function deleteEmployee(id){
    let transaction = db.transaction(["rollCall"], "readwrite");
    let request = transaction.objectStore("rollCall").delete(id);
    transaction.oncomplete = () => {
      console.log("deleted!");
      roll_call.value = roll_call.value.filter(x=>x.id!=id);
    };
  }

  return { default_option, theme, seat_config, roll_call, addEmployee, deleteEmployee }
})

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
  const total_pax = ref(0);
  const breakdown = ref({});
  const isSuspended = ref(null);


  if (localStorage.getItem("rides")) {
    let json = JSON.parse(localStorage.getItem("rides"))
    rides.value = json.rides;
    rideNum.value = json.rideNum;
    latest_liftoff.value = json.latest_liftoff;
    isSuspended.value = json.isSuspended;
    if (json.total_pax!=null){
      total_pax.value = Number(json.total_pax);
    }
    total_pax.value = json.total_pax;
    if (json.breakdown!=null){
      breakdown.value = json.breakdown;
    }
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
      let group = ride.groups[x];
      if (breakdown.value[group.nationality] == null){
        breakdown.value[group.nationality] = { "K": group.kids, "A": group.plus_size + group.normal}
        total_pax.value += group.kids + group.plus_size + group.normal
      } else {
        breakdown.value[group.nationality]["K"] = breakdown.value[group.nationality]["K"] + group.kids;
        breakdown.value[group.nationality]["A"] = breakdown.value[group.nationality]["A"] + group.plus_size + group.normal;
        total_pax.value += group.kids + group.plus_size + group.normal
      }
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
    breakdown.value = { };
    total_pax.value = 0;
    isSuspended.value = null;
  }

  function suspendRide(){
    let start = new Date();
    let suspension = new SuspensionStart(start);
    if (rides.value[rides.value.length - 1].state == 0){
      rides.value.pop();
    }
    rides.value.push(suspension);
    isSuspended.value = suspension;
    // remove all pending rides
  }

  function unSuspend(){
    let end = new Date();
    let endSuspension = new SuspensionEnd(end);
    rides.value.push(endSuspension);
    isSuspended.value = null;
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

  return { rides, liftoff, addRide, rideNum, nextLanding, deleteRides, latest_liftoff, total_pax, breakdown, suspendRide, unSuspend, isSuspended }
})


export const useExcelStore = defineStore('excel', () => {
  let formData = ref({
    "a1n":"",
    "a1ci":"",
    "a1co":"",
    "a1b":"",
    "a2n":"",
    "a2ci":"",
    "a2co":"",
    "a2b":"",
    "a3n":"",
    "a3ci":"",
    "a3co":"",
    "a3b":"",
    "a4n":"",
    "a4ci":"",
    "a4co":"",
    "a4b":"",
    "p1n":"",
    "p1ci":"",
    "p1co":"",
    "p1b":"",
    "p2n":"",
    "p2ci":"",
    "p2co":"",
    "p2b":"",
    "p3n":"",
    "p3ci":"",
    "p3co":"",
    "p3b":"",
    "p4n":"",
    "p4ci":"",
    "p4co":"",
    "p4b":"",
    "m1n":"",
    "m1ci":"",
    "m1co":"",
    "m1b":"",
    "m2n":"",
    "m2ci":"",
    "m2co":"",
    "m2b":"",
    "m3n":"",
    "m3ci":"",
    "m3co":"",
    "m3b":"",
    "m4n":"",
    "m4ci":"",
    "m4co":"",
    "m4b":"",
  })
  if (localStorage.getItem("excel")) {
    let json = JSON.parse(localStorage.getItem("excel"))
    if (json.formData!=null){
      formData.value = json.formData;
    }
  }

  function resetForm(){
    formData.value = {};
  }


  return { formData, resetForm }
})