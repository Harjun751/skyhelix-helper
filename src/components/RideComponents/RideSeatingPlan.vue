<script setup>
import { onMounted, toRef, watch, computed } from 'vue'
import { useQueueStore } from '@/stores/store'

const props = defineProps(['ride', 'number'])
const groupColours = ["#00A2E8", "#FFF200", "#FF7F27", "#B97A57", "red", "black", "green", "blue"];
const store = useQueueStore();
const groups = store.groups;
const testy = toRef(props, 'ride');
watch (testy, (newval) => {
  updateTable(newval.seatplan);
})
onMounted(() => {
  updateTable(props.ride.seatplan);
})
const summary = computed(() => {
  let num_adults = 0;
  let num_kids = 0;
  for (let x = 0; x < props.ride.seatplan.length; x++){
    let crawler = props.ride.seatplan[x];
    if (crawler.occupied && (crawler.occupant == "" || crawler.occupant == "L")){
      num_adults+=1;
    } else if (crawler.occupied && crawler.occupant=="K"){
      num_kids+=1
    }
  }
  return `${num_adults}A${num_kids}C`
})
function updateTable(seatplan){
  var dict = {};
  var natl = {};
  let auto_incr = 0;
  let table = document.getElementById(props.number);
  for (let x = 0; x < seatplan.length; x++) {
    if (seatplan[x].occupied) {
      let number = seatplan[x].number;
      let ele = table.getElementsByClassName(String(number))[0];

      let groupid = seatplan[x].groupid;
      let groupNumber = dict[groupid];
      if (groupNumber == null) {
        groupNumber = groups.findIndex(x => x.id == groupid);
        let groupNationality = props.ride.groups.find(x => x.id == groupid).nationality;
        natl[groupid] = groupNationality;
        if (groupNumber == -1){
          groupNumber = auto_incr++;
        }
        dict[groupid] = groupNumber;
      }
      ele.style.backgroundColor = groupColours[groupNumber];
      ele.textContent = seatplan[x].occupant;
    } else {
      let seatnum = seatplan[x].number;
      let ele = table.getElementsByClassName(String(seatnum))[0];
      ele.style.backgroundColor = "#D9D9D9";
      ele.textContent = "";
    }
  }
  let snippet = ""
  Object.keys(dict).forEach(function (key) {
    let color = groupColours[dict[key]];
    let nationality = natl[key];
    snippet += "<div><div class=\"color\" style=\"background-color:"+ color +"\"></div><span class=\"label\">Group "+ (Number(dict[key])+1) +" (" + nationality + ")</span></div>"
  });
  document.querySelectorAll(".legend[id='" + props.number + "']")[0].innerHTML = snippet;
}
</script>

<template>
  <table :id="props.number">
    <tr>
      <td></td>
      <td></td>
      <td class="seat 1"></td>
      <td class="seat 2"></td>
      <td class="seat 3"></td>
      <td class="seat 4"></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td class="top">1</td>
      <td class="top">2</td>
      <td class="top">3</td>
      <td class="top">4</td>
    </tr>
    <tr>
      <td class="seat 16"></td>
      <td class="left">16</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="right">5</td>
      <td class="seat 5"></td>
    </tr>
    <tr>
      <td class="seat 15"></td>
      <td class="left">15</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="right">6</td>
      <td class="seat 6"></td>
    </tr>
    <tr>
      <td class="seat 14"></td>
      <td class="left">14</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="right">7</td>
      <td class="seat 7"></td>
    </tr>
    <tr>
      <td class="seat 13"></td>
      <td class="left">13</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="right">8</td>
      <td class="seat 8"></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td class="bottom">12</td>
      <td class="bottom">11</td>
      <td class="bottom">10</td>
      <td class="bottom">9</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td class="seat 12"></td>
      <td class="seat 11"></td>
      <td class="seat 10"></td>
      <td class="seat 9"></td>
      <td></td>
    </tr>
  </table>

  <div class="info">(Group number is based on queue position)</div>
  <div class="legend" :id="props.number">
    
  </div>
  <div class="summary">
    {{  summary }}
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 75vw;
  margin: auto;
  font-size:23px;
  color: white;
}
.seat{
  background-color: #D9D9D9;
  color: black;
  text-align: center;
  font-weight: bold;
}

td,
th {
  text-align: left;
  padding: 8px;
  height: calc(75vw/8);
  width: calc(75vw/8);
  font-size: calc(75vw/8 - 5vw);
}

.seat {
  border: 2px solid black;
}

.top {
  vertical-align: top;
  text-align: center;
}

.bottom {
  vertical-align: bottom;
  text-align: center;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}
.summary{
  color:white;
}
.info{
  color:white;
  margin-top:30px;
}
</style>
<style>
.legend{
  margin: auto;
  margin-top:30px;
  margin-bottom:20px;
  width: 75vw;
  text-align: left;
}
.legend > div{
  margin-top:5px;
}
.legend > div > .color{
  display: inline-block;
  height: 25px;
  width:25px;
  position: relative;
  top:4px;
}
.legend > div > .label{
  margin-left:20px;
  display: inline-block;
  height: 18px;
  color:white;
  font-size:18px;
}
</style>