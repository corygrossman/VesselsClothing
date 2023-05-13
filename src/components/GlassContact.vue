<template>
    <div class="glass_container">
        <div class="glass-contact-container">
            <div class="contact-text-container">
                <h1>Contact Us</h1>
                <img src="../svgs/about_text.svg" alt="Vessels Clothing Purpose Graphics">
            </div>
            <div class="contact-text-container">
              <p>Email: vpvessels@gmail.com</p>
              <p>Insta: @Vessels.Co</p>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'GlassContact',
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
  .glass-contact-container{
    text-align: center;
    margin: auto;
    width: 80%;
  }
  .glass-contact-container p{
    margin-top: 5px;
    margin-bottom: 10px;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    text-shadow: 0 2px 4px rgba(51, 51, 51, 0.6) ; 
	-webkit-text-shadow: 0 2px 4px rgba(51, 51, 51, 0.6) ; 
	-moz-text-shadow: 0 2px 4px rgba(51, 51, 51, 0.6) ;
  }
  .contact-text-container{
    padding-top: 20px;
    padding-bottom: 20px;
    margin: auto;
    text-align: left;
  }
  .contact-text-container h1{
    margin: 0;
    padding: 0;
    color: #f2f2f2;
    font-family: sofia-pro,sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 60px;
    text-align: center;
  }
  .contact-text-container img{
    text-align: center;
    margin: auto;
    padding-top: 2%;
  }
  .contact-text-container p{
    text-align: center;
  }
  </style>
  