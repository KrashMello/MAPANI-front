<template>
  <v-row class="log">
    <v-card class="card-wrapper" :loading="loading">
      <v-card-title class="justify-center">
        <img width="99%" src="/logo-light.png" />
      </v-card-title>
      <v-container>
        <FormsLogin />
      </v-container>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  layout: "simple",
};
</script> 
