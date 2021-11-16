<template>
    <div>
        <v-dialog content-class="my-custom-dialog"
      v-model="addMethodDialog"
      width="500"
      height="800"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          FA Method
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
<v-select
                    v-model="fapolicy.depreciationMethod"
                    :items="depreciation_items"
                    outlined
                    style="width:373px"
                    dense
                    label="Depreciation Method"
                    required
                ></v-select>
                 <v-layout>
            <v-flex xs5 style="display:flex;align-items:center;margin-top:1%;margin-right:5%">
            <p class="toggle-text">Apply Standard Assets life & Salvage Value</p>
            </v-flex>
             <v-flex xs1>
                    <v-switch
                       v-model="fapolicy.isStandardAsset"
                    >
                    <template v-slot:label>
                    Yes
                    </template>
                    </v-switch>
                </v-flex>
            </v-layout>
            <v-layout style="display:flex;justify-content:space-between">
              <v-flex xs4 style="margin-right:3%">
                <p>Useful Life in Years</p>
                <v-text-field autocomplete="off" 
                            v-model="useLife"
                            outlined
                            dense
                            class="dialog-text"
                            required
                             style="width:250px"
                        ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <p>Salvage in %</p>
                <v-text-field autocomplete="off" 
                            v-model="salvage"
                            outlined
                            dense
                            class="dialog-text"
                            required
                             style="width:250px"
                        ></v-text-field>
              </v-flex>
            </v-layout>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<div style="display:flex;justify-content:center">
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="setFAMethod()"
            >
                Set
            </v-btn>
            <v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="cancelFAMethod()"
            >
                Cancel
            </v-btn>
</div>
        </v-dialog>
    <v-dialog content-class="my-custom-dialog"
      v-model="fixedAssetDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          Fixed Asset Policy
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
<v-select
                    v-model="fapolicy.depreciationMethod"
                    :items="depreciation_items"
                    outlined
                    style="width:373px"
                    dense
                    label="Depreciation Method"
                    required
                ></v-select>
                 <v-layout>
            <v-flex xs5 style="display:flex;align-items:center;margin-top:1%;margin-right:5%">
            <p class="toggle-text">Apply Standard Assets life & Salvage Value</p>
            </v-flex>
             <v-flex xs1>
                    <v-switch
                       v-model="fapolicy.isStandardAsset"
                    >
                    <template v-slot:label>
                    Yes
                    </template>
                    </v-switch>
                </v-flex>
            </v-layout>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<div style="display:flex;justify-content:center">
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="setFAPolicy()"
            >
                Set
            </v-btn>
            <v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="cancelFAPolicy()"
            >
                Cancel
            </v-btn>
</div>
        </v-dialog>
        <v-dialog content-class="my-custom-dialog"
      v-model="fixedAssetGroupDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          {{ header_name }}
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
<v-select
                    v-model="assetClass"
                    :items="assetclass_items"
                    outlined
                    style="width:373px"
                    dense
                    label="Asset Class"
                    required
                ></v-select>
   <v-select
                    v-model="assetGroup"
                    :items="assetgroup_items"
                    outlined
                    style="width:373px"
                    dense
                    label="Asset Group"
                    required
                ></v-select>  
                <v-text-field autocomplete="off" 
                            v-model="assetCategory"
                            outlined
                            dense
                             style="width:373px;"
                            label="Asset Category"
                            required
                        ></v-text-field>          
</v-layout>
<v-divider class="blueUline2"></v-divider>
<div style="display:flex;justify-content:center">
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="()=>{if(this.header_name == 'Edit Fixed Asset Groups')this.editFAGroup();else this.addFAGroup()}"
            >
               {{header_name == 'Edit Fixed Asset Groups'?"Update":"Add"}}
            </v-btn>
        
            <v-btn
                class="ma-2 button-font"
                outlined
                color="indigo"
                style="background-color: none !important;border-color:#0398DC !important; text-transform:none;color:#0398DC !important"
                 @click="cancelFAGroup()"
            >
                Cancel
            </v-btn>
</div>
        </v-dialog>
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
        <div>
        <v-layout style="margin-top:2rem;margin-bottom:1rem;width:100%">
        <v-flex  style="display:flex;justify-content:space-evenly;min-width:25%;max-width:25%">
        <p class="label-font">Depreciation Method</p>
        <p class="text-font">{{fapolicy.depreciationMethod}}</p>
        </v-flex>
        </v-layout>
        </div>
        <v-divider class="grey-divider"></v-divider>
                <div style="margin-top:2%;margin-bottom:2%">
        <v-simple-table class="table-simple v-data-table__divider">
         <template v-slot:default>
      <thead style="margin-left:2%">
        <tr style="background:rgba(3, 152, 220, 0.15);height:71px;border:2px solid red">
        <th class="text-left tablesimple-header" style="border-right:1px solid white">
        Asset Group
        </th>
          <th class="text-left tablesimple-header" style="border-right:1px solid white">
            Op.Gross Balance
          </th>
          <th class="text-left tablesimple-header" style="border-right:1px solid white">
            Additions
          </th>
          <th class="text-left tablesimple-header" style="border-right:1px solid white">
            Deletions
          </th>
          <th class="text-left tablesimple-header" style="border-right:1px solid white">
            Closing Balance
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
          style="background:#B6AEAE40;"
        >
          <td class="row-font" style="border-right:1px solid white">Content</td>
          <td style="border-right:1px solid white">{{ item.grossBalance }}</td>
          <td style="border-right:1px solid white">{{ item.additions }}</td>
          <td style="border-right:1px solid white">{{ item.deletions}}</td>
          <td style="border-right:1px solid white">{{ item.closingBalance }}</td>
        </tr>
      </tbody>
    </template>
        </v-simple-table>
        </div>
        <v-card
        max-width="100%"
        class="table-align"
        >
        <v-card-title>
            <button class="buttonDir-font" @click="setFAPolicy()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Set FA Policy
            </button>
             <v-divider
            inset
            vertical
            style="max-height:25px;color: #C4C4C4;"
            ></v-divider>
            <button class="buttonDir-font" @click="addFAGroupData()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    FA Groups
            </button>
             <v-divider
            inset
            vertical
            style="max-height:25px;color: #C4C4C4;"
            ></v-divider>
            <button class="buttonDir-font">
                <v-icon style="color:black">mdi-arrow-collapse-down</v-icon>
                    Import
            </button>
             <v-divider
            inset
            vertical
            style="max-height:25px;color: #C4C4C4;"
            ></v-divider>
            <button class="buttonDir-font">
                <v-icon style="color:black">mdi-arrow-collapse-up</v-icon>
                    Export
            </button>
             <v-divider
            inset
            vertical
            style="max-height:25px;color: #C4C4C4;"
            ></v-divider>
            <button class="buttonDir-font">
                <v-icon small style="color:black">far fa-trash-alt</v-icon>
                    Delete
            </button>

            <v-spacer></v-spacer>

            <v-text-field autocomplete="off" 
                dense
                outlined
                append-icon="mdi-magnify"
                class="text-field-class"
                placeholder="Search here"
                v-model="search"
                @input="onChangeSearch"
                hide-details=false
            >
            </v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="fagroup"
            :single-select="singleSelect"
            show-select
            class="elevation-1 table-font"
            loading="Loading...."
             @click:row="assetGroupRowClick"
        >
<template v-slot:item.faMethod="{ item }" >
  <button class="action-button"  @click.stop.prevent @click="addMethod(item)">
                    {{item.faMethod}}
            </button>
</template>
        <template v-slot:item.actions="{ item }" >
      <div style="display:flex;justify-content:space-between;align-items:center;margin-right:1rem">
      
           <v-menu bottom offset-y="true" right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  style="color:black;width:3px;height:3px;font"
                  >mdi-dots-vertical</v-icon
                >
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title @click="(e)=>editItem(item)"
                    ><v-icon style="margin-right: 5px"
                      >mdi-pencil-outline</v-icon
                    >Edit</v-list-item-title
                  >
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title @click="deleteItem(item)"
                    ><v-icon style="margin-right: 5px"
                      >mdi-delete-outline</v-icon
                    >Delete</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
      </div>
    </template>
        </v-data-table>
            
        </v-card>
    </div>
</template>


<script>
  export default {
    data () {
      return {
        fixedAssetDialog:false,
        fixedAssetGroupDialog:false,
        addMethodDialog:false,
        fagroup:[],
        fapolicy:{},
        assetClass:"",
        assetGroup:"",
        assetCategory:"",
        selectedAssetGroup:{},
        depreciation_items:[
        "Written Down Value",
        "Straight Line Method (SLM)"
        ],
        assetclass_items:[
        "Tangible",
        "Intangible",
        "Capital Work in Progress",
        "Intangible Assets under Dev..."
        ],
        assetgroup_items:[
          "Land",
          "Building",
          "Plant and Equipment",
          "Furniture and fixtures",
          "Vehicles",
          "Office equipment",
          "Leasehold improvements",
          "Other tangible assets"
        ],
        desserts: [
          {
             grossBalance:'2,000',
            additions:'1,000',
            deletions:'1,000',
            closingBalance:'2,000',
          },
          {
             grossBalance:'2,000',
            additions:'1,000',
            deletions:'1,000',
            closingBalance:'2,000',
          },
          {
            grossBalance:'2,000',
            additions:'1,000',
            deletions:'1,000',
            closingBalance:'2,000',
          },
          {
            grossBalance:'2,000',
            additions:'1,000',
            deletions:'1,000',
            closingBalance:'2,000',
          },
        ],
        headers:[
                {text:'Asset Class' , value:'assetClass', align: 'center'},
                {text:'Asset Group' , value:'assetGroup', align: 'center'},
                {text:'Asset Category' , value:'assetCategory', align: 'center'},
                {text:'FA Method' , value:'faMethod', align: 'center', sortable: false},
                {text:'' , value:'actions', align: 'center', sortable: false}
            ],
      }
    },
     async mounted() {
    var res = await this.$apiService.post(
          "/fixedasset/getgroup",
          {financialId:Number(sessionStorage.getItem("financialId"))}
        );
        if (res && res.status === 200) {
            console.log(res,"ressss")
          res.data.data.forEach((val,idx) => {              
              this.fagroup.push({
              assetClass: val.assetClass,
              assetGroup: val.assetGroup,
              assetCategory: val.assetCategory,
              faMethod: val.faMethod,
              faMethodDetails: val.faMethodDetails,
              faGroupId:val.id,
              index:idx
            });
          });
        }
   var res1= await this.$apiService.post(
          "/fixedasset/getpolicy",
          {financialId:Number(sessionStorage.getItem("financialId"))}
        );
        if (res1 && res1.status === 200) {
            console.log(res1.data.data,"ressss1")            
                       if(res1.data.data.faPolicy)
            {
this.fapolicy=res1.data.data.faPolicy;
            }    
            else{
              this.fapolicy.depreciationMethod="";
              this.fapolicy.isStandardAsset=false;
            }       

        }
        console.log(this.fapolicy,this.fagroup,"policyyyy")
  },
    methods:{
async setFAPolicy(){
  this.fixedAssetDialog=true;
},
addFAGroupData(){
  this.header_name="Add Fixed Asset Groups"
  this.fixedAssetGroupDialog=true;
  this.assetClass="";
  this.assetGroup="";
  this.assetCategory="";
},
addMethod(){
this.addMethodDialog=true;
},
cancelFAMethod(){
this.addMethodDialog=false;
},
cancelFAPolicy(){
this.fixedAssetDialog=false;
},
cancelFAGroup(){
this.fixedAssetGroupDialog=false;
},
async addFAGroup(){
       const newFAGroupDetails = {
financialId:Number(sessionStorage.getItem("financialId")),
companyId:Number(sessionStorage.getItem("companyId")),
assetClass:this.assetClass,
assetGroup:this.assetGroup,
assetCategory:this.assetCategory
    }

        var res = await this.$apiService.post(
          "/fixedasset/creategroup",
          newFAGroupDetails
        );
        if (res && res.status === 200) {
            console.log(res.data,"yipppeee")
            this.fagroup.push({
              assetClass: this.assetClass,
              assetGroup: this.assetGroup,
              assetCategory: this.assetCategory,
              faMethod: this.faMethod,
              faMethodDetails: this.faMethodDetails,
              faGroupId:res.data.faGroupId,
              index:this.fagroup.length
            });
            this.fixedAssetGroupDialog=false;
        }
        else{
          this.fixedAssetGroupDialog=false;
        }
    
},
async editFAGroup(){
       const newFAGroupDetails = {
faGroupId:this.selectedAssetGroup.faGroupId,
assetClass:this.assetClass,
assetGroup:this.assetGroup,
assetCategory:this.assetCategory
    }

        var res = await this.$apiService.put(
          "/fixedasset/updategroup",
          newFAGroupDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
            this.fagroup[this.selectedAssetGroup.index].assetClass = this.assetClass;
          this.fagroup[this.selectedAssetGroup.index].assetGroup = this.assetGroup;
          this.fagroup[this.selectedAssetGroup.index].assetCategory = this.assetCategory;
          this.fixedAssetGroupDialog=false;
        }
        else{
          this.fixedAssetGroupDialog=false;
        }
    
},
 assetGroupRowClick(e) { 
      this.$router.push({
        name: "ManagementAdd",
        params: { groupData: e },
      });
    },
editItem(item){
  console.log(item,"itemmm");
         this.header_name = "Edit Fixed Asset Groups";
          this.fixedAssetGroupDialog=true;
          this.assetCategory=item.assetCategory;
          this.assetGroup=item.assetGroup;
          this.assetClass=item.assetClass;
          this.selectedAssetGroup=item;
          console.log(item);
      },
       async deleteItem(item) {
      const deleteAssetGroupDetails = {
        faGroupId: item.faGroupId
      };

        var res = await this.$apiService.post(
          "/fixedasset/deletegroup",
          deleteAssetGroupDetails
        );
        if (res && res.status === 200) {
            console.log(res,"delete res");
           this.fagroup.splice(this.selectedAssetGroup.index,1);
        }
    },
    }
  }
</script>

<style scoped>
>>> .my-custom-dialog {
    align-self: flex-end;
  position:absolute;
  
    z-index:9999;
    right: 0px;
    margin-bottom:17%;
    background:white !important;
    overflow:hidden;
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
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.buttonDir-font{

font-size: 18px !important;
font-style: normal;
font-weight: 400;
color:black;
margin-right:2%;
margin-left:2%;
}
.table-align{
    margin-top: 20px;
}
.table-simple{
display:flex;
justify-content:center;
height:315px;
}
.row-font{
font-size: 18px !important;
font-style: normal;
font-weight: 400;
}
.tablesimple-header{
font-size: 18px !important;
font-style: normal;
font-weight: 700;
}
.table.v-table thead th {
font-size: 18px !important;
font-style: normal !important;
font-weight: 500 !important;
}
.grey-divider{
    width:100%;
    border-top: 1px solid #C4C4C4;
    border-color:#C4C4C4 !important;
}
.label-font{
font-size: 18px !important;
font-style: normal;
font-weight: 700;
color:#0398DC;
}
.text-font{
font-size: 18px !important;
font-style: normal;
font-weight: 500;
}
.popup-allotment-title{
font-style: normal;
font-weight: 700 !important;
color:#0398DC;
margin:5% 3% 3% 13%;
text-align:initial;
}
.button-font{
    
font-size: 18px !important;
font-style: normal;
font-weight: 500;
width:118px;
height:42px;
margin-bottom:4%;
}
.toggle-text{
font-size: 18px !important;
font-style: normal;
font-weight: 400 !important;
color:#2E3A59 !important;
}
.blueUline2{
    width:100%;
    border-top: 3px solid #03a9f4;
    border-color:#0398DC !important;
    margin-bottom:2%
}
.action-button{
  color:#0398DC;

}
</style>