
import Dictionary from '@/Types/Dictionary'

interface BudgetOutput {
    OriginalAmount: Map<string, Number>,
    CurrentAmount: Map<string, Number>,
    Account1: number,
    Account2: number,
    AccountOneAppleAmount: number,
    AccountTwoAppleAmount: number,
    PayMyself1: number,
    PayMyself2: number,
    PayPeriod: number,
    ErrorMessages: string[]
}



export default BudgetOutput