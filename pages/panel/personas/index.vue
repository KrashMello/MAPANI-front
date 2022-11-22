<template>
  <v-card class="fill-height">
    <v-card-title> Tabla de personas </v-card-title>
    <v-divider></v-divider>
    <TablesPersonTable :Persons="Persons" @data-find="dataFind" />
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PersonasPanel",
  data() {
    return {
      findPerson: {
        documentType: null,
        DNI: null,
      },
    };
  },
  computed: {
    ...mapGetters(["findByDNI"]),

    Persons() {
      return this.findByDNI(this.findPerson.documentType, this.findPerson.DNI);
    },
  },
  methods: {
    ...mapMutations(["changePageTitle"]),
    dataFind(data) {
      this.findPerson = data;
    },
  },
  created() {
    this.changePageTitle("Personas");
  },
};
</script>
