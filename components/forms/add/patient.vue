<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container class="mt-3">
      <v-card-title>Datos del pasiente</v-card-title>
      <v-row v-if="isAggregated">
        <v-col cols="6">
          <v-checkbox
            v-model="showCode"
            label="El paciente posee un codigo"
            color="primary"
            dense
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-expand-transition>
            <v-text-field
              v-show="showCode"
              v-model="data.code"
              label="Codigo MAPANI"
              outlined
              dense
              :disable="!isAggregated"
              placeholder="Introduzca el codigo MAPANI del paciente"
            ></v-text-field>
          </v-expand-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.firstName"
            label="Nombres"
            v-mask="upperCaseMask"
            outlined
            dense
            placeholder="Introduzca los dos nombres del paciente"
            :rules="rules.defaultText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.lastName"
            label="Apellidos"
            v-mask="upperCaseMask"
            placeholder="Introduzca los dos apellidos paciente"
            outlined
            dense
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
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
                v-model="data.bornDate"
                label="Fecha de nacimiento"
                prepend-icon="mdi-calendar"
                readonly
                dense
                :rules="rules.default"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="data.bornDate"
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
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="data.genderCode"
            label="Genero"
            :items="genders"
            item-text="name"
            item-value="code"
            dense
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-checkbox
            v-model="data.birthCertificate"
            label="Partida de nacimiento"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="6">
          <v-checkbox
            v-model="data.disability"
            label="Discapacidad"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-divider class="my-2"></v-divider>
      <v-card-title v-if="data.disability">
        discapacidades
      </v-card-title>
      <v-expand-transition>
      <v-row v-show="data.disability">
        <v-col cols="3">
          <v-checkbox
            v-model="data.disabilityTypes.motor"
            label="Motora"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="data.disabilityTypes.visual"
            label="Visual"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="data.disabilityTypes.cognitive"
            label="Cognitiva"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="data.disabilityTypes.auditive"
            label="Auditiva"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>
      </v-row>
      </v-expand-transition>
      <v-row justify="end">
        <!-- <v-col cols="12" md="5" v-if="inDialog">
          <v-btn block dark color=" wsecondary">Cancelar</v-btn>
        </v-col> -->
        <v-col cols="12" md="5">
          <v-btn block :disabled="!valid" color="primary" type="submit">
            {{ !isAggregated ? "Editar" : "Guardar" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "formPatient",
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
          code: null,
          firstName: "",
          lastName: "",
          bornDate: "",
          genderCode: "",
          birthCertificate: false,
          disability: false,
          disabilityTypes: {
            motor: false,
            visual: false,
            cognitive: false,
            auditive: false,
          },
        };
      },
    },
  },
  watch: {
    isAggregated(newVal) {
      if (newVal === false) this.showCode = true;
    },
    showCode(newVal) {
      if (newVal === false) this.data.code = null;
    },

    dialogIsEnable(newVal) {
      if (newVal === false) {
        this.$refs.form.reset();
      }
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  data: () => ({
    valid: true,
    showCode: false,
    activePicker: null,
    genders: [],
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
      if (this.isAggregated) {
        this.$axios
          .post("api/patient", {
            params: {
              code: this.data.code,
              firstName: this.data.firstName,
              lastName: this.data.lastName,
              bornDate: this.data.bornDate,
              genderCode: this.data.genderCode,
              birthCertificate: this.data.birthCertificate,
              disability: this.data.disability,
              disabilityTypes: this.data.disabilityTypes,
            },
          })
          .then((response) => {
            this.$emit("close", false);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }else{
         this.$axios
          .put("api/patient", {
            params: {
              code: this.data.code,
              firstName: this.data.firstName,
              lastName: this.data.lastName,
              bornDate: this.data.bornDate,
              genderCode: this.data.genderCode,
              birthCertificate: this.data.birthCertificate,
              disability: this.data.disability,
              disabilityTypes: this.data.disabilityTypes,
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
  created() {
      this.$axios
      .get("api/gender")
      .then((response) => {
        this.genders = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped></style>
