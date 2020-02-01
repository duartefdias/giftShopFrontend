<template>
  <v-container>

    <!--<Searchbar/>-->

    <!--<v-row @click="toggleAdvancedSearch()">
      <v-col>
        <span class="toggle-arrow toggle-row" v-if="!advancedSearch"><v-icon>mdi-arrow-right-drop-circle</v-icon></span>
        <span class="toggle-arrow toggle-row" v-if="advancedSearch"><v-icon>mdi-arrow-down-drop-circle</v-icon></span>
        <span class="toggle-row">Advanced search options</span>
      </v-col>
    </v-row>-->

    <!--<AdvancedSearch v-if="advancedSearch"/>-->
    
    <v-row>
        <v-col xs="12" sm="6" md="4" lg="3">
            <v-select
                :items="filterOptions"
                v-model="filterCriteria"
                @change="getAssets()"
                label="Filter criteria"
                outlined
            ></v-select>
        </v-col>
    </v-row>

    <!-- GRID WITH ITEMS -->
    <v-layout wrap :key="this.updateItems">
      <v-flex v-for="(item, index) in assetList.data" xs12 sm6 md4 lg3 v-bind:key="index">
        <Item v-bind:item="item"/>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item'
//import Searchbar from '@/components/Searchbar'
//import AdvancedSearch from '@/components/AdvancedSearch'

import api from '@/api'

export default {
  name: 'Main',
  components: {
    Item,
    //Searchbar,
    //AdvancedSearch
  },
  data() {
    return {
      advancedSearch: false,
      assetList: [],
      filterOptions: [ 'Random', 'Most popular', 'Cost - lower', 'Cost - higher'],
      filterCriteria: 'Random',
      updateItems: 0
    }
  },
  methods: {
    toggleAdvancedSearch() {
       this.advancedSearch = !this.advancedSearch 
    },

    async getAssets() {
        this.assetList = await api().get('/items/' + this.filterOptions.indexOf(this.filterCriteria))
        this.updateItems++
    }

  },
  created() {
    this.getAssets()
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