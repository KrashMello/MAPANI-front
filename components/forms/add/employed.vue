<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container class="mt-3">
      <v-card-title v-if="isAggregated">
        Buscar persona
        <v-spacer></v-spacer>
        <v-btn color="primary" fab small elevation="0" @click="searchPerson">
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-title>Datos Mapani</v-card-title>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="data.departamentCode"
            label="Departamento"
            :items="departaments"
            item-text="name"
            item-value="code"
            dense
            outlined
            :rule="rules.default"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="data.jobPositionCode"
            label="Cargo"
            :items="jobPositions"
            item-text="name"
            item-value="code"
            dense
            outlined
            :rule="rules.default"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            ref="menuDateOfEntry"
            v-model="menuDateOfEntry"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="data.dateOfEntry"
                outlined
                label="Fecha de ingreso"
                prepend-inner-icon="mdi-calendar"
                readonly
                dense
                :rules="rules.default"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="data.dateOfEntry"
              :active-picker="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="saveDateOfEntry"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            ref="menuDateOfDischarge"
            v-model="menuDateOfDischarge"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="data.dateOfDischarge"
                outlined
                label="Fecha de egreso"
                prepend-inner-icon="mdi-calendar"
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="data.dateOfDischarge"
              :active-picker="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="saveDateOfDicharge"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-divider />
      <v-divider />
      <v-card-title>Datos personales del empleado</v-card-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="personalData.firstName"
            label="Nombres"
            v-mask="upperCaseMask"
            outlined
            dense
            :disabled="personalData.code !== '' ? true : false"
            placeholder="Ingrese los dos nombres"
            :rules="rules.defaultText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="personalData.lastName"
            label="Apellidos"
            v-mask="upperCaseMask"
            placeholder="Ingrese los dos apellidos"
            outlined
            dense
            :disabled="personalData.code !== '' ? true : false"
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="personalData.genderCode"
            label="Genero"
            :items="genders"
            item-text="name"
            item-value="code"
            dense
            :disabled="personalData.code !== '' ? true : false"
            outlined
            :rule="rules.default"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="personalData.documentTypeCode"
            label="Tipo de documento"
            :items="documentTypes"
            item-text="acronym"
            item-value="code"
            dense
            :disabled="personalData.code !== '' ? true : false"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field
            v-model="personalData.dni"
            label="Numero de cedula"
            v-mask="dniMask"
            placeholder="Ingrese el numero de cedula"
            outlined
            dense
            :disabled="personalData.code !== '' ? true : false"
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-menu
            ref="menuBornDate"
            v-model="menuBornDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="personalData.bornDate"
                outlined
                label="Fecha de nacimiento"
                prepend-inner-icon="mdi-calendar"
                readonly
                dense
                :disabled="personalData.code !== '' ? true : false"
                :rules="rules.default"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="personalData.bornDate"
              :active-picker="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="saveBornDate"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="personalData.martialStatusCode"
            label="Estado civil"
            :items="martialStatus"
            item-text="name"
            item-value="code"
            dense
            :disabled="personalData.code !== '' ? true : false"
            outlined
            :rule="rules.default"
          ></v-select>
        </v-col>
        <v-col cols="12" md="12">
          <v-checkbox
            v-model="personalData.disability"
            label="Discapacidad"
            color="primary"
            hide-details
            dense
            :disabled="personalData.code !== '' ? true : false"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" v-if="personalData.disability">
          <v-select
            v-model="personalData.disabilityTypeCode"
            label="Tipo de discapacidad"
            :items="disabilitys"
            item-text="name"
            item-value="code"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-checkbox
            v-model="personalData.ethnicGroup"
            label="Grupo ethnico"
            color="primary"
            hide-details
            dense
            :disabled="personalData.code !== '' ? true : false"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" v-if="personalData.ethnicGroup">
          <v-text-field
            v-model="personalData.ethnicDescription"
            label="Descripcion del grupo ethnico"
            v-mask="upperCaseMask"
            placeholder="Ingrese el grupo ethnico"
            outlined
            dense
            :disabled="personalData.code !== '' ? true : false"
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="personalData.regionCode"
            label="Region"
            :items="regions"
            item-text="name"
            item-value="code"
            dense
            :disabled="personalData.code !== '' ? true : false"
            outlined
            :rule="rules.default"
            @change="chargeStade"
          ></v-select>
        </v-col>
        <v-col cols="12" v-if="personalData.regionCode">
          <v-select
            v-model="personalData.stadeCode"
            label="Estado"
            :items="stades"
            item-text="name"
            item-value="code"
            dense
            :disabled="personalData.code !== '' ? true : false"
            outlined
            :rule="rules.default"
            @change="chargeMunicipality"
          ></v-select>
        </v-col>
        <v-col cols="12" v-if="personalData.stadeCode">
          <v-select
            v-model="personalData.municipalityCode"
            label="Municipio"
            :items="municipality"
            item-text="name"
            item-value="code"
            dense
            :disabled="personalData.code !== '' ? true : false"
            outlined
            :rule="rules.default"
            @change="chargeParrish"
          ></v-select>
        </v-col>
        <v-col cols="12" v-if="personalData.municipalityCode">
          <v-select
            v-model="personalData.parrishCode"
            label="Parroquia"
            :items="parrish"
            item-text="name"
            item-value="code"
            dense
            :disabled="personalData.code !== '' ? true : false"
            outlined
            :rule="rules.default"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="personalData.direction"
            label="Direccion"
            outlined
            v-mask="upperCaseMask"
            dense
            :disabled="personalData.code !== '' ? true : false"
            placeholder="Ingrese la direccion"
            :rules="rules.defaultText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="personalData.phoneNumber"
            label="Numero de telefono"
            placeholder="Ingrese el numero telefonico"
            v-mask="numberPhoneMask"
            outlined
            dense
            :disabled="personalData.code !== '' ? true : false"
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-2"></v-divider>
      <v-row justify="end">
        <v-col cols="12" md="5">
          <v-btn block :disabled="!valid" color="primary" type="submit">
            {{ data.code ? "Editar" : "Guardar" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "formEmployed",
  props: {
    enabled: {
      type: Boolean,
      default: false,
    },
    isAggregated: { type: Boolean, default: false },
  },
  data: () => ({
    valid: true,
    genders: [],
    regions: [],
    stades: [],
    municipality: [],
    parrish: [],
    martialStatus: [],
    documentTypes: [],
    disabilitys: [],
    jobPositions: [],
    departaments: [],
    menuBornDate: false,
    menuDateOfEntry: false,
    menuDateOfDischarge: false,
    activePicker: null,
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
        "#": { pattern: /\d/ },
      },
      masked: true,
    },
    dniMask: {
      mask: "#########",
      tokens: {
        "#": { pattern: /\d/ },
      },
      masked: true,
    },

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
    ...mapGetters({
      employed: "getEmployed",
      userPersonalData: "getUserPersonalData",
    }),
    data() {
      return this.employed;
    },
    personalData() {
      return this.userPersonalData;
    },
  },
  watch: {
    enabled(val) {
      if (!val) {
        this.$refs.form.reset();
      }
      
    },
   personalData(oldVal,newVal){
    if(oldVal.code !== newVal.code && !this.isAggregated){
        this.chargeStade();
        this.chargeMunicipality();
        this.chargeParrish();
      }
    },
    dialogIsEnable(newVal) {
      if (newVal === false) {
        this.$refs.form.reset();
        this.panel = 1;
      }
    },
    menuBornDate(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    menuDateOfEntry(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    menuDateOfDischarge(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    submit() {
      const re = /[()-]/gm;
      const phoneNumber = this.personalData.phoneNumber.replace(re, "");
      if (this.isAggregated) {
        this.$axios
          .post(
            "api/employed",
            {
              params: {
                personalDataCode: this.personalData.code,
                jobPositionCode: this.data.jobPositionCode,
                departamentCode: this.data.departamentCode,
                dateOfEntry: this.data.dateOfEntry,
                dateOfDischarge: this.data.dateOfDischarge,
                firstName: this.personalData.firstName,
                lastName: this.personalData.lastName,
                genderCode: this.personalData.genderCode,
                documentTypeCode: this.personalData.documentTypeCode,
                dni: this.personalData.dni,
                bornDate: this.personalData.bornDate,
                martialStatusCode: this.personalData.martialStatusCode,
                disability: this.personalData.disability,
                disabilityTypeCode: this.personalData.disabilityTypeCode,
                ethnicGroup: this.personalData.ethnicGroup,
                ethnicDescription: this.personalData.ethnicDescription,
                parrishCode: this.personalData.parrishCode,
                direction: this.personalData.direction,
                numberPhone: phoneNumber,
              },
            },
            {
              headers: {
                "x-access-token": `${this.$cookies.get("x-access-token")}`,
              },
            }
          )
          .then((resp) => {
            this.$emit("close", { showForm: false, resp });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$axios
          .put(
            "api/employed",
            {
              params: {
                employedCode: this.data.code,
                personalDataCode: this.data.personalDataCode,
                jobPositionCode: this.data.jobPositionCode,
                departamentCode: this.data.departamentCode,
                dateOfEntry: this.data.dateOfEntry,
                dateOfDischarge: this.data.dateOfDischarge,
                firstName: this.personalData.firstName,
                lastName: this.personalData.lastName,
                genderCode: this.personalData.genderCode,
                documentTypeCode: this.personalData.documentTypeCode,
                dni: this.personalData.dni,
                bornDate: this.personalData.bornDate,
                martialStatusCode: this.personalData.martialStatusCode,
                disability: this.personalData.disability,
                disabilityTypeCode: this.personalData.disabilityTypeCode,
                ethnicGroup: this.personalData.ethnicGroup,
                ethnicDescription: this.personalData.ethnicDescription,
                parrishCode: this.personalData.parrishCode,
                direction: this.personalData.direction,
                numberPhone: phoneNumber,
              },
            },
            {
              headers: {
                "x-access-token": `${this.$cookies.get("x-access-token")}`,
              },
            }
          )
          .then((resp) => {
            this.$emit("close", { showForm: false, resp });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    chargeStade() {
      this.$axios
        .get("api/stade", {
          headers: {
            "x-access-token": `${this.$cookies.get("x-access-token")}`,
          },
          params: { regionCode: this.personalData.regionCode },
        })
        .then((response) => {
          this.stades = response.data;
          // console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chargeMunicipality() {
      this.$axios
        .get("api/municipality", {
          headers: {
            "x-access-token": `${this.$cookies.get("x-access-token")}`,
          },

          params: { stadeCode: this.personalData.stadeCode },
        })
        .then((response) => {
          this.municipality = response.data;
          // console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chargeParrish() {
      this.$axios
        .get("api/parrish", {
          headers: {
            "x-access-token": `${this.$cookies.get("x-access-token")}`,
          },

          params: { municipalityCode: this.personalData.municipalityCode },
        })
        .then((response) => {
          this.parrish = response.data;
          // console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchPerson() {
      this.$emit("search-person", true);
    },
    cancel() {
      this.$emit("cancel", false);
    },
    saveBornDate(date) {
      this.$refs.menuBornDate.save(date);
    },
    saveDateOfEntry(date) {
      this.$refs.menuDateOfEntry.save(date);
    },
    saveDateOfDicharge(date) {
      this.$refs.menuDateOfDischarge.save(date);
    },
  },
  created() {
    this.$axios
      .get("api/jobPosition", {
        headers: {
          "x-access-token": `${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.jobPositions = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/departament", {
        headers: {
          "x-access-token": `${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.departaments = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/gender", {
        headers: {
          "x-access-token": `${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.genders = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/martialStatus", {
        headers: {
          "x-access-token": `${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.martialStatus = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });

    this.$axios
      .get("api/documentType", {
        headers: {
          "x-access-token": `${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.documentTypes = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });

    this.$axios
      .get("api/disability", {
        headers: {
          "x-access-token": `${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.disabilitys = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });

    this.$axios
      .get("api/region", {
        headers: {
          "x-access-token": `${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.regions = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    if (!this.isAggregated) {
      this.chargeStade();
      this.chargeMunicipality();
      this.chargeParrish();
    }
  },
};
</script>
