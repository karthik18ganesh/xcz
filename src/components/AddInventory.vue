<template>
    <div>
      <v-dialog content-class="my-custom-dialog"
      v-model="addInventoryDialog"
      width="700"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          {{ header_name }}
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 8%;">
  <div style="display:flex;justify-content:space-evenly;width:600px">
    <v-text-field autocomplete="off" 
                            v-model="inventoryCode"
                            outlined
                            dense
                            label="Inventory Code"
                            class="dialog-text"
                            required
                             style="width:250px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="inventoryName"
                            outlined
                            dense
                            label="inventory Name"
                            class="dialog-text"
                            required
                             style="width:250px"
                        ></v-text-field>
    </div>
    <div>
      <p class="dialog-text" style="text-align:left">Closing Stock</p>
    <div style="display:flex;width:600px">
<v-text-field autocomplete="off" 
                            v-model="closingType"
                            outlined
                            dense
                            label="Unit Type"
                            class="dialog-text"
                            required
                             style="width:155px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="closingNumber"
                            outlined
                            dense
                            label="No.of Units"
                            class="dialog-text"
                            required
                             style="width:155px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="closingTotalValue"
                            outlined
                            dense
                            label="Total Value"
                            class="dialog-text"
                            required
                             style="width:155px"
                        ></v-text-field>
    </div>
    </div>
<div>
      <p class="dialog-text" style="text-align:left">Opening Stock</p>
    <div style="display:flex;width:600px">
<v-text-field autocomplete="off" 
                            v-model="openingType"
                            outlined
                            dense
                            label="Unit Type"
                            class="dialog-text"
                            required
                             style="width:155px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="openingNumber"
                            outlined
                            dense
                            label="No.of Units"
                            class="dialog-text"
                            required
                             style="width:155px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="openingTotalValue"
                            outlined
                            dense
                            label="Total Value"
                            class="dialog-text"
                            required
                             style="width:155px"
                        ></v-text-field>
    </div>
    </div>
                     
</v-layout>
<v-divider class="blueUline2"></v-divider>
<div style="display:flex;justify-content:center">
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="()=>{if(this.header_name == 'Edit Inventory')this.editInventory();else this.addInventory()}"
            >
                {{header_name == 'Edit Inventory'?"Update":"Add"}}
            </v-btn>
            <v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="cancelInvestment()"
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
        
        <v-card
        max-width="100%"
        class="table-align"
        >
        <v-card-title>
            <button class="buttonDir-font" @click="addInventoryData()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Add Inventory
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
            :items="inventory"
            :single-select="singleSelect"
            show-select
            class="elevation-1 table-font"
            loading="Loading...."
        >
        <template
   
        v-slot:header="{ props: { headers } }"
      >
        <thead :colspan="headers.length">
          <tr>
            <th style="font-size:18px;">
              Inventory Code
            </th>
            <th style="font-size:18px;">
              Inventory Name
            </th>
            <th>
              <p style="text-align:center;font-size:18px;">Opening Stock</p>
              <div style="display:flex;justify-content:space-evenly">
            <td  style="font-size:18px;width:3rem;margin-left:2rem">Units</td>
            <td  style="font-size:18px !important;width:3rem;">Type</td>
            <td  style="font-size:18px !important;width:7rem;">Total Value</td>
            </div>
            </th>
            <th>
              <p style="text-align:center;font-size:18px">Closing Stock</p>
              <div style="display:flex;justify-content:space-evenly">
            <td  style="font-size:18px;width:3rem;margin-left:2rem">Units</td>
            <td  style="font-size:18px !important;width:3rem;">Type</td>
            <td  style="font-size:18px !important;width:7rem;">Total Value</td>
            </div>
            </th>
            <th style="font-size:18px !important;">
              Valuation Method
            </th>
          </tr>
        </thead>
      </template>
      
<template v-slot:item="{ item }">

  <tr>
    <td>{{item.inventoryCode}}</td>
    <td>{{item.inventoryName}}</td>
    <td>{{item.openingNumber}}</td>
    <td>{{item.openingType}}</td>
    <td>{{item.openingTotalValue}}</td>
    <td>{{item.closingNumber}}</td>
    <td>{{item.closingType}}</td>
    <td>{{item.closingTotalValue}}</td>
    <td>{{}}</td>
    </tr>

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
        addInventoryDialog:false,
        inventoryCode:"",
        inventoryName:"",
        openingType:"",
        openingNumber:"",
        openingTotalValue:"",
        closingType:"",
        closingNumber:"",
        closingTotalValue:"",
        openingValuationMethod:"",
        closingValuationMethod:"",
        selectedInventoryCategory:{},
        selectedInventory:{},
        inventory: [
          {
             inventoryCode:'Traded Goods',
             inventoryType:'Traded Goods',
            openingStock:'Tables',
            closingStock:'10,000',
            valuationMethod:'NRV',
          },
        ],
        headers:[
                {text:'Inventory Code' , value:'inventoryCode', align: 'center'},
                {text:'Inventory Name' , value:'inventoryName', align: 'center'},
                {text:'Opening Stock' , value:'openingStock', align: 'center'},
                {text:'Closing Stock' , value:'closingStock', align: 'center'},
                {text:'Valuation Method' , value:'valuationMethod', align: 'center'},
                {text:'' , value:'actions', align: 'center', sortable: false}
            ],
      }
    },
         async mounted() {
         this.selectedInventoryCategory = this.$route.params.categoryData;
    var res = await this.$apiService.post(
          "/inventory/get",
          {"inventoryCategoryId":this.selectedInventoryCategory.inventoryCategoryId}
        );
        if (res && res.status === 200) {
            console.log(res,"ressss")
          res.data.data.map((val,idx) => {              
              this.inventory.push({
              inventoryCode: val.inventoryCode,
              inventoryName: val.name,
              openingType: val.openingstock.type,
              openingNumber:val.openingstock.units,
              openingTotalValue:val.openingstock.totalvalue,
              openingValuationMethod:val.openingstock.valuationMethod,
              closingType: val.closingstock.type,
              closingNumber:val.closingstock.units,
              closingTotalValue:val.closingstock.totalvalue,
              closingValuationMethod:val.closingstock.valuationMethod,
              inventoryId: val.id,
              index:idx,
            });
          });
          console.log(this.inventory,"check")
        }
  },
        methods:{
async addInventory(){
  console.log(this.selectedInventoryCategory,"yesss")
       const newInventoryDetails = {
        inventoryCategoryId:this.selectedInventoryCategory.inventoryCategoryId,
    code:this.inventoryCode,
    name:this.inventoryName,
    closingStock:{
        units:this.closingNumber,
        type:this.closingType,
        totalvalue:this.closingTotalValue,
        valuationMethod:this.selectedInventoryCategory.categoryValuationMethod
    },"openingStock":{
        units:this.openingNumber,
        type:this.openingType,
        totalvalue:this.openingTotalValue,
        valuationMethod:this.selectedInventoryCategory.categoryValuationMethod
    }
      };

        var res = await this.$apiService.post(
          "/inventory",
          newInventoryDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
            //       this.investments.push({
            //   entityName:this.entityName,
            //   investmentType:this.investmentType,
            //   secondaryType:this.secondaryType,
            //   purchaseDate:moment(String(this.purchaseDate)).format("DD-MM-YYYY"),
            //   unitNumber:this.unitNumber,
            //   purchaseCost:this.purchaseCost,
            //   marketValue:this.marketValue,
            //   investmentId:res.data.data[0].id,
            //   index:this.investments.length
            // });
          this.addInventoryDialog=false;
        }
        else{
          this.addInventoryDialog=false;
        }
    
},
async editInventory(){
       const newInventoryDetails = {
        inventoryId:this.selectedInventory.inventoryId,
    code:this.inventoryCode,
    name:this.inventoryName,
    closingStock:{
        units:this.closingNumber,
        type:this.closingType,
        totalvalue:this.closingTotalValue,
        valuationMethod:this.closingValuationMethod
    },openingStock:{
        units:this.openingNumber,
        type:this.openingType,
        totalvalue:this.openingTotalValue,
        valuationMethod:this.openingValuationMethod
    }
      };

        var res = await this.$apiService.put(
          "/inventory",
          newInventoryDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
            //       this.investments.push({
            //   entityName:this.entityName,
            //   investmentType:this.investmentType,
            //   secondaryType:this.secondaryType,
            //   purchaseDate:moment(String(this.purchaseDate)).format("DD-MM-YYYY"),
            //   unitNumber:this.unitNumber,
            //   purchaseCost:this.purchaseCost,
            //   marketValue:this.marketValue,
            //   investmentId:res.data.data[0].id,
            //   index:this.investments.length
            // });
          this.addInventoryDialog=false;
        }
        else{
          this.addInventoryDialog=false;
        }
    
},
editItem(item){
  console.log(item,"itemmm");
         this.header_name = "Edit Inventory";
          this.inventoryDialog=true;
          this.inventoryCode=item.inventoryCode;
          this.inventoryName=item.inventoryName;
          this.selectedInventory=item;
          console.log(item);
      },
       async deleteItem(item) {
      const deleteInventoryDetails = {
        inventoryId: item.inventoryId
      };

        var res = await this.$apiService.post(
          "/inventory/delete",
          deleteInventoryDetails
        );
        if (res && res.status === 200) {
            console.log(res,"delete res");
        //   this.securities.splice(this.selectedSecurity.index,1);
        //   this.calcTopTable();
        }
    },
addInventoryData(){
  this.header_name = "Add Inventory";
    this.addInventoryDialog=true;
}
    },
  }
</script>

<style scoped>
>>> .my-custom-dialog {
    align-self: flex-end;
  position:absolute;
  
    z-index:9999;
    right: 0px;
    margin-bottom:18%;
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
.dialog-text{
font-size: 18px !important;
font-style: normal;
font-weight: 400;
margin-right:2%;
}
  .blueUline2{
    width:100%;
    border-top: 2px solid #03a9f4;
    border-color:#0398DC !important;
}
</style>