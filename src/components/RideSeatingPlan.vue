<script setup>
import { onMounted, toRef, watch } from 'vue'
import { useQueueStore } from '../stores/store'

const props = defineProps(['seatplan', 'number'])
const groupColours = ["#00A2E8", "#FFF200", "#FF7F27", "#B97A57", "red", "black", "green", "blue"];
const store = useQueueStore();
const groups = store.groups;
const testy = toRef(props, 'seatplan');
watch (testy, (newval) => {
  updateTable(newval);
})
onMounted(() => {
  updateTable(props.seatplan);
})

function updateTable(seatplan){
  var dict = {};
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
        if (groupNumber == -1){
          groupNumber = auto_incr++;
        }
        dict[groupid] = groupNumber;
      }
      ele.style.backgroundColor = groupColours[groupNumber];
      ele.textContent = seatplan[x].occupant;
    } else {
      let number = seatplan[x].number;
      let ele = table.getElementsByClassName(String(number))[0];
      ele.style.backgroundColor = "#D9D9D9";
      ele.textContent = "";
    }
  }
  let snippet = ""
  Object.keys(dict).forEach(function (key) {
    let color = groupColours[dict[key]];
    snippet += "<div><div class=\"color\" style=\"background-color:"+ color +"\"></div><span class=\"label\">Group "+ (Number(dict[key])+1) +"</span></div>"
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
  <div class="legend" :id="props.number">
    
  </div>
</template>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 50vw;
  margin: auto;
  font-family: "Readex Pro", sans-serif;
  font-size:23px;
  color: white;
}
.seat{
  background-color: #D9D9D9;
  color: black;
  text-align: center;
  font-weight: bold;
  font-size:25px;
}

td,
th {
  text-align: left;
  padding: 8px;
  height: calc(50vw/8);
  width: calc(50vw/8);
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
</style>
<style>
.legend{
  margin: auto;
  margin-top:20px;
  margin-bottom:20px;

  width: 50vw;
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
  height: 20px;
  color:white;
  font-size:25px;
}
</style>
