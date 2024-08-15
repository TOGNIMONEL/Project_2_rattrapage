<template>
<Navbar />
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-6">Welcome</h1>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input v-model="username" id="username" type="text" placeholder="Username" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" id="password" type="password" placeholder="Password" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue'

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const error = ref('');

    const login = async () => {
      try {
        await authStore.login(username.value, password.value);
        router.push('/events');
      } catch (err) {
        error.value = err.message;
      }
    };

    return { username, password, login, error };
  },
};
</script>