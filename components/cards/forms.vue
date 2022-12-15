<template>
  <v-card class="overflow-hidden" rounded="xl">
    <v-app-bar
      absolute
      dark
      dense
      color="primary"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-1"
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn color="error" v-bind="attrs" v-on="on" icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <span>cerrar formulario</span>
      </v-tooltip>
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques-1"
      class="overflow-y-auto"
      max-height="62vh"
    >
      <v-card-text>
        <slot name="form"></slot>
      </v-card-text>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: "formDialogTemplate",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "dialog title",
    },
  },
  data() {
    return {};
  },
  computed: {
    cDialog() {
      return this.dialog;
    },
  },
  methods: {
    close() {
      this.$emit("close", { showForm: false });
    },
  },
};
</script>

<style lang="scss" scoped></style>
