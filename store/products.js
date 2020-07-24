export const state = () => ({
  products: [],
  productsCategories: [],
  cart: [],
  isCartVisible: false
})

export const getters = {
  products: state => state.products,
  productsCategories: state => state.productsCategories,
  cart: state => state.cart,
  isCartVisible: state => state.isCartVisible
}

export const actions = {
  async fetchProducts ({ commit }) {
    const products = await this.$axios.$get('http://front-test.idalite.com/api/product')
    commit('setProducts', products)
  },
  async fetchProductsCategories ({ commit }) {
    const categories = await this.$axios.$get('http://front-test.idalite.com/api/product-category')
    commit('setProductsCategories', categories)
  }
}

export const mutations = {
  setProducts (state, products) {
    state.products = products
  },
  setProductsCategories (state, categories) {
    state.productsCategories = categories
  },
  addToCart (state, product) {
    state.cart.push(product)
  },
  removeFromCart (state, productId) {
    state.cart = state.cart.filter(product => product.id !== productId)
  },
  showCart (state) {
    state.isCartVisible = true
  },
  closeCart (state) {
    state.isCartVisible = false
  },
  clearCart (state) {
    state.cart = []
  },
  setCart (state, cart) {
    state.cart = cart
  }
}
