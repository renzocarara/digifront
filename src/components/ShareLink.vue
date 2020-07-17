<template>
    <v-container v-if="isLinkToShare">
        <h2 class="share-title text-center">share</h2>
        <div class="text-center">
            <v-btn :disabled=isReadView height="auto" class="share-button py-2"
                   @click="moveTo('/'+ id)" rounded color="#f0f0f0">
                   renzocarara.github.io/digifront/{{ id }}</v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    components: {},
    computed: {
        id() {
            // leggo il valore id o dbId dallo store e lo ritorno in formato stringa
            // id viene visualizzato sulla Result view, dbId vie visualizzato sulla Read view
            return this.isReadView
                ? this.$store.state.dbId.toString()
                : this.$store.state.id.toString();
        },

        isLinkToShare() {
            return this.$store.state.shareLink;
        },

        isReadView() {
            // verifico se sono sulla view "read" e ritorno true o false
            return this.$route.name == 'read';
        }
    },
    methods: {
        moveTo(routePath) {
            // verifico di non essere già sulla rotta dove voglio andare
            if (this.$route.path != routePath) {
                //copio i dati della view "result" nelle variabili per la view "read"
                this.$store.commit('SET_COPY_SENT_TO_DB');

                this.$store.commit('SET_PROG_NAV', true);
                // cambio rotta e vado su quella richiesta
                this.$router.push({ path: routePath });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
//
.share-title {
    text-transform: uppercase;
}
.share-button {
    text-transform: lowercase;
}

// NOTA: un bottone con testo troppo lungo non segue le regole del material design....
::v-deep .share-button span {
    width: 100%;
    word-break: break-all;
    white-space: normal;
}
</style>
