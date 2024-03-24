<script setup lang="ts">

</script>

<template>
<div class="navbar-item has-dropdown is-hoverable">
  <a class="navbar-link is-arrowless custom-text-color">
    Friends
  </a>
  <div class="navbar-dropdown">
    <a class="navbar-item">
      Overview
    </a>
    <a class="navbar-item">
      Elements
    </a>
    <a class="navbar-item">
      Components
    </a>
    <hr class="navbar-divider">
    <div class="navbar-item">
      Version 1.0.0
    </div>
  </div>
</div>
</template>

<style scoped>

.custom-text-color {
  color: whitesmoke;
}
/* 
.navbar-dropdown .navbar-item:hover {
  background-color: purple; /* Hover color for dropdown items
}
*/
.navbar-item:hover {
  background-color: purple; /* Change the background color on hover */
}

.navbar-item.is-active {
  background-color: purple; /* Keep the background color active when hovered */
}

</style>