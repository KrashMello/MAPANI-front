<template>
  <v-container>
    <v-data-table :headers="headers" :items="Requests" :items-per-page="5">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5"> Editar solicitud </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form v-model="valid">
                  <v-text-field
                    v-if="editedItem.id < 0"
                    v-model="editedItem.id"
                  />
                  <v-text-field
                    v-model="editedItem.solicitante"
                    :rules="rules.solicitante"
                    label="Nombre del Solicitante"
                    required
                  />
                  <v-text-field
                    v-model="editedItem.beneficiario"
                    :rules="rules.beneficiario"
                    label="Nombre del Beneficiario"
                    required
                  />
                </v-form>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="close"> Cancelar </v-btn>
              <v-btn :disabled="!valid" color="secondary" @click="edit()">
                Editar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"> Eliminar </v-card-title>
            <v-card-text>
              Estas a punto de eliminar, esta acción no puede ser revertida.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="closeDelete">Cancelar</v-btn>
              <v-btn color="error" @click="deleteItemConfirm">Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn color="secondary" small>
          <v-icon small> mdi-eye </v-icon>
        </v-btn>
        <v-btn @click="editItem(item)" color="warning" small>
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar" color="success">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "requestTable",

  data: () => ({
    valid: true,
    snackbar: false,
    text: null,
    dialog: false,
    dialogDelete: false,
    rules: {
      solicitante: [
        (v) => !!v || "El nombre del beneficiario es necesario",
        (v) =>
          (v && v.length >= 2) || "El nombre debe tener más de 2 caracteres",
      ],
      beneficiario: [
        (v) => !!v || "El nombre del solicitante es necesario",
        (v) =>
          (v && v.length >= 2) || "El nombre debe tener más de 2 caracteres",
      ],
    },
    headers: [
      { text: "Código", value: "id" },
      { text: "Fecha", value: "date" },
      { text: "Solicitante", value: "solicitante", sortable: false },
      { text: "Beneficiario", value: "beneficiario", sortable: false },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    editedItem: {
      solicitante: null,
      beneficiario: null,
    },
    defaultItem: {
      solicitante: null,
      beneficiario: null,
    },
  }),

  computed: {
    ...mapGetters({
      Requests: "requests", 
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.initRequests;
  },

  methods: {
    ...mapActions({
      initRequests: "initRequests",
      removeRequests: "removeRequests",
      editRequests: "editRequests",
      addRequests: "addRequests",
    }),

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.removeRequests(this.editedItem.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    edit() {
      this.editRequests(this.editedItem);
      this.close();
    },
  },
};
</script>
