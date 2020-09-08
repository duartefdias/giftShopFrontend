<template>
  <v-app>
    <Navbar/>
    
    <v-content style="background-color: #EAE7DC">
      <router-view></router-view>
    </v-content>

    <Footer/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import store from '@/store/index'

export default {
  name: 'App',
  store,
  components: {
    Navbar,
    Footer
  },
  data: () => ({
    //
  }),
};
</script>
