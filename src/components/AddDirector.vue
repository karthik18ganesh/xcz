<template>
    <div>
        <v-layout style="margin-top: 10px;">
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

            <v-container class="container-align">
            <button class="btn-edit" @click="editDirector" style="margin:1% 1% 3% 1%;margin-left: 0px;margin-bottom: 10px;display: flex;align-items: center;font-size: 14px;color: #b3b2b2;"> <v-icon style="font-size:25px !important;color: #b3b2b2;margin-right:5px"> mdi-pencil-circle</v-icon> Edit Info</button>

            <h2 class="heading-font">Personal Info</h2>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.firstname"
                         class="content-font"
                        outlined
                        dense
                        label="First name"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.lastname"
                         class="content-font"
                         :disabled="editMode==false"
                        outlined
                        dense
                        label="Last Name"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.fathername"
                         class="content-font"
                         :disabled="editMode==false"
                        outlined
                        dense
                        label="Father's Name"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field hide-details 
                             class="content-font"
                            v-model="ownershipDetails.dob"
                            :disabled="editMode==false"
                            persistent-hint
                            append-icon="mdi-calendar"
                            label="DOB"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'date is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="ownershipDetails.dob"
                            @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
                
                <v-flex xs3 style="margin-right:2%">
                    <v-select
                        v-model="ownershipDetails.gender"
                        :disabled="editMode==false"
                        :items="gender"
                        label="Gender"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
            </v-layout>

            <h2 class="heading-font" style="margin-top: 0px;">Permanent Address</h2>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.permanentadress.floor_or_building_name"
                         class="content-font"
                        outlined
                        dense
                        label="Floor/Building name"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.permanentadress.street_or_area"
                         class="content-font"
                        outlined
                        dense
                        label="Street/area"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>
                    
                <v-flex xs3 style="margin-right:2%">
                     <v-text-field hide-details 
                        v-model="ownershipDetails.permanentadress.pincode"
                         class="content-font"
                        outlined
                        :disabled="editMode==false"
                        dense
                        label="Pincode"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                     <v-select
                        v-model="ownershipDetails.permanentadress.country"
                         class="content-font"
                         :items="this.location.getAllCountries()"
                         item-text="name"
                         :disabled="editMode==false"
                    item-value="name"
                        label="Country"
                        outlined
                        hide-details
                        dense>
                    </v-select>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-select
                        v-model="ownershipDetails.permanentadress.state"
                         class="content-font"
                         :items="this.location.getAllStatesFromCountry(ownershipDetails.permanentadress.country)"
                         item-text="name"
                         :disabled="!ownershipDetails.permanentadress.country || editMode==false"
                    item-value="name"
                        label="State"
                        outlined
                        hide-details
                        dense>
                    </v-select>
                </v-flex>
                    
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.permanentadress.city"
                        class="content-font"
                        :disabled="editMode==false"
                        outlined
                        dense
                        label="City"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.email"
                         class="content-font"
                         :disabled="editMode==false"
                        outlined
                        dense
                        :rules="emailRules"
                        label="Email"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.phone"
                         class="content-font"
                         :disabled="editMode==false"
                        outlined
                        dense
                        label="Phone no."
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout style="height: 40px;">
                <v-flex xs2>
                    <h2 style="margin-top: 0px;" class="heading-font">Present Address</h2>
                </v-flex>
               <v-flex xs4 md4 style="display:flex;padding-top: 5px;color: #808080;margin-left: -35px;">
                    <h6 class="check-font">Permanent address same as present address</h6>
                                        <v-checkbox
                        v-model="ownershipDetails.issameaspremanentadd"
                        :disabled="editMode==false"
                        @click="sameAddress"
                    ></v-checkbox>
                </v-flex>
            </v-layout>

            <v-layout  style="height: 40px;margin-bottom: 15px;">
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.presentaddress.floor_or_building_name"
                         class="content-font"
                        outlined
                        dense
                        label="Floor/Building name"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.presentaddress.street_or_area"
                         class="content-font"
                        outlined
                        dense
                        label="Street/area"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>
                    
                <v-flex xs3 style="margin-right:2%">
                     <v-text-field hide-details 
                        v-model="ownershipDetails.presentaddress.pincode"
                         class="content-font"
                        outlined
                        dense
                        :value="ownershipDetails.presentaddress.pincode"
                        label="Pincode"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                        <v-select
                        v-model="ownershipDetails.presentaddress.country"
                        :items="this.location.getAllCountries()"
                        item-text="name"
                    item-value="name"
                         class="content-font"
                        :value="ownershipDetails.presentaddress.country"
                        label="Country"
                        :disabled="editMode==false"
                        outlined
                        hide-details
                        dense>
                    </v-select>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-select
                        v-model="ownershipDetails.presentaddress.state"
                        :items="this.location.getAllStatesFromCountry(ownershipDetails.presentaddress.country)"
                        item-text="name"
                    item-value="name"
                         class="content-font"
                         :disabled="!ownershipDetails.presentaddress.country || editMode==false"
                        :value="ownershipDetails.presentaddress.state"
                        label="State"
                        hide-details
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                    
                <v-flex xs3 style="margin-right:2%">
                          <v-text-field hide-details 
                        v-model="ownershipDetails.presentaddress.city"
                        class="content-font"
                        outlined
                        dense
                        label="City"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout style="height: 40px;">
                <v-flex xs3 md3>
                    <h2 style="margin-top: 0px;" class="heading-font">Directorship Details</h2>
                </v-flex>
                 <v-flex xs4 md4 style="display:flex;padding-top: 5px;color: #808080;margin-left: -100px;">
                    <h6 class="check-font">Does the director holds any shares/ debentures</h6>
                        <v-switch style="margin-left: 15px;" v-model="ownershipDetails.directorshipdetails.isanyshare" :disabled="editMode==false"></v-switch>
                </v-flex>
            </v-layout>

            <v-layout >
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.directorshipdetails.din"
                         class="content-font"
                        outlined
                        dense
                        label="DIN"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.directorshipdetails.aadhar"
                         class="content-font"
                        outlined
                        dense
                        label="Aadhar No"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.directorshipdetails.pan"
                         class="content-font"
                        outlined
                        dense
                        label="PAN"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field hide-details 
                                    v-model="ownershipDetails.directorshipdetails.appointmantdate"
                                     class="content-font"
                                    persistent-hint
                                    append-icon="mdi-calendar"
                                    label="Date of appointment"
                                    :disabled="editMode==false"
                                    v-bind="attrs"
                                    v-on="on"
                                    :rules="[v => !!v || 'date is required']"
                                    outlined
                                    dense
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    no-title
                                    hide-details
                                    v-model="ownershipDetails.directorshipdetails.appointmantdate"
                                    format="MM-dd-yyyy"
                                    @input="menu2 = false"
                                ></v-date-picker>
                            </v-menu>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-select
                        v-model="ownershipDetails.directorshipdetails.type"
                         class="content-font"
                         :items="directorship"
                        outlined
                        dense
                        label="Type of Directorship"
                        :disabled="editMode==false"
                        required
                        hide-details
                    ></v-select>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field hide-details 
                        v-model="ownershipDetails.directorshipdetails.designation"
                         class="content-font"
                        outlined
                        dense
                        label="Designation"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="display:flex;align-items:center;margin-right:2%;font-size: 12px !important;color: #808080;">
                    <h6 class="ceasecheck-font">Has the director ceased to exist during the year.</h6>
                     <v-switch
                        v-model="ownershipDetails.directorshipdetails.iscease" 
                        :disabled="editMode==false"
                    ></v-switch>
                </v-flex>
                        <v-flex xs3 style="margin-right:2%" v-if="ownershipDetails.directorshipdetails.iscease === true">
                            <br/>
                            <v-select
                                v-model="ownershipDetails.directorshipdetails.ceasationtype"
                                 class="content-font"
                                 :items="ceasationType"
                                outlined
                                dense
                                label="Ceasation Type"
                                :disabled="editMode==false"
                                required
                            ></v-select>
                        </v-flex>

                        <v-flex xs3 v-if="ownershipDetails.directorshipdetails.iscease === true">
                            <br/>
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field hide-details 
                                    v-model="ownershipDetails.directorshipdetails.ceasationDate"
                                     class="content-font"
                                    persistent-hint
                                    append-icon="mdi-calendar"
                                    label="Date of Ceasation"
                                    :disabled="editMode==false"
                                    v-bind="attrs"
                                    v-on="on"
                                    :rules="[v => !!v || 'date is required']"
                                    outlined
                                    dense
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    no-title
                                    v-model="ownershipDetails.directorshipdetails.ceasationDate"
                                    format="MM-dd-yyyy"
                                    @input="menu2 = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-flex>
            </v-layout>
<v-row style="display:flex;justify-content:flex-end">
    <v-btn
                    class="ma-2 button-font"
                    color="primary"
                    style="background-color: #03a9f4 !important;border-color:#03a9f4 !important; text-transform:none;color:white;width: 8%;font-size: 14px !important;height: 32px;"
                    @click="saveDirector()"
                >
                    Save
                </v-btn>
                <v-btn
                    class="ma-2 button-font"
                    outlined
                    color="#03a9f4"
                    style="border-color:#03a9f4 !important; text-transform:none;width: 8%;font-size: 14px !important;height: 32px;"
                    @click="cancelEntry()"
                >
                    Cancel
                </v-btn>
                </v-row>
            </v-container>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: 'Director1',
    components: {

    },
    data(){
        return{
            companyName:"",
            menu1: false,
            menu2: false,
            addressCheck: false,
            emailRules:[],
            directorCeasesYearSwitch: false,
            directorHoldsSwitch: false,
             ownershipDetails:{
           permanentadress:{},
           presentaddress:{},
           directorshipdetails:{},
           directorData:{},
           editMode:false,
       },
       gender:['Male','Female'],
       ceasationType:['Resignation','Death of Director','Removal of Director'],
       directorship:['Director ','Managing Director','Additional Director','Independent Director']
        }
    },
    watch: {
        Demail: function (mail) {
            if (mail !== '') {
                this.emailRules = [ v => (v.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Invalid Email address']
            } else if (mail === '') {
                this.emailRules = []
            }
        }
    },
    mounted(){
        this.companyName = JSON.parse(sessionStorage.getItem("master")).entity[0].name;
        if(this.$route.params.directorData)
        {
        this.editMode=false;
         this.ownershipDetails = this.$route.params.directorData[0];
         this.ownershipDetails.dob=moment(this.ownershipDetails.dob).format("DD-MM-YYYY");
         this.ownershipDetails.directorshipdetails.ceasationdate=moment(this.ownershipDetails.directorshipdetails.ceasationdate).format("DD-MM-YYYY");
        }
         if(this.$route.params.addNewDirector){
             this.editMode=true;
         }
console.log(this.editMode,"yessss")
    },
    methods:{
        checkedit(){
return this.editMode;
        },
     sameAddress(){
            if(this.ownershipDetails.issameaspremanentadd === true){
                this.ownershipDetails.presentaddress.floor_or_building_name= this.ownershipDetails.permanentadress.floor_or_building_name,
                this.ownershipDetails.presentaddress.street_or_area= this.ownershipDetails.permanentadress.street_or_area,
                this.ownershipDetails.presentaddress.city= this.ownershipDetails.permanentadress.city,
                this.ownershipDetails.presentaddress.pincode= this.ownershipDetails.permanentadress.pincode,
                this.ownershipDetails.presentaddress.state= this.ownershipDetails.permanentadress.state,
                this.ownershipDetails.presentaddress.country= this.ownershipDetails.permanentadress.country;
            }else{
               this.ownershipDetails.presentaddress.floor_or_building_name= '',
                this.ownershipDetails.presentaddress.street_or_area= '',
                this.ownershipDetails.presentaddress.city= '',
                this.ownershipDetails.presentaddress.pincode= '',
                this.ownershipDetails.presentaddress.state= '',
                this.ownershipDetails.presentaddress.country= '';
            }
        },

         async saveDirector(){
             console.log(this.ownershipDetails,"entityDetails")
            const ownershipDetails={companyid:this.$store.getters.companyId,financialid:this.$store.getters.financialId,ownershipDetails:[this.ownershipDetails]
            }
 //if(this.$refs.addEntityForm.validate()){
     console.log("ohhhhh")
          try{          
            var res = await this.$apiService.post('/master',ownershipDetails);
            if(res&&res.status === 200) {
console.log(res.data,"res")
this.$router.push('/directors');         
        }}
        catch(error) {
            console.log("err")
           }
     return;
            
        },
         cancelEntry(){
            this.$router.push('/directors');
        },
        editDirector(){
            console.log("hittttt");
            this.editMode=true;
            console.log(this.editMode,"this.editMode")
        },
                    async fetchMasterData(){
try{          
            var res = await this.$apiService.post('/master/get',{companyid:this.$store.getters.companyId,financialid:this.$store.getters.financialId});
            if(res&&res.status === 200) {
console.log(res.data.data,"setMasterData")  
                this.$store.commit("setMasterData" , res.data.data); 
            
}
                 
            
        }
        catch(error) {
            console.log(error,"err")
           }
        
        },
    }
}
</script>

<style scoped>
.v-input.v-input--switch--inset .v-input--switch__track:after {
    content: "No";
    color: #333333;
    font-size: 10px;
}

.v-input.v-input--switch--inset.v-input--is-label-active.v-input--is-dirty .v-input--switch__track:after{
   content: "Yes";
   color: #28A745;
}
h3{
    margin: 20px;
}
h2{
    color: #03a9f4;
    margin-top: 2vh;
    margin-bottom: 1vh;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.container-align{
    text-align: left;
    margin-left:50px;
    font-weight: 200;
}
.toolbar-align{
    margin-left: 50px;
    margin-right: 100px;
}
.toolbar-align1{
    margin-left: 100px;
}
.company-font{
    
font-size: 18px !important;
font-style: normal;
font-weight: 600;
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
.heading-font{

    font-size: 18px !important;
    font-style: normal;
    font-weight: 600;
    margin-bottom: 1%;
}
.content-font{
    
font-size: 18px !important;
font-style: normal;
font-weight: 400;
margin-bottom: 15px;
}
.check-font{
    
font-size: 14px !important;
font-style: normal;
font-weight: 400;
margin-right:2%;
}
.btn-align{
    text-align: right;
    margin:0% 0% 0% 18%;  
}
.button-font{
    
font-size: 18px !important;
font-style: normal;
color: grey;
}
.divider-size{
    border-right: 1px solid rgba(64, 64, 64, 0.25);
    height: 3em;
    margin-top:6% !important;
}
.ceasecheck-font{
font-size: 16px !important;
font-style: normal;
font-weight: 400 !important;
margin-right: 1% !important;
}
* {
    font-size: 14px !important;
  }
  /deep/.v-input input {
      font-size: 14px !important;
  }
  /deep/.v-text-field--outlined.v-input--dense .v-label {
      font-size: 14px;
  }

  /deep/.v-input--selection-controls.v-input{
      margin: -3px;
  }
</style>