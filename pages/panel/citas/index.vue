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
            Agregar cita
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
                <table-appointment @modify="modify" />
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
                  ? `Agregar nueva cita`
                  : `Modificar cita ${appointment.code}`
              "
              @close="closeForm"
            >
              <template #form>
                <forms-add-appointment
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
        <forms-search-appointment
          @close="closeDrawerSearch"
        ></forms-search-appointment>
      </template>
    </drawer-search>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "citasPanel",
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
      appointment: "getAppointment",
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
    ...mapMutations(["changePageTitle", "setAppointments", "setAppointment"]),
    closeForm(data) {
      this.showForm = data.showForm;
      this.setAppointment({
        clinicHistoryCode: null,
        representativeFirstName: "",
        representativeLastName: "",
        representativeNumberPhone: "",
        representativeDirection: "",
        patientFirstName: "",
        patientLastName: "",
        patientBornDate: "",
        pediatrics: false,
        nitritionist: false,
        psychiatry: false,
        socialPsychology: false,
        breastfeedingAdvice: false,
        advocacy: false,
        clinicalPsychology: false,
      });
      if (data.resp)
        this.$axios
          .get("api/appointment", {
            headers: {
              "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
            },
            params: {
              clinicHistoryCode: null,
              representativeFirstName: "",
              representativeLastName: "",
              representativeNumberPhone: "",
              representativeDirection: "",
              patientFirstName: "",
              patientLastName: "",
              patientBornDate: "",
              pediatrics: false,
              nitritionist: false,
              psychiatry: false,
              socialPsychology: false,
              breastfeedingAdvice: false,
              advocacy: false,
              clinicalPsychology: false,
            },
          })
          .then(async (resp) => {
            this.setAppointments(await resp.data);
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
    this.changePageTitle("Citas");
  },
};
</script>
