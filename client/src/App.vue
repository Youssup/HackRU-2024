<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

</script>
<template>
  <header>
    <nav>
      <Navbar />
    </nav>
  </header>
  <Sidebar :isOpen="isOpen"/>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>