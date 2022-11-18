<template>
     <v-navigation-drawer
      v-model="drawer"
      right
      absolute
      width="50%"
      temporary
    >
      <template #prepend>
   <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{title}}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      </template>
      <slot name="form"></slot>
      <template #append>
        <div class="pa-2">
          <v-btn class="pa-2" block color="primary" @click="search">Filtrar</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name:"drawerSearch",
    props:{
      showDrawer:{
        type: Boolean,
        default: false
      },
      title:{
        type: String,
        default: 'this is a drawer'
      }
    },   
   computed: {
    drawer(){
        return this.showDrawer
      }  
   }, 
    methods: { 
      
      close(){
        this.$emit('close',false)
      }
    }, 
  }
</script>

<style>

</style>
