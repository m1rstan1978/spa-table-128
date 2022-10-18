export default {
    state: {
        listDistance:[]
  },
  getters: {
    allList(state){
        return state.listDistance
    }
  },
  mutations: {
    updateList(state,listDistance) {
        state.listDistance = listDistance
    }
  },
  actions: {
   async getList(ctx){
        const res = await fetch('http://localhost:3030/user')
        const list = await res.json() 
        ctx.commit('updateList',list)
    }
  },
}