<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app elevate-on-scroll>
      <v-toolbar-title>
        <img width="25%" src="/logo-light.png" />
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-email</v-icon>
      </v-btn> 
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn> -->
      <v-list dense class="py-0" width="260">
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" class="px-0">
              <v-list-item-avatar>
                <v-img src="/user.jpg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ userData.personData.fullName }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ userData.departament }} | {{ userData.carge }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="ma-0">
                <v-btn icon>
                  <v-icon> mdi-menu-down </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item to="/panel/usuarios">
              <v-list-item-title>
                <v-icon> mdi-shield-account </v-icon>
                Perfil
              </v-list-item-title>
            </v-list-item>
            <v-list-item to="/panel/configuracion">
              <v-list-item-title>
                <v-icon> mdi-cog </v-icon>
                Configuración
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>
                <v-icon> mdi-logout </v-icon>
                Salir
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="nav"
    >
      <!-- list item -->
      <v-list>
        <v-list-item
          v-for="(item, i) in modules"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- logout -->
      <template #append>
        <div class="pa-2">
          <v-btn block color="accent" @click="logout">
            <v-icon>mdi-logout</v-icon>
            Salir
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- main -->
    <v-main>
      <v-toolbar class="nav">
        <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
        <v-toolbar-title>{{ routeTitle }}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  computed: {
    ...mapGetters({
      routeTitle: "getPageTitle",
      userData: "getAuth",
      getModules: "getModules",
    }),
    modules() {
      return this.getModules(this.userData.permission);
    },
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
