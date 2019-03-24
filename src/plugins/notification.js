import Notifications from 'vue-notification'
import Vue from "vue";
import {makeTreeJSON} from '../../common/gun.export'

Vue.use(Notifications);

window.makeTreeJSON = makeTreeJSON;
