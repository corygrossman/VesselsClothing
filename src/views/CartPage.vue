<template>
  <ion-page>
    <ion-header class="ion-no-border">
          <ion-toolbar>
              <ion-buttons slot="start" defaultHref="/shop/checkout">
                  <ion-back-button text=""></ion-back-button>
              </ion-buttons>
          </ion-toolbar>
      </ion-header>
    <ion-content :fullscreen="true">
      <div class="shipping">
        <CartInfo 
        :namep="this.shippingData.name"
        :addressp="this.shippingData.address"
        :cityp="this.shippingData.city"
        :postalp="this.shippingData.postal"
        :statep="this.shippingData.state"
        :countryp="this.shippingData.country"
        :sameBillingp="this.shippingData.sameBilling"
        @click="openModal()"/>
      </div>
      <div class="shipping">
        <div class="paymentbox">
          <h2>Express Checkout</h2>
          <form id="payment-form">
            <div id="apple-pay-button"></div>
            <div id="google-pay-button"></div>
          </form>
        </div>
      </div>
      <div class="shipping">
        <div class="paymentbox">
          <h2>Card Information</h2>
          <form id="payment-form">
            <div id="card-container"></div>
            <div class="button-checkout">
              <button id="card-button" type="button">
                <ion-spinner v-if="this.processingPayment" name="crescent"></ion-spinner>
                <div v-else>Pay</div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="payment-status-container"></div>
      <div class="shipping">
        <div class="paymentbox">
          <h2>What's God Been Doing in Your Life</h2>
          <ion-textarea
            placeholder="Add a testimony to your order here!"
            :clear-on-edit="true"
            v-model="this.shippingData.testimony"
          ></ion-textarea>
        </div>
      </div>
      <div class="shipping">
        <div class="paymentbox">
          <h2>Summary<br/></h2>
          <div class="pay-container">
            <div class="pay-title-columns">
              <h3>Subtotal</h3>
              <h3>Discounts</h3>
              <h3>Tax</h3>
              <h3>Shipping</h3>
              <h2>Total</h2>
            </div>
            <div class="pay-amount-columns">
              <h3>${{this.$store.state.subTotal}}</h3>
              <h3>${{this.$store.state.discountTotal}}</h3>
              <h3>${{this.$store.state.taxTotal}}</h3>
              <h3>$7</h3>
              <h2>${{(this.$store.state.cartTotal + 7)}}</h2>
            </div>
          </div>
        </div> 
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonBackButton, IonTextarea,modalController, toastController, IonSpinner } from '@ionic/vue';
import CartInfo from '@/components/CartInfo.vue';
import ModalComp from '@/components/ModalComp.vue'

const appId = 'sq0idp-_ocjHMI3IKOfdSWF8ItIAA';
const locationId = 'LPDFAWR6C61AP';

export default  defineComponent({
  name: 'CartPage',
  components: {IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, CartInfo, IonTextarea, IonSpinner },
  data(){
    return{
      shippingData: {
            email : '',
            name : '',
            address : '',
            unit : '',
            city : '',
            postal : '',
            state : '',
            country : '',
            billingname : '',
            billingaddress : '',
            billingunit : '',
            billingcity : '',
            billingpostal : '',
            billingstate : '',
            billingcountry : '',
            testimony: '',
            sameBilling: true,
        },
        processingPayment: false,
    }
  },
  methods: {
    async openModal() {
        const modal = await modalController.create({
          component: ModalComp,
          componentProps: {
            emailp: this.shippingData.email, 
            namep: this.shippingData.name, 
            addressp: this.shippingData.address, 
            unitp: this.shippingData.unit,
            cityp: this.shippingData.city,
            postalp: this.shippingData.postal,
            statep: this.shippingData.state,
            countryp: this.shippingData.country,
            billingnamep: this.shippingData.billingname, 
            billingaddressp: this.shippingData.billingaddress, 
            billingunitp: this.shippingData.billingunit,
            billingcityp: this.shippingData.billingcity,
            billingpostalp: this.shippingData.billingpostal,
            billingstatep: this.shippingData.billingstate,
            billingcountryp: this.shippingData.billingcountry,
            sameBillingp: this.shippingData.sameBilling,
          },
        });
        modal.present();

        const { data, role } = await modal.onWillDismiss();

        if (role === 'confirm') {
          this.shippingData = data;
        }
      },
      isAddressFilled: function(){

        //shipping form filled out
        if(this.shippingData.address != '' && this.shippingData.email != '' && this.shippingData.name != '' &&
        this.shippingData.city != '' && this.shippingData.postal != '' && this.shippingData.state != ''){
          //if the billing is different from shipping
          if(!this.shippingData.sameBilling){
            //billing filled out when separate billing
            if(this.shippingData.billingaddress != '' && this.shippingData.billingname != '' &&
        this.shippingData.billingcity != '' && this.shippingData.billingpostal != '' && this.shippingData.billingstate != ''){
              return true;
            }
            else{
              return false;
            }
          }
          else{
            return true;
          }
        }
        else{
          return false;
        }
      },
      goToCompletedPage: function(){
        //redirects page to the completion page
        this.$router.push('/completed');
      },
      presentToast: async function() {
        const toast = await toastController.create({
          message: 'Please fill out the shipping information above',
          duration: 2000,
          position: 'bottom',
          cssClass: 'custom-toast',
        });

        await toast.present();
      },
      openReceipt: function(){

      },
    initializeCard: async function(payments){
      const card = await payments.card();
      await card.attach('#card-container');

      return card;
    },
    buildPaymentRequest: function(payments){
      let tempAmount = (this.$store.state.cartTotal + 7);
      let amountReq = tempAmount.toString();
      console.log(amountReq);
      return payments.paymentRequest({
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          amount: amountReq,
          label: 'Total',
        },
      });
    },
    initializeApplePay: async function(payments) {
      const paymentRequest = this.buildPaymentRequest(payments);
      const applePay = await payments.applePay(paymentRequest);
      // Note: You do not need to `attach` applePay.
      return applePay;
    },
    initializeGooglePay: async function(payments) {
      const paymentRequest = this.buildPaymentRequest(payments);
      const googlePay = await payments.googlePay(paymentRequest);
      await googlePay.attach('#google-pay-button');

      return googlePay;
    },
    createPayment: async function(token) {
      const body = JSON.stringify({
        locationId,
        sourceId: token,
        cart: this.$store.state.cart,
        collectedInfo: this.shippingData,
      });

      const paymentResponse = await fetch('https://us-central1-vessels-clothing.cloudfunctions.net/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (paymentResponse.ok) {
        return paymentResponse.json();
      }

      const errorBody = await paymentResponse.text();
      throw new Error(errorBody);
    },
    tokenize: async function(paymentMethod) {
      const tokenResult = await paymentMethod.tokenize();
      if (tokenResult.status === 'OK') {
        return tokenResult.token;
      } else {
        let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
        if (tokenResult.errors) {
          errorMessage += ` and errors: ${JSON.stringify(
            tokenResult.errors
          )}`;
        }

        throw new Error(errorMessage);
      }
    },

    // status is either SUCCESS or FAILURE;
    displayPaymentResults: function(status) {
      const statusContainer = document.getElementById(
        'payment-status-container'
      );
      if (status === 'SUCCESS') {
        statusContainer.classList.remove('is-failure');
        statusContainer.classList.add('is-success');
      } else {
        statusContainer.classList.remove('is-success');
        statusContainer.classList.add('is-failure');
      }

      statusContainer.style.visibility = 'visible';
    },
            // Checkpoint 2.
      handlePaymentMethodSubmission: async function(event, paymentMethod) {
        event.preventDefault();
        const cardButton = document.getElementById('card-button');

        try {
          // disable the submit button as we await tokenization and make a payment request.
          if(this.isAddressFilled()){
            cardButton.disabled = true;
            this.processingPayment = true;
            const token = await this.tokenize(paymentMethod);
            const paymentResults = await this.createPayment(token);

            this.displayPaymentResults('SUCCESS');

            //resets cart
            this.$store.commit('resetCart');

            this.goToCompletedPage();
          }
          else{
            this.presentToast();
          }
          //console.debug('Payment Success', paymentResults);
        } catch (e) {
          cardButton.disabled = false;
          this.displayPaymentResults('FAILURE');
          //console.error(e.message);
        }

        this.processingPayment = false;

        return{}
      }

  },
  async mounted (){
    if (!window.Square) {
        throw new Error('Square.js failed to load properly');
      }

      let payments;
      try {
        payments = window.Square.payments(appId, locationId);
      } catch {
        const statusContainer = document.getElementById(
          'payment-status-container'
        );
        statusContainer.className = 'missing-credentials';
        statusContainer.style.visibility = 'visible';
        return;
      }

      let card;
      try {
        card = await this.initializeCard(payments);
      } catch (e) {
        console.error('Initializing Card failed', e);
        return;
      }

      let applePay;
      try {
        applePay = await this.initializeApplePay(payments);
      } catch (e) {
        console.error('Initializing Apple Pay failed', e);
        // There are a number of reason why Apple Pay may not be supported
        // (e.g. Browser Support, Device Support, Account). Therefore you should handle
        // initialization failures, while still loading other applicable payment methods.
      }

      let googlePay;
      try {
        googlePay = await this.initializeGooglePay(payments);
      } catch (e) {
        console.error('Initializing Google Pay failed', e);
        // There are a number of reason why Google Pay may not be supported
        // (e.g. Browser Support, Device Support, Account). Therefore you should handle
        // initialization failures, while still loading other applicable payment methods.
      }


      const cardButton = document.getElementById('card-button');
      cardButton.addEventListener('click', async () => {
        await this.handlePaymentMethodSubmission(event, card);
      });

      if (applePay) {
        const applePayButton = document.getElementById('apple-pay-button');
        applePayButton.addEventListener('click', async () => {
          await this.handlePaymentMethodSubmission(event, applePay);
        });
      }

      // Checkpoint 2.
      if (googlePay) {
        const googlePayButton = document.getElementById('google-pay-button');
        googlePayButton.addEventListener('click', async () => {
          await this.handlePaymentMethodSubmission(event, googlePay);
        });
      }
  }
});
</script>

<style>
.shipping{
  padding: 2%;
}
.paymentbox{
  background: #ffffff;
  border-radius: 10px;
  padding: 5%;
  text-align: left;
  box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ; 
	-webkit-box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ; 
	-moz-box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ;
}
.paymentbox h2{
  margin: 0;
  color: #333333;
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 19px;
  padding-bottom: 5px;
}
.paymentbox h3{
  margin: 0;
  color: #333333;
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 16px;
  padding-bottom: 5px;
}
.paymentbox ion-textarea{
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 15px;
  padding-bottom: 5px;
  --background: #f2f2f2;
  --color: #333333;
  --padding-end: 10px;
  --padding-start: 10px;
  --placeholder-color: #707070;
  --placeholder-opacity: 0.8;
  border-radius: 10px;
}
.paymentbox ion-spinner{
  height: 20px;
  width: 20px;
  margin: auto;
  --color: #f2f2f2;
}
#apple-pay-button {
  height: 43px;
  width: 100%;
  display: inline-block;
  -webkit-appearance: -apple-pay-button;
  -apple-pay-button-type: plain;
  -apple-pay-button-style: black;
}
#apple-pay-button button {
  width: 100%;
  border-radius: 10px;
}

#google-pay-button {
  height: 40px;
  width: 100%;
  display: inline-block;
}
#google-pay-button button {
  width: 100%;
  border-radius: 5px;
  border-color: #000000;
}

#payment-form {
  margin: auto;
}

.buyer-inputs {
display: flex;
gap: 20px;
justify-content: space-between;
border: none;
margin: 0;
padding: 0;
}

#card-container {
padding-top: 20px;
/* this height depends on the size of the container element */
/* We transition from a single row to double row at 485px */
/* Settting this min-height minimizes the impact of the card form loading */
min-height: 90px;
}

#gift-card-container {
margin-top: 45px;
min-height: 90px;
}

@media screen and (max-width: 500px) {
#card-container {
  min-height: 140px;
}
}

#ach-button {
margin-top: 20px;
}

#landing-page-layout {
width: 80%;
margin: 150px auto;
max-width: 1000px;
}

#its-working {
color: #737373;
}

#example-container {
width: 100%;
border: 1px solid #b3b3b3;
padding: 48px;
margin: 32px 0;
border-radius: 12px;
}

#example-list {
display: flex;
flex-direction: column;
gap: 15px;
}

#customer-input {
margin-bottom: 40px;
}

#card-input {
margin-top: 0;
margin-bottom: 40px;
}

h3 {
margin: 0;
}

p {
line-height: 24px;
}

label {
font-size: 12px;
width: 100%;
}

input {
padding: 12px;
width: 100%;
border-radius: 5px;
border-width: 1px;
margin-top: 20px;
font-size: 16px;
border: 1px solid rgba(0, 0, 0, 0.15);
}

input:focus {
border: 1px solid #006aff;
}

button {
  color: #f2f2f2;
  background-color: #222222;
  border-radius: 10px;
  cursor: pointer;
  border-style: none;
  user-select: none;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  padding: 12px;
  width: 100%;
  box-shadow: 1px;
}
button:active {
  background-color: rgb(0, 85, 204);
}
button:disabled {
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.3);
}

.button-checkout button{
  color: #f2f2f2;
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
  border-radius: 5px;
  background: #000000;
  min-height: 40px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 9px;
  box-shadow: 0 4px 4px rgba(51, 51, 51, 0.5)  ; 
	-webkit-box-shadow: 0 4px 4px rgba(51, 51, 51, 0.5)  ; 
	-moz-box-shadow: 0 4px 4px rgba(51, 51, 51, 0.5)  
}

.button-checkout button:disabled,button[disabled]{
  background: #33333380;
}
.button-checkout button:active{
  box-shadow: 0 -4px 6px rgba(248, 248, 248, 0.3) inset; 
	-webkit-box-shadow: 0 -4px 6px rgba(248, 248, 248, 0.3) inset; 
	-moz-box-shadow: 0 -4px 6px rgba(248, 248, 248, 0.3) inset;
}

#payment-status-container {
display: flex;
align-items: center;
justify-content: center;
border: 1px solid rgba(0, 0, 0, 0.05);
box-sizing: border-box;
border-radius: 50px;
margin: 0 auto;
max-width: 225px;
max-height: 48px;
visibility: hidden;
}

#payment-status-container.missing-credentials {
width: 350px;
}

#payment-status-container.is-success:before {
content: '';
background-color: #00b23b;
width: 16px;
height: 16px;
margin-right: 16px;
-webkit-mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0968 6.31744 12.0978 5.68597 11.7093 5.29509C11.3208 4.90422 10.6894 4.90128 10.2973 5.28852L11 6C10.2973 5.28852 10.2973 5.28853 10.2973 5.28856L10.2971 5.28866L10.2967 5.28908L10.2951 5.29071L10.2886 5.29714L10.2632 5.32224L10.166 5.41826L9.81199 5.76861C9.51475 6.06294 9.10795 6.46627 8.66977 6.90213C8.11075 7.4582 7.49643 8.07141 6.99329 8.57908L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E");
mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0968 6.31744 12.0978 5.68597 11.7093 5.29509C11.3208 4.90422 10.6894 4.90128 10.2973 5.28852L11 6C10.2973 5.28852 10.2973 5.28853 10.2973 5.28856L10.2971 5.28866L10.2967 5.28908L10.2951 5.29071L10.2886 5.29714L10.2632 5.32224L10.166 5.41826L9.81199 5.76861C9.51475 6.06294 9.10795 6.46627 8.66977 6.90213C8.11075 7.4582 7.49643 8.07141 6.99329 8.57908L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E");
}

#payment-status-container.is-success:after {
content: 'Payment successful';
font-size: 14px;
line-height: 16px;
}

#payment-status-container.is-failure:before {
content: '';
background-color: #cc0023;
width: 16px;
height: 16px;
margin-right: 16px;
-webkit-mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
}

#payment-status-container.is-failure:after {
content: 'Payment failed';
font-size: 14px;
line-height: 16px;
}

#payment-status-container.missing-credentials:before {
content: '';
background-color: #cc0023;
width: 16px;
height: 16px;
margin-right: 16px;
-webkit-mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
}

#payment-status-container.missing-credentials:after {
content: 'applicationId and/or locationId is incorrect';
font-size: 14px;
line-height: 16px;
}

#payment-status-container.is-success.store-card-message:after {
content: 'Store card successful';
}

#payment-status-container.is-failure.store-card-message:after {
content: 'Store card failed';
}

#afterpay-button {
height: 40px;
}

.pay-container{
  display: flex;
}
.pay-container h3{
  font-family: sofia-pro,sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  padding-top: 10px;
}
.pay-container h2{
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 19px;
  padding-top: 15px;
}
.pay-title-columns{
  text-align: left;
  width: 50%
}
.pay-amount-columns{
  text-align: right;
  width: 50%
}
</style>