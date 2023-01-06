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
            Agregar sponsor
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
                <table-sponsor @modify="modify" />
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
                  ? `Agregar nuevo sponsor`
                  : `Modificar sponsor ${sponsor.code}`
              "
              @close="closeForm"
            >
              <template #form>
                <forms-add-sponsor
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
    <drawer-search
      :show-drawer="showDrawer"
      title="Filtrar"
      @close="closeDrawerSearch"
    >
      <template #form>
        <forms-search-sponsor @close="closeDrawerSearch"></forms-search-sponsor>
      </template>
    </drawer-search>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "SponsorPanel",
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
    };
  },
  computed: {
    ...mapGetters({
      sponsor: "getSponsor",
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
    ...mapMutations(["changePageTitle", "setSponsors", "setSponsor"]),
    closeForm(data) {
      this.showForm = data.showForm;
      this.setSponsor({
        code: "",
        documentTypeCode: "",
        documentTypeName: "",
        acronym: "",
        rif: "",
        name: "",
        contactNumber: "",
        email: "",
      });
      if (data.resp)
        this.$axios
          .get("api/sponsor", {
            headers: {
              "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
            },
            params: {
              code: "",
              documentTypeCode: "",
              documentTypeName: "",
              acronym: "",
              rif: "",
              name: "",
              contactNumber: "",
              email: "",
            },
          })
          .then(async (resp) => {
            this.setSponsors(await resp.data);
          });
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
    this.changePageTitle("Sponsor");
  },
};
</script>
