import * as types from './action-types';

const initialState = {
  // TODO: 从接口获取已经关注的标签
  watchedTags: []
};

export default {
  state: initialState,
  actions: {
    toggleTag({ commit, state }, tag) {
      let tagIndex = -1;
      const BreakException = {};
      // 找到后跳出循环
      try {
        state.watchedTags.forEach((wt, index) => {
          if (wt.name === tag.name) {
            tagIndex = index;
            throw BreakException;
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }
      // 已经关注
      if (tagIndex >= 0) {
        commit(types.DELETETAG, tagIndex);
      } else {
        commit(types.ADDTAG, tag);
      }
    }
  },
  mutations: {
    [types.ADDTAG](state, tag) {
      state.watchedTags.push(tag);
    },
    [types.DELETETAG](state, index) {
      state.watchedTags.splice(index, 1);
    }
  }
};
