<script setup>
import { usePrefStore } from "@/stores/store"
import { watch } from 'vue';

const store = usePrefStore();

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
</script>

<template>
    <div class="row">
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
    <div class="row">
        <span>Seat Config</span>
        (i'm working on it)
    </div>
</template>

<style scoped>
.row:first-of-type{
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
.row select{
    position: relative;
    bottom:3px;
}
</style>