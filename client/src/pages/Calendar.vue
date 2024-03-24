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
      left: 'timeGridWeek,timeGridDay',
      center: 'prev,today,next',
      right: 'title'
    },
    events: events || []
  });
  calendar.render();
}

const eventModal = ref(false);

function openEventModal() {
  eventModal.value = true;
}
function closeEventModal() {
  eventModal.value = false;
}

const name = ref('');
const location = ref(0);
const startDate = ref(0);
const endDate = ref(0);
const startTime = ref(0);
const endTime = ref(0);
const extraTime = ref(0);

/*function addEvent() {

}*/
</script>

<template>
  <div class="input-container">
    <button @click="openEventModal" class="button is-primary is-rounded" style="margin-bottom: 30px;">Add Event</button>
  </div>
  <div :ref="state.calendarEl" class="calendar-container"></div>
  <!-- Add Event Modal -->
  <div class="modal" :class="{ 'is-active': eventModal }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="field">
          <label class="label">Event Name</label>
          <input class="input" type="text" placeholder="Event Name" v-model="name">
        </div>
        <div class="field">
          <label class="label">Location</label>
          <input class="input" type="text" placeholder="Location" v-model="location">
        </div>
        <div class="field">
          <label class="label">Start Date</label>
          <input class="input" type="date" placeholder="Start Date" v-model="startDate">
        </div>
        <div class="field">
          <label class="label">End Date</label>
          <input class="input" type="date" placeholder="End Date" v-model="endDate">
        </div>
        <div class="field">
          <label class="label">Start Time</label>
          <input class="input" type="date" placeholder="Start Time" v-model="startTime">
        </div>
        <div class="field">
          <label class="label">End Time</label>
          <input class="input" type="date" placeholder="End Time" v-model="endTime">
        </div>
        <div class="field">
          <label class="label">Extra Time</label>
          <input class="input" type="number" placeholder="Extra Time" v-model="extraTime">
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button @click="closeEventModal" class="button is-link">Add Event</button>
          </div>
          <div class="control">
            <button @click="closeEventModal" class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="closeEventModal" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
}

.styled-input {
  padding: 10px 20px;
  font-size: 1.2em;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  text-align: center;
  transition: border-color 0.3s ease;
}

.styled-input:focus {
  border-color: #007BFF;
}

.calendar-container {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
