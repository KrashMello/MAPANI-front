<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
import { mapMutations } from "vuex"
export default {
  name: "SimpleLayouts",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setSocket"])
  },
  computed: {
  },
  mounted() {
    this.setSocket(this.$nuxtSocket({name:'main'}))
  },
};
</script>
