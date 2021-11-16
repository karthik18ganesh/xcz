<template>
<div>
    <div class="company-popup">
        <v-card
            class="mx-auto"
            max-width="344"
        >
        <router-link to="/addcompanydetails" style="color:white;">
            <v-card-actions>
                <v-btn
                    text
                    color="black"
                    class="button-font"
                >
                    Add New Financials
                </v-btn>

                <v-divider vertical inset class="divider-size"></v-divider>

                <v-card-text>
                    <b-icon-plus-circle font-scale="3" color="#4ab9ed"></b-icon-plus-circle>
                </v-card-text>
            </v-card-actions>
        </router-link>
        </v-card>
    </div>

    <div class="company-popup">
        <v-card
            class="mx-auto"
            max-width="344"
        >
        <router-link to="/importdetails" style="color:white;">
            <v-card-actions>
                <v-btn
                    text
                    color="black"
                    class="button-font"
                >
                    Import Financials
                </v-btn>

                <v-divider vertical inset class="divider-size"></v-divider>

                <v-card-text>
                    <b-icon-download font-scale="3" color="#4ab9ed"></b-icon-download>
                </v-card-text>
            </v-card-actions>
        </router-link>
        </v-card>
    </div>
    <div style="display:flex;justify-content:space-between;">
    <div class="img-align">
        <img src="../assets/cuate.png" />
    </div>
    <div class="bckgrnd-img">
    <div style="margin-top:20%">
    <h2 class="head-font">Quote of the day</h2>
    <p class="content-font" style="margin-bottom:3%">You miss 100 percent of the shots you never take.</p>
    <div>
    <p class="content-font">Wayne Gretzky</p>
    <img src="../assets/twitter.png"/>
    </div>
    </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        
    },
}
</script>

<style scoped>
* {
  font-size: 14px !important;
}
/deep/.v-input input {
    font-size: 14px !important;
}
/deep/.v-text-field--outlined.v-input--dense .v-label {
    font-size: 14px;
}
.company-popup{
    top: 30%;
    width: auto;
    padding: 8px;
    margin: 80px 50px;
    background: white;
    border-radius: 5px;
    display: inline-block;
}
.company-popup p{
    color: black;
    border: none;
    padding: 0;
    margin: 10px;
}
.divider-size{
    border-right: 1px solid grey;
    height: 60px;
}
.img-align{
    text-align: left;
}
body{
    background-color: darkgray;
}
.button-font{
font-size: 24px !important;
font-style: normal;
font-weight: 500;
letter-spacing:0em;
}
.v-btn{
    text-transform:none !important;
}
.head-font{

font-size: 36px !important;
font-style: normal;
font-weight: 700;
letter-spacing: 0em;
text-align: center;
color:#686868;
margin-bottom:3%;
}
.content-font{

font-size: 24px !important;
font-style: normal;
font-weight: 500;
letter-spacing: 0em;
text-align: center;
color: #686868;
}
.bckgrnd-img{
    background-image: url('../assets/Union.png');
     width:60%;
    margin-left:20%

} 
</style>