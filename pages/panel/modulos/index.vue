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
        <v-col :cols="tableCols">
          <v-card class="overflow-hidden" rounded="xl">
            <v-sheet class="overflow-y-auto" height="62vh" max-height="62vh">
              <v-card-text>
                <table-modules @modify="modifyModule" />
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
                  ? `Agregar Nuevo Modulo`
                  : `Modificar Modulo ${mod.code}`
              "
              @close="closeForm"
            >
              <template #form>
                <forms-add-modules
                  :enabled="showForm"
                  :is-aggregated="formAdd"
                  @close="closeForm"
                />
              </template>
            </cards-forms>
          </v-expand-transition>
        </v-col>
      </v-row>
    </v-container>
    <!-- dialog form  -->
    <!-- <Dialog-tables -->
    <!--   title="Buscar Persona" -->
    <!--   :dialog="searchPersonDialog" -->
    <!--   @close="changeSearchDialog" -->
    <!-- > -->
    <!--   <template #table> -->
    <!--     <table-search-user-personal-data @selected="changeSearchDialog" /> -->
    <!--   </template> -->
    <!-- </Dialog-tables> -->
    <!-- drawer for search -->
    <drawer-search
      :show-drawer="showDrawer"
      title="filtrar"
      @close="closeDrawerSearch"
    >
      <template #form>
        <forms-search-modules @close="closeDrawerSearch" />
      </template>
    </drawer-search>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "modulesPanel",
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
      searchPersonDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      mod: "getModule",
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
    ...mapMutations(["changePageTitle", "setModule", "setModules"]),
    closeForm(data) {
      this.showForm = data.showForm;
      this.setModule({
        code: "",
        name: "",
        src: "",
        icon: "",
        unabled: false,
        hasChildren: false,
        order: 0,
        fatherCode: "",
      });
      if (data.resp)
        this.$axios
          .get("api/modules", {
            headers: {
              "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
            },
            params: {
              code: "",
              name: "",
              unabled: false,
              fatherCode: "",
            },
          })
          .then(async (resp) => {
            this.setModules(await resp.data);
          });
    },
    modifyModule(data) {
      if (!this.showForm) {
        this.showForm = data.showForm;
        this.formAdd = data.formAdd;
      }
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
  },
};
</script>
