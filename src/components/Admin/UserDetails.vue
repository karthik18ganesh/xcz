/* eslint-disable no-debugger */
<template>
 <div style="height:100%" class="BeVietnam">
 <v-container fluid>
   
     <v-row class="blueHead ma-0">
      
         <v-col cols="2" md="3" lg="2" xs="3" class="imgdiv">
 
              
                 <img src="../../assets/round-user.png" alt="companyLogo" height="100px" width="100px"/>
          
         </v-col>
           <v-col cols="2" md="2" lg="2" xs="3" class="subTextDiv">
               <h3 color="primary">
                  {{singleUser.fullName}}
               </h3>
               <h5>  {{singleUser.designation}}</h5>
             
         </v-col>
           <v-col cols="1">
                 <v-divider
                
                vertical
         
                ></v-divider>
         </v-col>
         <v-col cols="2" class="subColomn">
             <h4>Status</h4>
             <h5 style="color:green">Active</h5>
         </v-col>
           
           <v-col cols="2" class="subTextDiv">
           <h4>User Role</h4>
             <h5 style="color:green">Admin / User</h5>
         </v-col>
     </v-row>
  <v-row style="margin-top:1px" >
  <v-card style="min-width:100vw;" >
 

    <v-tabs
      v-model="tab"
      background-color="transparent"
    
      
    >
      <v-tab
       
      >
      <h4 class="headerClassTab"> Personal Item</h4>
      </v-tab>
      <v-tab
       
      >
       <h4 class="headerClassTab">Groups</h4>
       
      </v-tab>
        <v-tab
       
      >
       <h4 class="headerClassTab"> Entities Handling</h4>
      
      </v-tab>
         <v-tab
       
      >
       <h4 class="headerClassTab">Securities</h4>
       
      </v-tab>
        <v-tab
       
      >
             <v-select
        dense
        class="headerClassTab"
        solo
      flat
      style="width:280px !important;font-weight:bold"
      hide-details
        v-model="selectedHistory"
     :items="['Login History','Session History']"
                   
   
  ></v-select>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item  
      
      >
        <v-card
    style="min-width:100vw;"
          flat
        >
          <v-card-text>
            <v-row class="ma-2 pa-2">
              <v-col cols="8">
                <v-row>
                   <v-col cols="12">
             <h2 color="#03a9f4" style="color:#03a9f4;float:left;margin:5px">Personal Info</h2>
  </v-col>
                       <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'First Name is required']"
                    v-model="singleUser.firstName"
                    outlined
                    dense
                    label="First Name"
                    required
                ></v-text-field>
  </v-col>
                  <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'First Name is required']"
                    v-model="singleUser.lastName"
                    outlined
                    dense
                    label="Last Name"
                    required
                ></v-text-field>
  </v-col>
           <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'Fathers Name is required']"
                    v-model="singleUser.fathersName"
                    outlined
                    dense
                    label="Fathers Name"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-1">
       <v-menu
                        v-model="dobpick"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="singleUser.dob"
                           
                            append-icon="mdi-calendar"
                            label="Date of Birth"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'From date is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="singleUser.dob"
                            @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
      <!-- <v-menu
                        v-model="dobpick"
                        :close-on-content-click="false"
                        transition="scale-transition"
                          max-width="290px"
                        min-width="auto"
                        offset-y
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="singleUser.dob"
                            append-icon="mdi-calendar"
                            label="Date of Birth"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'Date of Birth is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="singleUser.dob"
                            @input="dobpick = false"
                        ></v-date-picker>
                    </v-menu> -->
          <!-- <v-menu
                        v-model="dobpick"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                             class="content-font"
                            v-model="singleUser.dob"
                           
                            append-icon="mdi-calendar"
                            label="Date of Birth"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'Date of Birth is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="DOB"
                            @input="dobpick = false"
                        ></v-date-picker>
                    </v-menu> -->
  </v-col>
   
    <v-col cols="3" class="ma-1">
           <v-select
                    v-model="singleUser.gender"
                    :items="['Male','Female']"
                    :rules="[v => !!v || 'Gender is required']"
                   
                    label="Gender"
                   outlined
                    dense
                    required>
                </v-select>
  </v-col>
   <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'Fathers Name is required']"
                    v-model="singleUser.designation"
                    outlined
                    dense
                    label="Designation"
                    required
                ></v-text-field>
  </v-col>

             <v-col cols="12">
             <h2 color="#03a9f4" style="color:#03a9f4;float:left;margin:5px;margin-top:30px;">Address</h2>
  </v-col>
    <v-col cols="3" class="ma-1">
          <v-text-field
                :rules="[v => !!v || 'Floor/Bulding Name ID is required']"
                    v-model="singleUser.address.add1"
                    outlined
                    dense
                    label="Floor/Bulding Name"
                    required
                ></v-text-field>
  </v-col>
     <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'Street is required']"
                    v-model="singleUser.address.add2"
                    outlined
                    dense
                    label="Street/Area"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-1">
         <v-text-field
                :rules="[v => !!v || 'City is required']"
                    v-model="singleUser.address.city"
                    outlined
                    dense
                    label="City"
                    required
                ></v-text-field>
  </v-col>
   <v-col cols="3" class="ma-1 " >
           <v-text-field
              
                    v-model="singleUser.address.zip"
                    outlined
                    dense
                    label="Pin Code"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-1 " >
             <v-select
                    v-model="singleUser.address.state"
                    :items="this.location.getAllStatesFromCountry(singleUser.address.country)"
                    :rules="[v => !!v || 'State is required']"
                    item-text="name"
                    item-value="name"
                    label="State"
                   outlined
                    dense
                    required>
                </v-select>
  </v-col>
    <v-col cols="3" class="ma-1 " >
          <v-select
                    v-model="singleUser.address.country"
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
 
   <v-col cols="12">
             <h2 color="#03a9f4" style="color:#03a9f4;float:left;margin:5px">Contact Info</h2>
  </v-col>
                       <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'First Name is required']"
                    v-model="singleUser.contact.email"
                    outlined
                    dense
                    label="Email"
                    required
                ></v-text-field>
  </v-col>
                  <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'Phone is required']"
                    v-model="singleUser.contact.phone"
                    outlined
                    dense
                    label="Phone"
                    required
                ></v-text-field>
  </v-col>
           <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'Mobile is required']"
                    v-model="singleUser.contact.mobileno"
                    outlined
                    dense
                    label="Mobile"
                    required
                ></v-text-field>
  </v-col>
    
    <v-col cols="12">
          <v-btn
               outlined
               class="ma-2"
                color="intigo"
                style="border-color:#0398DC !important; text-transform:none;float:right"
                 @click="backtoUserList()"
            >
                Cancel
            </v-btn>
      <v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;float:right"
               
                   @click="updateUserInfo()"
            >
                Save
            </v-btn>
           
    </v-col>

 
                </v-row>
              </v-col>
                <v-col cols="2">
                    <v-row>
                <v-col cols="12">
                   <img src="../../assets/sampleDP.png" alt="companyLogo" height="140px" width="120px"/>
                </v-col>
                <v-col cols="12">
                  <p>Upload Photo  <v-icon small color="black" dark>
        mdi-pencil
      </v-icon></p>
                </v-col>
              </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
         <v-tab-item
      
      >
        <v-card
         
          flat
        >
          <v-card-text>
          <v-simple-table style="width:90%">
    <template v-slot:default>
      <thead>
        <tr width="700" class="grey lighten-4">
          <th class="text-left text--primary">
            Name of the group
          </th>
          <th width="700" class="text-left text--primary">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(group,index) in userGroups"
          :key="group.id"
          v-bind:class="{ striped: index%2!=0 }"
        >
          <td  class="text-left" >{{group.name}}</td>
          <td class="text-left">
                 <v-btn
     x-small
     v-if="group.status=='active'"
              icon
              color="green"
            >
              <v-icon>mdi-checkbox-blank-circle</v-icon>
            </v-btn>
              <v-btn
     x-small
     v-if="group.status=='inactive'"
              icon
              color="red"
            >
              <v-icon>mdi-checkbox-blank-circle</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
        </v-card>
      </v-tab-item>
       <v-tab-item
      
      >
        <v-card
         
          flat
        >
          <v-card-text>
          <v-simple-table style="width:90%">
    <template v-slot:default>
      <thead>
        <tr width="200" class="grey lighten-4">
          <th class="text-left text--primary">
           Company Name
          </th>
          <th width="400" class="text-left text--primary">
            Financial Year
          </th>
           <th id="thid" class="text-left text--primary">
            Status
          </th>
           <th  class="text-left text--primary">
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entity,index) in userFinancials"
          :key="entity.company_name"
          v-bind:class="{ striped: index%2!=0 }"
        >
        
          <td  class="text-left" ><h5>{{entity.company_name}}</h5></td>
            <td  class="text-left" > <h5>{{$moment(entity.period_from).format("DD/MM/YYYY")}} -  {{$moment(entity.to).format("DD/MM/YYYY")}}</h5></td>
          <td class="text-left">
               <v-btn
            v-if="entity.status=='transfer'"
      class="ma-2"
      outlined
      small
      
      style="border:1px solid black !important;border-radius:15px;width:120px"
    >
      <v-icon color="blue" left >
       mdi-checkbox-blank-circle
      </v-icon>{{entity.status}}
    </v-btn>
            <v-btn
            v-if="entity.status=='archieve'"
      class="ma-2"
      outlined
      small
      
      style="border:1px solid black !important;border-radius:15px;width:120px"
    >
      <v-icon color="yellow" left >
       mdi-checkbox-blank-circle
      </v-icon>{{entity.status}}
    </v-btn>
                   <v-btn
            v-if="entity.status=='active'"
      class="ma-2"
      outlined
      small
      
      style="border:1px solid black !important;border-radius:15px;width:120px"
    >
      <v-icon color="green" left >
       mdi-checkbox-blank-circle
      </v-icon>{{entity.status}}
    </v-btn>
          </td>
            <td  class="text-left" >
               {{entity.role}}
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
        </v-card>
      </v-tab-item>
       <v-tab-item  
      
      >
        <v-card
    style="min-width:100vw;"
          flat
        >
          <v-card-text>
            <v-row class="ma-2 pa-2">
                 <v-form ref="changePasswordForm" style="width:100%">
              <v-col cols="8">
                <v-row>
                 
                   <v-col cols="12">
             <h2  style="float:left;margin-bottom:25px">Reset Password</h2>
  </v-col>
                       <v-col cols="2" class="ma-1">
        <h4 style="float:left">New Password</h4>
  </v-col>
                  <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'Enter new Password']"
                    v-model="passWordObject.password"
                    outlined
                    dense
                      :append-icon="showPassword.userPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="() => (showPassword.userPassword = !showPassword.userPassword)"
    :type="showPassword.userPassword ? 'password' : 'text'"
                    required
                ></v-text-field>
  </v-col>
                </v-row>
                     <v-row>
          
                       <v-col cols="2" class="ma-1">
        <h4 style="float:left">Confirm Password</h4>
  </v-col>
                  <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="confirmPasswordRules"
                    v-model="passWordObject.confirmPassword"
                    outlined
                     :append-icon="showPassword.confirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="() => (showPassword.confirmPassword = !showPassword.confirmPassword)"
    :type="showPassword.confirmPassword ? 'password' : 'text'"
                    dense
                   
                    required
                ></v-text-field>
  </v-col>
                </v-row>
                      <v-row>
        
                       <v-col cols="2" class="ma-1">
        <h4 style="float:left">Admin Password</h4>
  </v-col>
                  <v-col cols="3" class="ma-1">
           <v-text-field
                :rules="[v => !!v || 'Provide Password For Admin']"
                    v-model="passWordObject.adminPassword"
                    outlined
                    dense
                     :append-icon="showPassword.adminPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="() => (showPassword.adminPassword = !showPassword.adminPassword)"
    :type="showPassword.adminPassword ? 'password' : 'text'"
                   
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="12">
       <v-checkbox
      v-model="passWordObject.forcePasswordChange"
      label="Force user to change password on first login"
      
    ></v-checkbox>
    </v-col>
       <v-col cols="12">
       <v-checkbox
      v-model="passWordObject.forceSignOut"
      label="Sign out from all devices"
      
    ></v-checkbox>
    </v-col>
    <v-col cols="12">
            <v-btn
                class="ma-2 button-font"
                color="primary"
               style="float:left"
               @click="changeUserPassword"
            >
                Done
            </v-btn>
    </v-col>
        
                </v-row>
                <v-row>

   
 
  

          
   
   


  
 
   
        
          
         
 
                </v-row>
              </v-col>
              </v-form>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
   <v-tab-item
      
      >
        <v-card
        v-if="selectedHistory=='Session History'"
         
          flat
        >
          <v-card-text>
            <v-row class="ma-1 pa-1">
              <v-col cols="12">
                <h4 style="float:left">Session History</h4>
               
              </v-col>
                <v-col cols="12">
               <h6 style="float:left">Session history of last 30 days are listed below</h6>
              </v-col>
            </v-row>
            <!-- final sec -->
          <v-simple-table class="tbClass" style="width:100%">
    <template v-slot:default>
      <thead>
        <tr width="200" class="grey lighten-4">
          <th class="text-left text--primary">
           IP address
          </th>
          <th width="400" class="text-left text--primary">
            Session Start Time
          </th>
           <th width="400" class="text-left text--primary">
           
          </th>
         
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entity,index) in sessionArray"
          :key="index"
         
        >
        
          <td  class="text-left" >{{entity.ipAddress}}</td>
            <td  class="text-left" >{{entity.sessionStart}}</td>
          <td class="text-left">
               <v-btn
            
     icon
      small
      
     
    >
      <v-icon color="grey" left >
       mdi-delete
      </v-icon>
    </v-btn>
         
            
          </td>
            <td  class="text-left" >
               {{entity.role}}
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
        </v-card>
         <v-card
        v-if="selectedHistory=='Login History'"
         
          flat
        >
          <v-card-text>
            <v-row class="ma-1 pa-1">
              <v-col cols="12">
                <h4 style="float:left">Session History</h4>
               
              </v-col>
                <v-col cols="12">
               <h6 style="float:left">Session history of last 30 days are listed below</h6>
              </v-col>
            </v-row>
            <!-- final sec -->
          <v-simple-table style="width:90%" class="tbClass">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left text--primary">
           IP address 
          </th>
          <th width="400" class="text-left text--primary">
            Login Time
          </th>
           <th width="400" class="text-left text--primary">
           Logout Time
          </th>
           <th width="400" class="text-left text--primary">
           Duration
          </th>
               <th width="400" class="text-left text--primary">
           Browser
          </th>
         
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in loginArray"
          :key="index"
         
        >
        
          <td  class="text-left" >{{item.ipAddress}}</td>
            <td  class="text-left" >{{item.loginStart}}</td>
          <td class="text-left">
           
         {{item.loginEnd}}
            
          </td>
            <td  class="text-left" >
               {{item.duration}}
            </td>
             <td  class="text-left" >
               {{item.browser}}
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>

   <v-snackbar
      v-model="snackbar.active"
      :timeout="2000"
       absolute
      bottom
      :color="snackbar.type=='success'?'success':'error'"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar.active = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
        userGroups:[],
        userFinancials:[],
        showPassword:{userPassword:true,adminPassword:true,confirmPassword:true},
              confirmPasswordRules: [
        (value) => !!value || 'Please confirm password',
        (value) =>
          value === this.passWordObject.password || 'The password confirmation does not match.',
      ],
        snackbar:{text:"test",active:false,type:'success'},
        passWordObject:{},
        selectedHistory:'Session History',
        dobpick:false,
        groupsArray:[{groupName:'Group 1',status:'active'},
        
        {groupName:'Group 2',status:'inactive'},{groupName:'Group 3',status:'inactive'}],
         entitiesArray:[{companyName:'Shashipal Industries',financialYear:'2020-2021',status:'active',role:'Executive'},
        {companyName:'MTL Industries',financialYear:'2020-2021',status:'archieve',role:'Executive'},
        {companyName:'Falcon Paints',financialYear:'2021-2022',status:'transfer',role:'Executive'}],
        sessionArray:[{ipAddress:'60.02.15.58',sessionStart:'14-07-2021 3.23:45'},
        {ipAddress:'192.05.25.12',sessionStart:'14-07-2021 3.23:45'},
       {ipAddress:'192.05.25.12',sessionStart:'14-07-2021 3.23:45'}],
        loginArray:[{ipAddress:'60.02.15.58',loginStart:'14-07-2021 3.23:45',loginEnd:'14-07-2021 3.23:45',duration:'20 mins',browser:'Chrome'},
       {ipAddress:'60.02.15.58',loginStart:'14-07-2021 3.13:45',loginEnd:'18-07-2021 3.29:45',duration:'40 mins',browser:'IE'},
      ],
         tab: null,
         singleUser:{},
         items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    
      }
    },
    async mounted(){
           this.userDetails = JSON.parse(sessionStorage.getItem("userData"));

      this.singleUser=this.$route.params.selectedUser;
      if(this.$route.params.selectedUser.address==null){
this.singleUser.address={};
      }
       if(this.$route.params.selectedUser.contact==null){
this.singleUser.contact={};
      }
      if(this.singleUser.dob!=null){
 this.singleUser.dob=this.$moment(this.singleUser.dob).format('YYYY-MM-DD');
      }
      this.singleUser.fullName=this.singleUser.firstName + " " +this.singleUser.lastName;
      this.getUserFinancial();
      this.getUserGroups();
      console.log(this.singleUser,"user")
console.log("mt")
    },
    methods:{
      async changeUserPassword(){
        if(!this.$refs.changePasswordForm.validate()){
          return;
        }
     
              try{      
                let updateObject={} ;
                   updateObject.adminID=this.userDetails.id;
                   updateObject.adminPassword=this.passWordObject.adminPassword;
                   updateObject.password=this.passWordObject.password;
                   updateObject.usedId=this.singleUser.id;
                    var res = await this.$apiService.post('/user/changePasswordbyadmin',updateObject);
                    if(res&&res.status === 200) {
                      if(res.data.result.success){
                          this.snackbar.text=res.data.result.message;
                           this.snackbar.type="success";
                      this.snackbar.active=true;
                      this.$refs.changePasswordForm.reset();
                      }
                      else{
                                                  this.snackbar.text=res.data.result.message;
                           this.snackbar.type="error";
                      this.snackbar.active=true;

                      }
                      
                    
                      // this.$store.commit("setUserData",res.data.userData[0]);
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
                
                
//this.userDetails.usedId
      },
      async getUserFinancial(){
try{          
  let updateObject={};
updateObject.userId=this.singleUser.id;




            var res = await this.$apiService.post('/user/getusersFinancial',updateObject);
            if(res&&res.status === 200) {
              // eslint-disable-next-line no-debugger
              debugger
            this.userFinancials=res.data.result;
             this.userFinancials=this.userFinancials.map(item => ({...item,companyName:item.company_name}));

             console.log( this.userFinancials,"userFinancials")
            
}
                 
            
        }
        catch(error) {
            console.log(error,"erro")
          //this.showError("The provided email id or employee id is wrong");
           }
      
      },
            async getUserGroups(){
try{          
  let updateObject={};
updateObject.userId=this.singleUser.id;




            var res = await this.$apiService.post('/user/getusersgroup',updateObject);
            if(res&&res.status === 200) {
              // eslint-disable-next-line no-debugger
              debugger
            this.userGroups=res.data.result;
            // this.userGroups=this.userGroups.map(item => ({...item,companyName:item.company_name}));

             console.log( this.userGroups,"userGroups")
            
}
                 
            
        }
        catch(error) {
            console.log(error,"erro")
          //this.showError("The provided email id or employee id is wrong");
           }
      
      },
      async updateUserInfo(){
try{          
  let updateObject={};
  if(this.singleUser.dob!=null){
updateObject.dob=this.singleUser.dob;
  }
  updateObject.address=this.singleUser.address;
   updateObject.contact=this.singleUser.contact;
   updateObject.designation=this.singleUser.designation;
 updateObject.firstName=this.singleUser.firstName;
  updateObject.lastName=this.singleUser.lastName;
   updateObject.fathersName=this.singleUser.fathersName;

    updateObject.gender=this.singleUser.gender;
     updateObject.id=this.singleUser.id;
      updateObject.userName=this.singleUser.username;



            var res = await this.$apiService.post('/user/update',updateObject);
            if(res&&res.status === 200) {
                this.snackbar.text="User Updated Successfully";
                      this.snackbar.active=true;
               this.fetchUserList();
              console.log(res.data,"updateResponse")

             
            
}
                 
            
        }
        catch(error) {
            console.log(error,"erro")
          //this.showError("The provided email id or employee id is wrong");
           }
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      }
    },
  }
</script>

<style scoped>
>>>.v-application .grey.lighten-4 {
  border-bottom: 10px solid rgba(0,0,0,0.12) !important; }
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
.blueTableHead{
  border:2px solid #03A9F4  ;
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
.headerClassTab{
  text-transform:none;
  padding: 10px;
}
.v-data-table-header{
  font-family:Be Vietnam;
}
.BeVietnam{
    font-family: Be Vietnam !important;
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
.striped{
  background-color: #fafafa
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
.fixed {
  position: fixed;
  width: 100%;
  overflow: hidden;
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
.tbClass.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:first-child>th {
  border-top:2px solid #03A9F4;
  border-bottom:2px solid #03A9F4;
  background:white;
}
</style>