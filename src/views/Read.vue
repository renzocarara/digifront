<template>
    <v-container>

      <h1 class="view-title">Read</h1>
      <h4 class="text-center">Request #: {{ $store.state.id }}</h4>

      <v-row justify="center">
        <v-col cols="8" class="pb-0">
          <v-container class="max-width pb-0">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="idsLength"
              @input="onPageChange"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
      <div class="text-center">
          <small>record position: {{ page }}</small>
      </div>

      <InputBar/>
      <ResultPanel/>
      <ShareLink/>

    </v-container>
</template>

<script>
import axios from 'axios';

import InputBar from '@/components/InputBar.vue';
import ResultPanel from '@/components/ResultPanel.vue';
import ShareLink from '@/components/ShareLink.vue';

export default {
    mounted() {
        this.$store.commit('SET_PROG_NAV', false);
        console.log('mount Read, progNav->', this.$store.state.progNav);
    },
    data() {
        return {
            page: this.$store.state.idsList.length
        };
    },
    components: {
        InputBar,
        ResultPanel,
        ShareLink
    },
    computed: {
        idsLength() {
            console.log('length:', this.$store.state.idsList.length);
            return this.$store.state.idsList.length;
        }
    },
    methods: {
        onPageChange() {
            console.log('page:', this.page);
            // 1. leggo dal DB il record con id == idsList[page] oppure
            // 2. leggo da un array locale l'elemento [page-esimo] -- in questo caso non userò la GET/id mai!

            console.log(
                'url:',
                'http://localhost:8000/api/HTTP/GET/' +
                    this.$store.state.idsList[this.page - 1]
            );

            //1. -------------------------------------------
            axios({
                method: 'GET',
                url:
                    'http://localhost:8000/api/HTTP/GET/' +
                    this.$store.state.idsList[this.page - 1],
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
                    console.log('GET by id SUCCESS');
                    console.log('response.data', response.data);

                    // setto lo store sent...???? con i dati appena letti
                    // ma così poi anche Result mi canbia... forse serve una terza versione dei dati..
                    // input, sent e read 3 copie in totale!!!
                    // this.$store.commit('SET_????', response.date);

                    // setto nello store l'id del record appena letto
                    this.$store.commit(
                        'SET_ID',
                        this.$store.state.idsList[this.page - 1]
                    );

                    // this.handleSuccess(response);
                })
                .catch(error => {
                    console.log('GET by id FAILED');
                    console.log('error', error);
                    // this.handleError(error);
                });
            //----------------------------------------------
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
