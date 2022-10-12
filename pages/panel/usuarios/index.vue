<template>
  <v-row>
    <v-col class="text-center">
      <img src="/logo-light.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;Usuarios</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "UsuariosPanel",
  methods: {
    ...mapMutations(["changePageTitle"]),
  },
  created() {
    this.changePageTitle("Usuarios");
  },
};
</script>
