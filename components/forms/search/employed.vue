<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          v-model="data.stadeCode"
          label="Estado"
          :items="stades"
          item-text="name"
          item-value="code"
          dense
          outlined
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
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="data.departamentCode"
          label="Departamento"
          :items="departaments"
          item-text="name"
          item-value="code"
          dense
          outlined
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
    <div class="pa-2">
      <v-btn class="pa-2" block color="primary" @click="search">Filtrar</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "searchEmployed",
  data() {
    return {
      regions: [],
      stades: [],
      municipality: [],
      parrish: [],
      jobPositions: [],
      departaments: [],
      activePicker: null,
      menuDateOfEntry: false,
      menuDateOfDischarge: false,
    };
  },
  watch: {
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
  computed: {
    ...mapGetters({ searchOptions: "getEmployedSearchOptions" }),
    data() {
      return this.searchOptions;
    },
  },
  methods: {
    ...mapMutations(["setEmployeds"]),
    search() {
      this.$axios
        .get("api/Employed", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: {
            jobPositionCode: this.data.jobPositionCode,
            departamentCode: this.data.departamentCode,
            dateOfEntry: this.data.dateOfEntry,
            dateOfDischarge: this.data.dateOfDischarge,
            dni: this.data.dni,
            stadeCode: this.data.stadeCode,
            municipalityCode: this.data.municipalityCode,
            parrishCode: this.data.parrishCode,
          },
        })
        .then(async (resp) => {
          this.setEmployeds(await resp.data);
          this.$emit("close", false);
        });
    },
    chargeStade() {
      this.$axios
        .get("api/stade", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: { regionCode: "" },
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

          params: { stadeCode: this.data.stadeCode },
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
          headers: {},

          params: { municipalityCode: this.data.municipalityCode },
        })
        .then((response) => {
          this.parrish = response.data;
          // console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveDateOfEntry(date) {
      this.$refs.menuDateOfEntry.save(date);
    },

    saveDateOfDicharge(date) {
      this.$refs.menuDateOfDischarge.save(date);
    },
  },
  mounted() {
    this.$axios
      .get("api/jobPosition", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
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
  },
};
</script>

<style lang="scss" scoped></style>
