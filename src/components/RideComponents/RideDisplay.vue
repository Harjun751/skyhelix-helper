<script setup>
import { ref } from 'vue';
import { computed } from 'vue'
import RideSeatingPlan from '@/components/RideComponents/RideSeatingPlan.vue'
import RideEditor from '@/components/RideComponents/RideEditor.vue'
import { useRideStore } from '@/stores/store'
const store = useRideStore();

const props = defineProps(['ride', 'toExpand'])
let expand = ref(props.toExpand);
const formattedTime = computed(() => {
    if (props.ride.liftoff!=null){
        let date = new Date(props.ride.liftoff);
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
    return "";
})
let rideGroups = props.ride.groups;
</script>

<template>
    <div class="container" @click="expand = !expand">
        <div class="info" :class="{ 'maximized': expand }">
            <p>
            <span class="rideName">Ride {{ props.ride.number }}</span>
            <span class="label" v-if="props.ride.state==1">
                lift-off {{ formattedTime }}
            </span>
            <span class="label pending" v-else>
                pending..
            </span>
            </p>
        </div>

        <div class="seating_plan" :class="{ 'maximized': expand }">
            <p>Suggested Seating Plan</p>
            <RideSeatingPlan :ride="ride" :number="props.ride.number" />
            <button v-if="props.ride.state==0" @click="store.liftoff()">Lift Off</button>
            <div @click.stop v-else>
                <RideEditor :groups="rideGroups" @save="(group) => store.edit_lifted_ride(props.ride, group.value)"/>
            </div>
        </div>
    </div>
</template>

<style>
.seating_plan{
    max-height:0px;
    transition: max-height 0.5s;
    overflow:hidden;
}
.seating_plan.maximized{
    max-height: 1920px;
}
</style>

<style scoped>
.container{
    margin: auto;
    width:80vw;
    border-radius:13px;
    border: 1px solid var(--secondary-color);
    margin-top:20px;
    transition: max-height 0.5s;
}
.info{
    text-align: left;
    line-height:32px;
    transition: all 0.5s;
}
.info > p{
    transition: all 0.5s ease-out;
}
.info > p {
    display:inline-block;
    margin:0;
}

.info.maximized{
    transform:translateX(50%);
}
.info.maximized > p {
    transform: translateX(-50%);
}

.rideName {
    color: var(--font-color-white);
    margin-left:30px;
    font-size: 20px;
}
.label{
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
.label.pending{
    background-color: var(--negative);
}
p{
    margin-top:5px;
}
button{
    margin-top:30px !important;
    margin:auto;
    height:50px;
    width: 80%;
    background-color: var(--secondary-color);
    padding: 0;
    border: 0;
    font-size: 15px;
    margin-bottom:20px;
    border-radius: 5px;
    line-height: 20px;
    font-size:20px;
}
button.edit{
    width:unset;
    padding: 0 20px;
}
</style>