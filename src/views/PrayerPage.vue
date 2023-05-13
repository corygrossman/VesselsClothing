<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <div class="prayer">
          <div class="prayerbox">
            <h3>How Can We Be Praying For You?</h3>
            <ion-textarea
              placeholder="Add anonymous prayer requests here!"
              :clear-on-edit="true"
              v-model="this.prayer"
            ></ion-textarea>
            <div class="sendprayer">
              <ion-button @click="sendPrayer">
                <div v-if="!this.runAnimation">Send Prayer</div>
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32">
                    <circle class="circle"
                            cx="16"
                            cy="16"
                            r="16"
                            fill="#f2f2f2"/>
                    <path class="check"
                            d="M9 16l5 5 9-9"
                            fill="none"
                            stroke="#222222"
                            stroke-width="2.5"
                            stroke-linecap="round"/>
                </svg>
              </ion-button>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import anime from 'animejs'
  import { IonPage, IonHeader, IonToolbar, IonContent,IonTextarea, IonButton } from '@ionic/vue';
  
  export default  defineComponent({
    name: 'PrayerPage',
    components: { IonHeader, IonToolbar, IonContent, IonPage, IonTextarea, IonButton },
    methods: {
      sendPrayer: async function(){
        this.runAnimation = true;
        this.checkmark();
        const body = JSON.stringify({
        prayer: this.prayer
      });

      const paymentResponse = await fetch('https://us-central1-vessels-clothing.cloudfunctions.net/sendPrayers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      this.prayer = '';
      },
      setAnimationFalse: function(){
        this.runAnimation = false;
        var checkmarkEl = this.$el.querySelector('.checkmark');
        checkmarkEl.style.display = 'none';
        var checkEl = this.$el.querySelector('.check');
        checkEl.style.display = 'none';
      },
      checkmark: function(){

        var checkmarkEl = this.$el.querySelector('.checkmark');
        checkmarkEl.style.display = 'block';
        var checkEl = this.$el.querySelector('.check');
        checkEl.style.display = 'block';

        var logoTimeline = anime.timeline({ direction: 'alternate', loop: true });

        logoTimeline
        .add({
        targets: checkmarkEl,
        scale: [
            { value: [0, 1], duration: 600, easing: 'easeOutQuad' }
        ]
        })
        .add({
        targets: checkEl,
        strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 700,
            delay: 200,
            easing: 'easeOutQuart'
        },
        translateX: {
            value: [6, 0],
            duration: 700,
            delay: 200,
            easing: 'easeOutQuart'
        },
        translateY: {
            value: [-2, 0],
            duration: 700,
            delay: 200,
            easing: 'easeOutQuart'
        },
        offset: 0,
        complete: this.setAnimationFalse,
        });

        },
    },
    data() {
      return {
        prayer: '',
        runAnimation: false,
      }
    }
  });
  </script>

  <style>
  .prayer{
    padding: 2%;
    padding-top: 20px;
  }
  .prayerbox{
    background: #ffffff;
    border-radius: 10px;
    padding: 7%;
    text-align: center;
    box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ; 
    -webkit-box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ; 
    -moz-box-shadow: 0 5px 5px rgba(51, 51, 51, 0.2)  ;
  }
  .prayerbox h3{
    text-align: left;
    margin: 0;
    color: #333333;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 18px;
    padding-bottom: 10px;
  }
  .prayerbox ion-textarea{
    text-align: left;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 15px;
    padding-top: 10px;
    --background: #f2f2f2;
    --color: #333333;
    --padding-end: 10px;
    --padding-start: 10px;
    --placeholder-color: #707070;
    --placeholder-opacity: 0.8;
    border-radius: 10px;
  }
  .sendprayer ion-button{
    width: 50%;
  }
  .sendprayer h3{
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 17px;
  }
  .sendprayer ion-button{
    --background: #222222;
    --background-activated: #5d5c5c;
    --background-focused: #5d5c5c;
    --background-hover: #b0b0b08f;
    --border-radius: 50px;
    font-family: sofia-pro,sans-serif;
    font-weight: 500;
    font-style: normal;
    width: 60%;
    }
    .checkmark{
        display: none;
    }
    .check{
        display: none;
    }
</style>