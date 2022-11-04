<template>
  <v-card class="fill-height">
    <v-card-title> Tabla de solicitudes </v-card-title>
    <v-divider></v-divider>
    <v-row>
      <v-col><FormsAddRequestForm /></v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col><FormsSearchRequestForm /></v-col>
    </v-row>
    <TablesRequestTable />
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "SolicitudesPanel",
  methods: {
    ...mapMutations(["changePageTitle"]),
  },
  created() {
    this.changePageTitle("Solicitudes");
  },
};
</script>
