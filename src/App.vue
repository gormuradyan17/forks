<template>

    <v-app>
        <v-card height="80px">
            <v-app-bar
                    absolute
                    color="blue"
                    height="80px"
                    dark
                    shrink-on-scroll

                    scroll-target="#scrolling-techniques-2"
            >


                <v-spacer></v-spacer>
                <v-text-field
                        v-if="searchActive"
                        v-model="search"
                        v-on:input="checkHandler"
                        label="Search"
                        outlined
                        :error="pathError"

                        clearable
                ></v-text-field>
                <v-btn icon
                       :disabled="dis"
                       @click="searchHandler">
                    <v-icon>search</v-icon>
                </v-btn>

                <router-link to="/favorite">
                    <v-btn icon>
                        <v-icon>favorite</v-icon>
                    </v-btn>
                </router-link>


            </v-app-bar>
        </v-card>
        <!-- Sizes your content based upon application components -->
        <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <Modal />

                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
            <!-- -->

        </v-footer>
    </v-app>
</template>

<script>
    import Modal from './components/Modal'

    export default {
        name: 'App',
        components:{
            Modal
        },
        data() {
            return {
                searchActive: true,
                pathError: false,
                search: '',
                dis:true
            }
        },
        methods: {
            handleOpenSearch() {
                this.searchActive = !this.searchActive;
            },
            checkHandler() {
                this.pathError = true;
                let pattern = /\w+\/\w+/g;
                if (this.search.search(pattern) === 0) {
                    this.pathError = false;
                    this.dis = false;
                }

            },
            async searchHandler() {
                await this.$store.dispatch('forksModule/getForks', {search: this.search, page: 1});
                await this.$router.push({
                    name: 'Search',
                    query: {page: 1, repository: this.$store.state.forksModule.search}
                });
            }
        },
        created() {

        }

    }
</script>

