<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="shop" href="/shop/products">
          <ion-icon :icon="shirt"></ion-icon>
          <ion-label>Shop</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="about" href="/shop/about">
          <ion-icon :icon="earth"></ion-icon>
          <ion-label>About</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="prayer" href="/shop/prayer">
          <ion-icon name="archive"></ion-icon>
          <ion-label>Prayer</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="cart" href="/shop/checkout">
          <ion-badge>
            <ion-spinner v-if="this.$store.state.isLoading" name="crescent"></ion-spinner>
            <div v-else>{{this.$store.state.totalQuantity}}</div>
          </ion-badge>
          <ion-icon name="cart"></ion-icon>
          <ion-label>Cart</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>


<script>
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonBadge, IonSpinner } from '@ionic/vue';
import {earth, push, cart, shirt} from 'ionicons/icons'
export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet, IonBadge, IonSpinner },
  setup() {
    return {
      earth,
      shirt,
      cart,
      push,
    }
  },
});
</script>

<style scoped>
ion-badge{
  --background: #333333;
  --color : #f2f2f2;
  z-index: 100;
}
ion-spinner{
  height: 10px;
  width: 10px;
}
</style>