<template>
  <v-row justify="center" align="center" class="log">
    <v-col cols="5">
      <v-card :loading="loading">
        <v-card-title class="justify-center">
          <img width="99%" src="/logo-1300x347.png" />
        </v-card-title>
        <v-container>
          <FormsLogin :loading="loading" />
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "IndexPage",
  layout: "simple",
  computed: {
    ...mapGetters({
      loading: "getLoading",
    }),
  },
};
</script>
