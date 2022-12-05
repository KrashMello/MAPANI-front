<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container class="mt-3">
      <v-card-title>
        Buscar persona
        <v-spacer></v-spacer>
        <v-btn color="primary" fab small elevation="0">
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
                label="Fecha de ingreso"
                prepend-icon="mdi-calendar"
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
                label="Fecha de egreso"
                prepend-icon="mdi-calendar"
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
      <v-divider/>
      <v-card-title>Datos personales del empleado</v-card-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.firstName"
            label="Nombres"
            v-mask="upperCaseMask"
            outlined
            dense
            placeholder="Ingrese los dos nombres"
            :rules="rules.defaultText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.lastName"
            label="Apellidos"
            v-mask="upperCaseMask"
            placeholder="Ingrese los dos apellidos"
            outlined
            dense
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="data.genderCode"
            label="Genero"
            :items="genders"
            item-text="name"
            item-value="code"
            dense
            outlined
            :rule="rules.default"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="data.documentTypeCode"
            label="Tipo de documento"
            :items="documentTypes"
            item-text="acronym"
            item-value="code"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field
            v-model="data.dni"
            label="Numero de cedula"
            v-mask="dniMask"
            placeholder="Ingrese el numero de cedula"
            outlined
            dense
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
              @change="saveBornDate"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="data.martialStatusCode"
            label="Estado civil"
            :items="martialStatus"
            item-text="name"
            item-value="code"
            dense
            outlined
            :rule="rules.default"
          ></v-select>
        </v-col>
        <v-col cols="12" md="12">
          <v-checkbox
            v-model="data.disability"
            label="Discapacidad"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col> 
        <v-col cols="12" v-if="data.disability">
          <v-select
            v-model="data.disabilityTypeCode"
            label="Tipo de discapacidad"
            :items="disabilitys"
            item-text="name"
            item-value="code"
            dense
            outlined
          ></v-select>
        </v-col>   
        <v-col cols="12" >
          <v-checkbox
            v-model="data.ethnicGroup"
            label="Grupo ethnico"
            color="primary"
            hide-details
            dense
          ></v-checkbox>
        </v-col>    
        <v-col cols="12" v-if="data.ethnicGroup">
          <v-text-field
            v-model="data.ethnicDescription"
            label="Descripcion del grupo ethnico"
            v-mask="upperCaseMask"
            placeholder="Ingrese el grupo ethnico"
            outlined
            dense
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="data.regionCode"
            label="Region"
            :items="regions"
            item-text="name"
            item-value="code"
            dense
            outlined
            :rule="rules.default"
            @change="chargeStade"
          ></v-select>
        </v-col>  
        <v-col cols="12" v-if="data.regionCode">
          <v-select
            v-model="data.stadeCode"
            label="Estado"
            :items="stades"
            item-text="name"
            item-value="code"
            dense
            outlined
            :rule="rules.default"
            @change="chargeMunicipality"
          ></v-select>
        </v-col>  
        <v-col cols="12" v-if="data.stadeCode">
          <v-select
            v-model="data.municipalityCode"
            label="Municipio"
            :items="municipality"
            item-text="name"
            item-value="code"
            dense
            outlined
            :rule="rules.default"
            @change="chargeParrish"
          ></v-select>
        </v-col>   
        <v-col cols="12" v-if="data.municipalityCode">
          <v-select
            v-model="data.parrishCode"
            label="Parroquia"
            :items="parrish"
            item-text="name"
            item-value="code"
            dense
            outlined
            :rule="rules.default"
          ></v-select>
        </v-col>  
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.direction"
            label="Direccion"
            outlined
            v-mask="upperCaseMask"
            dense
            placeholder="Ingrese la direccion"
            :rules="rules.defaultText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="data.phoneNumber"
            label="Numero de telefono"
            placeholder="Ingrese el numero telefonico"
            v-mask="numberPhoneMask"
            outlined
            dense
            :rules="rules.defaultText"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-2"></v-divider>
      <v-row justify="end">
        <!-- <v-col cols="12" md="5" v-if="inDialog">
          <v-btn block dark color="secondary">Cancelar</v-btn>
        </v-col> -->
        <v-col cols="12" md="5">
          <v-btn block :disabled="!valid" color="primary" type="submit">
            {{ data.employedCode ? "Editar" : "Guardar" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: "formEmployed",
  props: {
    dialogIsEnable: {
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
    ...mapGetters({ employed: "getEmployed" , token: "getToken"}),
    data() {
      return this.employed;
    },
  },
  watch: {
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
    ...mapMutations("setEmployed"),
    submit() {
      const re = /[()-]/gm;
      const phoneNumber = this.data.phoneNumber.replace(re, "");
      if (this.isAggregated) {
        this.$axios
          .post("api/employed", {
            params: {
              personalDataCode: this.data.personalDataCode,
              jobPositionCode: this.data.jobPositionCode,
              departamentCode: this.data.departamentCode,
              dateOfEntry: this.data.dateOfEntry,
              dateOfDischarge: this.data.dateOfDischarge,
              firstName: this.data.firstName,
              lastName: this.data.lastName,
              genderCode: this.data.genderCode,
              documentTypeCode: this.data.documentTypeCode,
              dni: this.data.dni,
              bornDate: this.data.bornDate,
              martialStatusCode: this.data.martialStatusCode,
              disability: this.data.disability,
              disabilityTypeCode: this.data.disabilityTypeCode,
              ethnicGroup: this.data.ethnicGroup,
              ethnicDescription: this.data.ethnicDescription,
              parrishCode: this.data.parrishCode,
              direction: this.data.direction,
              numberPhone: phoneNumber,
            },
          }, 
          { 
            headers: {
              'x-access-token': `${this.token}`
            },
          })
          .then(() => {
            this.$emit("close", false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$axios
          .put("api/employed", {
            params: {
              employedCode: this.data.employedCode,
              personalDataCode: this.data.personalDataCode,
              jobPositionCode: this.data.jobPositionCode,
              departamentCode: this.data.departamentCode,
              dateOfEntry: this.data.dateOfEntry,
              dateOfDischarge: this.data.dateOfDischarge,
              firstName: this.data.firstName,
              lastName: this.data.lastName,
              genderCode: this.data.genderCode,
              documentTypeCode: this.data.documentTypeCode,
              dni: this.data.dni,
              bornDate: this.data.bornDate,
              martialStatusCode: this.data.martialStatusCode,
              disability: this.data.disability,
              disabilityTypeCode: this.data.disabilityTypeCode,
              ethnicGroup: this.data.ethnicGroup,
              ethnicDescription: this.data.ethnicDescription,
              parrishCode: this.data.parrishCode,
              direction: this.data.direction,
              numberPhone: phoneNumber,
            },
          },
        { 
            headers: {
              'x-access-token': `${this.token}`
            },
          })
          .then(() => {
            this.$emit("close", false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    chargeStade(){
      this.$axios
        .get("api/stade", {
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          params:{regionCode: this.data.regionCode}}
        )
        .then((response) => {
          this.stades = response.data;
          // console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chargeMunicipality(){
      this.$axios
        .get("api/municipality", {
           headers: {
            'Authorization': `Bearer ${this.token}`
          },

          params:{stadeCode:this.data.stadeCode}
        })
        .then((response) => {
          this.municipality = response.data;
          // console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chargeParrish(){
      this.$axios
        .get("api/parrish", {
           headers: {
            'Authorization': `Bearer ${this.token}`
          },

          params:{municipalityCode:this.data.municipalityCode}
        })
        .then((response) => {
          this.parrish = response.data;
          // console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },

    cancel() {
      this.$emit("cancel", false);
      this.setEmployed({
        employedCode: "",
        personalDataCode: "",
        jobPositionCode: "",
        jobPositionName: "",
        departamentCode: "",
        departamentName: "",
        dateOfEntry: "",
        dateOfDischarge: "",
        firstName: "",
        lastName: "",
        genderCode: "",
        documentTypeCode: "",
        dni: "",
        bornDate: "",
        martialStausCode: "",
        disability: false,
        disabilityTypeCode: "",
        ethnicGroup: false,
        ethnicDescription: "",
        parrishCode: "",
        municipalityCode: "",
        stadeCode: "",
        regionCode: "",
        direction: "",
        phoneNumber: "",
      });
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
      .get("api/jobPosition",{
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
      })
      .then((response) => {
        this.jobPositions = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/departament",{
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
      })
      .then((response) => {
        this.departaments = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/gender",{
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
      })
      .then((response) => {
        this.genders = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/martialStatus",{
         headers: {
            'Authorization': `Bearer ${this.token}`
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
            'Authorization': `Bearer ${this.token}`
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
      .get("api/disability",{
 headers: {
            'Authorization': `Bearer ${this.token}`
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
      .get("api/region",{
 headers: {
            'Authorization': `Bearer ${this.token}`
          },

      })
      .then((response) => {
        this.regions = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    if(!this.isAggregated){
      this.chargeStade();
      this.chargeMunicipality();
      this.chargeParrish();
    }
  },

};
</script>
