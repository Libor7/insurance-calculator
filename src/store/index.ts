import { createStore } from "vuex";

export default createStore({
  state: {
    insuranceAmount: 0,
  },
  mutations: {
    setInsuranceAmount(state, amount: number) {
      state.insuranceAmount = amount;
    },
  },
  actions: {
    calculateInsurance({ commit }, payload: number) {
      commit("setInsuranceAmount", payload);
    },
  },
  getters: {
    getInsuranceAmount(state) {
      return state.insuranceAmount;
    },
  },
});
