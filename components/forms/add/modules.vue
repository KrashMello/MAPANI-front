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
                this.$router.push(`/panel/modulos`);
              }
            "
            ><v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-card-title>Datos del Modulo</v-card-title>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="data.name"
            label="Nombre de modulo"
            v-mask="upperCaseMask"
            outlined
            dense
            placeholder="Ingrese el nombre del modulo"
            :rules="rules.defaultText"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="data.src"
            label="Direccion"
            v-mask="srcMask"
            outlined
            dense
            placeholder="Ingrese la direccion de la pagina"
            :rules="[(v) => !!v || 'Este campo es obligatorio']"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="data.icon"
            label="Icono"
            v-mask="srcMask"
            outlined
            dense
            placeholder="Ingrese el codigo mdi del icono"
            :rules="[(v) => !!v || 'Este campo es obligatorio']"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="data.order"
            label="Numero de ordenamiento"
            v-mask="orderMask"
            outlined
            dense
            placeholder="Ingrese el numero del orden deseado para visualizar"
            :rules="[(v) => !!v || 'Este campo es obligatorio']"
          />
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

        <v-col cols="12" md="12">
          <v-checkbox
            v-model="data.hasChildren"
            label="Tienen hijos"
            color="primary"
            hide-details
            dense
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="data.fatherCode"
            label="Codigo Modulo Padre"
            v-mask="fatherCodeMask"
            outlined
            dense
            placeholder="Ingrese el codigo del modulo padre"
          ></v-text-field>
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
  name: "formModule",
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
    orderMask: {
      mask: "##",
      tokens: {
        "#": {
          pattern: /[0-9]/,
        },
      },
    },
    srcMask: {
      mask: "GGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
      tokens: {
        G: {
          pattern: /[a-zA-Z/\-_]/,
        },
      },
    },
    fatherCodeMask: {
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
      mod: "getModule",
    }),
    data() {
      return this.mod;
    },
  },
  watch: {
    menuBornDate(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    ...mapMutations(["setSnackbar"]),
    submit() {
      if (this.isAggregated) {
        this.$axios
          .post("api/modules", {
            params: {
              name: this.data.name,
              src: this.data.src,
              icon: this.data.icon,
              unabled: this.data.unabled,
              hasChildren: this.data.hasChildren,
              order: this.data.order,
              fatherCode: this.data.fatherCode,
            },
          })
          .then((resp) => {
            this.setSnackbar(resp.data);
            this.$router.push("/panel/modulos");
          })
          .catch((err) => {
            this.setSnackbar(err.data);
          });
      } else {
        this.$axios
          .put("api/modules", {
            params: {
              code: this.data.code,
              name: this.data.name,
              src: this.data.src,
              icon: this.data.icon,
              unabled: this.data.unabled,
              hasChildren: this.data.hasChildren,
              order: this.data.order,
              fatherCode: this.data.fatherCode,
            },
          })
          .then((resp) => {
            this.setSnackbar(resp.data);
            this.$router.push("/panel/modulos");
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
