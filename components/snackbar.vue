<template>
  <v-snackbar
    v-model="snackbar.model"
    :color="`${snackbar.status === 0 ? 'primary' : 'error'}`"
    outlined
    bottom
    right
    :timeout="timeout"
  >
    {{ snackbar.message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="red" icon v-bind="attrs" @click="close">
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "m-snackbar",
  props: {
    timeout: {
      type: Number,
      default: 5000,
    },
  },
  computed: {
    ...mapGetters({
      snackbar: "getSnackbar",
    }),
  },
  methods: {
    ...mapMutations(["setSnackbar"]),
    close() {
      this.setSnackbar({ model: false, code: 0, message: "" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
