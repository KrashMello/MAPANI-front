<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container class="mt-3">
      <v-row>
        <v-col cols="1">
          <v-btn
            color="primary"
            block
            rounded
            @click="
              () => {
                this.$router.push(`/panel/departamentos`);
              }
            "
            ><v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-card-title>Datos del departamento</v-card-title>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="data.name"
            label="Nombre de departamento"
            v-mask="upperCaseMask"
            outlined
            dense
            placeholder="Ingrese el nombre del departamento"
            :rules="rules.defaultText"
          />
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
    <snackbar />
  </v-form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "form-departamento",
  props: {
    enabled: {
      type: Boolean,
      default: false,
    },
    isAggregated: { type: Boolean, default: true },
    title: { type: String, default: "" },
  },
  data: () => ({
    valid: true,
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
      departament: "getDepartament",
    }),
    data() {
      return this.departament;
    },
  },
  methods: {
    ...mapMutations(["setSnackbar"]),
    submit() {
      if (this.isAggregated) {
        this.$axios
          .post("api/departament", {
            params: {
              name: this.data.name,
            },
          })
          .then((resp) => {
            this.setSnackbar(resp.data);
            this.$router.push("/panel/departamentos");
          })
          .catch((err) => {
            this.setSnackbar(err.data);
          });
      } else {
        this.$axios
          .put("api/departament", {
            params: this.data,
          })
          .then((resp) => {
            this.setSnackbar(resp.data);
            this.$router.push("/panel/departamentos");
          })
          .catch((err) => {
            this.setSnackbar(err.data);
          });
      }
    },
    close() {
      this.$emit("close", false);
    },
  },
  mounted() {
    if (this.isAggregated) {
      this.$refs.form.reset();
    }
  },
};
</script>
