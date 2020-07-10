<template>
    <v-container>

        <v-row justify="center">
            <!-- riquadro URL Info -->
            <v-col cols="12" sm="4">
                <v-card class="mx-auto">

                  <v-list disabled min-height="400" dense class="urlinfo-panel">
                      <v-subheader class="px-4">URL INFO</v-subheader>
                            <v-list-item class="urlinfo-item"
                                v-for="(urlInfo, i) in urlInfos" :key="i">
                                    <v-list-item-content>
                                        <strong><v-list-item-title v-text="urlInfo.title"></v-list-item-title></strong>
                                        <div class="list-item-subtitle" v-text="urlInfo.value"></div>
                                    </v-list-item-content>
                            </v-list-item>
                  </v-list>

              </v-card>
            </v-col>

            <!-- riquadro Response Redirect -->
            <v-col cols="12" sm="4" class="response-panel redirect-panel">
                <v-card class="mx-auto">

                    <v-list disabled min-height="400" dense class="response-panel">
                        <v-subheader class=" response-subheader px-4">RESPONSE</v-subheader>
                              <v-list-item class="response-item"
                                v-for="(redirect, i) in redirects" :key="i">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <span v-text="redirect.title"></span>
                                            <span v-text="redirect.value" ></span>
                                        </v-list-item-subtitle>

                                    </v-list-item-content>
                              </v-list-item>        
                    </v-list>

              </v-card>  
            </v-col>

            <!-- riquadro Response -->
            <v-col cols="12" sm="4">
              <v-card class="mx-auto">

                  <v-list disabled min-height="400" dense class="response-panel">
                      <v-subheader class=" response-subheader px-4">RESPONSE</v-subheader>
                            <v-list-item class="response-item"
                              v-for="(response, i) in responses" :key="i">
                                  <v-list-item-content>
                                      <v-list-item-subtitle>
                                            <span v-text="response.title"></span>
                                            <span v-text="response.value"></span>
                                      </v-list-item-subtitle>
                                  </v-list-item-content>
                            </v-list-item>        
                  </v-list>

              </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
    components: {},
    data() {
        return {};
    },
    computed: {
        isReadView() {
            // verifico se sono sulla view "read" e ritorno true o false
            return this.$route.name == 'read';
        },

        urlInfos() {
            // return this.isReadView ? this.sentUrlInfos : this.inputUrlInfos;
            return this.$store.state.sentUrlInfos;
        },
        responses() {
            return this.$store.state.responses;
        },
        redirects() {
            return this.$store.state.redirects;
        }
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
//
.urlinfo-panel {
    background-color: #fafafa;

    .urlinfo-item {
        background-color: $lightgray-color;
        margin-bottom: 2px;

        .list-item-subtitle {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
        }
    }
}

.response-panel {
    background-color: $white-color;

    .response-subheader {
        height: 25px;
    }

    .response-item {
        background-color: $gray-color;
        margin-bottom: 1px;
    }
}

.redirect-panel {
    display: none;
}
</style>;
