<template>
    <v-footer
          app
          class="font-weight-medium my-footer"
          color="#fb4b3d"
          dark
          
        >
          <v-col
            class="text-center"
            cols="12"
          >
             &copy; {{ new Date().getFullYear() }} - <strong>DigiTest</strong>
          </v-col>
    </v-footer>
</template>

<style lang="scss" scoped>
.my-footer {
    background-color: $red-color;
}
</style>
