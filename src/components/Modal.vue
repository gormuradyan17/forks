<template>
    <v-dialog
            v-model="$store.state.dialog"
            persistent
            max-width="290"
            :retain-focus="false"
    >

        <v-card>
            <v-card-title class="headline">
               {{$store.state.dialogMessage}}
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        text
                        @click="handlerClose"
                >
                    ok
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        props:['dialog'],
        methods:{
            handlerClose(){
                this.$store.commit('UPDATE_DIALOG',{dialog:false,dialogMessage:''})
            }
        }
    }
</script>