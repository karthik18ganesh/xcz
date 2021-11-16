<template>
 <div style="height:100%">
 <v-container fluid>
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
     <v-dialog
    content-class="invite-Dialogue"
      v-model="deleteUserPopup"
      width="520"
    
      transition="dialog-bottom-transition"
    >
   
 <v-form ref="deleteAdminForm" style="width:100%">
      <v-card class="pa-2">
      
        <v-card-title class="theUsualHead" >
      

        </v-card-title>

        <v-card-text>
         
            <v-row>
               <v-col cols="12" class="mb-3">
             <p> You are about to Delete "{{lastSelecteedForDeletion.username}}"</p>
            </v-col>
                <v-col cols="6" class="mt-3">
                  <p style="float:left;margin-left:10px;">Enter Admin Password</p>
                </v-col>
             
             <v-col cols="6" class="mt-3">
                 <v-text-field hide-details
                 style="width:95%"
                :rules="[v => !!v || 'Provide Password For Admin']"
                    v-model="lastSelecteedForDeletion.adminPassword"
                    outlined
                    dense
                     :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="() => (showPassword = !showPassword)"
    :type="showPassword ? 'password' : 'text'"
                   
                    required
                ></v-text-field>
             </v-col>
           </v-row>
        </v-card-text>
         
         
       
     

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row>
         
           
            <v-col cols="4" style="margin-top:15px;margin-bottom:15px">
                <v-btn
               
                style="float:left;width:100px;"
                color="primary"
               @click="deleteSingleUser(lastSelecteedForDeletion)"
            >
                Yes
            </v-btn>
            </v-col>
              <v-col cols="4" style="margin-top:15px;margin-bottom:15px">
                <v-btn
               
                style="float:left;width:100px;"
            
               @click="deleteUserPopup=false"
            >
                No
            </v-btn>
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
 </v-form>
    </v-dialog>
     <v-dialog
    content-class="invite-Dialogue"
      v-model="deleteMultipleUserPopup"
      width="520"
    
      transition="dialog-bottom-transition"
    >
   
 <v-form ref="deleteAdminForm" style="width:100%">
      <v-card class="pa-2">
      
        <v-card-title class="theUsualHead" >
      

        </v-card-title>

        <v-card-text>
         
            <v-row>
               <v-col cols="12" class="mb-3">
             <p> You are about to Delete "{{lastSelecteedForMultipleDeletion.selectedUsers&&lastSelecteedForMultipleDeletion.selectedUsers.length}} user(s)</p>
            </v-col>
                <v-col cols="6" class="mt-3">
                  <p style="float:left;margin-left:10px;">Enter Admin Password</p>
                </v-col>
             
             <v-col cols="6" class="mt-3">
                 <v-text-field hide-details
                 style="width:95%"
                :rules="[v => !!v || 'Provide Password For Admin']"
                    v-model="lastSelecteedForMultipleDeletion.adminPassword"
                    outlined
                    dense
                     :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="() => (showPassword = !showPassword)"
    :type="showPassword ? 'password' : 'text'"
                   
                    required
                ></v-text-field>
             </v-col>
           </v-row>
        </v-card-text>
         
         
       
     

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row>
         
           
            <v-col cols="4" style="margin-top:15px;margin-bottom:15px">
                <v-btn
               
                style="float:left;width:100px;"
                color="primary"
               @click="deleteMultipleUser(lastSelecteedForMultipleDeletion)"
            >
                Yes
            </v-btn>
            </v-col>
              <v-col cols="4" style="margin-top:15px;margin-bottom:15px">
                <v-btn
               
                style="float:left;width:100px;"
            
               @click="deleteMultipleUserPopup=false"
            >
                No
            </v-btn>
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
 </v-form>
    </v-dialog>
     <v-row class="blueHead ma-0">
      <div class="text-center">
    <v-dialog
    content-class="my-custom-dialog"
      v-model="addUserDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition"
    >
   

      <v-card>
      
        <v-card-title class="theUsualHead blueHeads"  style="font-size: 17px !important;font-weight: 600;margin: 0px !important;">
          Add User
        </v-card-title>

        <v-card-text>
           <v-form ref="userAddForm">
            <v-row>
             
          <v-col cols="8" class="mt-3">
            <!-- input fields section -->
           <v-row class="ma-1 pa-1">
             <v-col cols="12" style="margin-bottom: 13px !important;" >
                        <v-text-field hide-details
                 :rules="[rules.required]"
                    v-model="userObject.firstName"
                    outlined
                    dense
                    label="First Name"
                  
                    required
                ></v-text-field>
             </v-col>
              <v-col cols="12" style="margin-bottom: 13px !important;" >
                        <v-text-field hide-details
               :rules="[rules.required]"
                    v-model="userObject.lastName"
                    outlined
                    dense
                    label="Last Name"
                  
                    required
                ></v-text-field>
             </v-col>
               
                  <v-col cols="12" style="margin-bottom: 13px !important;" >
                        <v-text-field hide-details
               
                    v-model="userObject.email"
                    :rules="[rules.required].concat(emailRules)"
                    outlined
                    dense
                    label="Email ID"
                  
                    required
                ></v-text-field>
             </v-col>
                  <v-col cols="12" style="margin-bottom: 13px !important;" >
                        <v-text-field hide-details
                 :rules="[rules.required]"
                    v-model="userObject.designation"
                    outlined
                    dense
                    label="Designation"
                  
                    required
                ></v-text-field>
             </v-col>
                  <v-col cols="12" style="margin-bottom: 13px !important;" >
                        <v-text-field hide-details
                 :rules="userNameRules"
                    v-model="userObject.username"
                    outlined
                    dense
                    label="User Name"
            @change="checkUsernameExist"
            v-on:keyup.native="usernameTaken=false"
                    required
                ></v-text-field>
             </v-col>
                <v-col cols="12"  >
                        <v-text-field hide-details style="margin-bottom: 13px !important;"
                :rules="[rules.required]"
                    :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="() => (hidePassword = !hidePassword)"
    :type="hidePassword ? 'password' : 'text'" 
                    v-model="userObject.password"
                    outlined
                    dense
                    label="Password"
                  
                    required
                ></v-text-field>
                   <v-text-field hide-details style="margin-bottom: 13px !important;"
               :rules="[rules.confirmPassword]"
                    v-model="userObject.confirmedPassword"
                    outlined
                    type="password"
                    dense
                    label="Confirm Password"
                  
                    required
                ></v-text-field>
             
             </v-col>
           </v-row>
          </v-col>
            <v-col cols="4">
              <v-row>
                <v-col cols="12" style="margin-top:40px">
                   <img src="../../assets/sampleDP.png" alt="companyLogo" height="140px" width="120px"/>
                </v-col>
                <v-col cols="12">
                  <p>Upload Photo  <v-icon small color="black" dark>
        mdi-pencil
      </v-icon></p>
                </v-col>
              </v-row>
          
          </v-col>
          <v-col cols="12">
               <v-checkbox style="font-size:14px !important;margin-top: -5px;margin-left: 10px;" hide-details
      v-model="userObject.passwordChange"
      label="Force user to change password on first login"
      
    ></v-checkbox>
          </v-col>
             
        </v-row>
         </v-form>
         
        </v-card-text>

      

        <v-card-actions style="height:50px">
          <v-spacer></v-spacer>
          <v-row>
            <v-col cols="12"  style="margin-top: 15px;">
                <v-btn
               @click="saveNewUser"
                style="float:left;width:100px;margin-top:-30px"
                color="primary"
               
            >
                Add 
            </v-btn>
            <v-btn
            outlined
            @click="closeUserForm"
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
           
               <v-combobox
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
          ></v-combobox>
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
               @click="InviteUsers"
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
     <v-dialog
   
      v-model="showChangePasswordPopup"
      width="500"
    
      transition="dialog-bottom-transition"
    >
   

      <v-card>
      
        <v-card-title class="text-center" >
          <v-col cols="12">
         <h5>You are about to change the<br> User Password </h5>
          </v-col>


        </v-card-title>

        <v-card-text>
         <v-row class="ma-2 pa-2">
                 <v-form ref="changePasswordForm" style="width:100%">
         
                <v-row>
                 
          
                       <v-col cols="4" class="ma-1">
        <h4 style="float:left">New Password</h4>
  </v-col>
                  <v-col cols="6" class="ma-1">
           <v-text-field hide-details
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
          
                       <v-col cols="4" class="ma-1">
        <h4 style="float:left">Confirm Password</h4>
  </v-col>
                  <v-col cols="6" class="ma-1">
           <v-text-field hide-details
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
        
                       <v-col cols="4" class="ma-1">
        <h4 style="float:left">Admin Password</h4>
  </v-col>
                  <v-col cols="6" class="ma-1">
           <v-text-field hide-details
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
   
     

        
                </v-row>
                
             
              </v-form>
            </v-row>
        </v-card-text>
         
         
       
     

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row class="ma-1 pa-1">
           
            
            <v-col cols="12">
              
                  <v-col cols="12">
            <v-btn
                class="ma-2 button-font"
                color="primary"
               style="float:left"
               @click="changeUserPassword"
            >
                Set
            </v-btn>
                <v-btn
                
  class="ma-2 button-font"
            outlined
            @click="showChangePasswordPopup=false"
              style="width:100px;float:left;margin-left:10px;border:2px solid #03A9F4 !important"  
               
                
               
            >
                Cancel
            </v-btn>
    </v-col>
             
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <v-vol cols="3" md="3" lg="3" xs="3" class="imgdiv">
          <img src="../../assets/profile-icon.png" height="60" width="60"/>
   </v-vol>
    <v-vol cols="3" md="3" lg="3" xs="3" class="subTextDiv" style="margin-left: 30px;margin-top: 2px;">
        <h3 color="#0398DC" style="text-align: start;font-size:18px !important;">
            {{userDetails?userDetails.organizationname:''}}
        </h3>
        <p style="text-align: start;">Organization Website</p>
      
  </v-vol>
    <v-col cols="1" style="max-height: 63px;">
          <v-divider
         
         vertical
  
         ></v-divider>
  </v-col>
  <v-col cols="3" class="subColomn">
      <h5 style="font-size:18px !important;;font-weight: 500;">Organization ID</h5>
      <p style="font-size:16px !important;">{{userDetails?userDetails.organaizationid:''}}</p>
  </v-col>
     <v-col cols="1" style="max-height: 63px;">
          <v-divider 
         
         vertical
  
         ></v-divider>
  </v-col>
    <v-col cols="3" class="subColomn">
      <h5 style="font-size:18px !important;;font-weight: 500;">Super Admin</h5>
      <p style="font-size:16px !important;">{{userDetails?userDetails.username:''}}</p>
  </v-col>
</v-row>
<v-divider class="blueUline"></v-divider>
     <v-row style="margin-left: 20px;margin-right:20px">
       <v-col cols="12" class="d-flex flex-row mb-4" style="margin-top: 25px;">
         <p class="beVietnamFont">From this page you can add users, Edit users, assign groups, change password etc</p>
       </v-col>
      <v-col cols="9" class="d-flex flex-row">
    <button class="buttonPro-font" @click="showAddUserPopUp">
                <v-icon>mdi-plus</v-icon>
                    Add
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
             <button class="buttonPro-font" @click="showInviteDialog=!showInviteDialog">
                <v-icon>mdi-account-multiple-plus</v-icon>
                    Invite
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
             <button class="buttonPro-font" @click="showImportDialog=!showImportDialog">
                <v-icon>mdi-format-vertical-align-bottom</v-icon>
                    Import
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
             <button class="buttonPro-font" @click="addProprietor()">
                <v-icon>mdi-format-vertical-align-top</v-icon>
                    Export
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
             <button class="buttonPro-font" @click="addProprietor()">
                <v-icon>mdi-account-multiple</v-icon>
                    Roles
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
             <button class="buttonPro-font" @click="promptMultipleDelete">
                <v-icon>mdi-delete</v-icon>
                    Delete
            </button>
              
      </v-col>
      <v-col cols="3">
         <v-text-field hide-details
               
                    v-model="userSearchWord"
                    outlined
                    dense
                    label="Search users here "
                    append-icon="mdi-magnify"
                    required
                ></v-text-field>
      </v-col>
       
        
       <v-col cols="12">
        <v-data-table
        hide-default-footer
            :items="filteredUserList"
            :headers="userHeaders"
            :search="userSearchWord"
            @click:row="userRowClick"
            class="elevation-1"
         
        >
         <template v-slot:item.selection="{ item }">
  
    <v-avatar v-if="!item.selected" size="36px" @click.stop="selectUser(item,true)" >
      <img
      
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
      >
    </v-avatar>
     <v-avatar v-if="item.selected" size="36px" @click.stop="selectUser(item,false)" >
      <img
      
        src="../../assets/check.png"
        alt="John"
      >
    </v-avatar>
          </template>
          <template v-slot:item.onlineStatus="{ item }">
  
     <v-btn
     x-small
     v-if="item.isactive==true"
              icon
              color="green"
            >
              <v-icon>mdi-checkbox-blank-circle</v-icon>
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
              <v-list-item @click="userRowClick(item)"
              >
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
                  <v-list-item @click="openChangePassword(item)"
              >
                <v-list-item-title>Change Password</v-list-item-title>
              </v-list-item>
                <v-list-item @click="promptDelete(item)"
              >
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          </template>
        </v-data-table>
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
        deleteUserPopup:false,
        passWordObject:{},
        lastSelecteedForDeletion:{},
        lastSelecteedForMultipleDeletion:{},
        deleteMultipleUserPopup:false,
        singleUser:{},
        usernameTaken:false,
        snackbar:{text:"test",active:false,type:'success'},
         showPassword:{userPassword:true,adminPassword:true,confirmPassword:true},
        showChangePasswordPopup:false,
        file: '',
                confirmPasswordRules: [
        (value) => !!value || 'Please confirm password',
        (value) =>
          value === this.passWordObject.password || 'The password confirmation does not match.',
      ],
                 userNameRules: [
        (value) => !!value || 'Please enter a username',
        (value) => value.length>3 || 'Username must be 4 letter minimum',
        () =>
         this.usernameTaken==false || 'Username is already taken',
      ],

        hidePassword:true,
    dragging: false,
        emailRules: [ v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid Email address' ],
        usersDetails:[{username:"Vivek",designation:"Manager",lastLogin:'5 Hours ago',onlineStatus:'online'}],
        userList:[],
        filteredUserList:[],
        userHeaders:[
          {
          text: 'Selection',
          align: 'start',
          sortable: false,
          value: 'selection',
        },
          {
          text: 'Username',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        {
          text: 'Designation',
          align: 'start',
          sortable: false,
          value: 'designation',
        },
        {
          text: 'Last Login',
          align: 'start',
          sortable: false,
          value: 'lastLogin',
        },
        {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'onlineStatus'
          
        },
           {
          text: '',
          align: 'start',
          sortable: false,
          value: 'action',
        }
        ],
        showImportDialog:false,
        showInviteDialog:false,
        selectedInviteList:[],
        availableEmails:["sreesankar@lambdazen.com","jithin@lzindia.co.in"],
         userSearchWord:"",
         addUserDialog:false,
     
         rules: {required: (value) => !!value || "Required.",confirmPassword:(value) => value==this.userObject.password || "Please Confirm Password"},
         userObject:{firtstName:"",email:"",lastName:"",designation:"",username:"",password:""}
    
      }
    },
    async mounted(){
        this.userDetails = JSON.parse(sessionStorage.getItem("userData"))?JSON.parse(sessionStorage.getItem("userData")):{};
   this.userList=JSON.parse(sessionStorage.getItem("userList"));
                       this.filteredUserList=JSON.parse(sessionStorage.getItem("userList"));

    },
    methods:{
  
      promptMultipleDelete(){
   
this.lastSelecteedForMultipleDeletion.selectedUsers=this.filteredUserList.filter(x=>x.selected==true);
if(this.lastSelecteedForMultipleDeletion.selectedUsers.length>0){
this.deleteMultipleUserPopup=true;
}
      },
      promptDelete(item){
this.lastSelecteedForDeletion=item;
this.deleteUserPopup=true;
      },
     // eslint-disable-next-line no-unused-vars
     async deleteSingleUser(item){
    
         try{      
                let updateObject={} ;
                updateObject.adminID=this.userDetails.id;
                updateObject.adminPassword=this.lastSelecteedForDeletion.adminPassword;
                updateObject.requestedByUserID =this.userDetails.id;
updateObject.userIDs=[];
updateObject.userIDs.push(item.id);
                    var res = await this.$apiService.post('user/delete',updateObject);
                     if(res&&res.status === 200) {
                      if(res.data.result.success){
                      
    
                           
                         await this.fetchUserList();
                          this.snackbar.text=res.data.result.message;
                           this.snackbar.type="success";
                      this.snackbar.active=true;
                                              setTimeout(() => {
      
       this.userList=JSON.parse(sessionStorage.getItem("userList"));
                       this.filteredUserList=JSON.parse(sessionStorage.getItem("userList"));
                            this.deleteUserPopup=false;
   }, 0);
                  
                    
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
                    console.log(error,"error")
               
                   }
      },
       async deleteMultipleUser(item){
  
         try{      
                let updateObject={} ;
                updateObject.adminID=this.userDetails.id;
                updateObject.adminPassword=item.adminPassword;
                updateObject.requestedByUserID =this.lastSelecteedForMultipleDeletion.userIDs;
updateObject.userIDs=[];
item.selectedUsers.map(item=>updateObject.userIDs.push(item.id));
                    var res = await this.$apiService.post('user/delete',updateObject);
                     if(res.data.result.success){
                      
    
                           
                         await this.fetchUserList();
                          this.snackbar.text=res.data.result.message;
                           this.snackbar.type="success";
                      this.snackbar.active=true;
                                              setTimeout(() => {
      
       this.userList=JSON.parse(sessionStorage.getItem("userList"));
                       this.filteredUserList=JSON.parse(sessionStorage.getItem("userList"));
                            this.deleteMultipleUserPopup=false;
   }, 0);
                  
                    
                      }
                      else{
                                                  this.snackbar.text=res.data.result.message;
                           this.snackbar.type="error";
                      this.snackbar.active=true;

                      }

                     
           
        
                     
                    
  //       }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      async InviteUsers(){
  
         try{      
                let updateObject={} ;
                updateObject.emails=this.selectedInviteList;
                console.log(this.selectedInviteList,"sel")
              
              
                    var res = await this.$apiService.post('/organization/sendInvite',updateObject);
                     if(res.data.status=="sent"){
                      
    
                           
                        
                          this.snackbar.text="Users Invited Successfully";
                           this.snackbar.type="success";
                      this.snackbar.active=true;
                      this.showInviteDialog=false;
      
                  
                    
                      }
                      else{
                                                  this.snackbar.text="Mail Server not responding";
                           this.snackbar.type="error";
                      this.snackbar.active=true;

                      }

                     
           
        
                     
                    
  //       }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      selectUser(item,value){
       
     var index=   this.filteredUserList.findIndex(x=>x==item);
     let editedItem = { ...this.filteredUserList[index], ...{ selected: value } };
     this.filteredUserList.splice(index, 1, editedItem);


      },
      async checkUsernameExist(value){
//alert(event.target.value)
if(value.length>3){
    try{      
                let updateObject={username:value,email:""} ;
                    var res = await this.$apiService.post('user/checkuserexist',updateObject);
                    if(res&&res.status === 200) {
                     
                      if(res.data.exist){
                        this.usernameTaken=true;
                      }
                      else{
                        this.usernameTaken=false;
                      }
           
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
}

      },
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
                    var res = await this.$apiService.post('user/changePasswordbyadmin',updateObject);
                    if(res&&res.status === 200) {
                      if(res.data.result.success){
                      
                          this.$refs.changePasswordForm.reset();
                          this.showChangePasswordPopup=false;
                          this.snackbar.text=res.data.result.message;
                           this.snackbar.type="success";
                      this.snackbar.active=true;
                    
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
      openChangePassword(item){
        this.showChangePasswordPopup=true;
        this.singleUser=item;
console.log(item)
      },
      async closeUserForm(){
this.$refs.userAddForm.reset();
this.addUserDialog=false;
      },
      async saveNewUser(){
if(this.$refs.userAddForm.validate()){
   try{   
      
         let updateUserObj={};
         updateUserObj.username=this.userObject.username;
         updateUserObj.password=this.userObject.password;
         updateUserObj.firstName=this.userObject.firstName;
         updateUserObj.lastName=this.userObject.lastName;
         updateUserObj.email=this.userObject.email;
          updateUserObj.designation=this.userObject.designation;
         updateUserObj.cafirmid=sessionStorage.getItem("orgId");
         updateUserObj.requestedByUserID=this.userDetails.id;
         console.log(updateUserObj,"updateUserObj")
         //change server
                    var res = await this.$apiService.post('/user/createnew',updateUserObj);
                    if(res&&res.status === 200) {
                      console.log(res.data);
                  await this.fetchUserList();
                       setTimeout(() => {
      
       this.addUserDialog=false;
        this.userList=JSON.parse(sessionStorage.getItem("userList"));
                       this.filteredUserList=JSON.parse(sessionStorage.getItem("userList"));
   }, 0);
                     
     
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
 //return;
  
      }
     
      
      
      },
      async fetchUsersList(){
   try{          //change server
                    var res = await this.$apiService.post('/user/getlist',{organizationID:sessionStorage.getItem("orgId")});
                    if(res&&res.status === 200) {
                     this.userList=JSON.parse(sessionStorage.getItem("userList"));
                       this.filteredUserList=JSON.parse(sessionStorage.getItem("userList"));
        console.log(res.data.data,"userlist")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      userRowClick(item){
         this.$router.push({ name: 'UserDetails',params: { selectedUser: item}  }); 
console.log(item,"doru")
      },
          showAddUserPopUp(){
this.addUserDialog=true;
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
.v-data-table >>> td {
  font-family:Be Vietnam !important;
}
  >>> .my-custom-dialog {
    align-self: flex-end;
  position:absolute;
  top:0px;
    z-index:9999;
    right: 0px;
  }
.imgdiv{
  height:100%
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
.blueHeads{
margin-left: 20px !important;
max-height: 65px;
padding-bottom:10px;
border-bottom:3px solid #03A9F4;
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
    font-size: 20px;
    font-weight: 500;
}
.subTextDiv h3{
   color:#03A9F4 !important;
    font-family: Be Vietnam;
    text-align: start;
    font-size: 18px;
    text-transform: capitalize;
}
.subTextDiv h5{
   
    font-family: Be Vietnam;
}
.subTextDiv p{
   margin: 0px;
   font-size:14px;
    font-family: Be Vietnam;
}
.beVietnamFont{
     font-family: Be Vietnam;
}
p{
  margin: 0px ;
}
.dotted {
  height: 250px;
padding:20px;
   margin:5px;
    border: 2px dotted #03A9F4;
}
.subColomn{
    min-width:220px;
    font-family: Be Vietnam;
    font-size: 18px;
    font-weight: 500;
}
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

  /deep/.theme--light.v-data-table {
    box-shadow: none !important;
  }

  /deep/.v-input input {
      font-size: 14px !important;
  }
  /deep/.v-text-field--outlined.v-input--dense .v-label {
      font-size: 14px;
  }

.blueUline {
  margin-top: 4px;
  width: 100%;
  border-top: 3px solid #03a9f4;
  border-color: #03a9f4 !important;
  min-width: 102%;
  margin-left: -12px;
}

/deep/ .v-label{
  font-size: 14px !important;
}

</style>