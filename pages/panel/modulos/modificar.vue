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
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "modulesModificar",
  data() {
    return {
      formAdd: false,
    };
  },
  computed: {
    ...mapGetters({
      mod: "getModule",
    }),
  },
  methods: {
    ...mapMutations(["changePageTitle"]),
  },
  mounted() {
    this.changePageTitle(`Modificar Modulo ${this.mod.code}`);
  },
};
</script>

<style lang="scss" scoped></style>
