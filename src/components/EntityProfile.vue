<template>
<v-container class="ma-0 pa-0" style="max-width:100% !important;padding-top:15px;padding-left:50px">
<!-- <div style="height:10%">
        <h5 class="header-text"></h5>
        <v-divider class="blueUline"></v-divider>
</div> -->
        <v-layout style="max-width:100% !important">
<v-flex md8>
 <v-form ref="addEntityForm">
        <div style="display:flex;">
        <div class="container-align">
        <button class="btn-edit" style="margin:1% 1% 3% 1%;display: flex;align-items: center;font-size: 14px;"> <v-icon style="font-size:25px !important;color: #b3b2b2;"> mdi-pencil-circle</v-icon> Edit Info</button>

        <v-layout>
            <v-flex xs9 md9 style="max-width:68%">
                <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                :rules="[v => !!v || 'Enterprise Name is required']"
                    v-model="entityDetails.name"
                    outlined
                    dense
                    label="Entity Name"
                    required
                ></v-text-field>
            </v-flex>

            <v-spacer></v-spacer>
            <v-flex>
                
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs4 md4 style="margin-right:1.5%;max-width:36%">
                <v-select
                    v-model="entityDetails.type"
                    :items="items"
                    outlined
                    dense
                     :rules="[v => !!v || 'Type of Entity is required']"
                    label="Type of Entity"
                    required
                ></v-select>
            </v-flex>

            <v-flex xs4 md4 style="max-width:36%">
 <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="auto"
                    min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                        v-model="entityDetails.establishment_date"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        format="MM-dd-yyyy"
                        :rules="[v => !!v || 'Date of Establishment is required']"
                        label="Date of Establishment"
                        outlined
                        dense
                    ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="entityDetails.establishment_date"
                        no-title
                        format="MM-dd-yyyy"
                        @input="menu3 = false"
                    ></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>

        <h2 style="margin-bottom:2%">Address</h2>

         <v-layout style="width:100%">
                    <v-flex style="min-width:36%;margin-right:1.5%" >
                        <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                            v-model="entityDetails.address.floor_or_building_name"
                            outlined
                            dense
                            label="Floor/Building name"
                            required
                        ></v-text-field>
                    </v-flex>

                    <v-flex style="min-width:36%;margin-right:1.5%" >
                        <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                            v-model="entityDetails.address.street_or_area"
                            outlined
                            dense
                            label="Street/area"
                            required
                        ></v-text-field>
                    </v-flex>
                             
                    <v-flex xs4 md4 style="margin-right:1.5%;min-width:36%">
                        <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                            v-model="entityDetails.address.pincode"
                            outlined
                            dense
                            label="Pincode"
                            required
                        ></v-text-field>
                    </v-flex>
                  
                </v-layout>

                <v-layout style="100%">
               <v-flex xs4 md4 style="min-width:36%;margin-right:1.5%;">
                        <v-select
                        v-model="entityDetails.address.country"
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
                    <v-flex xs4 md4 style="margin-right:1.5%;min-width:36%;">
                        <v-select
                        v-model="entityDetails.address.state"
                         class="content-font"
                         :items="this.location.getAllStatesFromCountry(entityDetails.address.country)"
                         item-text="name"
                         :disabled="!entityDetails.address.country || editMode==false"
                    item-value="name"
                        label="State"
                        outlined
                        hide-details
                        dense>
                    </v-select>
                    </v-flex>
                            
                     <v-flex xs4 md4 style="min-width:36%" >
                        <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                            v-model="entityDetails.address.city"
                            label="City"
                            outlined
                            dense>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs4 md4 style="margin-right:1.5%;min-width:36%;">
                        <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                            v-model="entityDetails.cin_or_regno"
                            outlined
                            dense
                            label="CIN /Reg No."
                            required
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs4 md4 style="margin-right:1.5%;min-width:36%;">
                        <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                            v-model="entityDetails.pan"
                            label="PAN"
                            outlined
                            dense>
                        </v-text-field>
                    </v-flex>
                            
                    <v-flex xs4 md4 style="min-width:36%;">
                        <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                            v-model="entityDetails.gstin"
                            label="GSTIN No."
                            outlined
                            dense>
                        </v-text-field>
                    </v-flex>
                </v-layout>

        <h2 style="margin-bottom:2%">Contact Info</h2>
        <div style="display:flex;width:115%;flex-direction: column;">
        <v-layout v-for="(data,k) in this.entityDetails.contacts" :key="k">
            <v-flex xs4 md4 style="margin-right:1.5%;min-width:31.2%;">
                <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                v-model="data.name"
                    outlined
                    dense
                    label="Name"
                    required
                ></v-text-field>
            </v-flex>

            <v-flex xs4 md4 style="margin-right:1.5%;min-width:31.2%;">
                <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                v-model="data.email"
                    :rules="emailRules"
                    outlined
                    dense
                    label="Email"
                    required
                ></v-text-field>
            </v-flex>
                
            <v-flex xs4 md4 style="min-width:31.2%;margin-right:1.5%;">
                <v-text-field class="textFieldStyle" hide-details autocomplete="off" 
                    v-model="data.phone"
                    outlined
                    dense
                    label="Phone"
                    required
                ></v-text-field>
            </v-flex>
            <v-flex xs4 md4 style="display:flex">
                        <v-btn
                            class="mx-2"
                            fab
                            color="#03a9f4"
                            x-small
                            @click="add(k)"
                            style="background-color: #03a9f4 !important;border-color:#03a9f4 !important;color:white"
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
            </v-flex>
        </v-layout>
        
                    
                    </div>
        </div>
</div>
        </v-form>
</v-flex>
<v-flex md4 style="display:flex;">
 <v-card
                width="200" 
                class="img-contents">
<p class="logo-text">Add logo here</p>
            </v-card>
            <button style="margin-left:4%;color:grey;margin-top:25%;display:flex;">
                <v-icon>mdi-delete-outline</v-icon>
                </button>
</v-flex>

        </v-layout>
        <v-flex>
                    <div style="    display: flex;
    justify-content: flex-end;
    margin-right: 55px;">
            <v-btn
                class="ma-2"
                color=" #03a9f4"
                @click="saveEntity"
                style="background-color:  #03a9f4 !important;border-color: #03a9f4 !important;color:white;font-weight:500;width:7.5%"
            >
                Save
            </v-btn>
            <v-btn
                class="ma-2"
                outlined
                color=" #03a9f4"
                style="color: #03a9f4 !important;font-weight:500"
                @click="continueClick()"
            >
                Continue
            </v-btn>
        </div>
        </v-flex>
</v-container>
</template>




<script>
import moment from 'moment'
export default {
    data(){
        return{
           
            entityDetails:{name:"",entityType:"",
            pan:"",
            gstin:"",
            cin_or_regno:"",
            establishment_date:"",
            address:{floor_or_building_name:"",pincode:"",city:""},
             contacts:[{}],
            },
            items:['Company','Proprietor','Partnership','LLP','HUF','Trust','AOP/BOI','Body Corporate'],
            entityData:{},
        }
    },watch: {
        email: function (mail) {
            if (mail !== '') {
                this.emailRules = [ v => (v.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Invalid Email address']
            } else if (mail === '') {
                this.emailRules = []
            }
        }
    },
    async mounted(){
        // var userDetails = JSON.parse(sessionStorage.getItem("userDetails")).data.id;
            var res = await this.$apiService.post('/master/get',{companyid:Number(sessionStorage.getItem("companyId")),financialid:Number(sessionStorage.getItem("financialId"))});
            if(res&&res.status === 200) {
                console.log(res.data.data)
                sessionStorage.setItem("master",JSON.stringify(res.data.data));
                this.entityDetails = {name:"",entityType:"",
            pan:"",
            gstin:"",
            cin_or_regno:"",
            establishment_date:"",
            address:{floor_or_building_name:"",pincode:"",city:""},
             contacts:[{}],
            };
            var entity = res.data.data.entity[0];
                if(res.data.data.entity && res.data.data.entity[0]){
                this.entityDetails.name = res.data.data.financial[0].company_name;
                this.entityDetails.pan = entity.pan;
                this.entityDetails.gstin = entity.gstin;
                this.entityDetails.cin_or_regno = entity.cin_or_regno;
                this.entityDetails.entityType = entity.typeofcompany;
                this.entityDetails.address = entity.address;
                this.entityDetails.contacts = entity.contacts?JSON.parse(entity.contacts).data:[{}];
                this.entityDetails.establishment_date= this.entityDetails.establishment_date?moment(String(this.entityDetails.establishment_date)).format('YYYY-MM-DD'):"";
                }   
            }         
            console.log(this.entityDetails,"entityyyyy")
        },
    methods:{
        async saveEntity(){
             var orgId = JSON.parse(sessionStorage.getItem("userDetails")).data.id;
            console.log(this.entityDetails,this.contacts,"entityDetails")
            const entityDetails={companyid:Number(sessionStorage.getItem("companyId")),entityDetails:{
    "name": this.entityDetails.name,
    "type": this.entityDetails.type,
    "organization_id":orgId,
    "companyid":Number(sessionStorage.getItem("companyId")),
    "features": this.entityDetails.features,
    "establishment_date":this.entityDetails.establishment_date,
    "cin_or_regno":this.entityDetails.cin_or_regno,
    "pan":this.entityDetails.pan,
    "gstin": this.entityDetails.gstin,
    "address": {
        "floor_or_building_name":this.entityDetails.address.floor_or_building_name,
        "street_or_area":this.entityDetails.address.street_or_area,
        "country":this.entityDetails.address.country,
        "state":this.entityDetails.address.state,
        "city":this.entityDetails.address.city,
        "pincode":this.entityDetails.address.pincode
    },
    "contacts":this.entityDetails.contacts

}
            }

         
            var res = await this.$apiService.post('/master',entityDetails);
            if(res&&res.status === 200) {
            console.log(res.data,"res")
            
        }
     
        },
        add(){
            this.entityDetails.contacts.push({ name: '', email: '', phone: '' });
        },
        remove(index) {
            this.entityDetails.contacts.splice(index, 1);
        },
        async continueClick(){
                      var orgId = JSON.parse(sessionStorage.getItem("userDetails")).data.id;
            console.log(this.entityDetails,this.contacts,"entityDetails")
            const entityDetails={companyid:Number(sessionStorage.getItem("companyId")),entityDetails:{
    "name": this.entityDetails.name,
    "type": this.entityDetails.type,
    "organization_id":orgId,
    "companyid":Number(sessionStorage.getItem("companyId")),
    "features": this.entityDetails.features,
    "establishment_date":this.entityDetails.establishment_date,
    "cin_or_regno":this.entityDetails.cin_or_regno,
    "pan":this.entityDetails.pan,
    "gstin": this.entityDetails.gstin,
    "address": {
        "floor_or_building_name":this.entityDetails.address.floor_or_building_name,
        "street_or_area":this.entityDetails.address.street_or_area,
        "country":this.entityDetails.address.country,
        "state":this.entityDetails.address.state,
        "city":this.entityDetails.address.city,
        "pincode":this.entityDetails.address.pincode
    },
    "contacts":this.entityDetails.contacts

}
            }

         
            var res = await this.$apiService.post('/master',entityDetails);
            if(res&&res.status === 200) {
            console.log(res.data,"res")
            this.$router.push('/financials');
            
        }
            
        }
    }
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
.textFieldStyle{
    margin-bottom: 20px !important;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.container-align{    
    padding-top: 5px !important;
    padding: 15px;
    padding-left: 50px;
    text-align: left;
    margin: 10px
}
.btn-align{
    text-align: right;
    margin:56% 10% 0% 0%;
}
.divider-size{
    border-right: 1px solid grey;
    height: 15px;
    margin-top: 15px;
}
.img-border{
    border-radius: 50%;
}
.img-contents{
    text-align: center;
    margin:20% 0% 0% 50%;
    height:126px;
    margin-top: 25px;
    background: #C4C4C4;
    opacity:0.3;
    display: flex;
    justify-content: center;
    align-items: center;
}
h3{
    margin: 20px;
}
h2{
    color: #03a9f4;
    margin-bottom: 1vh;
    font-size: 17px !important;
}
button{
    margin:7% 0% 0% 10%;
    font-weight: bold;
}
edit-button{
    padding: 10px !important;
    margin: 8px !important;
    font-weight: bold;
}
.header-text{
font-size: 16px !important;
font-style: normal;
font-weight: 400;
line-height: 23px;
letter-spacing: 0px;
text-align: left;
margin:2% 2% 2% 3%;
}
.logo-text{
font-size: 20px !important;
font-style: normal;
font-weight: 400 !important;
text-color: #404040 !important;
}
</style>