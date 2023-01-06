<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="searchOption.firstName"
                label="Nombre"
                placeholder="Ingrese el Nombre"
                color="primary"
                outlined
                dense
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="searchOption.lastName"
                label="Apellido"
                placeholder="Ingrese el Apellido"
                color="primary"
                outlined
                dense
              />
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="searchOption.documentTypeCode"
                label="Tipo de documento"
                :items="documentTypes"
                item-text="acronym"
                item-value="code"
                dense
                outlined
              />
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="searchOption.dni"
                label="Numero de cedula"
                placeholder="Ingrese el numero de cedula"
                color="primary"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" block @click="filter"
                >Filtrar <v-icon>mdi-filter</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-simple-table dense>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">cedula</th>
          <th class="text-left">Nombre y apellido</th>
          <th class="text-left">-</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in usersPersonalData"
          :key="item.code"
          @mouseover="selectItem(item.code)"
          @mouseleave="unSelectItem()"
        >
          <td>{{ item.code }}</td>
          <td>{{ `${item.documentTypeAcronym}-${item.dni}` }}</td>
          <td>
            {{
              `${item.firstName.split(" ")[0]} ${item.lastName.split(" ")[0]}`
            }}
          </td>
          <td>
            <v-btn
              v-if="selectedItemTable === item.code"
              icon
              small
              color="success"
              @click="select(item)"
            >
              <v-icon>mdi-check</v-icon>
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
  name: "userPersonalDataSearchTable",
  data() {
    return {
      selectedItemTable: null,
      searchOption: {
        firstName: "",
        lastName: "",
        documentTypeCode: "",
        dni: "",
      },
      documentTypes: [],
    };
  },
  computed: {
    ...mapGetters({
      usersPersonalData: "getUsersPersonalData",
    }),
  },
  methods: {
    ...mapMutations(["setUsersPersonalData", "setUserPersonalData"]),
    select(user) {
      this.setUserPersonalData(user);
      this.$emit("selected", false);
    },
    filter() {
      this.$axios
        .get("api/Users/searchPersonalData", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: this.searchOption,
        })
        .then((response) => {
          this.setUsersPersonalData(response.data);
          // console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
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
      .get("api/Users/searchPersonalData", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
        params: this.searchOption,
      })
      .then((response) => {
        this.setUsersPersonalData(response.data);
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("api/documentType", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.documentTypes = response.data;
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
