<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4">
          <h2 class="mb-4">Connexion</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div class="mb-3">
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Mot de passe"
                required
              />
            </div>
            <button class="btn btn-primary w-100">Se connecter</button>
            <p v-if="message" class="text-danger mt-3">{{ message }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const message = ref('');
const router = useRouter();
const store = useAuthStore();

const login = async () => {
  try {
    const res = await axios.post('/api/users/login', {
      email: email.value,
      password: password.value
    });
    store.setToken(res.data.token);
    router.push('/profile');
  } catch (err) {
    message.value = err.response?.data?.error || 'Erreur de connexion.';
  }
};
</script>
