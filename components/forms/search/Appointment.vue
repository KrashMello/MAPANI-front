<template>
  <v-container class="mt-3">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="data.code"
          label="Codigo"
          v-mask="'aa-#######'"
          dense
          outlined
          color="primary"
          placeholder="ingrezar el codigo MAPANI"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="data.representativeFirstName"
          label="Nombre del representate"
          v-mask="upperCaseMask"
          dense
          outlined
          color="primary"
          placeholder="ingrece el nombre del representante"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="data.representativeLastName"
          label="Apellido del representante"
          v-mask="upperCaseMask"
          dense
          outlined
          color="primary"
          placeholder="ingrece el apellido del representante"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="data.patientFirstName"
          label="Nombre del paciente"
          v-mask="upperCaseMask"
          dense
          outlined
          color="primary"
          placeholder="ingrece el Nombre del paciente"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="data.patientLastName"
          label="Apellido del paciente"
          v-mask="upperCaseMask"
          dense
          outlined
          color="primary"
          placeholder="ingrece el apellido del paciente"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
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
              v-model="data.appointmentDate"
              label="Fecha de cita"
              prepend-icon="mdi-calendar"
              readonly
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="data.appointmentDate"
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
    <div class="pa-2">
      <v-btn class="pa-2" block rounded color="primary" @click="search">Filtrar</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "searchAppointment",
  props: {},
  data() {
    return {
      menu: false,
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
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    ...mapGetters({
      searchOptions: "getAppointmentSearchOptions",
    }),
    data() {
      return this.searchOptions;
    },
  },
  methods: {
    search() {
      this.socket.emit("searchAppointment", this.data);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>

<style lang="scss" scoped></style>
