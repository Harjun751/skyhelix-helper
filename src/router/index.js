import { createRouter, createWebHistory } from 'vue-router'
import QueuePage from '@/views/QueuePage.vue'
import RidePage from '@/views/RidePage.vue'
import ExcelPageVue from '@/views/ExcelPage.vue'

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
  ]
})

export default router
