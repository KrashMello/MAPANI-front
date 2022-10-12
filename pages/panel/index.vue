<template>
  <v-row>
    <v-col class="text-center">
      <img src="/logo-light.png" alt="Vuetify.js" class="mb-5" />
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "IndexPanel",
  methods: {
    ...mapMutations(["changePageTitle"]),
  },
  created() {
    this.changePageTitle("Inicio");
  },
};
</script>
