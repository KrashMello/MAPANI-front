<template>
  <v-card class="fill-height">
    <v-card-title> Tabla de personas </v-card-title>
    <v-divider></v-divider>
    <v-container>
      <v-row class="mb-2">
        <v-btn
          color="secondary"
          dark
          @click="
            dialog.show = !dialog.show;
            dialog.formAdd = true;
          "
        >
          Agendar Cita
          <v-icon dark right>mdi-plus</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" dark>
          Buscar
          <v-icon dark right>mdi-magnify</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <DialogForm
      :title="dialog.formAdd === true ? 'Agendar Nueva Cita' : 'Modificar Cita'"
      :dialog="dialog.show"
      @close="closeDialog"
    >
      <template #form>
        <FormsAddMedicalAppoinment
          :dialogIsEnable="dialog.show"
        ></FormsAddMedicalAppoinment>
      </template>
    </DialogForm>
    <v-data-table :headers="headers" :items="Persons" :items-per-page="5">
      <template #[`item.actions`]="{ item }">
        <v-btn icon>
          <v-icon small> mdi-eye </v-icon>
        </v-btn>
        <v-btn
          icon
          @click="
            dialog.show = !dialog.show;
            dialog.formAdd = false;
          "
        >
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
        <v-btn icon @click="deleteItem(item)">
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "citasPanel",
  data() {
    return {
      dialog: {
        show: false,
        formAdd: true,
      },
      headers: [
        { text: "Nacionalidad", value: "documentType", sortable: false },
        { text: "Cedula", value: "DNI" },
        { text: "Nombres", value: "firstName", sortable: false },
        { text: "Apellidos", value: "lastName", sortable: false },
        { text: "Correo", value: "email", sortable: false },
        { text: "Opciones", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters({ Persons: "persons" }),
  },
  methods: {
    ...mapMutations(["changePageTitle"]),
    closeDialog(data) {
      this.dialog.show = data;
    },
  },
  created() {
    this.changePageTitle("Citas");
  },
};
</script>