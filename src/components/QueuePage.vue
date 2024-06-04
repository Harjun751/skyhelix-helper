<script setup>
import GroupEditor from '@/components/GroupEditor.vue'
import GroupDisplay from '@/components/GroupDisplay.vue'
import { useQueueStore } from '../stores/store'

const store = useQueueStore();
const groups = store.groups;
</script>

<template>
    <GroupEditor p=0 n=0 k=0 id=-1 submit_type=true />
    <div style="margin-bottom:90px; margin-top:40px;">
        <div v-for="(grp, index) in groups" :key="grp.id">
            <GroupDisplay :plus_size=grp.plus_size :normal=grp.normal :kids=grp.kids :id=grp.id :number="index+1" />
        </div>
    </div>
</template>