<template>
    <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
            <img class="logo" src="@/assets/giftIcon.png" width="30px" alt="logo">
            <span>That</span>
            <span class="font-weight-light"> Weird Gift</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <router-link v-for="navItem in navBarItems" :to="navItem.path" v-bind:key='navItem.index' 
        class="navItem" @click.native="changeUnderlining(navItem.index)" 
        v-bind:class="{ selected: navItem.index == currentMenuOnDisplay }">
            {{ navItem.title }}
        </router-link>
    </v-app-bar>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                navBarItems: [
                    {
                        title: 'Home',
                        path: '/',
                        index: 1
                    },
                    {
                        title: 'Insert',
                        path: '/insert',
                        index: 2
                    },
                    {
                        title: 'Login',
                        path: '/login',
                        index: 3
                    }
                ],
                currentMenuOnDisplay: 1
            }
        },
        methods: {
            changeUnderlining(newIndex) {
                this.currentMenuOnDisplay = newIndex
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