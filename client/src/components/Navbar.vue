<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Login from './LoginBadge.vue';
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io"> </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/home" class="navbar-item">
          Home
        </RouterLink>
        <RouterLink to="/calendar" class="navbar-item">
          Calendar
        </RouterLink>
      </div>

      <div class="navbar-end">
        <Login/>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-item.router-link-exact-active {
  border-bottom: 2px solid #000;
}
</style>