<template>
  <v-simple-table dense>
    <thead>
      <tr>
        <th class="text-left">Codigo</th>
        <th class="text-left">Rif</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Email</th>
        <th class="text-left">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in sponsors"
        :key="item.code"
        @mouseover="selectItem(item.code)"
        @mouseleave="unSelectItem()"
      >
        <td>{{ item.code }}</td>
        <td>
          {{ `${item.acronym.split(" ")[0]} ${item.rif.split(" ")[0]}` }}
        </td>
        <td>{{ item.name }}</td>
        <td>
          {{ item.email }}
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
  name: "sponsorsTable",
  data() {
    return {
      selectedItemTable: null,
    };
  },
  computed: {
    ...mapGetters({
      sponsors: "getSponsors",
    }),
  },
  methods: {
    ...mapMutations(["setSponsors", "setSponsor"]),
    modify(data) {
      let sponsorData = {
        code: data.code,
        documentTypeCode: data.documentTypeCode,
        documentTypeName: data.documentTypeName,
        rif: data.rif,
        name: data.name,
        contactNumber: data.contactNumber,
        email: data.email,
      };
      this.setSponsor(sponsorData);
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
      .get("api/sponsor", {
        headers: {
          "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
        },
        params: {
          code: "",
          documentTypeCode: "",
          documentTypeName: "",
          acronym: "",
          rif: "",
          name: "",
          contactNumber: "",
          email: "",
        },
      })
      .then(async (resp) => {
        this.setSponsors(await resp.data);
      });
  },
};
</script>
