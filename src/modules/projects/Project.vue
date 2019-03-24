<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-toolbar flat dark>
      <v-toolbar-title>Project: {{ project.name }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        :loading="importing.loading"
        :disabled="importing.loading"
        color="green"
        class="white--text"
        @click="dialogImportTranslate = true"
      >
        Import file
        <v-icon right dark>cloud_download</v-icon>
      </v-btn>
    </v-toolbar>

    <v-toolbar class="toolbar_search" flat style="position: sticky; top: 60px;">
      <v-btn-group>
        <v-btn
          @click="addNewRow"
          title="Add Row In Top"
        >
          Add
          <v-icon>arrow_drop_up</v-icon>
        </v-btn>
        <v-btn
          @click="addNewRowUp"
          title="Add Row In Down"
        >
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
      </v-btn-group>

      <v-dialog
        max-width="700"
        v-model="dialogForm"
        @keydown.esc="dialogForm = false"
      >
        <v-btn
          slot="activator"
        >
          Show Lang
        </v-btn>

        <v-card>
          <v-form>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-checkbox
                    v-for="(lang, index) in languageListKeys"
                    v-model="selectedLangs"
                    :key="'_lang_' + index"
                    :value="lang"
                    :label="lang"
                    name="lang"
                  />
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onApplyLangs(selectedLangs)" color="primary">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <v-text-field
        :value="search"
        @input="onSearch"
        flat solo
        clearable
        hide-details
        height="36px"
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>

      <v-btn
        v-if="hasChanged"
        @click="onSaveTranslate"
        color="primary"
      >
        Save
      </v-btn>
    </v-toolbar>

    <section>
      <table style="min-width: 700px;" class="transition__table">
        <thead>
        <tr>
          <th class="text-xs-left">&nbsp;</th>
          <th
            v-for="(l, index) in langs"
            :key="'lang_flag_' + index"
          >
            {{l}}
          </th>
        </tr>
        </thead>

        <tbody>
        <tr
          v-for="(row, index) in translateListFilter"
          :key="'_row__' + index"
          :class="{row__node: row.node}"
        >
          <td>
            <v-layout style="height: 22px;">
              <span class="__spacer">
                {{ _.repeat(".&nbsp;&nbsp;&nbsp;", row.level)  }}
              </span>
              <input
                :data-node-index="index"
                placeholder="..."
                class="input__light row_input__title"
                v-model="row.title"
              />

              <v-icon v-if="row.node">arrow_right_alt</v-icon>

              <v-spacer></v-spacer>

              <div class="btn-actions_container">
                <button
                  @click="addSubRow(row, index)"
                  class="btn-action__small"
                  tabindex="-1"
                  title="add child row"
                >add
                </button>
                <button
                  @click="deleteRow(row, index)"
                  class="btn-action__small"
                  tabindex="-1"
                >delete
                </button>
              </div>
            </v-layout>
          </td>

          <td
            v-if="!row.node"
            v-for="(l, index) in langs"
            :key="'translate_row__' + l + '_' + index"
          >
            <input
              placeholder="..."
              class="input__light input__light--full-width"
              v-model="row[l]"
            />
          </td>
        </tr>
        </tbody>
      </table>

      <p v-if="translateList.length" class="text-xs-center pa-2" style="background-color: #ddd;">
        .END.
      </p>
    </section>

    <project-import
      v-model="dialogImportTranslate"
      @import="onImportTranslate"
    ></project-import>
  </section>
</template>

<script>
  import ProjectImport from "./project-import";
  import mix from './mixins'
  import {vueToJSON} from "../../utils/utils";
  import {makeTreeJSON} from "../../../common/gun.export";
  import VBtnGroup from '../../components/VBtnGroup'
  import * as _ from "lodash";
  import {mergeTreeInRows} from "./utilsForImport";

  const log = require("debug")("Component languages:");

  export default {
    name: "Project",
    mixins: [mix],

    components: {ProjectImport, VBtnGroup},

    data() {
      return {
        hasChanged: false,
        search: '',
        project: {},
        importing: {
          loading: false
        },

        selectedLangs: [],

        dialogForm: false,

        dialogImportTranslate: false,

        // тут будет записи из ключей и значений, для быстрого получени
        translateList: [],
      }
    },

    computed: {
      langs() {
        return _.split(this.project.languages, ',')
      },

      //
      translateListFilter() {
        const search = _.trim(this.search).toLowerCase();

        if (!search) {
          return this.translateList
        }
        // or match on title and by lang params.
        return _.filter(this.translateList, row => {

          if (String(row.title).toLowerCase().match(search)) {
            return true
          }

          for (let l of this.langs) {
            if (String(row[l]).toLowerCase().match(search)) {
              return true
            }
          }
        })
      },
    },

    created() {
      this.$gun.get('projects').get(this.$route.params.key).on((data, key) => {
        log("curr project", data, key);
        this.project = Object.assign({}, this.project, vueToJSON(data));
      });
      this.$initLanguages();

      this.onSearch = _.debounce(this.onSearch, 300);
    },

    beforeDestroy() {
      this.$gun.get('projects').get(this.$route.params.key).off()
    },

    methods: {
      onSearch(val) {
        this.search = val;
      },

      onApplyLangs(langs) {
        if (!_.size(langs)) {
          return this.$notify({
            text: 'U need select one or more languages!',
            type: 'error',
          })
        }
        this.$gun.get('projects').get(this.$route.params.key).get('languages').put(_.join(langs, ','));
        this.dialogForm = false;
      },

      addNewRow() {
        this.translateList.unshift({
          title: '',
          level: 0,
        });

        this.focusOnTitleByIndex(0);
      },

      focusOnTitleByIndex(index) {
        setTimeout(() => {
          const input = _.first(window.document.querySelectorAll(`.row_input__title[data-node-index="${index}"]`));
          input && input.focus()
        }, 150)
      },

      addNewRowUp() {
        this.translateList.push({
          title: '',
          level: 0,
        });

        this.focusOnTitleByIndex(this.translateList.length - 1);
      },

      addSubRow(row, index) {
        row.node = true;
        // remove key-langs.

        this.translateList.splice(index + 1, 0, {
          title: '',
          level: row.level + 1,
          parent: row
        });

        this.focusOnTitleByIndex(index + 1)
      },

      deleteRow(row, index) {
        this.translateList.splice(index, 1);
        // if parent has not children
        const parent = row.parent;

        if (parent) {
          if (!this._.find(this.translateList, t => t.parent == parent)) {
            parent.node = false
          }
        }
      },

      async onSaveTranslate() {
        const translateMap = {};
        let cur = translateMap;
        const translateList = this.translateList;

        function makePaths(node, paths = []) {
          for (let p of translateList) {
            if (p == node) {
              paths.push(p.title);

              if (p.parent) {
                makePaths(p.parent, paths)
              }
            }
          }
        }

        for (let row of this.translateList) {
          if (row.parent) {
            let paths = [];
            makePaths(row.parent, paths);
            cur = _.get(translateMap, paths.reverse())
          } else {
            cur = translateMap
          }

          if (row.node) {
            cur[row.title] = {};
          } else {
            let r = {};
            for (let l of this.langs) {
              if (row[l]) r[l] = row[l]
            }
            if (_.isEmpty(r) === false) {
              cur[row.title] = r;
            }
          }
        }

        await this.$gun.get('projects').get(this.$route.params.key).get('data').put(
          JSON.stringify(translateMap)
        );
        setTimeout(() => {
          this.hasChanged = false;
        }, 200)
      },

      onImportTranslate({result = {}, lang}) {
        mergeTreeInRows(lang, result, this.translateList);
        this.dialogImportTranslate = false;
      }
    },

    watch: {
      langs(val) {
        this.selectedLangs = val
      },

      async 'project.data'(val) {
        log('Change data', val);

        if (!val) {
          return this.translateList = [];
        }

        try {
          let result = JSON.parse(val);
          const lang$ = this.langs;
          let rows = [];

          function forceMakeRows(node, parent, level = 0) {
            if (_.isEmpty(node)) return;

            for (let key in node) {
              const val = node[key];

              if (typeof val === "object") {
                if (_.intersection(_.keys(val), lang$).length) {
                  // this is leaf.
                  rows.push({
                    title: key,
                    level: level,
                    parent,

                    ...(val || {})
                  });
                  continue;
                }

                let r = {
                  title: key,
                  node: true,
                  level: level,
                  parent,
                };
                rows.push(r);

                forceMakeRows(val, r, level + 1)
              } else {
                // string
                rows.push({
                  title: key,
                  level: level,
                  parent,

                  ru: val
                });
              }
            }
          }

          forceMakeRows(result);
          this.translateList = rows;

        } catch (e) {
          this.translateList = []
        }
      },

      translateList: {
        deep: true,
        handler(val) {
          if (this._hasChanged)
            this.hasChanged = true;

          this._hasChanged = true
        }
      }
    }
  }
</script>

<style scoped>
  .transition__table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

  }

  .transition__table thead th {
    height: 32px;
    padding: 5px 10px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  }


  .transition__table tbody td {
    padding: 5px 10px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.3);
    border-right: 1px solid rgba(204, 204, 204, 0.3);
  }

  .transition__table tbody tr:nth-of-type(2n) {
    background: #f1f1f1;
  }

  .__spacer {
    font-size: 200%;
    font-weight: bold;
    height: 30px;
    display: inline-block;
    white-space: nowrap;
    margin-top: -10px;
  }

  .row__node {
    color: cornflowerblue;
    font-weight: bold;
  }

  .toolbar_search .v-toolbar__content {
    padding: 0 !important;
  }

  .input__light {
    width: auto;
    padding: 3px 10px;
    outline: none;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  }

  .input__light:focus {
    border-bottom: 1px solid cornflowerblue;
  }

  .input__light--full-width {
    width: 100%;
  }

  /**/
  .btn-actions_container {
    visibility: hidden;
    white-space: nowrap;
    float: right;
    margin-top: -4px;
  }

  table td:hover .btn-actions_container {
    visibility: visible;
  }

  .btn-actions_container .btn-action__small:not(:last-child) {
    border-right: none;
  }

  .btn-action__small {
    background-color: #f2f2f2;
    border: 1px solid #d6d6d6;
    white-space: nowrap;
    margin: 0;
    padding: 3px 10px;
  }
</style>
