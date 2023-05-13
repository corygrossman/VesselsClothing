<template>
    <div class="productbox-container" @click="openProductPage()">
        <div class="productbox-image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
          <div class="featured-product">
            <button>Featured Product</button>
          </div>
            <div class="productbox-text">
                <div class="productbox-buttoncontainer">
                  <div class="productboxtext-row">
                    <h1>{{name}}</h1>
                    <p>$ {{price}}</p>
                  </div>
                  <div class="productboxbutton-row">
                    <ion-button @click="openProductPage()" shape="round">
                      <ion-icon slot="icon-only" name="arrow-forward-outline"></ion-icon>
                    </ion-button>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script>
  import { defineComponent } from 'vue';
  import { IonButton, IonIcon } from '@ionic/vue';
  
  export default defineComponent({
    name: 'FeaturedProduct',
    components: {IonButton, IonIcon},
    props: {
      name: String,
      price: Number,
      id: String,
      thumbnail: String,
    },
    data(){
        return{
            imageUrl: require(`../images/${this.thumbnail}`),
            routerUrl: '/shop/products/' + this.name,
        }
    },
    methods: {
        openProductPage: function(){
            console.log('Here in openProductPageFunction');
            this.$router.push(this.routerUrl);
        }
    }
  });
  </script>
  
  <style scoped>
  .productbox-container{
    position: relative;
  }
  .productbox-image{
    border-radius: 20px;
    border-width: 2px;
    border-color: #333333;
    border-style: solid;
    display: block;
    left: 0;
    right: 0;
    z-index: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 45vh;
  }

  @media only screen and (min-width: 700px) {
    .productbox-image{
      border-radius: 20px;
      border-width: 2px;
      border-color: #333333;
      border-style: solid;
      display: block;
      left: 0;
      right: 0;
      z-index: 1;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 40vh;
    }

  }
  .featured-product{
    padding: 10px;
  }
  .featured-product button{
    background: #33333380;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 12px;
    backdrop-filter: blur(3px);
    border-radius: 10px;
    padding-top: 10px;
    padding-bottom: 12px;
    padding-left: 14px;
    padding-right: 14px;
  }
  .productbox-text{
    margin: auto;
    min-height: 100%;
    text-align: center;
  }
  .productbox-text h1{
    text-align: left;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 35px;
    padding-left: 20px;
    padding-bottom: 5px;
    margin: 0;
  }
  .productbox-text p{
    text-align: left;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 20px;
    padding-left: 25px;
    padding-bottom: 5px;
    margin: 0;
  }
  .productbox-buttoncontainer{
    position: absolute;
    bottom: 4%;
    align-items: center;
    justify-content: center;
    width: 100%;
    display: flex;
  }
  .productbox-buttoncontainer ion-button{
    --background: #f2f2f2;
    --background-activated: #a1a1a1;
    color: #333333;
    --border-radius: 50%;
    width: 45px;
    height: 45px;
    --padding-start: 8px;
    --padding-end: 8px;
  }

  .productbox-buttoncontainer ion-icon{
    font-size: 20px;
  }
  .productboxtext-row{
    width: 70%;
  }
  .productboxbutton-row{
    width: 30%;
  }
  </style>
  