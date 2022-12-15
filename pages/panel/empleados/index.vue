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
        <v-col cols="12">
          <v-card rounded="xl">
            <v-card-text>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th class="text-left">Codigo</th>
                    <th class="text-left">Nombre y apellido</th>
                    <th class="text-left">Departamento</th>
                    <th class="text-left">Cargo</th>
                    <th class="text-left">acciones</th>
                  </tr>
                </thead>
                <tbody v-if="employeds.length > 0">
                  <tr
                    v-for="item in employeds"
                    :key="item.employedCode"
                    @mouseover="selectItem(item.employedCode)"
                    @mouseleave="unSelectItem()"
                  >
                    <td>{{ item.employedCode }}</td>
                    <td>
                      {{
                        `${item.firstName.split(" ")[0]} ${
                          item.lastName.split(" ")[0]
                        }`
                      }}
                    </td>
                    <td>
                      {{ item.departamentName }}
                    </td>
                    <td>{{ item.jobPositionName }}</td>
                    <td>
                      <v-btn
                        v-if="selectedItemTable === item.employedCode"
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
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- dialog form -->
    <DialogForm
      :title="
        dialog.formAdd === true
          ? `Agregar Nuevo Empleado`
          : `Modificar Empleado ${employed.employedCode}`
      "
      :dialog="dialog.show"
      @close="closeDialog"
    >
      <template #form>
        <FormsAddEmployed
          :dialog-is-enable="dialog.show"
          :is-aggregated="dialog.formAdd"
          @close="closeDialog"
        ></FormsAddEmployed>
      </template>
    </DialogForm>
    <!-- drawer for search  -->
    <drawer-search
      :show-drawer="showDrawer"
      title="filtrar"
      @close="closeDrawerSearch"
    >
      <template #form>
        <!-- <forms-search-appointment></forms-search-appointment> -->
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
      selectedItemTable: null,
      showDrawer: false,
      activePicker: null,
    };
  },
  computed: {
    ...mapGetters({
      employeds: "getEmployeds",
      employed: "getEmployed",
    }),
  },

  methods: {
    ...mapMutations(["changePageTitle", "setEmployeds", "setEmployed"]),
    closeDialog(data) {
      this.dialog.show = data;
    },
    closeDrawerSearch(data) {
      this.showDrawer = data;
    },
    modifyEmployed(employed) {
      this.setEmployed(employed);
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
    this.changePageTitle("Empleados");
  },
  async mounted() {
    await this.$axios
      .get(
        "api/employed",
        {
          params: {
            employedCode: "",
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
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .then((resp) => {
        this.setEmployeds(resp.data);
      });
  },
};
</script>
