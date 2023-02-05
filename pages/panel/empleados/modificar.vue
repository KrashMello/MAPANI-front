<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <forms-add-employed :is-aggregated="formAdd" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "empleado-modificar",
  data() {
    return {
      formAdd: false,
    };
  },
  computed: {
    ...mapGetters({
      employed: "getEmployed",
    }),
  },
  methods: {
    ...mapMutations(["changePageTitle"]),
  },
  mounted() {
    this.changePageTitle(`Modificar Empleado ${this.employed.code}`);
  },
};
</script>

<style lang="scss" scoped></style>
