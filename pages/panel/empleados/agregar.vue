<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <forms-add-employed
          :is-aggregated="formAdd"
          @search-person="changeSearchDialog"
        />
      </v-col>
    </v-row>
    <Dialog-tables
      title="Buscar Persona"
      :dialog="searchPersonDialog"
      @close="changeSearchDialog"
    >
      <template #table>
        <table-search-user-personal-data @selected="changeSearchDialog" />
      </template>
    </Dialog-tables>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "empleado-agregar",
  data() {
    return {
      formAdd: true,
      searchPersonDialog: false,
    };
  },
  methods: {
    ...mapMutations(["changePageTitle", "setEmployed", "setUserPersonalData"]),
    changeSearchDialog(data) {
      this.searchPersonDialog = data;
    },
  },
  mounted() {
    this.setEmployed({
      code: "",
      personalDataCode: "",
      jobPositionCode: "",
      jobPositionName: "",
      departamentCode: "",
      departamentName: "",
      dateOfEntry: "",
      dateOfDischarge: "",
    });
    this.setUserPersonalData({
      code: "",
      firstName: "",
      lastName: "",
      genderCode: "",
      documentTypeCode: "",
      dni: "",
      bornDate: "",
      martialStatusCode: "",
      disability: false,
      disabilityTypeCode: "",
      ethnicGroup: false,
      ethnicDescription: "",
      parrishCode: "",
      direction: "",
      phoneNumber: "",
    });

    this.changePageTitle(`Agregar Empleado`);
  },
};
</script>

<style lang="scss" scoped></style>
