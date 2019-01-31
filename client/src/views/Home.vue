<template>
  <div style="height: 100%; margin-top: 5%;">

    <div class="row" >
      <div class="col-md-2">
        <Navigation style="top: 10%"> </Navigation>
      </div>
      <div class="col-md-7 d-flex flex-column m-4">
        <Questions v-for="(question, index) in questions" :key="index" :question="question" class="my-2"> </Questions>
      </div>
      <div class="col-md-3 m-4">

      </div>
    </div>
    <v-btn
      color="#FF961E"
      dark
      fab
      fixed
      bottom
      right
      @click="dialog = !dialog"
    >
      <v-icon>question_answer</v-icon>
    </v-btn>
    <Ask v-if="dialog" :dialog="dialog" @dialog-turn="onChangeDialog"> </Ask>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Questions from '@/components/Question.vue'
import Ask from '@/components/Ask.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Navigation,
    Questions,
    Ask
  },
  mounted () {
    this.fetchQuestions()
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapActions([
      'fetchQuestions'
    ]),
    onChangeDialog (data) {
      this.dialog = data
    }
  },
  computed: {
    ...mapState([
      'questions'
    ])
  }
}
</script>

<style>

</style>
