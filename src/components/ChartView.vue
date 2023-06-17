<template>
    <div>
        <v-card width="300px">
            <Doughnut :data="Data" :options="chartOptions" />
        </v-card>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)


export default defineComponent({
    name: 'DoughnutChart',
    components: { Doughnut },
    setup() {


        return {}
    },
    data() {
        return {
            Data: {
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [60]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    }
})
</script>

<style scoped></style>