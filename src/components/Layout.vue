<template>
  <Login
    :isAuth="isAuth"
    @onSuccessLogin="onSuccessLogin"
    v-if="isAuth === false"
  />

  <div v-else id="app">
    <notifications />

    <v-app id="inspire">
      <!--<v-navigation-drawer
        fixed
        v-model="drawerRight"
        right
        clipped
        app
      >
        <v-alert
          :value="true"
          color="info"
          icon="info"
          outline
        >
          Coming Soon.
        </v-alert>
      </v-navigation-drawer>
-->
      <v-toolbar
        color="blue-grey"
        dark
        fixed
        app
        clipped-right
      >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Translate ⛿ IO</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn flat @click.stop="drawerRight = !drawerRight">
          Show Status
        </v-btn>

        <v-chip color="teal">
          root
          <v-btn icon style="margin-right: -12px;">
            <v-icon title="Exit" @click="logout">exit_to_app</v-icon>
          </v-btn>
        </v-chip>

      </v-toolbar>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        app
        :permanent="drawer"
        width="250"
      >
        <MainMenu/>
      </v-navigation-drawer>


      <v-content>
          <!-- router.  -->
          <router-view></router-view>
      </v-content>
      <v-navigation-drawer
        right
        temporary
        v-model="right"
        fixed
      ></v-navigation-drawer>
      <v-footer color="blue-grey" class="white--text pa-2" app>
        <span>Vuetify</span>
        <v-spacer></v-spacer>
        <span>&copy; 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  import MainMenu from "./MainMenu";
  import Login from "./Login";
  import {LocalStore} from "../plugins/LocalStore";


  const ls = new LocalStore('layout');

  export default {
    name: "Layout",
    components: {Login, MainMenu},
    props: {
      source: String
    },

    data() {
      return {
        drawer: true,
        drawerRight: false,
        right: null,
        left: null,

        isAuth: ls.getItem('isAuth')
      };
    },

    methods: {
      async logout() {
        if (await this.$confirm("Are you sure to exit?")) {
          this.isAuth = false;
          ls.setItem('isAuth', false);
        }
      },

      onSuccessLogin() {
        this.isAuth = true;
        ls.setItem('isAuth', true)
      }
    }
  };
</script>

<style scoped>
</style>
