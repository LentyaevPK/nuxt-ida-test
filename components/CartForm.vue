<template>
  <form class="cart-form" @submit.prevent="onSubmit">
    <h3 style="color: #59606D; font-weight: 300">
      Оформить заказ
    </h3>
    <input
      v-model="name"
      type="text"
      class="cart-form__input"
      placeholder="Ваше имя"
      required
      @input="validateName"
    >
    <input
      v-model="phoneNumber"
      v-mask="mask"
      type="tel"
      class="cart-form__input"
      placeholder="Телефон"
      required
    >
    <input
      v-model="adress"
      type="text"
      class="cart-form__input"
      placeholder="Адрес"
      required
    >
    <button type="submit" class="cart__btn">
      Отправить
    </button>
    <p v-if="showInvalidHint">
      Все поля обязательные.<br>После удачной отправки формы содержимое корзины очищается
    </p>
  </form>
</template>

<script>
import { VueMaskDirective } from 'v-mask'

export default {
  directives: {
    mask: VueMaskDirective
  },
  data () {
    return {
      name: '',
      phoneNumber: '',
      adress: '',
      mask: '+7(###) ###-##-##',
      showInvalidHint: false
    }
  },
  computed: {
    isValid () {
      return !!(this.name.trim() && this.phoneNumber.length === 17 && this.adress.trim())
    }
  },
  methods: {
    validateName (e) {
      this.name = this.name.replace(/[^а-яА-Я]/g, '')
    },
    onSubmit () {
      if (this.isValid) {
        const orderList = JSON.parse(localStorage.getItem('orderList')) || []

        const order = {
          name: this.name,
          phoneNumber: this.phoneNumber,
          adress: this.adress
        }

        orderList.push(order)
        localStorage.setItem('orderList', JSON.stringify(orderList))
        this.$store.commit('products/clearCart')
        this.$emit('orderDone')
      } else {
        this.showInvalidHint = true
      }
    }
  }
}
</script>

<style lang="scss">
.cart-form {
  width: 100%;

  &__input {
    width: 100%;
    background: #F8F8F8;
    border-radius: 8px;
    margin-bottom: 15px;
    border: none;
    font-size: 16px;
    padding: 15px;
  }
}
</style>
