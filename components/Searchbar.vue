<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="10">
            <v-text-field
                label="Solo"
                solo
                placeholder="Search item..."
                v-model="singleSearchString"
                @input="updateStore()"
                v-on:keyup.enter="simpleSearch()"
             ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Searchbar',
        components: {
            
        },
        data() {
            return {
                singleSearchString: ''
            }
        },
        methods: {
            simpleSearch() {
                //console.log('Search!')
            },
            updateStore() {
                this.$store.state.singleSearch = this.singleSearchString
                //console.log(this.$store.state.singleSearch)
            },
            getSimpleSearchString() {
                this.singleSearchString = this.$store.state.singleSearch
            }
        },
        created() {
            this.getSimpleSearchString()
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