<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <forms-add-modules :is-aggregated="formAdd" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "modulosAgregar",
  data() {
    return {
      formAdd: true,
    };
  },
  methods: {
    ...mapMutations(["changePageTitle", "setModule"]),
  },
  mounted() {
    this.setModule({
      code: "",
      name: "",
      src: "",
      icon: "",
      unabled: false,
      hasChildren: false,
      fatherCode: "",
      order: 0,
    });

    this.changePageTitle(`Agregar Modulo`);
  },
};
</script>

<style lang="scss" scoped></style>
