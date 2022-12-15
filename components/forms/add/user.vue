<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container class="mt-3">
      <v-card-title>
        Buscar persona
        <v-spacer></v-spacer>
        <v-btn color="primary" fab small elevation="0" @click="searchPerson">
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-title>Datos de Usuario</v-card-title>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="data.username"
            label="Nombre de usuario"
            v-mask="upperCaseMask"
            outlined
            dense
            placeholder="Ingrese el nombre de usuario"
            :rules="rules.defaultText"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="data.password"
            label="Contraseña"
            v-mask="passwordMask"
            outlined
            dense
            placeholder="Ingrese la contraseña"
            :rules="[
              (v) => (!!v && this.isAggregated) || 'Este campo es obligatorio',
              (v) =>
                (v && v.length > 7) ||
                'Este campo debe tener más de 7 caracteres',
            ]"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="data.repeatPassword"
            label="Repetir Contraseña"
            v-mask="passwordMask"
            outlined
            dense
            placeholder="Repita la contraseña"
            :rules="[
              (v) => !!v || 'Este campo es obligatorio',
              this.data.password === this.data.repeatPassword ||
                'La contraseña no coincide',
            ]"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="data.securityCode"
            label="Codigo de seguridad"
            v-mask="passwordMask"
            outlined
            dense
            placeholder="Ingrese el codigo de seguridad"
            :rules="[
              (v) => (!!v && !this.isAggregated) || 'Este campo es obligatorio',
              (v) =>
                (v && v.length > 7) ||
                'Este campo debe tener más de 7 caracteres',
            ]"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="data.email"
            label="correo electronico"
            v-mask="emailMask"
            outlined
            dense
            placeholder="Ingrese el correo electronico"
            :rules="rules.defaultEmail"
          />
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="data.statusCode"
            label="Estatus"
            :items="userStatus"
            item-text="name"
            item-value="code"
            dense
            outlined
          />
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="data.roleCode"
            label="Rol del usuario"
            :items="userRoles"
            item-text="name"
            item-value="code"
            dense
            outlined
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-card-title>Datos personales del usuario</v-card-title>
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
        <v-col cols="12" md="4">
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
        <v-col cols="12" md="8">
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
            :disabled="personalData.code !== '' ? true : false"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="personalData.bornDate"
                label="Fecha de nacimiento"
                prepend-icon="mdi-calendar"
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
        <v-col cols="12" v-if="data.disability">
          <v-select
            v-model="personalData.disabilityTypeCode"
            label="Tipo de discapacidad"
            :items="disabilitys"
            item-text="name"
            item-value="code"
            dense
            :disabled="personalData.code !== '' ? true : false"
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
        <v-col cols="12" v-if="data.ethnicGroup">
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
        <v-col cols="12">
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
        <v-col cols="12">
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
        <!-- <v-col cols="12" md="5" v-if="inDialog">
          <v-btn block dark color="secondary">Cancelar</v-btn>
        </v-col> -->
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
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "formUser",
  props: {
    enabled: {
      type: Boolean,
      default: false,
    },
    isAggregated: { type: Boolean, default: false },
    title: { type: String, default: "" },
  },
  data: () => ({
    valid: true,
    genders: [],
    regions: [],
    status: [],
    roles: [],
    stades: [],
    municipality: [],
    parrish: [],
    martialStatus: [],
    documentTypes: [],
    disabilitys: [],
    userRoles: [],
    userStatus: [],
    menuBornDate: false,
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
    passwordMask: {
      mask: "PPPPPPPPPPPPPPP",
      tokens: {
        P: {
          pattern: /[a-zA-Z0-9]/,
        },
      },
    },
    emailMask: {
      mask: "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
      tokens: {
        E: {
          pattern: /[a-zA-Z.@_-]/,
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
      repeatPassword: [(v) => !!v || "Este campo es obligatorio"],
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
      user: "getUser",
      token: "getToken",
      userPersonalData: "getUserPersonalData",
    }),
    data() {
      return this.user;
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
    personalData(val) {
      if (val.regionCode !== "") {
        this.chargeStade();
        this.chargeMunicipality();
        this.chargeParrish();
      }
    },
    menuBornDate(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    ...mapMutations(["setUser", "setUserPersonalData"]),
    submit() {
      const re = /[()-]/gm;
      const phoneNumber = this.personalData.phoneNumber.replace(re, "");
      if (this.isAggregated) {
        this.$axios
          .post(
            "api/Users",
            {
              params: {
                personalDataCode: this.personalData.code,
                username: this.data.username,
                password: this.data.password,
                email: this.data.email,
                statusCode: this.data.statusCode,
                securityCode: this.data.securityCode,
                roleCode: this.data.roleCode,
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
                phoneNumber: phoneNumber,
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
        console.log(phoneNumber);
        // this.$axios
        //   .put(
        //     "api/employed",
        //     {
        //       params: {
        //         employedCode: this.data.employedCode,
        //         personalDataCode: this.data.personalDataCode,
        //         jobPositionCode: this.data.jobPositionCode,
        //         departamentCode: this.data.departamentCode,
        //         dateOfEntry: this.data.dateOfEntry,
        //         dateOfDischarge: this.data.dateOfDischarge,
        //         firstName: this.data.firstName,
        //         lastName: this.data.lastName,
        //         genderCode: this.data.genderCode,
        //         documentTypeCode: this.data.documentTypeCode,
        //         dni: this.data.dni,
        //         bornDate: this.data.bornDate,
        //         martialStatusCode: this.data.martialStatusCode,
        //         disability: this.data.disability,
        //         disabilityTypeCode: this.data.disabilityTypeCode,
        //         ethnicGroup: this.data.ethnicGroup,
        //         ethnicDescription: this.data.ethnicDescription,
        //         parrishCode: this.data.parrishCode,
        //         direction: this.data.direction,
        //         numberPhone: phoneNumber,
        //       },
        //     },
        //     {
        //       headers: {
        //         "x-access-token": `${this.token}`,
        //       },
        //     }
        //   )
        //   .then(() => {
        //     this.$emit("close", false);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }
    },
    searchPerson() {
      this.$emit("search-person", true);
    },
    chargeStade() {
      this.$axios
        .get("api/stade", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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

    close() {
      this.$emit("close", false);
    },
    saveBornDate(date) {
      this.$refs.menuBornDate.save(date);
    },
  },
  mounted() {
    this.$axios
      .get("api/userStatus", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.userStatus = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/userRoles", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.userRoles = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/gender", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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
