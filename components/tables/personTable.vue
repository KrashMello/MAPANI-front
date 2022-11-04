<template>
  <v-container>
    <v-container>
      <v-row class="mb-2">
        <v-btn color="secondary" dark @click="dialog = true">
          Agregar
          <v-icon dark right>mdi-plus</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" dark @click.stop="rightDrawer = !rightDrawer">
          Buscar
          <v-icon dark right>mdi-magnify</v-icon>
        </v-btn>
      </v-row>
    </v-container>

    <v-data-table :headers="headers" :items="Persons" :items-per-page="5">
      <template #[`item.actions`]="{ item }">
        <v-btn icon>
          <v-icon small> mdi-eye </v-icon>
        </v-btn>
        <v-btn icon @click="editItem(item)">
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
        <v-btn icon @click="deleteItem(item)">
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <DialogAddPerson
      :dialogo="dialog"
      :valueItem="valueItem"
      @close="closeDialog"
    />

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"> Eliminar </v-card-title>
        <v-card-text>
          Estas a punto de eliminar, esta acción no puede ser revertida.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialogDelete">Cancelar</v-btn>
          <v-btn color="error" @click="deletePerson()">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
      width="500"
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-card outlined>
        <v-card-title>
          Buscar persona
          <v-spacer></v-spacer>
          <v-btn icon @click="closeFindDrawer">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
      <v-card-subtitle>
        <v-icon> mdi-information </v-icon>
        Para buscar una persona, puede utilizar los siguentes filtros:
      </v-card-subtitle>
      <v-container>
        <v-form>
          <v-select
            v-model="valueItem.documentType"
            :items="['Venezolano', 'Extranjero', 'Pasaporte']"
            color="secondary"
            label="Tipo de documento"
            outlined
          ></v-select>
          <v-text-field
            v-model="valueItem.DNI"
            color="secondary"
            label="Nro. documento"
            placeholder="Ingrese nro. documento"
            outlined
          ></v-text-field>
        </v-form>
      </v-container>

      <template #append>
        <div class="pa-2">
          <v-btn class="mr-1"> Limpiar </v-btn>
          <v-btn color="secondary" @click="findPerson"> Buscar </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-snackbar v-model="snackbar" :color="colorSnack">
      {{ text }}
      <template #action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "personTable",
  props: {
    Persons: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data: () => ({
    text: null,
    right: true,
    valid: true,
    dialog: false,
    snackbar: false,
    colorSnack: null,
    rightDrawer: false,
    dialogDelete: false,
    valueItem: {
      documentType: null,
      DNI: null,
      firstName: null,
      lastName: null,
      homeTelephone: null,
      personalPhone: null,
      martialStatus: null,
      email: null,
    },
    defaultItem: {
      documentType: null,
      DNI: null,
      firstName: null,
      lastName: null,
      homeTelephone: null,
      personalPhone: null,
      martialStatus: null,
      email: null,
    },
    headers: [
      { text: "Nacionalidad", value: "documentType", sortable: false },
      { text: "Cedula", value: "DNI" },
      { text: "Nombres", value: "firstName", sortable: false },
      { text: "Apellidos", value: "lastName", sortable: false },
      { text: "Correo", value: "email", sortable: false },
      { text: "Opciones", value: "actions", sortable: false },
    ],
  }),

  watch: {
    dialog(val) {
      val || this.closeDialog();
    },
    dialogDelete(val) {
      val || this.closeDialogDelete();
    },
  },

  methods: {
    ...mapActions({
      removePersons: "removePersons",
    }),

    editItem(item) {
      this.valueItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.valueItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    closeDialog(close) {
      this.dialog = close;
      this.$nextTick(() => {
        this.valueItem = Object.assign({}, this.defaultItem);
      });
    },

    closeDialogDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.valueItem = Object.assign({}, this.defaultItem);
      });
    },

    closeFindDrawer() {
      this.rightDrawer = false;
      this.$nextTick(() => {
        this.valueItem = Object.assign({}, this.defaultItem);
      });
    },

    deletePerson() {
      this.removePersons(this.valueItem.code);
      this.closeDialogDelete();

      this.snackbar = true;
      this.colorSnack = "success";
      this.text = "¡Registro eliminado!";
    },

    findPerson() {
      this.$emit("data-find", this.valueItem);
      this.closeFindDrawer();
    },
  },
};
</script>
