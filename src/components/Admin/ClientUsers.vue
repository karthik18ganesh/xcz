<template>
 <div style="height:100%" class="beviEt">
 <v-container fluid>
     <v-row class=" ma-0">
      <div class="text-center">
    <v-dialog
    content-class="my-custom-dialog"
      v-model="showClientAddPopup"
      width="500"
      height="700"
      transition="dialog-bottom-transition"
    >
   

      <v-card class="pa-2">
        <v-form ref="clientUserForm">
      
        <v-card-title class="blueHead" style="padding-top: 0px;">
          <h4 class="major-card mt-2" >Add Client user</h4>
        </v-card-title>

        <v-card-text>
            <v-row>
          <v-col cols="12" class="mt-2">
            <!-- input fields section -->
           <v-row class="ma-1 pa-1">
             <v-col cols="5" style="margin-right:5px"  >
                        <v-text-field
                 :rules="[v => !!v || 'Username is required']"
                    v-model="newClientObject.username"
                    outlined
                    dense
                    label="Username"
                  
                    required
                ></v-text-field>
             </v-col>
              <v-col cols="6" >
                        <v-text-field
               
                    v-model="newClientObject.fullName"
                     :rules="[v => !!v || 'Full name is required']"
                    outlined
                    dense
                    label="Full Name"
                    style="margin-right:6px"
                    required
                ></v-text-field>
             </v-col>
                 <v-col cols="11" >
                          <v-select
                        v-model="newClientObject.selectedCompany"
                          :rules="[v => !!v || 'Company name is required']"
                         class="content-font"
                        label="Entity Name"
                        :items="entityList"
                        @change="getFinancialDetails"
                         item-text="name"
                    item-value="id"
                        outlined
                        dense>
                    </v-select>
             </v-col>
             <v-col cols="11" >
                          <v-select
                        v-model="newClientObject.financialYear"
                         class="content-font"
                        label="Financial Year"
                            :rules="[v => !!v || 'Financial Year is required']"
                           :items="financialDetails"
                         item-text="financialYear"
                    item-value="financialid"
                        outlined
                        dense>
                    </v-select>
             </v-col>
                 <v-col cols="5" style="margin-right:5px"  >
                        <v-text-field
               
                    v-model="newClientObject.email"
                    outlined
                    :rules="[v => !!v || 'Email is required'].concat(emailRules)"
                    dense
                    label="Email"
                  
                    required
                ></v-text-field>
             </v-col>
              <v-col cols="6" >
                        <v-text-field
                        style="margin-right:6px"
                   :rules="[v => !!v || 'Phone Number is required']"
                    v-model="newClientObject.phone"
                    outlined
                    dense
                    label="Phone No"
                  
                    required
                ></v-text-field>
             </v-col> 
                
                
               
           </v-row>
          </v-col>
          
         
        </v-row>
         
        </v-card-text>

      

        <v-card-actions style="height: 40px;">
          <v-spacer></v-spacer>
          <v-row>
          <v-col cols="12 mt-4" >
                <v-btn
               @click="switchSave"
                style="float:left;width:100px;margin-top:-30px;color:white"
                color="#03a9f4"
               
            >
                {{mode=='new'?'Add':'Update'}} 
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
        </v-form>
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
                color="#03a9f4"
               
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
     
      color="#03a9f4"
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
      <button type="button" class="btn btn-#03a9f4 removeFile" @click="removeFile">Remove File</button>
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
                color="#03a9f4"
               
            >
                Import
            </v-btn>
             
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
        
         
         
       
         
         
     </v-row>
     <v-row style="margin-left: 20px;margin-right:20px">
       <v-col cols="12" class="d-flex flex-row mb-4" style="margin-top: 15px;">
         <p>From this page you can add users, Edit users, assign groups, change password etc</p>
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
       
      
           
     <button class="buttonPro-font" @click="addProprietor()">
                <v-icon>mdi-account-multiple-plus-outline</v-icon>
                    Invite
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
       <button class="buttonPro-font" @click="addProprietor()">
                <v-icon>mdi-upload</v-icon>
                    Export
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
     
        
             <button class="buttonPro-font" @click="deleteMultipleUser()">
                <v-icon>mdi-delete-outline</v-icon>
                    Delete
            </button>
              
      </v-col>
      <v-col cols="3">
         <v-text-field
               
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
         v-model="selectedClients"
          item-key="clientid"
       
        show-select
            :items="usersDetails"
            :headers="clientUserHeaders"
            @click:row="userRowClick"
            class="elevation-1"
          hide-default-footer
        >
        <template v-slot:header.name="{ header }">
        
      {{ header.text }}
       
    </template>
          <template v-slot:item.active="{ item }">
  <p v-if="item.active">Active</p>
   <p v-if="!item.active">Inactive</p>
          </template>
           <template v-slot:item.action="{ item }" >
   <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
                <v-icon color="grey"  v-bind="attrs"
                v-on="on" dark>mdi-dots-vertical</v-icon>
            </template>
            <v-list>
              <v-list-item @click="openEditUser(item)"
              >
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              
                <v-list-item @click="deleteSingleUser(item)"
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
        selectedClients:[],
        financialDetails:'',
        file: '',
        entityList:[],
    dragging: false,
    mode:"new",
    newClientObject:{},
        emailRules: [ v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid Email address' ],
        usersDetails:[{user:"Vivek",companyName:"Assam Private LTD",lastLogin:'5 Hours ago',status:'active'}],
        clientUserHeaders:[{
          text: 'User',
          align: 'start',
          sortable: false,
          value: 'name',
          class: "tableHeaderClass"
        },
        {
          text: 'Company Name',
          align: 'start',
          sortable: false,
          value: 'entityname',
          class: "tableHeaderClass"
        },
     
        {
          text: 'Last Sign in',
          align: 'start',
          sortable: false,
          value: 'lastLogin',
       class: "tableHeaderClass"
          
        },
        
              {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'active',
           class: "tableHeaderClass"
        },
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'action',
           class: "tableHeaderClass"
        }],
        showImportDialog:false,
        showInviteDialog:false,
        selectedInviteList:[],
        availableEmails:["asimpremji@tecs.com","elonmust@tecs.com","bajlel@tecs.com","nee@tecs.com","asimpremji@tecs.com","elonmust@tecs.com"],
         userSearchWord:"",
         showClientAddPopup:false,
         rules: {required: (value) => !!value || "Required.",confirmPassword:(value) => value==this.userObject.password || "Please Confirm Password"},
         userObject:{firtstName:"",email:"",lastName:"",emailID:"",archieves:"",nameOfEntity:"",password:""}
    
      }
    },
    async mounted(){
      this.userDetails = JSON.parse(sessionStorage.getItem("userData"));
  this.getClientUserList();
this.getEntitiesList()
    },
    methods:{
      closeUserForm(){
this.mode='new';
this.newClientObject={};
this.showClientAddPopup=false;
      },
      async switchSave(){
if(this.mode=='new'){
  this.saveNewClientUser();
}
else{
  this.UpdateClientUser();
}
      },
      async deleteSingleUser(item){
  try{      
    // eslint-disable-next-line no-debugger
    debugger
                let updateObject={} ;
                updateObject.adminID=this.userDetails.id;
                updateObject.adminPassword=item.adminPassword;
                //updateObject.requestedByUserID =this.lastSelecteedForMultipleDeletion.userIDs;
updateObject.clientIds =[];
updateObject.clientIds.push(item.clientid)
//item.selectedClients.map(item=>updateObject.clientIds.push(item.id));
                    var res = await this.$apiService.post('organization/client/delete',updateObject);
                    if(res&&res.status === 200) {
                this.getClientUserList();
           
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
       async deleteMultipleUser(){
  try{      
    // eslint-disable-next-line no-debugger
    debugger
                let updateObject={} ;
                updateObject.adminID=this.userDetails.id;
                //updateObject.adminPassword=item.adminPassword;
                //updateObject.requestedByUserID =this.lastSelecteedForMultipleDeletion.userIDs;
                updateObject.clientIds=[]
this.selectedClients.map(item=> updateObject.clientIds.push(item.clientid));
//updateObject.clientIds.push(item.clientid)

                    var res = await this.$apiService.post('organization/client/delete',updateObject);
                    if(res&&res.status === 200) {
                this.getClientUserList();
           
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
     async getFinancialDetails(){
 try{          
   //change server
                    var res = await this.$apiService.post('/financials/getall',{entityId:this.newClientObject.selectedCompany});
                    if(res&&res.status === 200) {
                      this.financialDetails=res.data.data;
                
                     this.financialDetails=this.financialDetails.map(item => ({...item,financialYear:this.$moment(item.period_from).format("DD/MM/YYYY").toString()+"  -  "+this.$moment(item.period_to).format("DD/MM/YYYY").toString()}));
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      // eslint-disable-next-line no-unused-vars
      openEditUser(item){
        // eslint-disable-next-line no-debugger
        debugger

this.mode='edit';
this.newClientObject.username=item.name;
 this.newClientObject.clientId=    item.clientid;
                this.newClientObject.fullName=    item.fullname;
                this.newClientObject.selectedCompany=    Number(item.entityid);
                this.getFinancialDetails(item.entityid);
                this.newClientObject.fullName=    item.fullname;
                 this.newClientObject.email=    item.email;
                  this.newClientObject.phone=    item.phonenumber;
                  this.newClientObject.financialYear=    Number(item.financialyear);
               this.showClientAddPopup=true;  
//this.newClientObject=item;
      },
      async getClientUserList(){
try{      
              
                    var res = await this.$apiService.get(`organization/client?organizationId=${sessionStorage.getItem("orgId")}`);
                    if(res&&res.status === 200) {
                      this.usersDetails=res.data.data;
                    
                      
                 
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      async saveNewClientUser(){
if(!this.$refs.clientUserForm.validate()){
  
          return;
        }
         try{      
                let updateObject={} ;
                   updateObject.organizationId=sessionStorage.getItem("orgId");
                   updateObject.name=this.newClientObject.username;
                    updateObject.fullname=this.newClientObject.fullName;
                     updateObject.entityName=this.newClientObject.selectedCompany;
                    updateObject.email=this.newClientObject.email;
                    updateObject.phone=this.newClientObject.phone;
                     updateObject.financialYear=this.newClientObject.financialYear;
                  
    updateObject.phone=this.userObject.phone;
                  
                    var res = await this.$apiService.post('/organization/client',updateObject);
                    if(res&&res.status === 200) {
                     // this.getGroupList();
                     this.getClientUserList();
                       this.$refs.clientUserForm.reset();
                      this.showClientAddPopup=false;
                     
                      
                    
                      // this.$store.commit("setUserData",res.data.userData[0]);
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
       async UpdateClientUser(){
if(!this.$refs.clientUserForm.validate()){
  
          return;
        }
         try{      
                let updateObject={} ;
                updateObject.clientId=this.newClientObject.clientId;
                   updateObject.organizationId=sessionStorage.getItem("orgId");
                   updateObject.name=this.newClientObject.username;
                    updateObject.fullname=this.newClientObject.fullName;
                     updateObject.entityName=this.newClientObject.selectedCompany;
                    updateObject.email=this.newClientObject.email;
                    updateObject.phoneNumber=this.newClientObject.phone;
                     updateObject.financialYear=this.newClientObject.financialYear;
                  
    updateObject.phone=this.userObject.phone;
                  
                    var res = await this.$apiService.put('/organization/client',updateObject);
                    if(res&&res.status === 200) {
                     // this.getGroupList();
                     this.getClientUserList();
                       this.$refs.clientUserForm.reset();
                      this.showClientAddPopup=false;
                     
                      
                    
                      // this.$store.commit("setUserData",res.data.userData[0]);
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }},
       async getEntitiesList(){
 try{   //server change       
                    var res = await this.$apiService.post('/entity/getall',{organizationId:sessionStorage.getItem("orgId")});
                    if(res&&res.status === 200) {
                       this.entityList=res.data.data;
                       console.log(res.data.data,"entityList");
                    
                        
      
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      userRowClick(item){
       
console.log(item,"doru")
      },
          showAddUserPopUp(){
            this.mode='new';
            this.newClientObject={};
this.showClientAddPopup=true;
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
      font-family: Be Vietnam;
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
>>>.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    background-color: #f5f5f5
;
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
.beviEt{
    font-family: Be Vietnam;
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
      font-family: Be Vietnam;
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
.tableHeaderClass{
  background: #f5f5f5;
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
thead.v-data-table-header{
  background: #1975A0 !important
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
/deep/ h5{
   font-size: 13px !important;
 color: #808080 !important;
 font-weight: 500;
}

  /deep/.theme--light.v-data-table {
    box-shadow: none !important;
  }
  

  /deep/ .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 13px !important;
    font-weight: 600;
    background-color: #ecebeb;
    text-align: start !important;
    /* padding-left: 55px; */
    color: #808080;
}

/deep/.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    font-size: 13px !important;
    text-align: start !important;
    /* padding-left: 4vw; */
}
/deep/.v-input--selection-controls{
  margin:0px !important;
}
</style>