<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container class="mt-3">
      <v-card-title>Datos de proyectos</v-card-title>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="data.name"
            label="Nombre"
            v-mask="upperCaseMask"
            outlined
            dense
            :rules="rules.defaultText"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="data.acronym"
            label="Acrónimo"
            v-mask="upperCaseMask"
            outlined
            dense
            :rules="rules.defaultText"
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
                :rules="rules.default"
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
        <v-col cols="12">
          <v-checkbox
            v-model="data.isJustOneDay"
            label="Solo un día"
            color="primary"
            hide-details
            dense
          />
        </v-col>
        <v-col cols="12">
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
        <v-col cols="12" v-if="!data.isJustOneDay">
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
      <v-card-title>Datos de sponsors</v-card-title>
      <v-card-title>
        Buscar sponsor
        <v-spacer></v-spacer>
        <v-btn color="primary" fab small elevation="0" @click="search">
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
      </v-card-title>
      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">Rif</th>
                <th class="text-left">Nombre</th>
                <th class="text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.sponsors" :key="item.code">
                <td v-if="!item.delete">{{ item.code }}</td>
                <td v-if="!item.delete">{{ item.name }}</td>
                <td v-if="!item.delete">
                  <v-btn fab x-small color="error" @click="deleteSponsor(item)">
                    <v-icon small> mdi-delete </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-divider class="my-2"></v-divider>
      <v-row justify="end">
        <v-col cols="12" md="5">
          <v-btn
            block
            :disabled="!valid || disabledButtom"
            color="primary"
            type="submit"
          >
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
  name: "formProject",
  props: {
    enabled: {
      type: Boolean,
      default: false,
    },
    isAggregated: { type: Boolean, default: false },
  },
  data: () => ({
    valid: true,
    disabledButtom: false,
    menuDateOfEntry: false,
    menuDateOfDischarge: false,
    activePicker: null,
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
      project: "getProject",
    }),
    data() {
      return this.project;
    },
  },
  watch: {
    enabled(val) {
      if (!val) {
        this.$refs.form.reset();
      }
    },
    dialogIsEnable(newVal) {
      if (newVal === false) {
        this.$refs.form.reset();
        this.panel = 1;
      }
    },
    menuDateOfEntry(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    menuDateOfDischarge(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    ...mapMutations([
      "deleteSponsorsToProject",
      "changeDeleteSponsors",
      "changeLoading",
    ]),
    deleteSponsor(data) {
      if (this.isAggregated) this.deleteSponsorsToProject(data);
      else this.changeDeleteSponsors([data, true]);
    },
    submit() {
      if (this.isAggregated) {
        this.disabledButtom = true;
        this.changeLoading(true);
        this.$axios
          .post(
            "api/project",
            {
              params: {
                name: this.data.name,
                acronym: this.data.acronym,
                startDate: this.data.startDate,
                dueDate: this.data.dueDate,
                minYearsOld: `${this.data.minYear} years ${this.data.minMons} mons ${this.data.minDay} days`,
                maxYearsOld: `${this.data.maxYear} years ${this.data.maxMons} mons ${this.data.maxDay} days`,
                fromDay: this.data.fromDay,
                toDay: this.data.isJustOneDay
                  ? this.data.fromDay
                  : this.data.toDay,
                isJustOneDay: this.data.isJustOneDay,
                sponsors: this.data.sponsors,
              },
            },
            {
              headers: {
                "x-access-token": `${this.$cookies.get("x-access-token")}`,
              },
            }
          )
          .then((resp) => {
            this.disabledButtom = false;
            this.changeLoading(false);
            this.$emit("close", { showForm: false, resp });
          })
          .catch((err) => {
            this.disabledButtom = false;
            this.changeLoading(false);
            console.log(err);
          });
      } else {
        this.disabledButtom = true;
        this.changeLoading(true);
        this.$axios
          .put(
            "api/project",
            {
              params: {
                code: this.data.code,
                name: this.data.name,
                acronym: this.data.acronym,
                startDate: this.data.startDate,
                dueDate: this.data.dueDate,
                minYearsOld: `${this.data.minYear} years ${this.data.minMons} mons ${this.data.minDay} days`,
                maxYearsOld: `${this.data.maxYear} years ${this.data.maxMons} mons ${this.data.maxDay} days`,
                fromDay: this.data.fromDay,
                toDay: this.data.isJustOneDay
                  ? this.data.fromDay
                  : this.data.toDay,
                isJustOneDay: this.data.isJustOneDay,
                sponsors: this.data.sponsors,
              },
            },
            {
              headers: {
                "x-access-token": `${this.$cookies.get("x-access-token")}`,
              },
            }
          )
          .then((resp) => {
            this.disabledButtom = false;
            this.changeLoading(false);
            this.$emit("close", { showForm: false, resp });
          })
          .catch((err) => {
            this.disabledButtom = false;
            this.changeLoading(false);
            console.log(err);
          });
      }
    },
    search() {
      this.$emit("search", true);
    },
    cancel() {
      this.$emit("cancel", false);
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
