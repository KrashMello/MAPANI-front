<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="data.username"
          label="Nombre de usuario"
          v-mask="upperCaseMask"
          dense
          outlined
          color="primary"
          placeholder="Ingrese el nombre de usuario"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="data.email"
          label="Correo Electronico"
          v-mask="upperCaseMask"
          dense
          outlined
          color="primary"
          placeholder="Ingrese el correo electronico"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="data.statusCode"
          label="Estatus"
          :items="status"
          item-text="name"
          item-value="code"
          dense
          outlined
        />
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="data.roleCode"
          label="Rol del usuario"
          :items="roles"
          item-text="name"
          item-value="code"
          dense
          outlined
        />
      </v-col>
    </v-row>
    <div class="pa-2">
      <v-btn class="pa-2" block rounded color="primary" @click="search">Filtrar</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "searchUsers",
  data() {
    return {
      upperCaseMask: {
        mask: "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
        tokens: {
          U: {
            pattern: /[a-zA-Z\s]/,
            transform: (v) => v.toLocaleUpperCase(),
          },
        },
      },
      status: [],
      roles: [],
    };
  },
  computed: {
    ...mapGetters({
      searchOptions: "getUserSearchOptions",
    }),
    data() {
      return this.searchOptions;
    },
  },
  methods: {
    ...mapMutations(["setUsers"]),
    search() {
      this.$axios
        .get("api/Users", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: {
            userCode: "",
            roleCode: this.data.roleCode,
            statusCode: this.data.statusCode,
            username: this.data.username,
            email: this.data.email,
            parrishCode: "",
            dni: "",
            stadeCode: "",
            municipalityCode: "",
            regionCode: "",
          },
        })
        .then(async (resp) => {
          this.setUsers(await resp.data);
          this.$emit("close", false);
        });
    },
  },
  mounted() {
    this.$axios
      .get("api/userStatus", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.status = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/userRoles", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.roles = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped></style>
