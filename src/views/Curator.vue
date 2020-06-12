<!-- TEMPLATE CODE FROM: https://vuejsexamples.com/a-nice-slide-component-with-vue/-->
<template>
  <div class="mid-center background">
    <div class="stack-wrapper">
      <stack ref="stack" :pages="productList" :stackinit="stackinit"></stack>
    </div>
    <div class="controls">
      <button @click="prev" class="button"><i class="prev"></i><span class="text-hidden">prev</span></button>
      <button @click="next" class="button"><i class="next"></i><span class="text-hidden">next</span></button>
    </div>
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
      }
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
      // Remove product from curator db
      this.deleteCuratorItem(this.curatorAuxArray[0]._id)
    },
    next () {
      this.$refs.stack.$emit('next')
      // Add product to items db
      this.insertProductToDb(this.curatorAuxArray[0])
      // Remove product from curator db
      this.deleteCuratorItem(this.curatorAuxArray[0]._id)
    },

    async getNextProducts() {
      this.productList = await api().get('/curator/')
      this.productList = this.productList.data
      this.curatorAuxArray = this.productList.concat()
    },

    async deleteCuratorItem(itemId) {
      await api().delete('/curator/',
      {
        data: {
          id: itemId
        }
      })
      console.log('Removed item from local list: ' + this.curatorAuxArray.shift())
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
    background-color: #565f77;
    padding-bottom: 30px;
}
  .stack-wrapper{
    margin: 0 auto;
    position: relative;
    z-index: 1000;
    width: 420px;
    height: 470px;
    padding: 0;
    list-style: none;
    pointer-events: none;
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
    z-index: 100;
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
  .controls .text-hidden {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
    color: transparent;
    display: block;
}
</style>