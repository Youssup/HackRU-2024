<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import Chat from './components/Chat.vue';

let isOpen = ref(false);

</script>
<template>
  <header>
    <nav>
      <Navbar />
    </nav>
  </header>
  <Sidebar :isOpen="isOpen" />
  <main>
    <RouterView />
  </main>
  <Chat />
</template>

<style scoped></style>