<template>
    <v-container>

      <h1 class="view-title">Read</h1>
      <h3 class="text-center"> record: {{ $store.state.id }}</h3>

<!-- <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="15"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div> -->


      <!-- <StatusCode class="hidden"/> -->
      <InputBar/>
      <ResultPanel/>
      <ShareLink/>

    </v-container>
</template>

<script>
// import StatusCode from '@/components/StatusCode.vue';
import InputBar from '@/components/InputBar.vue';
import ResultPanel from '@/components/ResultPanel.vue';
import ShareLink from '@/components/ShareLink.vue';

export default {
    mounted() {
        this.$store.commit('SET_PROG_NAV', false);
        console.log('mount Read, progNav->', this.$store.state.progNav);
    },
    // data() {
    //     return {
    //         page: 1
    //     };
    // },
    components: {
        // StatusCode,
        InputBar,
        ResultPanel,
        ShareLink
    }
};
</script>

<style lang="scss" scoped>
</style>
