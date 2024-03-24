<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Login from './LoginBadge.vue';
import { ref } from "vue";

let isActive = ref(false);

function toggleMenu() {
  isActive.value = !isActive.value;
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" @click="toggleMenu()" :class="{ 'is-active': isActive }" class="navbar-burger custom-text-color" aria-label="menu" aria-expanded="false" style="color: black;"
        data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }" style="color: black;">
      <div class="navbar-start">
        <RouterLink to="/home" class="navbar-item" :class="{ 'is-active': isActive }" style="color: aliceblue;">
          <i class="fas fa-home" style="margin-right: 4px; color: aliceblue;"></i> <a style="color: aliceblue;">Home</a>
        </RouterLink>
        <RouterLink to="/calendar" class="navbar-item" :class="{ 'is-active': isActive }" style="color: aliceblue;">
          <i class="fas fa-calendar-alt" style="margin-right: 4px; color: aliceblue;"></i> <a style="color: aliceblue;">Calendar</a>
        </RouterLink>
      </div>
      <div class="navbar-end" style="margin-right: 15px;">
        <Login :class="{ 'is-active': isActive }" style="color: black;"/>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #36454F;
  height: 4em;
}

.navbar-item.router-link-exact-active {
  border-bottom: 2px solid #ffffff;
  background-color: transparent;
}

.navbar-item:hover {
  background-color: #2B3E4D;
}

.is-active {
  color: black;
}
</style>