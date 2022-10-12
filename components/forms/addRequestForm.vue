<template>
  <v-container>
    <v-btn color="secondary" dark class="mb-2" @click="dialog = true">
      <!-- <v-btn to="/panel/solicitudes/agregar" color="secondary" dark class="mb-2">-->
      Agregar
      <v-icon dark right>mdi-plus</v-icon>
    </v-btn>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card class="fill-height">
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Agregar solicitud</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn :disabled="step !== 3" dark text @click="dialog = false">
                Guardar
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-list shaped disabled>
                  <v-list-item-group v-model="step">
                    <v-list-item v-for="(item, i) in menu" :key="i">
                      <v-list-item-icon>
                        <v-icon color="secondary">{{ item.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          style="font-weight: 500; text-transform: uppercase"
                        >
                          {{ item.title }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-col>
                  <v-window v-model="step" vertical>
                    <v-window-item>
                      <v-card-text>
                        <v-row class="mb-4 justify-center">
                          <strong class="text-h6">Buscar solicitante</strong>
                        </v-row>
                        <v-form v-model="valid">
                          <v-select
                            v-model="formFind.documentType"
                            :items="[
                              'Venezolano',
                              'Extranjero',
                              'Pasaporte',
                              'Jurídico',
                              'Gubernamental',
                              'Comunal',
                              'Firma Personal',
                            ]"
                            :rules="[
                              (v) => !!v || 'Este campo es obligatorio.',
                            ]"
                            label="Tipo de documento"
                            outlined
                            required
                          ></v-select>

                          <v-text-field
                            v-model="formFind.documentNumber"
                            :rules="[
                              (v) => !!v || 'Este campo es obligatorio.',
                            ]"
                            label="Nro. de documento"
                            outlined
                            required
                          ></v-text-field>

                          <v-expand-transition>
                            <v-alert
                              v-if="responseSnackbar.code !== 0"
                              dense
                              outlined
                              :type="responseSnackbar.type"
                            >
                              {{ responseSnackbar.message }}
                            </v-alert>
                          </v-expand-transition>

                          <v-container>
                            <v-row class="justify-center">
                              <v-btn
                                :disabled="!valid"
                                color="secondary"
                                @click="
                                  findApplicant([
                                    formFind.documentType,
                                    formFind.documentNumber,
                                  ])
                                "
                              >
                                Buscar
                              </v-btn>
                            </v-row>
                          </v-container>
                        </v-form>
                      </v-card-text>
                    </v-window-item>
                    <v-window-item>
                      <v-card-text>
                        <v-row class="mb-4 justify-center">
                          <strong class="text-h6">Datos de la solicitud</strong>
                        </v-row>
                        <v-form v-model="valid" class="mb-5">
                          <v-container>
                            <v-row>
                              <v-col cols="12" md="4">
                                <v-select
                                  v-model="formFind.typeOfAid"
                                  :items="[
                                    'Ayuda 1',
                                    'Ayuda 2',
                                    'Ayuda 3',
                                    'Ayuda 4',
                                    'Ayuda 5',
                                  ]"
                                  label="Tipo de ayuda"
                                  outlined
                                ></v-select>
                              </v-col>

                              <v-col cols="12" md="4">
                                <v-select
                                  v-model="formFind.dependencies"
                                  :items="[
                                    'Dependencia 1',
                                    'Dependencia 2',
                                    'Dependencia 3',
                                    'Dependencia 4',
                                    'Dependencia 5',
                                  ]"
                                  label="Dependencias"
                                  multiple
                                  outlined
                                >
                                  <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                      <span>{{ item }}</span>
                                    </v-chip>
                                    <span
                                      v-if="index === 1"
                                      class="grey--text text-caption"
                                    >
                                      (+{{ formFind.dependencies.length - 1 }}
                                      otras)
                                    </span>
                                  </template>
                                </v-select>
                              </v-col>

                              <v-col cols="12" md="4">
                                <v-select
                                  v-model="formFind.requirement"
                                  :items="[
                                    'Requerimiento 1',
                                    'Requerimiento 2',
                                    'Requerimiento 3',
                                    'Requerimiento 4',
                                    'Requerimiento 5',
                                  ]"
                                  label="Requerimiento"
                                  multiple
                                  outlined
                                >
                                  <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                      <span>{{ item }}</span>
                                    </v-chip>
                                    <span
                                      v-if="index === 1"
                                      class="grey--text text-caption"
                                    >
                                      (+{{ formFind.requirement.length - 1 }}
                                      otros)
                                    </span>
                                  </template>
                                </v-select>
                              </v-col>
                            </v-row>
                          </v-container>
                          <v-container>
                            <v-row class="justify-center">
                              <v-btn color="secondary"> Agregar </v-btn>
                            </v-row>
                          </v-container>
                        </v-form>
                        <v-divider></v-divider>
                        <v-container>
                          <v-simple-table>
                            <template>
                              <thead>
                                <tr>
                                  <th class="text-left">Codigo</th>
                                  <th class="text-left">Tipo de ayuda</th>
                                  <th class="text-left">Dependencias</th>
                                  <th class="text-left">Requerimientos</th>
                                  <th class="text-left">
                                    Grado de vulnerabilidad
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>6655656</td>
                                  <td>Médica</td>
                                  <td>000102 - IMMI</td>
                                  <td>Citología</td>
                                  <td>
                                    <v-select
                                      v-model="formFind.degreeOfVulnerability"
                                      :items="['Alto', 'Medio', 'Bajo']"
                                      dense
                                      solo
                                      dark
                                      class="mt-2"
                                      style="font-size: small"
                                      label="Seleccionar"
                                      background-color="secondary"
                                    ></v-select>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-container>
                      </v-card-text>
                    </v-window-item>
                    <v-window-item>
                      <v-card-text>
                        <v-row class="mb-4 justify-center">
                          <strong class="text-h6">Asignar beneficiario</strong>
                        </v-row>
                      </v-card-text>
                    </v-window-item>
                    <v-window-item>
                      <v-card-text>
                        <v-row class="mb-4 justify-center">
                          <strong class="text-h6">Finalizar solicitud</strong>
                        </v-row>
                        <v-container>
                          <v-simple-table dense>
                            <template>
                              <tbody>
                                <tr>
                                  <td>
                                    Nacionalidad:
                                    {{ dataApplicant.documentType }}
                                  </td>
                                  <td>Cédula: {{ dataApplicant.DNI }}</td>
                                </tr>
                                <tr>
                                  <td>
                                    Apellidos: {{ dataApplicant.lastName }}
                                  </td>
                                  <td>
                                    Nombres: {{ dataApplicant.firstName }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Sexo:</td>
                                  <td>
                                    Fecha de Nacimiento:
                                    {{ dataApplicant.bornDate }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Teléfono: {{ dataApplicant.personalPhone }}
                                  </td>
                                  <td>
                                    Correo electrónico:
                                    {{ dataApplicant.email }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Estado Civil:
                                    {{ dataApplicant.martialStatus }}
                                  </td>
                                  <td>Grado de Instruccion:</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-container>
                      </v-card-text>
                    </v-window-item>
                  </v-window>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-footer fixed>
            <v-col cols="12">
              <v-card-actions>
                <v-btn :disabled="step === 0" text @click="step--">
                  Atras
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="
                    step === 0
                      ? dataApplicant.Found !== true || !valid
                      : step === 3
                  "
                  color="secondary"
                  depressed
                  @click="step++"
                >
                  Siguiente
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-footer>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "addRequestForm",

  data() {
    return {
      step: 0,
      valid: true,
      dialog: false,
      menu: [
        {
          icon: "mdi-numeric-1-circle",
          title: "Buscar solicitante",
        },
        {
          icon: "mdi-numeric-2-circle",
          title: "Datos de la solicitud",
        },
        {
          icon: "mdi-numeric-3-circle",
          title: "Asignar beneficiario",
        },
        {
          icon: "mdi-numeric-4-circle",
          title: "Finalizar solicitud",
        },
      ],
      formFind: {
        documentType: null,
        documentNumber: null,
      },
      defaultItem: {
        documentType: null,
        documentNumber: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      responseSnackbar: "getResponseSnackbar",
      dataApplicant: "getDataApplicant",
    }),
  },
  methods: {
    ...mapActions({
      addRequests: "addRequests",
      findApplicant: "findApplicant",
      closeFindApplicant: "closeFindApplicant",
    }),
    close() {
      this.dialog = false;
      this.closeFindApplicant();
      this.$nextTick(() => {
        this.formFind = Object.assign({}, this.defaultItem);
      });
    },
    save() {
      this.addRequests(this.formFind);
      this.close();
    },
  },
};
</script>
