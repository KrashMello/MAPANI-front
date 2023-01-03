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
                showForm = true;
                formAdd = true;
              }
            "
          >
            Agregar proyecto
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
        <v-col :cols="tableCols">
          <v-card class="overflow-hidden" rounded="xl">
            <v-sheet class="overflow-y-auto" height="62vh" max-height="62vh">
              <v-card-text>
                <table-project @modify="modify" />
              </v-card-text>
            </v-sheet>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-expand-transition>
            <cards-forms
              v-show="showForm"
              :title="
                formAdd === true
                  ? `Agregar nuevo proyecto`
                  : `Modificar proyecto ${project.code}`
              "
              @close="closeForm"
            >
              <template #form>
                <forms-add-project
                  :enabled="showForm"
                  :is-aggregated="formAdd"
                  @search="changeSearchDialog"
                  @close="closeForm"
                />
              </template>
            </cards-forms>
          </v-expand-transition>
        </v-col>
      </v-row>
    </v-container>
    <!-- dialog form -->
    <Dialog-tables
      title="Buscar sponsor"
      :dialog="searchSponsorDialog"
      @close="changeSearchDialog"
    >
      <template #table>
        <table-search-sponsor-data @selected="changeSearchDialog" />
      </template>
    </Dialog-tables>

    <!-- drawer for search  -->
    <drawer-search
      :show-drawer="showDrawer"
      title="filtrar"
      @close="closeDrawerSearch"
    >
      <template #form>
        <forms-search-project @close="closeDrawerSearch" />
      </template>
    </drawer-search>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "ProyectosPanel",
  data: () => {
    return {
      dialog: {
        show: false,
        formAdd: true,
      },
      showForm: false,
      formAdd: true,
      tableCols: 12,
      showDrawer: false,
      searchSponsorDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      project: "getProject",
    }),
  },
  watch: {
    showForm(val) {
      if (!val)
        setTimeout(() => {
          this.tableCols = 12;
        }, 300);
      else this.tableCols = 7;
    },
  },
  methods: {
    ...mapMutations(["changePageTitle", "setProjects", "setProject"]),
    closeForm(data) {
      this.showForm = data.showForm;
      this.setProject({
        code: "",
        name: "",
        acronym: "",
        startDate: "",
        dueDate: "",
        minYearsOld: "",
        maxYearsOld: "",
        fromDay: "",
        toDay: "",
        isJustOneDay: null,
        sponsors: [],
      });
      if (data.resp)
        this.$axios
          .get("api/project", {
            headers: {
              "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
            },
            params: {
              code: "",
              name: "",
              acronym: "",
              startDate: "",
              dueDate: "",
              minYearsOld: "",
              maxYearsOld: "",
              fromDay: "",
              toDay: "",
              isJustOneDay: null,
              sponsors: [],
            },
          })
          .then(async (resp) => {
            this.setProjects(await resp.data);
          });
    },
    changeSearchDialog(data) {
      this.searchSponsorDialog = data;
    },
    closeDrawerSearch(data) {
      this.showDrawer = data;
    },
    modify(data) {
      if (!this.showForm) {
        this.showForm = data.showForm;
        this.formAdd = data.formAdd;
      }
    },
    selectItem(i) {
      this.selectedItemTable = i;
    },
    unSelectItem() {
      this.selectedItemTable = null;
    },
  },
  created() {
    this.changePageTitle("Proyectos");
  },
};
</script>
