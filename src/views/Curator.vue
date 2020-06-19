<!-- TEMPLATE CODE FROM: https://vuejsexamples.com/a-nice-slide-component-with-vue/-->
<template>

  <!-- Tinder slider -->
  <div class="mid-center background">
    <div class="stack-wrapper">
      <!-- Loading icon -->
      <div v-if="!dataLoaded" style="display: flex; width:100%; height:100%">
        <img src="https://i.ya-webdesign.com/images/loading-png-gif.gif" alt="" style="width: 100px; height: 100px; margin: auto">
        <span v-if="productList.length == 0 && dataLoaded" style="width: 100px; height: 100px; margin: auto">Curator database is empty</span>
      </div>
      
      <stack ref="stack" :pages="productList" :stackinit="stackinit"></stack>
    </div>

    <div class="controls">
      <button @click="prev" class="button"><i class="prev"></i><span class="text-hidden">prev</span></button>
      <button @click="changeInfo " class="button"><i class="info"></i><span class="text-hidden">info</span></button>
      <button @click="next" class="button"><i class="next"></i><span class="text-hidden">next</span></button>
    </div>

    <!-- Product edit details form -->
    <v-container v-if="showInfo" :key="updateCurrentProductDetails">

        <v-row>
            <v-col cols="12">
                <h2>Edit item details</h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="12" md="8">
                <v-text-field
                    label="Title"
                    v-model="currentProduct.title"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-textarea
                color="teal"
                v-model="currentProduct.description"
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
            <v-col cols="12" sm="6" md="3">
                <v-text-field
                    label="Price (USA Dollars $)"
                    v-model="currentProduct.price"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="5" md="3">
                <v-text-field
                    label="Category"
                    v-model="currentProduct.category"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="6" md="3" v-for="(thumbnail, index) in currentProduct.imageUrls" v-bind:key="index" class="thumbnail-image-container">
              <img :src="thumbnail" alt="img" class="thumbnail-image" @click="updateImage(thumbnail)">
            </v-col>
        </v-row>

        <!--<v-row>
            <v-col cols="12" sm="12" md="12">
                <v-text-field
                    label="Image URL (include 'http://'!!)"
                    v-model="currentProduct.imageURL"
                ></v-text-field>
            </v-col>
        </v-row>-->

        <!-- <v-btn @click="submit()">Edit item</v-btn> -->

    </v-container>

  </div>
</template>

<script>
import api from '@/api'

import stack from '../components/Stack'
export default {
  el: '#stack',
  data () {
    return {
      someList: [],
      productList: [],
      curatorAuxArray: [],
      stackinit: {
        visible: 3
      },
      currentProduct: {},
      showInfo: false,
      updateCurrentProductDetails: 0,
      dataLoaded: false
    }
  },
  mounted () {
  },
  components: {
    stack
  },
  methods: {
    prev () {
      this.$refs.stack.$emit('prev')
      this.onSwipe()
    },
    next () {
      this.$refs.stack.$emit('next')
      // Add product to items db
      this.insertProductToDb(this.curatorAuxArray[0])
      this.onSwipe()
    },

    onSwipe() {
      // Remove product from curator db
      this.deleteCuratorItem(this.curatorAuxArray[0]._id)
      // Update current product
      if(this.curatorAuxArray.length > 0) {
        this.currentProduct = this.curatorAuxArray[0]
      }
      // Trim title and description
      this.currentProduct.title = this.currentProduct.title.substring(0, 30)
      this.currentProduct.description = this.currentProduct.description.substring(0, 100)
      // Update product details form
      this.updateCurrentProductDetails++
    },

    changeInfo() {
        // Show a form to edit the product's details
        this.currentProduct = this.curatorAuxArray[0]
        this.showInfo = !this.showInfo
      // Update product details form
      this.updateCurrentProductDetails++
    },

    updateImage(imageSrc) {
      this.currentProduct.imageURL = imageSrc
    },

    async getNextProducts() {
      this.productList = await api().get('/curator/')
      this.productList = this.productList.data
      this.curatorAuxArray = this.productList.concat()
      // Update current product
      if(this.curatorAuxArray.length > 0) {
        this.currentProduct = this.curatorAuxArray[0]
      }
      // Trim title and description
      this.currentProduct.title = this.currentProduct.title.substring(0, 30)
      this.currentProduct.description = this.currentProduct.description.substring(0, 100)

      this.dataLoaded = true
    },

    async deleteCuratorItem(itemId) {
      await api().delete('/curator/',
      {
        data: {
          id: itemId
        }
      })
      //console.log('Removed item from local list: ' + this.curatorAuxArray.shift())
      // Remove first element from array
      this.curatorAuxArray.shift()
    },

    async insertProductToDb(product) {
          await api().post('/items/insert', product, {
              headers: {
                  Authorization: this.$store.state.Auth.token
              }
          })
      }
  },
  async created() {
    var currentContext = this
    setTimeout(function () {
      currentContext.getNextProducts()
    }, 2000)
  },
  watch: {
    // Get more products after a few swipes
    'numberOfSwipes': function() {
      if(this.numberOfSwipes == 1) {
        this.updateTemplate++
      }
    }
  }
}
</script>
<style>
.background{
    background-color: #c9c9c975;
    padding-bottom: 30px;
    height: 100%;
}
  .stack-wrapper{
    margin: 0 auto;
    position: relative;
    /*z-index: 1000;*/
    width: 420px;
    height: 500px;
    padding: 0;
    list-style: none;
    pointer-events: none;
    padding-top: 30px;
  }

  .controls{
    position: relative;
    width: 200px;
    text-align: center;
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    justify-content:space-around;
    margin: 0 auto;
    margin-top: 50px
  }
  .controls .button {
    border: none;
    background: none;
    position: relative;
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    width: 50px;
    height: 50px;
    /*z-index: 100;*/
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border-radius: 50%;
    background: #fff;
  }
  .button .next{
    display: inline-block;
    width: 10px;
    height:5px;
    background: rgb(129,212,125);
    line-height: 0;
    font-size:0;
    vertical-align: middle;
    -webkit-transform: rotate(45deg);
    left: -5px;
    top: 2px;
    position: relative;
  }
  .button .next:after{
    content:'/';
    display:block;
    width: 20px;
    height:5px;
    background: rgb(129,212,125);
    -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
  }
  .button .prev{
    display: inline-block;
    width: 20px;
    height:5px;
    background: rgb(230,104,104);
    line-height: 0;
    font-size:0;
    vertical-align: middle;
    -webkit-transform: rotate(45deg);
  }
  .button .prev:after{
    content:'/';
    display:block;
    width: 20px;
    height:5px;
    background: rgb(230,104,104);
    -webkit-transform: rotate(-90deg);
  }
  .button .info{
    display: inline-block;
    width: 20px;
    height:5px;
    background: rgb(88, 115, 160);
    line-height: 0;
    font-size:0;
    vertical-align: middle;
    -webkit-transform: rotate(-90deg);
  }
  .controls .text-hidden {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
    color: transparent;
    display: block;
  }

  .thumbnail-image {
    width: 150px;
  }

  .thumbnail-image-container {
    /*empty*/
  }
</style>