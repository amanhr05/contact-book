<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const contacts = ref([]);
const searchQuery = ref('');

onMounted(() => {
  const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.value = storedContacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
});

const filteredContacts = computed(() => {
  return contacts.value.filter(contact =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const capitalize = (text) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
};

const goToContact = (id) => {
  router.push(`/contact/${id}`);
};

const addNewContact = () => {
  router.push('/add');
};
</script>

<template>
  <v-container class="app-background" fluid style="min-height: 100vh; background-color: #f4f6f8; padding: 20px;">
    <h1 class="text-center mb-4">Contact Book</h1>
    <v-text-field v-model="searchQuery" label="Search Contact" prepend-inner-icon="mdi-magnify" outlined dense
      class="mb-4"></v-text-field>
    <v-card elevation="3" class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-bold c-font">Saved Contacts</span>
        <v-btn @click="addNewContact" color="primary" class="text-white">Add Contact</v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-table v-if="filteredContacts.length > 0" density="comfortable">
        <thead>
          <tr>
            <th class="text-left font-weight-bold">Last Name</th>
            <th class="text-left font-weight-bold">First Name</th>
            <th class="text-left font-weight-bold">Email</th>
            <th class="text-left font-weight-bold">Phone</th>
            <th class="text-left font-weight-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in filteredContacts" :key="contact.id">
            <td @click="goToContact(contact.id)" class=" text-left c-pointer">{{ capitalize(contact.lastName) }}</td>
            <td @click="goToContact(contact.id)" class="text-left c-pointer">{{ capitalize(contact.firstName) }}</td>
            <td class="text-left">{{ contact.email }}</td>
            <td class="text-left">{{ contact.phone }}</td>
            <td class="text-left">
              <v-btn @click="goToContact(contact.id)" color="blue" size="small">View</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-alert v-else type="info" class="ma-4 text-center pt-5">
        <br>
        No contacts found. Please add a new contact.
      </v-alert>
    </v-card>
  </v-container>
</template>
