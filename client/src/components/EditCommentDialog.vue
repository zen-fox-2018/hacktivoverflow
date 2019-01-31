<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-btn class="md-subhead" slot="activator" flat color="secondary" small dark>Edit</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Edit comment</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-layout>
                    <v-flex md12>
                        <wysiwyg
                            v-model="message"
                            required
                        />
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.prevent="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="handleComment">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['answer-id', 'data'],
  data () {
    return {
      dialog: false,
      message: this.data
    }
  },
  methods: {
    ...mapActions([
      'updateAnswer'
    ]),
    handleComment () {
      this.updateAnswer({ data: { message: this.message }, id: this.answerId })
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
