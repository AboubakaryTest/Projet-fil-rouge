<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
    <router-link class="navbar-brand" to="/">Projet Fil Rouge</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <template v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Connexion</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Inscription</router-link>
          </li>
        </template>

        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">Profil</router-link>
          </li>
          <li class="nav-item">
            <button @click="logout" class="btn btn-sm btn-outline-danger ms-2">
              Déconnexion
            </button>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => !!store.token);

const logout = () => {
  store.logout();
  router.push('/login');
};
</script>
