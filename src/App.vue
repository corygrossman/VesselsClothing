<template>
  <div class="iphone">
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  </div>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import './theme/main-css.css'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  }
});
</script>

<style>
@media screen and (min-width: 100px) {
  .iphone {
    
  }
}

@media screen and (min-width: 500px) {
  .iphone {
    display: block;
    background-image: url("./images/iphone.png");
    position: absolute;
    left: 0;
    right: 0;
    top: 4vh;
    margin: auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 90vh;
    max-height: 90vh;
  }
  ion-app{
    transform: translateY(-1.5vh);
    border-radius: 40px;
    margin: auto;
    height: 82vh;
    max-height: 82vh;
    max-width: calc(90vh*.42);
  }
}
</style>
