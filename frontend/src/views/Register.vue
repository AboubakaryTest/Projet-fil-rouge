<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4">
          <h2 class="mb-4">Inscription</h2>
          <form @submit.prevent="register">
            <div class="mb-3">
              <input
                v-model="username"
                type="text"
                class="form-control"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
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
            <button class="btn btn-success w-100">Créer un compte</button>
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

const username = ref('');
const email = ref('');
const password = ref('');
const message = ref('');
const router = useRouter();

const register = async () => {
  try {
    await axios.post('/api/users/register', {
      username: username.value,
      email: email.value,
      password: password.value
    });
    router.push('/login');
  } catch (err) {
    message.value = err.response?.data?.error || "Erreur d'inscription.";
  }
};
</script>
