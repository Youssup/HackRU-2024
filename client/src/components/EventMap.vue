<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUsers, getUserEvents, type User } from "../models/users";
import { getSession } from "../models/session";
import { loadScript } from '../models/myfetch';

const session = getSession();

async function initMap() {
    await loadScript("https://maps.googleapis.com/maps/api/js?key=" + import.meta.env.VITE_GOOGLE_API_KEY, "google-maps");

    const events = getUserEvents(session.user?.email ?? '');

}
</script>

<template>
    <div>

    </div>
</template>

<style scoped>

</style>