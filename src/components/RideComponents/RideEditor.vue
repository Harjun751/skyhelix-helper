<script setup>
import { ref, toRaw, onMounted } from 'vue';
import { usePrefStore } from '@/stores/store'
import { Group } from '@/algo';
import Swal from 'sweetalert2';

const emit = defineEmits(['save'])

let store = usePrefStore();
const props = defineProps(['groups'])
let this_groups = ref();

function clone_proxy_arr(obj_arr){
    let arr = [];
    for (let x = 0; x < obj_arr.length; x++){
        let obj = obj_arr[x];
        arr.push(toRaw(obj));
    }
    return arr;
}
onMounted(() => {
    this_groups.value = clone_proxy_arr(props.groups);
})
const changes = ref(false);

function delete_group(id){
    this_groups.value = this_groups.value.filter(x => x.id != id);
    changes.value = true;
}
function add_group(){
    // don't need to bother with keeping IDs sequential here, just need them unique so the delete button works
    this_groups.value.push(new Group(0, 0, 0, store.default_option, Math.random()*1000, "No"));
    changes.value = true;
}
function discard(){
    this_groups.value = structuredClone(toRaw(props.groups));
    changes.value = false;
}

function save_changes(){
    Swal.fire({
      title: 'HMMM 🤨🤨',
      text: 'Edit the ride?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'yes',
      cancelButtonText: 'NO'
    }).then((result) => {
        if (result.isConfirmed){
            emit('save', this_groups);
            changes.value=false;
        } 
    })
}
</script>

<template>
    <div class="container">
        <h2>Manual Edit</h2>
        <div class="input_group">
            <span class="adultp">A (+)</span>
            <span class="adult">A</span>
            <span class="kid">C</span>
            <span class="natl">Natl</span>
            <span class="comple">Complementary</span>
            <span class="del"></span>
        </div>
        <div class="input_group" v-for="group in this_groups" :key="group.id">
            <input class="adultp" v-model="group.plus_size" @change="changes=true;group.plus_size = Number(group.plus_size) ? Number(group.plus_size) : 0;" />
            <input class="adult" v-model="group.normal" @change="changes=true;group.normal = Number(group.normal) ? Number(group.normal) : 0;" />
            <input class="kid" v-model="group.kids" @change="changes=true;group.kids = Number(group.kids) ? Number(group.kids) : 0;"/>
            <select class="natl" v-model="group.nationality" @change="changes = true;">
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
            <select class="comple" v-model="group.complementary" @change="changes=true">
                <option>No</option>
                <option>Yes</option>
            </select>
            <span class="del" @click="delete_group(group.id); changes=true">x</span>
        </div>
        <span class="warning" v-if="changes">You have unsaved changes</span>
        <div class="input_group">
            <button class="discard" @click="discard">Discard Changes</button>
            <button @click="save_changes">Save Changes</button>
            <button @click="add_group">Add New Group</button>
        </div>
    </div>
</template>

<style scoped>
.container{
    color: var(--font-color-white);
    padding-bottom:20px;
    width:100%;
    overflow-x: scroll;

    /* override border styles */
    border:0 !important;
    border-top:1px solid var(--secondary-color) !important;
    border-radius: 0 !important;
}
.input_group{
    min-width:480px;
    margin:auto;
    margin-top:5px;
}
.input_group span{
    display: inline-block;
}
.input_group .adultp,
.input_group .adult,
.input_group .kid
{
    /* width:15%; */
    width: 50px;
    margin-right:5px;
}

.input_group .natl{
    width:100px;
    margin-right:5px;
}
.input_group .comple
{
    width:140px;
    margin-right:5px;
}
.input_group button{
    width:30%;
    margin: 0px 5px;

    border-radius: 5px;
    border:0;
    padding: 5px 0;
    background: var(--secondary-color);
}
.input_group button.discard{
    background: var(--negative);
}
.del{
    width:30px;
    display: inline-block;
    color:var(--font-color-dark);
    text-align: center;
    background-color: var(--negative);
}
.warning{
    margin:20px 0;
    display:block;
}
</style>