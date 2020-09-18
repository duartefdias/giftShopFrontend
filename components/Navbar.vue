<template>
    <v-app-bar app fixed>
        <v-toolbar-title class="headline text-uppercase">
            <img class="logo" src="@/assets/giftIcon.png" width="30px" alt="logo">
            <span>That</span>
            <span class="font-weight-light"> Weird Gift</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <nuxt-link v-for="navItem in navBarItems" :to="navItem.path" v-bind:key='navItem.index' 
        class="navItem" @click.native="changeUnderlining(navItem.index)" 
        v-bind:class="{ selected: navItem.index == currentMenuOnDisplay }">
            {{ navItem.title }}
        </nuxt-link>
    </v-app-bar>
</template>

<script>

    export default {
        name: 'Navbar',
        data() {
            return {
                navBarItems: [],
                currentMenuOnDisplay: 1,
                userNavBar: [
                    {
                        title: 'Home',
                        path: '/',
                        index: 1
                    },
                    {
                        title: 'Manage',
                        path: '/manage',
                        index: 2
                    },
                    {
                        title: 'Insert',
                        path: '/insert',
                        index: 3
                    },
                    {
                        title: 'Curator',
                        path: '/curator',
                        index: 4
                    },
                    {
                        title: 'Logout',
                        path: '/logout',
                        index: 5
                    }
                ],
                visitorNavBar: [
                    {
                        title: 'Home',
                        path: '/',
                        index: 1
                    },
                    {
                        title: 'Login',
                        path: '/login',
                        index: 2
                    }
                ]
            }
        },
        created() {
            this.updateNavBarItems()
        },
        methods: {
            changeUnderlining(newIndex) {
                this.currentMenuOnDisplay = newIndex
            },
            updateNavBarItems() {
                if(this.$store.state.auth.token/*this.$store.getters.isLoggedIn*/) {
                    this.navBarItems = this.userNavBar
                }
                else {
                    this.navBarItems = this.visitorNavBar
                }
            }
        },
        computed: {
            isLoggedIn () {
                return this.$store.state.auth.token
            }
        },
        watch: {
            // Change navbar items if user is authenticated
            isLoggedIn: function() {
                console.log('watcher triggeredddd')
                this.updateNavBarItems()
            }
        }
    }
</script>

<style scoped>

    .logo {
        margin: 0 10px 0 0;
    }
    .navItem {
        margin-right: 25px;
        text-decoration: none;
        color: black;
    }
    .selected {
        color: grey;
    }

</style>