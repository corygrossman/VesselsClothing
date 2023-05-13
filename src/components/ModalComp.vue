<template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="confirm">
            <ion-icon slot="icon-only" name="chevron-down"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="form-contents">
        <h2>Shipping Information</h2>
        <ion-item fill="solid" ref="item">
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" @ionInput="validate" @ionBlur="markTouched" v-model="email" required="true"></ion-input>
          <ion-note slot="error">Invalid email</ion-note>
        </ion-item>
        <ion-item fill="solid" ref="item2">
          <ion-label position="floating">First & Last Name</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="name" required="true"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item3">
          <ion-label position="floating">Address</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="address" required="true"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item4">
          <ion-label position="floating">Unit(Optional)</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="unit"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item5">
          <ion-label position="floating">City</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="city"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item8">
          <ion-label position="floating">State</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="state" required="true"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item7">
          <ion-label position="floating">Postal</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="postal" required="true"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item9">
          <ion-select interface="popover" placeholder="Country: We currently only ship to USA" v-model="country">
            <IonSelectOption value="USA">USA</IonSelectOption>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-checkbox slot="start" v-model="sameBilling"></ion-checkbox>
          <ion-label>Billing is the same as shipping address</ion-label>
        </ion-item>
      </div>
      <div class="form-contents" v-if="!this.sameBilling">
        <h2>Billing Information</h2>
        <ion-item fill="solid" ref="item2">
          <ion-label position="floating">Full Name</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="billingname" required="true"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item3">
          <ion-label position="floating">Address</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="billingaddress" required="true"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item4">
          <ion-label position="floating">Unit(Optional)</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="billingunit"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item5">
          <ion-label position="floating">City</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="billingcity"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item8">
          <ion-label position="floating">State</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="billingstate" required="true"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item7">
          <ion-label position="floating">Postal</ion-label>
          <ion-input type="text" @ionBlur="markTouched" v-model="billingpostal" required="true"></ion-input>
        </ion-item>
        <ion-item fill="solid" ref="item9">
          <ion-select interface="popover" placeholder="Country: We currently only ship to USA" v-model="billingcountry">
            <IonSelectOption value="USA">USA</IonSelectOption>
          </ion-select>
        </ion-item>
      </div>
    </ion-content>
  </template>
  
  <script>
    import {
      IonContent,
      IonHeader,
      IonToolbar,
      IonButtons,
      IonButton,
      IonItem,
      IonLabel,
      IonInput,
      IonIcon,
      IonNote,
      IonCheckbox,
      IonSelect, 
      IonSelectOption,
      modalController,
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
      name: 'ModalComp',
      components: { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonInput, IonCheckbox, IonNote, IonIcon, IonSelect, IonSelectOption  },
      props: {
        emailp: String,
        namep: String,
        addressp: String,
        unitp: String,
        cityp: String,
        postalp: String,
        statep: String,
        countryp: String,
        billingnamep: String,
        billingaddressp: String,
        billingunitp: String,
        billingcityp: String,
        billingpostalp: String,
        billingstatep: String,
        billingcountryp: String,
        sameBillingp: Boolean,
      },
      data(){
        return{
          filledForm: {},
          email: this.emailp,
          name: this.namep,
          address: this.addressp,
          unit: this.unitp,
          city: this.cityp,
          postal: this.postalp,
          state: this.statep,
          country: this.countryp,
          billingname: this.billingnamep,
          billingaddress: this.billingaddressp,
          billingunit: this.billingunitp,
          billingcity: this.billingcityp,
          billingpostal: this.billingpostalp,
          billingstate: this.billingstatep,
          billingcountry: this.billingcountryp,
          sameBilling: this.sameBillingp,
        }
      },
      methods: {
        confirm() {
          this.filledForm = {
            'email' : this.email,
            'name' : this.name,
            'address' : this.address,
            'unit' : this.unit,
            'city' : this.city,
            'postal' : this.postal,
            'state' : this.state,
            'country' : this.country,
            'billingname' : this.billingname,
            'billingaddress' : this.billingaddress,
            'billingunit' : this.billingunit,
            'billingcity' : this.billingcity,
            'billingpostal' : this.billingpostal,
            'billingstate' : this.billingstate,
            'billingcountry' : this.billingcountry,
            'sameBilling' : this.sameBilling,
        };
          return modalController.dismiss(this.filledForm, 'confirm');
        },
        validateEmail(email) {
          return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        },

        validate(ev) {
          const value = ev.target.value;

          this.$refs.item.$el.classList.remove('ion-valid');
          this.$refs.item.$el.classList.remove('ion-invalid');

          if (value === '') return;

          this.validateEmail(value)
            ? this.$refs.item.$el.classList.add('ion-valid')
            : this.$refs.item.$el.classList.add('ion-invalid');
        },

        markTouched() {
          this.$refs.item.$el.classList.add('ion-touched')
        }
      },
    });
  </script>

  <style>

  .form-contents{
    margin: 1%;
    padding: 5%;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ; 
	-webkit-box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ; 
	-moz-box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ;
  }
  .form-contents h2{
    text-align: center;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 25px;
  }
  .form-contents ion-item{
    --background: #ffffff;
    border-radius: 20px;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
  }
  .form-contents ion-checkbox {
    --size: 15px;
    --background-checked: #333333;
  }
  .form-contents ion-checkbox::part(container) {
    border-radius: 2px;
    border: 2px solid #333333;
  }
  .form-contents ion-select{

  }
  </style>