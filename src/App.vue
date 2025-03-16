<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-container fluid class="pa-0">
      <RouterView />
    </v-container>
  </v-app>
</template>

<style>
.app-background {
  background-image: url('assets/bg2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>