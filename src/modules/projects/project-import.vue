<template>

  <v-dialog
    @keydown.esc="$emit('input', false)"
    :value="value"
    @input=" onInput "

    width="500"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Import Translate to Current Project</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-combobox
              v-model="model.language"
              :items="languageListKeys"
              label="Select a languages for project"

              v-validate="'required'"
              data-vv-name="language"
              :error-messages="errors.collect('language')"
            ></v-combobox>

            <v-text-field
              type="file"
              ref="file"
              label="json file for import"
              v-model="model.file"
            >
            </v-text-field>
          </v-layout>

          <div class="body-1">
            ! JSON tree translate will be merge in current project for selected "lang".
            If value in this key has been exists - then it will update !
          </div>

        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click="$emit('input', false)"
        >Cancel
        </v-btn>
        <v-btn
          type="submit"
          color="primary"
          flat
          @click="onApply"
        >
          Apply
        </v-btn>
      </v-card-actions>

      <debug>{{ model }}</debug>
    </v-card>
  </v-dialog>

</template>

<script>
  import mix from './mixins';

  export default {
    mixins: [mix],

    name: "project-import",

    props: ['value'],

    data() {
      return {
        model: {}
      }
    },

    methods: {
      async onApply() {
        if (await this.$validator.validateAll()) {
          try {
            const file = this.$refs['file'].$refs['input'].files[0];

            if (!file) {
              throw 'Need select file';
            }

            const reader = new FileReader();
            reader.onload = () => {

              const result = JSON.parse(reader.result);
              this.$emit('import', {result, lang: this.model.language});
            };
            reader.readAsText(file, 'utf8');
          } catch (e) {
            this.$notify({
              text: e.toString(),
              type: 'error',
            })
          }
        }
      },

      onInput(val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style scoped>

</style>
