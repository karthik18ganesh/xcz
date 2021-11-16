<template>
 <div style="height:100%" class="beVitenma">
 <v-container fluid>
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
   <v-dialog
    content-class="assignAdminClass"
      v-model="showAssignAdminPopup"
      width="520"
    
      transition="dialog-bottom-transition"
    >
   
 <v-form ref="assignAdminsForm" style="width:100%">
      <v-card class="pa-2">
      
        <v-card-title class="theUsualHead" >
      
<v-row class="assignAdminClass">
 
    <v-col cols="12" class="text-left mt-3">
         <h4>Assign Admin Rights</h4>
    </v-col>
   
</v-row>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="pa-1 ma-2">
              <p class="assignAdminClass" style="float:left">Assign Members</p>
            </v-col>
          </v-row>
            <v-row>
          <v-col cols="12">
           
         
        <v-autocomplete
         v-model="assignAdminObject.selectedUsers"
            :rules="[v =>!!v&& Object.keys(v).length!=0 || 'Select users']"
          
           class="dotted assignAdminClass"
           return-object
                      :items="userList?userList.filter(x=>x.id!=superAdminID):[]"
                          item-text="username"
                    item-value="id"
        
         multiple
          solo
          
          
          flat
          chips
       
        >
         <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  outlined
                  @click="data.select"
                  @click:close="removeUser(data.item)"
                >
                
                  {{ data.item.username }}
                </v-chip>
              </template>
        </v-autocomplete>
             </v-col>
                <v-col cols="6" class="mt-3">
                  <p class="assignAdminClass" style="float:left;margin-left:10px;">Enter Admin Password</p>
                </v-col>
             <v-col cols="6" class="mt-3">
                 <v-text-field
                 style="width:95%"
                :rules="[v => !!v || 'Provide Password For Admin']"
                    v-model="assignAdminObject.adminPassword"
                    outlined
                    dense
                     :append-icon="assignAdminObject.adminPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
           
            <v-col cols="8" style="margin-top:15px;margin-bottom:15px">
                <v-btn
               
                style="float:left;width:100px;"
                class="assignAdminClass"
                color="primary"
               @click="assignAdmins"
            >
                Add
            </v-btn>
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
 </v-form>
    </v-dialog>
     <v-dialog
    content-class="invite-Dialogue"
      v-model="removeAdminRightPopup"
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
             <p> You are about to remove {{lastSelecteedForDeletion.username}} from admin list.<br> Please Confirm your password</p>
            </v-col>
                <v-col cols="6" class="mt-3">
                  <p style="float:left;margin-left:10px;">Enter Admin Password</p>
                </v-col>
             
             <v-col cols="6" class="mt-3">
                 <v-text-field
                 style="width:95%"
                :rules="[v => !!v || 'Provide Password For Admin']"
                    v-model="lastSelecteedForDeletion.adminPassword"
                    outlined
                    dense
                     :append-icon="assignAdminObject.adminPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
         
           
            <v-col cols="8" style="margin-top:15px;margin-bottom:15px">
                <v-btn
               
                style="float:left;width:100px;"
                color="primary"
               @click="DeleteFromAdmin"
            >
                Remove
            </v-btn>
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
 </v-form>
    </v-dialog>
     <v-dialog
    content-class="invite-Dialogue"
      v-model="showChangeSuperAdminPopup"
      width="420"
    
      transition="dialog-bottom-transition"
    >
   
 <v-form ref="changeSuperAdminForm" style="width:100%">
      <v-card class="pa-2">
      
        <v-card-title class="theUsualHead" >
      Change Super Admin

        </v-card-title>
         <v-divider color="#03A9F4"></v-divider>

        <v-card-text>
         
            <v-row>
             
             <v-col cols="12" class="ml-2  pa-1 mt-3">
                      <v-select
                    v-model="changeSuperAdminObject.newAdminID"
                  style="width:96%"
                   :rules="[v => !!v || 'Select  new Admin']"
                 outlined
                       :items="userList?userList.filter(x=>x.id!=superAdminID):[]"
                          item-text="username"
                    item-value="id"
                    label="Select New Super Admin"
                    dense
                    
                    >
                </v-select>
             </v-col>
                <v-col cols="6" class="mt-3">
                  <p style="float:left;margin-left:10px;">Enter Admin Password</p>
                </v-col>
             
             <v-col cols="6" class="mt-3">
                 <v-text-field
                 style="width:95%"
                :rules="[v => !!v || 'Provide Password For Admin']"
                    v-model="changeSuperAdminObject.adminPassword"
                    outlined
                    dense
                     :append-icon="assignAdminObject.adminPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="() => (showPassword = !showPassword)"
    :type="showPassword ? 'password' : 'text'"
                   
                    required
                ></v-text-field>
             </v-col>
             <v-col cols="12">
               <p class="text-danger">
                 Please note that after this change you will be logged out immediately and you no more shall be the super admin
               </p>
             </v-col>
           </v-row>
        </v-card-text>
         
         
       
     

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row>
         
           
            <v-col cols="8" style="margin-top:15px;margin-bottom:15px">
                <v-btn
               
                style="float:left;width:160px;"
                color="primary"
               @click="changeSuperAdmin"
            >
                Change & Logout
            </v-btn>
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
 </v-form>
    </v-dialog>
  <v-tabs
      v-model="tab"
      background-color="transparent"
    
      
    >
      <v-tab
       
      >
      <h4 class="headerClassTab">Super Administrator</h4>
      </v-tab>
      <v-tab
       
      >
       <h4 class="headerClassTab">Administrator</h4>
       
      </v-tab>
        
       
     
    </v-tabs>
  <v-tabs-items v-model="tab">
    
         <v-tab-item
       
      
      >
         <v-card
         
          flat
        >
          <v-card-text>
              <v-row>
                  <v-col cols="12" class="ma-1 pa-1 text-left" style="margin-left: 12px !important;margin-top: 15px !important;">
                   You can add more admins to work on your projects or you can change admin privilages to another person
                  </v-col>
                                  <v-col cols="12" class="ma-1 pa-1 text-left" style="margin-bottom: 15px !important;">
                                      
                                       <v-btn @click="showChangeSuperAdminPopup=!showChangeSuperAdminPopup" text style="padding: 8px;">
      Change Super Admin <v-icon left style="margin-left: 5px;
    margin-top: 3px;
}">
        mdi-sync
      </v-icon>
    </v-btn>
                                  </v-col>

              </v-row>
          <v-simple-table style="width:100%;margin-top:10px">

    <template v-slot:default>
      <thead>
        <tr width="700" class="grey lighten-4">
          <th class="text-left text--primary">
            Name
          </th>
          <th width="700" class="text-left text--primary">
            Role
          </th>
            <th width="700" class="text-left text--primary">
            Contact Number
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(group,index) in privilageSuperAdminArray"
          :key="group.groupName"
          v-bind:class="{ striped: index%2!=0 }"
        >
          <td  class="text-left" >{{group.username}}</td>
          <td class="text-left">
             Super Admin
          </td>
             <td  class="text-left" >{{group.contactData&&group.contactData.phone}}</td>
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
          <v-card-text class="ma-0">
              <v-row>
                  <v-col cols="12" class="ma-1 pa-1 text-left" style="margin-left: 12px !important;margin-top: 12px !important;">
                     Change admins , Remove admin right from existing persons from this page
                  </v-col>
                                  <v-col cols="12" class="pa-1 text-left" style="margin-bottom: 15px !important;">
                                      
                                       <v-btn text @click="showAssignAdminPopupScreen" style="padding: 12px;">
      Assign <v-icon left style="margin-top: 3px;margin-left: 3px;">
        mdi-plus
      </v-icon>
    </v-btn>
                                  </v-col>

              </v-row>
          <v-simple-table style="width:100%;margin-top:10px">

    <template v-slot:default>
      <thead>
        <tr width="700" class="grey lighten-4">
          <th class="text-left text--primary">
            Name
          </th>
          <th width="700" class="text-left text--primary">
            Email
          </th>
            <th width="700" class="text-left text--primary">
            Contact Number
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(group,index) in privilageAdminArray"
          :key="group.groupName"
          v-bind:class="{ striped: index%2!=0 }"
        >
          <td  class="text-left" >{{group.username}}</td>
          <td class="text-left">
              {{group.email}}
          </td>
             <td  class="text-left" >{{group.contactData&&group.contactData.phone}}</td>
             <td><v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
                <v-icon color="grey"  v-bind="attrs"
                v-on="on" dark>mdi-dots-vertical</v-icon>
            </template>
            <v-list>
              <v-list-item @click="promptDeleteAdmin(group)"
              >
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
               <v-list-item
              >
                <v-list-item-title @click="saveAllLedgers(item)">Save All</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

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
        showChangeSuperAdminPopup:false,
        changeSuperAdminObject:{},
        superAdminID:0,
        lastSelecteedForDeletion:{},
        file: '',
    dragging: false,
    tab:null,
      snackbar:{text:"test",active:false,type:'success'},
    privilageSuperAdminArray:[{name:'Sarasan',role:'None',contactNumber:'9746580306'}],
    privilageAdminArray:[{name:'Akshay',role:'None',contactNumber:'9746580306'},{name:'Shivan',role:'None',contactNumber:'9746580306'},
    {name:'Sangeeth',role:'None',contactNumber:'9746580306'}],
        emailRules: [ v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid Email address' ],
        usersDetails:[{nameOfEntity:"Vivek",archieves:"Manager",lastLogin:'5 Hours ago',Lock:'online'}],
        entityHeaders:[{
          text: 'Name of Entities',
          align: 'start',
          sortable: false,
          value: 'nameOfEntity',
        },
        {
          text: 'Archieves',
          align: 'start',
          sortable: false,
          value: 'archieves',
        },
     
        {
          text: 'Lock',
          align: 'start',
          sortable: false,
          value: 'Lock'
          
        },
           {
          text: 'Transfer',
          align: 'start',
          sortable: false,
          value: 'transfer',
        },
              {
          text: 'Delete',
          align: 'start',
          sortable: false,
          value: 'delete',
        }],
        showAssignAdminPopup:false,
        showPassword:true,
        selectedInviteList:[],
        availableEmails:["asimpremji@tecs.com","elonmust@tecs.com","bajlel@tecs.com","nee@tecs.com","asimpremji@tecs.com","elonmust@tecs.com"],
         userSearchWord:"",
         addUserDialog:false,
         rules: {required: (value) => !!value || "Required.",confirmPassword:(value) => value==this.userObject.password || "Please Confirm Password"},
         assignAdminObject:{},
         removeAdminRightPopup:false
    
      }
    },
    async mounted(){
      this.userList = JSON.parse(sessionStorage.getItem("userList"));
      this.userDetails = JSON.parse(sessionStorage.getItem("userData"));
  this.getAdminList();
this.getSuperAdminList();
    },
    methods:{
      async changeSuperAdmin(){
  if(!this.$refs.changeSuperAdminForm.validate()){
          return;
  }
           try{      
                let updateObject={} ;
                   updateObject.adminID=this.userDetails.id;
                   updateObject.adminPassword=this.changeSuperAdminObject.adminPassword;
                    updateObject.currentSuperAdminId=this.userDetails.id;
                updateObject.newSuperAdminId=this.changeSuperAdminObject.newAdminID;
                   updateObject.organizationId=sessionStorage.getItem("orgId");
         
                    var res = await this.$apiService.put('/organization/superadmin',updateObject);
                    if(res&&res.status === 200) {
                      // eslint-disable-next-line no-debugger
                      debugger
                      if((res.data.data&&res.data.data.success)){
                          this.snackbar.text="Admin Changed Successfully";
                           this.snackbar.type="success";
                      this.snackbar.active=true;
                     
                       this.$store.commit("setLogin" , false); 
                      this.showChangeSuperAdminPopup=false;
 //this.$router.push({ path: '/' }).catch(()=>{})
                      

                      }
                      else{
                                                  this.snackbar.text=res.data.data.message;
                           this.snackbar.type="error";
                      this.snackbar.active=true;

                      }
                      
                    
                      // this.$store.commit("setUserData",res.data.userData[0]);
        
                     
                    
        }
                      
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
        
      },
    
      removeUser(item){
             // eslint-disable-next-line no-debugger
        debugger
let index=this.assignAdminObject.selectedUsers.findIndex(x=>x.id==item.id);
 this.assignAdminObject.selectedUsers.splice(index,1);
      },
      showAssignAdminPopupScreen(){
     
        if(this.privilageAdminArray.length>0){
          this.assignAdminObject.selectedUsers=[];
          this.privilageAdminArray.forEach(x=>{
            this.assignAdminObject.selectedUsers.push({id:x.id});
          })
        }
  this.showAssignAdminPopup=!this.showAssignAdminPopup
      },
    
      async promptDeleteAdmin(item){
this.lastSelecteedForDeletion=item;
this.removeAdminRightPopup=true;
      },
      async DeleteFromAdmin(){
          if(!this.$refs.deleteAdminForm.validate()){
          return;
        }
          try{      
                let updateObject={} ;
                   updateObject.adminID=this.userDetails.id;
                   updateObject.adminPassword=this.lastSelecteedForDeletion.adminPassword;
                
                   updateObject.organizationId=sessionStorage.getItem("orgId");
                   updateObject.userIds=[];
                    updateObject.userIds.push({userId:this.lastSelecteedForDeletion.id,isAdded:false});
         
                    var res = await this.$apiService.put('/organization/changetoadmin',updateObject);
                    if(res&&res.status === 200) {
                      // eslint-disable-next-line no-debugger
                      debugger
                      if((res.data.data&&res.data.data.success)||(res.data.status=='ok')){
                          this.snackbar.text="Admin Right Removed Successfully";
                           this.snackbar.type="success";
                      this.snackbar.active=true;
                      this.$refs.deleteAdminForm.reset();
                      this.getAdminList();
                      this.removeAdminRightPopup=false;

                      

                      }
                      else{
                                                  this.snackbar.text=res.data.data.message;
                           this.snackbar.type="error";
                      this.snackbar.active=true;

                      }
                      
                    
                      // this.$store.commit("setUserData",res.data.userData[0]);
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }

      },
            async getSuperAdminList(){
try{      
              
                    var res = await this.$apiService.get(`/organization/getsuperadmin?organizationId=${sessionStorage.getItem("orgId")}`);
                    if(res&&res.status === 200) {
                      this.privilageSuperAdminArray=res.data.data;
                      if(this.privilageSuperAdminArray.length>0){
this.superAdminID=this.privilageSuperAdminArray[0].id;
                      }
                      
                   
                    
                      
                 
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
       async assignAdmins(){
        if(!this.$refs.assignAdminsForm.validate()){
          return;
        }
     
              try{      
                let updateObject={} ;
                   updateObject.adminID=this.userDetails.id;
                   updateObject.adminPassword=this.assignAdminObject.adminPassword;
                
                   updateObject.organizationId=sessionStorage.getItem("orgId");
                   updateObject.userIds=[];
               
                     this.assignAdminObject.selectedUsers.map(val=>{ updateObject.userIds.push({userId:val.id,isAdded:true})});
                     if(this.privilageAdminArray.length>0){
                       var result = this.privilageAdminArray.map(a => a.id);
var result2 = this.assignAdminObject.selectedUsers.map(a => a.id);
let deletedIDs=result.filter(x => !result2.includes(x));
deletedIDs.map(x=>{updateObject.userIds.push({userId:x,isAdded:false})});


                    
                 
                   
                     }
                    var res = await this.$apiService.put('/organization/changetoadmin',updateObject);
                    if(res&&res.status === 200) {
                     
                      if((res.data.data&&res.data.data.success)||(res.data.status=='ok')){
                          this.snackbar.text="Admin Right Assigned";
                           this.snackbar.type="success";
                      this.snackbar.active=true;
                      this.$refs.assignAdminsForm.reset();
                      this.getAdminList();
                      this.showAssignAdminPopup=false;

                      

                      }
                      else{
                                                  this.snackbar.text=res.data.data.message;
                           this.snackbar.type="error";
                      this.snackbar.active=true;

                      }
                      
                    
                      // this.$store.commit("setUserData",res.data.userData[0]);
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
                   },
               async getAdminList(){
try{      
              
                    var res = await this.$apiService.get(`/organization/getadmin?organizationId=${sessionStorage.getItem("orgId")}`);
                    if(res&&res.status === 200) {
                      this.privilageAdminArray=res.data.data;
                   
                    
                      
                 
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      userRowClick(item){
          console.log(item,"doru")
        
         this.$router.push({ path: '/EntityFinancial' }); 

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
.text-danger{
  color:red;
  font-family:Be Vietnam !important;
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
.assignAdminClass{
  font-family:Be Vietnam !important;
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
.beVitenma{
    font-family: Be Vietnam;
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
.invite-Dialogue{
  font-family: Be Vietnam !important;
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
</style>