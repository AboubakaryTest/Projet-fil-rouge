<template>
    <div class="profile">
      <h2>Mon profil</h2>
  
      <div v-if="user">
        <p><strong>Nom :</strong> {{ user.username }}</p>
        <p><strong>Email :</strong> {{ user.email }}</p>
        <p><strong>Créé le :</strong> {{ user.created_at }}</p>
  
        <h3>Modifier mes infos</h3>
        <form @submit.prevent="updateProfile">
          <input v-model="updatedUsername" placeholder="Nouveau nom" />
          <input v-model="updatedEmail" placeholder="Nouvel email" />
          <button type="submit">Mettre à jour</button>
        </form>
  
        <h3>Supprimer mon compte</h3>
        <button @click="deleteAccount" style="color:red">Supprimer</button>
  
        <h3>Déconnexion</h3>
        <button @click="logout">Se déconnecter</button>
      </div>
  
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  import axios from 'axios';
  
  const store = useAuthStore();
  const router = useRouter();
  
  const user = ref(null);
  const message = ref('');
  const updatedUsername = ref('');
  const updatedEmail = ref('');
  
  // ✅ Charger le profil à l'arrivée
  const getProfile = async () => {
    try {
      const res = await axios.get('/api/users/me');
      user.value = res.data;
      updatedUsername.value = res.data.username;
      updatedEmail.value = res.data.email;
    } catch (err) {
      message.value = 'Erreur de chargement du profil';
    }
  };
  
  onMounted(() => {
    getProfile();
  });
  
  // ✅ Mise à jour profil
  const updateProfile = async () => {
    try {
      await axios.put('/api/users/update', {
        username: updatedUsername.value,
        email: updatedEmail.value
      });
      message.value = 'Profil mis à jour !';
      getProfile(); // recharger les infos
    } catch (err) {
      message.value = err.response?.data?.error || 'Erreur lors de la mise à jour';
    }
  };
  
  // ✅ Suppression du compte
  const deleteAccount = async () => {
    if (!confirm("Tu es sûr ? Cette action est irréversible.")) return;
  
    try {
      await axios.delete('/api/users/delete');
      store.logout();
      router.push('/register');
    } catch (err) {
      message.value = 'Erreur lors de la suppression du compte';
    }
  };
  
  // ✅ Déconnexion
  const logout = () => {
    store.logout();
    router.push('/login');
  };
  </script>
  