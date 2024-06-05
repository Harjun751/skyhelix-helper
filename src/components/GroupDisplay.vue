<script setup>
import { ref } from 'vue';
import GroupEditor from '@/components/GroupEditor.vue'
const props = defineProps(['plus_size', 'normal', 'kids', 'id', 'number'])
let editing = ref(false);
</script>


<template>
    <div id="grouptainer" :class="{ 'editing': editing }" @click="editing = !editing">
        <div id="header">
            <p>Group {{ props.number }}</p>
        </div>
        <Transition>
            <div id="main" v-if="!editing">
                <div id="plus" class="hero">
                    <span>Plus-Sized</span>
                    <p>{{ plus_size }}</p>
                </div>
                <div id="normal" class="hero">
                    <span>Normal</span>
                    <p>{{ normal }}</p>
                </div>
                <div id="child" class="hero">
                    <span>Child</span>
                    <p>{{ kids }}</p>
                </div>
            </div>
            <div id="editor" v-else>
                <div style="width:280px;margin:auto;" @click.stop>
                    <GroupEditor @minimize="editing = !editing" :p=plus_size :n=normal :k=kids :id=props.id submit_type=false  />
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
#editor.v-enter-active{
    transition: opacity 0.5s;
}
#editor.v-enter-from, #editor.v-leave-to{
    opacity: 0;
}
#editor.v-leave-active{
    transition: opacity 0.1s;
    position: absolute;
    width:100%;
    left: 0;
}

#main.v-enter-active,
#main.v-leave-active {
  /* transition: opacity 0.5s ease; */
  transition: all 0.4s;
}

#main.v-enter-from,
#main.v-leave-to {
  height: 0;
  transform:translate(0, 228px);
}

#grouptainer{
    border: 1px solid var(--secondary-color);
    border-radius: 13px;
    height: 116px;
    width: 80vw;
    margin: 10px auto 0px auto;
    transition: height 0.4s;
}
#grouptainer.editing{
    height:250px;
}
#header{
    height: 20px;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
}
#header p{
    margin: 0;
    margin-top:2px;
}
#main{
    height:94px;
    overflow: clip;
    z-index:2;
}
.hero{
    height:100%;
    width:33.3333%;
    background-color: var(--secondary-color);
    display: inline-block;
    text-align: center;
}
.hero span{
    color:var(--font-color-dark);
    font-size:12px;
}
.hero p{
    margin: 0;
    font-size: 53px;
    color:var(--font-color-dark);
}
#plus{
    border-radius: 0 0 0 13px;
}
#child{
    border-radius: 0 0 13px 0;
}
#normal{
    border-left: 0.5px black solid;
    border-right: 0.5px black solid;
}
</style>
