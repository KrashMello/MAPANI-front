<template>
  <v-simple-table dense>
    <thead>
      <tr>
        <th class="text-left">Codigo</th>
        <th class="text-left">Nombre y apellido</th>
        <th class="text-left">Departamento</th>
        <th class="text-left">Cargo</th>
        <th class="text-left">Opciones</th>
      </tr>
    </thead>
    <tbody v-if="employeds.length > 0">
      <tr
        v-for="item in employeds"
        :key="item.code"
        @mouseover="selectItem(item.code)"
        @mouseleave="unSelectItem()"
      >
        <td>{{ item.code }}</td>
        <td>
          {{ `${item.firstName.split(" ")[0]} ${item.lastName.split(" ")[0]}` }}
        </td>
        <td>
          {{ item.departamentName }}
        </td>
        <td>{{ item.jobPositionName }}</td>
        <td>
          <v-btn
            v-if="selectedItemTable === item.code"
            icon
            small
            color="warning"
            @click="modifyEmployed(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "employedTable",
  data() {
    return {
      selectedItemTable: null,
    };
  },
  computed: {
    ...mapGetters({
      employeds: "getEmployeds",
    }),
  },
  methods: {
    ...mapMutations(["setEmployeds", "setEmployed", "setUserPersonalData"]),
    modifyEmployed(employed) {
      let employedData = {
        code: employed.code,
        jobPositionCode: employed.jobPositionCode,
        departamentCode: employed.departamentCode,
        dateOfEntry: employed.dateOfEntry,
        dateOfDiscarge: employed.dateOfDiscarge,
      };
      let userPersonalData = {
        code: employed.personalDataCode,
        firstName: employed.firstName,
        lastName: employed.lastName,
        genderCode: employed.genderCode,
        documentTypeCode: employed.documentTypeCode,
        dni: employed.dni,
        bornDate: employed.bornDate,
        martialStatusCode: employed.martialStatusCode,
        disability: employed.disability,
        disabilityTypeCode: employed.disabilityTypeCode,
        ethnicGroup: employed.ethnicGroup,
        ethnicDescription: employed.ethnicDescription,
        regionCode: employed.regionCode,
        stadeCode: employed.stadeCode,
        municipalityCode: employed.municipalityCode,
        parrishCode: employed.parrishCode,
        direction: employed.direction,
        phoneNumber: employed.phoneNumber,
      };
      this.setEmployed(employedData);
      this.setUserPersonalData(userPersonalData);
      this.$router.push("/panel/empleados/modificar");
    },
    selectItem(i) {
      this.selectedItemTable = i;
    },
    unSelectItem() {
      this.selectedItemTable = null;
    },
  },
};
</script>
