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
        <div v-for="image in this.imageurls" :key="image" class="modal-image">
            <img :src="require(`../images/${image}`)" alt="A further look into the product image">
        </div>
    </ion-content>
  </template>
  
  <script>
    import {
      IonContent,
      IonHeader,
      IonToolbar,
      IonButton,
      IonIcon,
      modalController,
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
      name: 'ImageModal',
      components: { IonContent, IonHeader, IonToolbar, IonButton, IonIcon},
      props: {
        imageurlsp: [],
      },
      data(){
        return{
          imageurls: this.imageurlsp,
        }
      },
      methods: {
        confirm() {
          return modalController.dismiss(this.filledForm, 'confirm');
        },
      },
    });
  </script>

  <style>
  </style>