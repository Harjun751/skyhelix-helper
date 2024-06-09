<script setup>
import { ref } from 'vue';
import { useQueueStore } from '@/stores/store'

const props = defineProps(['p', 'n', 'k', 'id', 'nationality','submit_type'])
const store = useQueueStore();
let plus_size = ref(Number(props.p));
let normal = ref(Number(props.n));
let kids = ref(Number(props.k));
let default_natl = props.nationality;
let natl = ref(default_natl);
</script>

<template>
    <div class="container">
        <div class="input_group">
            <span class="label">Plus-Sized</span>
            <span>
                <span class="minus" @click="plus_size= Math.max(0, plus_size - 1)">-</span>
                <input class="num" v-model="plus_size" @change="plus_size = Number(plus_size) ? Number(plus_size) : 0">
                <span class="plus" @click="plus_size+=1">+</span>
            </span>
        </div>
        <div class="input_group">
            <span class="label">Normal</span>
            <span>
                <span class="minus" @click="normal=Math.max(0, normal - 1)">-</span>
                <input class="num" v-model="normal" @change="normal = Number(normal) ? Number(normal) : 0">
                <span class="plus" @click="normal+=1">+</span>
            </span>
        </div>
        <div class="input_group">
            <span class="label">Children</span>
            <span>
                <span class="minus" @click="kids=Math.max(0, kids - 1)">-</span>
                <input class="num" v-model="kids" @change="kids = Number(kids) ? Number(kids) : 0">
                <span class="plus" @click="kids+=1">+</span>
            </span>
        </div>
        <div class="input_group">
            <span class="label">Nationality</span>
            <select v-model="natl">
                <option>Australia</option>
                <option>China</option>
                <option>Europe</option>
                <option>Hong Kong</option>
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
        <div class="submit" v-if="submit_type=='true'">
            <input id="submit" @click="store.addGroup(plus_size, normal, kids, natl);plus_size=0;normal=0;kids=0;natl=default_natl" type="submit" value="Add"/>
        </div>
        <div class="submit" v-else>
            <input id="delete" @click="store.deleteGroup(props.id)" type="submit" value="Delete"/>
            <input id="update" @click="store.updateGroup(plus_size, normal, kids, natl, props.id);$emit('minimize')" type="submit" value="Update"/>
        </div>
    </div>
</template>

<style scoped>
.container{
    width:280px;
    margin:auto;
}
.plus:active{
    animation: shake 0.5s;
    animation-iteration-count: calc(1);
}
.input_group{
    display:flex;
    justify-content: space-between;
}
.num{
    background:none;
    color:white;
    width:38px;
    height: 42px;
    font-size: 24px;
    text-align: center;
    border:none;
    padding:0;
    margin:0 20px;
}
.label{
    color: var(--font-color-white);
    font-size: 20px;
    line-height: 42px;
}
.minus, .plus{
    display: inline-block;
    position: relative;
    color: white;
    font-size: 31px;
    font-weight: bold;
    line-height: 42px;
    cursor: pointer;
    user-select: none;

    text-shadow: 0px 0px 10px;
}
.submit{
    text-align: center;
}
.submit input{
    margin-top:20px;
    width:117px;
    background-color: var(--secondary-color);
    font-size: 20px;
    border:0;
    height:42px;
    border-radius: 5px;
}
#delete{
    background-color: var(--red);
    margin-right:15px;
}
.input_group > select{
    width:113.61px;
}
#submit:active, #delete:active, #update:active{
    box-shadow: 0 0 0 0;
}
#submit, #delete, #update{
    box-shadow: 0 0 5px 2px;
    transition: all 0.2s;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>