<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container class="mt-3">
      <v-card-title>Datos del representante</v-card-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.representative.firstName"
            label="Nombres"
            v-mask="upperCaseMask"
            outlined
            dense
            placeholder="Introduzca los 2 nombres"
            :rules="rules.defaultText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.representative.lastName"
            label="Apellidos"
            v-mask="upperCaseMask"
            placeholder="Introduzca los 2 apellidos"
            outlined
            dense
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.representative.numberPhone"
            label="Numero de telefono"
            outlined
            v-mask="'(####) ###-##-##'"
            dense
            placeholder="Introduzca el numero de telefono"
            :rules="rules.defaultText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.representative.direction"
            label="Direccion"
            placeholder="Introduzca la direccion"
            v-mask="upperCaseMask"
            outlined
            dense
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-2"> </v-divider>
      <v-card-title>Datos del pasiente</v-card-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.patient.firstName"
            label="Nombres"
            v-mask="upperCaseMask"
            outlined
            dense
            placeholder="Introduzca los 2 nombres"
            :rules="rules.defaultText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.patient.lastName"
            label="Apellidos"
            v-mask="upperCaseMask"
            placeholder="Introduzca los 2 apellidos"
            outlined
            dense
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="data.patient.bornDate"
                label="Birthday date"
                prepend-icon="mdi-calendar"
                readonly
                dense
                :rules="rules.default"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="data.patient.bornDate"
              :active-picker="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-divider class="my-2"></v-divider>
      <v-card-title>Lugares de asistencia </v-card-title>
      <v-row>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="data.pediatrics"
            label="Pediatria"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="data.nutritionist"
            label="Nutricionista"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="data.psychiatry"
            label="Psyquiatra"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="data.psicology"
            label="Psicologia"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="data.def"
            label="Def"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="data.breastfeedingAdvice"
            label="Consejo de lactancia"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="allOption"
            label="Todas"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-divider class="my-2"></v-divider>
      <v-row justify="end">
        <!-- <v-col cols="12" md="5" v-if="inDialog">
          <v-btn block dark color="secondary">Cancelar</v-btn>
        </v-col> -->
        <v-col cols="12" md="5">
          <v-btn block :disabled="!valid" color="primary" type="submit">
            {{ formData.code ? "Editar" : "Guardar" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "formAddMedicalAppointment",
  props: {
    dialogIsEnable: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default() {
        return {
          representative: {
            firstName: "",
            lastName: "",
            numberPhone: "",
            direction: "",
          },
          patient: {
            firstName: "",
            lastName: "",
            bornDate: "",
          },
          pediatrics: false,
          nitritionist: false,
          psychiatry: false,
          psicology: false,
          breastfeedingAdvice: false,
          def: false,
          assisten: null,
        };
      },
    },
  },
  watch: {
    dialogIsEnable(newVal) {
      if (newVal === false) {
        this.$refs.form.reset();
        this.panel = 1;
      }
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    allOption(val) {
      this.data.pediatrics = val;
      this.data.psicology = val;
      this.data.breastfeedingAdvice = val;
      this.data.nutritionist = val;
      this.data.psychiatry = val;
      this.data.def = val;
    },
  },
  data: () => ({
    panel: 1,
    valid: true,
    activePicker: null,
    allOption: false,
    upperCaseMask: {
      mask: "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
      tokens: {
        U: {
          pattern: /[a-zA-Z\s]/,
          transform: (v) => v.toLocaleUpperCase(),
        },
      },
    },
    menu: false,
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
  }),
  computed: {
    data() {
      return this.formData;
    },
  },
  methods: {
    submit() {
      this.$axios
        .post("api/appointment", {
          params: {
            pediatrics: this.data.pediatrics,
            nutritionist: this.data.nutritionist,
            psychiatry: this.data.psychiatry,
            breastfeedingAdvice: this.data.breastfeedingAdvice,
            def: this.data.def,
            representativeFirstName: this.data.representative.firstName,
            representativeLastName: this.data.representative.lastName,
            representativeNumberPhone: this.data.representative.numberPhone,
            representativeDirection: this.data.representative.direction,
            patientFirstName: this.data.patient.firstName,
            patientLastName: this.data.patient.lastName,
            patientBornDate: this.data.patient.bornDate,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.$emit("cancel", false);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>

<style lang="scss" scoped></style>
