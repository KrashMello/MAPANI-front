<template>
  <v-card dark :color="color">
    <v-list-item three-line>
      <v-list-item-avatar>
        <v-icon large>{{ icon }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ title }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ quantity }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "v-info-Box",
  props: {
    title: {
      type: String,
      default: "usuarios",
    },
    quantity: {
      type: Number,
      default: 10,
    },
    color: {
      type: String,
      default: "blue",
    },
    icon: {
      type: String,
      default: "mdi-account",
    },
  },
};
</script>
