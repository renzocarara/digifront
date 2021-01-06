<template>
    <v-container>

      <h1 class="view-title">Result</h1>
      <StatusCode/>
      <InputBar/>
      <ResultPanel/>
      <ShareLink/>

    </v-container>
</template>

<script>
import StatusCode from '@/components/StatusCode.vue';
import InputBar from '@/components/InputBar.vue';
import ResultPanel from '@/components/ResultPanel.vue';
import ShareLink from '@/components/ShareLink.vue';

export default {
    components: {
        StatusCode,
        InputBar,
        ResultPanel,
        ShareLink
    }
};
</script>

<style lang="scss" scoped>
</style>
