<script setup>
import { useExcelStore, usePrefStore } from '@/stores/store';
const store = useExcelStore();
const userStore = usePrefStore();
console.log(userStore.roll_call)
</script>

<template>
    <form>
        <div id="am" class="parent">
            <h2>AM</h2>
            <div id="legend">
                <span class="name">Name</span>
                <span class="clock">Clock in</span>
                <span class="clock">Clock out</span>
                <span class="clock">Break</span>
            </div>
            <div class="one">
                <span>1.</span>
                <select class="name" v-model="store.formData.a1n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a1ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a1co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a1b"/>
            </div>
            <div class="two">
                <span>2.</span>
                <select class="name" v-model="store.formData.a2n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a2ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a2co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a2b"/>
            </div>
            <div class="three">
                <span>3.</span>
                <select class="name" v-model="store.formData.a3n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a3ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a3co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a3b"/>
            </div>
            <div class="four">
                <span>4.</span>
                <select class="name" v-model="store.formData.a4n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a4ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a4co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a4b"/>
            </div>
        </div>
        <div id="mid" class="parent">
            <h2>MID</h2>
            <div class="one">
                <span>1.</span>
                <select class="name" v-model="store.formData.m1n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m1ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m1co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m1b"/>
            </div>
            <div class="two">
                <span>2.</span>
                <select class="name" v-model="store.formData.m2n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m2ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m2co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m2b"/>
            </div>
            <div class="three">
                <span>3.</span>
                <select class="name" v-model="store.formData.m3n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m3ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m3co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m3b"/>
            </div>
            <div class="four">
                <span>4.</span>
                <select class="name" v-model="store.formData.m4n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m4ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m4co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m4b"/>
            </div>
        </div>
        <div id="pm" class="parent">
            <h2>PM</h2>
            <div class="one">
                <span>1.</span>
                <select class="name" v-model="store.formData.p1n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.p1ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.p1co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.p1b"/>
            </div>
            <div class="two">
                <span>2.</span>
                <select class="name" v-model="store.formData.p2n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" type="text" v-model="store.formData.p2ci"/>
                <input class="clock" type="text" v-model="store.formData.p2co"/>
                <input class="clock" type="text" v-model="store.formData.p2b"/>
            </div>
            <div class="three">
                <span>3.</span>
                <select class="name" v-model="store.formData.p3n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" type="text" v-model="store.formData.p3ci"/>
                <input class="clock" type="text" v-model="store.formData.p3co"/>
                <input class="clock" type="text" v-model="store.formData.p3b"/>
            </div>
            <div class="four">
                <span>4.</span>
                <select class="name" v-model="store.formData.p4n">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
                </select>
                <input class="clock" type="text" v-model="store.formData.p4ci"/>
                <input class="clock" type="text" v-model="store.formData.p4co"/>
                <input class="clock" type="text" v-model="store.formData.p4b"/>
            </div>
        </div>
    </form>
</template>

<style scoped>
form{
    margin-top:40px;
    width:90vw;
    margin-left: auto;
    margin-right: auto;
    overflow-x:scroll;
}
.parent > div{
    min-width:440px;
}
.parent{
    overflow-x:scroll;
}
input{
    display: inline-block;
    margin-right:5px;
}
input:invalid {
  border: red solid 3px;
}
.name{
    width: 45%;
}
.clock{
    width:15%;
}
.parent > div{
    margin-top:10px;
}
.parent > div > span{
    margin-right:3px;
    color:var(--font-color-white);
}
.parent{
    border-radius:5px;
    border: 1px solid var(--secondary-color);
    padding:10px 0 20px 0;
    margin-bottom:20px;
    position: relative;
}
#legend > span{
    display: inline-block;
    font-size: 100%;
}
h2{
    color:var(--font-color-white);
    text-align: left;
    margin-left:30px;
    margin-top:1px;
    margin-bottom:5px;
}
</style>