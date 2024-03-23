<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getSession } from './models/session';
import Navbar from './components/Navbar.vue';

const session = getSession();

</script>

<template>
  <header>
      <nav>
        <Navbar />
      </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>