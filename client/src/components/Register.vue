<template>
    <v-layout justify-center class="mt-4">
        <v-flex text-center xs12 sm10 md6 lg5>
            <h3> Create your Stack Overflow account. It's free and only takes a minute. </h3>
            <v-layout column class="mt-4">
                <v-flex text- xs12 md4>
                    <v-card class="mt-4 mx-auto" ref="form" max-width="400">
                        <v-card-text >
                        <form @submit.prevent="handleRegister" id="formRegister">
                            <v-text-field
                                v-model="email"
                                :error-messages="emailErrors"
                                label="Email"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                :error-messages="passwordErrors"
                                label="Password"
                                type="password"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                            ></v-text-field>
                            <v-text-field
                                v-model="repeatPassword"
                                label="Repeat Password"
                                type="password"
                                required
                                :error-messages="repeatpasswordErrors"
                                @input="$v.repeatPassword.$touch()"
                                @blur="$v.repeatPassword.$touch()"
                            ></v-text-field>
                            <v-layout justify-start>
                                <v-flex mr-4
                                xs12
                                md5
                                >
                                <v-text-field
                                    v-model="firstName"
                                    :counter="10"
                                    label="First name"
                                    required
                                    :error-messages="firstNameErrors"
                                    @input="$v.firstName.$touch()"
                                    @blur="$v.firstName.$touch()"
                                ></v-text-field>
                                </v-flex>
                                <v-flex
                                xs12
                                md5
                                >
                                <v-text-field
                                    v-model="lastName"
                                    :counter="10"
                                    label="Last name"
                                    required
                                    :error-messages="lastNameErrors"
                                    @input="$v.lastName.$touch()"
                                    @blur="$v.lastName.$touch()"
                                ></v-text-field>
                                </v-flex>
                            </v-layout>
                            </form>
                        </v-card-text>
                        <v-divider class="mt-1"></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-slide-x-reverse-transition>
                                <v-tooltip
                                v-if="formHasErrors"
                                left
                                >
                                <v-btn
                                    slot="activator"
                                    icon
                                    class="my-0"
                                    @click="clear"
                                >
                                    <v-icon>refresh</v-icon>
                                </v-btn>
                                <span>Refresh form</span>
                                </v-tooltip>
                            </v-slide-x-reverse-transition>
                            <v-btn color="primary" flat type="submit" @submit.prevent="handleRegister" form="formRegister">Sign up </v-btn>
                        </v-card-actions>
                    </v-card>
                    <p> already have account? <router-link to="login">sign in now! </router-link></p>
                </v-flex>
            </v-layout>
        </v-flex>
        <Alert> </Alert>
    </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, sameAs, maxLength } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'
import Alert from '@/components/alertMessage'

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
    repeatPassword: { required, sameAsPassword: sameAs('password') },
    firstName: { required, maxLength: maxLength(10) },
    lastName: { required, maxLength: maxLength(10) }
  },
  mounted () {
    this.checkLogin()
    if (this.isLogin === true) {
      this.$router.push('/')
    }
  },
  data: () => ({
    formHasErrors: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  }),
  watch: {
    isLogin (val) {
      if (val === true) {
        this.$router.push('/')
      }
    }
  },
  components: {
    Alert
  },
  computed: {
    ...mapState([
      'isLogin'
    ]),
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    repeatpasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAsPassword && errors.push('Password must be same')
      !this.$v.repeatPassword.required && errors.push('Password is required.')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.maxLength && errors.push('First name too longer')
      !this.$v.firstName.required && errors.push('First name is required.')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.maxLength && errors.push('Last name too longer')
      !this.$v.lastName.required && errors.push('Last name is required.')
      return errors
    }
  },

  methods: {
    ...mapActions([
      'checkLogin',
      'doRegister'
    ]),
    handleRegister () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.doRegister({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        this.clear()
        this.$router.push('login')
      } else {
        this.formHasErrors = true
      }
    },
    clear () {
      this.$v.$reset()
      this.email = ''
      this.password = ''
      this.repeatPassword = ''
      this.firstName = ''
      this.lastName = ''
      this.formHasErrors = false
    }
  }
}
</script>

<style>

</style>
