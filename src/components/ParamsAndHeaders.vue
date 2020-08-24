<template>
    <v-container>

        <v-row>
            <!-- riquadro Parameters -->
            <v-col cols="12" sm="6">
                <v-card class="mx-auto">

                    <v-form v-model="pValid">
                        <v-list-item three-line class="px-1">
                            
                            <v-list-item-content>
                                <v-list-item-title class="headline mb-1 text-center">Parameters/Data</v-list-item-title>
                                <v-row>
                                    <!-- campo KEY -->
                                    <v-col cols="6">
                                        <v-text-field v-model="pName" :rules="validRules" @keypress.13="addParam" label="Key" clearable dense></v-text-field>
                                    </v-col>
                                    <!-- campo VALUE -->
                                    <v-col cols="6">
                                        <v-text-field v-model="pValue" :rules="validRules" @keypress.13="addParam" label="Value" clearable dense></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>

                            <!-- bottone "+" -->
                            <v-btn class="mt-3 ml-2" small :disabled="!pValid" color="primary" @click="addParam">
                                <v-icon class="">mdi-plus-thick</v-icon>
                            </v-btn>

                        </v-list-item>
                    </v-form>

                    <ol v-if="parameterList.length">
                        <!-- ciclo l'array di oggetti "parameterList" tramite un "v-for" -->
                        <li v-for="(item, index) in parameterList" :key="index" :class="item.status  ? '' : 'disabled'">
                            <button class="trash-hover" @click="removeParam(item, index)"><v-icon>mdi-delete</v-icon></button>
                            <!-- se status è "true" visualizzo una checkbox marcata -->
                            <button @click="toggleParam(index)" v-if="item.status"><strong><v-icon>mdi-check-box-outline</v-icon></strong></button>
                            <!-- se status non è "true" visualizzo una checkbox vuota -->
                            <button @click="toggleParam(index)" v-else><strong><v-icon>mdi-checkbox-blank-outline</v-icon></strong></button>
                            {{ item.name }} = {{ item.value}}
                        </li>
                    </ol>
                    <p v-else class="text-center light-gray-bcg">Parameters/Data list is empty!</p>

                </v-card>
            </v-col>

            <!-- riquadro Headers -->
            <v-col cols="12" sm="6">
                <v-card class="mx-auto">

                    <v-form v-model="hValid">
                        <v-list-item three-line class="px-1">
                            
                            <v-list-item-content>
                                <v-list-item-title class="headline mb-1 text-center">Headers</v-list-item-title>
                                <v-row>
                                    <!-- campo KEY -->
                                    <v-col cols="6">
                                        <v-text-field v-model="hName" :rules="validRules" @keypress.13="addHeader" label="Key" clearable dense></v-text-field>
                                    </v-col>
                                    <!-- campo VALUE -->
                                    <v-col cols="6">
                                        <v-text-field v-model="hValue" :rules="validRules" @keypress.13="addHeader" label="Value" clearable dense></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>

                            <!-- bottone "+" -->
                            <v-btn class="mt-3 ml-2" small :disabled="!hValid" color="primary" @click="addHeader">
                                <v-icon class="">mdi-plus-thick</v-icon>
                            </v-btn>

                        </v-list-item>
                    </v-form>

                    <ol v-if="headerList.length">
                        <!-- ciclo l'array di oggetti "hederList" tramite un "v-for" -->
                        <li v-for="(item, index) in headerList" :key="index" :class="item.status  ? '' : 'disabled'">
                            <button class="trash-hover" @click="removeHeader(item, index)"><v-icon>mdi-delete</v-icon></button>
                            <!-- se status è "true" visualizzo una checkbox marcata -->
                            <button @click="toggleHeader(index)" v-if="item.status"><strong><v-icon>mdi-check-box-outline</v-icon></strong></button>
                            <!-- se status non è "true" visualizzo una checkbox vuota -->
                            <button @click="toggleHeader(index)" v-else><strong><v-icon>mdi-checkbox-blank-outline</v-icon></strong></button>
                            {{ item.name }} = {{ item.value}}
                        </li>
                    </ol>
                    <p v-else class="text-center light-gray-bcg">Headers list is empty!</p>

                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    components: {},
    data() {
        return {
            pName: '',
            pValue: '',
            hName: '',
            hValue: '',

            pValid: false,
            hValid: false,
            validRules: [
                v => !!v || 'Required!' // controllo che il campo non sia vuoto
            ]
        };
    },
    computed: {
        ...mapGetters({
            // mappo i getter associandoli a degli identificativi  più esplicativi: 'parameterList' e 'headerList'
            parameterList: 'getParameterList',
            headerList: 'getHeaderList'
        })
    },
    methods: {
        addParam() {
            // verifico che i campi di input non siano vuoti (può succedere quando viene premuto RETURN )
            this.pName = this.pName.trim(); // trimmo il nome del parametro
            if (this.pName != '' && this.pValue != '') {
                // costruisco il nuovo oggetto da inserire nell'array
                let newObject = {
                    name: this.pName,
                    value: this.pValue,
                    status: true
                };
                // inserisco nell'array il nuovo oggetto committando una mutation dello store
                this.$store.commit('SET_PL_PUSH_ITEM', newObject);

                // ripulisco le variabili, in modo che nei campi di input non venga visualizzato nulla
                this.pName = '';
                this.pValue = '';
            }
        },
        toggleParam(index) {
            // faccio un toggle, negando il valore di status, chiamo una mutation che riceve l'index
            // dell'elemento da modificare e il nuovo valore dello status (la negazione di quello corrente)
            // NOTA per passare più di un parametro ad una mutation è necessario passargli un oggetto con dentro i parametri
            this.$store.commit('SET_PL_UPDATE_STATUS', {
                index: index,
                status: !this.parameterList[index].status
            });
        },
        removeParam(item, index) {
            this.$store.commit('SET_PL_REMOVE_ITEM', index);
        },
        addHeader() {
            // verifico che i campi di input non siano vuoti (può succedere quando viene premuto RETURN )
            this.hName = this.hName.trim(); // trimmo l'input
            if (this.hName != '' && this.hValue != '') {
                // costruisco il nuovo oggetto da inserire nell'array
                let newObject = {
                    name: this.hName,
                    value: this.hValue,
                    status: true
                };
                // inserisco nell'array il nuovo oggetto committando una mutation dello store
                this.$store.commit('SET_HDR_PUSH_ITEM', newObject);
                // ripulisco le variabili, in modo che nei campi di input non venga visualizzato nulla
                this.hName = '';
                this.hValue = '';
            }
        },
        toggleHeader(index) {
            // faccio un toggle, negando il valore di status, chiamo una mutation che riceve l'index
            // dell'elemento da modificare e il nuovo valore dello status (la negazione di quello corrente)
            // NOTA per passare più di un parametro ad una mutation è necessario passargli un oggetto con dentro i parametri
            this.$store.commit('SET_HDR_UPDATE_STATUS', {
                index: index,
                status: !this.headerList[index].status
            });
        },
        removeHeader(item, index) {
            this.$store.commit('SET_HDR_REMOVE_ITEM', index);
        }
    }
};
</script>

<style lang="scss" scoped>
.disabled {
    color: $disabled-gray-color;
    font-style: italic;
}
.trash-hover i:hover {
    color: red;
    transform: scale(1.2);
    transition: 0.3s ease-in-out;
}
</style>;
