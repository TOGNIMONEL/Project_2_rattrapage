import { defineStore } from 'pinia';

export const useEventStore = defineStore('events', {
  state: () => ({
    events: JSON.parse(localStorage.getItem('events')) || [],
  }),
  actions: {
    fetchEvents() {
      this.events = JSON.parse(localStorage.getItem('events')) || [];
    },
    addEvent(event) {
      this.events.push(event);
      localStorage.setItem('events', JSON.stringify(this.events));
    },
    updateEvent(id, updatedEvent) {
      const index = this.events.findIndex(event => event.id === id);
      if (index !== -1) {
        this.events[index] = { ...this.events[index], ...updatedEvent };
        localStorage.setItem('events', JSON.stringify(this.events));
      }
    },
    deleteEvent(id) {
      this.events = this.events.filter(event => event.id !== id);
      localStorage.setItem('events', JSON.stringify(this.events));
    },
  },
});