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
            <button class="btn-edit" @click="editFirmDetails()"> <v-icon large style="color:#DADADA;"> mdi-pencil-circle </v-icon> Edit Info</button>

            <h2 class="heading-font">Firm Details</h2>

            <v-layout>
                <v-flex xs7 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="firmDetails.firmName"
                        class="content-font"
                        outlined
                        :disabled="editMode==false"
                        dense
                        style="width:89%"
                        label="Firm name"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                     <v-text-field autocomplete="off" 
                        v-model="firmDetails.firmRegNumber"
                        class="content-font"
                        :disabled="editMode==false"
                        outlined
                        dense
                        label="Firm Reg.No.(FRN)"
                        required
                    ></v-text-field>
                </v-flex>
                
                <v-flex xs3 style="margin-right:2%">
                    <v-select
                        v-model="firmDetails.firmType"
                        :items="firmType_items"
                        class="content-font"
                        :disabled="editMode==false"
                        label="Firm Type"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
            </v-layout>

            <h2 class="heading-font">Address</h2>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="firmDetails.firmAddress.floor"
                        class="content-font"
                        :disabled="editMode==false"
                        outlined
                        dense
                        label="Floor/Building name"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="firmDetails.firmAddress.area"
                        class="content-font"
                        :disabled="editMode==false"
                        outlined
                        dense
                        label="Street/area"
                        required
                    ></v-text-field>
                </v-flex>

                
                  <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="firmDetails.firmAddress.pincode"
                        class="content-font"
                        :disabled="editMode==false"
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
                        v-model="firmDetails.firmAddress.country"
                        class="content-font"
                        :items="this.location.getAllCountries()"
                        item-text="name"
                        :disabled="editMode==false"
                    item-value="name"
                        @change="consolecountry"
                        label="Country"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs3 style="margin-right:2%">
                    <v-select
                        v-model="firmDetails.firmAddress.state"
                        :items="this.location.getAllStatesFromCountry(firmDetails.firmAddress.country)"
                        item-text="name"
                    item-value="name"
                        :disabled="!firmDetails.firmAddress.country || editMode==false"
                        class="content-font"
                        label="State"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                    
               <v-flex xs3 style="margin-right:2%">
                          <v-text-field hide-details 
                        v-model="firmDetails.firmAddress.city"
                        class="content-font"
                        outlined
                        dense
                        label="City"
                        :disabled="editMode==false"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="firmDetails.firmAddress.email"
                        class="content-font"
                        outlined
                        dense
                        :disabled="editMode==false"
                        :rules="emailRules"
                        label="Email"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="firmDetails.firmAddress.phonenumber"
                        class="content-font"
                        :disabled="editMode==false"
                        outlined
                        dense
                        label="Phone no."
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="firmDetails.firmAddress.website"
                        class="content-font"
                        :disabled="editMode==false"
                        outlined
                        dense
                        label="Website"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>

            
        <h2 class="heading-font">Contact Info</h2>
        <div style="display:flex;">
        <v-layout v-for="(data,k) in this.firmDetails.firmContacts" :key="k">
            <v-flex xs3 style="margin-right:2%">
                <v-text-field autocomplete="off" 
                v-model="data.name"
                :disabled="editMode==false"
                    outlined
                    dense
                    label="Name"
                    required
                ></v-text-field>
            </v-flex>

            <v-flex xs3 style="margin-right:2%">
                <v-text-field autocomplete="off" 
                v-model="data.email"
                    :rules="emailRules"
                    :disabled="editMode==false"
                    outlined
                    dense
                    label="Email"
                    required
                ></v-text-field>
            </v-flex>
                
            <v-flex xs3>
                <v-text-field autocomplete="off" 
                    v-model="data.phonenumber"
                    outlined
                    :disabled="editMode==false"
                    dense
                    label="Phone"
                    required
                ></v-text-field>
            </v-flex>
        
        <v-flex xs3>
                    <div style="display:flex">
                        <v-btn
                            class="mx-2"
                            fab
                            color="primary"
                            x-small
                            @click="add(k)"
                            style="background-color: #0398DC !important;border-color:#0398DC !important;"
                        >
                            <v-icon small>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-2"
                            fab
                            x-small
                            @click="remove(k)" 
                        >
                            <v-icon small>far fa-trash-alt</v-icon>
                        </v-btn>
                    </div>
                    </v-flex>
                    </v-layout>
                    </div>

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
       firmDetails:{},
            items:['Male','Female'],
            firmType_items:[
                "Proprietorship","LLP","Individual","Partnership"
            ]
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
     mounted(){
        if(this.$route.params.firmData)
        {
        this.editMode=false;
        console.log(this.$route.params.firmData,"result data")
         this.firmDetails = this.$route.params.firmData[0];
         console.log(this.firmDetails,"yessss")
        }

    },
    methods:{
editFirmDetails(){
this.editMode=true;
console.log(this.firmDetails,"detailsss")
},
     async savefirmDetails(){
            console.log(this.firmDetails,"entityDetails")
            const firmDetails=this.firmDetails
            
 //if(this.$refs.addEntityForm.validate()){
     console.log("ohhhhh")
          try{          
            var res = await this.$apiService.post('/auditor/firm',firmDetails);
            if(res&&res.status === 200) {
console.log(res.data,"res")
this.$router.push('/auditor'); 
            
        }}
        catch(error) {
            console.log("err")
           }
     console.log("yesssss");
     return;
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

