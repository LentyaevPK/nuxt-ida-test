<template>
  <transition name="fade">
    <div v-if="isCartVisible" class="cart">
      <div class="cart__content">
        <span class="cart__close-btn" @click="closeCart">X</span>
        <h2>Корзина</h2>
        <div v-if="!cart.length && !orderSuccess">
          <p>Пока что вы ничего не добавили в корзину.</p>
          <button class="cart__btn" @click="closeCart">
            Перейти к выбору
          </button>
        </div>
        <div v-else-if="cart.length && !orderSuccess">
          <ul class="cart__list">
            <h3 style="color: #59606D; font-weight: 300">
              Товары в корзине
            </h3>
            <transition-group name="fade">
              <li v-for="product in cart" :key="product.id" class="cart__product">
                <img :src="`http://front-test.idalite.com${product.photo}`" alt="product photo" class="cart__product-photo">
                <div class="cart__info">
                  <p>{{ product.name }}</p>
                  <strong>{{ product.price.toLocaleString() }} ₽</strong>
                  <div class="cart__rating">
                    <img src="@/assets/rating.svg" alt="">
                    <span>{{ product.rating }}</span>
                  </div>
                </div>
                <img src="@/assets/trash.svg" alt="delete button" class="cart__delete-btn" @click="removeProductFromCart(product)">
              </li>
            </transition-group>
          </ul>
          <CartForm @orderDone="showSuccessModal" />
        </div>
        <div v-else class="cart__success">
          <img src="@/assets/success.svg" alt="order done">
          <h2>Заявка успешно отправлена</h2>
          <p>Вскоре наш менеджер свяжется с Вами</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CartForm from './CartForm'

export default {
  components: {
    CartForm
  },
  data () {
    return {
      orderSuccess: false
    }
  },
  computed: {
    cart () {
      return this.$store.getters['products/cart']
    },
    isCartVisible () {
      return this.$store.getters['products/isCartVisible']
    }
  },
  methods: {
    closeCart () {
      this.$store.commit('products/closeCart')
    },
    removeProductFromCart (product) {
      this.$store.commit('products/removeFromCart', product.id)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    showSuccessModal () {
      this.orderSuccess = true

      setTimeout(() => {
        this.orderSuccess = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.cart {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #fff, $alpha: 0.8);
  z-index: 20;

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    padding: 70px 50px;
    width: 450px;
    height: 100%;
    min-height: 100%;
    background: #FFFFFF;
    box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px 0px 0px 8px;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__close-btn {
    position: absolute;
    top: 90px;
    right: 50px;
    cursor: pointer;
  }

  &__btn {
    cursor: pointer;
    width: 100%;
    padding: 15px;
    background: #1F1F1F;
    border: none;
    border-radius: 8px;
    color: #fff;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__product {
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  &__product-photo {
    width: 110px;
    height: 130px;
  }

  &__delete-btn {
    cursor: pointer;
    width: 32px;
    height: 32px;
  }

  &__rating {
    margin-top: 5px;
    display: flex;
    align-items: center;
    color: #F2C94C;
  }

  &__success {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
}
</style>
