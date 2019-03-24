<template>
  <v-app>
    <notifications />

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card :class="['elevation-12', {_loading: loading}]">
              <form id="form" @submit="onSubmit">
                <v-toolbar color="white" style="box-shadow: none;">
                  <v-toolbar-title>Enter</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-text-field
                    autofocus
                    v-model="login"
                    browser-autocomplete="off"
                    prepend-icon="person"
                    label="Login"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="password"
                    prepend-icon="lock"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled=" !login || !password "
                    @click="onLogin"
                    type="submit"
                    color="primary"
                  >
                    Sign In
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    components: {},

    props: {
      isAuth: Boolean
    },

    data: () => ({
      loading: false,
      login: null,
      password: null,
    }),

    methods: {
      async onLogin() {
        try {
          this.loading = true;
          await this.authLogin({login: this.login, password: this.password});
          this.$emit('onSuccessLogin', null);

        } catch (e) {
          this.$notify({
            text: e.toString(),
            type: 'error',
          })
        } finally {
          this.loading = false
        }
      },

      onSubmit(e) {
        e.preventDefault()
      },

      authLogin({login, password}) {
        return new Promise((resolve, reject) => {
          this.$gun.user().auth(login, password, (res) => {
            if (res.err) {
              return reject(res.err)
            }
            resolve(res)
          })
        })
      }
    }
  }
</script>
