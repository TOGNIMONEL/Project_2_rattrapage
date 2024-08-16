<template>
  <div class="p-4 bg-gray-800 text-white">
    <button @click="logout" class="bg-red-500 px-4 py-2 rounded"> Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logout = () => {
      authStore.logout();
      router.push('/');
    };

    return { logout };
  },
};
</script>