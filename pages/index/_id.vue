<template>
  <div class="products">
    <div class="products__sort">
      <span>Сортировать по:</span>
      <select v-model="sortProperty">
        <option value="price">
          По цене
        </option>
        <option value="rating">
          По популярности
        </option>
        <option value="name">
          По названию
        </option>
      </select>
    </div>
    <Product v-for="product in sortedByProperty" :key="product.id" :product="product" @showHint="showHint" />
    <transition name="appear">
      <div v-if="isHintVisible" class="hint">
        <p>{{ hintText }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import Product from '../../components/Product'

export default {
  components: {
    Product
  },
  data () {
    return {
      sortProperty: null,
      isHintVisible: false,
      hintText: ''
    }
  },
  computed: {
    sortedByCategory () {
      return this.$store.getters['products/products'].filter(product => product.category === +this.$route.params.id)
    },
    sortedByProperty () {
      const sortedProducts = [...this.sortedByCategory]
      return sortedProducts.sort((a, b) => {
        switch (this.sortProperty) {
          case null: return 0
          case 'name': return b[this.sortProperty] < a[this.sortProperty] ? 1 : -1
          default: return b[this.sortProperty] - a[this.sortProperty]
        }
      })
    }
  },
  methods: {
    showHint (text) {
      this.isHintVisible = true
      this.hintText = text

      setTimeout(() => {
        this.isHintVisible = false
        this.hintText = ''
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.appear-enter-active, .appear-leave-active {
  transition: .5s;
}
.appear-enter, .appear-leave-to {
  opacity: 0;
  transform: translate(0, 20px);
}

.products {
  position: relative;
  margin-left: 250px;
  padding: 30px;
  padding-top: 80px;
  display: flex;
  flex-flow: row wrap;

  &__sort {
    position: absolute;
    top: 30px;
    right: 30px;
  }
}

.hint {
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 40px;
  right: 40px;
  height: 40px;
  background-color: black;
  border-radius: 10px;
  box-shadow: 1px 1px 3px lightgray;
  color: #fff;
  padding: 7px;
  font-size: 0.8rem;
}
</style>
