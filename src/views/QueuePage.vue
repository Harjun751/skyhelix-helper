<script setup>
import GroupEditor from '@/components/QueueComponents/GroupEditor.vue'
import GroupDisplay from '@/components/QueueComponents/GroupDisplay.vue'
import { useQueueStore } from '@/stores/store'
import { vDraggable } from 'vue-draggable-plus'

const store = useQueueStore();
const groups = store.groups;
</script>

<template>
  <GroupEditor p=0 n=0 k=0 id=-1 nationality="India" submit_type=true style="margin-top:40px;" />
  <TransitionGroup name="list" tag="div" style="margin-bottom:90px; margin-top:40px;" v-draggable="[groups,{animation:150, handle:'img', emptyInsertThreshold:20}]">
    <div v-for="(grp, index) in groups" :key="grp.id">
      <GroupDisplay :group="grp" :number="index + 1" class="animated" />
    </div>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
  overflow:clip;
}

.list-enter-from {
  max-height: 0;
}
.list-enter-to{
  max-height: 320px;
}

.list-leave-to {
  max-height: 0;
}
.list-leave-from{
  max-height: 320px;
}
</style>