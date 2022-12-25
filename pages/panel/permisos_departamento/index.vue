<template>
  <div>
    <v-form v-model="disabledSearch">
      <v-container class="fill-height">
        <v-row class="mb-2" justify="space-between">
          <v-col cols="4">
            <v-select
              v-model="data.departamentCode"
              :rules="[(v) => !!v || 'Este campo es obligatorio.']"
              label="Departamento"
              :items="departaments"
              item-text="name"
              item-value="code"
              color="primary"
              dense
              outlined
              required
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="data.jobPositionCode"
              :rules="[(v) => !!v || 'Este campo es obligatorio.']"
              label="Cargo"
              :items="jobPositions"
              item-text="name"
              item-value="code"
              color="primary"
              dense
              outlined
              required
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!disabledSearch"
              color="primary"
              rounded
              block
              @click="search"
            >
              Buscar
              <v-icon dark right>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="disabledTable">
          <v-col :cols="tableCols">
            <v-card class="overflow-hidden" rounded="xl">
              <v-sheet class="overflow-y-auto" height="62vh" max-height="62vh">
                <v-card-text>
                  <table-permissions />
                </v-card-text>
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "permisosPanel",
  data() {
    return {
      tableCols: 12,
      jobPositions: [],
      departaments: [],
      disabledSearch: true,
      disabledTable: false,
    };
  },
  computed: {
    ...mapGetters({ searchOptions: "getPermissionsSearchOptions" }),
    data() {
      return this.searchOptions;
    },
  },
  methods: {
    ...mapMutations(["changePageTitle", "setPermission", "setPermissions"]),
    search() {
      this.$axios
        .get("api/user_departament_permissions", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: {
            jobPositionCode: this.data.jobPositionCode,
            departamentCode: this.data.departamentCode,
          },
        })
        .then(async (resp) => {
          this.disabledTable = true,
          this.setPermission(await resp.data);
        });
    },
  },
  mounted() {
    this.$axios
      .get("api/jobPosition", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.jobPositions = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/departament", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.departaments = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {
    this.changePageTitle("Permisos de usuarios");
  },
};
</script>
