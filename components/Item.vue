<template>
    <v-container @click="itemClicked()" min-height="400px" min-width="300px">
        <v-row justify="center">
            <v-card hover height="400px" width="291px" class="item-cards">
                <v-img v-if="item.imageURL"
                class="white--text align-end"
                height="200px"
                v-bind:src="item.imageURL"
                />
                <v-img v-else
                class="white--text align-end"
                height="200px"
                v-bind:src="'https://twgmedia.blob.core.windows.net/thumbnails/' + item._id"
                />

                <!--<v-card-subtitle class="pb-0">
                    <v-row>
                        <v-col cols="12" xs="6" sm="10" md="8">
                            {{ item.title }}
                        </v-col>
                        <v-col cols="12" xs="6" sm="2" md="4">
                            <strong style="font-size: 15px;">{{ item.price }}$</strong>
                        </v-col>
                    </v-row>
                </v-card-subtitle>-->

                <v-card-title class="pb-0">
                    <v-row>
                        <v-col cols="12">
                            <span style="word-break: break-word;">{{ item.title }}</span>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-card-subtitle class="pb-0">
                    <v-row>
                        <v-col>
                            <strong style="font-size: 15px;">{{ item.price }} $</strong>
                        </v-col>
                    </v-row>
                </v-card-subtitle>


                <v-card-text class="text--primary">
                    <div
                    style="overflow: hidden; max-height=inherit">
                    {{item.description }}</div>
                </v-card-text>

            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import api from '@/api'

    export default {
        name: 'Item',
        props: ['item'],
        components: {
        },
        data: () => ({
        }),
        methods: {
            async itemClicked() {
                await api().put('/items/incrementClicks', { _id: this.item._id})
                // window.location.href = this.item.affiliateLink
                window.open(this.item.affiliateLink)
                //console.log('Item clicked')
            }
        }
    }
</script>

<style scoped>

    .item-cards {
        background-color: #edebeb;
    }

</style>