<template>
  <div class="main">
    <aside class="categories">
      <h2>Каталог</h2>
      <ul class="categories__list">
        <li
          v-for="category in categories"
          :key="category.id"
          class="categories__item"
        >
          <nuxt-link :to="`/${category.id}`" class="categories__links">
            {{ category.name }}
          </nuxt-link>
        </li>
      </ul>
    </aside>
    <nuxt-child />
    <Cart />
  </div>
</template>

<script>
import Cart from '../components/Cart'

export default {
  components: {
    Cart
  },
  async fetch ({ store }) {
    if (store.getters['products/products'].length === 0) {
      await store.dispatch('products/fetchProducts')
    }

    if (store.getters['products/productsCategories'].length === 0) {
      await store.dispatch('products/fetchProductsCategories')
    }
  },
  middleware: ['categories'],
  computed: {
    categories () {
      return this.$store.getters['products/productsCategories']
    }
  },
  beforeMount () {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    this.$store.commit('products/setCart', cart)
  }
}
</script>

<style lang="scss">
.main {
  margin-top: 80px;
}

.categories {
  position: fixed;
  left: 0;
  height: 100%;
  width: 250px;
  padding: 30px 0 0 60px;

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    margin-bottom: 10px;
  }

  &__links {
    color: #959DAD;
    text-decoration: none;
    &:hover {
      color: #59606D;
    }
  }
}

.nuxt-link-exact-active {
  text-decoration: underline;
  color: #59606D;
}
</style>
