<template>
  <div>
    <v-simple-table dense>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Codigo Padre</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Src</th>
          <th class="text-left">icon</th>
          <th class="text-left">Desabilitado</th>
          <th class="text-left">acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in modules"
          :key="item.code"
          @mouseover="selectItem(item.code)"
          @mouseleave="unSelectItem()"
        >
          <td>{{ item.code }}</td>
          <td>{{ item.fatherCode }}</td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.src }}
          </td>
          <td>
            <v-icon>{{ item.icon }}</v-icon>
          </td>
          <td>{{ item.unabled }}</td>
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "modulesTable",
  data() {
    return {
      selectedItemTable: null,
    };
  },
  computed: {
    ...mapGetters({
      modules: "getModules",
    }),
  },
  methods: {
    ...mapMutations(["setModules", "setModule"]),
    modify(data) {
      this.setModule({
        code: data.code,
        name: data.name,
        src: data.src,
        icon: data.icon,
        unabled: data.unabled,
        hasChildren: data.hasChildren,
        fatherCode: data.fatherCode,
        order: data.order,
      });
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
      .get("api/modules", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
        params: {
          code: "",
          name: "",
          unabled: false,
          fatherCode: "",
        },
      })
      .then(async (resp) => {
        this.setModules(await resp.data);
      });
  },
};
</script>
