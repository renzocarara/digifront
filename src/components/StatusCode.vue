<template>
    <v-container class="pt-0 pb-3 px-0">
        <transition name="fade" mode="out-in" appear>
            <v-card
                class="mx-auto no-border"
                max-width="300"
                height="72"
                outlined
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title v-if="statusError!=''" class="headline mb-1 text-center">{{ statusError }}</v-list-item-title>
                        <v-list-item-title v-else class="headline mb-1 text-center">{{ statusCode }} <span style="font-size:14px;">{{ statusText}}</span></v-list-item-title>
                        <v-list-item-subtitle class="text-center">{{ descriptiveText }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

            </v-card>
        </transition>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {};
    },
    components: {},
    method: {},
    mounted() {},
    computed: {
        // questi aliases dei getters vengono richiamati nel codice HTML della sezione <template></template>
        ...mapGetters({
            statusCode: 'getStatusCode',
            statusText: 'getStatusText',
            statusError: 'getStatusError',
            descriptiveText: 'getDescriptiveText'
        })
    }
};
</script>

<style lang="scss" scoped>
//
</style>;