<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container class="mt-3">
      <v-card-title>Datos de sponsor</v-card-title>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="data.documentTypeCode"
            label="Tipo de documento"
            :items="documentTypes"
            item-text="name"
            item-value="code"
            dense
            outlined
            :rules="rules.default"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="data.rif"
            label="Nro de documento"
            v-mask="rifMask"
            outlined
            dense
            :rules="rules.defaultText"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="data.name"
            label="Nombre"
            v-mask="upperCaseMask"
            outlined
            dense
            :rules="rules.defaultText"
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
        <v-col cols="12">
          <v-text-field
            v-model="data.contactNumber"
            label="Numero de telefono"
            v-mask="numberPhoneMask"
            outlined
            dense
            :rules="rules.defaultText"
          />
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
  name: "formSponsor",
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
    numberPhoneMask: {
      mask: "(####)###-##-##",
      tokens: {
        "#": { pattern: /\d/ },
      },
      masked: true,
    },
    rifMask: {
      mask: "########-#",
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
      sponsor: "getSponsor",
    }),
    data() {
      return this.sponsor;
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
  },
  methods: {
    ...mapMutations(["setSponsor"]),
    submit() {
      const re = /[()-]/gm;
      const contactNumber = this.data.contactNumber.replace(re, "");
      if (this.isAggregated) {
        (this.disabledButtom = true),
          this.$axios
            .post(
              "api/sponsor",
              {
                params: {
                  documentTypeCode: this.data.documentTypeCode,
                  documentTypeName: this.data.documentTypeName,
                  rif: this.data.rif,
                  name: this.data.name,
                  contactNumber: contactNumber,
                  email: this.data.email,
                },
              },
              {
                headers: {
                  "x-access-token": `${this.$cookies.get("x-access-token")}`,
                },
              }
            )
            .then((resp) => {
              (this.disabledButtom = false),
                this.$emit("close", { showForm: false, resp });
            })
            .catch((err) => {
              (this.disabledButtom = false), console.log(err);
            });
      } else {
        (this.disabledButtom = true),
          this.$axios
            .put(
              "api/sponsor",
              {
                params: {
                  code: this.data.code,
                  documentTypeCode: this.data.documentTypeCode,
                  documentTypeName: this.data.documentTypeName,
                  rif: this.data.rif,
                  name: this.data.name,
                  contactNumber: contactNumber,
                  email: this.data.email,
                },
              },
              {
                headers: {
                  "x-access-token": `${this.$cookies.get("x-access-token")}`,
                },
              }
            )
            .then((resp) => {
              (this.disabledButtom = false),
                this.$emit("close", { showForm: false, resp });
            })
            .catch((err) => {
              (this.disabledButtom = false), console.log(err);
            });
      }
    },
    cancel() {
      this.$emit("cancel", false);
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
