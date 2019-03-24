import Vue from 'vue'


Vue.filter('repeat', (val, param) => {
  console.log(
    val, param
  );

  return ''
});
