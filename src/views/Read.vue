<template>
    <v-container>

      <h1 class="view-title">Read</h1>
      <h4 class="text-center">Request #: {{ $store.state.dbId }}</h4>

      <v-row justify="center">
        <v-col cols="8" class="pb-0">
          <v-container class="max-width pb-0">
            <v-pagination
              v-model="newPage"
              class="my-4"
              :length="idsLength"
              @input="onPageChange"
              total-visible="5"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
      <div class="text-center">
          <small>record position: {{ newPage }}</small>
      </div>

      <InputBar/>
      <ResultPanel/>
      <ShareLink/>
      <SwypeTacho/>

    </v-container>
</template>

<script>
import axios from 'axios';

import InputBar from '@/components/InputBar.vue';
import ResultPanel from '@/components/ResultPanel.vue';
import ShareLink from '@/components/ShareLink.vue';
import SwypeTacho from '@/components/SwypeTacho.vue';

export default {
    mounted() {
        this.$store.commit('SET_PROG_NAV', false);
    },

    data() {
        return {
            currentPage:
                this.$store.state.idsList.indexOf(this.$store.state.dbId) + 1,
            newPage:
                this.$store.state.idsList.indexOf(this.$store.state.dbId) + 1
        };
    },

    components: {
        InputBar,
        ResultPanel,
        ShareLink,
        SwypeTacho
    },

    computed: {
        idsLength() {
            // console.log('ids length:', this.$store.state.idsList.length);
            return this.$store.state.idsList.length;
        }
    },

    methods: {
        onPageChange() {
            // verifico se il click è su una pagina diversa da quella corrente
            if (this.currentPage != this.newPage) {
                // faccio una GET by id, leggo dal DB il record con id == idsList[newPage -1]
                axios({
                    method: 'GET',
                    url:
                        // 'http://localhost:8000/api/HTTP/GET/' + // testing in locale
                        // this.$store.state.idsList[this.newPage - 1],
                        'https://digiback.herokuapp.com/api/HTTP/GET/' +
                        this.$store.state.idsList[this.newPage - 1],
                    headers: {
                        'content-type': 'application/json'
                    },
                    params: {
                        // public key
                        api_token:
                            '8He1fq8r5krxoEahHiA2MqaIDV173FRPztF16dtkxkc5yxrBjMzPkbvOwC7yAhuCbozU1DGPpHLaIUtP'
                    }
                })
                    .then(response => {
                        // console.log('GET by id SUCCESS');
                        this.handleSuccess(response);
                    })
                    .catch(error => {
                        // console.log('GET by id FAILED');
                        this.handleError(error);
                    });
            }
        },

        handleSuccess(response) {
            // setto lo store con i dati appena letti

            this.currentPage = this.newPage; // aggiorno la current page con la nuova pagina selezionata

            this.$store.commit('SET_DB_VERB', response.data.request.method);
            this.$store.commit('SET_DB_URL', response.data.request.url);

            let urlInfos = {
                domain: response.data.request.domain,
                scheme: response.data.request.scheme,
                path: response.data.request.path
            };
            this.$store.commit('SET_DB_URL_INFOS', urlInfos);

            let responses = {
                statusline: response.data.response.statusline, // http version + status + statusText
                date: response.data.response.date,
                server: response.data.response.server
            };
            this.$store.commit('SET_DB_RESPONSES', responses);

            let redirects = {
                statusline: response.data.response.statusline,
                location: response.data.response.location,
                server: response.data.response.server
            };
            this.$store.commit('SET_DB_REDIRECTS', redirects);

            // setto nello store l'id del record appena letto
            this.$store.commit(
                'SET_DB_ID',
                this.$store.state.idsList[this.newPage - 1]
            );

            // aggiorno la rotta che appare nell'address bar
            let routePath = '/' + this.$store.state.dbId;
            if (this.$route.path != routePath) {
                // verifico di non essere già sulla rotta dove voglio andare
                this.$store.commit('SET_PROG_NAV', true);
                this.$router.push({ path: routePath });
                this.$store.commit('SET_PROG_NAV', false);
            }
        },

        handleError(error) {
            console.log('error', error);
            alert('DB Read failed!');
            this.newPage = this.currentPage; // ripristino la new page con la pagina corrente
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
