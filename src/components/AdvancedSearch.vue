<template>
    <v-container class="advanced-search-container">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="10">
                <v-text-field
                    label="Solo"
                    solo
                    placeholder="Title"
                    v-model="advancedSearchParams.title"
                    @input="updateStore()"
                    v-on:keyup.enter="advancedSearch()"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row justify="center" align="center">
            <v-col cols="12" sm="3" md="4">
                <h3>Price range ($)</h3>
            </v-col>
            <v-col cols="12" sm="3" md="3">
                <v-text-field
                    label="Minimum"
                    solo
                    v-model="advancedSearchParams.price[0]"
                    @input="updateStore()"
                    v-on:keyup.enter="advancedSearch()"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" md="3">
                <v-text-field
                    label="Maximum"
                    solo
                    v-model="advancedSearchParams.price[1]"
                    @input="updateStore()"
                    v-on:keyup.enter="advancedSearch()"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="4" md="3" offset-sm="2" offset-md="1">
                <v-btn @click="advancedSearch()">Search</v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: 'Searchbar',
        components: {
            
        },
        data() {
            return {
                advancedSearchParams: {
                    title: '',
                    price: [null, null]
                }
            }
        },
        methods: {
            advancedSearch() {
                //console.log('Advanced search!')
            },
            updateStore() {
                this.$store.state.advancedSearch = this.advancedSearchParams
                //console.log(this.$store.state.advancedSearch)
            },
            getAdvancedSearchParams() {
                this.advancedSearchParams = this.$store.state.advancedSearch
            }
        },
        created() {
            this.getAdvancedSearchParams()
            this.advancedSearchParams = {
                    title: '',
                    price: [null, null]
                }
        }
    }
</script>

<style>

    .advanced-search-container {
        background-color: beige;
        border-radius: 3px;
    }

</style>