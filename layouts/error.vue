<template>
  <div class="page-title text-center pa-10">
    <h2
      class="text-2xl font-weight-semibold text--primary d-flex align-center justify-center"
    >
      <span class="me-2" v-if="error.statusCode === 404">{{
        pageNotFound
      }}</span>
      <span class="me-2" v-else>{{ otherError }}</span>
      <v-icon color="warning">mdi-alert</v-icon>
    </h2>
    <p class="text-sm">no pudimos encontrar la pagina que estas buscando</p>

    <v-btn rounded color="accent" to="/panel" class="mb-4"> Volver al inicio </v-btn>
  </div>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "Página no encontrada",
      otherError: "Ocurrió un error",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>
