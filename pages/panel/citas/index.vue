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
          <v-btn color="primary" rounded block dark @click="searchDrawer = !searchDrawer">
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
                      v-for="item in appointment"
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
    <DialogForm
      :title="
        dialog.formAdd === true
          ? 'Agendar Nueva Cita'
          : 'Modificar Cita ' + formData.code
      "
      :dialog="dialog.show"
      @close="closeDialog"
    >
      <template #form>
        <FormsAddMedicalAppoinment
          :dialog-is-enable="dialog.show"
          :is-aggregated="dialog.formAdd"
          :form-data="formData"
          @close="closeDialog"
        ></FormsAddMedicalAppoinment>
      </template>
    </DialogForm>

    <v-navigation-drawer
      v-model="searchDrawer"
      right
      absolute
      width="50%"
      temporary
    >
      <template #prepend>
   <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Buscar
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="searchDrawer = !searchDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      </template>
         <v-container class="mt-3">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="searchOption.code" label="Codigo" dense outlined color="primary" placeholder="ingrezar el codigo MAPANI"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="searchOption.representativeFirstName" label="Nombre del representate" dense outlined color="primary" placeholder="ingrece el nombre del representante"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="searchOption.representativeLastName" label="Apellido del representante" dense outlined color="primary" placeholder="ingrece el apellido del representante"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="searchOption.patientFirstName" label="Nombre del paciente" dense outlined color="primary" placeholder="ingrece el Nombre del paciente"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="searchOption.patientLastName" label="Apellido del paciente" dense outlined color="primary" placeholder="ingrece el apellido del paciente"></v-text-field>
          </v-col>
          <v-col cols="12">
             <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="searchOption.appointmentDate"
                label="Fecha de cita"
                prepend-icon="mdi-calendar"
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="searchOption.appointmentDate"
                :active-picker="activePicker"
                :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
                "
                min="1950-01-01"
                @change="save"
            ></v-date-picker>
          </v-menu>
          </v-col>
        </v-row>
      </v-container>
      <template #append>
      <div class="pa-2">
        <v-btn class="pa-2" block color="primary" @click="search">Filtrar</v-btn>
      </div>
      </template>
    </v-navigation-drawer>
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
      searchDrawer: false,
      appointment: [],
      menu: false,
      searchOption: {
        code : '',
        representativeFirstName: '',
        representativeLastName: '',
        patientFirstName: '',
        patientLastName: '',
        appointmentDate: '',
      },
      activePicker: null,
      formData: {
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
        clinicalPsychology: false,
        breastfeedingAdvice: false,
        advocacy: false,
        
      },
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
    ...mapGetters({ Persons: "persons" }),
  },
  methods: {
    ...mapMutations(["changePageTitle"]),
    closeDialog(data) {
      this.dialog.show = data;
      this.formData = {
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
      };
    },
    modifyAppointment(appointment) {
      this.formData = appointment;
      this.dialog.show = !this.dialog.show;
      this.dialog.formAdd = false;
    },
    selectItem(i) {
      this.selectedItemTable = i;
    },
    unSelectItem() {
      this.selectedItemTable = null;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    search(){
      this.socket.emit('searchAppointment', this.searchOption)
    },
  },
  created() {
    this.changePageTitle("Citas");
      },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'main',
    })
    this.socket.on('getAppointment',async (resp) => {
       this.appointment = await resp.rows
    })
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
