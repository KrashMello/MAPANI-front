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
        <v-col :cols="tableCols">
          <v-card class="overflow-hidden" rounded="xl">
            <v-sheet class="overflow-y-auto" height="62vh" max-height="62vh">
              <v-card-text>
                <table-employed @modify="modifyEmployed" />
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
                  ? `Agregar Nuevo Empleado`
                  : `Modificar Empleado ${employed.code}`
              "
              @close="closeForm"
            >
              <template #form>
                <forms-add-employed
                  :enabled="showForm"
                  :is-aggregated="formAdd"
                  @search-person="changeSearchDialog"
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
      title="Buscar Persona"
      :dialog="searchPersonDialog"
      @close="changeSearchDialog"
    >
      <template #table>
        <table-search-user-personal-data @selected="changeSearchDialog" />
      </template>
    </Dialog-tables>

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
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "EmpleadosPanel",
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
      employed: "getEmployed",
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
    ...mapMutations([
      "changePageTitle",
      "setEmployeds",
      "setEmployed",
      "setUserPersonalData",
    ]),
    closeForm(data) {
      this.showForm = data.showForm;
      this.setEmployed({
        code: "",
        personalDataCode: "",
        jobPositionCode: "",
        jobPositionName: "",
        departamentCode: "",
        departamentName: "",
        dateOfEntry: "",
        dateOfDischarge: "",
      });
      this.setUserPersonalData({
        code: "",
        firstName: "",
        lastName: "",
        genderCode: "",
        documentTypeCode: "",
        dni: "",
        bornDate: "",
        martialStatusCode: "",
        disability: false,
        disabilityTypeCode: "",
        ethnicGroup: false,
        ethnicDescription: "",
        parrishCode: "",
        direction: "",
        phoneNumber: "",
      });
      if (data.resp)
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
            },
          })
          .then(async (resp) => {
            this.setEmployeds(await resp.data);
          });
    },

    changeSearchDialog(data) {
      this.searchPersonDialog = data;
    },
    closeDrawerSearch(data) {
      this.showDrawer = data;
    },
    modifyEmployed(data) {
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
    this.changePageTitle("Empleados");
  },
};
</script>
