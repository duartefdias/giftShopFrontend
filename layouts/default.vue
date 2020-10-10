<template>
  <v-app>
    <Navbar/>
      <v-main style="/*background-color: #77A6F7;*/">
        <nuxt />
      </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
    }
  }
}
</script>