import apiClient from '../../axios';

const authModule = {
  state: {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  },
  actions: {
    async register(_, userData)  {
      try {
        await apiClient.post('/auth/register', userData);
        // Redirige al usuario a la pantalla de inicio de sesión después del registro
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
      } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await apiClient.post('/auth/login', credentials);
        const token = response.data.token;
        commit('SET_TOKEN', token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configura el token para futuras solicitudes
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('CLEAR_TOKEN');
      delete apiClient.defaults.headers.common['Authorization'];
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    }
  }
};

export default authModule;
