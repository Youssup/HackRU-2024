<script>
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  mounted() {
    const calendar = new Calendar(this.$refs.calendar, {
      plugins: [timeGridPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'timeGridWeek,timeGridDay',
        center: 'title',
        right: 'prev,today,next'
      }
    })
    calendar.render()
  }
}
</script>
<template>
  <div ref="calendar"></div>
</template>