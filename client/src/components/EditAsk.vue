<template>
    <v-dialog style="margin-top : 600px;"
        v-model="dialog"
        fullscreen
        z-1
        absolute
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card>
          <v-toolbar card dark color="info">
            <v-btn icon dark @click="$emit('dialog-turn', false)">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Ask</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat type="submit" @click.prevent="handleEditQuestion" form="formEditQuestion">Edit</v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
            </v-menu>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleNewAsk" id="formEditQuestion">
                <v-flex>
                <v-subheader> Start ask a question...</v-subheader>
                </v-flex>
                <v-flex>
                    <v-text-field v-model="title"
                        @input="$v.title.$touch()"
                        @blur="$v.title.$touch()"
                        :error-messages="titleErrors"
                        required
                        label="Title"
                        outline
                    ></v-text-field>
                </v-flex>
                <v-flex>
                <v-subheader> Tell us more detail your problems..</v-subheader>
                </v-flex>
                 <v-flex>
                <wysiwyg
                    v-model="description"
                    required
                    :error-messages="descriptionErrors"
                    @input="$v.description.$touch()"
                    @blur="$v.description.$touch()"
                    outline
                />
                <v-select
                    :items="listTags"
                    v-model="tags"
                    label="Select"
                    multiple
                    chips
                    hint="Please select tag of question"
                    persistent-hint
                ></v-select>
                </v-flex>
            </v-form>
          </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'
export default {
  props: ['dialog', 'data-question'],
  mixins: [validationMixin],
  validations: {
    description: { required },
    title: { required }
  },
  mounted () {
    this.fetchTags()
    this.dataQuestion.tags.forEach(tag => {
      this.tags.push(tag._id)
    })
  },
  data () {
    return {
      title: this.dataQuestion.title,
      description: this.dataQuestion.description,
      tags: []
    }
  },
  computed: {
    ...mapState([
      'listTags'
    ]),
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.required && errors.push('Title is required.')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required && errors.push('Description is required.')
      return errors
    }
  },
  methods: {
    ...mapActions([
      'editQuestion',
      'fetchTags'
    ]),
    handleEditQuestion () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.editQuestion({
          data: {
            title: this.title,
            description: this.description,
            tags: this.tags
          },
          id: this.dataQuestion._id
        })
        this.clear()
        this.$emit('dialog-turn', false)
      }
    },
    clear () {
      this.title = ''
      this.description = ''
      this.tags = []
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
