<template>
  <code
    class="pa-2"
    v-if="isLocal"
  >
    <slot></slot>
  </code>
</template>

<script>
export default {
  name: "debug",

  computed: {
    isLocal() {
      return process.env.NODE_ENV == "development";
    }
  }
};
</script>

<style scoped>
.code {
  width: auto;
  display: inline-block;
  border: 1px solid #cccccc;
  background-color: #f2f2f2;
}
</style>
