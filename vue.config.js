module.exports = {
    transpileDependencies: ['vuetify'],

    // rendo il mio app.scss globale, accessibile da tutti i componenti, senza bisogno di @import
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/sass/app.scss";`
            }
        }
    },
    publicPath: '/digifront/'
};
