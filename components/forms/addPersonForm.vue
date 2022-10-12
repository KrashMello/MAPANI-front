<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">
        {{ valueItem.code ? "Editar persona" : "Agregar persona" }}
      </span>
    </v-card-title>
    <v-container>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="6" class="py-0">
              <v-select
                v-model="valueItem.documentType"
                :rules="rules.default"
                :items="['Venezolano', 'Extranjero', 'Pasaporte']"
                label="Tipo de documento"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="valueItem.DNI"
                :rules="rules.defaultText"
                label="Nro. documento"
                outlined
                placeholder="Ingrese nro. documento"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="valueItem.firstName"
                :rules="rules.defaultText"
                label="Nombre"
                outlined
                placeholder="Ingrese el nombre"
              />
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="valueItem.lastName"
                :rules="rules.defaultText"
                label="Apellido"
                outlined
                placeholder="Ingrese el apellido"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="valueItem.homeTelephone"
                :rules="rules.defaultText"
                v-mask="'(####) ###-##-##'"
                label="Teléfono de casa"
                outlined
                placeholder="Ingrese el nro. de teléfono"
              />
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="valueItem.personalPhone"
                :rules="rules.defaultText"
                v-mask="'(####) ###-##-##'"
                label="Teléfono personal"
                outlined
                placeholder="Ingrese el nro. de teléfono"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="6" class="py-0">
              <v-select
                v-model="valueItem.martialStatus"
                :rules="rules.default"
                :items="['Soltero', 'Casado', 'Divorciado', 'Viudo']"
                label="Estado civil"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="valueItem.email"
                :rules="rules.defaultEmail"
                label="Correo electronico"
                outlined
                placeholder="Ingrese el correo electronico"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="closeDialog"> Cancelar </v-btn>
      <v-btn
        :disabled="!valid"
        color="secondary"
        @click="valueItem.code ? editPerson() : savePerson()"
      >
        {{ valueItem.code ? "Editar" : "Guardar" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "addPersonForm",
  data: () => ({
    valid: true,
    rules: {
      default: [(v) => !!v || "Este campo es obligatorio."],
      defaultText: [
        (v) => !!v || "Este campo es obligatorio.",
        (v) =>
          (v && v.length > 2) || "Este campo debe tener más de 2 caracteres",
      ],
      defaultEmail: [
        (v) => !!v || "Este campo es obligatorio.",
        (v) =>
          (v && v.length > 2) || "Este campo debe tener más de 2 caracteres",
        (v) => /.+@.+\..+/.test(v) || "El correo electronico debe ser válido",
      ],
    },
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
  }),

  watch: {
    dialog(val) {
      val || this.closeDialog();
    },
  },

  methods: {
    ...mapActions({
      addPersons: "addPersons",
      editPersons: "editPersons",
    }),

    editItem(item) {
      this.valueItem = Object.assign({}, item);
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.valueItem = Object.assign({}, this.defaultItem);
      });
    },

    savePerson() {
      this.addPersons(this.valueItem);
      this.closeDialog();
      this.snackbar = true;
      this.colorSnack = "success";
      this.text = "¡Agregado exitosamente!";
    },

    editPerson() {
      this.editPersons(this.valueItem);
      this.closeDialog();
      this.snackbar = true;
      this.colorSnack = "success";
      this.text = "¡Editado exitosamente!";
    },
  },
};
</script>
