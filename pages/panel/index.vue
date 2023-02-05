<template>
  <v-row>
    <v-col cols="4">
      <widgets-v-info-box></widgets-v-info-box>
    </v-col>
    <v-col cols="4">
      <widgets-v-info-box
        title="empleados"
        color="primary"
        icon="mdi-account-hard-hat-outline"
        quantity="1"
      ></widgets-v-info-box>
    </v-col>
    <v-col cols="4">
      <widgets-v-info-box
        title="pacientes"
        color="blue darken-1"
        icon="mdi-account-injury"
        quantity="0"
      ></widgets-v-info-box>
    </v-col>
    <v-col cols="4">
      <widgets-v-info-box
        title="citas"
        color="accent"
        icon="mdi-account-group"
        quantity="0"
      ></widgets-v-info-box>
    </v-col>
    <v-card elevation="24" class="mx-auto">
      <v-carousel
        cycle
        height="300"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "IndexPanel",
  data() {
    return {
      items: [
        {
          src: "/mapani-1.jpg",
        },
        {
          src: "/mapani-2.jpg",
        },
        {
          src: "/mapani-3.jpg",
        },
        {
          src: "/mapani-4.jpg",
        },
        {
          src: "/mapani-5.jpg",
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["changePageTitle"]),
  },
  created() {
    this.changePageTitle("Inicio");
  },
};
</script>
