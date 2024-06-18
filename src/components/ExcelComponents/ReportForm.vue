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
                <select class="name" v-model="store.formData.a1.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a1.clockin"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a1.clockout"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a1.break"/>
            </div>
            <div class="two">
                <span>2.</span>
                <select class="name" v-model="store.formData.a2.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a2.clockin"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a2.clockout"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a2.break"/>
            </div>
            <div class="three">
                <span>3.</span>
                <select class="name" v-model="store.formData.a3.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a3.clockin"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a3.clockout"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a3.break"/>
            </div>
            <div class="four">
                <span>4.</span>
                <select class="name" v-model="store.formData.a4.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a4.clockin"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a4.clockout"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a4.break"/>
            </div>
        </div>
        <div id="mid" class="parent">
            <h2>MID</h2>
            <div class="one">
                <span>1.</span>
                <select class="name" v-model="store.formData.m1.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m1.clockin"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m1.clockout"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m1.break"/>
            </div>
            <div class="two">
                <span>2.</span>
                <select class="name" v-model="store.formData.m2.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m2.clockin"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m2.clockout"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m2.break"/>
            </div>
            <div class="three">
                <span>3.</span>
                <select class="name" v-model="store.formData.m3.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m3.clockin"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m3.clockout"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m3.break"/>
            </div>
            <div class="four">
                <span>4.</span>
                <select class="name" v-model="store.formData.m4.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m4.clockin"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m4.clockout"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m4.break"/>
            </div>
        </div>
        <div id="pm" class="parent">
            <h2>PM</h2>
            <div class="one">
                <span>1.</span>
                <select class="name" v-model="store.formData.p1.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.p1.clockin"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.p1.clockout"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.p1.break"/>
            </div>
            <div class="two">
                <span>2.</span>
                <select class="name" v-model="store.formData.p2.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" type="text" v-model="store.formData.p2.clockin"/>
                <input class="clock" type="text" v-model="store.formData.p2.clockout"/>
                <input class="clock" type="text" v-model="store.formData.p2.break"/>
            </div>
            <div class="three">
                <span>3.</span>
                <select class="name" v-model="store.formData.p3.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" type="text" v-model="store.formData.p3.clockin"/>
                <input class="clock" type="text" v-model="store.formData.p3.clockout"/>
                <input class="clock" type="text" v-model="store.formData.p3.break"/>
            </div>
            <div class="four">
                <span>4.</span>
                <select class="name" v-model="store.formData.p4.data">
                    <option v-for="emp in userStore.roll_call" :key="emp.id" :value="emp">{{ emp.name }}</option>
                </select>
                <input class="clock" type="text" v-model="store.formData.p4.clockin"/>
                <input class="clock" type="text" v-model="store.formData.p4.clockout"/>
                <input class="clock" type="text" v-model="store.formData.p4.break"/>
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
    margin-right:5px;
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