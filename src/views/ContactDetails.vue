<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const contact = ref(null);

onMounted(() => {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contact.value = contacts.find(c => c.id == route.params.id) || null;
});

const goBackToList = () => {
  router.push('/');
};

const editContact = () => {
  if (contact.value) {
    router.push(`/edit/${route.params.id}`);
  }
};

const capitalize = (text) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
};

const deleteContact = () => {
  if (!contact.value) return;

  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts = contacts.filter(c => c.id != route.params.id);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  goBackToList();
};
</script>

<template>
  <v-container fluid class="d-flex justify-center align-center app-background" style="height: 100vh;">
    <v-card v-if="contact" class="pa-6 mx-auto" width="500" elevation="4">
      <v-card-title class="text-h5 c-font font-weight-bold text-center">
        {{ capitalize(contact.firstName) }} {{ capitalize(contact.lastName) }}
      </v-card-title>

      <v-card-text class="text-left">
        <v-list>
          <v-list-item>
            <strong>Email:</strong> {{ contact.email || 'N/A' }}
          </v-list-item>
          <v-list-item>
            <strong>Phone:</strong> {{ contact.phone || 'N/A' }}
          </v-list-item>
          <v-list-item>
            <strong>Country:</strong> {{ contact.country || 'N/A' }}
          </v-list-item>
          <v-list-item>
            <strong>City:</strong> {{ contact.city || 'N/A' }}
          </v-list-item>
          <v-list-item v-if="contact.address">
            <strong>Address:</strong> {{ contact.address || 'N/A' }}
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between">
        <v-btn color="primary" @click="editContact">Edit Contact</v-btn>
        <v-btn color="error" @click="deleteContact">Delete Contact</v-btn>
      </v-card-actions>

      <v-divider class="my-4"></v-divider>

      <v-btn block color="blue darken-2" @click="goBackToList">
        View All Contacts
      </v-btn>
    </v-card>

    <v-card v-else class="pa-6 mx-auto text-center" width="400" elevation="4">
      <v-card-title class="text-h5 font-weight-bold">Contact Not Found</v-card-title>
      <v-card-text>The contact you are looking for does not exist.</v-card-text>
      <v-btn block color="grey darken-2" @click="goBackToList">
        View All Contacts
      </v-btn>
    </v-card>
  </v-container>
</template>
