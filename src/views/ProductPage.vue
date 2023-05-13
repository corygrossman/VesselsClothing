<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start" defaultHref="/shop/products">
                    <ion-back-button text=""></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="swiper-container">
                <swiper
                :effect="'coverflow'"
                :grabCursor="true"
                :centeredSlides="true"
                :slidesPerView="2"
                :coverflowEffect="{
                rotate: 5,
                stretch: 40,
                depth: 10,
                modifier: 1,
                slideShadows: true,
                scale: .7,
                }"
                :pagination="{
                    dynamicBullets: true,
                    clickable: true,
                }"
                :modules="modules"
                :initial-slide="1"
                class="mySwiper" >
                    <swiper-slide v-for="image in this.activeColor.images" :key="image">
                        <img @click="openModal(this.activeColor.images)" :src="require(`../images/${image}`)" alt="">
                    </swiper-slide>
                </swiper>
            </div>
            <div class="product-description">
                <div class="top-font">
                    <div class="title-column">
                        <h1>{{product.name}}</h1>
                    </div>
                    <div class="title-column">
                        <h2>${{product.price}}</h2>
                    </div>
                </div>
                <p>
                    {{product.descr}}
                </p>
                <div class="size-grid">
                    <div class="leftSize">
                        <h2>
                        Size
                        </h2>
                        <div class="size-buttons">
                            <ion-button :fill="[this.activeSize == 'S' ? 'solid' : 'outline']" :disabled='this.disabledArray[0]' @click="smallSize()">
                                <ion-spinner v-if="this.loadingData" name="crescent"></ion-spinner>
                                <div v-else>S</div>
                            </ion-button>
                            <ion-button :fill="[this.activeSize == 'M' ? 'solid' : 'outline']" :disabled='this.disabledArray[1]' @click="mediumSize()">
                                <ion-spinner v-if="this.loadingData" name="crescent"></ion-spinner>
                                <div v-else>M</div>
                            </ion-button>
                            <ion-button :fill="[this.activeSize == 'L' ? 'solid' : 'outline']" :disabled='this.disabledArray[2]' @click="largeSize()">
                                <ion-spinner v-if="this.loadingData" name="crescent"></ion-spinner>
                                <div v-else>L</div>
                            </ion-button>
                            <ion-button :fill="[this.activeSize == 'XL' ? 'solid' : 'outline']" :disabled='this.disabledArray[3]' @click="xlargeSize()">
                                <ion-spinner v-if="this.loadingData" name="crescent"></ion-spinner>
                                <div v-else>XL</div>
                            </ion-button>
                            <ion-button :fill="[this.activeSize == 'XXL' ? 'solid' : 'outline']" :disabled='this.disabledArray[4]' @click="xxlargeSize()">
                                <ion-spinner v-if="this.loadingData" name="crescent"></ion-spinner>
                                <div v-else>XXL</div>
                            </ion-button>
                        </div>
                    </div>
                    <div class="rightSize">
                        <h2>
                        Color
                        </h2>
                        <div class="color-buttons">
                            <div class="colors" v-for="(color, index) in this.product.colors" :key="color">
                                <ion-button :fill="[this.product.selectedColor == index ? 'outline' : 'clear']" @click="changeColor(index)">
                                    <ion-spinner v-if="this.loadingData" name="crescent"></ion-spinner>
                                    <div v-else>
                                        <div class="fill-color" :style="{backgroundColor: color.hex}"></div>
                                    </div>
                                </ion-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-button">
                    <ion-button @click="addToCart()">
                        <div v-if="!this.isSoldOut">
                            <h3 v-if="!this.runAnimation">Add to Cart</h3>
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
                        </div>
                        <div v-else>
                            <h3>Sold Out</h3>
                        </div>
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
  </template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonBackButton, toastController, IonSpinner, modalController} from '@ionic/vue';
import {cart, refresh} from 'ionicons/icons'
import {db} from '../firebase'
import { collection, getDocs } from "firebase/firestore"; 
import ImageModal from '../components/ImageModal.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import anime from 'animejs';

export default  defineComponent({
  name: 'ProductPage',
  components: { IonContent, IonPage, IonButton, IonButtons, IonBackButton, IonHeader, IonToolbar, Swiper, SwiperSlide, IonSpinner},
  setup(){
      return {
          cart,refresh,
          modules: [EffectCoverflow,Pagination],
          }
  },
  methods:{
    async openModal(urls) {
        const modal = await modalController.create({
          component: ImageModal,
          componentProps: {
            imageurlsp: urls,
          },
        });
        modal.present();

        const { role } = await modal.onWillDismiss();
        

      },
    smallSize: function(){
        if(this.activeSize != 'S'){
            this.product.id = this.baseSku + '-S';
            this.product.catalogItemId = this.catalogItemIdArray[0];
            this.product.size = 'S';

            this.activeSize = 'S'
        }
        else{
            this.resetSize();
        }
    },
    mediumSize: function(){
        if(this.activeSize != 'M'){
            this.product.id = this.baseSku + '-M';
            this.product.catalogItemId = this.catalogItemIdArray[1];
            this.product.size = 'M';

            this.activeSize = 'M'
        }
        else{
            this.resetSize();
        }
    },
    largeSize: function(){
        if(this.activeSize != 'L'){
            this.product.id = this.baseSku + '-L';
            this.product.catalogItemId = this.catalogItemIdArray[2];
            this.product.size = 'L';

            this.activeSize = 'L'
        }
        else{
            this.resetSize();
        }
    },
    xlargeSize: function(){
        if(this.activeSize != 'XL'){
            this.product.id = this.baseSku + '-XL';
            this.product.catalogItemId = this.catalogItemIdArray[3];
            this.product.size = 'XL';

            this.activeSize = 'XL'
        }
        else{
            this.resetSize();
        }
    },
    xxlargeSize: function(){
        if(this.activeSize != 'XXL'){
            this.product.id = this.baseSku + '-XXL';
            this.product.catalogItemId = this.catalogItemIdArray[4];
            this.product.size = 'XXL';

            this.activeSize = 'XXL'
        }
        else{
            this.resetSize();
        }
    },
    changeColor: function(index){
        //sets the size back to null on color change
        this.activeSize = null;

        //removes the last character of the string and adds in the new index
        this.baseSku = this.baseSku.slice(0,-1);
        this.baseSku = this.baseSku + index.toString();

        this.product.selectedColor = index;
        this.activeColor = this.product.colors[index];
        this.product.imgs = this.product.colors[index].images;
        this.assignCatalogItemId();
    },
    addToCart: async function(){
        this.addToCartSuccess = false;
        if(this.activeSize != null){
            let tempProduct = this.product;

            this.$store.commit('resetStockMessage');

            await this.$store.dispatch('hasEnoughStock', tempProduct);
            //if a product is found and a failed stock message is added
            if(this.$store.state.stockMessage != ""){
                this.presentFailedToAddToast(this.$store.state.stockMessage);
            }else{
                this.$store.commit('addToCart', tempProduct)
                this.$store.dispatch('calculateTotal');

                this.addToCartSuccess = true;
                console.log('beforeAni');
                this.runAnimation = true;
                this.checkmark();
            }
        }
        else{
            this.presentToast();
        }
    },
    resetSize: function(){
        this.product.id = this.baseSku;
        this.product.catalogItemId = ''
        this.product.size = '';

        this.activeSize = null;
    },
    presentToast: async function() {
        const toast = await toastController.create({
          message: 'Please Select a Size',
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
    dismiss() {
        this.$refs.modal.$el.dismiss();
    },
    setAnimationFalse: function(){
        console.log('finished');
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

        var logoTimeline = anime.timeline({ direction: 'alternate'});

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
        delay: 300,
        offset: 0,
        complete: this.setAnimationFalse,
        });

    },
    getInventory: async function(){
        //puts a spinner on the size buttons until the data is fully loaded
        this.loadingData = true;
        //sets sold out to be false until the data is read
        this.isSoldOut = false;
        //resets the buttons to be disabled until the data finishes loading
        this.disabledArray = [true, true, true, true, true];

        const body = JSON.stringify({"ids" : this.catalogItemIdArray});
        
        let getInventoryResponse = await fetch('https://us-central1-vessels-clothing.cloudfunctions.net/getInventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });

        //because of promises, to be able to read to response body, you have to first convert the response to json, then access the result
        //also converts the string array to numbers
        let convertData = (await getInventoryResponse.json()).result;

        //converts the returned array into an inventoruy array
        for(let i = 0; i < convertData.length; i++){
            this.inventoryArray[i] = (+convertData[i].quantity);
        }

        //auto disabled sizes
        //waits for correct inventory numbers to be recieved before enabling the button
        for(let i = 0; i < this.inventoryArray.length; i++){
            if(this.inventoryArray[i] >= 1){
                this.disabledArray[i] = false;
            }
        }
        this.loadingData = false;

        //checks s, m , l, and xl to see if theres any stock left
        if(this.inventoryArray[0] <= 0 && this.inventoryArray[1] <= 0 && this.inventoryArray[2] <= 0 && this.inventoryArray[3] <= 0 && this.inventoryArray[4] <= 0){
            this.isSoldOut = true;
        }
    },
    assignCatalogItemId: async function(){
        // gets the catalogItemId based on the sku passed in

        const body = JSON.stringify({"id" : this.baseSku});
        let catalogItemIdResponse = await fetch('https://us-central1-vessels-clothing.cloudfunctions.net/getAllCatalogItemIds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });


        //because of promises, to be able to read to response body, you have to first convert the response to json, then access the result
        let catalogItemIds = (await catalogItemIdResponse.json()).result;

        for(let i = 0; i < catalogItemIds.length; i++){
            this.catalogItemIdArray[i] = catalogItemIds[i];
        }

        this.getInventory();
    },
    preloadData: async function(){
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          this.products.push(doc.data());
        });
        this.$store.commit('preLoadProducts', this.products);
    },
    readProductData: async function(){
        this.products = this.$store.state.products;
        if(this.products.length == 0){
          await this.preloadData();
          this.$store.commit('preLoadProducts', this.products);
        }

        this.products.forEach((item) =>{
            if(item.name == this.product.name){
                //sets the base sku to the the sku + the base color option
                this.baseSku = item.id + '-0';
                //matches the data from firestore into the product to be sent to the cart
                this.product.id = item.id;
                this.product.price = item.price;
                this.product.descr = item.description;
                this.product.colors = item.colors;
                this.product.thumbnail = this.product.colors[0].images[1];
                this.activeColor = this.product.colors[0];
                this.product.imgs = this.activeColor.images;
                this.product.color = this.activeColor.hex;
            }
        })
        this.assignCatalogItemId();
    },
  },
  data: function(){
    return{
      products: [],
      product: {
        catalogItemId: 'tempID',
        id: "temp",
        name: this.$route.params.name,
        price: 123,
        descr: "placeholder text",
        thumbnail: 'temp3.jpg',
        size: 'M',
        quantity: 1,
        imgs: [],
        color: '',
        selectedColor: 0,
        },
        baseSku: "temp",
        catalogItemIdArray: ['','','',''],
        inventoryArray: [0,0,0,0],
        disabledArray: [true, true, true, true],
        activeSize: null,
        activeColor: [],
        addToCartSuccess: true,
        loadingData: true,
        isSoldOut: false,
        runAnimation: false,
    }
  },
  async created (){
    this.readProductData();
  },
});
</script>

  <style scoped>
    .swiper {
    padding-top: 20px;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    }

    .swiper-container{
        height: 35vh;
    }
    @media only screen and (min-width: 700px) {
    .swiper-container{
        height: 32vh;
    }

  }
    .swiper-slide {
    text-align: center;
    color:#f2f2f2;
    font-size: 18px;
    background: #222222;
    border-radius: 20px;


    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    }
    .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    }
    /* Gets rid of the slight gradient poking out at the edges of the slider */
    .swiper-3d, .swiper-slide-shadow-left, .swiper-slide-shadow-right{
    border-radius: 20px;
    }

    .product-description{
    display: block;
    padding-left: 7%;
    padding-right: 7%;
    padding-top: 2%;
    padding-bottom: 7%;
    }
    .product-description h1 {
    color: #333333;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 22px;
    text-align: left;
    }
    .product-description p {
    margin: 0;
    color: #333333;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-align: left;
    }
    .product-description h2 {
    color: #333333;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 20px;
    text-align: left;
    margin: 0;
    margin-top: 2%;
    }
    .size-grid{
        display: flex;
    }
    .leftSize{
        width: 70%;
    }
    .rightSize{
        width: 30%;
    }
    .rightSize h2{
        text-align: right;
    }
    .fill-color{
        padding: 5%;
    }
    .top-font{
    display: flex;
    }
    .title-column{
    flex: 50%;
    margin: auto;
    }
    .title-column h2{
    text-align: right;
    color: #333333;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 22px;
    }
    .size-buttons{
    flex: 50%;
    }
    .size-buttons ion-spinner{
        min-width: 10px;
    }
    @media only screen and (min-width: 600px) {
    .size-buttons ion-spinner{
        min-width: 15px;
    }
    }
    .color-buttons{
        display: flex;
        margin: auto;
        justify-content: right;
        left: 0;
        flex: 50%;
        text-align: right;
    }
    .color-buttons ion-spinner{
        max-height: 100%;
        max-width: 100%;
    }
    .size-buttons ion-button{
    --background-hover: #b0b0b08f;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 12px;
    height: 35px;
    width: 35px;
    }
    .color-buttons ion-button{
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 12px;
    height: 35px;
    width: 35px;
    }
    .fill-color{
        height: 25px;
        width: 25px;
        border-radius: 5px;
        border-width:1px;
        border-style:solid;
        border-color:#333333;
    }

    .cart-button{
        margin: auto;
        text-align: center;
        padding-top: 15px;
    }
    .cart-button ion-button{
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
    .cart-button h3{
        text-align: right;
        color: #f2f2f2;
        font-family: sofia-pro,sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 18px;
        padding-bottom: 8px;
        text-transform: none;
    }

    .checkmark{
        display: none;
    }
    .check{
        display: none;
    }
  </style>