<template>
  <v-simple-table dense>
    <thead>
      <tr>
        <th class="text-left">Codigo</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Fecha inicio</th>
        <th class="text-left">Fecha cierre</th>
        <th class="text-left">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in projects"
        :key="item.code"
        @mouseover="selectItem(item.code)"
        @mouseleave="unSelectItem()"
      >
        <td>{{ item.code }}</td>
        <td>{{ item.name }}</td>
        <td>
          {{ item.startDate }}
        </td>
        <td>
          {{ item.dueDate }}
        </td>
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
  </v-simple-table>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "projectsTable",
  data() {
    return {
      selectedItemTable: null,
    };
  },
  computed: {
    ...mapGetters({
      projects: "getProjects",
    }),
  },
  methods: {
    ...mapMutations(["setProjects", "setProject"]),
    modify(data) {
      let projectData = {
        code: data.code,
        name: data.name,
        acronym: data.acronym,
        startDate: data.startDate,
        dueDate: data.dueDate,
        minYear: data.minYearsOld.slice(0, -20),
        minMons: data.minYearsOld.slice(8, -12),
        minDay: data.minYearsOld.slice(15, -5),
        maxYear: data.maxYearsOld.slice(0, -20),
        maxMons: data.maxYearsOld.slice(8, -12),
        maxDay: data.maxYearsOld.slice(15, -5),
        fromDay: data.fromDay,
        toDay: data.toDay,
        isJustOneDay: data.isJustOneDay,
        sponsors: data.sponsors,
      };
      this.setProject(projectData);
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
      .get("api/project", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
        params: {
          code: "",
          name: "",
          acronym: "",
          startDate: "",
          dueDate: "",
          minYearsOld: "",
          maxYearsOld: "",
          fromDay: "",
          toDay: "",
          isJustOneDay: null,
          sponsors: [],
        },
      })
      .then(async (resp) => {
        this.setProjects(await resp.data);
      });
  },
};
</script>
