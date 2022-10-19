<template>
  <v-dialog v-model="cDialog" persistent max-width="75%">
    <v-card class="overflow-hidden" rounded="xl">
      <v-app-bar
        absolute
        dark
        dense
        color="primary"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-1"
      >
        <v-toolbar-title> {{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon color="acent" @click="close">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-app-bar>

      <v-sheet
        id="scrolling-techniques-1"
        class="overflow-y-auto"
        max-height="75vh"
      >
        <v-card-text>
          <slot name="form"></slot>
        </v-card-text>
      </v-sheet>
    </v-card>
  </v-dialog>
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
      this.$emit("close", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
