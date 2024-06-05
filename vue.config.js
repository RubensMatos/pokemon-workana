module.exports = {
  transpileDependencies: ['vuetify'],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/variables.scss"`
      }
    }
  }
};