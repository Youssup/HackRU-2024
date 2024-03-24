<script setup lang="ts">
import { ref } from 'vue';

const isCardActive = ref(false);
const toggleCard = () => {
    isCardActive.value = !isCardActive.value;
}
const activeTab = ref('pictures');

// function to show tab
</script>


<template>
    <!-- <section class="hero is-primary is-fullheigh-with-navbar has-text-black">
        <div class="hero-body">
            <p class="title  has-text-black">Better Calendar</p>
            <p class="subtitle has-text-black">Planning your route for you.</p>
        </div> -->

        <section class="hero is-fullheight-with-navbar has-text-black">
            <div class="image-overlay">
                <img src="https://www.westcentralabilities.ca/wp-content/uploads/2021/02/calendar-green-overlay.png" alt="cal" class="image-overlay">
            </div>
        <div class="hero-body" style="background-color: transparent;">
            <p class="title has-text-black" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);">Better Calendar</p>
            <p class="subtitle has-text-black" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);">Planning your route for you.</p>
        </div>



        <div class="hero-foot">
            <nav class="tabs">
                <div class="container">
                    <ul>
                        <!-- <li @click="toggleCard"><a><span>Pictures</span></a></li>
                        <li @click="toggleCard"><a><span>Music</span></a></li>
                        <li @click="toggleCard"><a><span>Videos</span></a></li>
                        <li @click="toggleCard"><a><span>Documents</span></a></li> -->

                        <li @click="" :class="{ 'is-active': activeTab === 'pictures' }"><a><span>What is BetterCalendar</span></a></li>
                        <li @click="" :class="{ 'is-active': activeTab === 'music' }"><a><span>How does it work</span></a></li>
                        <li @click="" :class="{ 'is-active': activeTab === 'videos' }"><a><span>A deeper look</span></a></li>
                        <li @click="" :class="{ 'is-active': activeTab === 'documents' }"><a><span>Documents</span></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </section>

            <!-- Card content -->
            <div class="container">
      <div v-if="activeTab === 'pictures'" class="card">
        <header class="card-header">
          <p class="card-header-title">BetterCalendar</p>
        </header>
        <div class="card-content">
          <div class="content">
            BetterCalendar is exactly what it sounds like - a better calendar. 
             you ever lost track of time when you had someplace to be. 
             You suddenly have 10 minutes to get somewhere 20 minutes away. 
             That's where BetterCalendar comes in. It's an easy to use calendar that connects you with a GPS. 
             Instead of marking to be reminded a certain amount of time before an event (like on Google Calendar), 
             BetterCalendar calculates your ETA so it can remind you 5 minutes before you leave. You just enter the date, 
             time and location of an event and forget about it until BetterCalendar reminds.
          </div>
        </div>
      </div>


      <div v-else-if="activeTab === 'music'" class="card">
        <header class="card-header">
          <p class="card-header-title">How does it work</p>
        </header>
        <div class="card-content">
          <div class="content">
            BetterCalendar combines many API and languages to create the best calendar/gps website possible.
          </div>
        </div>
      </div>

      
      <div v-else-if="activeTab === 'videos'" class="card">
        <header class="card-header">
          <p class="card-header-title">A deeper look</p>
        </header>
        <div class="card-content">
          <div class="content">
            With only 24 hours to code this app, there are many things we wanted to add but just didn't have the time. 
            For the suggestions tab, we wanted to use Yelp API to create AI suggestions on restaursnts nearby. You would 
            fill out a survey in the beginning where your answers would be used to train our model (thinking of using tensorflow). 
            From there, the model would predict what type of food you like and create suggestions for restaurants near your event. 
            BetterCalendar would send you a notification to leave earlier if you want to get food, showing you the top 5 restaurants 
            in the area. The more you use the recommendation system, the smarter the AI model gets!

            add stuff
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'documents'" class="card">
        <header class="card-header">
          <p class="card-header-title">Languages, Frameworks, Libraries, APIs</p>
        </header>
        <div class="card-content">
          <div class="content">
            <ul>
              HTML, CSS, JavaScript, TypeScript, Vue.js, Node.js, Bulma, FullCalendar, Express, Google Maps API, ipGeolocation API, Axios
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.container {
    text-align: center;
}

/* .hero-body {
        background-image: url('https://www.westcentralabilities.ca/wp-content/uploads/2021/02/calendar-green-overlay.png');
        background-size: 60%;
} */

.image-overlay {
        position: absolute;
        top: 60;
        right: 5%;
        width: 70%;
        height: 90%;
        z-index: -1; /* Ensures that the overlay is behind the text */
    }
    .overlay-image {
    width: 50%; /* Adjust the width as needed */
    height: auto;
    opacity: 0.2; /* Adjust the opacity as needed (0.0 to 1.0) */
    position: absolute;
    top: 90%; /* Position the image in the middle vertically */
    right: 80%; /* Adjust the distance from the right side */
    transform: translateY(-50%); /* Center the image vertically */
}


    .hero-body {
        position: relative; /* Ensure that the hero body is relative to its parent */
    }





/* Change background color when hovering */
.tabs ul li a:hover,
.tabs ul li.is-active {
  background-color: white;
}




.card-header {
  background-color: var(--card-header-background-color, transparent);
  color: var(--card-header-color, var(--bulma-text-strong));
  padding: var(--card-header-padding, 0.75rem 1rem);
  box-shadow: var(--card-header-shadow, 0 0.125em 0.25em hsla(var(--bulma-scheme-h, 0), var(--bulma-scheme-s, 0), var(--bulma-scheme-invert-l, 0), 0.1));
  font-weight: var(--card-header-weight, var(--bulma-weight-bold));
}

.card-content {
  background-color: var(--card-content-background-color, transparent);
  padding: var(--card-content-padding, 1.5rem);
}

.card-footer {
  background-color: var(--card-footer-background-color, transparent);
  border-top: var(--card-footer-border-top, 1px solid var(--bulma-border-weak));
  padding: var(--card-footer-padding, 0.75rem);
}

.card-footer-item {
  color: var(--bulma-text);
}

.title {
    font-size: 50px;
    font-weight: bold;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: #333;
    margin-top: 20px;
}

</style>