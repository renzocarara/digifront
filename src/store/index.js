import Vue from 'vue';
import Vuex from 'vuex';

// array che elenca tutti gli status code con associato lo StatusText e un DescriptiveText
import { STATUS_CODES } from '@/const.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // ------------------------------- INPUTs --------------------------------------
        inputProtocol: 'https://', // protocollo
        inputVerb: null, // metodo selezionato per eseguire la 'http request'
        items: ['GET', 'POST', 'PUT', 'DELETE'], // metodi previsti per le richieste
        inputUrl: '', // url in input per l'invio della 'http request'
        inputUrlInfos: { domain: '-', scheme: '-', path: '-' }, // dati ricavati dall'url inserito nella InputBar
        parameterList: [], // parametri della 'http request'
        headerList: [], // headers della 'http request'

        // ------------------------------- DATA SENT --------------------------------------
        sentProtocol: '', // protocollo inviato nella richiesta http
        sentUrl: '', // url inviato nella richiesta http
        sentVerb: '', // verbo inviato nella richiesta http
        sentUrlInfos: { domain: '-', scheme: '-', path: '-' }, // info estratte dall'url inviato nella richiesta http

        // ------------------------------- RESPONSEs --------------------------------------
        responses: { statusline: '-', date: '-', server: '-' }, // dati della response alla 'http request'
        redirects: { statusline: '-', location: '-', server: '-' }, // dati della response redirect alla 'http request'
        statusError: '', // messaggio d'errore per l'utente in caso la request non venga completata con successo
        statusCode: '', // stato della response dopo la request
        statusText: '', // stato testuale della response
        descriptiveText: '', // testo descrittivo per l'utente per esplicitare meglio lo status ricevuto

        // ------------------------------------- DB -----------------------------------------
        id: '-', // id restituito dall'API dopo una scrittura sul DB
        dbId: '-', // id letto dal DB o copiato da id
        dbUrl: '', // // url letto dal DB o copiato dal corrispettivo "sent"
        dbVerb: '', // verb letto dal DB o copiato dal corrispettivo "sent"
        dbUrlInfos: { domain: '-', scheme: '-', path: '-' }, // urlInfos lette dal DB o copiate dal corrispettivo "sent"
        dbResponses: { statusline: '-', date: '-', server: '-' }, // responses lette dal DB o copiate dal corrispettivo "sent"
        dbRedirects: { statusline: '-', location: '-', server: '-' }, // redirects lette dal DB o copiate dal corrispettivo "sent"

        // --------------------------------------- General --------------------------------------
        shareLink: false, // stabilisce se c'è un link da mostrare nella pagina Result/Read
        progNav: false, // stabilisce se la rotta "read" richiesta verrà seguita o meno
        // se è l'utente che cambia manualmente l'URL la rotta non viene seguita

        idsList: [] // lista degli id dei records presenti nel DB
    },
    getters: {
        getParameterList(state) {
            return state.parameterList;
        },
        getHeaderList(state) {
            return state.headerList;
        },
        getInputUrlInfos(state) {
            return state.inputUrlInfos;
        },
        getResponses(state) {
            return state.responses;
        },
        getRedirects(state) {
            return state.redirects;
        },
        getStatusCode(state) {
            return state.statusCode;
        },
        getStatusText(state) {
            return state.statusText;
        },
        getStatusError(state) {
            return state.statusError;
        },
        getDescriptiveText(state) {
            return state.descriptiveText;
        }
    },

    mutations: {
        SET_INPUT_VERB(state, value) {
            state.inputVerb = value;
        },
        SET_INPUT_URL(state, value) {
            state.inputUrl = value;
        },
        SET_INPUT_PROTOCOL(state, value) {
            state.inputProtocol = value;
        },

        SET_SENT_VERB(state, value) {
            state.sentVerb = value;
        },
        SET_SENT_URL(state, value) {
            state.sentUrl = value;
        },
        SET_SENT_PROTOCOL(state, value) {
            state.sentProtocol = value;
        },
        SET_SENT_URL_INFOS(state, value) {
            state.sentUrlInfos = value;
        },

        SET_RESPONSES(state, value) {
            state.responses = value;
        },
        SET_REDIRECTS(state, value) {
            state.redirects = value;
        },

        SET_DB_VERB(state, value) {
            state.dbVerb = value;
        },
        SET_DB_URL(state, value) {
            state.dbUrl = value;
        },
        SET_DB_URL_INFOS(state, value) {
            state.dbUrlInfos = value;
        },
        SET_DB_RESPONSES(state, value) {
            state.dbResponses = value;
        },
        SET_DB_REDIRECTS(state, value) {
            state.dbRedirects = value;
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
        SET_STATUS_TEXT(state, value) {
            state.statusText = value;
            // console.log('state.statusText now is:', state.statusText);
        },
        SET_STATUS_ERROR(state, value) {
            state.statusError = value;
            // console.log('state.statusError now is:', state.statusError);
        },
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
        // copio i dati spediti nella variabile dei dati memorizzati nel DB
        SET_COPY_SENT_TO_DB(state) {
            state.dbResponses = state.responses;
            state.dbRedirects = state.redirects;
            state.dbUrlInfos = state.sentUrlInfos;
            state.dbVerb = state.sentVerb;
            state.dbUrl = state.sentUrl;
            state.dbId = state.id;
        },

        // setto l'id del record appena scritto
        SET_ID(state, value) {
            state.id = value;
        },
        // setto l'id del record appena letto
        SET_DB_ID(state, value) {
            state.dbId = value;
        },

        // stabilisco se visualizzare o meno il Share Link
        SET_SHARE_LINK(state, value) {
            state.shareLink = value;
        },

        // setto un flag per abilitare o meno il cambio rotta verso la pagina "read"
        SET_PROG_NAV(state, value) {
            // console.log('progNav set to:', state.progNav);
            state.progNav = value;
        },

        // inizializzo la lista degli id dei records presenti nel DB
        SET_IDS_LIST(state, value) {
            state.idsList = value;
        },
        // aggiungo nella lista degli id, l'id dell'ultimo record appena aggiunto al DB
        SET_ADD_ID_TO_LIST(state, value) {
            state.idsList.push(value);
        }
    },

    actions: {},

    modules: {}
});
