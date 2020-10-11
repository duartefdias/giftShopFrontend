<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-img :src="require('~/assets/exit.png')" max-width="150"></v-img>
        </v-row>
        <v-row align="center" justify="center">
            <span>You have logged out.</span> 
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'Logout',
  components: {

  },
  data() {
      return {
          
      }
  },
  methods: {
      ...mapActions(["logout"])
  },
  async created() {
      setTimeout(() => {  /*this.logout()*/ this.$store.dispatch('auth/logout', '') }, 2500);
  }
}
</script>
