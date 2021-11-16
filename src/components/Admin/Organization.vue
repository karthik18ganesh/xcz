<template>
 <div style="height:100%" class="beVitnam">
 <v-container fluid>
    
  <v-row style="margin-left: 40px;">
  <v-col cols="12" style="height: 70px;">
<span style="display:flex;margin:15px 0px;">
    <button class="btn-edit"  style="margin:1% 1% 3% 1%;margin-left: 0px;margin-bottom: 10px;display: flex;align-items: center;font-size: 14px;color: #b3b2b2;"> <v-icon style="font-size:25px !important;color: #b3b2b2;margin-right:5px"> mdi-pencil-circle</v-icon> Edit Info</button>
</span>
  </v-col>

   <v-col cols="12" style="margin-bottom: 8px;">
      <h2 color="#03a9f4" style="color:#03a9f4;float:left;margin-left:0px;font-size: 17px !important;font-weight: 500;">Pofile</h2>
  </v-col>
  <v-col cols="8">
      <v-row class="ma-1" style="margin-bottom: 13px !important;margin-left: 0px !important;">
            <v-col cols="6" class="ma-1" style="margin-left: 0px !important;">
           <v-text-field hide-details
                :rules="[v => !!v || 'Enterprise Name is required']"
                    v-model="organizationDetails.organizationName"
                    outlined
                    dense
                    label="Enterprise Name"
                    required
                ></v-text-field>
  </v-col>
      </v-row>
        <v-row class="ma-1" style="margin-bottom: 13px !important;margin-left: 0px !important;">
            <v-col cols="3" class="ma-1" style="margin-left: 0px !important;">
           <v-text-field hide-details
                :rules="[v => !!v || 'Subtitle is required']"
                    v-model="organizationDetails.subtitle"
                    outlined
                    dense
                    label="Subtitle"
                    required
                ></v-text-field>
  </v-col>
      <v-col cols="3" class="ma-1">
           <v-text-field hide-details
                :rules="[v => !!v || 'Organization ID is required']"
                    v-model="organizationDetails.displayId"
                    outlined
                    dense
                    label="Organization ID"
                    required
                ></v-text-field>
  </v-col>
        </v-row>
  </v-col>
   <v-col cols="4" style="justify-content: flex-end;display: flex;">
        
                    <img src="../../assets/profile-icon.png" height="150" width="150" style="margin-top: -42px;margin-right: 100px;"/>
  </v-col>
 

  </v-row>
  <v-row style="margin-left: 40px;">
<v-col cols="12" style="margin-bottom: 8px;">
      <h2 color="#03a9f4" style="color:#03a9f4;float:left;margin-left:0px;font-size: 17px !important;font-weight: 500;">Address</h2>
  </v-col>
    <v-col cols="3" class="ma-2 " style="margin-bottom: 13px !important;margin-left: 0px !important;">
           <v-text-field hide-details
                :rules="[v => !!v || 'Floor/Bulding Name ID is required']"
                    v-model="organizationDetails.add1"
                    outlined
                    dense
                    label="Floor/Bulding Name"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " >
           <v-text-field hide-details
                :rules="[v => !!v || 'Street is required']"
                    v-model="organizationDetails.add2"
                    outlined
                    dense
                    label="Street/Area"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " >
           <v-text-field hide-details
                :rules="[v => !!v || 'City is required']"
                    v-model="organizationDetails.city"
                    outlined
                    dense
                    label="City"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " style="margin-bottom: 13px !important;margin-left: 0px !important;">
           <v-text-field hide-details
                :rules="[v => !!v || 'Organization ID is required']"
                    v-model="organizationDetails.pin"
                    outlined
                    dense
                    label="Pin Code"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " >
             <v-select hide-details
                    v-model="organizationDetails.state"
                    :items="this.location.getAllStatesFromCountry(organizationDetails.country)"
                    :rules="[v => !!v || 'State is required']"
                    item-text="name"
                    item-value="name"
                    label="State"
                   outlined
                    dense
                    required>
                </v-select>
  </v-col>
    <v-col cols="3" class="ma-2 " >
          <v-select hide-details
                    v-model="organizationDetails.country"
                    :items="this.location.getAllCountries()"
                    :rules="[v => !!v || 'Country is required']"
                    item-text="name"
                    item-value="name"
                    label="Country"
                    value="India"
                   outlined
                    dense
                    required>
                </v-select>
  </v-col>
    <v-col cols="3" class="ma-2 " style="margin-bottom: 13px !important;margin-left: 0px !important;">
           <v-text-field hide-details
                :rules="[v => !!v || 'PAN ID is required']"
                    v-model="organizationDetails.pan"
                    outlined
                    dense
                    label="PAN"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " >
           <v-text-field hide-details
                :rules="[v => !!v || 'GSTIN is required']"
                    v-model="organizationDetails.gstin"
                    outlined
                    dense
                    label="GSTIN"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " >
           <v-text-field hide-details
                
                    v-model="organizationDetails.cin"
                    outlined
                    dense
                    label="CIN Or Reg No"
                    required
                ></v-text-field>
  </v-col>
  <v-col cols="12" style="margin-bottom: 8px;">
      <h2 color="#03a9f4" style="color:#03a9f4;float:left;margin-left:0px;font-size: 17px !important;font-weight: 500;">Conatct Info</h2>
  </v-col>
  </v-row>
   <v-row style="margin-left: 40px;"  v-for="(data,index) in contactArray" :key="index" >
       <v-col cols="3" class="ma-2" style="margin-bottom: 13px !important;margin-left: 0px !important;">
           <v-text-field hide-details
               
                    v-model="data.name"
                    outlined
                    dense
                    label="Name"
                    required
                ></v-text-field>
                  
  </v-col>
     <v-col cols="3" class="ma-2 " >
           <v-text-field hide-details
            
                    v-model="data.email"
                    outlined
                    dense
                    label="Email"
                    required
                ></v-text-field>
                  
  </v-col>
      <v-col cols="3" class="ma-2 " >
           <v-text-field hide-details
                :rules="[v => !!v || 'Phone is required']"
                    v-model="data.phone"
                    outlined
                    dense
                    label="Phone"
                    required
                ></v-text-field>
                  
  </v-col>
  <v-col cols="1" v-if="index==0" style="display: flex;align-items: center;height: 55px;">
   <v-btn
                            class="mx-2"
                            fab
                            color="#03a9f4"
                            x-small
                            @click="addContact"
                            style="color:white;background-color: #0398DC !important;border-color:#0398DC !important;"
                        >
                            <v-icon small>mdi-plus</v-icon>
                        </v-btn>
  </v-col>
    <v-col cols="1" v-else style="display: flex;align-items: center;height: 55px;">
   <v-btn
                            class="mx-2"
                            fab
                            color="#03a9f4"
                            x-small
                            @click="deleteFromConact(index)"
                            style="color:white;background-color: #0398DC !important;border-color:#0398DC !important;"
                        >
                            <v-icon small>far fa-trash-alt</v-icon>
                        </v-btn>
  </v-col>
  </v-row>
  <v-row style="margin-left: 40px;">
      <v-col cols="12">
           <div class="btn-align" style="float:right">
            <v-btn
                class="ma-2"
                color="#03a9f4"
                @click="saveOrganization"
                style="color:white;background-color: #0398DC !important;border-color:#0398DC !important;"
            >
                Save
            </v-btn>
            <v-btn
                class="ma-2"
                outlined
                color="#0398DC"
                style="border-color:#0398DC !important;"
            >
                Continue
            </v-btn>
        </div>
      </v-col>
  </v-row>
    

      </v-container>
      
 </div>
</template>

<script>

 export default {
   components: {
                    // eslint-disable-line
  },
    data () {
      return {
          contactArray:[{name:"",email:"",phone:""}],
          processItems:[{title:'Profile',color:'green',percentage:20},
          {title:'Contact Information',color:'red',percentage:25},
          {title:'Personal Information',color:'red--text',percentage:20},
          {title:'Tax Information',color:'red',percentage:20},
          {title:'Completed',color:'orange',
          percentage:20}],
          organizationDetails:{name:"",subtitle:"",country:"India",organizationName:''}
    
      }
    },
    async mounted(){
      this.userDetails = JSON.parse(sessionStorage.getItem("userData"));
      if(this.userDetails!=null){
       this.mapToFields();
        
       
      }
console.log("mt",this.userDetails,this.organizationDetails)
    },
    methods:{
      deleteFromConact(index){
      
        this.contactArray.splice(index, 1);

      },
      mapToFields(){
 this.organizationDetails.organizationName=this.userDetails.organizationname!=null?this.userDetails.organizationname:'';
        this.organizationDetails.gstin=this.userDetails.gstin!=null?this.userDetails.gstin:'';
         this.organizationDetails.add1=this.userDetails.add1!=null?this.userDetails.add1:'';
         this.organizationDetails.add2=this.userDetails.add2!=null?this.userDetails.add2:'';
         if(this.userDetails.contactDetails!=null){
            this.contactArray=this.userDetails.contactDetails
         }
         if(this.userDetails.displayid==null){
           this.organizationDetails.displayId=this.userDetails.id;
         }
         else{
           this.organizationDetails.displayId=this.userDetails.displayid;
         }
        
         
         
         this.organizationDetails.id=this.userDetails.organaizationid!=null?this.userDetails.organaizationid:'';
          this.organizationDetails.city=this.userDetails.city!=null?this.userDetails.city:'';
           this.organizationDetails.subtitle=this.userDetails.subtitle!=null?this.userDetails.subtitle:'';
            this.organizationDetails.gstin=this.userDetails.gstin!=null?this.userDetails.gstin:'';
               this.organizationDetails.pan=this.userDetails.pan!=null?this.userDetails.pan:'';
        this.organizationDetails.pin=this.userDetails.pin!=null?this.userDetails.pin:'';
        this.organizationDetails.state=this.userDetails.state!=null?this.userDetails.state:'';
          this.organizationDetails.country=this.userDetails.country!=null?this.userDetails.country:'';
           this.organizationDetails.cin=this.userDetails.cin!=null?this.userDetails.cin:'';

      },
      async saveOrganization(){
try{          
  let updateObject={};
  if(this.organizationDetails.add1!=null){
updateObject.add1=this.organizationDetails.add1;
  }
   if(this.organizationDetails.id!=null){
updateObject.id=this.organizationDetails.id;
  }
    if(this.organizationDetails.add2!=null){
updateObject.add2=this.organizationDetails.add2;
  }
      if(this.organizationDetails.organizationName!=null){
updateObject.name=this.organizationDetails.organizationName;
  }
      if(this.organizationDetails.city!=null){
updateObject.city=this.organizationDetails.city;
  }
     if(this.organizationDetails.subtitle!=null){
updateObject.subtitle=this.organizationDetails.subtitle;
  }
  updateObject.gstin=this.organizationDetails.gstin;
    updateObject.displayId=this.organizationDetails.displayId;
  updateObject.zip=this.organizationDetails.pin;
   updateObject.pan=this.organizationDetails.pan;
    updateObject.state=this.organizationDetails.state;
     updateObject.country=this.organizationDetails.country;
      updateObject.cin=this.organizationDetails.cin;
updateObject.contact=this.contactArray;



            var res = await this.$apiService.post('/cafirm/update',updateObject);
            if(res&&res.status === 200) {
              await this.fetchUserDetails();
               this.mapToFields();
              console.log(res.data,"updateResponse")
              // this.$store.commit("setUserData",res.data.userData[0]);
// console.log(res.data.userData[0],"setUserData",this.userDetails)
               // this.$store.commit("setMasterData" , res.data.data); 
             
            
}
                 
            
        }
        catch(error) {
            console.log(error,"erro")
          //this.showError("The provided email id or employee id is wrong");
           }
      },
        addContact(){
            this.contactArray.push({name:"",email:"",phone:""});
        }
      
    },
  }
</script>

<style scoped>
* {
  font-size: 14px !important;
}
/deep/.v-input input {
    font-size: 13px !important;
    color: #323232de !important;
}
/deep/.v-text-field--outlined.v-input--dense .v-label {
    font-size: 14px !important;
}

/deep/.v-select__selections{
  font-size: 13px !important;
  color: #323232de !important;
}
.imgdiv{
    min-width: 150px;
    margin-right:5px;
}
.data-card{
 margin-top:2em;
  width:13em;
  border-radius:5px !important;
  height:12em;
  border-left:8px solid #03A9F4 !important; 
}
.col-data{
  display:flex;
  justify-content:center;
}
.img-icon{
  height:1.5em;
  width:1.5em;
  margin:1em 1.5em 0em 0.5em;
}
.icon-col{
  display:flex;
  justify-content:flex-end;
  margin-bottom:0em;
}

.img-logo{
  margin-bottom:0.5em;
}

.table-heading{
  color: #03A9F4;
}
.tab-div{
  margin-top:1em;
}
.icon-view{
  margin:0.5em;
  border:none !important;
  background:#F5F5F5 !important;
}
.search-tools{
    justify-content: right;
    text-align: right;    
}
.toolbar{
    display: inline-block;
    margin: 2em 2em 1em 0em;
    padding: 0px;
    width:20em;
    color:#DEDEDE;
}
.v-data-table-header{
  font-family:Be Vietnam;
}
.text-start{
  font-size:17px !important;
}
.company-popup{
    margin-top:9%;
    width: auto;
    background: white;
    border-radius: 5px;
    text-align: center;
}
.blueHead{

  margin-bottom: 10px;
border-bottom:4px solid #03A9F4;
padding-bottom:10px;
}
.date-head{
text-align:left;
  font-size: 17px !important;
  font-family: Be Vietnam;
font-style: normal;
font-weight: 600;
color:#686868;
}
button,input{
  border-style:none !important;
}
.col{
  padding:0px !important;
}
.v-application .blue{
  background:none !important;
}

.optiondiv{
  margin-top:4em;
  margin-right:6%;
}
.optioncard{
  margin:10% 8.5% 5% 0%;
  height:7em;
  width:72%;
  display:flex;
  justify-content:center;
  align-items:center;
  border: 1.5px solid #03A9F4;
}
.card-text{
  font-family: Be Vietnam;
font-size: 20px !important;
font-style: normal;
font-weight: 600;
}
.master-cards{
  font-family: Be Vietnam;
font-size: 20px !important;
font-style: normal;
font-weight: 400;
color:#393939;
}
.beVitnam{
    font-family: Be Vietnam;
}
.icon-align{
  display:flex !important;
  justify-content:flex-end !important;
  padding:2%;
}
.major-card{
  font-family: Be Vietnam;
font-size: 24px !important;
font-style: normal;
font-weight: 500;
color:#03A9F4 !important;
}
.table-header{
font-family: Be Vietnam;
font-size: 16px !important;
font-style: normal;
font-weight: 600;
color:#686868 !important;
}
.table-row{
font-family: Be Vietnam;
font-size: 16px !important;
font-style: normal;
font-weight: 600;
color:#03A9F4 !important;
}
.bottom-col{
  width:50%;
  margin:0% 1% 3% 4%;
  text-align:left;
}
.subTextDiv{
    min-width:220px;
    margin-top:20px;
    margin-right: 15px;
}
.subColomn{
    min-width:220px;
     margin-top:20px;
}
</style>