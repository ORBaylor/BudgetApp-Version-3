<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <CardAmountEntry></CardAmountEntry>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import CardAmountEntry from '@/components/CardAmountEntry.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    CardAmountEntry,
  },
});
</script>
