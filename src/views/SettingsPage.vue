<script setup>
import { usePrefStore } from "@/stores/store"
import { watch } from 'vue';
import Swal from 'sweetalert2';

const store = usePrefStore();
const data = Object.assign({}, store.seat_config);

watch(() => store.theme, (newVal) => {
    if (newVal == "blue"){
        document.documentElement.setAttribute('data-theme', 'blue');    
    } else if (newVal == "purple"){
        document.documentElement.setAttribute('data-theme', 'purple');
    } else if (newVal == "black"){
        document.documentElement.setAttribute('data-theme', 'black');
    } else if (newVal == "peach"){
        document.documentElement.setAttribute('data-theme', 'peach');
    } else if (newVal == "rainbow"){
        document.documentElement.setAttribute('data-theme', 'rainbow');
    }
    else if (newVal == "red"){
        document.documentElement.setAttribute('data-theme', 'red');
    }
})

function saveConfig(){
    Swal.fire({
      title: '✋😤\nSTOP',
      text: 'Did the seatbelt configuration really change?\n(This affects the seat generation)',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'yea!',
      cancelButtonText: 'nope.'
    }).then((result) => {
        if (result.isConfirmed){
            store.seat_config = data;
        } 
    })


    store.seat_config = data;
}
</script>

<template>
    <div class="row first">
        <span>Theme</span>
        <select v-model="store.theme">
            <option value="blue">Sacre Bleu</option>
            <option value="purple">Burple Murple</option>
            <option value="black">TFW PM shift and you got AM shift tmr</option>
            <option value="peach">Feelin Peachy</option>
            <option value="red">wlr</option>
            <option value="rainbow">slay all day</option>
        </select>
    </div>
    <div class="row">
        <span>Default Nationality</span>
        <select v-model="store.default_option">
            <option>Australia</option>
            <option>China</option>
            <option>Europe</option>
            <option value="HongKong">Hong Kong</option>
            <option>India</option>
            <option>Indonesia</option>
            <option>Japan</option>
            <option>Korea</option>
            <option>Malaysia</option>
            <option>Phillipines</option>
            <option>Singapore</option>
            <option>Taiwan</option>
            <option>Myanmar</option>
            <option>Thailand</option>
            <option>UAE</option>
            <option>USA</option>
            <option>Vietnam</option>
        </select>
    </div>
    <div id="seatContainer">
        <div class="row">
            <span>Seat Config</span>
        </div>
        <div class="selects" v-for="index in 16" :key="index">
            <label>Seat {{ index }}</label>
            <select v-model="data[index]">
                <option>Normal</option>
                <option>Long</option>
                <option>Short</option>
                <option value="broken">Broken</option>
            </select>
        </div>
        <button @click="saveConfig">Save seat configuration</button>
    </div>
    <div class="row">
        <span>Roll Call (WIP)</span>
    </div>
</template>

<style scoped>
.row.first{
    margin-top:90px;
}
.row{
    color:var(--font-color-white);
    width: 80vw;
    display: flex;
    justify-content: space-between;
    margin: auto;
    border-bottom: 2px solid var(--font-color-white);
    margin-top:40px;
}
.row:last-of-type{
    margin-bottom:100px;
}
.row select{
    position: relative;
    bottom:3px;
    max-width: 200px;
    width:120px;
}
#seatContainer{
    margin-top:0;
    width: 80vw;
    margin:auto;
    color:var(--font-color-white);
}
#seatContainer select{
    margin-left:20px;
}
.selects{
    display: inline-flex;
    justify-content: space-between;
    min-width:150px;
    max-width:20%;
    margin-top:20px;
    height:25px;
    line-height:30px;
    margin-right:30px;
}
button{
    width:300px;
    margin:auto;
    display:block;
    margin-top:20px;
    background-color: var(--secondary-color);
    font-size: 20px;
    border:0;
    height:42px;
    border-radius: 5px;
}
</style>