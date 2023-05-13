<template>
    <ion-page>
      <ion-header class="ion-no-border">
        <ion-toolbar>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <div class="checkout-container">
          <div class="checkout-text-container">
            <div class="top-checkout">
              <h1>My Cart</h1>
              <p>{{this.$store.state.totalQuantity}} items</p>
            </div>
          </div>
          <hr />
          <div class="checkout-text-container">
            <div class="main-checkout">
              <li v-for="product in this.$store.state.cart" :key="product">
                <div class="left-checkout">
                  <CheckoutBox v-on:delete="deleteProduct(product)" :name="product.name" :id="product.id" :thumbnail="product.imgs[1]" :price="product.price" :size="product.size"/>
                </div>
                <div class="right-checkout">
                  <div class="cartProduct">
                    <p @click="increaseQuantity(product)">+</p>
                    <p>{{product.quantity}}</p>
                    <p @click="decreaseQuantity(product)">-</p>
                  </div>
                </div>
              </li>
            </div>
          </div>
          <hr />
          <div class="checkout-text-container">
            <div class="pay-container">
              <div class="pay-title-columns">
                <div class="pay-amount-row">
                  <h3>Subtotal</h3>
                </div>
                <div class="pay-amount-row">
                  <h3>Discounts</h3>
                </div>
                <div class="pay-amount-row">
                  <h3>Tax</h3>
                </div>
                <div class="pay-amount-row">
                  <h2>Total</h2>
                </div>
              </div>
              <div class="pay-amount-columns">
                <div class="pay-amount-row">
                  <ion-spinner v-if="this.$store.state.isLoading" name="crescent"></ion-spinner>
                  <h3 v-else>${{this.$store.state.subTotal}}</h3>
                </div>

                <div class="pay-amount-row">
                  <ion-spinner v-if="this.$store.state.isLoading" name="crescent"></ion-spinner>
                  <h3 v-else>${{this.$store.state.discountTotal}}</h3>
                </div>

                <div class="pay-amount-row">
                  <ion-spinner v-if="this.$store.state.isLoading" name="crescent"></ion-spinner>
                  <h3 v-else>${{this.$store.state.taxTotal}}</h3>
                </div>

                <div class="pay-amount-row">
                  <ion-spinner v-if="this.$store.state.isLoading" name="crescent"></ion-spinner>
                  <h2 v-else>${{(this.$store.state.cartTotal)}}</h2>
                </div>
              </div>
            </div>
            <div class="button-cart">
              <ion-button @click="buynow()">Checkout</ion-button>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, toastController, IonSpinner, IonButton } from '@ionic/vue';
import CheckoutBox from '@/components/CheckoutBox.vue';
  
export default  defineComponent({
    name: 'CheckoutPage',
    components: {IonContent, IonPage, IonHeader, IonToolbar, CheckoutBox, IonSpinner, IonButton},
    methods:{
      buynow: function(){
        if(this.$store.state.isLoading){
          this.presentLoadingToast();
        }
        else{
          if(this.$store.state.totalQuantity < 1){
            this.presentToast();
          }
          else{
            this.$router.push('/shop/checkout/cart');
          }
        }
      },
      presentToast: async function() {
        const toast = await toastController.create({
          message: 'Please Add An Item To Cart',
          duration: 2000,
          position: 'bottom',
          cssClass: 'custom-toast',
        });

        await toast.present();
      },
      presentLoadingToast: async function() {
        const toast = await toastController.create({
          message: 'Please Wait Until Loading Is Complete',
          duration: 2000,
          position: 'bottom',
          cssClass: 'custom-toast',
        });

        await toast.present();
      },
      presentFailedToAddToast: async function(message) {
        const toast = await toastController.create({
          message: message,
          duration: 2000,
          position: 'bottom',
          cssClass: 'custom-toast',
        });

        await toast.present();
      },
      get_img_url: function(img){
        const tempUrl = require(`../images/${img}`);
        return tempUrl;
      },
      deleteProduct: function(item){
        this.$store.commit('removeFromCart', item)
        this.$store.dispatch('calculateTotal');
      },
      openProductPage: function(name){
        this.$router.push(name);
      },
      increaseQuantity: async function(item){
        await this.$store.dispatch('hasEnoughStock', item);
        if(this.$store.state.stockMessage != ''){
          this.presentFailedToAddToast(this.$store.state.stockMessage);
        }
      },
      decreaseQuantity: function(item){
        this.$store.commit('decreaseQuanity', item)
        this.$store.dispatch('calculateTotal');
      },
    },
    data(){
      return{
        isLoading: false,
      }
    },
  });
</script>

<style>
.checkout-text-container {
  margin: auto;
  width: 85%;
}
.checkout-container{
}
.checkout-container hr{
  border-width: 2px;
}
.checkout-container p{
  font-family: sofia-pro,sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
}

.checkout-container h1{
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 28px;
}

.top-checkout{
  min-height: 75px;
}
.top-checkout h1{
  padding-top: 8px;
}

.main-checkout{
  min-height: 250px;
}
.main-checkout li{
  list-style-type: none;
  padding-top: 10px;
  display: flex;
}

.left-checkout{
  text-align: left;
  width: 95%;
}
.right-checkout{
  text-align: right;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
}
.pay-container{
  display: flex;
}
.pay-container h3{
  font-family: sofia-pro,sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  margin: 0;
}
.pay-container h2{
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 20px;
  margin: 0;
  padding-top: 10px;
}
.pay-title-columns{
  text-align: left;
  width: 50%
}
.pay-amount-columns{
  text-align: right;
  width: 50%
}
.pay-amount-row{
  min-height: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.pay-amount-row ion-spinner{
  height: 22px;
  width: 22px;
}
.button-cart{
  padding-top: 30px;
  padding-bottom: 15px;
  text-align: center;
}
.button-cart ion-button{
  --color: #f8f8f8;
  --background: #222222;
  --border-radius: 15px;
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 16px;
  width: 80%;
  height: 40px;
  text-transform: none;
  --box-shadow: 0 4px 4px rgba(51, 51, 51, 0.5);
}
</style>