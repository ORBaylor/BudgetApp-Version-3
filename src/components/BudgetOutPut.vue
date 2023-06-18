<template>
    <div style="width: auto; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <v-card height="80vh" width="40vh">
            <h4>Budget Results</h4>
            <v-card class="mx-auto" style="width: 38vh; margin-top: 15%;" variant="outlined">

                <v-carousel height="200" width="200" hide-delimiters progress="primary" show-arrows="hover">
                    <v-carousel-item v-for="(slide, i) in slides" :key="i">
                        <v-sheet height="100%">
                            <div class="d-flex fill-height justify-center align-center">
                                <div class="">
                                    {{ slide }} Slide
                                </div>
                            </div>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>

            </v-card>

        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

        const slides = ['One', 'Two', 'Three', 'Four']

        return { slides }
    }
})
</script>

<style scoped></style>