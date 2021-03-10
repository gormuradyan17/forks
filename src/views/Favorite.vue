<template>
    <v-card
            max-width="80%"
            class="mx-auto"
    >


        <v-container>
            <v-row dense>

                <v-col

                        v-for="(item, i) in favorites"
                        :key="i"
                        cols="12"
                >
                    <v-card
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title
                                        class="headline"
                                        v-text="item.owner"
                                ></v-card-title>

                                <v-card-subtitle v-text="item.full_name "></v-card-subtitle>
                                <v-card-text>
                                    <v-rating
                                            v-model="item.stargazers_count"
                                            background-color="orange lighten-3"
                                            color="orange"
                                            large
                                    ></v-rating>
                                </v-card-text>
                                <v-card-actions>
                                    <a :href="item.html_url" target="_blank">{{item.html_url}}</a>
                                </v-card-actions>
                            </div>


                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
    export default {
        data() {
            return {
                favorites: []
            }
        },
        async created() {
            if (localStorage.getItem('favorite_id')) {
                await this.$store.dispatch('favoriteModule/getFavoriteById', JSON.parse(localStorage.getItem('favorite_id')));
                this.favorites = this.$store.state.favoriteModule.favorites.user.favoriteForks
            }
        }
    }
</script>