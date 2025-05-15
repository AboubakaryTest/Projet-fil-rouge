<template>
    <div class="login">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'                  // ✅ AJOUT OBLIGATOIRE
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  
  const store = useAuthStore()
  const router = useRouter()
  
  const email = ref('')
  const password = ref('')
  const message = ref('')
  
  const login = async () => {
    try {
      const res = await axios.post('/api/users/login', {
        email: email.value,
        password: password.value
      })
      store.setToken(res.data.token)
      message.value = 'Connexion réussie'
      router.push('/profile')
    } catch (err) {
      message.value = err.response?.data?.error || 'Erreur de connexion.'
    }
  }
  </script>
  