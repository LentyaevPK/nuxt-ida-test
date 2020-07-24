<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  font-family: PT Sans, "Roboto", Ubunt, Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}
</style>
