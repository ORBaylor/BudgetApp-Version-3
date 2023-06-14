<template>
  <div class="hello" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">

    <v-sheet :elevation="17" :height="500" :width="500" rounded
      style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <v-card class="mx-auto" max-width="344" variant="outlined">
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              OVERLINE
            </div>
            <div class="text-h6 mb-1">
              Headline
            </div>
            <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn variant="outlined">
            Butt
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-btn to="/about" variant="outlined" class="mr-2">About</v-btn>


    </v-sheet>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
