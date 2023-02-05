<template>
  <div>
    <v-container class="fill-height">
      <v-row class="mb-2" justify="space-between">
        <v-col cols="12" md="2">
          <v-btn
            color="primary"
            dark
            block
            rounded
            @click="
              () => {
                this.$router.push(`/panel/empleados/agregar`);
              }
            "
          >
            Agregar empleado
            <v-icon dark right>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            color="primary"
            rounded
            block
            dark
            @click="showDrawer = !showDrawer"
          >
            Buscar
            <v-icon dark right>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="overflow-hidden" rounded="xl">
            <v-sheet class="overflow-y-auto" height="62vh" max-height="50vh">
              <v-card-text>
                <table-employed />
              </v-card-text>
            </v-sheet>
            <v-card-actions>
              <v-container v-if="paginationCount > 1">
                <v-row justify="center">
                  <v-col cols="8">
                    <v-container class="max-width">
                      <v-pagination
                        v-model="page"
                        class="my-4"
                        :length="paginationCount"
                        @input="updatePage"
                      ></v-pagination>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- drawer for search  -->
    <drawer-search
      :show-drawer="showDrawer"
      title="Filtrar"
      @close="closeDrawerSearch"
    >
      <template #form>
        <forms-search-employed
          @close="closeDrawerSearch"
        ></forms-search-employed>
      </template>
    </drawer-search>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "EmpleadosPanel",
  data: () => {
    return {
      paginationCount: 0,
      page: 1,
      limit: 10,
      offset: 0,
      showDrawer: false,
    };
  },
  methods: {
    ...mapMutations(["changePageTitle", "setEmployeds"]),
    updatePage(page) {
      console.log(page);
    },

    closeDrawerSearch(data) {
      this.showDrawer = data;
    },
    selectItem(i) {
      this.selectedItemTable = i;
    },
    unSelectItem() {
      this.selectedItemTable = null;
    },
  },
  mounted() {
    this.changePageTitle("Empleados");
    this.$axios
      .get("api/employed", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
        params: {
          jobPositionCode: "",
          regionCode: "",
          stadeCode: "",
          municipalityCode: "",
          parrishCode: "",
          dni: "",
          dateOfEntry: "",
          dateOfDiscarge: "",
          departamentCode: "",
          limit: this.limit,
        },
      })
      .then(async (resp) => {
        let result = await resp.data;
        this.paginationCount = result.pagination;
        this.setEmployeds(result.employed);
      });
  },
};
</script>
