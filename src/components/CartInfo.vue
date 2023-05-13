<template>
    <div class="cartinfo-container">
        <div class="shipping-container">
            <div class="leftCol">
                <div class="cartinfo-text">
                    <h3>Shipping</h3>
                    <p>{{this.namep ? this.namep : 'First Last'}}</p>
                    <p>{{this.addressp ? this.addressp : '123 Seseme Street'}}</p>
                    <p>{{this.cityp ? this.cityp : 'New York'}}, {{this.statep ? this.statep : 'NY'}} {{this.countryp ? this.countryp : 'USA'}} {{this.postalp ? this.postalp : '12345'}}</p>
                </div>
            </div>
            <div class="rightCol">
                <div class="forwardArrow">
                    <ion-button>
                        <ion-icon slot="icon-only" name="chevron-forward"></ion-icon>
                    </ion-button>
                </div>
            </div>
        </div>
        <hr />
        <div class="shipping-container">
            <div class="fullCol">
                <ion-item disabled="true">
                    <ion-checkbox slot="start" :checked="this.sameBillingp"></ion-checkbox>
                    <ion-label>Billing address is the same as shipping address</ion-label>
                </ion-item>
            </div>
        </div>
    </div>
</template>
  
  <script>
  import { defineComponent } from 'vue';
  import {IonButton,IonIcon,IonCheckbox,IonLabel,IonItem} from '@ionic/vue'

  export default defineComponent({
    name: 'CartInfo',
    components : { IonButton,IonIcon,IonCheckbox,IonLabel,IonItem },
    methods: {
        removeQuantity: function(){
            console.log('Remove Quantity')
        },
        navigateTo: function(){
            this.$router.push(this.productUrl);
        }
    },
    props: {
        namep: String,
        addressp: String,
        cityp: String,
        statep: String,
        countryp: String,
        postalp: String,
        sameBillingp: Boolean,
    },
  });
  </script>
  
  <style scoped>
  .cartinfo-container{
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ; 
	-webkit-box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ; 
	-moz-box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ;
  }
  .cartinfo-container hr{
    border-width: 1px;
    color: #33333390;
  }
  .shipping-container{
    display: flex;
  }
  .fullCol{
    width: 100%;
  }
  .leftCol{
    width: 90%;
  }
  .rightCol{
    margin: auto;
  }
  .forwardArrow ion-button{
    font-size: 11px;
   --background: 0;
   --background-activated: 0;
   --box-shadow: none;
   box-shadow: none; 
	-webkit-box-shadow: none; 
	-moz-box-shadow: none; 
}
.forwardArrow ion-icon{
    color: #333333;
    text-align: right;
}
  .cartinfo-text{
    padding: 5%;
  }
  .cartinfo-text h3{
    margin: 0;
    color: #333333;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 19px;
    padding-bottom: 1vh;
  }
  .cartinfo-text p{
    margin: 0;
    line-height: 120%;
    color: #33333390;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
  }
  ion-checkbox {
    --size: 15px;
    --background-checked: #333333;
  }
  
  ion-checkbox::part(container) {
    border-radius: 2px;
    border: 2px solid #333333;
  }
  ion-item{
    --background: #ffffff;
    border-radius: 20px;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.4vh;
  }
  .item-disabled{
   opacity: 1;
  }
  </style>
  