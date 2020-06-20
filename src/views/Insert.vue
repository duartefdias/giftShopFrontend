<template>
    <v-container>

        <v-row>
            <v-col cols="12">
                <h2>Insert new item</h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-text-field
                    label="Title"
                    v-model="newAsset.title"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="12" md="12">
                <v-text-field
                    label="Image URL (include 'http://'!!)"
                    v-model="newAsset.imageURL"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-textarea
                color="teal"
                v-model="newAsset.description"
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
            <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                    label="Amazon affiliate link (include 'http://'!!)"
                    v-model="newAsset.affiliateLink"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-text-field
                    label="Price (USA Dollars $)"
                    v-model="newAsset.price"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-select
                :items="categories"
                label="Category"
                v-model="newAsset.category"
                ></v-select>
            </v-col>
        </v-row>

        <v-btn @click="submit()">Insert item</v-btn>

        <v-row>
            <v-col cols="12">
                <h2>Preview</h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" xs="12" sm="6" md="4" lg="3">
                <Item v-bind:item="newAsset"/>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
// @ is an alias to /src
import api from '@/api'
import Item from '@/components/Item'

export default {
  name: 'Insert',
  components: {
      Item
  },
  data: () => ({
        newAsset: {
            title: '',
            imageURL: '',
            description: '',
            affiliateLink: '',
            category: '',
            price: '',
            clicks: 0
        }
  }),
  methods: {
      async submit() {
          await api().post('/items/insert', this.newAsset, {
              headers: {
                  Authorization: this.$store.state.Auth.token
              }
          })
          alert('Item inserted!')
      }
  },
  created() {
      this.categories = [
                'weird',
                'man',
                'woman',
                'boy',
                'girl',
                'tech'
            ]
  },
}
</script>
