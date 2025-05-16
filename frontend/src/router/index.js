import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', redirect: '/Login' },
  { path: '/Login', component: Login },
  { path: '/Register', component: Register }
  {
    path: '/profile',
    component: Profile,
    beforeEnter: () => {
      const store = useAuthStore();
      if (!store.token) {
        return '/login'; // redirige si pas connecté
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
