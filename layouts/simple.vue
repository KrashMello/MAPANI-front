<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
import { mapMutations, mapGetters } from "vuex"
export default {
  name: "SimpleLayouts",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setSocket"]),
  },
  computed: {
    ...mapGetters(["socket"])
  },
  mounted() {
    if(!this.socket)
      this.setSocket(this.$nuxtSocket({name:'main'}))
  },
};
</script>
