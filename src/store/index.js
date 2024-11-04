import { createStore } from 'vuex';
import auth from './modules/auth'; // Importamos el módulo de autenticación

const store = createStore({
  state() {
    return {
      cart: [] // Estado inicial para el carrito
    };
  },
  mutations: {
    addToCart(state, product) {
      // Agrega un producto al carrito
      const item = state.cart.find(item => item.id === product.id);
      if (item) {
        item.quantity += product.quantity;
      } else {
        state.cart.push(product);
      }
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addProductToCart({ commit }, product) {
      commit('addToCart', product);
    },
    emptyCart({ commit }) {
      commit('clearCart');
    }
  },
  getters: {
    cartItems: (state) => state.cart,
    cartTotal: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  modules: {
    auth // Módulo de autenticación, separado del carrito
  }
});

export default store;
