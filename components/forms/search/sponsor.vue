<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          v-model="data.documentTypeCode"
          label="Tipo de documento"
          :items="documentTypes"
          item-text="name"
          item-value="code"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" v-if="data.documentTypeCode">
        <v-text-field
          v-model="data.rif"
          label="Nro de documento"
          v-mask="rifMask"
          outlined
          dense
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="data.name"
          label="Nombre"
          v-mask="upperCaseMask"
          outlined
          dense
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="data.email"
          label="Correo electrónico"
          outlined
          dense
          :rules="rules.defaultEmail"
        />
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
  name: "searchSponsor",
  data() {
    return {
      documentTypes: [],
      upperCaseMask: {
        mask: "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
        tokens: {
          U: {
            pattern: /[a-zA-Z\s]/,
            transform: (v) => v.toLocaleUpperCase(),
          },
        },
      },
      rifMask: {
        mask: "########-#",
        tokens: {
          "#": { pattern: /\d/ },
        },
        masked: true,
      },
      rules: {
        defaultEmail: [
          (v) =>
            (v && v.length > 2) || "Este campo debe tener más de 2 caracteres",
          (v) => /.+@.+\..+/.test(v) || "El correo electronico debe ser válido",
        ],
      },
    };
  },
  computed: {
    ...mapGetters({ searchOptions: "getSponsorSearchOptions" }),
    data() {
      return this.searchOptions;
    },
  },
  methods: {
    ...mapMutations(["setSponsors"]),
    search() {
      this.$axios
        .get("api/sponsor", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: {
            documentTypeCode: this.data.documentTypeCode,
            rif: this.data.rif,
            name: this.data.name,
            email: this.data.email,
          },
        })
        .then(async (resp) => {
          this.setSponsors(await resp.data);
          this.$emit("close", false);
        });
    },
  },
  created() {
    this.$axios
      .get("api/documentType", {
        headers: {
          "x-access-token": `${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.documentTypes = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped></style>
