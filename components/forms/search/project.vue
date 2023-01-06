<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="data.name"
          label="Nombre"
          v-mask="upperCaseMask"
          outlined
          dense
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="data.acronym"
          label="Acrónimo"
          v-mask="upperCaseMask"
          outlined
          dense
        />
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
              v-model="data.startDate"
              outlined
              label="Fecha inicio"
              prepend-inner-icon="mdi-calendar"
              readonly
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="data.startDate"
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
              v-model="data.dueDate"
              outlined
              label="Fecha cierre"
              prepend-inner-icon="mdi-calendar"
              readonly
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="data.dueDate"
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
    <v-card-title>Edad minima</v-card-title>
    <v-row>
      <v-col cols="4">
        <v-text-field v-model="data.minYear" label="Años" outlined dense />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="data.minMons" label="Meses" outlined dense />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="data.minDay" label="Días" outlined dense />
      </v-col>
    </v-row>
    <v-card-title>Edad maxima</v-card-title>
    <v-row>
      <v-col cols="4">
        <v-text-field v-model="data.maxYear" label="Años" outlined dense />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="data.maxMons" label="Meses" outlined dense />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="data.maxDay" label="Días" outlined dense />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="data.fromDay"
          label="Desde"
          :items="days"
          item-value="code"
          item-text="name"
          outlined
          dense
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="data.toDay"
          label="Hasta"
          :items="days"
          item-value="code"
          item-text="name"
          outlined
          dense
        />
      </v-col>
    </v-row>
    <div class="pa-2">
      <v-btn class="pa-2" block rounded color="primary" @click="search"
        >Filtrar</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "searchProject",
  data() {
    return {
      activePicker: null,
      menuDateOfEntry: false,
      menuDateOfDischarge: false,
      upperCaseMask: {
        mask: "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
        tokens: {
          U: {
            pattern: /[a-zA-Z\s]/,
            transform: (v) => v.toLocaleUpperCase(),
          },
        },
      },
      days: [
        { code: "0", name: "Domingo" },
        { code: "1", name: "Lunes" },
        { code: "2", name: "Martes" },
        { code: "3", name: "Miercoles" },
        { code: "4", name: "Jueves" },
        { code: "5", name: "Viernes" },
        { code: "6", name: "Sabado" },
      ],
    };
  },
  watch: {
    menuDateOfEntry(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    menuDateOfDischarge(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    ...mapGetters({ searchOptions: "getProjectsSearchOptions" }),
    data() {
      return this.searchOptions;
    },
  },
  methods: {
    ...mapMutations(["setProjects"]),
    search() {
      this.$axios
        .get("api/project", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: {
            name: this.data.name,
            acronym: this.data.acronym,
            startDate: this.data.startDate,
            dueDate: this.data.dueDate,
            minYearsOld: `${this.data.minYear} years ${this.data.minMons} mons ${this.data.minDay} days`,
            maxYearsOld: `${this.data.maxYear} years ${this.data.maxMons} mons ${this.data.maxDay} days`,
            fromDay: this.data.fromDay,
            toDay: this.data.toDay,
          },
        })
        .then(async (resp) => {
          this.setProjects(await resp.data);
          this.$emit("close", false);
        });
    },
    saveDateOfEntry(date) {
      this.$refs.menuDateOfEntry.save(date);
    },
    saveDateOfDicharge(date) {
      this.$refs.menuDateOfDischarge.save(date);
    },
  },
};
</script>

<style lang="scss" scoped></style>
