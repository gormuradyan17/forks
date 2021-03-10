import firebase from 'firebase/app'

const actions = {
    async createFavorite({commit, state},data) {
        try {
            console.log(commit, state)
             if(!localStorage.getItem('favorite_id')){
                 const favorite = await firebase.database().ref(`/favorites`).push(data);
                 localStorage.setItem('favorite_id',JSON.stringify(favorite.key))
             }
        }catch (e) {
            console.log(e)
        }

    },
    async updatedFavorite({commit, state},{userData}){
        console.log(commit, state)

        await firebase.database().ref(`/favorites`).child(userData.id).update(userData)
    },
    async getFavoriteById({commit, state},id) {
        try {
            console.log(commit)
            console.log(state)
            const favorite = (await firebase.database().ref(`/favorites`).child(id).once('value')).val() || {};
            commit('GET_FAVORITES',favorite)
            return {...favorite, id}

        }catch (e) {
            console.log(e)
        }

    }

};
export default actions;