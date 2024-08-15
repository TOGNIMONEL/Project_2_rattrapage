import { defineStore } from 'pinia';
import bcrypt from 'bcryptjs';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('authenticated'));
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const login = async (username, password) => {
    const user = users.find(user => user.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
      localStorage.setItem('authenticated', 'true');
      isAuthenticated.value = true;
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = (username, password) => {
    if (users.some(user => user.username === username)) {
      throw new Error('Username already exists');
    }
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
    users.push({ username, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('authenticated', 'true');
    isAuthenticated.value = true;
  };

  const logout = () => {
    localStorage.removeItem('authenticated');
    isAuthenticated.value = false;
  };

  return { isAuthenticated, login, register, logout };
});