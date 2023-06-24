<template>
    <div class="hello" style=" ">

        <v-sheet :class="payPeriod == true ? 'v-sheet-pay1' : 'v-sheet-pay2'" :elevation="17" rounded
            style="display: flex; flex-direction: column; justify-content: center; align-content: center; width: 45vh; height:auto ; ">
            <v-card class="mx-auto v-card" max-width="344" variant="outlined" style=" height: auto; width: 43vh;">
                <v-card-item style="height: auto;">
                    <h5 style="margin-bottom: -6%;">SELCT PAY PERIOD </h5>

                    <v-switch style="margin-left: 25%; margin-bottom: -3%;" v-model="payPeriod" hide-details inset
                        true-value="2" false-value="1" :label="`Pay Periods: ${Number(payPeriod)}`"></v-switch>
                    <v-divider></v-divider>
                    <h5 style="margin-bottom: -3%;">ENTER ACCOUNT AMOUNTS</h5>
                    <v-form>
                        <v-container>
                            <v-row style="display: flex; flex-direction: column;">
                                <v-col style="height: 20px; margin-bottom: 10%;">
                                    <v-text-field v-model="newBudget.Account1" :counter="10" label="Account 1"
                                        required></v-text-field>
                                </v-col>
                                <v-col style="height: 20px; margin-bottom: 15%;">
                                    <v-text-field v-model="newBudget.Account2" :counter="10" label="Account 2:"
                                        required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                    <v-divider></v-divider>
                    <h5 style="margin-bottom: -3%;">ENTER CREDIT CARD AMOUNTS</h5>
                    <v-form>
                        <v-container>
                            <v-row style="display: flex; flex-direction: column;">
                                <v-col style="height: 10px; margin-bottom: 11%;" v-for="(card, index) in Cards">
                                    <v-text-field v-model="card.Balance" :label="card.Name" required>

                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-item>

                <v-card-actions>
                    <v-btn elevation="8" :id="payPeriod == true ? 'V-button-1' : 'V-button-2'"
                        v-on:click="SubmitBudet(newBudget, Cards)" v-ripple variant="outlined"
                        style=" width: 170px;   left: 26%;">Submit</v-btn>
                </v-card-actions>

            </v-card>

            <!-- to="/about" -->





        </v-sheet>

    </div>
</template>

<script lang="ts">

import { useStore } from 'vuex';
import { computed, defineComponent, ref, toRef } from 'vue'
import CreditCard from '@/Types/CreditCard'

import Budget from '@/Types/Budget'
import BudgetOutput from '@/Types/BudgetOutput'
import HelperMethods from '@/Types/Helpermethods';
import CreditCardChartData from '@/Types/CreditCardChartData'
import { stringifyQuery } from 'vue-router';




export default defineComponent({

    setup() {
        // const newHelper = new HelperMethods;
        const Helper = ref<HelperMethods>({
            ReturnHalf(amount: number): number {

                let halfAmount: number = ((amount / 10) * 2);

                return halfAmount
            },

            ReturnPercentage(amount: number, dividend: number): number {

                let returnAmount: number = ((amount / 10) * dividend);

                return returnAmount;
            },

            TakeOrAddRent(account: number, option: boolean): number {

                if (option == true) {
                    account = this.SubtractAmountFromItem(account, 500);
                }
                else {
                    account = account + 500;
                }

                return account
            },

            AddSS(amount: number): number {

                amount = amount + 100;
                return amount;
            },


            CanPayMyself(account: number, amount: number): boolean {

                let canPay: boolean = false;

                if (account >= (amount + this.ReturnPercentage(amount, 1))) {
                    canPay = true;
                }
                else {
                    canPay = false;
                }

                return canPay;

            },


            PayCurrentItem(account: number, amount: number): number {

                account = account - amount;

                return account
            },


            SubtractAmountFromItem(creditCard: number, amount: number): number {

                creditCard = creditCard - amount;

                return creditCard;
            }
        });
        const Cards = ref<CreditCard[]>([

            { Name: 'policeAndFire', Balance: 0, },
            { Name: 'apple', Balance: 0, },
            { Name: 'discover', Balance: 0, },
            { Name: 'chase', Balance: 0, },
            { Name: 'pseng', Balance: 0, },
        ]);
        const newBudget = ref<Budget>(
            { Account1: 0, Account2: 0, PayPeriod: 1 }

        );
        const newBudgetOutput = ref<BudgetOutput>({
            OriginalAmount: new Map<string, Number>(),
            CurrentAmount: new Map<string, Number>(),
            Account1: 0,
            Account2: 0,
            AccountOneAppleAmount: 0,
            AccountTwoAppleAmount: 0,
            PayMyself1: 0,
            PayMyself2: 0,
            PayPeriod: 0,
            ErrorMessages: []


        });
        const newCreditCardChartData = ref<CreditCardChartData[]>([
            { Name: "policeAndFire", StartAmount: 0, AmountToPay: 0 },
            { Name: "apple", StartAmount: 0, AmountToPay: 0 },
            { Name: "discover", StartAmount: 0, AmountToPay: 0 },
            { Name: "chase", StartAmount: 0, AmountToPay: 0 },
            { Name: "pseng", StartAmount: 0, AmountToPay: 0 },


        ])










        return { Cards, newBudget, newBudgetOutput, Helper, newCreditCardChartData }
    },
    data() {
        return {
            currentPayPeriod: 1 as number,
            payPeriod: true as boolean,
            Account1Amount: 0 as number,
            Account2Amount: 0 as number,
            PandFAmount: 0 as number,
            AppleAmount: 0 as number,
            DiscoverAmouint: 0 as number,


        }

    },
    methods: {
        SubmitBudet(budget: Budget, allCards: CreditCard[]) {
            //Take all of the inputs from the text fields and commit them to the store
            //First, get the current pay period and store that as a number

            if (this.payPeriod == true) {
                budget.PayPeriod = 1
            }
            else {
                budget.PayPeriod = 2
            }

            this.$store.state.newBudget = budget;
            this.$store.state.newCreditCard = allCards;
            this.BudgetEngine(budget, allCards);

            // if ((this.$store.state.newBudget.Account1 > 0 && this.$store.state.newBudget.Account2 > 0) && (this.$store.state.newCreditCard[0].Balance > 0 && this.$store.state.newCreditCard[1].Balance > 0)) {
            //     this.$router.push({ name: 'BudgetView' });
            // }
            // else {
            //     // this.helperInstance.ReturnHalf()
            //     //this.TheHelp.ReturnHalf()
            //     //  this.helperInstance.ReturnHalf()

            // }



        },
        BudgetEngine(budget: Budget, allCredidCards: CreditCard[]) {

            const budgetOutCome: BudgetOutput | undefined = this.newBudgetOutput;
            let payWeek = budget.PayPeriod;
            budgetOutCome.OriginalAmount.set('Account1', budget.Account1)
            budgetOutCome.OriginalAmount.set('Account2', budget.Account2)

            budgetOutCome.PayPeriod = budget.PayPeriod;

            let policeAndFIre: number = 0;
            let apple: number = 0;
            let chase: number = 0;
            let discover: number = 0;
            let pseng: number = 0;

            allCredidCards.forEach((card) => {

                if (card.Name.startsWith('police')) {
                    if (budget.PayPeriod == 2) {
                        policeAndFIre = (Number(card.Balance) + 100)
                    }
                    else {
                        policeAndFIre = card.Balance
                    }

                }
                else if (card.Name.startsWith('apple')) {
                    apple = card.Balance
                }
                else if (card.Name.startsWith('discover')) {
                    discover = card.Balance
                }
                else if (card.Name.startsWith('chase')) {
                    chase = card.Balance
                }
                else if (card.Name.startsWith('pseng')) {
                    pseng = card.Balance
                }
            })




            budget.Account1 = this.Helper.TakeOrAddRent(budget.Account1, true);
            budgetOutCome.OriginalAmount.set('apple', apple);
            budgetOutCome.OriginalAmount.set('policeAndFire', policeAndFIre);
            budgetOutCome.OriginalAmount.set('chase', chase);
            budgetOutCome.OriginalAmount.set('discover', discover);
            budgetOutCome.OriginalAmount.set('pseng', pseng);
            this.newCreditCardChartData[0].StartAmount = policeAndFIre
            this.newCreditCardChartData[1].StartAmount = apple
            this.newCreditCardChartData[2].StartAmount = discover
            this.newCreditCardChartData[3].StartAmount = chase
            this.newCreditCardChartData[4].StartAmount = pseng




            if (policeAndFIre <= 1150 && policeAndFIre > 0) {
                const PoliceAndFireHalf = this.Helper.ReturnHalf(policeAndFIre);
                budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, PoliceAndFireHalf)
                budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, PoliceAndFireHalf)
                policeAndFIre = this.Helper.SubtractAmountFromItem(policeAndFIre, policeAndFIre);
                budgetOutCome?.CurrentAmount.set('PoliceAndFire', policeAndFIre);


            }
            if (policeAndFIre <= 2200 && policeAndFIre > 1250) {

                const SixtyPercentPAndF = this.Helper.ReturnPercentage(policeAndFIre, 6);
                budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, this.Helper.ReturnPercentage(SixtyPercentPAndF, 6));
                budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, this.Helper.ReturnPercentage(SixtyPercentPAndF, 4));
                policeAndFIre = this.Helper.SubtractAmountFromItem(policeAndFIre, SixtyPercentPAndF);
                budgetOutCome?.CurrentAmount.set('PoliceAndFire', policeAndFIre);


            }
            if (policeAndFIre > 2200) {

                const FortyPercentPAndF = this.Helper.ReturnPercentage(policeAndFIre, 4);
                budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, this.Helper.ReturnHalf(FortyPercentPAndF));
                budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, this.Helper.ReturnHalf(FortyPercentPAndF));
                policeAndFIre = this.Helper.SubtractAmountFromItem(policeAndFIre, FortyPercentPAndF);
                budgetOutCome?.CurrentAmount.set('PoliceAndFire', policeAndFIre);

            }

            if (this.Helper.CanPayMyself(budget.Account2, 550)) {


                budgetOutCome.PayMyself2 = 150;
                budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, 150);

                if (apple >= 350 && budget.Account2 >= 300) {
                    budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, 150);
                    apple = this.Helper.SubtractAmountFromItem(apple, 150);

                    budgetOutCome.AccountTwoAppleAmount = 150;

                }
                else {
                    if (budget.Account2 > (this.Helper.ReturnPercentage(apple, 3))) {

                        budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, 100);
                        apple = this.Helper.SubtractAmountFromItem(apple, 100);

                        budgetOutCome.AccountTwoAppleAmount = 100;
                    }
                    else {
                        if (apple != 0 && apple <= 50) {
                            budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, 50);
                            apple = this.Helper.SubtractAmountFromItem(apple, 50);

                            budgetOutCome.AccountTwoAppleAmount = 50;
                        }
                    }
                }


            }
            else {


                budgetOutCome.PayMyself2 = 0;
                if (budget.Account2 > (this.Helper.ReturnPercentage(apple, 1))) {
                    budget.Account2 = budget.Account2 - this.Helper.ReturnPercentage(apple, 1);
                    if (budgetOutCome?.AccountTwoAppleAmount !== undefined) {
                        budgetOutCome.AccountTwoAppleAmount = this.Helper.ReturnPercentage(apple, 1);
                    }

                    apple = this.Helper.SubtractAmountFromItem(apple, (this.Helper.ReturnPercentage(apple, 1)));
                    //budgetOutput.AccountTwoAppleAmount = 50;
                }
            }



            if (budget.Account2 > chase) {
                budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, chase);
                chase = this.Helper.SubtractAmountFromItem(chase, chase);
                budgetOutCome.CurrentAmount.set("chase", chase);
            }
            else {
                if (chase == 0) {
                    budgetOutCome.CurrentAmount.set("chase", 0);
                }
                else {
                    if (budget.PayPeriod == 2) {
                        if (budget.Account2 < (this.Helper.ReturnPercentage(chase, 5))) {
                            budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, 35);
                            chase = this.Helper.SubtractAmountFromItem(chase, 35);
                            budgetOutCome.CurrentAmount.set("chase", chase);
                        }
                        else {
                            budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, (this.Helper.ReturnPercentage(chase, 5)));
                            chase = this.Helper.SubtractAmountFromItem(chase, (this.Helper.ReturnPercentage(chase, 5)));
                            budgetOutCome.CurrentAmount.set("chase", chase);
                        }
                    }
                    if (budget.Account2 >= (this.Helper.ReturnPercentage(chase, 5))) {
                        budget.Account2 = this.Helper.SubtractAmountFromItem(budget.Account2, (this.Helper.ReturnPercentage(chase, 5)));
                        chase = this.Helper.SubtractAmountFromItem(chase, (this.Helper.ReturnPercentage(chase, 5)));
                        budgetOutCome.CurrentAmount.set("chase", chase);
                    }
                }
            }

            if (budget.Account1 > pseng) {
                budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, pseng);
                pseng = this.Helper.SubtractAmountFromItem(pseng, pseng);
                budgetOutCome.CurrentAmount.set("pseng", pseng);
            }
            else {
                if (pseng == 0) {
                    budgetOutCome.OriginalAmount.set("pseng", pseng);
                    budgetOutCome.CurrentAmount.set("pseng", pseng);
                }
                else {
                    budgetOutCome.OriginalAmount.set("pseng", pseng);
                    if ((budget.Account1 > this.Helper.ReturnPercentage(pseng, 4))) {
                        budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, (this.Helper.ReturnPercentage(pseng, 4)));
                        pseng = pseng - this.Helper.ReturnPercentage(pseng, 4);
                        budgetOutCome.CurrentAmount.set("pseng", pseng);
                    }
                    else {
                        budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, 100);
                        pseng = this.Helper.SubtractAmountFromItem(pseng, 100);
                        budgetOutCome.CurrentAmount.set("pseng", pseng);
                    }
                }
            }

            if (apple == 0) {
                //Do Nothing!
            }
            else {
                if ((budget.Account1 - 150) > apple) {

                    budgetOutCome.PayMyself1 = 150;
                    budgetOutCome.AccountOneAppleAmount = apple;


                    budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, 150);
                    budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, apple);
                    apple = this.Helper.SubtractAmountFromItem(apple, apple);
                    budgetOutCome.CurrentAmount.set("apple", apple);
                }
                else {
                    if (budget.Account1 > (apple + discover)) {

                        budgetOutCome.PayMyself1 = 0;
                        budgetOutCome.AccountOneAppleAmount = apple;
                        budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, apple);
                        apple = this.Helper.SubtractAmountFromItem(apple, apple);
                        budgetOutCome.CurrentAmount.set("apple", apple);

                    }
                    if (budget.PayPeriod == 2) {
                        if (budget.Account1 >= (this.Helper.ReturnPercentage(apple, 3))) {

                            budgetOutCome.AccountOneAppleAmount = (this.Helper.ReturnPercentage(apple, 3));
                            budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, (this.Helper.ReturnPercentage(apple, 3)));
                            apple = this.Helper.SubtractAmountFromItem(apple, (this.Helper.ReturnPercentage(apple, 3)));
                            budgetOutCome.CurrentAmount.set("apple", apple);
                        }
                        else {

                            budgetOutCome.AccountOneAppleAmount = (this.Helper.ReturnPercentage(apple, 2));
                            budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, (this.Helper.ReturnPercentage(apple, 2)));
                            apple = this.Helper.SubtractAmountFromItem(apple, (this.Helper.ReturnPercentage(apple, 2)));
                            budgetOutCome.CurrentAmount.set("apple", apple);
                        }
                    }

                    let rightAmount = false;
                    let dividend = 3;
                    while (rightAmount == false) {
                        if (budget.Account1 >= (this.Helper.ReturnPercentage(apple, dividend))) {
                            budgetOutCome.AccountOneAppleAmount = (this.Helper.ReturnPercentage(apple, dividend));

                            budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, (this.Helper.ReturnPercentage(apple, dividend)));
                            apple = this.Helper.SubtractAmountFromItem(apple, (this.Helper.ReturnPercentage(apple, dividend)));
                            budgetOutCome.CurrentAmount.set("apple", apple);
                            rightAmount = true;
                        }
                        else {
                            --dividend;
                        }
                    }
                }
            }


            if (budget.Account1 > discover) {
                budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, discover);
                discover = this.Helper.SubtractAmountFromItem(discover, discover);
                budgetOutCome.CurrentAmount.set("discover", discover);
            }
            else {
                if (budget.PayPeriod == 2) {
                    if (budget.Account1 >= (this.Helper.ReturnPercentage(discover, 3))) {

                        budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, (this.Helper.ReturnPercentage(discover, 3)));
                        discover = this.Helper.SubtractAmountFromItem(discover, (this.Helper.ReturnPercentage(discover, 3)));
                        budgetOutCome.CurrentAmount.set("discover", discover);
                    }
                    else {

                        budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, (this.Helper.ReturnPercentage(discover, 2)));
                        discover = this.Helper.SubtractAmountFromItem(discover, (this.Helper.ReturnPercentage(discover, 2)));
                        budgetOutCome?.CurrentAmount.set("discover", discover);
                    }
                }
                else {
                    let rightAmount = false;
                    let dividend = 3;
                    while (rightAmount == false) {
                        if (budget.Account1 > (this.Helper.ReturnPercentage(discover, dividend))) {
                            budget.Account1 = this.Helper.SubtractAmountFromItem(budget.Account1, (this.Helper.ReturnPercentage(discover, dividend)));
                            discover = this.Helper.SubtractAmountFromItem(discover, (this.Helper.ReturnPercentage(discover, dividend)));
                            budgetOutCome.CurrentAmount.set("discover", discover);
                            rightAmount = true;
                        }
                        else {
                            --dividend;

                        }
                    }

                }

            }

            // for (const [key, value] of budgetOutCome.CurrentAmount) {
            //     this.newCreditCardChartData.forEach((chartData) => {
            //         if (key.toLowerCase().includes(chartData.Name.toLowerCase())) {
            //             console.log('Made it here ')
            //             chartData.AmountToPay = value.valueOf();
            //         }
            //     })
            //     // console.log(key)
            //     // console.log(value)
            // }


            // console.log(this.newCreditCardChartData);
            // console.log(budgetOutCome);
            // console.log(this.SubmitChartData(budgetOutCome));
            // console.log(this.$store.state.newCreditCardChartData);

            if ((this.SubmitChartData(budgetOutCome)) && (budget.Account1 > 0 && budget.Account2 > 0)) {
                this.$store.state.newBudgetOutput = budgetOutCome;
                console.log(this.$store.state.newBudgetOutput)
                this.$router.push({ name: 'BudgetView' });
            }
            else {
                //Do something
            }

        },
        SubmitChartData(budetOutcome: BudgetOutput): boolean {
            let goodSave = false;

            for (const [key, value] of budetOutcome.CurrentAmount) {
                this.newCreditCardChartData.forEach((chartData) => {
                    if (key.toLowerCase().includes(chartData.Name.toLowerCase())) {
                        // console.log('Made it here ')
                        chartData.AmountToPay = value.valueOf();
                    }
                })
                // console.log(key)
                // console.log(value)
            }

            this.$store.state.newCreditCardChartData = this.newCreditCardChartData;

            if (this.$store.state.newCreditCardChartData.length > 0) {
                goodSave = true;
            }
            else {
                goodSave = false
            }

            return goodSave;

        }

    }

})
</script>

<style scoped>
h5 {
    margin-top: 3%;
}




.v-card {
    background-color: whitesmoke;
}

/* PayPeriod 1 */
/*  linear-gradient(rgb(61, 131, 223), rgb(169, 175, 196), #a9afc4) */
.v-sheet-pay1 {

    background-image:
        linear-gradient(rgb(61, 131, 223), rgb(169, 175, 196), #a9afc4)
}

.v-sheet-pay2 {

    background-image:
        linear-gradient(hsl(172, 76%, 27%), hwb(156 2% 87%))
}

#V-button-2 {
    background-color: hsl(170, 92%, 31%);

}

#V-button-1 {
    background-color: rgb(169, 175, 196);
}
</style>