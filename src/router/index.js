import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../views/Homepage.vue';
import CarritoDeCompra from '../views/CarritoDeCompra.vue';
import ConfirmacionDePedido from '../views/ConfirmacionDePedido.vue';
import Login from '../views/Login.vue';  
import Register from '../views/Register.vue'; 
import store from '../store'; // Importamos el store para verificar la autenticación

const routes = [
  { path: '/', name: 'Homepage', component: Homepage },
  { path: '/carrito', name: 'CarritoDeCompra', component: CarritoDeCompra },
  { 
    path: '/confirmacion-pedido', 
    name: 'ConfirmacionDePedido', 
    component: ConfirmacionDePedido,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Agregamos el guardia de navegación para proteger las rutas
router.beforeEach((to, from, next) => {
  // Verificamos si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si el usuario no está autenticado, lo redirigimos a la página de login
    if (!store.getters['auth/isAuthenticated']) {
      next('/login');
    } else {
      next(); // El usuario está autenticado, permitir el acceso a la ruta
    }
  } else {
    next(); // La ruta no requiere autenticación, continuar normalmente
  }
});

export default router;
