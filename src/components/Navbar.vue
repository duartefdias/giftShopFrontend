<template>
    <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
            <img src="@/assets/giftIcon.png" width="30px" alt="logo">
            <span>That</span>
            <span class="font-weight-light"> Weird Gift</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            text
            href="/"
            target="_blank"
        >
            <span class="mr-2">Home</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: 'Navbar',
        components: {
            
        }
    }
</script>