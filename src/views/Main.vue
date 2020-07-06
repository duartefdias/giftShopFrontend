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
                @change="getAssets(true)"
                label="Filter criteria"
                outlined
            ></v-select>
        </v-col>

        <v-col xs="12" sm="6" md="4" lg="3">
            <v-select
                :items="categoryOptions"
                v-model="categoryFilter"
                @change="getAssets(true)"
                label="Category"
                outlined
            ></v-select>
        </v-col>
    </v-row>

    <!-- GRID WITH ITEMS -->
    <v-row wrap :key="this.updateItems">
      <v-col v-for="(item, index) in assetList" cols="12" xs="12" sm="6" md="4" lg="3" v-bind:key="index">
        <div class="card-container">
          <button v-if="userLoggedIn" v-on:click="deleteItem(item._id)" class="delete-button">&#10006;</button>
          <Item v-bind:item="item"/>
        </div>
      </v-col>
    </v-row>

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
      categoryOptions: ['', 'tech', 'weird', 'food', 'pets', 'clothing', 'books', 'man', 'woman', 'boy', 'girl'],
      categoryFilter: '',
      updateItems: 0,
      userLoggedIn: this.$store.getters.isLoggedIn,
      currentPage: 0
    }
  },
  methods: {
    toggleAdvancedSearch() {
      this.advancedSearch = !this.advancedSearch 
    },

    async getAssets(resetList = false) {
      if(resetList) {
        this.assetList = []
        this.currentPage = 0
      }
      var fetchedItems = await api().get('/items/' + this.filterOptions.indexOf(this.filterCriteria) + '/' + this.currentPage + '/' + this.categoryFilter)
      this.assetList.push(...fetchedItems.data)
      this.updateItems++
    },

    toggleDelete() {
      if (this.$store.getters.isLoggedIn) {
        this.userLoggedIn = true
      }
      else {
        this.userLoggedIn = false
      }
      this.updateItems++
    },

    async deleteItem(itemId) {
      if(confirm('Delete item?')){
        await api().delete('/items/',
        {
          headers: {
            Authorization: this.$store.state.Auth.token
          },
          data: {
            _id: itemId
          }
        })
        // Remove from local array
        this.assetList.splice(this.assetList.findIndex(item => item._id === itemId), 1)
        // Update local array
        this.updateItems++
      }
    }

  },
  created() {
    this.getAssets()
  },
  mounted() {
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        // Fetch more items once end of page is reached
        this.currentPage++
        this.getAssets()
      }
    }
  },
  watch: {
            // Enable delete mode if logged in
            '$store.getters.isLoggedIn': function() {
                this.toggleDelete()
            }
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

  .card-container {
    overflow: visible;
  }

  .delete-button {
    transition: all 0.5s ease;
    position: absolute;
    background-color: #FF9980;
    padding: 1.5px 7px;
    border-radius: 50%;
    border: 2px solid #fff;
    color: white;
    -webkit-box-shadow: -4px -2px 6px 0px rgba(0,0,0,0.1);
    -moz-box-shadow: -4px -2px 6px 0px rgba(0,0,0,0.1);
    box-shadow: -3px 1px 6px 0px rgba(0,0,0,0.1);
    z-index: 2;
}

.delete-button:hover {
    background-color: tomato;
    color: #fff;
}

</style>