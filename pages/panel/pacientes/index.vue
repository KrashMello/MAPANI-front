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
            Agregar Paciente
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
                      <th class="text-left">Nombre y apellido</th>
                      <th class="text-left">Fecha de nacimiento</th>
                      <th class="text-left">Genero</th>
                      <th class="text-left">acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in patients"
                      :key="item.code"
                      @mouseover="selectItem(item.code)"
                      @mouseleave="unSelectItem()"
                    >
                      <td>{{ item.code }}</td>
                      <td>
                        {{ item.firstName }}
                        {{ item.lastName }}
                      </td>
                      <td>
                        {{ item.bornDate }}
                      </td>
                      <td>{{ item.gender }}</td>
                      <td>
                        <v-btn
                          v-if="selectedItemTable === item.code"
                          icon
                          small
                          color="warning"
                          @click="modifyPatient(item)"
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
          ? 'Registrar Paciente'
          : 'Modificar Paciente ' + formData.code
      "
      :dialog="dialog.show"
      @close="closeDialog"
    >
      <template #form>
        <FormsAddPatient
          :dialog-is-enable="dialog.show"
          :is-aggregated="dialog.formAdd"
          :form-data="formData"
          @close="closeDialog"
        ></FormsAddPatient>
      </template>
    </DialogForm>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "pacientePanel",
  data() {
    return {
      dialog: {
        show: false,
        formAdd: true,
      },
      selectedItemTable: null,
      patients: [],
      formData: {
        code: null,
        firstName: "",
        lastName: "",
        bornDate: "",
        genderCode: "",
        birthCertificate: false,
        disability: false,
        disabilityTypes: {
          motor: false,
          visual: false,
          cognitive: false,
          auditive: false,
        },
      },
    };
  },
  computed: {
    // ...mapGetters({ Persons: "persons" }),
  },
  methods: {
    ...mapMutations(["changePageTitle"]),
    closeDialog(data) {
      this.dialog.show = data;
      this.formData = {
        code: null,
        firstName: "",
        lastName: "",
        bornDate: "",
        genderCode: "",
        birthCertificate: false,
        disability: false,
        disabilityTypes: {
          motor: false,
          visual: false,
          cognitive: false,
          auditive: false,
        },
      };
    },
    modifyPatient(patient) {
      this.formData = patient;
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
    this.changePageTitle("Pacientes");
    this.$axios
      .get("api/patient")
      .then((response) => {
        this.patients = response.data;

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
