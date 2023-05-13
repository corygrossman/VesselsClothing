<template>
    <div class="productbox-container">
        <div @click="navigateTo()" class="productbox-image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
        <div class="productbox-text">
            <h2>{{name}}</h2>
            <p>${{price}}</p>
        </div>
    </div>
</template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ProductBox',
    props: {
      name: String,
      id: String,
      thumbnail: String,
      price: Number,
    },
    methods:{
      navigateTo: function(){
        this.$router.push(this.productUrl);
      }
    },
    data(){
        return{
            imageUrl: require(`../images/${this.thumbnail}`),
            productUrl: '/shop/products/' + this.name,
        }
    }
  });
  </script>
  
  <style scoped>
  .productbox-container{
  }
  @media screen and (min-width: 500px) {
    .productbox-image{
      border-radius: 20px;
      border-width: 1px;
      border-color: #333333;
      border-style: solid;
      display: block;
      left: 0;
      right: 0;
      z-index: 1;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 14vh;
      height: 14vh;
      cursor: pointer;
    }
    .productbox-text{
      margin: auto;
      width: 85%;
    }
  }
  @media screen and (max-width: 499px) {
    .productbox-image{
      border-radius: 20px;
      border-width: 1px;
      border-color: #333333;
      border-style: solid;
      display: block;
      left: 0;
      right: 0;
      z-index: 1;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 17vh;
      height: 17vh;
      cursor: pointer;
    }
    .productbox-text{
      margin: auto;
      width: 85%;
    }
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
    font-size: 15px;
  }
  </style>
  