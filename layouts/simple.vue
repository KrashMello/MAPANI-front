<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
import { mapMutations, mapActions } from "vuex"
export default {
  name: "SimpleLayouts",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setSocket"]),
    ...mapActions(["searchLocalStorageToken"])
  },
  computed: {
  },
  mounted() {
    this.setSocket(this.$nuxtSocket({name:'main'}))
    this.searchLocalStorageToken()
  },
};
</script>
