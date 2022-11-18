<template>
  <v-container class="mt-3">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="searchOption.code" label="Codigo" dense outlined color="primary" placeholder="ingrezar el codigo MAPANI"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="searchOption.representativeFirstName" label="Nombre del representate" dense outlined color="primary" placeholder="ingrece el nombre del representante"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="searchOption.representativeLastName" label="Apellido del representante" dense outlined color="primary" placeholder="ingrece el apellido del representante"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="searchOption.patientFirstName" label="Nombre del paciente" dense outlined color="primary" placeholder="ingrece el Nombre del paciente"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="searchOption.patientLastName" label="Apellido del paciente" dense outlined color="primary" placeholder="ingrece el apellido del paciente"></v-text-field>
          </v-col>
          <v-col cols="12">
             <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="searchOption.appointmentDate"
                label="Fecha de cita"
                prepend-icon="mdi-calendar"
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="searchOption.appointmentDate"
                :active-picker="activePicker"
                :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
                "
                min="1950-01-01"
                @change="save"
            ></v-date-picker>
          </v-menu>
          </v-col>
        </v-row>
      </v-container>

</template>

<script>
  export default {
    name:"searchAppointment",
    props:{
      formData: {
        type: Object,
        default() {
          return{
            code: '',
            representativeFirstName: '',
            representativeLastName: '',
            patientFirstName: '',
            patientLastName: '',
            appointmentDate: '',
          }
        }
      }
    },
     data(){
      return {
        menu: false,
        activePicker: null,
        upperCaseMask: {
          mask: "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
          tokens: {
            U: {
              pattern: /[a-zA-Z\s]/,
              transform: (v) => v.toLocaleUpperCase(),
            },
          },
        },
      }
    },
    watch: {
      data(){
        return this.formData
      },
      menu(val) {
        val && setTimeout(() => (this.activePicker = "YEAR"));
      },

    },
    methods: {
       save(date) {
        this.$refs.menu.save(date);
      },
    },
  }
</script>

<style lang="scss" scoped>

</style> 
