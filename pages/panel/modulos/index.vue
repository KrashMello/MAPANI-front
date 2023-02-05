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
                this.$router.push('/panel/modulos/agregar');
              }
            "
          >
            Agregar modulo
            <v-icon dark right>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            color="primary"
            rounded
            block
            dark
            @click="
              () => {
                showDrawer = !showDrawer;
              }
            "
          >
            Buscar
            <v-icon dark right>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="overflow-hidden" rounded="xl">
            <v-sheet class="overflow-y-auto" height="50vh" max-height="50vh">
              <v-card-text>
                <table-modules />
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
    <drawer-search
      :show-drawer="showDrawer"
      title="Filtrar"
      @close="closeDrawerSearch"
    >
      <template #form>
        <forms-search-modules @filter="filter" @close="closeDrawerSearch" />
      </template>
    </drawer-search>
    <snackbar />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "modulesPanel",
  data: () => {
    return {
      paginationCount: 0,
      showDrawer: false,
    };
  },
  computed: {
    ...mapGetters({ searchOptions: "getModuleSearchOptions" }),
    page() {
      return this.searchOptions.page;
    },
  },
  methods: {
    ...mapMutations([
      "changePageTitle",
      "setModules",
      "setPaginationModulePage",
      "setPaginationModuleLimit",
    ]),
    filter() {
      this.$axios
        .get("api/modules", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: this.searchOptions,
        })
        .then(async (resp) => {
          let result = await resp.data;
          this.paginationCount = result.pagination;
          this.setModules(await result.modules);
        });
    },
    updatePage(page) {
      this.setPaginationModulePage(page);
      this.$axios
        .get("api/modules", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: this.searchOptions,
        })
        .then(async (resp) => {
          let result = await resp.data;
          this.paginationCount = result.pagination;
          this.setModules(await result.modules);
        });
    },
    closeDrawerSearch(data) {
      this.showDrawer = data;
    },
    showSearchPersonDialog(data) {
      this.searchPersonDialog = data;
    },
  },
  created() {
    this.changePageTitle("Modulos");
    this.$axios
      .get("api/modules", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
        params: this.searchOptions,
      })
      .then(async (resp) => {
        let result = await resp.data;
        this.paginationCount = result.pagination;
        this.setModules(await result.modules);
      });
  },
};
</script>
