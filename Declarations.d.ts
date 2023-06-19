import { Store } from 'vuex'
import BudgetOutput from '@/Types/BudgetOutput'
import Budget from '@/Types/Budget'
import CreditCard from '@/Types/CreditCard'
import ChartData from '@/Types/CreditCardChartData'


declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        newBudgetOutput: BudgetOutput,
        newBudget: Budget,
        newCreditCard: CreditCard[],
        newCreditCardChartData: CreditCardChartData[],
        finalPayPeriod: 1

    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}

export default module