<template>
  <v-form
    :disabled="loading"
    @submit.prevent="checkForm"
    ref="form"
    lazy-validation
    class="pa-5"
  >
    <v-text-field
      v-model="data.username"
      color="primary"
      :rules="rules.username"
      label="Nombre de usuario"
      outlined
      placeholder="Ingrese el nombre de usuario"
      required
      @focus="resetValidation"
    ></v-text-field>

    <v-text-field
      v-model="data.password"
      color="primary"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="rules.password"
      required
      :type="showPassword ? 'text' : 'password'"
      label="Clave de acceso"
      outlined
      placeholder="Ingrese la clave de acceso"
      :counter="8"
      @click:append="showPassword = !showPassword"
      @focus="resetValidation"
    ></v-text-field>

    <v-expand-transition>
      <v-alert v-if="status.code !== 0" dense outlined type="error">
        {{ status.message }}
      </v-alert>
    </v-expand-transition>

    <v-btn
      :disabled="loading"
      block
      rounded
      depressed
      color="primary"
      type="submit"
    >
      Ingresar
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "loginForm",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showPassword: false,
    data: {
      username: null,
      password: null,
    },
    rules: {
      default: [(v) => !!v || "Este campo es obligatorio."],
      username: [
        (v) => !!v || "Este campo es obligatorio.",
        (v) =>
          (v && v.length > 2) ||
          "El nombre de usuario debe tener más de 2 caracteres",
      ],
      password: [
        (v) => !!v || "Este campo es obligatorio.",
        (v) =>
          (v && v.length == 8) || "La clave de acceso debe tener 8 caracteres",
      ],
    },
  }),

  computed: {
    ...mapGetters({
      loading: "getLoadingLogin",
      status: "getStatus",
    }),
  },

  methods: {
    ...mapActions({
      login: "login",
    }),

    resetValidation() {
      if (!this.$refs.form.validate()) this.$refs.form.resetValidation();
    },

    checkForm() {
      if (!this.data.username || !this.data.password) {
        this.$refs.form.validate();
        this.status.code = 1;
        this.status.message = "Los campos no pueden estar vacios";
      } else this.login([this.data.username, this.data.password]);
    },
  },
};
</script>
