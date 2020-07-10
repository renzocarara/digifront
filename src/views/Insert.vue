<template>
    <v-container>

        <h1 class="view-title">Insert</h1>
        <StatusCode class="hidden"/>
        <InputBar/>
        <ParamsAndHeaders/>

    </v-container>
</template>

<script>
import StatusCode from '@/components/StatusCode.vue';
import InputBar from '@/components/InputBar.vue';
import ParamsAndHeaders from '@/components/ParamsAndHeaders.vue';

export default {
    components: {
        InputBar,
        StatusCode,
        ParamsAndHeaders
    },
    data() {
        return {};
    },
    mounted() {
        // clear the status messages
        this.$store.commit('SET_STATUS_CODE', '');
    }
};
</script>

<style lang="scss" scoped>
//
</style>;
