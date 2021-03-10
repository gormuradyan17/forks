<template>
    <div>
        <ForksList/>
    </div>
</template>

<script>
    import ForksList from '@/components/ForksList'
    export default {
        components:{ForksList},
        methods: {},
        created() {

        },
        mounted(){
            if(this.$route.query.repository){
                let page = this.$route.query.page?parseInt(this.$route.query.page):this.$store.state.forksModule.page;
               // this.$store.commit('forksModule/UPDATE_PAGE',{page:page});
                this.$store.dispatch('forksModule/getForks',{search:this.$route.query.repository,page}).then(()=>{

                })

            }else{
                this.$router.push({
                    name: 'Home',
                })
            }
        }

    }
</script>