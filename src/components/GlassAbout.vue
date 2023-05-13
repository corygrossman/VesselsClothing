<template>
    <div class="glass_container">
        <div class="glass-text-container">
            <div :class="title_container">
                <h2>{{title_top}}</h2>
                <h1>{{title_bottom}}</h1>
                <img src="../svgs/about_text.svg" alt="Vessels Clothing Purpose Graphics">
            </div>
            <h2>{{title2}}</h2>
            <p>{{description1}}</p>
            <p>{{description2}}</p>
            <div class="about-button-container">
              <button @click="$emit('scrollDown')">{{butTitle}}</button>
              <ion-icon name="arrow-down-outline"></ion-icon>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { IonIcon } from '@ionic/vue';

  export default defineComponent({
    name: 'GlassAbout',
    components:{
      IonIcon,
    },
    props: {
      title_top: String,
      title_bottom: String,
      title2: String,
      butTitle: String,
      description1: String,
      description2: String,
      title_container: String,
    },
  });
  </script>
  
  <style>
  .glass_container{
    align-items: center;
    justify-content: center;
    background: #33333370;
    backdrop-filter: blur(3px);
	border: solid #F2F2F2 2px; 
    border-radius: 20px;
	box-shadow: 0 4px 10px rgba(51, 51, 51, 0.5)  ; 
	-webkit-box-shadow: 0 4px 10px rgba(51, 51, 51, 0.5)  ; 
	-moz-box-shadow: 0 4px 10px rgba(51, 51, 51, 0.5)  ;
  }
  .glass-text-container{
    text-align: center;
    margin: auto;
    width: 80%;
  }
  .glass-text-container h2{
    padding-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 5px;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: italic;
    font-size: 18px;
  }
  .glass-text-container p{
    margin-top: 5px;
    margin-bottom: 10px;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-shadow: 0 2px 4px rgba(51, 51, 51, 0.6) ; 
	-webkit-text-shadow: 0 2px 4px rgba(51, 51, 51, 0.6) ; 
	-moz-text-shadow: 0 2px 4px rgba(51, 51, 51, 0.6) ;
  }
  .vision-text-container{
    padding-top: 50px;
    margin: auto;
    text-align: left;
  }
  .vision-text-container h1{
    margin: 0;
    padding: 0;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 90px;
    text-align: center;
  }
  .vision-text-container h2{
    margin: 0;
    margin-left: 10px;
    padding: 0;
    line-height: 0;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: italic;
    font-size: 45px;
  }
  .vision-text-container img{
    text-align: center;
    margin: auto;
    padding-left: 6%;
    padding-right: 6%;
    padding-top: 1%;
  }

  .glass-title-container{
    padding-top: 50px;
    margin: auto;
    text-align: left;
  }
  .glass-title-container h1{
    margin: 0;
    padding: 0;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 69px;
    text-align: center;
  }
  .glass-title-container h2{
    margin: 0;
    margin-left: 45px;
    padding: 0;
    line-height: 0;
    transform: translateY(5px);
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: italic;
    font-size: 45px;
  }
  .glass-title-container img{
    text-align: center;
    margin: auto;
    padding-left: 4%;
    padding-right: 4%;
    padding-top: 2%;
  }
  .about-button-container {
    padding-top: 10px;
  }
  .about-button-container button{
    background: #F2F2F2;
    border-radius: 10px;
    border-width: 0;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 7px;
    color: #222222;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 13px;
  }
  .about-button-container ion-icon{
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 20px;
    color: #F2F2F2;
    margin: auto;
    display: block;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  </style>
  