const mutations={
    UPDATE_FORKS(state,payload){
        state.search=payload.search;
        state.forks=payload.data?payload.data:[];
    },
    UPDATE_PAGE(state,payload){
        state.page=payload.page;

    },
    UPDATE_ERROR(state,payload){
        state.forkError=payload;

    }

};

export default mutations;