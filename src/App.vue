<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import { watch } from 'vue'
import QLogo from './components/QLogo.vue';
import HelixLogo from './components/HelixLogo.vue';
import image from "@/assets/excel-twotone.png";
import { useRoute } from "vue-router";

const qActive = ref(true);
const route = useRoute();
const darkmode = ref(true);
watch(() => route.name, (newR) => {
  if (newR == "queue") {
    qActive.value = true;
  } else {
    qActive.value = false;
  }
})
watch(() => darkmode.value, (newVal) => {
  if (newVal) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})
</script>

<template>
  <!-- <button @click="darkmode = !darkmode">Toggle dark mode</button> -->
  <RouterView />
  <footer>
    <div class="queue">
      <RouterLink to="/">
        <table>
          <tr>
            <td>
              <div class="logoContainer">
                <QLogo />
              </div>
            </td>
          </tr>
          <tr class="text">
            <td><span>Queue</span></td>
          </tr>
        </table>
      </RouterLink>
    </div>
    <div class="ride">
      <RouterLink to="/ride">
        <table>
          <tr>
            <td>
              <div class="logoContainer">
                <HelixLogo />
              </div>
            </td>
          </tr>
          <tr class="text">
            <td><span>Rides</span></td>
          </tr>
        </table>
      </RouterLink>
    </div>
    <div class="excel">
      <RouterLink to="/excel">
        <table>
          <tr>
            <td>
              <div class="logoContainer">
                <img :src="image">
              </div>
            </td>
          </tr>
          <tr class="text">
            <td><span>Excel</span></td>
          </tr>
        </table>
      </RouterLink>
    </div>

  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: var(--footer-color);
  height: 75px;
  display: flex;
  justify-content: space-between;
  padding:0px 40px;
}
footer > div{
  padding-top:3px;
}
footer > div > a {
  all: unset;
  cursor: pointer;
}
.logoContainer {
  display: inline-block;
  fill: var(--secondary-color);
}

.logoContainer>svg {
  height: 44px;
}
.logoContainer > img{
  height: 44px;
}
.logoContainer{
  width: 100%;
  text-align: center;
}

.text {
  color: var(--secondary-color);
  text-align: center;
  position: relative;
  bottom:10px;
}
.router-link-exact-active .text > td{
  border-bottom: 2px solid var(--secondary-color);
}
</style>
