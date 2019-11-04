<template>
    <v-container>
        <v-card hover>

            <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            />

            <v-card-subtitle class="pb-0">Item name</v-card-subtitle>

            <v-card-text class="text--primary">
                <div>Item description</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'Item',
        props: ['id'],
        components: {
            
        }
    }
</script>

<style>

</style>