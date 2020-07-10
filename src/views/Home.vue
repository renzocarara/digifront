<template>
<v-container>
    <div class="content">
        <div>
            <img class="digi-logo" alt="Vue logo" src="../assets/digi_logo.png" />
            <h1>DigiFront</h1>
            <p class="text-center">A Http Requests Web Application</p>
            <div class="my-2">
                <v-btn to="/insert" block x-large color="#9A0E03" dark>Start Here</v-btn>
            </div>
        </div>    
    </div>
</v-container>
</template>


<script>
export default {
    components: {},
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    height: calc(100vh - 133px);

    h1 {
        font-family: 'Nunito', sans-serif;
        margin-left: 20px;
        display: inline-block;
        color: $title-color;
        font-size: 84px;
        font-weight: 200;
    }
}

@media screen and (max-width: 599px) {
    .content h1 {
        margin-left: 10px;
        font-size: 54px;
    }
    .digi-logo {
        width: 40px;
    }
}
</style>
