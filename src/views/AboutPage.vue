<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
        <div class="vision">
            <div class="about-container">
            <GlassAboutVue @scrollDown="scrollDown('founder')" title_top="The" title_bottom="Vision" title2="Vessels Clothing" butTitle="about founder" title_container="vision-text-container" description1="Vessels is a streetwear clothing brand for those with a message that goes deeper than any fabric or image. For we carry this treasure in earthly vessels. A treasure more precious than silver and better than gold. We are a light in the darkness because we know we are not alone. We are clothed in righteousness. We have a purpose. We carry good news. We are set apart. We are on a mission. We have a calling on our lives. We are Vessels."/>
            </div>
        </div>
        <div class="founder">
            <div class="about-container">
            <GlassAboutVue ref="founder" title_top="The" title_bottom="Founder" title2="Vincent Picard" butTitle="who we support" title_container="glass-title-container" description1="Raised around God but never having a relationship with God, at 18, Vincent finally found God with tears in his eyes and on his knees at the foot of his bed. He cried out for help and guidance that night and soon after gave his life to Christ." description2="Vincent is 26 now and even though he is not perfect, he is proud to have the privilege to serve God, his church, and his family. Because to Vincent, Vessels isn’t just a brand but it is an extension of himself. It is a way for Vincent to serve God and to bring people to Jesus (and hopefully make some great clothing in the process)."/>
            </div>
        </div>
        <div class="who">
            <div class="about-container">
            <GlassAboutVue title_top="Who We" title_bottom="Support" title2="Vessels Clothing" butTitle="contact us" title_container="glass-title-container" description1="Vessels believe in building community and giving back to God what is his. 10% of all sales are donated to the local church to help those who are hurting and hungry and to also help spread the good news of Christ in Jacksonville and around the globe. This is bigger than clothing and fabrics, it's about souls and reaching people for Christ."/>
            </div>
        </div>
        <div class="contact">
            <div class="about-container">
                <GlassContact />
            </div>
        </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/vue';
import GlassAboutVue from '@/components/GlassAbout.vue';
import GlassContact from '@/components/GlassContact.vue';

export default  defineComponent({
    name: 'AboutPage',
    components: {IonContent, IonPage, GlassAboutVue, GlassContact, IonHeader, IonToolbar },
    data (){
        return{
            description1: "Vessels is a streetwear clothing brand for those carrying a message. A message that goes deeper than any fabric or image, it is a message of redemption, hope, truth, and grace. For we carry this treasure in earthly vessels. A treasure more precious than silver and better than gold. We are a light in the darkness because we know we are not alone. We are clothed in righteousness and give a voice to those who aren’t sure what to say and to those who haven’t the strength to cry out. We have a purpose. We carry good news. We are set apart. We are on a mission. We have a calling on our lives. We are Vessels."
        }
    },
    methods: {
        scrollDown(refName){
            console.log(refName);
        }
    },
});
</script>

<style>
.vision{
    background-image: url("../images/the_vision.jpg");
    display: block;
    left: 0;
    right: 0;
    z-index: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 80vh;
}
.founder{
    background-image: url("../images/the_founder.jpg");
    display: block;
    left: 0;
    right: 0;
    z-index: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 90vh;
}
.who{
    background-image: url("../images/who_we_support.jpg");
    display: block;
    left: 0;
    right: 0;
    z-index: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 80vh;
}
.contact{
    background-image: url("../images/contact_page.jpg");
    display: block;
    left: 0;
    right: 0;
    z-index: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 80vh;
}
.about-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: auto;
    min-height: 80vh;
}
</style>