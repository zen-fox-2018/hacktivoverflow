<template>
    <v-toolbar light color="light" style="z-index: 10;">
        <v-toolbar-items> <img style="max-width: 80px;" src="../assets/logo.png"> </v-toolbar-items>
        <v-toolbar-title class="dark--text"><router-link to="/">YOUNGFOX<span style="color: #FF8800;">OVERFLOW</span></router-link></v-toolbar-title>

        <v-spacer></v-spacer>

        <v-slide-x-reverse-transition>
            <v-tooltip
            v-if="display"
            left
            >
                <v-text-field style="color: black;"
                    light
                    background-color="#ffb159"
                    slot="activator"
                    append-icon="mic"
                    label="Search"
                    prepend-inner-icon="search"
                    solo-inverted
                >
                </v-text-field>
            </v-tooltip>
        </v-slide-x-reverse-transition>
        <v-btn icon @click="display = !display" color="warning">
            <v-icon>search</v-icon>
        </v-btn>
        <v-menu left offset-y>
            <v-btn icon  slot="activator" color="warning">
                <v-icon>face</v-icon>
            </v-btn>
            <v-list v-if="!isLogin">
                <v-list-tile> 
                    <v-btn flat small to="/users/login">Login</v-btn> 
                </v-list-tile>
                <v-list-tile> 
                    <v-btn flat small to="/users/register">Register</v-btn>
                </v-list-tile>
            </v-list>
            <v-list v-else>
                <v-list-tile> 
                    <v-btn flat small to="/">Profile</v-btn> 
                </v-list-tile>
                <v-list-tile> 
                    <v-btn flat @click.prevent="handleLogout" small to="/users/login">Logout</v-btn>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {
    mounted() {
        this.checkLogin()
    },
    computed: {
       ...mapState([
           'isLogin'
       ])
    },
    data() {
        return {
            display : false
        }
    },
    methods: {
        ...mapActions([
            'checkLogin',
            'doLogout'
        ]),
        handleLogout (){
            this.doLogout()
        }
    },
}
</script>

<style>

</style>
