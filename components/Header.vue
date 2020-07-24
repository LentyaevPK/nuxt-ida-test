<template>
  <header class="header">
    <h1>TestList</h1>
    <div class="header__storage">
      <img :src="require('@/assets/cart.svg')" alt="storage" @click="openCart" />
      <span>{{ cartLength }}</span>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    cartLength () {
      return this.$store.getters['products/cart'].length
    }
  },
  methods: {
    openCart () {
      this.$store.commit('products/showCart')
    }
  }
}
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;
  padding: 0 80px;
  color: #59606d;
  z-index: 10;

  &__storage {
    position: relative;
    cursor: pointer;

    & span {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      background-color: grey;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      font-size: 0.9rem;
      text-align: center;
    }
  }
}
</style>
