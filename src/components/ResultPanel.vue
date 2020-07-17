<template>
    <v-container>

        <v-row justify="center">
            <!-- riquadro URL Info -->
            <v-col cols="12" md="4">
                <v-card class="mx-auto">

                  <v-list disabled min-height="300" dense class="urlinfo-panel">
                      <v-subheader class="px-4">URL INFO</v-subheader>
                      <v-list-item class="urlinfo-item">
                              <v-list-item-content>
                                  <strong><v-list-item-title>DOMAIN</v-list-item-title></strong>
                                  <div class="list-item-subtitle">{{ urlInfos.domain }}</div>
                              </v-list-item-content>
                      </v-list-item>
                      <v-list-item class="urlinfo-item">
                              <v-list-item-content>
                                  <strong><v-list-item-title>SCHEME</v-list-item-title></strong>
                                  <div class="list-item-subtitle">{{ urlInfos.scheme }}</div>
                              </v-list-item-content>
                      </v-list-item>
                      <v-list-item class="urlinfo-item">
                              <v-list-item-content>
                                  <strong><v-list-item-title>PATH</v-list-item-title></strong>
                                  <div class="list-item-subtitle">{{ urlInfos.path }}</div>
                              </v-list-item-content>
                      </v-list-item>
                  </v-list>

              </v-card>
            </v-col>

            <!-- riquadro Response Redirect -->
            <v-col cols="12" md="4" class="redirect-panel">
                <v-card class="mx-auto">

                    <v-list disabled min-height="300" dense class="response-panel">
                        <v-subheader class=" response-subheader px-4">RESPONSE</v-subheader>
                              <v-list-item class="response-item">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <span>{{ redirects.statusline }}</span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>
                              <v-list-item class="response-item">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <span>Location: </span>
                                            <span>{{ redirects.location }}</span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>
                              <v-list-item class="response-item">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <span>Server: </span>
                                            <span>{{ redirects.server }}</span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>        
                    </v-list>

              </v-card>  
            </v-col>

            <!-- riquadro Response -->
            <v-col cols="12" md="4">
              <v-card class="mx-auto">

                 <v-list disabled min-height="300" dense class="response-panel">
                        <v-subheader class=" response-subheader px-4">RESPONSE</v-subheader>
                              <v-list-item class="response-item">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <span>{{ responses.statusline }}</span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>
                              <v-list-item class="response-item">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <span>Date: </span>
                                            <span>{{ responses.date }}</span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                              </v-list-item>
                              <v-list-item class="response-item">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <span>Server: </span>
                                            <span>{{ responses.server }}</span>
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
            return this.isReadView
                ? this.$store.state.dbUrlInfos
                : this.$store.state.sentUrlInfos;
        },
        responses() {
            return this.isReadView
                ? this.$store.state.dbResponses
                : this.$store.state.responses;
        },
        redirects() {
            return this.isReadView
                ? this.$store.state.dbRedirects
                : this.$store.state.redirects;
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

.multi-row {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
}
</style>;
