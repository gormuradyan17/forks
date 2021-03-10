const mutations={
    UPDATE_FORKS(state,payload){
        state.search=payload.search;
        state.forks=payload.data?payload.data:[];
    },
    UPDATE_PAGE(state,payload){
        state.page=payload.page;

    },


};

export default mutations;