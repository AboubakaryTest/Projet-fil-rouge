<template>
    <div class="register">
      <h2>Créer un compte</h2>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Nom" required />
        <input v-model="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        message: ''
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('/api/users/register', {
            username: this.username,
            email: this.email,
            password: this.password
          });
          this.message = "Inscription réussie, vous pouvez vous connecter.";
          this.username = '';
          this.email = '';
          this.password = '';
        } catch (err) {
          this.message = err.response?.data?.error || "Erreur lors de l'inscription.";
        }
      }
    }
  };
  </script>
  