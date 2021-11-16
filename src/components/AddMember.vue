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
            <button class="btn-edit" @click="editMemberDetails()"> <v-icon large style="color:#DADADA;"> mdi-pencil-circle </v-icon> Edit Info</button>

            <h2 class="heading-font">Members Info</h2>

            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="memberDetails.memberName"
                        :disabled="editMode==false"
                        class="content-font"
                        outlined
                        dense
                        label="Name of the Auditor"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-select
                        v-model="memberDetails.memberType"
                        :disabled="editMode==false"
                        :items="memberType_items"
                        class="content-font"
                        label="Auditor Type"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
            </v-layout>
<v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="memberDetails.membershipNumber"
                        :disabled="editMode==false"
                        class="content-font"
                        outlined
                        dense
                        label="Membership No."
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="memberDetails.memberDesignation"
                        :disabled="editMode==false"
                        class="content-font"
                        outlined
                        dense
                        label="Designation"
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
                            v-model="memberDetails.memberAppointedFrom"
                            persistent-hint
                            append-icon="mdi-calendar"
                            label="Appointed From"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'date is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="memberDetails.memberAppointedFrom"
                            :disabled="editMode==false"
                            @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
                
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
                            v-model="memberDetails.memberAppointedTo"
                            persistent-hint
                            append-icon="mdi-calendar"
                            label="Appointed To"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'date is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="memberDetails.memberAppointedTo"
                            :disabled="editMode==false"
                            @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs3 style="display:flex;align-items:flex-start;margin-top:5px;margin-right:2%">
            <p class="content-font" style="margin-right:2%;">Retiring This year</p>
            <v-switch
                        v-model="memberDetails.isretiring"
                        :disabled="editMode==false"
                        style="margin-top:0px !important"
                    >
                    <template v-slot:label>
                    Yes
                    </template>
                    </v-switch>
            </v-flex>
            </v-layout>
            
           <v-layout>
                <v-flex xs7 md7 style="display:flex;align-items:center">
                    <h2 class="heading-font">Address</h2>
                    <h6 class="check-font">Address same as Firm address</h6>
                                        <v-checkbox
                        v-model="memberDetails.issameaddress"
                        @click="sameAddress"
                        :disabled="editMode==false"
                    ></v-checkbox>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 style="margin-right:2%">
                    <v-text-field autocomplete="off" 
                        v-model="memberDetails.memberaddress.floor"
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
                        v-model="memberDetails.memberaddress.area"
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
                        v-model="memberDetails.memberaddress.pincode"
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
                        v-model="memberDetails.memberaddress.country"
                        class="content-font"
                        item-text="name"
                    item-value="name"
                        :items="this.location.getAllCountries()"
                        @change="consolecountry"
                        :disabled="editMode==false"
                        label="Country"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs3 style="margin-right:2%">
                    <v-select
                        v-model="memberDetails.memberaddress.state"
                        :items="this.location.getAllStatesFromCountry(firmDetails.firmAddress.country)"
                        item-text="name"
                    item-value="name"
                        :disabled="!memberDetails.memberaddress.country || editMode==false"
                        class="content-font"
                        label="State"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                    
                <v-flex xs3 style="margin-right:2%">
                          <v-text-field hide-details 
                        v-model="memberDetails.memberaddress.city"
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
                        v-model="memberDetails.memberaddress.email"
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
                    <v-text-field autocomplete="off" 
                        v-model="memberDetails.memberaddress.phonenumber"
                        class="content-font"
                        :disabled="editMode==false"
                        outlined
                        dense
                        label="Phone no."
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
                 @click="saveMemberDetails()"
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
import moment from "moment";
export default {
    name: 'Member',
    components: {

    },
    data(){
        return{
            countrytest:"",
            firmDetails:{},
            editMode:false,
            memberDetails:{},
            items:['Male','Female'],
            memberType_items:[
                "ACA","FCA"
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
       async mounted() {
    this.firmDetails = this.$route.params.firmData[0];
    var res = await this.$apiService.post(
          "/auditor/member/get",
          {firmId:this.firmDetails.firmId}
        );
        if (res && res.status === 200) {
            
            this.memberDetails=res.data.data;
            console.log(this.memberDetails.memberAppointedFrom,"ressss")
            this.memberDetails.memberAppointedFrom=moment(String(this.memberDetails.memberAppointedFrom)).format("DD-MM-YYYY"),
            this.memberDetails.memberAppointedTo=moment(String(this.memberDetails.memberAppointedTo)).format("DD-MM-YYYY"),
            
        //   res.data.data.forEach((val,idx) => {              
        //       this.auditorfirm.push({
        //       firmName: val.firmName,
        //       firmRegNumber: val.firmRegNumber,
        //       firmType: val.firmType,
        //       firmAddress:val.firmAddress,
        //       addressDetail:(val.firmAddress.floor,val.firmAddress.area,val.firmAddress.city,val.firmAddress.pincode,val.firmAddress.state,val.firmAddress.country),
        //       firmContacts: val.firmContacts,
        //       members:val.memberCount,
        //       index:idx
        //     });
        //   });
          console.log(this.auditorfirm,"auditor firmmmmm3")
        }
  },
    methods:{
        sameAddress(){
            if(this.memberDetails.issameaspremanentadd === true){
                this.memberDetails.presentaddress.floor_or_building_name= this.memberDetails.memberaddress.floor_or_building_name,
                this.memberDetails.presentaddress.street_or_area= this.memberDetails.memberaddress.street_or_area,
                this.memberDetails.presentaddress.city= this.memberDetails.memberaddress.city,
                this.memberDetails.presentaddress.pincode= this.memberDetails.memberaddress.pincode,
                this.memberDetails.presentaddress.state= this.memberDetails.memberaddress.state,
                this.memberDetails.presentaddress.country= this.memberDetails.memberaddress.country;
            }else{
               this.memberDetails.presentaddress.floor_or_building_name= '',
                this.memberDetails.presentaddress.street_or_area= '',
                this.memberDetails.presentaddress.city= '',
                this.memberDetails.presentaddress.pincode= '',
                this.memberDetails.presentaddress.state= '',
                this.memberDetails.presentaddress.country= '';
            }
        },
        editMemberDetails(){
        this.editMode=true;
        },
 async saveMemberDetails(){
            
                    const saveMemberData =this.memberDetails;
 
    var res = await this.$apiService.put(
          "/auditor/member",
          saveMemberData
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
this.$router.push('/auditfirminfo');
           
        }
        else{
          console.log("error")
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
margin-right:4%;
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
.content-font{
font-size: 18px !important;
font-style: normal;
font-weight: 400;
}
</style>

