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
              dialog.show = !dialog.show;
              dialog.formAdd = true;
            "
          >
            Agendar Cita
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
          <v-card rounded="xl">
            <v-card-text>
              <v-simple-table dense>
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-left">Codigo</th>
                      <th class="text-left">
                        Nombre y apellido del representante
                      </th>
                      <th class="text-left">Nombre y apellido del paciente</th>
                      <th class="text-left">Fecha pautada</th>
                      <th class="text-left">acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in appointments"
                      :key="item.code"
                      @mouseover="selectItem(item.code)"
                      @mouseleave="unSelectItem()"
                    >
                      <td>{{ item.code }}</td>
                      <td>
                        {{ item.representativeFirstName }}
                        {{ item.representativeLastName }}
                      </td>
                      <td>
                        {{ item.patientFirstName }} {{ item.patientLastName }}
                      </td>
                      <td>{{ item.appointmentDate }}</td>
                      <td>
                        <v-btn
                          v-if="selectedItemTable === item.code"
                          icon
                          small
                          color="warning"
                          @click="modifyAppointment(item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
      <!-- dialog form -->
    <DialogForm
      :title="
        dialog.formAdd === true
          ? `Agendar Nueva Cita`
          : `Modificar Cita ${appointment.code}`
      "
      :dialog="dialog.show"
      @close="closeDialog"
    >
      <template #form>
        <FormsAddMedicalAppoinment
          :dialog-is-enable="dialog.show"
          :is-aggregated="dialog.formAdd"
          @close="closeDialog"
        ></FormsAddMedicalAppoinment>
      </template>
    </DialogForm>
    <!-- drawer for search  -->
    <drawer-search
      :show-drawer="showDrawer"
      title="filtrar"
      @close="closeDrawerSearch"
    >
      <template #form>
        <forms-search-appointment></forms-search-appointment>
      </template>
    </drawer-search>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "citasPanel",
  data() {
    return {
      dialog: {
        show: false,
        formAdd: true,
      },
      selectedItemTable: null,
      showDrawer: false,
      activePicker: null,
      headers: [
        { text: "Nacionalidad", value: "documentType", sortable: false },
        { text: "Cedula", value: "DNI" },
        { text: "Nombres", value: "firstName", sortable: false },
        { text: "Apellidos", value: "lastName", sortable: false },
        { text: "Correo", value: "email", sortable: false },
        { text: "Opciones", value: "actions", sortable: false },
      ],
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    ...mapGetters({
      socket: "socket",
      appointments: "getAppointments",
      appointment: "getAppointment",
    }),
  },
  methods: {
    ...mapMutations([
      "changePageTitle",
      "setSocket",
      "setAppointments",
      "setAppointment",
    ]),
    closeDialog(data) {
      this.dialog.show = data;
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
    },
    closeDrawerSearch(data) {
      this.showDrawer = data;
    },
    modifyAppointment(appointment) {
      this.setAppointment(appointment);
      this.dialog.show = !this.dialog.show;
      this.dialog.formAdd = false;
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
  mounted() {
    this.socket.on("getAppointments", async (resp) => {
      this.setAppointments(await resp.rows);
    });
  },
};
</script>
<style lang="scss" scoped>
tr > .actionButtons {
  display: none;
}

tr:hover > .actionButtons {
  display: block;
}
</style>
