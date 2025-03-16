<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');
const city = ref('');
const country = ref('');

const isEditing = ref(false);
const formValid = ref(false);

const rules = {
  required: value => !!value || 'This field is required',
  minLength: length => value => (value.length >= length) || `Minimum ${length} characters required`,
  maxLength: length => value => (value.length <= length) || `Maximum ${length} characters allowed`,
  email: value => /.+@.+\..+/.test(value) || 'Enter a valid email',
  phone: value => /^\d{10,15}$/.test(value) || 'Enter a valid phone number (10-15 digits)',
  lettersOnly: value => /^[A-Za-z\s]+$/.test(value) || 'Only letters are allowed',
};


onMounted(() => {
  if (route.params.id) {
    isEditing.value = true;
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts.find(c => c.id == route.params.id);
    if (contact) {
      firstName.value = contact.firstName;
      lastName.value = contact.lastName;
      email.value = contact.email;
      phone.value = contact.phone || '';
      address.value = contact.address || '';
      city.value = contact.city || '';
      country.value = contact.country || '';
    }
  }
});

const saveContact = () => {
  if (!formValid.value) return;

  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  let newContact = {};
  if (isEditing.value) {
    contacts = contacts.map(contact =>
      contact.id == route.params.id
        ? {
          id: contact.id,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phone: phone.value,
          address: address.value,
          city: city.value,
          country: country.value,
        }
        : contact
    );
  } else {
    newContact = {
      id: Date.now(),
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      city: city.value,
      country: country.value,
    };
    contacts.push(newContact);
  }

  localStorage.setItem('contacts', JSON.stringify(contacts));
  router.push(`/contact/${isEditing.value ? route.params.id : newContact.id}`);
};
</script>

<template>
  <v-container class="app-background" fluid>
    <h1 class="text-center ps-5 pe-5 mb-5">{{ isEditing ? 'Edit Contact' : 'Add Contact' }}</h1>

    <v-card class="pa-4 mx-auto" style="width: 80%;" elevation="3">
      <v-form v-model="formValid" @submit.prevent="saveContact">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="firstName" label="First Name*"
              :rules="[rules.required, rules.minLength(2), rules.maxLength(25)]" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="lastName" label="Last Name*"
              :rules="[rules.required, rules.minLength(2), rules.maxLength(25)]" required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="email" label="Email*" type="email" :rules="[rules.required, rules.email]" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="phone" label="Phone Number*" type="tel" :rules="[rules.required, rules.phone]"
              required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="address" label="Address" :rules="[value => !value || rules.minLength(5)(value)]">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="city" label="City" :rules="[value => !value || rules.minLength(2)(value)]">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="country" label="Country" :rules="[
              value => !value || rules.minLength(2)(value),
              value => !value || rules.lettersOnly(value)
            ]">
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit" color="success" block class="mt-3">
          {{ isEditing ? 'Update Contact' : 'Save Contact' }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
