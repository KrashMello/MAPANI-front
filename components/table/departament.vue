<template>
  <div>
    <v-simple-table dense>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in departaments"
          :key="item.code"
          @mouseover="selectItem(item.code)"
          @mouseleave="unSelectItem()"
        >
          <td>{{ item.code }}</td>
          <td>
            {{ item.name }}
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "departamentTable",
  data() {
    return {
      selectedItemTable: null,
    };
  },
  computed: {
    ...mapGetters({
      departaments: "getDepartaments",
    }),
  },
  methods: {
    ...mapMutations(["setDepartaments", "setDepartament"]),
    modify(data) {
      this.setDepartament(data);
      this.$router.push("/panel/departamentos/modificar");
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
