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
                solo
            ></v-select>
        </v-col>

        <v-col xs="12" sm="6" md="4" lg="3">
            <v-select
                :items="categoryOptions"
                v-model="categoryFilter"
                @change="getAssets(true)"
                label="Category"
                solo
            ></v-select>
        </v-col>
    </v-row>

    <!-- GRID WITH ITEMS -->
    <v-row wrap :key="this.updateItems">
      <v-col v-for="(item, index) in assetList" cols="12" xs="12" sm="6" md="4" lg="3" v-bind:key="index">
        <div class="card-container">
          <div v-if="userLoggedIn" class="click-counter">{{item.clicks}}</div>
          <button v-if="userLoggedIn" v-on:click="editButtonClicked(item)" class="edit-button">i</button>
          <button v-if="userLoggedIn" v-on:click="deleteItem(item._id)" class="delete-button">&#10006;</button>
          <Item v-bind:item="item"/>
        </div>
      </v-col>
    </v-row>

    <!-- EDIT MODAL -->
    <v-dialog v-model="dialog" width="80%">
      <v-card>

        <v-card-title>

        </v-card-title>

        <v-card-text>
          
          <v-row align="center" justify="center">
            <!-- FORM COL -->
            <v-col>

              <v-row>
                  <v-col cols="12">
                      <v-text-field
                          label="Title"
                          v-model="editAsset.title"
                      ></v-text-field>
                  </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12">
                      <v-text-field
                          label="Image URL (include 'http://'!!)"
                          v-model="editAsset.imageURL"
                      ></v-text-field>
                  </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12">
                      <v-textarea
                      color="teal"
                      v-model="editAsset.description"
                      >
                      <template v-slot:label>
                          <div>
                          Description <small>(optional)</small>
                          </div>
                      </template>
                      </v-textarea>
                  </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12">
                      <v-text-field
                          label="Amazon affiliate link (include 'http://'!!)"
                          v-model="editAsset.affiliateLink"
                      ></v-text-field>
                  </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12">
                      <v-text-field
                          label="Price (USA Dollars $)"
                          v-model="editAsset.price"
                      ></v-text-field>
                  </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12">
                      <v-select
                      :items="categoryOptions"
                      label="Category"
                      v-model="editAsset.category"
                      ></v-select>
                  </v-col>
              </v-row>

              <v-btn @click="editItem()" color="primary">Update item</v-btn>
              <v-btn @click="dialog = false" color="error" style="margin-left: 10px;">Close</v-btn>

            </v-col>

            <!-- ITEM CARD COL -->
            <v-col>

              <v-row>
                  <v-col cols="12">
                      <Item v-bind:item="editAsset"/>
                  </v-col>
              </v-row>

              <v-row style="margin-bottom: 20px;">
                <span>Date created: {{editAsset.createtime}} (UTC)</span>
              </v-row>

              <v-row style="margin-bottom: 40px;">
                <span>Last updated: 
                    <span v-if="editAsset.lastupdate">{{editAsset.lastupdate}}</span>
                    <span v-else>Record not yet updated</span>
                </span>
              </v-row>

              <v-row justify="center" style="margin-bottom: 20px;">
                <span>Clicks:</span>
              </v-row>

              <v-row justify="center" style="font-size: 20px; ">
                <span>{{editAsset.clicks}}</span>
              </v-row>

            </v-col>

          </v-row>

        </v-card-text>

      </v-card>
    </v-dialog>

    <infinite-loading 
      v-if="assetList.length"
      spinner="spiral"
      @infinite="infiniteScroll"
    >
      <div slot="no-more">No more items...</div>
    </infinite-loading>

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
      filterOptions: [ 'Most recent', 'Most popular', 'Cost - lower', 'Cost - higher'],
      filterCriteria: 'Most recent',
      categoryOptions: this.$store.state.items.categories,
      categoryFilter: '',
      updateItems: 0,
      userLoggedIn: this.$store.getters['auth/isLoggedIn'],
      currentPage: 0,
      dialog: false,
      editAsset: {
            title: '',
            imageURL: '',
            description: '',
            affiliateLink: '',
            category: '',
            price: '',
            clicks: 0,
            createtime: '',
            lastupdate: ''
        }
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
            Authorization: this.$store.state.auth.token
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
    },

    editButtonClicked(item) {
      this.editAsset = item
      this.dialog = !this.dialog
    },

    async editItem() {
      // Api call
      await api().put('items/', this.editAsset,
      {
        headers: {
            Authorization: this.$store.state.auth.token
          },
      })
      alert('Item updated!')
      this.dialog = false
      // Update item in front-end automatically
      this.assetList[this.assetList.findIndex(x => x._id == this.editAsset._id)] = this.editAsset
      // Update local array
        this.updateItems++
    },

    // Third party infinite scroll - see definition in src/plugins
    infiniteScroll($state) {
      setTimeout(() => {
      this.currentPage++
      api().get('/items/' + this.filterOptions.indexOf(this.filterCriteria) + '/' + this.currentPage + '/' + this.categoryFilter)

      .then((response) => {
        if (response.data.length > 1) {
          response.data.forEach((item) => this.assetList.push(item))
          $state.loaded()
        } else {
          $state.complete()
        }
      }).catch((err) => {console.log(err)})
    }, 500)

    }

  },
  created() {
    this.getAssets()
  },
  mounted() {
    /*window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        // Fetch more items once end of page is reached
        this.currentPage++
        this.getAssets()
      }
    }*/
  },
  watch: {
            // Enable delete mode if logged in
            '$store.getters.isLoggedIn': function() {
                this.toggleDelete()
            }
        },

  computed: {
    /*userLoggedIn () {
      return this.$store.getters['auth/isLoggedIn']
    }*/
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
    margin: 0 0 0 260px;
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

.edit-button {
  margin: 0 0 0 220px;
  transition: all 0.5s ease;
  position: absolute;
  background-color: #83a0e0;
  padding: 1.5px 11px;
  border-radius: 50%;
  border: 2px solid #fff;
  color: white;
  -webkit-box-shadow: -4px -2px 6px 0px rgba(0,0,0,0.1);
  -moz-box-shadow: -4px -2px 6px 0px rgba(0,0,0,0.1);
  box-shadow: -3px 1px 6px 0px rgba(0,0,0,0.1);
  z-index: 2;
}

.edit-button:hover {
  background-color: #7993cc;
  color: #fff;
}

.click-counter {
  margin: 0 0 0 20px;
  transition: all 0.5s ease;
  position: absolute;
  background-color: #83a0e0;
  padding: 1.5px 25px;
  border: 2px solid #fff;
  color: white;
  -webkit-box-shadow: -4px -2px 6px 0px rgba(0,0,0,0.1);
  -moz-box-shadow: -4px -2px 6px 0px rgba(0,0,0,0.1);
  box-shadow: -3px 1px 6px 0px rgba(0,0,0,0.1);
  z-index: 2;
}

</style>