<template>
  <v-container>
    <v-btn
      color="secondary"
      dark
      class="mb-2"
      @click.stop="rightDrawer = !rightDrawer"
    >
      Buscar
      <v-icon dark right>mdi-magnify</v-icon>
    </v-btn>

    <v-navigation-drawer
      width="500"
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-card outlined>
        <v-card-title>
          Buscar solicitud
          <v-spacer></v-spacer>
          <v-btn icon @click="close">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
      <v-card-subtitle>
        <v-icon> mdi-information </v-icon>
        Para buscar una solicitud, puede utilizar los siguentes filtros:
      </v-card-subtitle>
      <v-container>
        <v-row>
          <v-col cols="6" class="py-0">
            <v-text-field
              color="secondary"
              label="Codigo de solicitud"
              outlined
              placeholder="Ingrese el codigo de solicitud"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field
              color="secondary"
              label="Codigo de requerimiento"
              outlined
              placeholder="Ingrese el codigo de requerimiento"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="py-0">
            <v-menu
              ref="startMenu"
              :close-on-content-click="false"
              :return-value="trip.start"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="trip.start"
                  label="Fecha desde"
                  outlined
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                scrollable
                @change="savedatestart(date)"
              >
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6" class="py-0">
            <v-menu
              ref="endMenu"
              :close-on-content-click="false"
              :return-value="trip.end"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="trip.end"
                  label="Fecha hasta"
                  outlined
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                scrollable
                @change="savedateend(date)"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="py-0">
            <v-select color="secondary" label="Categorias" outlined></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select
              color="secondary"
              label="Dependencias"
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="py-0">
            <v-select
              color="secondary"
              label="Grado de Vulnerabilidad"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select color="secondary" label="Status" outlined></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="py-0">
            <v-select
              :items="[
                'Venezolano',
                'Extranjero',
                'Pasaporte',
                'Jurídico',
                'Gubernamental',
                'Comunal',
                'Firma Personal',
              ]"
              color="secondary"
              label="Tipo de documento"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field
              color="secondary"
              label="Nro. documento"
              outlined
              placeholder="Ingrese nro. documento"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <template #append>
        <div class="pa-2">
          <v-btn class="mr-1"> Limpiar </v-btn>
          <v-btn color="secondary" @click="alerta"> Buscar </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-snackbar v-model="snackbar" color="success">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "searchRequestForm",

  data() {
    return {
      right: true,
      rightDrawer: false,
      date: null,
      date2: null,
      trip: {
        name: "",
        location: null,
        start: null,
        end: null,
      },

      snackbar: false,
      text: `Hello, I'm a snackbar`,
    };
  },
  methods: {
    close() {
      this.rightDrawer = false;
    },
    savedatestart(date) {
      this.trip.start = date;
    },
    savedateend(date) {
      this.trip.end = date;
    },
    alerta() {
      this.rightDrawer = false;
      this.snackbar = true;
    },
  },
};
</script>
