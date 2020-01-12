<template>
    <v-container>

        <v-card
            class="mx-auto"
            max-width="344"
            outlined
            elevation="7"
        >
            <v-card-title>
                Login
            </v-card-title>

            <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="Username"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                    ></v-text-field>

                    <v-btn
                    :disabled="!valid"
                    color="info"
                    class="mr-4"
                    @click="loginUser"
                    >
                    Login
                    </v-btn>
                </v-form>
            </v-card-text>

        </v-card>

    </v-container>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  name: 'Login',
  components: {
  },
  data() {
      return {
        valid: true,
        username: '',
        usernameRules: [
            v => !!v || 'Username is required'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required'
        ]
      }
  },
  methods: {
      ...mapActions(["login"]),
      async loginUser() {
          let user = {
            username: this.username,
            password: this.password
          }
          this.login(user)
          .then(res => {
              if(res.data.success) {
                  this.$router.push("/")
              }
          })
          .catch(err => {
              console.log(err)
          })
      },
      validate () {
          console.log('validate')
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      }
  }
}
</script>
