<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container class="mt-3">
      <v-card-title>
      Buscar historia clinical
      <v-spacer></v-spacer>
        <v-btn color="primary" fab small elevation="0">
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
      </v-card-title>
      <v-divider></v-divider>
     <v-card-title>Datos del representante</v-card-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.representativeFirstName"
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
            v-model="data.representativeLastName"
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
            v-model="data.representativeNumberPhone"
            label="Numero de telefono"
            outlined
            v-mask="numberPhoneMask"
            dense
            placeholder="Introduzca el numero de telefono"
            :rules="rules.defaultText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.representativeDirection"
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
            v-model="data.patientFirstName"
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
            v-model="data.patientLastName"
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
                v-model="data.patientBornDate"
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
              v-model="data.patientBornDate"
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
            label="Psiquiatra"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="data.socialPsychology"
            label="Psicologia social"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="data.clinicalPsychology"
            label="Psicologia clinica"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="data.advocacy"
            label="defensoria"
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
    isAggregated: { type: Boolean, default: false },
    formData: {
      type: Object,
      default() {
        return {
          representativeFirstName: "",
          representativeLastName: "",
          representativeNumberPhone: "",
          representativeDirection: "",
          patientFirstName: "",
          patientLastName: "",
          patientBornDate: "",
          pediatrics: false,
          nitritionist: false,
          psychiatry: false,
          socialPsychology: false,
          clinicalPsychology:false,
          breastfeedingAdvice: false,
          advocacy: false,
          clinicHistoryCode: null,
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
      this.data.socialPsychology  = val;
      this.data.breastfeedingAdvice = val;
      this.data.nutritionist = val;
      this.data.psychiatry = val;
      this.data.advocacy = val;
      this.data.clinicalPsychology = val;
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
    numberPhoneMask: {
      mask: "(####)###-##-##",
      tokens: {
        '#': {pattern: /\d/}
      },
      masked: true
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
      const re=/[()-]/gm
      const numberPhone = this.data.representativeNumberPhone.replace(re, '')
      if (this.isAggregated) {
        this.$axios
          .post("api/appointment", {
            params: {
              pediatrics: this.data.pediatrics,
              nutritionist: this.data.nutritionist,
              psychiatry: this.data.psychiatry,
              breastfeedingAdvice: this.data.breastfeedingAdvice,
              advocacy: this.data.advocacy,
              socialPsychology: this.data.socialPsychology,
              clinicalPsychology: this.data.clinicalPsychology,
              clinicHistoryCode: this.data.clinicHistoryCode,
              representativeFirstName: this.data.representativeFirstName,
              representativeLastName: this.data.representativeLastName,
              representativeNumberPhone: numberPhone,
              representativeDirection: this.data.representativeDirection,
              patientFirstName: this.data.patientFirstName,
              patientLastName: this.data.patientLastName,
              patientBornDate: this.data.patientBornDate,
            },
          })
          .then((response) => {
            this.$emit("close", false);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
          this.$axios
          .put("api/appointment", {
            params: {
              code: this.data.code,
              projectCode: this.data.projectCode,
              appointmentDate: this.data.appointmentDate,
              pediatrics: this.data.pediatrics,
              nutritionist: this.data.nutritionist,
              psychiatry: this.data.psychiatry,
              breastfeedingAdvice: this.data.breastfeedingAdvice,
              advocacy: this.data.advocacy,
              socialPsychology: this.data.socialPsychology,
              clinicalPsychology: this.data.clinicalPsychology,
              clinicHistoryCode: this.data.clinicHistoryCode,
              representativeFirstName: this.data.representativeFirstName,
              representativeLastName: this.data.representativeLastName,
              representativeNumberPhone: numberPhone,
              representativeDirection: this.data.representativeDirection,
              patientFirstName: this.data.patientFirstName,
              patientLastName: this.data.patientLastName,
              patientBornDate: this.data.patientBornDate,
              status: 0
            },
          })
          .then((response) => {
            this.$emit("close", false);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });

      }
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
