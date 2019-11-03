<template>
    <v-row justify="center">
        <v-col cols="12" sm="6" md="8">
            <v-text-field
                full-width
                label="Solo"
                solo
                placeholder="Search item..."
             ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Searchbar',
        components: {
            
        }
    }
</script>

<style>

    .searchbar {
        height: 50px;
        width: 500px;
        background-color: green;
    }

</style>