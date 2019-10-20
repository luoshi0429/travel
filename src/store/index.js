import Vue from 'vue';
import Vuex from 'vuex';
import tag from './tag';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    tag,
    user
  }
});
