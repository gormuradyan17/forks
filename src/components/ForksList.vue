<template>
    <div>
        <v-data-table
                :headers="headers"
                :hide-default-header="false"
                :hide-default-footer="false"
                @pagination="paginationHandler"
                :items="$store.state.forksModule.forks"
                :items-per-page="1"
                :page="$store.state.forksModule.page"
                class="elevation-1"
        >

            <template #body="data">
                <tbody>
            <tr  v-for="item in data.items"  :key="item.id">
                <td >{{item.id}}</td>
                <td >{{item.full_name}}</td>
                <td > {{ item.owner.login }}</td>
                <td >
                    <v-rating
                            v-model="item.stargazers_count"
                            background-color="orange lighten-3"
                            color="orange"
                            large
                    ></v-rating>
                    </td>
                <td >  <a :href="item.html_url" target="_blank">{{item.html_url}}</a></td>
                <td >
                    <v-icon @click="followHandler" ref="favorite" :item="item">favorite</v-icon>
                </td>
            </tr>
                </tbody>
            </template>
            <template v-slot:top="{ pagination, options, updateOptions }">
                <v-data-footer
                        :pagination="pagination"
                        :options="options"
                        @update:options="updateOptions"
                        items-per-page-text="$vuetify.dataTable.itemsPerPageText">
                    {{pagination}}
                    {{options}}
                    {{updateOptions}}

                </v-data-footer>
            </template>
            <template #footer.page-text="props">
                {{props.pageStart}}-{{props.pageStop}} of ~{{props.itemsLength}}
            </template>
        </v-data-table>
        <Modal />
    </div>

</template>
<script>
import Modal from '../components/Modal'
    export default {
    components:{
        Modal
    },
        data() {
            return {
                dialog:true,
                pagination: {},
                options: {

                },
                userId:1,
                updateOptions: {},
                headers: [
                    {
                        text: '#',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text: 'полное название репозитория',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text: 'владелец',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text: ' количестов звезд',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text: 'ссылка на репозиторий форка',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text: 'закладки',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },

                ],
            }
        },

        methods: {
            paginationHandler(data) {

                if(this.$route.query.page!==data.page && this.$store.state.forksModule.page!==data.page){
                    this.$store.commit('forksModule/UPDATE_PAGE',{page:data.page});
                    this.$router.push({
                        name: 'Search',
                        query: {page: data.page, repository: this.$route.query.repository}
                    })
                }


            },
            followHandler(){
                const item=this.$refs['favorite'][0].$attrs.item;
                if(!localStorage.getItem('favorite_id')) {
                    const data = {
                        user: {
                            id: this.userId,
                            favoriteForks: [
                                {
                                    forks_id:item.id,
                                    owner:item.owner.login,
                                    full_name:item.full_name,
                                    stargazers_count:item.stargazers_count,
                                    html_url:item.html_url,
                                }
                            ]
                        }
                    };
                    this.$store.dispatch('favoriteModule/createFavorite', data).then(()=>{
                        this.$store.commit('UPDATE_DIALOG',{dialog:true,dialogMessage:'Успешно добавлен'})
                    })
                } else{
                    const fork={
                        forks_id:item.id,
                        owner:item.owner.login,
                        full_name:item.full_name,
                        stargazers_count:item.stargazers_count,
                        html_url:item.html_url,

                    };
                    this.$store.dispatch('favoriteModule/getFavoriteById',JSON.parse(localStorage.getItem('favorite_id'))).then((userData)=>{
                        if(!userData.user.favoriteForks.some(forks => forks.forks_id === item.id)){

                            userData.user.favoriteForks.push(fork)
                        }
                        this.$store.dispatch('favoriteModule/updatedFavorite',{userData}).then(()=>{
                            this.$store.commit('UPDATE_DIALOG',{dialog:true,dialogMessage:'Успешно добавлен'})
                        })
                    })


                }

            }
        },
        computed: {

        },

         created() {

         }
    }
</script>
<style>
    .v-data-footer__select{
        display: none!important;
    }
</style>