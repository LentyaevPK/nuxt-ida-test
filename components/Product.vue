<template>
  <div class="product">
    <div class="product__content">
      <div class="product__rating">
        <img src="@/assets/rating.svg" alt="">
        <span>{{ product.rating }}</span>
      </div>
      <img :src="require(`@/assets/cart_little${isProductInCart ? '_green' : ''}.svg`)" alt="storage" class="product__storage" @click="onCartClick(product)">
      <img :src="`http://front-test.idalite.com${product.photo}`" alt="product photo">
      <p>{{ product.name }}</p>
      <strong>{{ product.price.toLocaleString() }} ₽</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    isProductInCart () {
      return this.$store.getters['products/cart'].find(product => product.id === this.product.id)
    },
    cart () {
      return this.$store.getters['products/cart']
    }
  },
  methods: {
    onCartClick (product) {
      if (!this.isProductInCart) {
        this.$store.commit('products/addToCart', product)
        localStorage.setItem('cart', JSON.stringify(this.cart))
        this.$emit('showHint', 'Товар добавлен в корзину')
      } else {
        this.$store.commit('products/removeFromCart', product.id)
        localStorage.setItem('cart', JSON.stringify(this.cart))
        this.$emit('showHint', 'Товар удален из корзины')
      }
    }
  }
}
</script>

<style lang="scss">
.product {
  padding: 10px;

  &__content {
    position: relative;
    padding: 15px;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    width: 260px;
    height: 270px;

    & img {
      display: block;
      margin: auto;
      max-width: 140px;
      max-height: 180px;
    }
  }

  &__storage {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
  }

  &__rating {
    cursor: pointer;
    position: absolute;
    display: flex;
    top: 15px;
    left: 15px;
    color: #F2C94C;
  }
}
</style>
