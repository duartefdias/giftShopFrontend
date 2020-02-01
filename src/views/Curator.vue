<!-- TEMPLATE CODE FROM: https://vuejsexamples.com/a-nice-slide-component-with-vue/-->
<template>
  <div class="mid-center background">
    <h1>Under construction...</h1>
    <div class="stack-wrapper">
      <stack ref="stack" :pages="someList" :stackinit="stackinit"></stack>
    </div>
    <div class="controls">
      <button @click="prev" class="button"><i class="prev"></i><span class="text-hidden">prev</span></button>
      <button @click="next" class="button"><i class="next"></i><span class="text-hidden">next</span></button>
    </div>
  </div>
</template>
<script>
import stack from '../components/Stack'
export default {
  el: '#stack',
  data () {
    return {
      someList: [],
      stackinit: {
        visible: 3
      }
    }
  },
  mounted () {
    let that = this
    setTimeout(function () {
      that.someList = [
        {
          html: '<img src="https://images-na.ssl-images-amazon.com/images/I/81ItYUEuZxL._SL1500_.jpg" alt="01">'
        },
        {
          html: '<img src="https://images-na.ssl-images-amazon.com/images/I/81DFF-F7Y0L._SL1500_.jpg" alt="02">'
        },
        {
          html: '<img src="https://www.japantrendshop.com/img/village-vanguard/nyanko-charge-cat-head-phone-charger-battery-1.jpg" alt="03">'
        },
        {
          html: '<img src="https://images-na.ssl-images-amazon.com/images/I/71uhMZRFSeL._UL1500_.jpg" alt="04">'
        },
        {
          html: '<img src="https://i.etsystatic.com/7192165/r/il/a5411b/1725253276/il_1588xN.1725253276_firt.jpg" alt="05">'
        },
        {
          html: '<img src="https://ksr-ugc.imgix.net/assets/027/095/623/673169bf96209a024152c63b1cc2019f_original.jpg?ixlib=rb-2.1.0&w=680&fit=max&v=1572942227&auto=format&gif-q=50&q=92&s=280b80337e16d014cb8ba22cefe17ada" alt="06">'
        },
        {
          html: '<img src="src/img/7.png" alt="07">'
        }
      ]
    }, 2000)
  },
  components: {
    stack
  },
  methods: {
    prev () {
      this.$refs.stack.$emit('prev')
    },
    next () {
      this.$refs.stack.$emit('next')
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
    width: 320px;
    height: 320px;
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