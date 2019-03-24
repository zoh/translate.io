<template>
  <div>
    <v-list
      dense
    >
      <template
        v-for="menu of menuList"
      >
        <v-list-tile
          :key="menu.key + 'tile'"
          :to="'/' + menu.key"
        >
          <v-list-tile-action>
            <v-icon>{{menu.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{menu.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="menu.divider"
          :key="menu.key + 'divider'"
        ></v-divider>
      </template>

    </v-list>
  </div>
</template>

<script>
  import {mainMenuList} from '../config/cfg.js'

  export default {
    name: "MainMenu",

    data() {
      return {
        menuList: mainMenuList,
      }
    },

    methods: {
    }
  }
</script>

<style scoped>

</style>
