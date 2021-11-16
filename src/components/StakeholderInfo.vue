<template>
    <div>
     <v-layout>
            <v-flex xs1  style="margin-left: 2%;margin-top: 5px;">
                 <img src="../assets/profile-icon.png" height="50" width="50"/>
            </v-flex>

            <v-flex xs3 style="display:flex;align-items:center;justify-content:space-between">
                <h4 class="company-font">{{companyName}}</h4>
                 <!-- <v-divider
                inset
                vertical
                class="divider-size"
                ></v-divider> -->
            </v-flex>

            <v-flex style="display:flex;align-items:center">
      
            </v-flex>
        </v-layout>
        <v-divider class="blueUline"></v-divider>

        
            <v-container class="container-align" style="margin-left:50px">
            <div style="display: flex; align-items: center; ">
        <h1 class="main-header" style="font-size:20px !important;color: #808080;font-weight: 500;
    margin-right: 2%;">Stakeholder Info</h1>
        <button class="btn-edit" style="color:#b3b2b2;font-weight:500" @click="stakeholderInfoSwitch()">
          <v-icon large style="font-size: 20px;color: #b3b2b2;"> mdi-pencil-circle </v-icon> Edit
          Info
        </button>
      </div>
            <h2 class="heading-font">Personal Info</h2>

            <v-layout>
                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.stakeName"
                        
                        class="content-font"
                        outlined
                        dense
                        label="Full Name"
                         style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3>
                     <v-select
                        v-model="stakeHolder.legalStatus"
                        
                        :items="legals"
                        class="content-font"
                         style="width:93%"
                        label="Legal Status"
                        outlined
                        dense>
                    </v-select>
                </v-flex>

<v-flex xs3>
                     <v-select
                        v-model="stakeHolder.resStatus"
                        
                        :items="residentials"
                        class="content-font"
                        label="Residential Status"
                         style="width:93%"
                        outlined
                        dense>
                    </v-select>
                </v-flex>

                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.foliono"
                        
                        class="content-font"
                        outlined
                        dense
                        label="Folio No."
                         style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
            <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.fathername"
                        
                        class="content-font"
                        outlined
                        dense
                        label="Father's name"
                        required
                        style="width:93%"
                    ></v-text-field>
                </v-flex>
            
                <v-flex xs3 >
                    <v-select
                        v-model="stakeHolder.allDetails.gender"
                        
                        :items="items"
                        class="content-font"
                        label="Gender"
                        outlined
                        style="width:93%"
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs3>
                    <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field autocomplete="off" 
                            class="content-font"
                            
                            persistent-hint
                            append-icon="mdi-calendar"
                            label="DOB/DOE"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'date is required']"
                            outlined
                             style="width:93%"
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="stakeHolder.allDetails.date"
                            @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
                
            </v-layout>

            <v-layout>
                <v-flex xs3 >
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.refnumber"
                        
                        class="content-font"
                        outlined
                        style="width:93%"
                        dense
                        label="CIN/Reg.No."
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.pan"
                        
                        class="content-font"
                        outlined
                        dense
                        label="PAN"
                         style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.aadhar"
                        
                        class="content-font"
                        outlined
                        dense
                        label="Aadhar No"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <h2 class="heading-font">Permanent Address</h2>

            <v-layout>
                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.permanentadd.buildingName"
                        
                        class="content-font"
                        outlined
                        dense
                        label="Floor/Building name"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.permanentadd.street"
                        
                        class="content-font"
                        outlined
                        dense
                        label="Street/area"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>

                
                  <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.permanentadd.pincode"
                        
                        class="content-font"
                        outlined
                        dense
                        label="Pincode"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
              

                    <v-flex xs3>
                    <v-select
                        v-model="stakeHolder.allDetails.permanentadd.country"
                        :rules="[v => !!v || 'Country is required']"
                        
                        class="content-font"
                        item-text="name"
                    item-value="name"
                        :items="this.location.getAllCountries()"
                        @change="consolecountry"
                        label="Country"
                        style="width:93%"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs3>
                    <v-select
                        v-model="stakeHolder.allDetails.permanentadd.state"
                        :rules="[v => !!v || 'State is required']"
                        :items="this.location.getAllStatesFromCountry(stakeHolder.allDetails.permanentadd.country)"
                        class="content-font"
                        label="State"
                        item-text="name"
                    item-value="name"
                        style="width:93%"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                    
               <v-flex xs3>
                   <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.permanentadd.city"
                        
                        class="content-font"
                        outlined
                        dense
                        label="City"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.email"
                        
                        class="content-font"
                        outlined
                        dense
                        :rules="emailRules"
                        label="Email"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.phone"
                        
                        class="content-font"
                        outlined
                        dense
                        label="Phone no."
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            
<v-layout style="height: 40px;">
                <v-flex xs2>
                    <h2 style="margin-top: 0px;" class="heading-font">Present Address</h2>
                </v-flex>
               <v-flex xs4 md4 style="display:flex;padding-top: 5px;color: #808080;margin-left: -12px;margin-top: 2px;">
                    <h6 class="check-font">Permanent address same as present address</h6>
                                        <v-checkbox
                        v-model="stakeHolder.allDetails.issameadd"
                        @click="sameAddress"
                    ></v-checkbox>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.presentadd.buildingName"
                        
                        class="content-font"
                        outlined
                        dense
                        :value="PbuildingName"
                        label="Floor/Building name"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.presentadd.street"
                        
                        class="content-font"
                        outlined
                        dense
                        :value="Pstreet"
                        label="Street/area"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>
                    
             
                  <v-flex xs3>
                    <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.presentadd.pincode"
                        
                        class="content-font"
                        outlined
                        dense
                        :value="Ppincode"
                        label="Pincode"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>     
                <v-flex xs3>
                    <v-select
                        v-model="stakeHolder.allDetails.presentadd.country"
                        
                        class="content-font"
                        :items="this.location.getAllCountries()"
                        item-text="name"
                    item-value="name"
                        :rules="[v => !!v || 'Country is required']"
                        :value="stakeHolder.allDetails.presentadd.country"
                        label="Country"
                        style="width:93%"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                
                <v-flex xs3>
                    <v-select
                        v-model="stakeHolder.allDetails.presentadd.state"
                        class="content-font"
                        :rules="[v => !!v || 'State is required']"
                        item-text="name"
                    item-value="name"
                        :items="this.location.getAllStatesFromCountry(stakeHolder.allDetails.presentadd.country)"
                        :value="stakeHolder.allDetails.presentadd.state"
                        label="State"
                        style="width:93%"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs3>
                     <v-text-field autocomplete="off" 
                        v-model="stakeHolder.allDetails.presentadd.city"
                        
                        class="content-font"
                        outlined
                        dense
                        label="City"
                        style="width:93%"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            </v-container>

             <div class="btn-align">
            <v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="saveStakeholderInfo"
            >
                Save
            </v-btn>
            <v-btn
                class="ma-2 button-font"
                outlined
                color="#0398DC"
                style="border-color:#0398DC !important; text-transform:none;"
            >
                Continue
            </v-btn>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: 'Proprietor',
    components: {

    },
    data(){
        return{
            companyName:"",
            countrytest:"",
            editMode:false,
            residentials:['Resident','Non-Resident'],
        legals:['Proprietor/Individual','Partnership','Private/Public Limited'],
       stakeHolder:{
           permanentadd:{},
           presentadd:{}
       },
            items:['Male','Female'],
        }
    },
    watch: {
        Pemail: function (mail) {
            if (mail !== '') {
                this.emailRules = [ v => (v.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Invalid Email address']
            } else if (mail === '') {
                this.emailRules = []
            }
        },
    },
    async mounted() {
        this.companyName = JSON.parse(sessionStorage.getItem("master")).entity[0].name;
        this.stakeHolder = this.$route.params.stakeHolderData;
        if(!this.stakeHolder.allDetails)this.stakeHolder.allDetails={};
        if(!this.stakeHolder.allDetails.permanentadd){
            this.stakeHolder.allDetails.permanentadd ={}
        }
        if(!this.stakeHolder.allDetails.presentadd){
            this.stakeHolder.allDetails.presentadd ={}
        }
        this.stakeHolder.allDetails.date=moment(String(this.stakeHolder.allDetails.date)).format("DD-MM-YYYY"),
    console.log(this.stakeHolder,this.stakeHolder.allDetails, "this.stakeHolders");
    },
    methods:{
        sameAddress(){
            console.log(this.stakeHolder.allDetails,"this.stakeHolder.allDetails")
            if(this.stakeHolder.allDetails.issameadd === true){
                this.stakeHolder.allDetails.presentadd.buildingName= this.stakeHolder.allDetails.permanentadd.buildingName;
                this.stakeHolder.allDetails.presentadd.street= this.stakeHolder.allDetails.permanentadd.street;
                this.stakeHolder.allDetails.presentadd.city= this.stakeHolder.allDetails.permanentadd.city;
                this.stakeHolder.allDetails.presentadd.pincode= this.stakeHolder.allDetails.permanentadd.pincode;
                this.stakeHolder.allDetails.presentadd.state= this.stakeHolder.allDetails.permanentadd.state;
                this.stakeHolder.allDetails.presentadd.country= this.stakeHolder.allDetails.permanentadd.country;
            }else{
               this.stakeHolder.allDetails.presentadd.buildingName= '',
                this.stakeHolder.allDetails.presentadd.street= '',
                this.stakeHolder.allDetails.presentadd.city= '',
                this.stakeHolder.allDetails.presentadd.pincode= '',
                this.stakeHolder.allDetails.presentadd.state= '',
                this.stakeHolder.allDetails.presentadd.country= '';
            }
        },
        editStakeholder(){
            this.editMode=true;
        },
        async saveStakeholderInfo(){
            console.log(this.stakeHolder,"stakeholder info")

        var res = await this.$apiService.put(
          "/master/updateStakeholdersInfo",
          this.stakeHolder
        );

        if (res && res.status === 200) {
          console.log(res.data);
        //   sessionStorage.setItem("stakeinfo",JSON.stringify(this.stakeHolder.allDetails))
          this.$router.push({name:'StakeholderInfoTable',params: { "stakeHolderINT": this.stakeHolder }});
        }
        },
},
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
    font-size: 22px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
h6{
    font-size: 14px;
}
button{
    font-size: 14px;
    margin: 2px;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.container-align {
  margin-top: 2vh;
  text-align: left;
  margin-right: 10px !important;
}
.img-border{
    border-radius: 50%;
}
.textfield-align{
    max-width: 38%;
}
.btn-edit{
    font-family: Be Vietnam;
font-size: 14px !important;
font-style: normal;
font-weight: 700;

}
.company-font{
    font-family: Be Vietnam;
font-size: 18px !important;
font-style: normal;
font-weight: 600;
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
font-size: 14px !important;
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
.heading-font{
    font-family: Be Vietnam;
font-size: 22px !important;
font-style: normal;
font-weight: 600;
margin-bottom:2%;
}
.content-font{
    font-family: Be Vietnam;
font-size: 14px !important;
font-style: normal;
font-weight: 400;
}
.check-font{
    font-family: Be Vietnam;
font-size: 14px !important;
font-style: normal;
font-weight: 400;
margin-right:2%;
}
.btn-align{
    text-align: right;
    margin:0% 10% 0% 0%;  
}
.button-font{
    font-family: Be Vietnam;
font-size: 14px !important;
font-style: normal;
font-weight: 500;
}
.main-header{
font-size: 24px !important;
font-style: normal;
font-weight: 700;
color: #0398DC;
margin-right:4%;
}

/deep/ .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 13px !important;
    font-weight: 600;
    background-color: #ecebeb;
    text-align: start !important;
    padding-left: 55px;
    color: #808080;
}

/deep/.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    font-size: 13px !important;
    text-align: start !important;
    padding-left: 4vw;
}
  /deep/.v-input input {
      font-size: 14px !important;
  }
  /deep/.v-text-field--outlined.v-input--dense .v-label {
      font-size: 14px;
  }

  /deep/.theme--light.v-data-table {
    box-shadow: none !important;
  }
  /deep/.v-input--selection-controls.v-input {
    margin-top: -3px;
}
</style>