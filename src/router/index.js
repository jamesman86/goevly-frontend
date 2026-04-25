import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RegisterBusinessView from '@/views/RegisterBusinessView.vue'
import BusinessDashboard from '@/views/BusinessDashboard.vue'
import AboutView from '@/views/AboutView.vue'
import ToursView from '@/views/ToursView.vue'
import GuiasView from '@/views/GuiasView.vue'
import ComidaView from '@/views/ComidaView.vue'
import TransporteView from '@/views/TransporteView.vue'
import BuscarView from '@/views/BuscarView.vue'
 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/registro',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/registro-negocio',
    name: 'RegisterBusiness',
    component: RegisterBusinessView
  },
  {
    path: '/dashboard',
    name: 'BusinessDashboard',
    component: BusinessDashboard,
    meta: { requiresAuth: true, role: 'empresario' }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
 
  // Rutas de categorías
  {
    path: '/categoria/tours',
    name: 'Tours',
    component: ToursView
  },
  {
    path: '/categoria/guias',
    name: 'Guias',
    component: GuiasView
  },
  {
    path: '/categoria/comida',
    name: 'Comida',
    component: ComidaView
  },
  {
    path: '/categoria/transporte',
    name: 'Transporte',
    component: TransporteView
  },
 
  {
    path: '/buscar',
    name: 'Buscar',
    component: BuscarView
  },
 
  // Ruta 404 — cualquier ruta no encontrada va al home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
 
const router = createRouter({
  history: createWebHistory(),
  routes
})
 
// Guard de autenticación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token')
  const userData = localStorage.getItem('user_data')
 
  if (to.meta.requiresAuth && !token) {
    // No autenticado, redirigir al login
    next('/login')
    return
  }
 
  // Si la ruta requiere un rol específico, verificarlo
  if (to.meta.role && userData) {
    const user = JSON.parse(userData)
    if (user.role !== to.meta.role) {
      next('/')
      return
    }
  }
 
  next()
})
 
export default router