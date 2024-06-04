<script setup>
import RideDisplay from '@/components/RideDisplay.vue'
import { brute_force_seats  } from '@/algo';
import { useQueueStore, useRideStore } from '../stores/store'
import image from "@/assets/create.png";

const store = useQueueStore();
const rideStore = useRideStore();

function generate(){
    let data = JSON.parse(
      JSON.stringify(store.groups)
    );
    let [seats, groups] = brute_force_seats(data);
    rideStore.addRide(groups, seats);
}
</script>

<template>
    <div class="container">
        <div v-if="rideStore.nextLanding" id="iBtn">i</div>
        <div style="color:white" v-if="rideStore.nextLanding" class="landing">
            <div>
                Ride touches down <span class="label">~{{ rideStore.nextLanding }}</span>
            </div>
            <div>
                Current Q capacity: {{ rideStore.capacity }} rides
            </div>
            <div>
                Est. Waiting time: {{ rideStore.waitTime }} minutes
            </div>
        </div>
        <div v-for="(ride,index) in rideStore.rides.slice().reverse()" :key="ride[0]">
            <RideDisplay :number="ride[0]" :state="ride[1]" :liftoff="ride[2]" :groups="ride[3]" :seatplan="ride[4]" :toExpand="index==0 && ride[1]==0 ? true : false"/>
        </div>
        <button class="delete" @click="rideStore.deleteRides()">Delete all rides</button>
        <button id="generate" @click="generate()">
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
}
button{
    border-radius: 5px;
    height:50px;
    width: 80vw;
    max-width: 350px;
    padding: 0;
    border: 0;
    font-family: "Readex Pro", sans-serif;
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
    font-family: "Readex Pro", sans-serif;
}
.label{
    text-shadow: 0px 0px 10px;
}
.delete{
    margin: 50px auto 90px auto;
    /* color: var(--font-color-white); */
    background-color: var(--red);
    font-size:18px;
    width:160px;
}
#generate{
    background-color: var(--secondary-color);
    position: fixed;
    bottom: 100px;
    right: 20px;
    z-index: 1;
    box-shadow: 0px 5px rgba(0,0,0, 0.25);
}
#generate > div > span {
    vertical-align: middle;
    margin-left:10px;
}
#generate > div > img {
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
</style>