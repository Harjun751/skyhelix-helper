<script setup>
import { RouterLink, RouterView } from 'vue-router'
import QLogo from './components/QLogo.vue';
import HelixLogo from './components/HelixLogo.vue';
import CogLogo from './components/CogLogo.vue';
import ExcelLogo from './components/ExcelLogo.vue';
import { usePrefStore } from "@/stores/store"
const store = usePrefStore();
const theme = store.theme;
if (theme == "blue"){
    document.documentElement.setAttribute('data-theme', 'blue');    
} else if (theme == "purple"){
    document.documentElement.setAttribute('data-theme', 'purple');
} else if (theme == "black"){
    document.documentElement.setAttribute('data-theme', 'black');
} else if (theme == "peach"){
    document.documentElement.setAttribute('data-theme', 'peach');
} else if (theme == "rainbow"){
    document.documentElement.setAttribute('data-theme', 'rainbow');
}
else if (theme == "red"){
    document.documentElement.setAttribute('data-theme', 'red');
}
</script>

<template>
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
                <ExcelLogo/>
              </div>
            </td>
          </tr>
          <tr class="text">
            <td><span>Excel</span></td>
          </tr>
        </table>
      </RouterLink>
    </div>
    <div class="settings">
      <RouterLink to="/settings">
        <table>
          <tr>
            <td>
              <div class="logoContainer">
                <CogLogo />
              </div>
            </td>
          </tr>
          <tr class="text">
            <td><span>Settings</span></td>
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
  justify-content: space-around;
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
