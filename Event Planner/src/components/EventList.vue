<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Event Calendar</h1>
    <Calendar />
  </div>
</template>

<script>
import Calendar from '../components/Calandar.vue';

export default {
  components: { Calendar },
};
</script>
