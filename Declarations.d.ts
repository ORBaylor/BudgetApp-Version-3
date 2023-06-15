import { Store } from 'vuex'
import BudgetOutput from '@/Types/BudgetOutput'
import Budget from '@/Types/Budget'
import CreditCard from '@/Types/CreditCard'


declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        newBudgetOutput: BudgetOutput,
        newBudget: Budget,
        newCreditCard: CreditCard[],

    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}

export default module