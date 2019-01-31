<template>
    <div class="col-md-7 d-flex flex-column m-4">
        <Questions v-for="(question, index) in questions" :key="index" :question="question" class="my-2"> </Questions>
    </div>
</template>

<script>
import Questions from '@/components/Question.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Questions
  },
  mounted () {
    this.fetchQuestions()
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'fetchQuestions'
    ])
  },
  computed: {
    ...mapState([
      'questions'
    ])
  }
}
</script>
