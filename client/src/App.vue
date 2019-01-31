<template>
  <v-app>
    <Navbar class="fixed-top"> </Navbar>
    <router-view style="margin-top: 5%;"></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
