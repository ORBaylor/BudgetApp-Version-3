<template>
    <div
        style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: -50%; margin-left: -50%; ">
        <v-card class="overflow-visible" style="height: 30vh; width: 37vh; position: fixed; ">
            <h4>{{ propData?.Name.toUpperCase() }} ACCOUNT</h4>
            <v-divider></v-divider>
            <Doughnut class=" " style="" :data="Data" :options="chartOptions" />

        </v-card>
        <div style=" z-index: 999; position: relative; width: 90px;border-radius: 13px; margin-top: 70%; ">

            <label for="cardOA" style=""> Ending Amount</label>
            <v-divider></v-divider>
            <p id="cardOA"> {{ EndingAmount }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import CreditCardChartData from '@/Types/CreditCardChartData'

ChartJS.register(ArcElement, Tooltip, Legend)


export default defineComponent({
    name: 'DoughnutChart',
    components: { Doughnut },
    props: {
        ChartData: {
            type: Object as PropType<CreditCardChartData>
        }
    },
    setup(props) {



        const propData = props.ChartData;

        const StartAmount = propData?.StartAmount as number
        const AmountToPay = propData?.AmountToPay as number
        const EndingAmount = (AmountToPay == 0 ? 0 : (StartAmount - AmountToPay)) as number;
        const testLable = `Starting: ${StartAmount}` as string;
        const EndnigAmountLable = `Amount To Pay: ${AmountToPay}` as string;
        const Data = {
            labels: [`${testLable}`, `${EndnigAmountLable}`],
            datasets: [
                {
                    backgroundColor: ['#055C9D', '#7EC8E3'],
                    data: [StartAmount, AmountToPay]
                }
            ]
        }
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            AnimationEffect: false
        }


        return { Data, chartOptions, StartAmount, AmountToPay, EndingAmount, propData }
    },
    data() {
        return {
            // Data: {
            //     labels: [`${testLabel}`],
            //     datasets: [
            //         {
            //             backgroundColor: ['#2c3e50'],
            //             data: [60]
            //         }
            //     ]
            // },
            // chartOptions: {
            //     responsive: true,
            //     maintainAspectRatio: false
            // }
        }
    }
})
</script>

<style scoped></style>