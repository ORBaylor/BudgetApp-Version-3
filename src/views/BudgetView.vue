<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <BudgetOutput></BudgetOutput>
    <!-- <ChartView></ChartView> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import BudgetOutput from '@/components/BudgetOutPut.vue'
import ChartView from '@/components/ChartView.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    BudgetOutput,
    ChartView
  },
});
</script>