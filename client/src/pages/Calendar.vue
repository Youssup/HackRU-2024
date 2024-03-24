<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getSession } from '../models/session';
import type { Event } from '../models/users';
import { getUserEvents } from '../models/users';

const calendarEl = ref(null);
let calendar;
const state = { calendarEl };

const session = getSession();

onMounted(async () => {
  await nextTick();
  const events = await getUserEvents(session.user?.email || '');
  initializeCalendar(events);
});

function initializeCalendar(events: Event[] | undefined) {
  calendar = new Calendar(state.calendarEl.value!, {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    events: events || []
  });
  calendar.render();
}
</script>

<template>
  <div :ref="state.calendarEl"></div>
</template>

<style scoped></style>
