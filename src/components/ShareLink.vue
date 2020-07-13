<template>
    <v-container v-if="isLinkToShare">
        <h2 class="share-title text-center">share</h2>
        <div class="text-center">
            <v-btn :disabled=isReadView class="share-button" :to="id" rounded color="#f0f0f0">renzocarara.github.io/digifront/{{ id }}</v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    components: {},
    computed: {
        id() {
            // leggo il valore id dallo store e lo ritorno in formato stringa
            return this.$store.state.id.toString();
        },

        isLinkToShare() {
            return this.$store.state.shareLink;
        },

        isReadView() {
            // verifico se sono sulla view "read" e ritorno true o false
            return this.$route.name == 'read';
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
</style>
