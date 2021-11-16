<template>
 <div style="height:100%">
    <div class="text-center">
    <v-dialog
    content-class="my-custom-dialog"
      v-model="addEntityDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition"
    >
   

      <v-card>
      
        <v-card-title class="theUsualHead blueHeads" style="font-size: 17px !important;font-weight: 600;margin: 0px !important;">
         Add Entity
        </v-card-title>

        <v-card-text>
            <v-row style="margin-top:20px">
               <v-form ref="addEntityForm">
          <v-col cols="12">
            <!-- input fields section -->
           <v-row class="ma-1 pa-1">
             <v-col cols="12" >
                        <v-text-field
                :rules="[v => !!v || 'Entity Name is required']"
                    v-model="newEntityObject.name"
                    outlined
                    dense
                    label="Name of the entity"
                  
                    required
                ></v-text-field>
             </v-col>
              <v-col cols="12" >
                     <v-select
                    v-model="newEntityObject.orgType"
                    :rules="[v => !!v || 'Organization type is required']"
                    :items="['Partnership','Private Companies']"
                
                    label="Type of the organization"
                    dense
                    outlined
                    required          
                ></v-select>
             </v-col>
                 
                
                
               
           </v-row>
          </v-col>
          
               </v-form>
        </v-row>
         
        </v-card-text>

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row >
            <v-col cols="12" class="ma-2 pa-2" >
                <v-btn
               @click="saveNewEntity"
                style="float:left;width:100px;margin-top:-30px"
                color="primary"
               
            >
                Add
            </v-btn>
            <v-btn
            outlined
            @click="addEntityDialog=false"
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
     <div >
    <v-dialog
    content-class="my-custom-dialog"
      v-model="showTransferDialog"
      width="300"
    
      transition="dialog-bottom-transition"
    >
   

      <v-card>
      
        <v-card-title class="theUsualHead" >
          Transferee Details

        </v-card-title>

        <v-card-text>
          <v-row>
           
          </v-row>
            <v-row>
          <v-col cols="12">
           
           <v-text-field
               
                    v-model="userObject.firstName"
                    outlined
                    dense
                    label="Name"
                  
                    required
                ></v-text-field>
             </v-col>
                  <v-col cols="12">
           
           <v-text-field
               
                    v-model="userObject.firstName"
                    outlined
                    dense
                    label="id"
                  
                    required
                ></v-text-field>
             </v-col>
                  <v-col cols="12">
           
           <v-text-field
               
                    v-model="userObject.firstName"
                    outlined
                    dense
                    label="Email"
                  
                    required
                ></v-text-field>
             </v-col>
                <v-col cols="12">
           
           <v-text-field
               
                    v-model="userObject.firstName"
                    outlined
                    dense
                    label="Phone"
                  
                    required
                ></v-text-field>
             </v-col>
           </v-row>
        </v-card-text>
         
         
       
     

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row class="ma-1 pa-1 beVietnamFont">
           
              <v-col cols="12">
        
            </v-col>
            <v-col cols="12">
                <v-btn
               
                style="float:left;width:100px;"
                color="primary"
               
            >
                Transfer
            </v-btn>
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
 <v-container fluid>
       <v-row class="blueHead ma-0">
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
       <v-col cols="12" class="d-flex flex-row mb-4" style="margin-top: 40px;">
         <p class="beVietnamFont">From this page you can add users, Edit users, assign groups, change password etc</p>
       </v-col>
      <v-col cols="9" class="d-flex flex-row beVietnamFont">
    <button class="buttonPro-font" @click="showAddUserPopUp">
                <v-icon>mdi-plus</v-icon>
                    Add
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
       <button  v-bind:class="{ undeline: selectedSubTab=='archieved' }" class="buttonPro-font" @click="selectOption('archieved')">
                <v-icon>mdi-archive-outline</v-icon>
                    Archieved
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
       <button v-bind:class="{ undeline: selectedSubTab=='locked' }" class="buttonPro-font" @click="selectOption('locked')">
                <v-icon>mdi-lock-outline</v-icon>
                    Locked
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
             <button class="buttonPro-font" @click="showTransferDialog=!showTransferDialog">
                <v-icon>mdi-reply-all mdi-flip-h</v-icon>
                    Transfers
            </button>
             <v-divider style="max-height: 7px !important;min-height: 25px;margin-top: 20px;"
      class="mx-4"
      vertical
    ></v-divider>
              <button v-bind:class="{ undeline: selectedSubTab=='trash' }" class="buttonPro-font" @click="selectOption('trash')">
                <v-icon>mdi-delete-outline</v-icon>
                    Trash
            </button>
              
      </v-col>
      <v-col cols="3">
         <v-text-field
               
                    v-model="userSearchWord"
                    outlined
                    dense
                    class="beVietnamFont"
                    label="Search users here "
                    append-icon="mdi-magnify"
                    required
                ></v-text-field>
      </v-col>
       
        
       <v-col cols="12">
        <v-data-table
        show-select
        :search="userSearchWord"
        :hide-default-footer="true"
            :items="filteredEntityDetails"
            :headers="entityHeaders"
            @click:row="userRowClick"
            class="elevation-1 beVietnamFont"
         
        >
          <template v-slot:item.islocked="{ item }">
  
     <v-btn
     x-small
    @click.stop="checkLocked(item)"
              icon
              color="grey"
            >
              <v-icon>mdi-lock-outline</v-icon>
            </v-btn>
          </template>
              <template v-slot:item.restore="{ item }">
  
     <v-btn
     x-small
    @click.stop="checkDeletion(item)"
              icon
              color="grey"
            >
              <v-icon>mdi-restore</v-icon>
            </v-btn>
          </template>
             <template v-slot:item.isarchive="{ item }">
  
     <v-btn
     x-small
     @click.stop="checkArchieve(item)"
              icon
              color="grey"
            >
              <v-icon>mdi-archive-outline</v-icon>
            </v-btn>
          </template>
              <template v-slot:item.delete="{ item }">
  
     <v-btn
     x-small
   @click.stop="checkDeletion(item)"
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
        </v-data-table>

       </v-col>
           <v-col cols="12">
      <v-btn
      style="float:left;margin-left:50px"
   @click="resetDataTableLayout"
              icon
              color="#03A9F4"
            >
           
              <v-icon style="margin-top:10px">mdi-keyboard-backspace</v-icon>
               <p style="margin-top:12px">Back to Entities</p>
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
        file: '',
        userDetails:[],
        selectedSubTab:'',
    dragging: false,
        emailRules: [ v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid Email address' ],
        usersDetails:[{nameOfEntity:"IBULHSG",archieves:"Manager",lastLogin:'5 Hours ago',Lock:'online',locked:false,archieved:false,transfered:false},
        {nameOfEntity:"BHARTIAIRTEL",financialYear:'1/4/2020-31/3/2021',archieves:"Manager",lastLogin:'5 Hours ago',Lock:'online',locked:true,archieved:true,transfered:false},
        {nameOfEntity:"JMC PROJECTS",archieves:"Manager",lastLogin:'5 Hours ago',Lock:'online',locked:false,archieved:false,transfered:false}
        ],
        filteredEntityDetails:[],
        entityHeaders:[{
          text: 'Name of Entities',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Archieved',
          align: 'start',
          sortable: false,
          value: 'isarchive',
        },
     
        {
          text: 'Lock',
          align: 'start',
          sortable: false,
          value: 'islocked'
          
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
        showImportDialog:false,
        showTransferDialog:false,
        selectedInviteList:[],
        newEntityObject:{},
        availableEmails:["asimpremji@tecs.com","elonmust@tecs.com","bajlel@tecs.com","nee@tecs.com","asimpremji@tecs.com","elonmust@tecs.com"],
         userSearchWord:"",
         addEntityDialog:false,
         rules: {required: (value) => !!value || "Required.",confirmPassword:(value) => value==this.userObject.password || "Please Confirm Password"},
         userObject:{firtstName:"",email:"",lastName:"",emailID:"",archieves:"",nameOfEntity:"",password:""}
    
      }
    },
    async mounted(){
        this.userDetails = JSON.parse(sessionStorage.getItem("userData"))?JSON.parse(sessionStorage.getItem("userData")):{};
await this.getEntitiesList();
     
   
  

    },
    methods:{
      async resetDataTableLayout(){
this.selectedSubTab='';
this.getEntitiesList();
this.entityHeaders=[{
          text: 'Name of Entities',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Archieved',
          align: 'start',
          sortable: false,
          value: 'isarchive',
        },
     
        {
          text: 'Lock',
          align: 'start',
          sortable: false,
          value: 'islocked'
          
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
        }]
      },
      async checkArchieve(item){
        console.log(item,"item arch")
        if(item.isarchive==false||item.isarchive==null){
          var confirm= await this.$confirm("Are you sure you want to archieve "+item.name);
          if(confirm){
            this.archieveOrUnArchieve(item.id,true)
          }
          else{
            this.archieveOrUnArchieve(item.id,false)
          }
          console.log(confirm,"confirm")
        }
        else{
            confirm= await this.$confirm("Are you sure you want to Unarchieve "+item.name);
          if(confirm){
            this.archieveOrUnArchieve(item.id,false)
          }
          
        }
      

      },
            async checkDeletion(item){
        console.log(item,"item arch")
        if(item.istrash==false||item.istrash==null){
          var confirm= await this.$confirm("Are you sure you want to Delete "+item.name);
          if(confirm){
            this.DeleteOrRestore(item.id,true)
          }
          else{
            this.DeleteOrRestore(item.id,false)
          }
          console.log(confirm,"confirm")
        }
        else{
            confirm= await this.$confirm("Are you sure you want to Restore "+item.name);
          if(confirm){
            this.DeleteOrRestore(item.id,false)
          }
          
        }
      

      },
       async checkLocked(item){
        console.log(item,"item arch")
        if(item.islocked==false||item.islocked==null){
          var confirm= await this.$confirm("Are you sure you want to Lock "+item.name);
          if(confirm){
            this.lockOrUnlock(item.id,true)
          }
          else{
            this.lockOrUnlock(item.id,false)
          }
          console.log(confirm,"confirm")
        }
        else{
            confirm= await this.$confirm("Are you sure you want to Unlock "+item.name);
          if(confirm){
            this.lockOrUnlock(item.id,false)
          }
          
        }
      

      },
      async saveNewEntity(){
 if(this.$refs.addEntityForm.validate()){
   try{          //change server
                    var res = await this.$apiService.post('/entity/add',
                    {organizationId:sessionStorage.getItem("orgId"),name:this.newEntityObject.name,type:this.newEntityObject.orgType});
                    if(res&&res.status === 200) {
                   await this.getEntitiesList();
                   this.addEntityDialog=false;
        console.log(res.data.data,"userlist")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
   return;
      }
      },
            async archieveOrUnArchieve(id,value){

   try{          //change server
                    var res = await this.$apiService.post('/entity/archive',
                    {entityId:id,isArchive:value});
                    if(res&&res.status === 200) {
                   await this.getEntitiesList();
                 
        console.log(res.data.data,"arch list")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
  
      },
       async DeleteOrRestore(id,value){

   try{          //change server
                    var res = await this.$apiService.post('/entity/trash',
                    {entityId:id,isTrash:value});
                    if(res&&res.status === 200) {
                   await this.getEntitiesList();
                 
        console.log(res.data.data,"arch list")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
  
      },
      
      async lockOrUnlock(id,value){

   try{          //change server
                    var res = await this.$apiService.post('/entity/lock',
                    {entityId:id,isLocked:value});
                    if(res&&res.status === 200) {
                   await this.getEntitiesList();
                   this.selectOption(this.selectedSubTab)
                 
        console.log(res.data.data,"lock list")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
  
      },
      async getEntitiesList(){
 try{   //server change       
                    var res = await this.$apiService.post('http://13.234.27.65:8080/entity/getall',{organizationId:sessionStorage.getItem("orgId")});
                    if(res&&res.status === 200) {
                       this.usersDetails=res.data.data;
                    
                      if(!this.selectedSubTab||this.selectedSubTab=='active'){
this.filteredEntityDetails=this.usersDetails.filter(x=>x.isarchive==false&&x.islocked==false&&(x.istrash==false||x.istrash==null));
                         this.selectedSubTab='active';
                      }else{
                        this.selectOption(this.selectedSubTab);
                      }
                        
        console.log(res.data.data,"userlists")
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
      userRowClick(item){
          console.log(item,"doru")
        
         this.$router.push({ name: 'EntitiesFinancial',params: { selectedEntity: item}  }); 

      },
      selectOption(item){
       
if(item=='trash'){
  this.entityHeaders=[
    {
          text: 'Name of Entities',
          align: 'start',
          sortable: false,
          value: 'name',
        },
     
     
      
           {
          text: 'Deleted By',
          align: 'start',
          sortable: false,
          value: 'deletedby',
        },
            {
          text: 'Restore',
          align: 'start',
          sortable: false,
          value: 'restore',
        }
        
        ];
        this.selectedSubTab='trash';
        this.filteredEntityDetails=this.usersDetails.filter(x=>x.istrash==true);
}
else if(item=='archieved'){
  this.entityHeaders=[
    {
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
          text: 'Unarchieve',
          align: 'start',
          sortable: false,
          value: 'isarchive',
        }
        
        ];
        this.selectedSubTab='archieved';
        this.filteredEntityDetails=this.usersDetails.filter(x=>x.isarchive==true);
}
else if(item=='locked'){
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
          value: 'islocked',
        }];
        this.selectedSubTab='locked';
        this.filteredEntityDetails=this.usersDetails.filter(x=>x.islocked==true);
}

      },
          showAddUserPopUp(){
this.addEntityDialog=true;
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
  >>> .my-custom-dialog {
    align-self: flex-start;
  position:absolute;
  overflow: hidden;
    z-index:9999;
    right: 0px;
  }
  .undeline{
     border-bottom: 4px solid #2e94c4 !important;
     
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
  font-weight: 600 !important;
  margin-bottom:20px;
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
.company-popup{
    margin-top:9%;
    width: auto;
    background: white;
    border-radius: 5px;
    text-align: center;
}
.blueHead{
  margin-left: 20px !important;
  max-height: 65px;
  padding-bottom:10px;
  }
  .blueHeads{

max-height: 65px;
padding-bottom:10px;
border-bottom:3px solid #03A9F4;
}

p{
  margin: 0px ;
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
.beVietnamFont{
     font-family: Be Vietnam;
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

.blueUline {
  margin-top: 4px;
  width: 100%;
  border-top: 3px solid #03a9f4;
  border-color: #03a9f4 !important;
  min-width: 102%;
  margin-left: -12px;
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
  

  /deep/ .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 13px !important;
    font-weight: 600;
    background-color: #ecebeb;
    text-align: start !important;
   
    color: #808080;
}

/deep/.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    font-size: 13px !important;
    text-align: start !important;
  
}
/deep/.v-input--selection-controls{
  margin:0px !important;
}
</style>