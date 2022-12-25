<template>
  <div>
    <v-simple-table dense>
      <thead>
        <tr>
          <th class="text-left">Código modulo</th>
          <th class="text-left">Nombre modulo</th>
          <th class="text-left">Ver</th>
          <th class="text-left">Agregar</th>
          <th class="text-left">Editar</th>
          <th class="text-left">Imprimir</th>
          <th class="text-left">Reportar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data.modules" :key="item.code">
          <td>{{ item.code }}</td>
          <td>{{ item.name }}</td>
          <td>
            <v-checkbox v-model="data.show[i]" color="primary"></v-checkbox>
          </td>
          <td>
            <v-checkbox v-model="data.create[i]" color="primary"></v-checkbox>
          </td>
          <td>
            <v-checkbox v-model="data.update[i]" color="primary"></v-checkbox>
          </td>
          <td>
            <v-checkbox v-model="data.print[i]" color="primary"></v-checkbox>
          </td>
          <td>
            <v-checkbox v-model="data.report[i]" color="primary"></v-checkbox>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-container>
      <v-row>
        <v-col cols="4" offset="8">
          <v-btn
            :disabled="disabledModify"
            color="primary"
            rounded
            block
            @click="modify"
          >
            Modificar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "permissionsTable",
  data() {
    return {
      disabledModify: false,
      selectedItemTable: null,
    };
  },
  computed: {
    ...mapGetters({
      permission: "getPermission",
    }),
    data() {
      return this.permission;
    },
  },
  methods: {
    modify() {
      (this.disabledModify = true),
        this.$axios
          .post(
            "api/user_departament_permissions",
            {
              params: this.data,
            },
            {
              headers: {
                "x-access-token": `${this.$cookies.get("x-access-token")}`,
              },
            }
          )
          .then((resp) => {
            (this.disabledModify = false),
              this.$emit("close", { showForm: false, resp });
          })
          .catch((err) => {
            (this.disabledModify = false), console.log(err);
          });
    },
  },
};
</script>
