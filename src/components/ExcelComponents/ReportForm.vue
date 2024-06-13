<script setup>
import { useExcelStore } from '@/stores/store';
const store = useExcelStore();
</script>

<template>
    <form>
        <div id="am" class="parent">
            <div id="legend">
                <span class="name">Name</span>
                <span class="clock">Clock-in</span>
                <span class="clock">Clock-out</span>
                <span class="clock">Break</span>
            </div>
            <div class="one">
                <span>1.</span>
                <input class="name" type="text" v-model="store.formData.a1n"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a1ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a1co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a1b"/>
            </div>
            <div class="two">
                <span>2.</span>
                <input class="name" type="text" v-model="store.formData.a2n"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a2ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a2co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a2b"/>
            </div>
            <div class="three">
                <span>3.</span>
                <input class="name" type="text" v-model="store.formData.a3n"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a3ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a3co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a3b"/>
            </div>
            <div class="four">
                <span>4.</span>
                <input class="name" type="text" v-model="store.formData.a4n"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a4ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a4co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.a4b"/>
            </div>
        </div>
        <div id="mid" class="parent">
            <div class="one">
                <span>1.</span>
                <input class="name" type="text" v-model="store.formData.m1n"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m1ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m1co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m1b"/>
            </div>
            <div class="two">
                <span>2.</span>
                <input class="name" type="text" v-model="store.formData.m2n"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m2ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m2co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m2b"/>
            </div>
            <div class="three">
                <span>3.</span>
                <input class="name" type="text" v-model="store.formData.m3n"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m3ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m3co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m3b"/>
            </div>
            <div class="four">
                <span>4.</span>
                <input class="name" type="text" v-model="store.formData.m4n"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m4ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m4co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.m4b"/>
            </div>
        </div>
        <div id="pm" class="parent">
            <div class="one">
                <span>1.</span>
                <input class="name" type="text" v-model="store.formData.p1n"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.p1ci"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.p1co"/>
                <input class="clock" pattern="\d+:\d{2}" type="text" v-model="store.formData.p1b"/>
            </div>
            <div class="two">
                <span>2.</span>
                <input class="name" type="text" v-model="store.formData.p2n"/>
                <input class="clock" type="text" v-model="store.formData.p2ci"/>
                <input class="clock" type="text" v-model="store.formData.p2co"/>
                <input class="clock" type="text" v-model="store.formData.p2b"/>
            </div>
            <div class="three">
                <span>3.</span>
                <input class="name" type="text" v-model="store.formData.p3n"/>
                <input class="clock" type="text" v-model="store.formData.p3ci"/>
                <input class="clock" type="text" v-model="store.formData.p3co"/>
                <input class="clock" type="text" v-model="store.formData.p3b"/>
            </div>
            <div class="four">
                <span>4.</span>
                <input class="name" type="text" v-model="store.formData.p4n"/>
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
    color:white;
}
.parent{
    border-radius:5px;
    border: 1px solid var(--secondary-color);
    padding:10px 0 20px 0;
    margin-bottom:20px;
    position: relative;
}
.parent::before{
    position:absolute;
    top:-12px;
    color:white;
    background-color: black;
    padding:2px;
    border: 1px solid var(--secondary-color);   
    left:50%;
    transform: translate(-50%,0);
}
#pm::before{
    content:"PM";   
}
#am::before{
    content:"AM";
}
#mid::before{
    content:"MID"
}
#legend > span{
    display: inline-block;
    font-size: 100%;
}
</style>