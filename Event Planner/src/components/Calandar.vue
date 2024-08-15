<template>
  <div>
    <vue-cal
      v-model="events"
      :events="events"
      :event-color="'#ff6347'"
      :header="true"
      :show-today="true"
    ></vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useEventStore } from '../stores/eventStore';

export default {
  components: { VueCal },
  setup() {
    const eventStore = useEventStore();
    const events = eventStore.events;

    return { events };
  },
};
</script>