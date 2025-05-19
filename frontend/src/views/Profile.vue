<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card p-4">
          <h2 class="mb-4">Mon Profil</h2>

          <div v-if="user">
            <p><strong>Nom :</strong> {{ user.username }}</p>
            <p><strong>Email :</strong> {{ user.email }}</p>
            <p><strong>Créé le :</strong> {{ user.created_at }}</p>

            <hr class="my-4" />

            <h5>Modifier mes informations</h5>
            <form @submit.prevent="updateProfile" class="row g-3 mb-3">
              <div class="col-md-6">
                <input
                  v-model="updatedUsername"
                  class="form-control"
                  placeholder="Nouveau nom"
                />
              </div>
              <div class="col-md-6">
                <input
                  v-model="updatedEmail"
                  class="form-control"
                  placeholder="Nouvel email"
                />
              </div>
              <div class="col-12">
                <button class="btn btn-primary w-100">Mettre à jour</button>
              </div>
            </form>

            <h5 class="text-danger mt-4">Supprimer mon compte</h5>
            <button @click="deleteAccount" class="btn btn-outline-danger w-100">
              Supprimer mon compte
            </button>

            <h5 class="mt-4">Déconnexion</h5>
            <button @click="logout" class="btn btn-secondary w-100">
              Se déconnecter
            </button>
          </div>

          <p v-if="message" class="text-info mt-3">{{ message }}</p>
        </div>
      </div>
    </div>
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

const getProfile = async () => {
  try {
    const res = await axios.get('/api/users/me');
    user.value = res.data;
    updatedUsername.value = res.data.username;
    updatedEmail.value = res.data.email;
  } catch (err) {
    message.value = "Erreur de chargement du profil";
  }
};

onMounted(getProfile);

const updateProfile = async () => {
  try {
    await axios.put('/api/users/update', {
      username: updatedUsername.value,
      email: updatedEmail.value
    });
    message.value = 'Profil mis à jour !';
    getProfile();
  } catch (err) {
    message.value = err.response?.data?.error || "Erreur lors de la mise à jour.";
  }
};

const deleteAccount = async () => {
  if (!confirm("Supprimer votre compte ?")) return;
  try {
    await axios.delete('/api/users/delete');
    store.logout();
    router.push('/register');
  } catch (err) {
    message.value = "Erreur lors de la suppression du compte.";
  }
};

const logout = () => {
  store.logout();
  router.push('/login');
};
</script>
