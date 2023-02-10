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
import { mapMutations } from "vuex";
export default {
  name: "departamentos-agregar",
  data() {
    return {
      formAdd: true,
    };
  },
  methods: {
    ...mapMutations(["changePageTitle", "setDepartament"]),
  },
  mounted() {
    this.setDepartament({
      code: "",
      name: "",
    });

    this.changePageTitle(`Agregar Departamento`);
  },
};
</script>

<style lang="scss" scoped></style>
