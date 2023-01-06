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
      <v-col cols="12" md="12">
        <v-checkbox
          v-model="data.unabled"
          label="Disabilitados"
          color="primary"
          hide-details
          dense
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="data.fatherCode"
          label="Codigo del modulo padre"
          v-mask="codeMask"
          dense
          outlined
          color="primary"
          placeholder="Ingrese el codigo del modulo padre"
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="pa-2">
      <v-btn class="pa-2" block rounded color="primary" @click="search">Filtrar</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "searchUsers",
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
        mask: "UUU-########",
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
      searchOptions: "getModuleSearchOptions",
    }),
    data() {
      return this.searchOptions;
    },
  },
  methods: {
    ...mapMutations(["setModules"]),
    search() {
      this.$axios
        .get("api/modules", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: {
            code: this.data.code,
            name: this.data.name,
            unabled: this.data.unabled,
            fatherCode: this.data.fatherCode,
          },
        })
        .then(async (resp) => {
          this.setModules(await resp.data);
          this.$emit("close", false);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
