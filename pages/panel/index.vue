<template>
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
