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
                <div class="container-align">
            <div style="display:flex;align-items:center;margin-left:50px">
   <h1 class="main-header">Audit Firm Info</h1>
            <button class="btn-edit"> <v-icon large style="color:#DADADA;"> mdi-pencil-circle </v-icon> Edit Info</button>
</div>
<v-row style="margin-top:2%;margin-bottom:2%;margin-left:50px">
<v-col cols="6">
<v-row>
<v-col cols="2">
<p class="form-header">Name</p>
</v-col>
<v-col cols="1">
<p>:</p>
</v-col>
<v-col cols="9">
<p class="form-data">Kalyan Kumar</p>
</v-col>
</v-row>
<v-row>
<v-col cols="2">
<p class="form-header">Address</p>
</v-col>
<v-col cols="1">
<p>:</p>
</v-col>
<v-col cols="9">
<p class="form-data">#12,chikkanna garden, 15th main road, Chamarajapete,<br/>Bengaluru-560012, Karnataka, India.</p>
</v-col>
</v-row>
</v-col>

<v-col cols="6">
<v-row>
<v-col cols="2">
<p class="form-header">FRN</p>
</v-col>
<v-col cols="1">
<p>:</p>
</v-col>
<v-col cols="9">
<p class="form-data">123456A</p>
</v-col>
</v-row>
<v-row>
<v-col cols="2">
<p class="form-header">Firm Type</p>
</v-col>
<v-col cols="1">
<p>:</p>
</v-col>
<v-col cols="9">
<p class="form-data">LLA</p>
</v-col>
</v-row>
    </v-col>
  </v-row>
  <v-card
        max-width="100%"
        class="table-align"
        >
        <v-card-title>
            <button class="buttonDir-font" @click="addMemberSwitch()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Add members 
            </button>
             <v-divider
            inset
            vertical
            style="max-height:25px;color: #C4C4C4;"
            ></v-divider>
            <button class="buttonDir-font">
                <v-icon style="color:black">mdi-arrow-collapse-up</v-icon>
                    Export
            </button>

            <v-spacer></v-spacer>

        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="members"
            class="elevation-1 table-font"
            loading="Loading...."
        >
        <template v-slot:item.actions="{ item }">
        <v-icon small style="color:black" @click="deleteItem(item)">far fa-trash-alt</v-icon>
    </template>
        </v-data-table>
            
        </v-card>
 </div>
</div>
</template>


<script>
export default {
    data () {
      return {
        search:"",
        transferDialog:false,
         e1: 1,
        steps: 1,

            headers:[
                {text:'Name of the Member' , value:'memberName', align: 'center'},
                {text:'MRN' , value:'mrn', align: 'center'},
                {text:'Type' , value:'type', align: 'center'},
                {text:'Address' , value:'address', align: 'center'},
                {text:'Email' , value:'email', align: 'center'},
                {text:'' , value:'actions', align: 'center', sortable: false}
            ],

        members: [
          {
            memberName: 'Nithya A.S',
            mrn: 324567,
            type: 'FCA',
            address: '#12, 15thh cross, ARK colony, Yarakki gate,P.P Nagara, Yangaluru-780056',
            email:'nithya@gmail.com',
          },
        ],

      }
    },
     watch: {
  steps (val) {
        if (this.e1 > val) {
            console.log(this.e1,"e1 value")
          this.e1 = val
        }
      },
    },
    methods:{
      transferItem(item){
        this.editedIndex = this.securities.indexOf(item)
        this.transferDialog=true;
      },
      addMemberSwitch(){
        this.$router.push('/addmember');
      },
       nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      transferData(){
       
      },
    },
  }
</script>


<style scoped>
.company-font{
    
font-size: 26px !important;
font-style: normal;
font-weight: 700;
color: #0398DC;
margin:0% 1% 1% 0%;
}
.year-font{
    
font-size: 22px !important;
font-style: normal;
font-weight: 700;
margin:0% 8% 1% 5%;
}
.data-font{
    
font-size: 17px !important;
font-style: normal;
font-weight: 400;
line-height: 23px;
text-align:left;
margin-left:3%;
}
.divider-size{
    border-right: 1px solid rgba(64, 64, 64, 0.25);
    height: 3em;
    margin-top:6% !important;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.container-align{
    margin-top: 2vh;
    text-align: left;
    margin-right: 10px !important;
}
.main-header{
font-size: 24px !important;
font-style: normal;
font-weight: 700;
margin-right:4%;
opacity:0.5;
}
.btn-edit{
    
font-size: 16px !important;
font-style: normal;
font-weight: 700;

}
.form-header{
font-size: 18px !important;
font-style: normal;
font-weight: 600;
}
.form-data{
font-size: 16px !important;
font-style: normal;
font-weight: 400;
}
.buttonDir-font{

font-size: 18px !important;
font-style: normal;
font-weight: 400;
color:black;
margin-right:2%;
margin-left:2%;
}
</style>