<template>
  <div class="register">
    <h2>Registro de Usuario</h2>
    <form v-if="!registroExitoso" @submit.prevent="handleRegister">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="nombre" required />
      </div>
      <div>
        <label for="apellido">Apellido:</label>
        <input type="text" v-model="apellido" required />
      </div>
      <div>
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="telefono">Teléfono:</label>
        <input type="tel" v-model="telefono" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Registrarse</button>
    </form>

    <div v-else class="confirmation">
      <p>¡Registro exitoso! Tu cuenta ha sido creada.</p>
      <button @click="redirectToLogin">Ir a Iniciar Sesión</button>
    </div>

    <p v-if="!registroExitoso">¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión aquí</router-link>.</p>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'RegisterPage',
  setup() {
    const nombre = ref('');
    const apellido = ref('');
    const email = ref('');
    const telefono = ref('');
    const password = ref('');
    const registroExitoso = ref(false); // Nueva variable para controlar el mensaje de éxito
    const store = useStore();
    const router = useRouter();

    const handleRegister = async () => {
      try {
        await store.dispatch('auth/register', {
          nombre: nombre.value,
          apellido: apellido.value,
          email: email.value,
          telefono: telefono.value,
          password: password.value
        });
        registroExitoso.value = true; // Muestra el mensaje de éxito
      } catch (error) {
        alert('Error al registrarse');
      }
    };

    const redirectToLogin = () => {
      router.push('/login'); // Redirige a la pantalla de inicio de sesión después de confirmar
    };

    return { nombre, apellido, email, telefono, password, handleRegister, registroExitoso, redirectToLogin };
  }
};
</script>
