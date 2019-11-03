<template>
  <v-container>
    <v-layout justify-center align-center>
      <Searchbar/>
    </v-layout>
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

export default {
  name: 'main',
  components: {
    Item,
    Searchbar
  }
}
</script>
