<template>
    <div class="hello" style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center;">

        <v-sheet :elevation="17" :width="375" rounded
            style="display: flex; flex-direction: column; justify-content: center; height: 80vh;">
            <v-card class="mx-auto" max-width="344" variant="outlined" style=" height: 70vh; width: 80vh;">
                <v-card-item>
                    <h5>SELCT PAY PERIOD </h5>
                    <div style="margin-left: 25%;">
                        <v-switch v-model="newBudget.PayPeriod" true-value="2" false-value="1" hide-details inset
                            :label="`Pay Periods: ${newBudget.PayPeriod}`"></v-switch>
                    </div>
                    <v-divider></v-divider>
                    <h5>ENTER ACCOUNT AMOUNTS</h5>
                    <v-form>
                        <v-container>
                            <v-row style="display: flex; flex-direction: column;">
                                <v-col style="height: 20px; margin-bottom: 10%;">
                                    <v-text-field :counter="10" label="Account 1" required></v-text-field>
                                </v-col>
                                <v-col style="height: 30px; margin-bottom: 15%;">
                                    <v-text-field :counter="10" label="Account 2:" required></v-text-field>
                                </v-col>

                                <!-- <v-col>
                                    <v-text-field :counter="10" label="Last name" required></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-text-field label="E-mail" required></v-text-field>
                                </v-col> -->
                            </v-row>
                        </v-container>
                    </v-form>
                    <v-divider></v-divider>
                    <h5>ENTER CREDIT CARD AMOUNTS</h5>
                    <v-form>
                        <v-container>
                            <v-row style="display: flex; flex-direction: column;">
                                <v-col style="height: 20px; margin-bottom: 10%;" v-for="(card, index) in Cards">
                                    <v-text-field :label="card.Name" required></v-text-field>
                                </v-col>

                                <!-- <v-col>
                                    <v-text-field :counter="10" label="Last name" required></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-text-field label="E-mail" required></v-text-field>
                                </v-col> -->
                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-item>

                <v-card-actions>

                </v-card-actions>
            </v-card>



            <v-btn to="/about" variant="outlined" style="margin-left: 28%; width: 170px; margin-top: 3%;">Submit</v-btn>

        </v-sheet>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import CreditCard from '@/Types/CreditCard'
import CreditCardNames from '@/Types/CreditCardNames'
import Budget from '@/Types/Budget'
import BudgetOutput from '@/Types/BudgetOutput'


export default defineComponent({
    setup() {

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
        const newBudgetOutput = ref<BudgetOutput>();




        return { Cards, newBudget, newBudgetOutput }
    },
    data() {
        return {}

    },
    methods: {

    }

})
</script>

<style scoped>
h5 {
    margin-top: 3%;
}

body {
    background-color: #67B7D1;
}

nav {
    background-color: #67B7D1;
}
</style>