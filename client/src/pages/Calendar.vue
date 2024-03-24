<script setup lang="ts">
import { onMounted, ref, nextTick, computed, type Ref, watchEffect } from 'vue';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getSession, useLogin } from '../models/session';
import { type Event, type Address, getDistanceAndTime } from '../models/users';
import { getUpcomingEvents, createEvent } from '../models/users';
import axios from 'axios';

const calendarEl = ref(null);
const session = getSession();

let userEvents = ref(session.events ?? []);

let calendar;
const state = { calendarEl };

const upcomingEventLocation = ref<Address | null>(null); // Variable to store the location of the upcoming event

const { refresh } = useLogin();

let userIp: any;

onMounted(async () => {
  await nextTick();

  fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        userIp = data.ip;
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
    });
    
  initializeCalendar(userEvents.value);

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
      start: 'timeGridWeek,timeGridDay',
      center: 'title', 
      end: 'prev,today,next'
    },
    events: inputEvents || [],
    eventClick: handleEventClick
  });
  calendar.render();
}

const eventModal = ref(false);
const selectedEventModal = ref(false);

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

const selectedEvent: Ref<Event | null> = ref(null);
const realAddress: Ref<Address | null> = ref(null);
const distance: Ref<number | null> = ref(null);
const time: Ref<number | null> = ref(null);

function openSelectedEventModal() {
  selectedEventModal.value = true;
}
function closeSelectedEventModal() {
  selectedEventModal.value = false;
}

function handleEventClick(info: any) {
  selectedEvent.value = info.event;
  openSelectedEventModal();
}

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

    userEvents.value.push(newEvent);

    await refresh();

    closeEventModal();
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function getAddressFromIp(ipAddress: string): Promise<Address | null> {
    try {
        const response = await axios.get<Address>(`https://ipapi.co/${ipAddress}/json/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching address:', error);
        return null;
    }
}

const calculateDistanceAndTime = computed(async () => {
    if (realAddress.value && selectedEvent.value) {
        const [calculatedDistance, calculatedTime] = await getDistanceAndTime(realAddress.value, selectedEvent.value.location);
        distance.value = calculatedDistance;
        time.value = calculatedTime;
    } else {
        // If either realAddress or selectedEvent is null or undefined
        distance.value = null;
        time.value = null;
    }
});

watchEffect(() => {
    calculateDistanceAndTime.value;
});

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


  <!-- Selected Event Modal -->
  <div class="modal" :class="{ 'is-active': selectedEventModal }" v-if="selectedEvent">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <p><strong>Event Name:</strong> {{ (selectedEvent as any).title }}</p>
              <p><strong>Distance:</strong> {{ distance }}</p>
              <p><strong>Estimated Time:</strong> {{ time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="closeSelectedEventModal" class="modal-close is-large" aria-label="close"></button>
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
