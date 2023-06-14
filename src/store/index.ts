import { ref } from 'vue'
import { createStore } from 'vuex'
import BudgetOutput from '@/Types/BudgetOutput'

const newBudgetOutput = ref<BudgetOutput>();

export default createStore({
  state: {
    newBudgetOutput,
    errorMessageArray: "",
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {

  }
})
