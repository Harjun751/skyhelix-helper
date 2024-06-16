<script setup>
import RideDisplay from '@/components/RideComponents/RideDisplay.vue'
import { brute_force_seats  } from '@/algo';
import { useQueueStore, useRideStore } from '@/stores/store'
import image from "@/assets/create.png";
import resume from "@/assets/resume.png";
import Swal from 'sweetalert2';
import { toRef, watch } from 'vue';

const store = useQueueStore();
const rideStore = useRideStore();
const suspension = toRef(rideStore.isSuspended);

function formatTime(time){
    let date = new Date(time);
    let hours = date.getHours();
    if (hours < 10){
        hours = "0" + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    return String(hours)+String(minutes);
}

watch(() => rideStore.isSuspended, (newVal) => {
    suspension.value = newVal
})

function generate(){
    let data = JSON.parse(
      JSON.stringify(store.groups)
    );
    let [seats, groups] = brute_force_seats(data);
    rideStore.addRide(groups, seats);
}

function warning(){
    Swal.fire({
      title: 'AYO CHILL',
      text: 'Are you sure you want to delete all the rides?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'yea!',
      cancelButtonText: 'nope!'
    }).then((result) => {
        if (result.isConfirmed){
            rideStore.deleteRides();
        } 
    })
}

function suspend(){
    Swal.fire({
      title: 'CALM DOWN',
      text: 'Suspend the ride?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'yea!',
      cancelButtonText: 'nope!'
    }).then((result) => {
        if (result.isConfirmed){
            rideStore.suspendRide();
        } 
    })
}

function unSuspend(){
    Swal.fire({
      title: ':(',
      text: 'Resume operations?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'yea!',
      cancelButtonText: 'nope!'
    }).then((result) => {
        if (result.isConfirmed){
            rideStore.unSuspend();
        } 
    })
}

if (store.groups.length > 0 && suspension.value==null){
    generate();
}
</script>

<template>
    <div class="container">
        <div v-if="rideStore.nextLanding" id="iBtn">i</div>
        <div style="color:var(--font-color-white);" v-if="rideStore.nextLanding" class="landing">
            <div>
                Ride touches down <span class="label">~{{ rideStore.nextLanding }}</span>
            </div>
        </div>
        <div v-for="(ride,index) in rideStore.rides.slice().reverse()" :key="ride.number">
            <RideDisplay v-if="ride.state!=null" :ride="ride" :toExpand="index==0 && ride.state==0 ? true : false" />
            <div class="suspensionInfo" v-else-if="ride.start!=null">
                Suspension started @ <span class="slabel">{{ formatTime(ride.start) }}</span>
            </div>
            <div class="suspensionInfo" v-else-if="ride.end!=null">
                Suspension ended @ <span class="slabel">{{  formatTime(ride.end) }}</span>
            </div>
        </div>
        <button v-if="suspension==null" class="suspend" @click="suspend()">Suspend Ride</button>
        <button v-else class="suspend floaty" @click="unSuspend()">
            <div>
                <img :src=resume />
                <span>Resume Operations</span>
            </div>
        </button>
        <button class="delete" @click="warning()">Delete all rides</button>
        <button v-if="suspension==null" id="generate" class="floaty" @click="generate()">
            <div>
                <img :src=image />
                <span>Generate next ride</span>
            </div>
        </button>
    </div>
</template>

<style scoped>
.container{
    text-align: center;
    overflow:hidden;
}
button{
    border-radius: 5px;
    height:50px;
    width: 80vw;
    max-width: 350px;
    padding: 0;
    border: 0;
    font-size: 23px;
    cursor: pointer;
    display:block;
}
.landing{
    margin:auto;
    margin-top: -10px;
    width: 80vw;
    max-width: 350px;
    border: 1px solid var(--secondary-color);
    line-height:55px;
}
.label{
    text-shadow: 0px 0px 10px;
}
.delete{
    margin: 50px auto 180px auto;
    /* color: var(--font-color-white); */
    background-color: var(--negative);
    font-size:18px;
    width:160px;
}
.floaty{
    background-color: var(--secondary-color);
    position: fixed;
    bottom: 100px;
    right: 20px;
    z-index: 1;
    box-shadow: 0px 5px rgba(0,0,0, 0.25);
}
.floaty > div > span {
    vertical-align: middle;
    margin-left:10px;
    font-size:23px;
}
.floaty > div > img {
    width:40px;
    height:40px;
    vertical-align: middle;
    position:relative;
    top:1px;
}

#iBtn{
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    vertical-align: middle;

    height: 20px;
    width: 20px;
    border-radius: 30px;
    border: 1px solid var(--secondary-color);
    background-color: black;
    color: var(--secondary-color);
    position: relative;
    right: 150px;
}
@media only screen and (max-width: 600px) {
  #generate{
    left: 50%;
    transform: translateX(-50%);
    width:85vw;
  }
}
.suspensionInfo{
    margin: auto;
    width:80vw;
    border-radius:13px;
    border: 1px solid var(--secondary-color);
    margin-top:20px;
    color: var(--font-color-white);
    padding-left:30px;
    text-align: left;
    font-size: 20px;
    line-height:35.5px;
}
.suspensionInfo > .slabel{
    font-family: "Inter", sans-serif;
    color: var(--font-color-dark);
    background-color: var(--secondary-color);
    padding:5px 20px;
    border-radius: 5px;
    font-size:12px;
    margin-left:10px;
    position: relative;
    bottom: 1px;
}

.suspend{
    margin: 50px auto 0px auto;
    font-size:18px;
}
.suspend.floaty > div > img{
    width:30px;
    height:30px;
}
</style>