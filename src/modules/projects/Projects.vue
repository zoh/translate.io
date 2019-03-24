<template>

  <section>
    <v-toolbar flat>
      <v-toolbar-title>Projects list</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        @click="onShowDialogToCreate"
        fab dark small
        color="primary"
        title="Create New Project"
      >
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container flud v-if="_.isEmpty(projects)">
      <v-flex class="text-xs-center">
        <span style="cursor: pointer;" @click="onShowDialogToCreate">
          <v-btn @click="onShowDialogToCreate" fab small outline color="primary" title="Create New Project">
          <v-icon dark>add</v-icon>
        </v-btn>
        Create you new project
        </span>
      </v-flex>
    </v-container>

    <v-container>

      <v-list two-line>
        <template v-for="(item, index) in projectList">
          <v-list-tile
            :key="item.id"
            avatar
            ripple
            @click="openProject(item)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content style="flex-direction: row; align-items: center;">
              <v-chip
                v-for="(lang, index) of showLanguagesWithFlag(item.languages)"
                :key="index"
              >
                <flag :iso="lang.flagCode"/>
                &nbsp;
                {{ lang.title }} ({{ lang.key }})
              </v-chip>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                icon
                @click="e => onDelete(e, item)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>

          </v-list-tile>
          <v-divider
            v-if="index + 1 < projectList.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list>

    </v-container>

    <debug>{{ projectWithOutData }}</debug>

    <v-dialog
      max-width="700"
      v-model="dialogForm"
      @keydown.esc="dialogForm = false"
    >
      <v-card>
        <v-form @submit="onSave">
          <v-card-title>
            <span class="headline"> Create Projects</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Project Name *"
                    hint="unique name"
                    v-model="model.name"

                    v-validate="'required|min:5'"
                    data-vv-name="name"
                    :error-messages="errors.collect('name')"
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <v-combobox
                    v-model="model.languages"
                    :items="languageListKeys"
                    label="Select a languages for project"
                    multiple

                    v-validate="'required'"
                    data-vv-name="languages"
                    :error-messages="errors.collect('languages')"
                  ></v-combobox>
                </v-flex>

                <v-flex xs12>
                  <v-textarea
                    v-model="model.description"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              flat
              @click="dialogForm = false"
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

        </v-form>
      </v-card>
    </v-dialog>

  </section>

</template>

<script>
  import mix from './mixins';
  import * as _ from "lodash";

  export default {
    mixins: [mix],

    data() {
      return {
        dialogForm: false,
        model: {},

        projects: {}
      }
    },

    mounted() {
      this.$gun
        .get('projects')
        .map()
        .on((data, key) => {
          if (data) {
            this.projects = Object.assign({}, this.projects, {[key]: {...data}});
          } else {
            this.projects = Object.assign({}, this.projects, {[key]: null});
          }
        });
      //
      this.$initLanguages();
    },

    beforeDestroy() {
      this.$gun.get("projects").off();
    },

    computed: {
      projectWithOutData() {
        return _.map(this.projects, proj => {
          const r = {
            ...proj,
          };
          delete r.data;
          return r
        })
      },
      projectList() {
        let projects = [];

        _.forEach(this.projects, (data, key) => {
          if (data) projects.push({id: key, ...data});
        });

        return projects
      },
    },

    methods: {

      openProject(project) {
        this.$router.push('/projects/' + project.id)
      },

      onShowDialogToCreate() {
        this.dialogForm = true;
        this.model = {};
      },

      async onSave(e) {
        e.preventDefault();

        if (await this.$validator.validateAll() === false) {
          return;
        }

        try {
          // is uniq project name
          // project name is gun-node.
          if (await this.$gun.get('projects').get(this.model.name).val()) {
            throw 'Project with this name already exist!'
          }

          const newProject = this.$gun.get(this.model.name);
          newProject.put({
            ...this.model,
            languages: _.join(
              _.filter(this.model.languages, val => !!this.languages[val]),
              ','
            ),

            // tree where we store translate.
            data: {}
          });
          this.$gun.get('projects').set(newProject);

          this.dialogForm = false;
        } catch (e) {
          this.$notify({
            text: e.toString(),
            type: 'error',
          })
        }
      },

      async onDelete(e, project) {
        e.stopPropagation();

        console.log(
          project.id
        );

        if (await this.$confirm('Are you really want remove this Project?', {title: '! Danger !', color: 'red'})) {
          await this.$gun
            .get("projects")
            .unset(project.id)
        }
      }
    }
  }
</script>
