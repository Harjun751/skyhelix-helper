import { createRouter, createWebHistory } from 'vue-router'
import QueuePage from '@/views/QueuePage.vue'
import RidePage from '@/views/RidePage.vue'
import ExcelPageVue from '@/views/ExcelPage.vue'
import SettingsPageVue from '@/views/SettingsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'queue',
      component: QueuePage
    },
    {
      path: '/ride',
      name: 'rides',
      component: RidePage
    },
    {
      path: '/excel',
      name: 'excel',
      component: ExcelPageVue
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPageVue
    },
  ]
})

export default router
