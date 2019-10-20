import * as types from './action-types';
// import cities from '@/a/ssets/cities.js';

export default {
  state: {
    address: {
      cityName: '广州',
      city: 1292,
      province: 29
    }
  },
  actions: {
    updateAddress({ commit }, address) {

      commit(types.UPDATE_ADDRESS, address);
    }
  },
  mutations: {
    [types.UPDATE_ADDRESS](state, address) {
      state.address = address;
    }
  }
};
