<template>
     <v-snackbar
        v-model="errorMessage.snackbar"
        :color="errorMessage.color"
        :timeout="6000"
        >
        {{ errorMessage.message }}
        <v-btn
            dark
            flat
            @click="errorMessage.snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'errorMessage'
    ])
  }
}
</script>

<style>

</style>
