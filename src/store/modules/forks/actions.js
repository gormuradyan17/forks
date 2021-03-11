const actions = {
    async getForks({commit, state},{search,page}) {
        try {
            console.log(search,page,commit)
            await this.$axios.get(state.forksUrl+`${search}/forks`).then((response) => {
                commit('UPDATE_ERROR',false)

                commit('UPDATE_FORKS',{data:response.data,search})
                commit('UPDATE_PAGE',{page})
            }).catch((e)=>{
                commit('UPDATE_DIALOG',{dialog:true,dialogMessage:e.message},{ root: true })
                commit('UPDATE_ERROR',true)
            })
        }catch (e) {
            //console.log('e',e)
        }

    },

};
export default actions;