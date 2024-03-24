<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

const calendarEl = ref(null);
let calendar;

const state = { calendarEl };

onMounted(async () => {
  await nextTick();
  calendar = new Calendar(state.calendarEl.value!, {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    }
  });
  calendar.render();
});
</script>

<template>
  <div :ref="state.calendarEl"></div>
</template>
<<<<<<<
<style>
</style>
=======

<style scoped></style>
>>>>>>>