<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <forms-add-departament :is-aggregated="formAdd" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "departamentos-modificar",
  data() {
    return {
      formAdd: false,
    };
  },
  computed: {
    ...mapGetters({
      departament: "getDepartament",
    }),
  },

  methods: {
    ...mapMutations(["changePageTitle", "setDepartament"]),
  },
  mounted() {
    this.changePageTitle(`Modificar Departamento ${this.departament.code}`);
  },
};
</script>

<style lang="scss" scoped></style>
