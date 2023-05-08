import { createStore } from 'vuex';

const state = {
  fromCurrency: '',
  toCurrency: '',
}

const mutations = {
  SET_FROM_CURRENCY(state, payload) {
    state.fromCurrency = payload;
  },
  SET_TO_CURRENCY(state, payload) {
    state.toCurrency = payload;
  },
}

const actions = {
  setFromCurrency({ commit }, payload) {
    commit('SET_FROM_CURRENCY', payload);
  },
  setToCurrency({ commit }, payload) {
    commit('SET_TO_CURRENCY', payload);
  },
}

export const store = createStore({
  state,
  mutations,
  actions,
});