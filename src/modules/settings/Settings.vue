<template>
  <v-container>
    <v-layout row wrap>

      <v-flex xs12>
        <p class="title">Languages</p>

        <languages></languages>
      </v-flex>
      <!--
          <v-flex xs12 sm6>
            <p class="title">Status translated of projects</p>
            ...
          </v-flex> -->
    </v-layout>
  </v-container>
</template>


<script>
  import languages from "./languages.vue";

  export default {
    components: {languages}
  };
</script>
