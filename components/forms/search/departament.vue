<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="data.code"
          label="Codigo del modulo"
          v-mask="codeMask"
          dense
          outlined
          color="primary"
          placeholder="Ingrese el codigo de modulo"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="data.name"
          label="Nombre"
          v-mask="upperCaseMask"
          dense
          outlined
          color="primary"
          placeholder="Ingrese el nombre del modulo"
        ></v-text-field>
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
import { mapGetters } from "vuex";
export default {
  name: "searchDepartament",
  data() {
    return {
      upperCaseMask: {
        mask: "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
        tokens: {
          U: {
            pattern: /[a-zA-Z\s]/,
            transform: (v) => v.toLocaleUpperCase(),
          },
        },
      },
      codeMask: {
        mask: "UUUUU-########",
        tokens: {
          U: {
            pattern: /[a-zA-Z]/,
            transform: (v) => v.toLocaleUpperCase(),
          },
          "#": {
            pattern: /[0-9]/,
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      searchOptions: "getDepartamentSearchOptions",
    }),
    data() {
      return this.searchOptions;
    },
  },
  methods: {
    search() {
      this.$emit("filter");
    },
  },
};
</script>
