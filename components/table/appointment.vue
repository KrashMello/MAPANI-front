<template>
  <v-simple-table dense>
    <template #default>
      <thead>
        <tr>
          <th class="text-left">Código</th>
          <th class="text-left">Nombre y apellido del representante</th>
          <th class="text-left">Nombre y apellido del paciente</th>
          <th class="text-left">Fecha pautada</th>
          <th class="text-left">Acciones</th>
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
          <td>{{ item.patientFirstName }} {{ item.patientLastName }}</td>
          <td>{{ item.appointmentDate }}</td>
          <td>
            <v-btn
              v-if="selectedItemTable === item.code"
              icon
              small
              color="warning"
              @click="modify(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "appointmentsTable",
  data() {
    return {
      selectedItemTable: null,
    };
  },
  computed: {
    ...mapGetters({
      appointments: "getAppointments",
    }),
  },
  methods: {
    ...mapMutations(["setAppointments", "setAppointment"]),
    modify(data) {
      let appointmentData = {
        code: data.code,
        projectCode: data.projectCode,
        appointmentDate: data.appointmentDate,
        clinicHistoryCode: data.clinicHistoryCode,
        representativeFirstName: data.representativeFirstName,
        representativeLastName: data.representativeLastName,
        representativeNumberPhone: data.representativeNumberPhone,
        representativeDirection: data.representativeDirection,
        patientFirstName: data.patientFirstName,
        patientLastName: data.patientLastName,
        patientBornDate: data.patientBornDate,
        pediatrics: data.pediatrics,
        nutritionist: data.nutritionist,
        psychiatry: data.psychiatry,
        socialPsychology: data.socialPsychology,
        breastfeedingAdvice: data.breastfeedingAdvice,
        advocacy: data.advocacy,
        clinicalPsychology: data.clinicalPsychology,
      };
      this.setAppointment(appointmentData);
      this.$emit("modify", { showForm: true, formAdd: false });
    },
    selectItem(i) {
      this.selectedItemTable = i;
    },
    unSelectItem() {
      this.selectedItemTable = null;
    },
  },
  mounted() {
    this.$axios
      .get("api/appointment", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
        params: {
          code: "",
          representativeFirstName: "",
          representativeLastName: "",
          patientFirstName: "",
          patientLastName: "",
          appointmentDate: "",
        },
      })
      .then(async (resp) => {
        this.setAppointments(await resp.data);
      });
  },
};
</script>
