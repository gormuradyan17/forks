import { axios } from '@/plugins/axios'
import Vue from 'vue'
import Vuex from 'vuex'
import forksModule from './modules/forks/forksModule'
import favoriteModule from './modules/favorite/favoriteModule'

Vue.use(Vuex);
const axiosPlugin = store => {
    store.$axios = axios
}

export default new Vuex.Store({
    state: {
        dialog:false,
        dialogMessage:''
    },
    mutations: {
        UPDATE_DIALOG(state,payload){
            state.dialog=payload.dialog;
            state.dialogMessage=payload.dialogMessage;
        }
    },
    actions: {
    },
    modules: {
        forksModule,
        favoriteModule
    },
    plugins: [axiosPlugin]
})
