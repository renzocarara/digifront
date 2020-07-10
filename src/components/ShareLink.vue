<template>
    <v-container>
        <h2 class="share-title text-center">share</h2>
        <div class="text-center">
            <v-btn :disabled=isReadView class="share-button" :to="id" rounded color="#f0f0f0">renzocarara.github.io/digifront/{{ id }}</v-btn>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    components: {},
    computed: {
        ...mapGetters({
            // mappo i getter associandoli a degli identificativi
            id: 'getId'
        }),

        isReadView() {
            // verifico se sono sulla view "read" e ritorno true o false
            // console.log('id=', this.id);
            // console.log('params.id', this.$route.params.id);
            // console.log('this.$route.name', this.$route.name);

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
