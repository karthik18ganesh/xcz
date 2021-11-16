<template>
 <div style="height:100%">
   <v-snackbar
      v-model="snackbar.active"
      :timeout="2000"
      
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
 <v-container fluid>
     <v-row class="blueHead ma-0">
      <div class="text-center">
    <v-dialog
    content-class="my-custom-dialog"
      v-model="showFinanicialDialgogue"
      width="550"
      height="700"
      transition="dialog-bottom-transition"
    >
   

      <v-card>
      
        <v-card-title class="blueHead" >
          <h4 class="major-card">Add Financial</h4>
        </v-card-title>

        <v-card-text>
            <v-row>
                <v-form ref="addFinancialForm">
          <v-col cols="12">
            <!-- input fields section -->
           <v-row class="ma-1 pa-1">
             <v-col cols="5" style="margin-right:5px"  >
                        <v-menu
                        v-model="datpickerMenu.menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="finanicialObject.fromDate"
                           
                            append-icon="mdi-calendar"
                            label="Financial Year From"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'From date is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="finanicialObject.fromDate"
                            @input="datpickerMenu.menu1 = false"
                        ></v-date-picker>
                    </v-menu>
             </v-col>
              <v-col cols="6" >
                       <v-menu
                        v-model="datpickerMenu.menu2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="finanicialObject.toDate"
                           
                            append-icon="mdi-calendar"
                            label="Financial Year to"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'To date is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="finanicialObject.toDate"
                            @input="datpickerMenu.menu2 = false"
                        ></v-date-picker>
                    </v-menu>
             </v-col>
              <v-col cols="5" style="margin-right:5px"  >
                        <v-menu
                        v-model="datpickerMenu.menu3"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="finanicialObject.dueDate"
                           
                            append-icon="mdi-calendar"
                            label="Due Date"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'date is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="finanicialObject.dueDate"
                            @input="datpickerMenu.menu3 = false"
                        ></v-date-picker>
                    </v-menu>
             </v-col>
              <v-col cols="6" >
                      <v-select
                      multiple
                      v-model=" finanicialObject.userList"
                     return-object
                      :items="groupAndUsers"
                          item-text="name"
                    item-value="id"
                       dense outlined label="User/Group">
                     </v-select>
             </v-col>
                <v-col cols="5" class="ma-0" >
                       <v-select
                       :items="priorityItems"
                         item-text="name"
                    item-value="id"
                        v-model="finanicialObject.priority"
                        dense outlined label="Priority">
                     </v-select>
             </v-col>
              <v-col cols="6" >
                     
             </v-col>
                
                
                
               
           </v-row>
          </v-col>
          
                </v-form>
        </v-row>
         
        </v-card-text>

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row class="pa-3">
       
            <v-col cols="12" class="ma-2 pa-2" >
                <v-btn
               @click="saveNewFinancial"
                style="float:left;width:100px;margin-top:-30px"
                color="primary"
               
            >
                Add 
            </v-btn>
            <v-btn
            outlined
            @click="closeFinancialForm"
              style="width:100px;float:left;margin-left:10px;margin-top:-30px;border:2px solid #03A9F4 !important"  
               
                
               
            >
                Cancel
            </v-btn>
            </v-col>
        
          </v-row>
     
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- Invite Popup -->
   <div >
    <v-dialog
    content-class="invite-Dialogue"
      v-model="showInviteDialog"
      width="500"
    
      transition="dialog-bottom-transition"
    >
   

      <v-card>
      
        <v-card-title class="theUsualHead" >
          Invite User

        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="ma-1 pa-1">
              <p style="float:left">Invite users for the betterment of experience of sheshi</p>
            </v-col>
          </v-row>
            <v-row>
          <v-col cols="12">
           
               <v-autocomplete
            v-model="selectedInviteList"
            :items="availableEmails"
        flat 
        solo
            class="dotted"
            style="height:200px !important;margin:10px;"
            dense
            chips
            small-chips
         
            multiple
          ></v-autocomplete>
             </v-col>
           </v-row>
        </v-card-text>
         
         
       
     

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row class="ma-1 pa-1">
           
              <v-col cols="12">
        
            </v-col>
            <v-col cols="12">
                <v-btn
               
                style="float:left;width:100px;"
                color="primary"
               
            >
                Send
            </v-btn>
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
   <div >
    <v-dialog
    content-class="invite-Dialogue"
      v-model="showImportDialog"
      width="500"
    
      transition="dialog-bottom-transition"
    >
   

      <v-card>
      
        <v-card-title class="theUsualHead" >
         Import
 <v-btn
 style="float:right !important;margin-left:220px !important;"
     
      color="primary"
      class="ma-6 white--tex2"
    
    >
      Template
      <v-icon
        right
        dark
      >
        mdi-cloud-download
      </v-icon>
    </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="ma-1 pa-1">
              <p style="float:left">Download template  for the easiness of availabaility of template. 
                Upload it back filling up all the details</p>
            </v-col>
          </v-row>
            <v-row>
          <v-col cols="12">
            <div v-if="!file">
    <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
      <div class="dropZone-info" @drag="onChange">
        <span class="fa fa-cloud-upload dropZone-title"></span>
        <span class="dropZone-title">Drop file or click to upload</span>
        <div class="dropZone-upload-limit-info">
          <div>extension support: csv,xlsx</div>
          <div>maximum file size: 5 MB</div>
        </div>
      </div>
      <input type="file" @change="onChange">
    </div>
  </div>
  <div v-else class="dropZone-uploaded">
    <div class="dropZone-uploaded-info">
      <span class="dropZone-title">Uploaded</span>
      <button type="button" class="btn btn-primary removeFile" @click="removeFile">Remove File</button>
    </div>
  </div>
 
          
             </v-col>
           </v-row>
        </v-card-text>
         
         
       
     

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row class="ma-1 pa-1">
           
              <v-col cols="12">
        
            </v-col>
            <v-col cols="12">
              
                <v-btn
               class="ma-2 pa-2"
                style="float:right;width:100px;"
                outlined
      color="#03A9F4"
                @click="showImportDialog=!showImportDialog"
               
            >
                Cancel
            </v-btn>
                <v-btn
                
                class="ma-2 pa-2"
                style="float:right;width:100px;"
                color="primary"
               
            >
                Import
            </v-btn>
             
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
         <v-vol cols="3" md="3" lg="3" xs="3" class="imgdiv">
 
              
                 <img src="../../assets/profile-icon.png" alt="companyLogo" height="100px" width="100px"/>
          
         </v-vol>
           <v-vol cols="3" md="3" lg="3" xs="3" class="subTextDiv">
               <h3 color="primary">
                   {{singleEntity.name}}
               </h3>
               <h5>www.assampvtltd.com</h5>
             
         </v-vol>
           <v-vol cols="1">
                 <v-divider
                
                vertical
         
                ></v-divider>
         </v-vol>
         <v-vol cols="3" class="subColomn">
             <h5>Type</h5>
             <h5>{{singleEntity.typeofcompany}}</h5>
         </v-vol>
            <v-vol cols="1">
                 <v-divider
                
                vertical
         
                ></v-divider>
         </v-vol>
           <v-vol cols="3" class="subTextDiv">
           <button large class="buttonPro-font ma-2 pa-2" @click="addProprietor()">
                <v-icon>mdi-briefcase-download-outline</v-icon>
                   
            </button>
              <button large class="buttonPro-font ma-2 pa-2" @click="addProprietor()">
                <v-icon>mdi-lock</v-icon>
                   
            </button>
              <button large class="buttonPro-font ma-2 pa-2" @click="addProprietor()">
                <v-icon>mdi-share</v-icon>
                   
            </button>
         </v-vol>
     </v-row>
     <v-row v-if="!showEntityPage">
       <v-col cols="12" class="d-flex flex-row mb-4">
         <p>From this page you can add users, Edit users, assign groups, change password etc</p>
       </v-col>
      <v-col cols="9" class="d-flex flex-row">
    <button class="buttonPro-font" @click="showAddUserPopUp">
                <v-icon>mdi-plus</v-icon>
                    Add Financial
            </button>
            
             <v-divider
      class="mx-4"
      vertical
    ></v-divider>
     <button  v-bind:class="{ undeline: selectedSubTab=='list' }" class="buttonPro-font" @click="selectOption('list')">
                <v-icon>mdi-format-line-weight</v-icon>
                     Financial List
            </button>
            
             <v-divider
      class="mx-4"
      vertical
    ></v-divider>
       
      
             <button class="buttonPro-font" @click="addProprietor()">
                <v-icon>mdi-format-vertical-align-top</v-icon>
                    Export
            </button>
             <v-divider
      class="mx-4"
      vertical
    ></v-divider>
       <button  v-bind:class="{ undeline: selectedSubTab=='archieved' }" class="buttonPro-font" @click="selectOption('archieved')">
                <v-icon>mdi-archive-outline</v-icon>
                    Archieves
            </button>
             <v-divider
      class="mx-4"
      vertical
    ></v-divider>
       <button v-bind:class="{ undeline: selectedSubTab=='locked' }" class="buttonPro-font" @click="selectOption('locked')">
                <v-icon>mdi-lock-outline</v-icon>
                    Locked
            </button>
             <v-divider
      class="mx-4"
      vertical
    ></v-divider>
             <button v-bind:class="{ undeline: selectedSubTab=='transfer' }" class="buttonPro-font" @click="selectOption('transfer')">
                <v-icon>mdi-share</v-icon>
                    Transfer
            </button>
             <v-divider
      class="mx-4"
      vertical
    ></v-divider>
             <button class="buttonPro-font" v-bind:class="{ undeline: selectedSubTab=='trash' }"  @click="selectOption('trash')">
                <v-icon>mdi-delete-outline</v-icon>
                    Trash
            </button>
              
      </v-col>
      <v-col cols="3">
         <v-text-field
         v-if="!showEntityInfo"
               
                    v-model="userSearchWord"
                    outlined
                    dense
                    label="Search Entry here "
                    append-icon="mdi-magnify"
                    required
                ></v-text-field>
                  <v-btn
               v-if="showEntityInfo"
                style="float:right;width:140px;margin-right:50px"
                color="primary"
                @click="showEntityPage=!showEntityPage"
               
            >
                Entity Info
            </v-btn>
      </v-col>
       
        
       <v-col cols="12">
        <v-data-table
        show-select
            :items="filteredFinancialDetails"
            :headers="entityHeaders"
            @click:row="userRowClick"
            class="elevation-1"
         
        >
             <template v-slot:item.status="{ item }">
  
     <v-btn
     x-small
     v-if="item.status=='complete'"
              icon
              color="green"
            >
              <v-icon>mdi-checkbox-blank-circle</v-icon>
            </v-btn>
               <v-btn
     x-small
     v-if="item.status=='overdue'"
              icon
              color="red"
            >
              <v-icon>mdi-checkbox-blank-circle</v-icon>
            </v-btn>
                 <v-btn
     x-small
     v-if="item.status=='pending'"
              icon
              color="yellow"
            >
              <v-icon>mdi-checkbox-blank-circle</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.locked="{ item }">
  
     <v-btn
     x-small
     @click.stop="checkLocked(item)"
              icon
              color="grey"
            >
              <v-icon>mdi-lock-outline</v-icon>
            </v-btn>
          </template>
            <template v-slot:item.due_date="{ item }">
  
    <h5>{{$moment(item.due_date).format("DD/MM/YYYY")}}</h5>
          </template>
           <template v-slot:item.restore="{ item }">
  
     <v-btn
     x-small
    @click="checkDeletion(item)"
              icon
              color="grey"
            >
              <v-icon>mdi-restore</v-icon>
            </v-btn>
          </template>
             <template v-slot:item.archieved="{ item }">
  
     <v-btn
     x-small
     @click="checkArchieve(item)"
              icon
              color="grey"
            >
              <v-icon>mdi-archive-outline</v-icon>
            </v-btn>
          </template>
             <template v-slot:item.priority="{ item }">
  
       <v-select
                    v-model="item.priority"
                   solo
                   hide-details
                   flat
                   style="width:150px"
                    :items="priorityItems"
                    item-text="name"
                    item-value="id"
                    label="Priority"
                    dense
                    
                    >
                </v-select>
          </template>
            <template v-slot:item.financialYear="{ item }">
   <h5>{{$moment(item.period_from).format("DD/MM/YYYY")}} -  {{$moment(item.to).format("DD/MM/YYYY")}}</h5>
     
          </template>
               <template v-slot:item.userOrGroup="{ item }">
   <h5 v-for="(user,index) in item.userdetails" :key=index>{{user.userName}}</h5>
       <h5 v-for="(group,index) in item.groups" :key=index>{{group}}</h5>
          </template>
           <!-- <template v-slot:item.userOrGroup="{ item }">
   <h5 v-for="(group,index) in item.groups" :key=index>{{group}}</h5>
     
          </template> -->
               <template v-slot:item.progress="{ item }">
                 <div>
                   <p>{{item.progress}}%</p>
                     <v-progress-linear
      v-model="item.progress"
      color="blue-grey"
      height="5"
    >
     
    </v-progress-linear>
                 </div>
  
   
      
  
          </template>
              <template v-slot:item.delete="{ item }">
  
     <v-btn
     x-small
    @click="DeleteEntity(item)"
              icon
              color="grey"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </template>
              <template v-slot:item.transfer="{ item }">
  
     <v-btn
     x-small
    @click="transferEntity(item)"
    
              icon
              color="grey"
            >
              <v-icon>     mdi-share
</v-icon>
            </v-btn>
          </template>
                 <template v-slot:item.action="{ item }">
  
<v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
                <v-icon color="grey"  v-bind="attrs"
                v-on="on" dark>mdi-dots-vertical</v-icon>
            </template>
            <v-list>
              <v-list-item @click="checkDeletion(item)"
              >
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
               <v-list-item
              >
                <v-list-item-title @click="saveAllLedgers(item)">Save All</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          </template>
        </v-data-table>
       </v-col>
       
     </v-row>
     <v-row v-if="showEntityPage" align="center" class="ma-3">
       <v-col cols="9">
             <h2 color="#03a9f4" style="color:#03a9f4;float:left;margin-left:20px">Address</h2>
  </v-col>
    <v-col cols="3" class="ma-2 " >
           <v-text-field
                :rules="[v => !!v || 'Floor/Bulding Name ID is required']"
                    v-model="singleEntity.buildingname"
                    outlined
                    dense
                    label="Floor/Bulding Name"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " >
           <v-text-field
                :rules="[v => !!v || 'Street is required']"
                    v-model="singleEntity.add1"
                    outlined
                    dense
                    label="Street/Area"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " >
           <v-text-field
                :rules="[v => !!v || 'City is required']"
                    v-model="singleEntity.city"
                    outlined
                    dense
                    label="City"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " >
           <v-text-field
                :rules="[v => !!v || 'Pin Code is required']"
                    v-model="singleEntity.pincode"
                    outlined
                    dense
                    label="Pin Code"
                    required
                ></v-text-field>
  </v-col>
    <v-col cols="3" class="ma-2 " >
             <v-select
                    v-model="singleEntity.state"
                    :items="this.location.getAllStatesFromCountry(singleEntity.country)"
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
          <v-select
                    v-model="singleEntity.country"
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
             <h2 color="#03a9f4" style="color:#03a9f4;float:left;margin-left:20px">Registration Info</h2>
  </v-col>
   <v-col cols="3" class="ma-2" >
           <v-text-field
                :rules="[v => !!v || 'Signature is required']"
                    v-model="singleEntity.registrationinfo.signature"
                    outlined
                    dense
                    label="Autherized Sig"
                    required
                ></v-text-field>
                  
  </v-col>
     <v-col cols="3" class="ma-2 " >
           <v-text-field
             
                    v-model="singleEntity.registrationinfo.director"
                    outlined
                    dense
                    label="Email"
                    required
                ></v-text-field>
                  
  </v-col>
      <v-col cols="3" class="ma-2 " >
           <v-text-field
               
                    v-model="singleEntity.cin"
                    outlined
                    dense
                    label="CIN Number"
                    required
                ></v-text-field>
                  
  </v-col>
  <v-col cols="12">
             <h2 color="#03a9f4" style="color:#03a9f4;float:left;margin-left:20px">Partners</h2>
  </v-col>
   <v-col cols="3" class="ma-2" >
           <v-text-field
                :rules="[v => !!v || 'Organization ID is required']"
                    v-model="singleEntity.patners.name"
                    outlined
                    dense
                    label="Name"
                    required
                ></v-text-field>
                  
  </v-col>
     <v-col cols="3" class="ma-2 " >
           <v-text-field
            
                    v-model="singleEntity.patners.email"
                    outlined
                    dense
                    label="Email"
                    required
                ></v-text-field>
                  
  </v-col>
      <v-col cols="3" class="ma-2 " >
           <v-text-field
               
                   v-model="singleEntity.patners.phone"
                    outlined
                    dense
                    label="Phone"
                    required
                ></v-text-field>
                  
  </v-col>
  <v-col cols="12">

            <v-btn
            outlined
                class="ma-2 button-font"
                
                style="border:2px solid #0398DC !important; text-transform:none;float:right"
                 @click="cancelFAPolicy()"
            >
                Cancel
            </v-btn>
                <v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;float:right"
                 @click="updateEntityInfo"
            >
                Save
            </v-btn>
  </v-col>
  <v-col cols="12">
      <v-btn
      style="float:left;margin-left:120px"
   @click="showEntityPage=!showEntityPage"
              icon
              color="#03A9F4"
            >
           
              <v-icon>mdi-keyboard-backspace</v-icon>
               <p style="margin-top:12px">Back to Financial</p>
            </v-btn>
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
        groupAndUsers:[],
        file: '',
        datpickerMenu:{menu1:false,menu2:false,menu3:false},
        singleEntity:{},
    dragging: false,
  snackbar:{text:"test",active:false,type:'success'},
     showEntityInfo:false,
      showEntityPage:false,
        emailRules: [ v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid Email address' ],
        filteredEntityDetails:[{nameOfEntity:"IBULHSG",userOrGroup:'Group Name',transferred:false,transferredTo:'Anand Madhan',transferDate:'10-10-2020',transferStatus:'Transfer Pending',transferIP:'192.25.36.557',
        financialYear:'1/4/2020-31/3/2021',dueDate:'01/01/2025',archieves:"Manager",progress:55,priority:'Medium',lastLogin:'5 Hours ago',status:'overdue',Lock:'online',locked:false,archieved:false,transfered:false},
        {nameOfEntity:"ICICIPRULI",userOrGroup:'Group Name',transferred:true,transferredTo:'Anand Madhan',transferDate:'10-10-2020',transferStatus:'Transfer Pending',transferIP:'192.25.36.557',
        financialYear:'1/4/2020-31/3/2021',dueDate:'01/06/2025',archieves:"Manager",progress:55,priority:'Medium',lastLogin:'5 Hours ago',status:'overdue',Lock:'online',locked:false,archieved:false,transfered:false},
        
        {nameOfEntity:"BHARTIAIRTEL",progress:45,priority:'Low',dueDate:'04/05/2023',userOrGroup:'Group Name',status:'overdue',financialYear:'1/4/2020-31/3/2021',archieves:"Manager",lastLogin:'5 Hours ago',Lock:'online',locked:true,archieved:true,transfered:false},
        {nameOfEntity:"JMC PROJECTS",progress:85,userOrGroup:'Group Name',dueDate:'01/01/2021',status:'complete',priority:'High',archieves:"Manager",financialYear:'1/4/2019-31/3/2020',lastLogin:'5 Hours ago',Lock:'online',locked:false,archieved:false,transfered:false},
        {nameOfEntity:"RAYMOND",progress:85,userOrGroup:'Group Name',deletedBy:'Ravi Tharakan',
        dueDate:'01/01/2021',status:'complete',priority:'High',archieves:"Manager",financialYear:'1/4/2019-31/3/2020',lastLogin:'5 Hours ago',Lock:'online',locked:false,archieved:false,deleted:true}
        ],
        
        entityHeaders:[{
          text: 'Financial Year',
          align: 'start',
          sortable: false,
          value: 'financialYear',
        },
        {
          text: 'User/Group',
          align: 'start',
          sortable: false,
          value: 'userOrGroup',
        },
          {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'status',
        },
           {
          text: 'Priority',
          align: 'start',
          sortable: false,
          value: 'priority',
        },
           {
          text: 'Progress',
          align: 'start',
          sortable: false,
          value: 'progress',
        },
             {
          text: 'Due Date',
          align: 'start',
          sortable: false,
          value: 'due_date',
        },
        
        {
          text: 'Archieved',
          align: 'start',
          sortable: false,
          value: 'archieved',
        },
     
        {
          text: 'Lock',
          align: 'start',
          sortable: false,
          value: 'locked'
          
        },
           {
          text: 'Transfer',
          align: 'start',
          sortable: false,
          value: 'transfer',
        },
              {
          text: 'action',
          align: 'start',
          sortable: false,
          value: 'action',
        }],
        financialDetails:[],
        filteredFinancialDetails:[],
        showImportDialog:false,
        showInviteDialog:false,
        selectedInviteList:[],
           priorityItems: [
                {id: "None", name: 'None'},
                {id: "Low", name: 'Low'},
                {id: "Medium", name: 'Medium'},
                {id: "High", name: 'High'},
            ],
        availableEmails:["asimpremji@tecs.com","elonmust@tecs.com","bajlel@tecs.com","nee@tecs.com","asimpremji@tecs.com","elonmust@tecs.com"],
         userSearchWord:"",
         showFinanicialDialgogue:false,
         rules: {required: (value) => !!value || "Required.",confirmPassword:(value) => value==this.finanicialObject.password || "Please Confirm Password"},
         finanicialObject:{entityId:''},
         selectedSubTab:'active'
    
      }
    },
    async mounted(){
      this.getUsersAndGroups();
      // eslint-disable-next-line no-debugger
      debugger
   this.singleEntity=this.$route.params.selectedEntity;
   this.getFinancialDetails(this.singleEntity.id);
   if(this.singleEntity.registrationinfo==null){
     this.singleEntity.registrationinfo={}
   }
   if(this.singleEntity.patners!=null){
     this.singleEntity.patners=this.singleEntity.patners[0];
   }else{
 this.singleEntity.patners={};
   }
console.log( this.singleEntity,"single")
  
    this.selectedSubTab='active';
    
    
    },
    methods:{
      async getUsersAndGroups(){
try{      
              
                    var res = await this.$apiService.get(`/organization/groupanduser?organizationId=${this.$store.getters.userData.organaizationid}`);
                    if(res&&res.status === 200) {
                      var combined=[];
                      // eslint-disable-next-line no-debugger
                      debugger
                

if(res.data.data.groups.length>0){
 res.data.data.groups.map(item=>combined.push({id:item.id,name:item.name,isGroup:true}));
}
if(res.data.data.users.length>0){
  res.data.data.users.map(item=>combined.push({id:item.id,name:item.username,isGroup:false}));
}
                   
                      this.groupAndUsers=combined;

                     
                      
                   
                    
                      
                 
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      async updateEntityInfo(){
try{          
  let updateObject={};
  if(this.singleEntity.id!=null){
updateObject.entityId=this.singleEntity.id;
  }
  updateObject.name=this.singleEntity.name;
   updateObject.type=this.singleEntity.typeofcompany;
   updateObject.registrationinfo=this.singleEntity.registrationinfo;
 updateObject.patners=[this.singleEntity.patners];
  updateObject.city=this.singleEntity.city;
   updateObject.pincode=this.singleEntity.pincode;

    updateObject.add1=this.singleEntity.add1;
    
    
  updateObject.state=this.singleEntity.state;
   updateObject.country=this.singleEntity.country;
    updateObject.cin=this.singleEntity.cin;


            var res = await this.$apiService.post('/entity/update',updateObject);
            if(res&&res.status === 200) {
                this.snackbar.text="Entity Updated Successfully";
                      this.snackbar.active=true;
               
              console.log(res.data,"updateResponse")

             
            
}
                 
            
        }
        catch(error) {
            console.log(error,"erifo")
          //this.showError("The provided email id or employee id is wrong");
           }
      },
       async checkLocked(item){
        console.log(item,"item arch")
        if(item.islocked==false||item.islocked==null){
          var confirm= await this.$confirm("Are you sure you want to Lock "+item.name);
          if(confirm){
            this.lockOrUnlock(item.financialid,true)
          }
          else{
            this.lockOrUnlock(item.financialid,false)
          }
          console.log(confirm,"confirm")
        }
        else{
            confirm= await this.$confirm("Are you sure you want to Unlock "+item.name);
          if(confirm){
            this.lockOrUnlock(item.financialid,false)
          }
          
        }
      

      },
       async checkArchieve(item){
        console.log(item,"item arch")
        if(item.isarchive==false||item.isarchive==null){
          var confirm= await this.$confirm("Are you sure you want to archieve the financial of"+item.name);
          if(confirm){
            this.archieveOrUnArchieve(item.financialid,true)
          }
          else{
            this.archieveOrUnArchieve(item.financialid,false)
          }
          
        }
        else{
            confirm= await this.$confirm("Are you sure you want to Unarchieve the financial of "+item.name);
          if(confirm){
            this.archieveOrUnArchieve(item.financialid,false)
          }
          
        }
      

      },
             async checkDeletion(item){
               // eslint-disable-next-line no-debugger
               debugger
        console.log(item,"item arch")
        if(item.istrash==false||item.istrash==null){
          var confirm= await this.$confirm("Are you sure you want to Delete this financial of"+item.name);
          if(confirm){
            this.DeleteOrRestore(item.financialid,true)
          }
          else{
            this.DeleteOrRestore(item.financialid,false)
          }
          
        }
        else{
            confirm= await this.$confirm("Are you sure you want to Restore the financial of "+item.name);
          if(confirm){
            this.DeleteOrRestore(item.financialid,false)
          }
          
        }
      

      },
       async archieveOrUnArchieve(id,value){

   try{          //change server
                    var res = await this.$apiService.post('/financials/archive',
                    {financialId:id,isArchive:value});
                    if(res&&res.status === 200) {
                   await this.getFinancialDetails(this.singleEntity.id);
                 
        console.log(res.data.data,"arch list")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
  
      },
             async DeleteOrRestore(id,value){

   try{          //change server
                    var res = await this.$apiService.post('/financials/trash',
                    {financialId:id,isTrash:value});
                    if(res&&res.status === 200) {
                   await this.getFinancialDetails(this.singleEntity.id);
                 
        console.log(res.data.data,"arch list")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
  
      },
      async lockOrUnlock(id,value){

   try{          //change server
                    var res = await this.$apiService.post('/financials/lock',
                    {financialId:id,isLocked:value});
                    if(res&&res.status === 200) {
                   //await this.getEntitiesList();
                await this.getFinancialDetails(this.singleEntity.id);
                 
        console.log(res.data.data,"lock list")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
  
      },
      async closeFinancialForm(){
        this.showFinanicialDialgogue=false;
this.$refs.addFinancialForm.reset();

      },
      async saveNewFinancial(){
        if(!this.$refs.addFinancialForm.validate()){
          console.log(this.finanicialObject,"addFinancialForm");
          return
        }
          console.log(this.finanicialObject,"addFinancialForm");
try{          
   //change server
   let updateObject={};
   updateObject.entityId=this.singleEntity.id;
   updateObject.fromDate=this.finanicialObject.fromDate;
   updateObject.toDate=this.finanicialObject.toDate;
   updateObject.dueDate=this.finanicialObject.dueDate;
   updateObject.priority=this.finanicialObject.priority;
   updateObject.userIds=[];
   this.finanicialObject.userList.filter(x=>x.isGroup==false).map(val=>updateObject.userIds.push(val.id));
   updateObject.users=[];
    this.finanicialObject.userList.filter(x=>x.isGroup==false).map(val=>updateObject.users.push(val.name));
     updateObject.groups=[];
      this.finanicialObject.userList.filter(x=>x.isGroup==true).map(val=>updateObject.groups.push(val.name)); 
      updateObject.groupIds =[];
   this.finanicialObject.userList.filter(x=>x.isGroup==true).map(val=>updateObject.groupIds.push(val.id)); 
    updateObject.progress=Math.floor((Math.random() * 100) + 1);
    updateObject.pending="pending";
   console.log(updateObject,"updateObject")


                    var res = await this.$apiService.post('/financials/add',
                    updateObject);
                    if(res&&res.status === 200) {
                     this.getFinancialDetails(this.singleEntity.id);
                 this.closeFinancialForm();
        console.log(res.data.data,"finlist")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      async getFinancialDetails(id){
 try{          
   //change server
                    var res = await this.$apiService.post('/financials/getall',{entityId:id});
                    if(res&&res.status === 200) {
                      this.financialDetails=res.data.data;
                      this.filteredFinancialDetails=res.data.data;
                 this.selectOption(this.selectedSubTab);
        console.log(res.data.data,"finlist")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
       selectOption(item){
         console.log(item,"tabz")
         if(item=='list'||item=='active'){
           this.selectedSubTab='list';
          this.showEntityInfo=true;
            this.filteredFinancialDetails=this.financialDetails.filter(x=>x.isarchive==false&&x.islocked==false&&(x.istrash==false||x.istrash==null));
            this.entityHeaders=[{
          text: 'Financial Year',
          align: 'start',
          sortable: false,
          value: 'financialYear',
        },
        {
          text: 'User/Group',
          align: 'start',
          sortable: false,
          value: 'userOrGroup',
        },
          {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'status',
        },
           {
          text: 'Priority',
          align: 'start',
          sortable: false,
          value: 'priority',
        },
           {
          text: 'Progress',
          align: 'start',
          sortable: false,
          value: 'progress',
        },
             {
          text: 'Due Date',
          align: 'start',
          sortable: false,
          value: 'due_date',
        },
        
        {
          text: 'Archieved',
          align: 'start',
          sortable: false,
          value: 'archieved',
        },
     
        {
          text: 'Lock',
          align: 'start',
          sortable: false,
          value: 'locked'
          
        },
           {
          text: 'Transfer',
          align: 'start',
          sortable: false,
          value: 'transfer',
        },
              {
          text: 'action',
          align: 'start',
          sortable: false,
          value: 'action',
        }];
         }
else if(item=='archieved'){
   this.showEntityInfo=false;
  this.entityHeaders=[
    {
          text: 'Name of Entitity',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Financial Year',
          align: 'start',
          sortable: false,
          value: 'financialYear',
        },
     
      
           {
          text: 'Unarchieve',
          align: 'start',
          sortable: false,
          value: 'archieved',
        }
        
        ];
        this.selectedSubTab='archieved';
        this.filteredFinancialDetails=this.financialDetails.filter(x=>x.isarchive==true);
}
else if(item=='locked'){
  this.showEntityInfo=false;
  this.entityHeaders=[{
          text: 'Name of Entities',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Financial Year',
          align: 'start',
          sortable: false,
          value: 'financialYear',
        },
            {
          text: 'Unlock',
          align: 'start',
          sortable: false,
          value: 'locked',
        },
     
      
           {
          text: 'Unarchieve',
          align: 'start',
          sortable: false,
          value: 'archieved',
        }];
        this.selectedSubTab='locked';
        this.filteredFinancialDetails=this.financialDetails.filter(x=>x.islocked==true);
}
else if(item=='transfer'){
   this.showEntityInfo=false;
  this.entityHeaders=[
        {
          text: 'Financial Year',
          align: 'start',
          sortable: false,
          value: 'financialYear',
        },
            {
          text: 'Transfer To',
          align: 'start',
          sortable: false,
          value: 'transferredTo',
        },
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'transferDate',
        },
             {
          text: 'IP Address',
          align: 'start',
          sortable: false,
          value: 'transferIP',
        },
          
        {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'transferStatus',
        }

     
      
      ];
        this.selectedSubTab='transfer';
        this.filteredFinancialDetails=this.filteredEntityDetails.filter(x=>x.transferred==true);
}
else if(item=='trash'){
   this.showEntityInfo=false;
  
  this.entityHeaders=[
      {
          text: 'Name of Entities',
          align: 'start',
          sortable: false,
          value: 'nameOfEntity',
        },
        {
          text: 'FY',
          align: 'start',
          sortable: false,
          value: 'financialYear',
        },
            {
          text: 'User / Group',
          align: 'start',
          sortable: false,
          value: 'userOrGroup',
        },
        {
          text: 'Deleted By',
          align: 'start',
          sortable: false,
          value: 'deletedBy',
        },
             {
          text: 'Restore',
          align: 'start',
          sortable: false,
          value: 'restore',
        }

     
      
      ];
        this.selectedSubTab='trash';
        this.filteredFinancialDetails=this.financialDetails.filter(x=>x.istrash==true);
}

      },
      userRowClick(item){
       
console.log(item,"doru")
      },
          showAddUserPopUp(){
this.showFinanicialDialgogue=true;
      },
      onChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      
      if (!files.length) {
        this.dragging = false;
        return;
      }
      
      this.createFile(files[0]);
    },
    createFile(file) {
      // eslint-disable-next-line no-debugger
      debugger
      if (!file.type.match('csv.*')||file.name.substr(file.name.length-3)=='csv'||file.name.substr(file.name.length-4)=='xlsx') {
        this.showError("Please Select a valid CSV File");
        this.dragging = false;
        return;
      }
      
      if (file.size > 5000000) {
        alert('please check file size no over 5 MB.')
        this.dragging = false;
        return;
      }
      
      this.file = file;
      console.log(this.file);
      this.dragging = false;
    },
    removeFile() {
      this.file = '';
    }
    },
     computed: {
    extension() {
      return (this.file) ? this.file.name.split('.').pop() : '';
    }
  }
  }
</script>

<style scoped>
  >>> .my-custom-dialog {
    align-self: flex-start;
  position:absolute;
  overflow: hidden;
    z-index:9999;
    right: 0px;
  }
.imgdiv{
    min-width: 150px;
    margin-right:5px;
}
>>>.v-select.v-input--dense .v-chip {
    margin: 8px 4px 0 4px;
}
.data-card{
 margin-top:2em;
  width:13em;
  border-radius:5px !important;
  height:12em;
  border-left:8px solid #03A9F4 !important; 
}
.dropZone {
  width: 95%;
  margin-left:10px;
  height: 200px;
  position: relative;
  border: 2px dotted #03A9F4;
}
  .undeline{
     border-bottom: 4px solid #2e94c4 !important;
     
  }
.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975A0;
}

.dropZone-info {
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5C5C5C;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 94%;
  margin-left:8px;
  height: 200px;
  position: relative;
  border: 2px dashed #03A9F4;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
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
.v-select.v-select--chips.v-select--chips--small .v-select__selections {
  padding:25px;
  margin:5px;
    min-height: 185px;
   
}

.theUsualHead{
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
.customRightClass{
  transform: translate(125%, 90px);
  
  transition: width 2s;
  animation-name: example;
}
.v-dialog {
    position: absolute;
    bottom: 0;
    right: 0;
}
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}
.customTransClass{
 right:0px
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
border-bottom:3px solid #03A9F4;
padding-bottom:10px;
margin-bottom: 20px;
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
.dotted {
  height: 250px;
padding:20px;
   margin:5px;
    border: 2px dotted #03A9F4;
}
.subColomn{
    min-width:220px;
     margin-top:20px;
}
</style>