import { ref } from 'vue'
import { createStore } from 'vuex'
import BudgetOutput from '@/Types/BudgetOutput'
import Budget from '@/Types/Budget'
import CreditCard from '@/Types/CreditCard'
import CreditCardChartData from '@/Types/CreditCardChartData'
//import Declarations from "Declarations"
// import { ComponentCustomProperties } from "vue";
// import { Store } from "vuex";

// declare module "@vue/runtime-core" {
//   interface ComponentCustomProperties {
//     $store: Store<State>;
//   }
// }

// const newBudgetOutput = ref<BudgetOutput>();
// const newBudget = ref<Budget>();
// const newCreditCard = ref<CreditCard>();

interface RootSate {
  newBudgetOutput: BudgetOutput,
  newBudget: Budget,
  newCreditCard: CreditCard[],
  newCreditCardChartData: CreditCardChartData[],
  finalPayPeriod: 1

}


export default createStore<RootSate>({
  state: {
    newBudgetOutput: {} as BudgetOutput,
    newBudget: {} as Budget,
    newCreditCard: {} as CreditCard[],
    newCreditCardChartData: [] as CreditCardChartData[],
    finalPayPeriod: 1,


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
