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
          <v-btn color="primary" rounded block dark>
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
                      v-for="(item, i) in appointment"
                      :key="item.code"
                      @mouseover="selectItem(i)"
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
                      <td v-show="selectedItemTable === i">
                        <v-btn icon small color="warning">
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
      :title="dialog.formAdd === true ? 'Agendar Nueva Cita' : 'Modificar Cita'"
      :dialog="dialog.show"
      @close="closeDialog"
    >
      <template #form>
        <FormsAddMedicalAppoinment
          :dialogIsEnable="dialog.show"
        ></FormsAddMedicalAppoinment>
      </template>
    </DialogForm>
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
      selectedItemTable: -1,
      appointment: [],
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
  computed: {
    ...mapGetters({ Persons: "persons" }),
  },
  methods: {
    ...mapMutations(["changePageTitle"]),
    closeDialog(data) {
      this.dialog.show = data;
    },
    selectItem(i) {
      this.selectedItemTable = i;
    },
    unSelectItem() {
      this.selectedItemTable = -1;
    },
  },
  created() {
    this.changePageTitle("Citas");
    this.$axios
      .get("api/appointment")
      .then((response) => {
        this.appointment = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
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
