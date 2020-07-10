<template>
    <v-form v-model="validity" ref="form">
            <v-container>

              <v-row>
                <v-col cols="12" class="column-spacing">
                    <v-radio-group :class="isResultView || isReadView ? 'hidden' : ''" row dense v-model="protocol" class="protocol">
                        <v-radio color="gray" label="https://" value="https://"></v-radio>
                        <v-icon v-if="protocol=='https://'" class="mx-3">mdi-lock-outline</v-icon>
                        <v-icon v-else class="mx-3">mdi-lock-open-outline</v-icon>
                        <v-radio class="ml-4" color="gray" label="http://" value="http://"></v-radio>
                    </v-radio-group> 
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3" class="column-spacing">
                    <v-select :disabled=isReadView class="mt-0 verb-select" 
                        v-model="verb"
                        :rules="verbRules"
                        :items="items"
                        label="Method"
                        required
                        solo
                        dense 
                        append-icon=""
                        >
                    </v-select> 
                </v-col>

                <v-col cols="7" class="column-spacing">
                    <v-text-field :readonly=isReadView class="pt-0" 
                        v-model="url"
                        :rules="urlRules"
                        label="URL"
                        required
                        @keypress.13="handleSubmit"
                    >
                    </v-text-field>
                </v-col>

                <v-col cols="2" class="column-spacing">
                    <v-btn class="mt-2" :class="isReadView ? 'd-none' : ''"
                        small
                        :disabled="!validity"
                        color="primary"
                        @click="handleSubmit"
                    >
                          <span class="desktop-send-btn">SEND</span>  
                          <v-icon class="mobile-send-btn">mdi-magnify</v-icon>
                    </v-btn>
                </v-col>

              </v-row>
            </v-container>
        </v-form>
</template>

<script>
export default {
    computed: {
        // definisco delle computed property che sono associate a delle variabili dello "store",
        // e poi le uso nella parte template di rendering HTML
        verb: {
            get() {
                // se sono sulla view "Read" ritorno il valore precedentemente spedito nella http request
                // altrimenti ritorno il valore che è attualmente visualizzato nella InputBar
                return this.isReadView
                    ? this.$store.state.sentVerb
                    : this.$store.state.inputVerb;
            },
            set(value) {
                // se sono sulla view "Read" setto il valore precedentemente spedito nella http request
                // altrimenti setto il valore che è attualmente visualizzato nella InputBar
                this.isReadView
                    ? this.$store.commit('SET_SENT_VERB', value)
                    : this.$store.commit('SET_INPUT_VERB', value);
            }
        },

        url: {
            get() {
                return this.isReadView
                    ? this.$store.state.sentUrl
                    : this.$store.state.inputUrl;
            },
            set(value) {
                this.isReadView
                    ? this.$store.commit('SET_SENT_URL', value)
                    : this.$store.commit('SET_INPUT_URL', value);
            }
        },

        protocol: {
            get() {
                return this.isReadView
                    ? this.$store.state.sentProtocol
                    : this.$store.state.inputProtocol;
            },
            set(value) {
                this.isReadView
                    ? this.$store.commit('SET_SENT_PROTOCOL', value)
                    : this.$store.commit('SET_INPUT_PROTOCOL', value);
            }
        },

        // utilità per capire se sono su una specifica "view" (rotta)
        isReadView() {
            // verifico se sono sulla view "read" e ritorno true o false
            return this.$route.name == 'read';
        },
        isResultView() {
            // verifico se sono sulla view "result" e ritorno true o false
            return this.$route.name == 'result';
        }
    },
    data: () => ({
        validity: false, // dà la validità del form (che contiene la InputBar)

        verbRules: [v => !!v || 'Select!'], // controllo che un verbo sia selezionato
        items: ['GET', 'POST', 'PUT', 'DELETE'], // verbi

        urlRules: [
            v => !!v || 'URL is required' // controllo che l'url non sia vuoto
            // qui si possono implementare altre regole di validazione per URL
        ]
    }),
    methods: {
        handleSubmit() {
            console.log('cliccato send');

            this.copyInputToSent();
            this.setUrlInfoPanel();

            // fare la chiamata axios tramite una action dello store???
            this.callAxios();
        },

        copyInputToSent() {
            this.$store.commit('SET_COPY_INPUT_TO_SENT');
        },

        setUrlInfoPanel() {
            // riempio il riquadro URL INFO

            //creo un oggetto JS ti tipo "URL", che diverse proprietà specifiche degli url
            let url = new URL(
                this.$store.state.inputProtocol + this.$store.state.inputUrl
            );

            let payload = [
                {
                    title: 'DOMAIN',
                    value: url.hostname
                },
                {
                    title: 'SCHEME',
                    value: url.protocol.slice(0, -1).toUpperCase() // tolgo il carattere ':' con slice()
                },
                { title: 'PATH', value: url.pathname }
            ];
            this.$store.commit('SET_SENT_URL_INFOS', payload);
        },

        callAxios() {
            this.$http({
                method: this.$store.state.inputVerb,
                url:
                    this.$store.state.inputProtocol +
                    this.$store.state.inputUrl,
                // url: 'https://covid-193.p.rapidapi.com/statistics',
                headers: {
                    // ***TBD gestione headers
                    // esempio:
                    // 'content-type': 'application/json',
                    //  'x-rapidapi-key': 'your-api-key-here'
                },
                params: {
                    // ***TBD gestione parametri
                }
            })
                .then(response => {
                    console.log('AXIOS SUCCESS');
                    this.handleSuccess(response);
                })
                .catch(error => {
                    console.log('AXIOS ERROR');
                    this.handleError(error);
                });
        },

        handleSuccess(response) {
            //
            // il server ha risposto con uno status code che è 2XX

            this.setStatusError('');
            this.$store.commit('SET_DESCRIPTIVE_TEXT', '');
            this.setStatusCode(response.status);
            this.setStatusText(response.statusText);
            this.setResponsePanel(response.headers);
            this.moveToResultView();
        },

        handleError(error) {
            // NOTA: vengono gestiti 3 casi di errore possibili:
            // 1. il server ha risposto alla richiesta, ma ci sono degli errori
            // 2. il server non ha risposto alla richiesta
            // 3. ci sono degli errori nel creare la richiesta, non viene quindi inviato nulla

            if (error.response) {
                //
                // il server ha risposto ma con uno status code che non è 2XX

                console.log('RESPONSE WITH ERROR');
                this.$store.commit('SET_DESCRIPTIVE_TEXT', '');
                this.setStatusCode(error.response.status);
                this.setStatusText('');
                this.setStatusError('');
                this.setResponsePanel(error.response.headers);
                this.moveToResultView();
            } else if (error.request) {
                //
                // il server non ha risposto

                console.log('NO RESPONSE');
                this.setStatusError(error.message);
                this.setStatusCode('');
                this.setStatusText('');
                this.$store.commit(
                    'SET_DESCRIPTIVE_TEXT',
                    'No response from server!'
                );
                this.clearResponsePanel();
                this.moveToResultView();
            } else {
                //
                // errore nel costruire la richiesta

                console.log('INVALID REQUEST');
                this.setStatusError('Invalid request');
                this.setStatusCode('');
                this.setStatusText('');
                this.$store.commit('SET_DESCRIPTIVE_TEXT', 'No request sent!');
                this.clearResponsePanel();

                // ***TBD disabilitare/resettare il link alla read, poichè non ho scritto nel DB
                // a meno che non decido di scriver lo stesso nel DB una request errata senza response??!!
            }

            this.moveToResultView();
        },

        setStatusCode(status) {
            // extract Status Code
            if (status != undefined) {
                this.$store.commit('SET_STATUS_CODE', status);
            } else {
                this.$store.commit('SET_STATUS_CODE', '-');
            }
        },
        setStatusError(message) {
            // extract Error message
            if (message != undefined) {
                this.$store.commit('SET_STATUS_ERROR', message);
            } else {
                this.$store.commit('SET_STATUS_ERROR', '');
            }
        },

        setStatusText(statusText) {
            // extract Status Text
            if (statusText != undefined) {
                this.$store.commit('SET_STATUS_TEXT', statusText);
            } else {
                this.$store.commit('SET_STATUS_TEXT', '-');
            }
        },

        moveToResultView() {
            // verifico se sono già sulla pagina di 'result', altrimenti ci vado
            if (this.$route.name != 'result') {
                this.$router.push('result');
            }
        },

        clearResponsePanel() {
            let noData = [
                { title: '', value: '-' },
                { title: 'Date:', value: '-' },
                { title: 'Server:', value: '-' }
            ];

            this.$store.commit('SET_RESPONSES', noData);
        },

        setResponsePanel(headers) {
            // ***TBD gestione del caso REDIRECT
            // response.redirect è un booleane che mi dice se ci sono redirects

            // extract data from response
            let httpVersion = 'x.x'; // ***TBD estrazione del http version dalla response
            let payload = [
                {
                    title: '',
                    value:
                        this.$store.state.statusCode != ''
                            ? 'HTTP/' +
                              httpVersion +
                              ' ' +
                              this.$store.state.statusCode +
                              ' ' +
                              this.$store.state.statusText
                            : '-'
                },
                {
                    title: 'Date:',
                    value:
                        headers.date != undefined && headers.date != null
                            ? headers.date
                            : '-'
                },
                {
                    title: 'Server:',
                    value:
                        headers.server != undefined && headers.server != null
                            ? headers.server
                            : '-'
                }
            ];

            this.$store.commit('SET_RESPONSES', payload);
        }
    }
};
</script>

<style lang="scss" scoped>
.verb-select {
    font-size: 14px;
}

.column-spacing {
    padding-top: 0;
}

::v-deep .protocol [role='radiogroup'] {
    justify-content: center;
}

.desktop-send-btn {
    display: block;
}
.mobile-send-btn {
    display: none;
}

@media screen and (max-width: 599px) {
    .verb-select {
        font-size: 12px;
    }

    // uso il deep selector ::deep (equivale a >>> o /deep/ per altri preprocessori)
    // in modo tale da poter modificare dei selettori di componenti figli del mio componente Insert.vue
    // NOTA: se togliessi la parola "scoped" dalla sezione style, allora non avrei bisogno di ::v-deep
    ::v-deep .v-select .v-label {
        font-size: 12px;
    }

    ::v-deep .v-text-field .v-label {
        font-size: 12px;
    }

    .column-spacing {
        padding-left: 0;
        padding-right: 10px;
    }
    .desktop-send-btn {
        display: none;
    }
    .mobile-send-btn {
        display: block;
    }
}
</style>
