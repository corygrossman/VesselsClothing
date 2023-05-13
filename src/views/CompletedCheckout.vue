<template>
    <ion-page>
      <ion-header class="ion-no-border">
        <ion-toolbar>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <div class="completed-container">
          <div class="completed-text">
            <h1>Thank You! 🔥</h1>
            <h1>You are a Vessel For Change</h1>
            <h3>You should recieve a follow up email with order information. If you do not recieve an email. Please email vpvessels@gmail.com</h3>
            <ion-button @click="goHome()">Go to Home Page</ion-button>
          </div>
        </div>
      </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButton } from '@ionic/vue';

export default  defineComponent({
    name: 'CompletedCheckout',
    components: {IonContent, IonPage, IonHeader,IonToolbar, IonButton,},
    methods:{
      goHome: function(){
        this.$router.push('/');
      }
    }
  });
</script>

<style>
.completed-container{
  min-height: 90vh;
  margin: auto;
  text-align: center;
  padding: 2%;
}
.completed-text{
  position: absolute;
  margin: 0;
  top: 28%;
}
.completed-container h1{
  color: #333333;
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 30px;
  padding-top: 5px;
}
.completed-container h3{
  color: #333333;
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
  padding-top: 5px;
}
.completed-container ion-button{
  --color: #f8f8f8;
  --background: #222222;
  --border-radius: 15px;
  font-family: sofia-pro,sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 16px;
  width: 60%;
  padding-top: 5px;
  --box-shadow: 0 4px 4px rgba(51, 51, 51, 0.5);
}
</style>