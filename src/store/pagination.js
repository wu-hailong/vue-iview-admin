
let { pageNo, pageSize } = { pageSize : 5 , pageNo : 1 }

const state = {
  pageNo,
  pageSize
}

const mutations={
  setPage(state ,{ pageNo,pageSize }){
      state.pageNo = pageNo
      state.pageSize = pageSize
  }
}

const actions = {
  savePage({commit},payload){
    commit("setPage",payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}