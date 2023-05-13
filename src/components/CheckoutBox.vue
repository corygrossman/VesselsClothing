<template>
    <div class="productbox-container">
        <div class="leftCol">
            <div @click="navigateTo()" class="productbox-image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
        </div>
        <div class="rightCol">
            <div class="productbox-text">
                <h1>{{name}}</h1>
                <h2>$ {{price}}</h2>
                <div class="trash-button">
                    <button @click="$emit('delete')">
                        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                    </button>
                </div>
                <br>
                <p>Size: {{size}}</p>
            </div>
        </div>
    </div>
</template>
  
  <script>
  import { defineComponent } from 'vue';
  import {IonIcon} from '@ionic/vue'
  import {trash} from 'ionicons/icons'

  export default defineComponent({
    name: 'CheckoutBox',
    props: {
      name: String,
      id: String,
      thumbnail: String,
      price: Number,
      size: String,
    },
    components : { IonIcon },
    setup(){
        return{
            trash
        }
    },
    methods: {
        removeQuantity: function(){
            console.log('Remove Quantity')
        },
        navigateTo: function(){
            this.$router.push(this.productUrl);
        }
    },
    data(){
        return{
            imageUrl: require(`../images/${this.thumbnail}`),
            productUrl: '/shop/products/' + this.name,
        }
    },
  });
  </script>
  
  <style scoped>
  .productbox-container{
    display: flex;
  }
  .leftCol{
    width: 40%;
  }
  .rightCol{
    width: 50%;
  }
  .trash-button button{
    padding-top: 5px;
    padding-left: 0;
    padding-right: 0;
    text-align: left;
    font-size: 15px;
    background: 0;
}
.trash-button ion-icon{
    color: #333333;
    text-align: left;
}

  .productbox-image{
    border-radius: 10px;
    display: block;
    left: 0;
    right: 0;
    z-index: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 16vh;
    cursor: pointer;
  }
  @media only screen and (min-width: 700px) {
    .productbox-image{
    border-radius: 10px;
    display: block;
    left: 0;
    right: 0;
    z-index: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 13vh;
    cursor: pointer;
  }

  }
  .productbox-text{
    padding: 7%;
  }
  .productbox-text h1{
    margin: 0;
    color: #333333;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 18px;
  }
  .productbox-text h2{
    margin: 0;
    color: #333333;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
  }
  .productbox-text p{
    margin: 0;
    color: #33333390;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
  }
  </style>
  