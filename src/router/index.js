import { createRouter, createWebHistory } from '@ionic/vue-router';
import LandingPage from '../views/LandingPage.vue'
import TabsPage from '../views/TabsPage.vue'
import CompletedCheckout from '../views/CompletedCheckout.vue'

const routes= [
  {
    path: '/',
    component: LandingPage
  },
  {
    path: '/shop/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: 'shop/products'
      },
      {
        path: 'products',
        component: () => import('@/views/ShopPage.vue')
      },
      {
        path: 'products/:name',
        component: () => import('@/views/ProductPage.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/AboutPage.vue')
      },
      {
        path: 'prayer',
        component: () => import('@/views/PrayerPage.vue')
      },
      {
        path: 'checkout',
        component: () => import('@/views/CheckoutPage.vue')
      },
      {
        path: 'checkout/cart',
        component: () => import('@/views/CartPage.vue')
      },
    ]
  },
  {
    path: '/completed',
    component: CompletedCheckout
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

