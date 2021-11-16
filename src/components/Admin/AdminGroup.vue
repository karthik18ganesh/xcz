<template>
 <div style="height:100%">
 <v-container fluid>
       <v-dialog
    content-class="invite-Dialogue"
      v-model="showAddGroupPopup"
      width="520"
    
      transition="dialog-bottom-transition"
    >
   
 <v-form ref="groupForm" style="width:100%">
      <v-card class="pa-2">
      
        <v-card-title class="theUsualHead" >
      
<v-row>
 
    <v-col cols="12" class="text-left mt-3">
         <h4>  Create Group</h4>
    </v-col>
    <v-col cols="12" class="mt-3">
          <v-text-field
                :rules="[v => !!v || 'Group Name is required']"
                    v-model="newGroupObject.groupName"
                    outlined
                    dense
                    
                    label="Group Name"
                    required
                ></v-text-field>
    </v-col>
</v-row>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="pa-1 ma-2">
              <p style="float:left">Assign Users</p>
            </v-col>
          </v-row>
            <v-row>
          <v-col cols="12">
           
         
        <v-autocomplete
         v-model="newGroupObject.selectedUsers"
            :rules="[v =>!!v&& Object.keys(v).length!=0 || 'Select users']"
           class="dotted"
           return-object
                      :items="userList"
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
                  @click:close="remove(data.item)"
                >
                
                  {{ data.item.username }}
                </v-chip>
              </template>
        </v-autocomplete>
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
               @click="saveGroup"
            >
                Add
            </v-btn>
            </v-col>
          </v-row>
     
        </v-card-actions>
      </v-card>
 </v-form>
    </v-dialog>
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
  <v-row  style="margin-left: 20px;margin-right:20px">
      <v-col cols="12" class="text-left tableClass" style="margin-top: 25px;">
          <p>You can add group from this page and manage each group and persons associating with a financial or project</p>
      </v-col>
    <v-col cols="9" class="d-flex flex-row" style="margin-top: 10px;margin-bottom: 0px;">
    <button class="buttonPro-font" @click="showAddGroupPopup=!showAddGroupPopup" >
                <v-icon>mdi-plus</v-icon>
                    Create Group
            </button>
             <v-divider  style="max-height: 7px !important;min-height: 19px;margin-top: 8px;"
      class="mx-4"
      vertical
    ></v-divider>  
          <button class="buttonPro-font" >
                <v-icon>mdi-delete</v-icon>
                    Delete
            </button>
              
      </v-col>
      <v-col cols="12">
            <v-card
         
          flat
        >
          <v-card-text style="padding-left: 0px;">
          <v-simple-table class="tableClass" style="width:100vw">
    <template v-slot:default>
      <thead>
        <tr width="700" class="grey lighten-4">
            <th>         <v-checkbox
                      
                    ></v-checkbox></th>
          <th class="text-left text--primary">
            Name of the group
          </th>
          <th width="700" class="text-left text--primary">
            Members
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(group,index) in groupsArray"
          :key="group.groupName"
          v-bind:class="{ striped: index%2!=0 }"
        >
        <td> <v-checkbox style="margin:0px"
                   hide-details
                    ></v-checkbox></td>
          <td  class="text-left" >{{group.name}}</td>
          <td class="text-left" style="display:flex;align-items:center">
          <p style="margin-top:8px">  {{group.userdetails&&group.userdetails.length}} Members </p>
           
              <v-menu
                offset-y
                bottom
                left
      v-model="group.expand"
      :close-on-content-click="false"
     
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        icon
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon> mdi-chevron-down</v-icon>
         
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-text-field
                dense
               solo
               flat
                prepend-icon="mdi-magnify"
                class="text-field-class"
                placeholder="Search here"
                v-model="group.searchWord"
                @input="onChangeUSerSearch(group)"
                hide-details
            >
            </v-text-field>
          </v-list-item>
        </v-list>

        <v-divider  color="#03A9F4"></v-divider>

        <v-list>
          <v-list-item v-for="item in group.userdetails" :key="item" >
         <v-list-item-icon>
          <v-icon v-if="!item.isCrown" disabled="true">mdi-crown-outline</v-icon>
           <v-icon v-if="item.isCrown" color="#e7b61f" >mdi-crown</v-icon>
        </v-list-item-icon>
            <v-list-item-title>{{item.userName}}</v-list-item-title>
               <v-list-item-icon>
          <v-icon @click="removeCrown(item.userId,group.id)" v-if="item.isCrown">mdi-minus-circle-outline</v-icon>
           <v-icon @click="assignCrown(item.userId,group.id)" v-if="!item.isCrown">mdi-plus-circle-outline</v-icon>
        </v-list-item-icon>
          </v-list-item>

       
        </v-list>

     
      </v-card>
    </v-menu>
          </td>
          <td>
            <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
                <v-icon color="grey"  v-bind="attrs"
                v-on="on" dark>mdi-dots-vertical</v-icon>
            </template>
            <v-list>
              <v-list-item
              >
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
               <v-list-item
              >
                <v-list-item-title @click="saveAllLedgers(group)">Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
        </v-card>
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
        search:'',
         userDetails:{},
          newGroupObject:{availableus:['Gayathri','Sree Sankar'],selectedUsers:[]},
          showAddGroupPopup:false,
      groupsArray:[{groupName:"Group 1",members:['Sasi','Tinto','Ram','Byju'],count:5},
      {groupName:"Group 2",members:['Jambo','Shukkoor','Ram','Byju'],count:3},
       {groupName:"Group 3",members:['Jambo','Shukkoor','Ram','Byju'],count:6}
      ]
    
      }
    },
    async mounted(){
       this.userDetails = JSON.parse(sessionStorage.getItem("userData"))?JSON.parse(sessionStorage.getItem("userData")):{};
      this.userList = JSON.parse(sessionStorage.getItem("userList"));
      await this.getGroupList();
console.log("mt", this.userDetails)
    },
    computed: {
        filteredItems(item) {
          return item.usernames;
        }
    },
    methods:{
      
       async  assignCrown(userid,groupid){
        var updateObj={
    "groupId":groupid,
    "userid":userid,
    "isCrown":true
};
 try{      
               
 
                  
                    var res = await this.$apiService.put('/organization/group/crown',updateObj);
                    if(res&&res.status === 200) {
                      this.getGroupList();
                     
                     
                     
                      
                    
                      // this.$store.commit("setUserData",res.data.userData[0]);
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }

console.log(groupid,userid,"shu")
      },
     async  removeCrown(userid,groupid){
        var updateObj={
    "groupId":groupid,
    "userid":userid,
    "isCrown":false
};
 try{      
               
 
                  
                    var res = await this.$apiService.put('/organization/group/crown',updateObj);
                    if(res&&res.status === 200) {
                      this.getGroupList();
                     
                     
                     
                      
                    
                      // this.$store.commit("setUserData",res.data.userData[0]);
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }

console.log(groupid,userid,"shu")
      },
      onChangeUSerSearch(item){
        // eslint-disable-next-line no-debugger
     
         var index=   this.groupsArray.findIndex(x=>x==item);
         this.groupsArray[index].filteredUserNames=this.groupsArray[index].usersname.filter(x=>x.includes(item.searchWord));
console.log(item,"plu")
      },
      async getItems(item){
        console.log(item,"sam")
        return item.username;

      },
      async getGroupList(){
try{      
              
                    var res = await this.$apiService.get(`/organization/group?organizationId=${sessionStorage.getItem("orgId")}`);
                    if(res&&res.status === 200) {
                      this.groupsArray=res.data.data;
                      this.groupsArray=this.groupsArray.map(item => ({...item,filteredUserNames:item.usersname,searchWord:'',expand:false}));
                      console.log(this.groupsArray,"filteredUserName")
                    
                      
                 
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
     async saveGroup(){
if(!this.$refs.groupForm.validate()){
          return;
        }
     
              try{      
                let updateObject={} ;
                   updateObject.organizationId=sessionStorage.getItem("orgId");
                   updateObject.name=this.newGroupObject.groupName;
                    updateObject.users=[];
                    updateObject.usersName=[];
                    this.newGroupObject.selectedUsers.map(val=>updateObject.users.push(val.id));
                     this.newGroupObject.selectedUsers.map(val=>updateObject.usersName.push(val.username));
 
                  
                    var res = await this.$apiService.post('/organization/group',updateObject);
                    if(res&&res.status === 200) {
                      this.getGroupList();
                       this.$refs.groupForm.reset();
                      this.showAddGroupPopup=false;
                     
                      
                    
                      // this.$store.commit("setUserData",res.data.userData[0]);
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
      },
       remove (item) {
        
     
        const index = this.newGroupObject.selectedUsers.indexOf(item)
        if (index >= 0) this.newGroupObject.selectedUsers.splice(index, 1)
      }
      
    },
  }
</script>

<style scoped>
.imgdiv{
  height:100%
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
.tableClass{
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
.blueHead{
  margin-left: 20px !important;
  max-height: 65px;
  padding-bottom:10px;
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
.theUsualHead{
  color: #03A9F4;
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
.buttonPro-font{
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

</style>