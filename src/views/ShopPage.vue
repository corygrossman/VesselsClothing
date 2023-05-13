<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
            </ion-toolbar>
        </ion-header>
      <ion-content :fullscreen="true">
        <div class="shop-container">
          <div class="featured-container" v-for="product in products" :key="product">
            <FeaturedProduct v-if="product.featured" :name="product.name" :price="product.price" :id="product.id" :thumbnail="product.colors[0].images[1]"/>
          </div>
          <div class="swiper-container">
          <h2>All Products</h2>
                <swiper
                :slidesPerView="2"
                :spaceBetween="-18"
                :breakpoints="{
                  // when window width is >= 320px
                  320: {
                    slidesPerView: 2,
                    spaceBetween: -30
                  },
                  // when window width is >= 640px
                  700: {
                    slidesPerView: 2,
                    spaceBetween: -30
                  }
                }"
                :modules="modules"
                :initial-slide="0"
                :scrollbar="{
                  hide: true,
                }"
                class="mySwiper">
                    <swiper-slide v-for="product in products" :key="product">
                      <ProductBox :name="product.name" :id="product.id" :thumbnail="product.colors[0].images[1]" :price="product.price"/>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { IonPage, IonContent, IonHeader, IonToolbar} from '@ionic/vue';
  import {arrowBack} from 'ionicons/icons'
  import {db} from '../firebase'
  import { collection, getDocs } from "firebase/firestore"; 
  import ProductBox from '@/components/ProductBox.vue';
  import FeaturedProduct from '@/components/FeaturedProduct.vue'

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Pagination } from "swiper";

  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  
  export default  defineComponent({
    name: 'ShopPage',
    components: { IonContent, IonPage, IonHeader, IonToolbar, ProductBox, FeaturedProduct, Swiper, SwiperSlide},
    setup(){
        return {
            arrowBack,
            modules: [Pagination]
            }
    },
    methods:{
      openProductPage: function(){
        console.log('Here in openProductPageFunction');
        this.$router.push('/shop/products/Metamorphosis');
      },
      bodyOfRequest: function(){
        const tempLocation = this.locationId;
        const tempSource = this.appId;
        const jsonOBJ = JSON.stringify({
          tempLocation,
          sourceId: this.appId,
        })
        return jsonOBJ
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
        //if the user loads straight into the store page rather than through the landing
        if(this.products.length == 0){
          this.preloadData();
          this.$store.commit('preLoadProducts', this.products);
        }
      },
      getFirestoreProducts: function(){
        console.log(this.products);
      }
    },
    data: function(){
      return{
        products: [],
        appId:'sq0idp-_ocjHMI3IKOfdSWF8ItIAA',
        locationId: 'LPDFAWR6C61AP',
      }
    },
    async created (){
      this.readProductData();
    },
  });
  </script>

  <style scoped>
  .productBox{
    display: flex;
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .shop-container{
    padding-left: 7%;
    padding-right: 7%;
  }
  .featured-container{
    padding-top: 0px;
  }
  

  .swiper {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    /* box-shadow: 0px -5px 10px rgba(51, 51, 51, 0.2) inset; 
	-webkit-box-shadow: 0px -5px 10px rgba(51, 51, 51, 0.2) inset; 
	-moz-box-shadow: 0px -5px 10px rgba(51, 51, 51, 0.2) inset;  */
  }

  .swiper-container{
    padding-bottom: 7%;
  }
  .shop-container h2{
    color: #222222;
    font-family: sofia-pro,sans-serif;
    font-weight: 800;
    font-style: normal;
    font-size: 22px;
  }
  .shop-container h1{
    color: #222222;
    font-family: sofia-pro,sans-serif;
    font-weight: 800;
    font-style: normal;
    font-size: 38px;
    margin-bottom: 0;
  }
  .swiper-slide {
    /* padding-left: 5vw;
    padding-right: 5vw;
    padding-top: 5vw;
    padding-bottom: 3vw; */
  }
  .swiper-pagination-bullet-active {
    background-color: #333333 !important;
  }
  .swiper-pagination-bullet{
    background-color: #7b7a7a;
  }
  /* Gets rid of the slight gradient poking out at the edges of the slider */
  .swiper-3d, .swiper-slide-shadow-left, .swiper-slide-shadow-right{
    border-radius: 20px;
  }
  </style>