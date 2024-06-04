import { createRouter, createWebHistory } from 'vue-router'
import QueuePage from '@/components/QueuePage.vue'
import RidePage from '@/components/RidePage.vue'

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
  ]
})

export default router
