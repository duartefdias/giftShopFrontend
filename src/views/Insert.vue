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
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-textarea
                color="teal"
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
                    label="Amazon affiliate link"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-text-field
                    label="Price (USA Dollars $)"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-btn @click="submit()">Insert</v-btn>

    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Insert',
  components: {
  },
  methods: {
      submit() {
          // Send insertion request to backend
      }
  }
}
</script>
