<template>
  <div>
    <v-simple-table dense>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Nombre y apellido</th>
          <th class="text-left">Role</th>
          <th class="text-left">Status</th>
          <th class="text-left">acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in users"
          :key="item.code"
          @mouseover="selectItem(item.code)"
          @mouseleave="unSelectItem()"
        >
          <td>{{ item.code }}</td>
          <td>
            {{
              `${item.firstName.split(" ")[0]} ${item.lastName.split(" ")[0]}`
            }}
          </td>
          <td>
            {{ item.roleName }}
          </td>
          <td>{{ item.statusName }}</td>
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
  name: "usersTable",
  data() {
    return {
      selectedItemTable: null,
    };
  },
  computed: {
    ...mapGetters({
      socket: "socket",
      users: "getUsers",
    }),
  },
  methods: {
    ...mapMutations(["setUsers", "setUser", "setUserPersonalData"]),
    modify(user) {
      let userData = {
        code: user.code,
        username: user.username,
        password: user.password,
        securityCode: user.userSecurityCode,
        email: user.email,
        roleCode: user.roleCode,
        statusCode: user.statusCode,
      };
      let userPersonalData = {
        code: user.personalDataCode,
        firstName: user.firstName,
        lastName: user.lastName,
        genderCode: user.genderCode,
        documentTypeCode: user.documentTypeCode,
        dni: user.dni,
        bornDate: user.bornDate,
        martialStatusCode: user.martialStatusCode,
        disability: user.disability,
        disabilityTypeCode: user.disabilityTypeCode,
        ethnicGroup: user.ethnicGroup,
        ethnicDescription: user.ethnicDescription,
        regionCode: user.regionCode,
        stadeCode: user.stadeCode,
        municipalityCode: user.municipalityCode,
        parrishCode: user.parrishCode,
        direction: user.direction,
        phoneNumber: user.phoneNumber,
      };
      this.setUser(userData);
      this.setUserPersonalData(userPersonalData);
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
      .get("api/Users", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
        params: {
          userCode: "",
          roleCode: "",
          statusCode: "",
          username: "",
          email: "",
          parrishCode: "",
          dni: "",
          stadeCode: "",
          municipalityCode: "",
          regionCode: "",
        },
      })
      .then(async (resp) => {
        this.setUsers(await resp.data);
      });
  },
};
</script>
