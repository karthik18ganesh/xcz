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

        <v-form>
            <v-container class="container-align">
            <button class="btn-edit"> <v-icon large style="color:#DADADA;"> mdi-pencil-circle </v-icon> Edit Info</button>

            <h2 class="heading-font">Personal Info</h2>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.firstname"
                        class="content-font"
                        outlined
                        dense
                        label="First name"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.lastname"
                        class="content-font"
                        outlined
                        dense
                        label="Last Name"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.fathername"
                        class="content-font"
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
                            <v-text-field autocomplete="off" 
                            class="content-font"
                            v-model="ownershipDetails.dob"
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
                        :items="items"
                        class="content-font"
                        label="Gender"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.designation"
                        class="content-font"
                        outlined
                        dense
                        label="Designation"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.pan"
                        class="content-font"
                        outlined
                        dense
                        label="PAN"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.aadharno"
                        class="content-font"
                        outlined
                        dense
                        label="Aadhar No"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>
<v-layout>
    <v-flex xs3 style="margin-right:2%">
        <p>Partner's Profit Sharing Ratio</p>
    </v-flex>
    <v-flex xs3 style="margin-right:2%">
           <v-text-field autocomplete="off" 
                        v-model="ratio"
                        class="content-font"
                        outlined
                        dense
                        required
                    ></v-text-field>
                    <p>%</p>
    </v-flex>
</v-layout>
            <h2 class="heading-font">Permanent Address</h2>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.permanentadress.floor_or_building_name"
                        class="content-font"
                        outlined
                        dense
                        label="Floor/Building name"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.permanentadress.street_or_area"
                        class="content-font"
                        outlined
                        dense
                        label="Street/area"
                        required
                    ></v-text-field>
                </v-flex>

                
                  <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.permanentadress.pincode"
                        class="content-font"
                        outlined
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
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.email"
                        class="content-font"
                        outlined
                        dense
                        :rules="emailRules"
                        label="Email"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.phone"
                        class="content-font"
                        outlined
                        dense
                        label="Phone no."
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 md3 style="margin-right:2%">
                    <h2 class="heading-font">Present Address</h2>
                </v-flex>
                <v-flex xs4 md4 style="display:flex;align-items:center;">
                    <br/>
                    <h6 class="check-font">Permanent address same as present address</h6>
                                        <v-checkbox
                        v-model="ownershipDetails.issameaspremanentadd"
                        @click="sameAddress"
                    ></v-checkbox>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.presentaddress.floor_or_building_name"
                        class="content-font"
                        outlined
                        dense
                        :value="PbuildingName"
                        label="Floor/Building name"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.presentaddress.street_or_area"
                        class="content-font"
                        outlined
                        dense
                        :value="Pstreet"
                        label="Street/area"
                        required
                    ></v-text-field>
                </v-flex>
                    
             
                  <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="ownershipDetails.presentaddress.pincode"
                        class="content-font"
                        outlined
                        dense
                        :value="Ppincode"
                        label="Pincode"
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
            <h2 class="heading-font">Partnership Details</h2>
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
                                    label="Date of admission"
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
                                    format="dd-mm-yyyy"
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
                        label="Type of Partner"
                        :disabled="editMode==false"
                        required
                        hide-details
                    ></v-select>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="display:flex;align-items:center;margin-right:2%;font-size: 12px !important;color: #808080;">
                    <h6 class="ceasecheck-font">Has the partner ceased to exist during the year.</h6>
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
            </v-container>

             <div class="btn-align">
            <v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="saveProprietor"
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
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'Proprietor',
    components: {

    },
    data(){
        return{
            countrytest:"",
       ownershipDetails:{
           permanentadress:{},
           presentaddress:{}
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
    methods:{
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

     async saveProprietor(){
            console.log(this.ownershipDetails,"entityDetails")
            const ownershipDetails={companyid:"1015",ownershipDetails:[this.ownershipDetails]
            }
 //if(this.$refs.addEntityForm.validate()){
     console.log("ohhhhh")
          try{          
            var res = await this.$apiService.post('/master',ownershipDetails);
            if(res&&res.status === 200) {
console.log(res.data,"res")
this.$router.push('/proprietor'); 
this.fetchMasterData();
            
        }}
        catch(error) {
            console.log("err")
           }
     console.log("yesssss");
     return;
        },
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
.container-align{
    margin-top: 2vh;
    text-align: left;
    margin-left:100px;
    margin-right: 50px;
}
.img-border{
    border-radius: 50%;
}
.textfield-align{
    max-width: 38%;
}
.btn-edit{
    
font-size: 16px !important;
font-style: normal;
font-weight: 700;

}
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
.heading-font{
    
font-size: 22px !important;
font-style: normal;
font-weight: 600;
margin-bottom:2%;
}
.content-font{
    
font-size: 18px !important;
font-style: normal;
font-weight: 400;
}
.check-font{
    
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
    
font-size: 18px !important;
font-style: normal;
font-weight: 500;
}
</style>

