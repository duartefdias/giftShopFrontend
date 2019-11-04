<template>
  <v-container>

    <Searchbar/>

    <v-row @click="toggleAdvancedSearch()">
      <v-col>
        <span class="toggle-arrow toggle-row" v-if="!advancedSearch"><v-icon>mdi-arrow-right-drop-circle</v-icon></span>
        <span class="toggle-arrow toggle-row" v-if="advancedSearch"><v-icon>mdi-arrow-down-drop-circle</v-icon></span>
        <span class="toggle-row">Advanced search options</span>
      </v-col>
    </v-row>

    <AdvancedSearch v-if="advancedSearch"/>

    <v-layout wrap>
      <v-flex xs12 sm6 md4 lg3>
        <Item/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <Item/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <Item/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <Item/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <Item/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <Item/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item'
import Searchbar from '@/components/Searchbar'
import AdvancedSearch from '@/components/AdvancedSearch'

export default {
  name: 'main',
  components: {
    Item,
    Searchbar,
    AdvancedSearch
  },
  data() {
    return {
      advancedSearch: false
    }
  },
  methods: {
    toggleAdvancedSearch() { this.advancedSearch = !this.advancedSearch }
  }
}
</script>

<style scoped>

  .toggle-row {
    cursor: pointer;
  }

  .toggle-arrow {
    margin: 0 5px 0 0;
  }

</style>