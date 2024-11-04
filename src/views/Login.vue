<template>
  <div class="login">
    <h2>Inicio de Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
    <p>¿No tienes una cuenta? <router-link to="/register">Regístrate aquí</router-link>.</p>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'LoginPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useStore();
    const router = useRouter();

    const handleLogin = async () => {
      try {
        await store.dispatch('auth/login', { email: email.value, password: password.value });
        router.push('/dashboard'); // Redirige a la página protegida
      } catch (error) {
        alert('Error al iniciar sesión');
      }
    };

    return { email, password, handleLogin };
  }
};
</script>
