<template>
    <div style="width: auto; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <v-card height="83vh" width="40vh">
            <h4>Budget Results</h4>



            <v-carousel height="300" hide-delimiters progress="primary" show-arrows="hover">
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                    <v-sheet height="100%">
                        <div class="d-flex fill-height justify-center align-center">

                            <chart-view v-bind:ChartData="slide" style="margin-left: 0%; margin-top: -5%;" />

                        </div>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>

            <!--  <chart-view v-bind:ChartData="slide" /> -->



            <div style="display: flex; flex-direction: row;">
                <div class="mx-auto" max-width="344" style="width: 20vh;">
                    <v-card-item>
                        <div>
                            <div class="text-overline mb-1">
                                Account 1
                            </div>
                            <v-divider></v-divider>
                            <v-expansion-panels variant="popout"
                                style="width: 180px; display: flex; flex-direction: column; justify-content: center; ">
                                <v-expansion-panel>
                                    <label for="A1SB"> Starting Blance</label>
                                    <p id="A1SB"> {{ newBudgetOutputStore.OriginalAmount.get('Account1') }}</p>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <label for="A1PI">Pay Account</label>
                                    <p id="A1PI"> {{ newBudgetOutputStore.PayMyself1 }}</p>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <label for="A1PA"> Paid to Apple</label>
                                    <p id="A1PA"> {{ newBudgetOutputStore.AccountOneAppleAmount }}</p>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <label for="A1SS">Sent to Savings</label>
                                    <p id="A1SS"> {{ (Number(Account1OrinalAmount) -
                                        (newBudgetOutputStore.AccountOneAppleAmount + newBudgetOutputStore.PayMyself1)) }}
                                    </p>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </v-card-item>

                    <v-card-actions>

                    </v-card-actions>
                </div>

                <v-divider vertical></v-divider>
                <div class="mx-auto" max-width="344" style="width: 20vh;">
                    <v-card-item>
                        <div>
                            <div class="text-overline mb-1">
                                Account 2
                            </div>
                            <v-divider></v-divider>
                            <v-expansion-panels variant="popout"
                                style="width: 180px; display: flex; flex-direction: column; justify-content: center; ">
                                <v-expansion-panel>
                                    <label for="A1SB"> Starting Blance</label>
                                    <p id="A1SB"> {{ newBudgetOutputStore.OriginalAmount.get('Account2') }}</p>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <label for="A1PI">Pay Account</label>
                                    <p id="A1PI"> {{ newBudgetOutputStore.PayMyself2 }}</p>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <label for="A1PA"> Paid to Apple</label>
                                    <p id="A1PA"> {{ newBudgetOutputStore.AccountTwoAppleAmount }}</p>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <label for="A1SS">Sent to Savings</label>
                                    <p id="A1SS"> {{ (Number(Account2OrinalAmount) -
                                        (newBudgetOutputStore.AccountTwoAppleAmount + newBudgetOutputStore.PayMyself2)) }}
                                    </p>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </v-card-item>

                    <v-card-actions>

                    </v-card-actions>
                </div>

            </div>


            <v-btn :to="{ name: 'home' }" v-ripple variant="outlined" style=" width: 170px; margin-top: 3%;">START
                OVER</v-btn>


        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex';
import ChartView from './ChartView.vue'
import BudgetOutput from '@/Types/BudgetOutput';


export default defineComponent({
    components: { ChartView },
    setup() {

        // const newBudgetOutput = ref<BudgetOutput>({
        //     OriginalAmount: new Map<string, Number>(),
        //     CurrentAmount: new Map<string, Number>(),
        //     Account1: 0,
        //     Account2: 0,
        //     AccountOneAppleAmount: 0,
        //     AccountTwoAppleAmount: 0,
        //     PayMyself1: 0,
        //     PayMyself2: 0,
        //     PayPeriod: 0,
        //     ErrorMessages: []


        // });

        return {}
    },
    data() {
        return {
            slides: this.$store.state.newCreditCardChartData,
            newBudgetOutputStore: this.$store.state.newBudgetOutput,
            Account1OrinalAmount: this.$store.state.newBudgetOutput.OriginalAmount.get('Account1'),
            Account2OrinalAmount: this.$store.state.newBudgetOutput.OriginalAmount.get('Account2'),
            items: [
                {
                    title: 'Account 1 Original Amount',
                    value: 0,
                },
                {
                    title: 'Account 1 Paid Itself',
                    value: this.$store.state.newBudgetOutput.PayMyself1,
                },
                {
                    title: 'How Much Will Be Sent ',
                    value: 0,
                },
            ]
        }
    }
})
</script>

<style scoped></style>