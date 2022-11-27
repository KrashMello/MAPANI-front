<template>
  <v-app dark>
    <v-app-bar
      color="secondary"
      :clipped-left="clipped"
      fixed
      app
      elevate-on-scroll
    >
      <v-toolbar-title>
        <img width="19%" src="/logo-light.png" />
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-email</v-icon>
      </v-btn> 
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn> -->
      <v-list color="secondary" dense class="py-0" width="260">
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" class="px-0">
              <v-list-item-avatar>
                <v-img src="/user.jpg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ `${auth.userData ? auth.userData.firstName.split(" ")[0] : 'primer nombre'} ${ auth. userData ? auth.userData.lastName.split(" ")[0] : 'primer apellido'}` }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="auth.userData">
                  {{ `${auth.userData.departamentName ? auth.userData.departamentName : 'Membresia'} | ${auth.userData.cargeName ? auth.userData.cargeName : auth.userData.roleName}` }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="ma-0">
                <v-btn icon>
                  <v-icon> mdi-menu-down </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-list color="secondary">
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
      color="primary"
      dark
    >
      <!-- list item -->
      <v-list-item-group v-model="selectedModule" color="accent">
        <template v-for="(menu,i) in father">
          <v-list-item v-if="!menu.hasChildren"
            :key="i"
            nuxt
            :to="menu.moduleSrc"
            exact>
            <v-list-item-icon>
              <v-icon>
                {{menu.moduleIcon}}
              </v-icon>
                <v-list-item-title>
                {{menu.moduleName}}
                </v-list-item-title>
            </v-list-item-icon>
          </v-list-item>
          <v-list-group v-else :key="i" :prepend-icon="menu.moduleIcon">
              <template #activator>
                <v-list-item-content>
                  <v-list-item-title >{{menu.moduleName}}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(children, j) in children.filter(v => v.fatherCode === menu.moduleCode)"
                :key="j"
                nuxt
                :to="children.moduleSrc"
                router
                exact
              >
                <v-list-item-title>{{children.moduleName}}</v-list-item-title>

                <v-list-item-icon>
                  <v-icon>{{ children.moduleIcon }} </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>

        </template>
      </v-list-item-group>
      
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
      <v-toolbar color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>{{ routeTitle }}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      selectedModule: 1,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  computed: {
    ...mapGetters({
      routeTitle: "getPageTitle",
      auth: "getAuth",
      getModules: "getModules",
      socket: "socket"
    }),
    father(){
      if(this.auth.permissions)
        return this.auth.permissions.filter(v => v.fatherCode === null);
      else
        return []
    },
    children(){
      if(this.auth.permissions)
        return this.auth.permissions.filter(v => v.fatherCode !== null);
      else
        return []
    }
  },
  methods: {
    ...mapMutations(["setUserDataPermissions","setSocket"]),
    ...mapActions(["logout","searchLocalStorageToken"]),
  },
  mounted() {
    if(!this.socket)
      this.setSocket(this.$nuxtSocket({name:'main'}))
    this.searchLocalStorageToken();
    this.socket.on("getUserData",resp => {
      this.setUserDataPermissions(resp)  
    });

  },
};
</script>
