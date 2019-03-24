import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/flags";
import "./plugins/validation";
import "./plugins/notification";
import "./plugins/filters";
import App from "./App.vue";
import { nope } from "@/utils/utils";
import Gun from "gun/gun";
import "gun/lib/path";
import VueGun from "vue-gun";
import router from "./router";
import _ from "lodash";
import Debug from "./components/TDebug.vue";

window._ = _;

require("gun/sea");
require("gun/lib/unset");

Vue.config.productionTip = false;
Vue.prototype.nope = nope;
Vue.prototype._ = _;

const debug = require("debug");
if (process.env.NODE_ENV === "development") {
  debug.enable("-sockjs*,-engine.io*,*");
}

const gun = Gun("http://localhost:8765/gun");
window.gun = gun;

Vue.use(VueGun, {
  gun: gun
});

Vue.component("debug", Debug);

const $vue = new Vue({
  router,
  render: h => h(App)
});

setTimeout(() => {
  $vue.$mount("#app");
}, 500);


