<template>
    <v-footer
          app
          absolute
          class="font-weight-medium my-footer"
          color="#fb4b3d"
          dark
        >
          <v-col
            class="text-center"
            cols="12"
          >
             &copy; {{ new Date().getFullYear() }} - <strong>Renzo Carara</strong>
          </v-col>
    </v-footer>
</template>

<style lang="scss" scoped>
.my-footer {
    background-color: $red-color;
}
</style>
