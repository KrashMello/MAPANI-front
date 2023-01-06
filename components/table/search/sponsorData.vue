<template>
  <div>
    <v-card flat class="mt-6">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="data.documentTypeCode"
                label="Tipo de documento"
                :items="documentTypes"
                item-text="name"
                item-value="code"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="data.rif"
                label="Nro de documento"
                v-mask="rifMask"
                outlined
                dense
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="data.name"
                label="Nombre"
                v-mask="upperCaseMask"
                outlined
                dense
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="data.email"
                label="Correo electrónico"
                outlined
                dense
                :rules="rules.defaultEmail"
              />
            </v-col>
            <v-col cols="12">
              <v-btn md="5" color="primary" block @click="filter"
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
          <th class="text-left">Rif</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Correo</th>
          <th class="text-left">Elegir</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in sponsors"
          :key="item.code"
          @mouseover="selectItem(item.code)"
          @mouseleave="unSelectItem()"
        >
          <td>
            {{ `${item.acronym.split(" ")[0]} ${item.rif.split(" ")[0]}` }}
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
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
  name: "sponsorDataSearchTable",
  props: {
    isAggregated: { type: Boolean, default: false },
  },
  data() {
    return {
      selectedItemTable: null,
      documentTypes: [],
      upperCaseMask: {
        mask: "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
        tokens: {
          U: {
            pattern: /[a-zA-Z\s]/,
            transform: (v) => v.toLocaleUpperCase(),
          },
        },
      },
      rifMask: {
        mask: "########-#",
        tokens: {
          "#": { pattern: /\d/ },
        },
        masked: true,
      },
      rules: {
        defaultEmail: [
          (v) =>
            (v && v.length > 2) || "Este campo debe tener más de 2 caracteres",
          (v) => /.+@.+\..+/.test(v) || "El correo electronico debe ser válido",
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      sponsors: "getSponsors",
      searchOptions: "getSponsorSearchOptions",
    }),
    data() {
      return this.searchOptions;
    },
  },
  methods: {
    ...mapMutations(["setSponsors", "addSponsorsToProject", "changeDeleteSponsors"]),
    select(data) {
      if (this.isAggregated) 
        this.addSponsorsToProject(data);
      else 
        this.changeDeleteSponsors([data, false]);
      
      this.$emit("selected", false);
    },
    filter() {
      this.$axios
        .get("api/sponsor", {
          headers: {
            "x-access-token": ` ${this.$cookies.get("x-access-token")}`,
          },
          params: {
            documentTypeCode: this.data.documentTypeCode,
            rif: this.data.rif,
            name: this.data.name,
            email: this.data.email,
          },
        })
        .then(async (resp) => {
          this.setSponsors(await resp.data);
          this.$emit("close", false);
        });
    },
    selectItem(i) {
      this.selectedItemTable = i;
    },
    unSelectItem() {
      this.selectedItemTable = null;
    },
  },
  created() {
    this.$axios
      .get("api/documentType", {
        headers: {
          "x-access-token": `${this.$cookies.get("x-access-token")}`,
        },
      })
      .then((response) => {
        this.documentTypes = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
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
