<script setup lang="ts">
import { getSession } from '../models/session'

const props = defineProps<{
    isOpen: boolean
}>();

const session = getSession();

</script>

<template>
  <div class="Sidebar" :class="{ open: isOpen }">
    <article class="panel is-primary">
      <p class="panel-heading">Primary</p>
      <p class="panel-tabs">
      </p>
      <div class="panel-block">
        <input class="input is-primary" type="text" placeholder="Find Friends!" />
      </div>
      <a v-for="friend in session.friends" :key="friend.id" class="panel-block">
          {{ friend.firstName }} {{ friend.lastName }}
      </a>
    </article>
  </div>
</template>

<style scoped>
.Sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 20rem;
  height: 100%;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: -1px 0 5px 0 rgba(0, 0, 0, .5);
  z-index: 100;
  transform: translateX(95%);
  transition: transform 1s;
  padding: 1rem;
}

.Sidebar.open,
.Sidebar:hover {
  transform: translateX(0);
}
</style>