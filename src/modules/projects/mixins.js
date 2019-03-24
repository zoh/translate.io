

export default {

  data() {
    return {
      languages: [],
    }
  },

  computed: {
    languageListKeys() {
      return _.keys(this.languages)
    },
  },

  created() {
    this.$initLanguages()
  },

  methods: {

    async $initLanguages() {
      this.$gun.get("languages").map().once((data, key) => {
        if (!data) return;
        // this.languages = _.filter(_.keys(langs), v => v !== '_' && !!langs[v]);

        this.languages = Object.assign({}, this.languages, {[key]: data});
      });
    },


    showLanguagesWithFlag(langs) {
      if (typeof langs === "string") {
        langs = _.split(langs, ",");
      }
      return _.filter(this.languages, val => {
        return langs && langs.indexOf(val.key) > -1
      })
    },
  }
}
