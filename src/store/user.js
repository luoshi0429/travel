import * as types from './action-types';
// import cities from '@/assets/cities.js';

export default {
  state: {
    uid: '',
    isWeixin: false,
    address: {
      // name: '广州',
      // cityId: 1292,
      // provinceId: 29
    },
    selectedAddress: {},
    info: {}
  },
  actions: {
    updateAddress({ commit }, address) {
      console.info('-----', address);
      commit(types.UPDATE_ADDRESS, address);
      commit(types.SET_CURRENT_ADDRESS, address);
    },
    saveUid({ commit }, uid) {
      commit(types.SAVE_UID, uid);
    },
    setSelectedAddress({ commit }, address) {
      commit(types.SET_CURRENT_ADDRESS, address);
    }
  },
  mutations: {
    [types.UPDATE_ADDRESS](state, address) {
      state.address = address;
    },
    [types.SAVE_UID](state, uid) {
      state.uid = uid;
    },
    setIsWeixin(state, isWeixin) {
      state.isWeixin = isWeixin;
    },
    setUserInfo(state, info) {
      state.info = info;
    },
    [types.SET_CURRENT_ADDRESS](state, address) {
      state.selectedAddress = address;
    }
  }
};
