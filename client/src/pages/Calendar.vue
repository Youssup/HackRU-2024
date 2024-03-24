<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getSession, useLogin } from '../models/session';
import type { Event, Address } from '../models/users';
import { getUpcomingEvents, createEvent } from '../models/users';

const calendarEl = ref(null);
const session = getSession();

let userEvents = session.events ?? [];

let calendar;
const state = { calendarEl };

const upcomingEventLocation = ref<Address | null>(null); // Variable to store the location of the upcoming event

const { refresh } = useLogin()

onMounted(async () => {
  await nextTick();

  initializeCalendar(userEvents);

  // Fetch the next upcoming event and store its location
  const upcomingEvents = await getUpcomingEvents(session.user?.email || '', 1);
  if (upcomingEvents) {
    upcomingEventLocation.value = upcomingEvents[0].location;
    console.log(upcomingEvents[0].location);
    console.log(upcomingEventLocation.value.address);
  }
});

function initializeCalendar(inputEvents: Event[] | undefined) {
  calendar = new Calendar(state.calendarEl.value!, {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'timeGridWeek,timeGridDay',
      center: 'prev,today,next',
      right: 'title'
    },
    events: inputEvents || []
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
const location = ref('');
const startDate = ref(0);
const endDate = ref(0);
const startTime = ref(0);
const endTime = ref(0);

/*
    eventId: 0,
    title: "",
    eventColor: "",
    description: "",
    location: Address,
    start: dayjs(),
    end: dayjs(),
    invited: []
*/

async function handleCreateEvent() {
  const startDateTime = new Date(startDate.value + 'T' + startTime.value); // startDateTime.toISOString(); 
  const endDateTime = new Date(endDate.value + 'T' + endTime.value); // endDateTime.toISOString(); 
    try {
        const newEvent = await createEvent({
            title: name.value,
            start: startDateTime.toISOString().slice(0, -5),
            end: endDateTime.toISOString().slice(0, -5),
            description: "", // You might want to add a description here if needed
            color: "#0000FF",
            location: {
                address: location.value,
                city: "", // Add city if needed
                coordinates: {
                    latitude: 0, // Add latitude if needed
                    longitude: 0 // Add longitude if needed
                },
                postalCode: "", // Add postal code if needed
                state: "" // Add state if needed
            },
            invited: [],
            id: session.user?.id
        });

        userEvents.push(newEvent);

        await refresh();

        closeEventModal();
    } catch (error) {
        console.error('Error creating user:', error);
    }
}
</script>

<template>
  <div class="input-container" v-if="session.user">
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
          <input class="input" type="time" placeholder="Start Time" v-model="startTime">
        </div>
        <div class="field">
          <label class="label">End Time</label>
          <input class="input" type="time" placeholder="End Time" v-model="endTime">
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button @click="handleCreateEvent()" class="button is-link">Add Event</button>
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
