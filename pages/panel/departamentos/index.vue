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
                this.$router.push(`/panel/departamentos/agregar`);
              }
            "
          >
            Agregar departamento
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
                <table-departament />
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
        <forms-search-departament
          @filter="filter"
          @close="closeDrawerSearch"
        ></forms-search-departament>
      </template>
    </drawer-search>
    <snackbar />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "departamentosPanel",
  data: () => {
    return {
      paginationCount: 0,

      showDrawer: false,
    };
  },
  computed: {
    ...mapGetters({ searchOptions: "getDepartamentSearchOptions" }),
    page() {
      return this.searchOptions.page;
    },
  },

  methods: {
    ...mapMutations([
      "changePageTitle",
      "setDepartaments",
      "setPaginationModulePage",
      "setPaginationModuleLimit",
    ]),
    filter() {
      this.$axios
        .get("api/departament", {
          params: this.searchOptions,
        })
        .then(async (resp) => {
          let result = await resp.data;
          this.paginationCount = result.pagination;
          this.setDepartaments(result.departaments);
        });
    },
    updatePage(page) {
      this.setPaginationModulePage(page);
      this.$axios
        .get("api/departament", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: this.searchOptions,
        })
        .then(async (resp) => {
          let result = await resp.data;
          this.paginationCount = result.pagination;
          this.setDepartaments(result.departaments);
        });
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
    this.changePageTitle("Departamentos");
    this.$axios
      .get("api/departament", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
        params: this.searchOptions,
      })
      .then(async (resp) => {
        let result = await resp.data;
        this.paginationCount = result.pagination;
        this.setDepartaments(result.departaments);
      });
  },
};
</script>
