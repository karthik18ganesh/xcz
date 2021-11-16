<template>
<div>
    <div v-if="$store.getters.isLoading" class="loader-overlay">
        <div class="loader"></div>
        <span class="text" v-html="text"></span>
    </div>
     <div  v-show="$store.getters.showAlert"  class="alertclass">
        <v-alert
        
          border="top"
          colored-border
          type="info"
          min-height="100px"
          height="auto"
          color="#006B6A"
          dismissible       
          class="multi-line grow"   
          v-show="$store.getters.showAlert"
          elevation="2"
        >
        <div style="max-height:100px;overflow:auto">
        <v-row
        align="center"
        no-gutters
      >
        <v-col class="grow">
         {{ $store.getters.alertText }}
         </v-col>
        </v-row>
        </div>
        </v-alert>
        
      </div>
</div>
</template>

<script>
    export default {
        name: "Loader",
        props: {
            isVisible: {type: Boolean, required: true},
            text: {type: String, required: false, default: "Loading"},
        },
        mounted(){
            var element = document.getElementsByClassName("mdi-close-circle")[0];
            element.addEventListener('click', () => {
     this.$store.commit("setAlertText" , ""); 
        this.$store.commit("setShowAlert" , false); 
    });
        },
      
}
</script>

<style lang="scss">
.alertclass{
  top:30%;position:fixed;left:35%;z-index:99999;width:40%;
}
    .loader-overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 999;
        cursor: pointer;
        span.text {
            display: inline-block;
            position: relative;
            top: 10%;
            left: 2%;
            transform: translate(-50%,-50%);
            color: #fff;
        }
        .loader,
.loader:before,
.loader:after {
  border-radius: 50%;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 225px auto auto auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

}
</style>