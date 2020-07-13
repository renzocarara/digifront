import Vue from 'vue';
import Vuex from 'vuex';
import { STATUS_CODES } from '@/const.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // ------------------------------- INPUTs --------------------------------------
        inputProtocol: 'https://', // protocollo
        inputVerb: null, // metodo selezionato per eseguire la 'http request'
        items: ['GET', 'POST', 'PUT', 'DELETE'], // metodi previsti per le richieste

        inputUrl: '', // url in input per l'invio della 'http request'

        // dati per la 'http request' ricavati dall'url inserito nella InputBar
        inputUrlInfos: { domain: '-', scheme: '-', path: '-' },

        parameterList: [], // parametri della 'http request'
        headerList: [], // headers della 'http request'

        // ------------------------------- DATA SENT --------------------------------------
        sentProtocol: '', // protocollo inviato nella richiesta http
        sentUrl: '', // url inviato nella richiesta http
        sentVerb: '', // verbo inviato nella richiesta http
        // info estratte dall'url inviato nella richiesta http
        sentUrlInfos: { domain: '-', scheme: '-', path: '-' },

        // ------------------------------- RESPONSEs --------------------------------------
        // dati della response alla 'http request'
        responses: { statusline: '-', date: '-', server: '-' },

        // dati della response redirect alla 'http request'
        redirects: { statusline: '-', location: '-', server: '-' },

        statusError: '', // messaggio d'errore per l'utente in caso la request non venga completata con successo
        statusCode: '', // stato della response dopo la request
        statusText: '', // stato testuale della response
        descriptiveText: '', // testo descrittivo per l'utente per esplicitare meglio lo status ricevuto

        // ------------------------------------- DB -----------------------------------------
        id: '1', // id della richiesta/risposta che viene scritta nel DB
        shareLink: false // stabilisce se c'è un link da mostrare nella pagina Result/Read
    },
    getters: {
        // ottengo la lista corrente dei parametri inseriti dall'utente
        getParameterList(state) {
            return state.parameterList;
        },
        // ottengo la lista corrente degli headers inseriti dall'utente
        getHeaderList(state) {
            return state.headerList;
        },
        // ottengo le URL info estratte dall'url inserito nella InputBar
        getInputUrlInfos(state) {
            return state.inputUrlInfos;
        },
        // ottengo i Response data
        getResponses(state) {
            return state.responses;
        },
        // ottengo i Response data nel caso di Redirect
        getRedirects(state) {
            return state.redirects;
        },
        // ottengo l'id della 'http request' corrente
        getId(state) {
            return state.id;
        },
        // ottengo l'URL inviato nella richiesta
        getSentUrl(state) {
            return state.sentUrl;
        },
        // ottengo il verbo inviato nella richiesta
        getSentVerb(state) {
            return state.sentVerb;
        },
        // ottengo le URL info inviate nella richiesta
        getSentUrlInfos(state) {
            return state.sentUrlInfos;
        },
        // leggo lo StatusCode
        getStatusCode(state) {
            return state.statusCode;
        },
        // leggo lo StatusText
        getStatusText(state) {
            return state.statusText;
        },
        // leggo lo StatusError
        getStatusError(state) {
            return state.statusError;
        },
        // leggo lo StatusError
        getDescriptiveText(state) {
            return state.descriptiveText;
        }
    },

    mutations: {
        // setto il valore di 'inputVerb'
        SET_INPUT_VERB(state, value) {
            state.inputVerb = value;
        },
        // setto il valore di 'inputUrl'
        SET_INPUT_URL(state, value) {
            state.inputUrl = value;
        },
        // setto il valore di 'inputProtocol'
        SET_INPUT_PROTOCOL(state, value) {
            state.inputProtocol = value;
        },
        // setto il valore  'sentVerb'
        SET_SENT_VERB(state, value) {
            state.sentVerb = value;
        },
        // setto il valore di'sentUrl'
        SET_SENT_URL(state, value) {
            state.sentUrl = value;
        },
        // setto il valore di'sentProtocol'
        SET_SENT_PROTOCOL(state, value) {
            state.sentProtocol = value;
        },
        // setto il valore di'sentUrlInfos'
        SET_SENT_URL_INFOS(state, value) {
            state.sentUrlInfos = value;
        },
        // setto il valore di'responses'
        SET_RESPONSES(state, value) {
            state.responses = value;
        },
        // inserisco un nuovo item nell'array parameterList
        SET_PL_PUSH_ITEM(state, value) {
            state.parameterList.push(value);
        },
        // in parameterList, setto lo status dello specifico item indicizzato da index
        SET_PL_UPDATE_STATUS(state, paylod) {
            state.parameterList[paylod.index].status = paylod.status;
        },
        // rimuovo un elemento dall'array parmeterList, indicizzato da index
        SET_PL_REMOVE_ITEM(state, index) {
            // con splice() rimuovo a partire dalla posizione 'index' un numero di elementi indicati dal 2° parametro
            state.parameterList.splice(index, 1);
        },
        // inserisco un nuovo item nell'array headerList
        SET_HDR_PUSH_ITEM(state, value) {
            state.headerList.push(value);
        },
        // in headerList, setto lo status dello specifico item indicizzato da index
        SET_HDR_UPDATE_STATUS(state, paylod) {
            state.headerList[paylod.index].status = paylod.status;
        },
        // rimuovo un elemento dall'array headrList, indicizzato da index
        SET_HDR_REMOVE_ITEM(state, index) {
            // con splice() rimuovo a partire dalla posizione 'index' un numero di elementi indicati dal 2° parametro (in questo caso 1 elemento)
            state.headerList.splice(index, 1);
        },
        // setto il valore di 'statusCode' e in accordo quello di descriptiveText
        SET_STATUS_CODE(state, value) {
            state.statusCode = value;
            if (state.statusCode != '') {
                state.descriptiveText =
                    STATUS_CODES['' + state.statusCode + ''].descriptiveText;
            }
            // console.log('descriptiveText now is:', state.descriptiveText);
        },
        // setto il valore di 'statusText'
        SET_STATUS_TEXT(state, value) {
            state.statusText = value;
            // console.log('state.statusText now is:', state.statusText);
        },
        // setto il valore di 'statusError'
        SET_STATUS_ERROR(state, value) {
            state.statusError = value;
            // console.log('state.statusError now is:', state.statusError);
        },
        // setto il valore di 'descriptiveText'
        SET_DESCRIPTIVE_TEXT(state, value) {
            state.descriptiveText = value;
            // console.log('state.descriptiveText:', state.descriptiveText);
        },
        // copio i dati in input nella variabile che contiene i dati "spediti" con la "http Request"
        SET_COPY_INPUT_TO_SENT(state) {
            state.sentProtocol = state.inputProtocol;
            state.sentVerb = state.inputVerb;
            state.sentUrl = state.inputUrl;
        },
        // setto l'id della richiesta corrente
        SET_ID(state, value) {
            state.id = value;
        },
        // stabilisco se visualizzare o meno il Share Link
        SET_SHARE_LINK(state, value) {
            state.shareLink = value;
        }
    },

    actions: {},

    modules: {}
});
