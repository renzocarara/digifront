<template>
    <v-form v-model="validity" ref="form">
            <v-container>

              <v-row>
                <v-col cols="12" class="column-spacing pb-0">
                    <v-radio-group :class="isResultView || isReadView ? 'hidden' : ''" row dense v-model="protocol" class="protocol">
                        <v-radio :color="protocol=='https://' ? 'green' : 'gray'" label="https://" value="https://"></v-radio>
                        <v-icon color="green" v-if="protocol=='https://'" class="mx-3">mdi-lock-outline</v-icon>
                        <v-icon color="orange" v-else class="mx-3">mdi-lock-open-outline</v-icon>
                        <v-radio :color="protocol=='http://' ? 'orange' : 'gray'" class="ml-4" label="http://" value="http://"></v-radio>
                    </v-radio-group> 
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="3" class="column-spacing">
                    <v-select :disabled=isReadView class="mt-1 verb-select" 
                        
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

                <v-col cols="8" sm="7" class="column-spacing">
                    <v-text-field :readonly=isReadView class="mt-0" 
                        v-model="url"
                        :rules="urlRules"
                        counter="255"
                        maxlength="255"
                        label="URL"
                        clearable
                        :prefix="protocol"
                        required
                        @keypress.13="handleSubmit"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="1"  sm="2" class="column-spacing"  :class="isReadView ? 'd-none' : ''">
                    <v-btn class="mt-2 send-btn"
                        width="100%"
                        :disabled="!validity"
                        color="primary"
                        @click="handleSubmit"
                    >
                          <span class="desktop-send-btn">SEND</span>  
                          <v-icon class="mobile-send-btn">mdi-magnify</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12" class="text-center progress-circle">
                    <div v-if="isRequesting">
                    <v-progress-circular indeterminate color="red"></v-progress-circular>
                    <p class="red--text">Making the request...</p>
                    </div>
                    <div v-if="isUpdating">
                    <v-progress-circular indeterminate color="blue"></v-progress-circular>
                    <p class="blue--text">Updating DB...</p>
                    </div>
                </v-col>
              </v-row>
            </v-container>
        </v-form>
</template>

<script>
import axios from 'axios';

export default {
    computed: {
        // definisco delle computed property che sono associate a delle variabili dello "store",
        // e poi le uso nella parte template di rendering HTML
        verb: {
            get() {
                // se sono sulla view "Read" ritorno il valore precedentemente spedito nella http request
                // altrimenti ritorno il valore che è attualmente visualizzato nella InputBar
                let whichVerb;
                if (this.isReadView) {
                    whichVerb = this.$store.state.dbVerb;
                } else if (this.isResultView) {
                    whichVerb = this.$store.state.sentVerb;
                } else {
                    whichVerb = this.$store.state.inputVerb;
                }
                return whichVerb;
            },
            set(value) {
                // se sono sulla view "Read" setto il valore precedentemente spedito nella http request
                // altrimenti setto il valore che è attualmente visualizzato nella InputBar

                if (this.isReadView) {
                    this.$store.commit('SET_DB_VERB', value);
                } else {
                    this.$store.commit('SET_INPUT_VERB', value);
                }
            }
        },

        url: {
            get() {
                let whichUrl;
                if (this.isReadView) {
                    whichUrl = this.$store.state.dbUrl;
                } else if (this.isResultView) {
                    whichUrl = this.$store.state.sentUrl;
                } else {
                    whichUrl = this.$store.state.inputUrl;
                }
                return whichUrl;
            },
            set(value) {
                if (this.isReadView) {
                    this.$store.commit('SET_DB_URL', value);
                } else {
                    this.$store.commit('SET_INPUT_URL', value);
                }
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
        ],
        isRequesting: false, // richiesta in corso se true
        isUpdating: false // aggiornamento DB in corso se true
    }),
    methods: {
        handleSubmit() {
            // console.log('Send clicked!');
            this.isRequesting = true; // visualizzo un Progress circle
            this.copyInputToSent(); // salvo le informazioni sulla richiesta da inviare
            this.setUrlInfoPanel(); // inizio a popolare il riquadro "URL INFO"
            this.makeHttpRequest(); // faccio una chiamata axios per eseguire la "http request"
        },

        copyInputToSent() {
            this.$store.commit('SET_COPY_INPUT_TO_SENT');
        },

        setUrlInfoPanel() {
            // riempio il riquadro "URL INFO"

            //creo un oggetto JS di tipo "URL", che ha diverse proprietà specifiche degli url
            let url = new URL(
                this.$store.state.inputProtocol + this.$store.state.inputUrl
            );

            let payload = {
                domain: url.hostname,
                scheme: url.protocol.slice(0, -1).toUpperCase(), // tolgo il carattere ':' con slice()
                path: url.pathname
            };
            this.$store.commit('SET_SENT_URL_INFOS', payload);
        },

        makeHttpRequest() {
            // preparo un oggetto dove inserire gli headers aggiunti dall'utente
            let allHeaders = {
                'content-type': 'application/json'
            };
            let hName, hValue;
            // ciclo headerList che mi contiene gli headers inseriti dall'utente ed estraggo solo quelli attivi
            for (let i = 0; i < this.$store.state.headerList.length; i++) {
                if (this.$store.state.headerList[i].status == true) {
                    hName = this.$store.state.headerList[i].name;
                    hValue = this.$store.state.headerList[i].value;
                    allHeaders[hName] = hValue; // inserisco l'header nell'oggetto che poi userò nella chiamata axios
                }
            }

            // console.log('VUEX headerList', this.$store.state.headerList);
            // console.log('allHeaders:', allHeaders);

            let allParams = {};
            let pName, pValue;
            // ciclo parameterList che mi contiene i parametri inseriti dall'utente ed estraggo solo quelli attivi
            for (let i = 0; i < this.$store.state.parameterList.length; i++) {
                if (this.$store.state.parameterList[i].status == true) {
                    pName = this.$store.state.parameterList[i].name;
                    pValue = this.$store.state.parameterList[i].value;
                    allParams[pName] = pValue; // inserisco il parametro nell'oggetto che poi userò nella chiamata axios
                }
            }

            // console.log('VUEX parameterList', this.$store.state.headerList);
            // console.log('allParams:', allParams);

            axios({
                method: this.$store.state.inputVerb,

                url:
                    this.$store.state.inputProtocol +
                    this.$store.state.inputUrl,

                headers: allHeaders,

                params: allParams
            })
                .then(response => {
                    // console.log('Http Request SUCCESS');
                    this.handleSuccess(response);
                })
                .catch(error => {
                    // console.log('Http Request ERROR');
                    this.handleError(error);
                });
        },

        handleSuccess(response) {
            //
            // il server ha risposto con uno status code che è 2XX
            // console.log('Http Response:', response);

            this.isRequesting = false; // nascondo Progress Circle

            this.grabResponses(response);
            this.APICallWriteDB();
            this.moveToResultView();
        },

        handleError(error) {
            // NOTA: vengono gestiti 3 casi di errore possibili:
            // 1. il server ha risposto alla richiesta, ma ci sono degli errori
            // 2. il server non ha risposto alla richiesta
            // 3. ci sono degli errori nel creare la richiesta, non viene quindi inviato nulla

            this.isRequesting = false; // nascondo Progress Circle

            if (error.response) {
                // 1. il server ha risposto ma con uno status code che non è 2XX
                // console.log('RESPONSE WITH ERROR');
                // console.log('error.response', error.response);

                this.grabResponses(error.response);
                this.APICallWriteDB();
            } else if (error.request) {
                // 2. il server non ha risposto

                // console.log('NO RESPONSE');
                this.setStatusError(error.message);
                this.setStatusCode('');
                this.setStatusText('');
                this.$store.commit(
                    'SET_DESCRIPTIVE_TEXT',
                    'No response from server!'
                );
                this.clearResponsePanel();
                // NOTA: scrivo nel DB la richiesta fatta anche se non c'e' una risposta del server
                this.APICallWriteDB();
            } else {
                // 3- errore nel costruire la richiesta

                // console.log('INVALID REQUEST');
                this.setStatusError('Invalid request');
                this.setStatusCode('');
                this.setStatusText('');
                this.$store.commit('SET_DESCRIPTIVE_TEXT', 'No request sent!');
                this.clearResponsePanel();

                this.$store.commit('SET_SHARE_LINK', false);

                // NOTA:non scrivo nulla nel DB, poichè non è partita nemmeno la richiesta

                // ***TBD disabilitare/resettare il link alla read, poichè non ho scritto nel DB
                // a meno che non decido di scriver lo stesso nel DB una request errata senza response??!!
            }

            // in tutti i casi, response, no response, richiesta non valida, vado sempre sulla view: "result"
            this.moveToResultView();
        },

        grabResponses(response) {
            // prende li dati della response (anche nel caso di response con errore) e li "stora" nello "state"
            this.setStatusError('');
            this.setStatusCode(response.status);
            this.setStatusText(response.statusText);
            this.setResponsePanel(response.headers);
        },

        setStatusCode(status) {
            // estrae lo Status Code dalla response
            if (status != undefined) {
                this.$store.commit('SET_STATUS_CODE', status);
            } else {
                this.$store.commit('SET_STATUS_CODE', '-');
                this.$store.commit('SET_DESCRIPTIVE_TEXT', '');
            }
        },
        setStatusError(message) {
            // setta un Error message da visualizzare in pagina
            if (message != undefined) {
                this.$store.commit('SET_STATUS_ERROR', message);
            } else {
                this.$store.commit('SET_STATUS_ERROR', '');
            }
        },

        setStatusText(statusText) {
            // estrae lo Status Text dalla response
            if (statusText != undefined) {
                this.$store.commit('SET_STATUS_TEXT', statusText);
            } else {
                this.$store.commit('SET_STATUS_TEXT', '-');
            }
        },

        moveToResultView() {
            // verifico se sono già sulla pagina di 'result', se non ci sono ci vado
            if (this.$route.name != 'result') {
                this.$router.push('result');
            }
        },

        clearResponsePanel() {
            // rimuovo tutte le info dal riquadro RESPONSE (visualizzo dei trattini)
            let noData = { statusline: '-', date: '-', server: '-' };
            this.$store.commit('SET_RESPONSES', noData);
        },

        setResponsePanel(headers) {
            // inserisco le info sul riquadro RESPONSE

            // ***TBD gestione del caso REDIRECT
            // response.redirect è un boolean che mi dice se ci sono redirects

            // extract data from response
            let httpVersion = 'x.x'; // ***TBD estrazione del http version dalla response
            let payload = {
                statusline:
                    this.$store.state.statusCode != ''
                        ? 'HTTP/' +
                          httpVersion +
                          ' ' +
                          this.$store.state.statusCode +
                          ' ' +
                          this.$store.state.statusText
                        : '-',
                date:
                    headers.date != undefined && headers.date != null
                        ? headers.date
                        : '-',
                server:
                    headers.server != undefined && headers.server != null
                        ? headers.server
                        : '-'
            };

            this.$store.commit('SET_RESPONSES', payload);
        },

        APICallWriteDB() {
            // fccio una chiamata axios in POST, alle API esposte da "digiback", per scrivere nel DB

            // console.log('APICallWriteDB started...');
            this.isUpdating = true; // visualizzo Progress Circle
            // creo il dato da scrivere nel DB
            let data = {
                // public key
                api_token:
                    '8He1fq8r5krxoEahHiA2MqaIDV173FRPztF16dtkxkc5yxrBjMzPkbvOwC7yAhuCbozU1DGPpHLaIUtP',

                // richiesta e risposta della "http request"
                method: this.$store.state.sentVerb,
                url: this.$store.state.sentUrl,

                domain: this.$store.state.sentUrlInfos.domain,
                scheme: this.$store.state.sentUrlInfos.scheme,
                path: this.$store.state.sentUrlInfos.path,

                statusline: this.$store.state.responses.statusline,
                status: this.$store.state.statusCode,
                date: this.$store.state.responses.date,
                server: this.$store.state.responses.server,
                location: this.$store.state.responses.location
            };

            let headers = {
                'content-type': 'application/json'
            };

            let url = 'https://digiback.herokuapp.com/api/HTTP/POST';
            // let url = 'http://localhost:8000/api/HTTP/POST'; // testing in locale

            axios
                .post(url, data, headers)
                .then(response => {
                    this.writeDBSuccess(response);
                })
                .catch(error => {
                    this.writeDBError(error);
                });
        },

        writeDBSuccess(response) {
            // console.log('APICallWriteDB succeded');
            // console.log('response:\n', response);

            this.isUpdating = false; // nscondo Progress Circle

            // **TBD, eventuale popup di avviso all'utente "SUCCESS: DB updated!"

            // salvo l'id (restituitomi dall'API) nello "store"
            this.$store.commit('SET_ID', response.data.id); // per la result view
            // aggiorno la lista degli id presenti nel DB
            this.$store.commit('SET_ADD_ID_TO_LIST', response.data.id);
            // rendo lo Share Link visibile
            this.$store.commit('SET_SHARE_LINK', true);
        },
        writeDBError(error) {
            // console.log('APICallWriteDB failed');
            console.log('error:\n', error);
            // console.log('error.message:\n', error.message);
            // console.log('error.response:\n', error.response);

            this.isUpdating = false; // nscondo Progress Circle

            // **TBD gestione errori scrittura su DB,
            // popup di avviso all'utente "ERROR: DB access failed! No data saved""

            // rendo lo Share Link non visibile
            this.$store.commit('SET_SHARE_LINK', false);
        }
    }
};
</script>

<style lang="scss" scoped>
.verb-select {
    font-size: 14px;
}

::v-deep .protocol [role='radiogroup'] {
    justify-content: center;
}

::v-deep
    .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
    > .v-input__control
    > .v-input__slot {
    padding-left: 8px;
    padding-right: 0;
}

.desktop-send-btn {
    display: block;
}
.mobile-send-btn {
    display: none;
}
.v-progress-circular {
    margin: 1rem;
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

    .send-btn.v-btn {
        padding-left: 0;
        padding-right: 0;
        min-width: 28px;
    }
}
</style>
