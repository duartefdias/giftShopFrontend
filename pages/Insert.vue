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
                    solo
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="12" md="12">
                <v-text-field
                    label="Image URL (include 'http://'!!)"
                    v-model="newAsset.imageURL"
                    solo
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-textarea
                color="teal"
                v-model="newAsset.description"
                solo
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
                    solo
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-text-field
                    label="Price (USA Dollars $)"
                    v-model="newAsset.price"
                    solo
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-select
                :items="categories"
                label="Category"
                v-model="newAsset.category"
                solo
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-file-input
                v-model="assetImage"
                show-size
                accept="image/*"
                truncate-length="15"
                ></v-file-input>
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
        },
        assetImage: null,
        previewImageUrl: ''
  }),
    methods: {
        async submit() {
            const formData = new FormData()
            console.log(this.newAsset.image)
            for ( let key in this.newAsset ) {
                formData.append(key, this.newAsset[key]);
            }
            formData.append("assetImage", this.assetImage, this.assetImage.name)

            for (var key of formData.entries()) {
                    console.log(key[0] + ', ' + key[1]);
                }

            await api().post('/items/insert', /*this.newAsset*/formData, {
                headers: {
                    Authorization: this.$store.state.auth.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            alert('Item inserted!')
        },   
  },
    watch: {
        assetImage: function(val){
            this.newAsset.imageURL = URL.createObjectURL(this.assetImage)
        }
    },
  created() {
      this.categories = [
                'tech',
                'weird',
                'prank',
                'food',
                'pets',
                'clothing',
                'books',
                'home',
                'office',
                'games',
                'sports',
                'man',
                'woman',
                'boy',
                'girl'
            ]
  },
}
</script>
