<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Login from './LoginBadge.vue';
import Sidebar from './Sidebar.vue';
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io"> </a>

      <a role="button" class="navbar-burger custom-text-color" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <Sidebar />
        <RouterLink to="/home" class="navbar-item custom-text-color">
          Home
        </RouterLink>
        <RouterLink to="/calendar" class="navbar-item custom-text-color">
          Calendar
        </RouterLink>
        <RouterLink to="/suggestion" class="navbar-item custom-text-color">
          Suggestions
        </RouterLink>
      </div>

      <div class="navbar-end">
        <Login/>
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
  border-bottom: 2px solid #000;
}

.custom-text-color {
  color: whitesmoke;
}
</style>