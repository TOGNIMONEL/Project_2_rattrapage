<template>
  <div class="p-4">
    <form @submit.prevent="saveEvent" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input v-model="event.title" id="title" type="text" placeholder="Title" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <input v-model="event.description" id="description" type="text" placeholder="Description" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input v-model="event.date" id="date" type="datetime-local" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div class="mb-4">
        <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
        <input v-model="event.location" id="location" type="text" placeholder="Location" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useEventStore } from '../stores/eventStore';

export default {
  props: {
    eventId: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const store = useEventStore();
    const event = ref({
      id: props.eventId || Date.now(), 
      title: '',
      description: '',
      date: '',
      location: ''
    });

    const loadEvent = () => {
      if (props.eventId !== null) {
        const existingEvent = store.events.find(e => e.id === props.eventId);
        if (existingEvent) {
          Object.assign(event.value, existingEvent);
        }
      }
    };

    if (props.eventId !== null) {
      loadEvent();
    }

    const saveEvent = () => {
      if (props.eventId === null) {
        store.addEvent(event.value);
      } else {
        store.updateEvent(event.value.id, event.value);
      }
      this.$router.push("/event");
    };

    return { event, saveEvent };
  },
};
</script>