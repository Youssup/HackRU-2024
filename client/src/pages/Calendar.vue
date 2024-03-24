<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getSession } from '../models/session';
import type { Event, Address } from '../models/users';
import { getUserEvents, getUpcomingEvents } from '../models/users';

const calendarEl = ref(null);
let calendar;
const state = { calendarEl };

const session = getSession();
const upcomingEventLocation = ref<Address | null>(null); // Variable to store the location of the upcoming event

onMounted(async () => {
  await nextTick();
  const events = await getUserEvents(session.user?.email || '');
  initializeCalendar(events);

  // Fetch the next upcoming event and store its location
  const upcomingEvents = await getUpcomingEvents(session.user?.email || '', 1);
  if (upcomingEvents) {
    upcomingEventLocation.value = upcomingEvents[0].eventLocation;
    console.log(upcomingEvents[0].eventLocation);
    console.log(upcomingEventLocation.value.address);
  }
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

//console.log(upcomingEventLocation.value);

</script>

<template>
  <h1 v-if="upcomingEventLocation">{{ upcomingEventLocation.address }}</h1>
  <div :ref="state.calendarEl"></div>
</template>

<style scoped></style>
