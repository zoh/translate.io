<template>
  <section>

    <v-chip
      v-for="(lang, index) of list"
      :key="index"
      class="languages--list"
    >
      <flag :iso="lang.flagCode"/>
      &nbsp;
      {{ lang.title }} ({{ lang.key }})
      <v-btn
        icon
        @click="onEdit(lang)"
        title="Edit"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        icon
        title="Delete"
        @click="onDelete(lang)"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-chip>

    <v-dialog
      @keydown.esc="dialog = false"
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        color="primary"
        icon
        @click="onCreate"
        title="Add New Language">
        <v-icon>add</v-icon>
      </v-btn>

      <v-card>
        <v-form @submit="onSave">
          <v-card-title>
            <span class="headline">{{ model.id ? 'Edit Language' : 'Add Language' }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex sm6>
                  <v-text-field
                    label="Key Country*"
                    hint="Short code of country"
                    v-model="model.key"

                    v-validate="'required'"
                    data-vv-name="key"
                    :error-messages="errors.collect('key')"
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    label="Title Language *"
                    v-model="model.title"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 style="display: flex;">

                  <v-combobox
                    label="Flag Country"
                    v-model="model.flagCode"
                    :items="countries"
                    item-value="code"
                    item-text="name"
                    :return-object="false"
                  >
                    <template slot="selection" slot-scope="data">
                      <flag :iso="data.item"/>
                      &nbsp;
                      {{ countryName(data.item) }}
                    </template>
                  </v-combobox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              flat
              @click="dialog = false"
            >Cancel
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              flat
            >
              Save
            </v-btn>
          </v-card-actions>

          <debug>{{ model }}</debug>
        </v-form>
      </v-card>
    </v-dialog>
    <br>
    <debug>{{ list }}</debug>

  </section>
</template>

<script>
  import {countries} from "./countries";
  import * as _ from "lodash";

  const log = require("debug")("Component languages:");

  export default {
    data() {
      return {
        dialog: false,
        countries,
        model: {},

        languages: {}
      };
    },

    mounted() {
      this.$gun
        .get("languages")
        .map()
        .on((data, key) => {
          log("update ?", data, key);
          this.languages = Object.assign({}, this.languages, {[key]: data});
        });
    },

    beforeDestroy() {
      this.$gun.get("languages").off();
    },

    computed: {
      list() {
        return _.filter(this.languages, v => v);
      }
    },

    methods: {
      countryName(key) {
        return _.get(_.find(this.countries, c => c.code === key), "name");
      },

      async onSave(e) {
        e.preventDefault();
        if (await this.$validator.validateAll()) {
          const isEdit = !!this.model.id;

          if (isEdit) {
            this.updateLang();
          } else {
            this.createNewLang();
          }
          this.dialog = false;
        }
      },

      onCreate() {
        this.model = {};
      },

      createNewLang() {
        const newLang = this.$gun.get(this.model.key);
        newLang.put({
          key: this.model.key,
          title: this.model.title,
          flagCode: this.model.flagCode
        });
        this.$gun.get("languages").set(newLang);
      },

      updateLang() {
        log("updateLang", this.model);
        const data = {...this.model};
        const l = gun.get(data.id);

        l.put({
          key: data.key,
          title: data.title,
          flagCode: data.flagCode
        });
      },

      async onDelete(lang) {
        if (await this.$confirm("Remove this lang?")) {
          await this.$gun
            .get("languages")
            .unset(this.$gun.get(lang["_"]["#"]));
        }
      },

      onEdit(lang) {
        this.model = {
          id: lang._["#"],
          key: lang.key,
          title: lang.title,
          flagCode: lang.flagCode
        };
        this.dialog = true;
      }
    }
  };
</script>


<style>
  .languages--list .v-chip__content {
    padding-right: 5px !important;
  }

  .languages--list .v-btn {
    margin: 0;
    width: 30px;
  }

  .languages--list .v-btn:first-child {
    margin-left: 5px;
  }
</style>
