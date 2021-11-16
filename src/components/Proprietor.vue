<template>
    <div>
       <v-layout>
            <v-flex xs1  style="margin-left:4%">
                <p></p>
                 <img src="../assets/profile-icon.png" height="60%" width="60%"/>
            </v-flex>

            <v-flex xs4 style="display:flex;align-items:center">
                <h4 class="company-font">Shwetha Enterprises</h4>
                <h5 class="year-font">FY 2021-22</h5>
                 <v-divider
                inset
                vertical
                class="divider-size"
                ></v-divider>
            </v-flex>

            <v-flex style="display:flex;align-items:center">
                <h6 class="data-font"></h6>
            </v-flex>
        </v-layout>

        <v-divider class="blueUline"></v-divider>

        <v-card
        max-width="100%"
        class="table-align"
        >
        <v-card-title class="card-align">
            <button class="buttonPro-font" @click="addProprietor()">
                <v-icon>mdi-plus</v-icon>
                    Add Proprietor Details
            </button>
        </v-card-title>
        <v-data-table
        
            :items="ownershipDetails"
            :headers="headers"
            
            class="elevation-1"
         
        >

        </v-data-table>
            
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Proprietor1',
    components:{

    },
    data(){
        return{
            selected: [],
            headers:[
                {text:'Proprietor name' , value:'firstname', align: 'center'},
                {text:'Address' , value:'permanentadress.city', align: 'center'},
                {text:'Designation' , value:'designation', align: 'center'},
                {text:'PAN No' , value:'pan', align: 'center'},
                {text:'' , value:'', align: 'center', sortable: false}
            ],
            ownershipDetails:[],
    filteredData:{name:"",address:"",designation:"",pan:""},
        }
    },
    mounted(){
            this.ownershipDetails = this.$store.getters.getMasterData.ownershipDetails;
 console.log(JSON.parse(this.ownershipDetails),"owner")
        },
    methods:{
        handleClick(){
            console.log("Hello")
        },
    addProprietor(){
   this.$router.push('/addproprietor'); 
    },

}
}
</script>


<style scoped>
h3{
    margin: 20px;
}
h2{
    color: #03a9f4;
    margin-top: 2vh;
    margin-bottom: 1vh;
}
h6{
    font-size: 14px;
}
button{
    top: 1%;
    font-size: 14px;
    margin: 10px;
}
.divider-size{
    border-right: 1px solid rgba(64, 64, 64, 0.25);
    height: 4em;
    margin-top:4%;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.container-align{
    margin-top: 2vh;
    text-align: left;
    margin-left:100px;
}
.img-border{
    border-radius: 50%;
}
.table-align{
    margin-top: 40px;
}
.text-field-class{
    max-width: 20%;
    margin-right: 30px;
}
.buttonPro-font{
    font-family: Be Vietnam;
font-size: 18px;
font-style: normal;
font-weight: 400;
}
.company-font{
    font-family: Be Vietnam;
font-size: 26px !important;
font-style: normal;
font-weight: 700;
color: #0398DC;
margin:0% 1% 1% 0%;
}
.year-font{
    font-family: Be Vietnam;
font-size: 22px !important;
font-style: normal;
font-weight: 700;
margin:0% 8% 1% 5%;
}
.data-font{
    font-family: Be Vietnam;
font-size: 17px !important;
font-style: normal;
font-weight: 400;
line-height: 23px;
text-align:left;
margin-left:3%;
}
</style>