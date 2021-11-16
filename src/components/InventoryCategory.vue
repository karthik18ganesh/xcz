<template>
    <div>
        <v-dialog content-class="my-custom-dialog"
      v-model="inventoryCategoryDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
         {{ header_name }}
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
                        <v-select
                    v-model="categoryClass"
                    :items="inventoryclass_items"
                    class="dialog-text"
                    outlined
                    style="width:373px"
                    dense
                    label="Inventory Class"
                    required
                ></v-select>
                <v-select
                    v-model="categoryDescription"
                    :items="description_items"
                    class="dialog-text"
                    outlined
                    style="width:373px"
                    dense
                    label="Description"
                    required
                ></v-select>
                 <v-select
                    v-model="categoryTotalValue"
                    :items="totalvalue_items"
                    class="dialog-text"
                    outlined
                    style="width:373px"
                    dense
                    label="Total Value"
                    required
                ></v-select>
                 <v-select
                    v-model="categoryValuationMethod"
                    :items="valuationmethod_items"
                    class="dialog-text"
                    outlined
                    style="width:373px"
                    dense
                    label="Valuation Method"
                    required
                ></v-select>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<div style="display:flex;justify-content:center">
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="()=>{if(this.header_name == 'Edit Investment Group')this.editInventoryCategory();else this.addInventoryCategory()}"
            >
                {{header_name == 'Edit Inventory Category'?"Update":"Add"}}
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
            <button class="buttonDir-font" @click="addInventoryCategoryData()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Inventory Category
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
            :items="inventorycategory"
            :single-select="singleSelect"
            show-select
            class="elevation-1 table-font"
            loading="Loading...."
            @click:row="categoryRowClick"
        >

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
        inventoryCategoryDialog:false,
        header_name: "",
        categoryClass:"",
        categoryDescription:"",
        categoryTotalValue:"",
        categoryValuationMethod:"",
        selectedInventoryCategory:{},
           inventoryclass_items: [
                'Current Inventory',
                'Proprietor',
                'Partnership'
            ],
                description_items: [
                'LLP',
                'HUF',
                'Trust',
                'Investmnet in subsidiary',
                 'Body Corporate',
            ],
                totalvalue_items: [
                200,300,400
            ],
                valuationmethod_items: [
                'LLP',
                'NRV',
                'Trust',
            ],
        inventorycategory:[],
        headers:[
                {text:'Inventory Class' , value:'categoryClass', align: 'center'},
                {text:'Description' , value:'categoryDescription', align: 'center'},
                {text:'Total Value' , value:'categoryTotalValue', align: 'center'},
                {text:'Valuation Method' , value:'categoryValuationMethod', align: 'center'},
                {text:'' , value:'actions', align: 'center', sortable: false}
            ],
      }
    },
    async mounted() {
    var res = await this.$apiService.post(
          "/inventory/category/get",
          {companyId:Number(sessionStorage.getItem("companyId")),financialId:Number(sessionStorage.getItem("financialId"))}
        );
        if (res && res.status === 200) {
            console.log(res,"ressss")
          res.data.data.forEach((val,idx) => {              
              this.inventorycategory.push({
              categoryClass: val.inventoryclass,
              categoryDescription: val.description,
              categoryTotalValue: val.totalvalue,
              categoryValuationMethod: val.valuationmethod,
              inventoryCategoryId: val.id,
              index:idx
            });
          });
        }
  },
    methods:{
addInventoryCategoryData(){
    this.header_name = "Add Inventory Category";
    this.inventoryCategoryDialog=true;
},
async addInventoryCategory(){
    const  newInventoryCategoryDetails = {
        inventoryClass:this.categoryClass,
    description:this.categoryDescription,
    totalValue:this.categoryTotalValue,
    valuationMethod:this.categoryValuationMethod,
        companyId:Number(sessionStorage.getItem("companyId")),financialId:Number(sessionStorage.getItem("financialId"))
      };

        var res = await this.$apiService.post(
          "/inventory/category",
           newInventoryCategoryDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
        //    this.securities.push({
        //     securityType: this.securityType,
        //     classType: this.classType,
        //     faceValue: this.faceValue,
        //     issues: 0,
        //     authShares: this.noOfShares,
        //     securityId: res.data.data[0].id,
        //     index:this.securities.length,allissues:[]
        //   });
        //   this.calcTopTable();
          this.inventoryCategoryDialog=false;
        }
        else{
          this.inventoryCategoryDialog=false;
        }
    
},
async editInventoryCategory(){
    const newInventoryCategoryDetails = {
        inventoryCategoryId:this.selectedInventoryCategory.inventoryCategoryId,
        inventoryClass:this.categoryClass,
    description:this.categoryDescription,
    totalValue:this.categoryTotalValue,
    valuationMethod:this.categoryValuationMethod,
      };

        var res = await this.$apiService.put(
          "/inventory/category",
           newInventoryCategoryDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
        //    this.securities.push({
        //     securityType: this.securityType,
        //     classType: this.classType,
        //     faceValue: this.faceValue,
        //     issues: 0,
        //     authShares: this.noOfShares,
        //     securityId: res.data.data[0].id,
        //     index:this.securities.length,allissues:[]
        //   });
        //   this.calcTopTable();
          this.inventoryCategoryDialog=false;
        }
        else{
          this.inventoryCategoryDialog=false;
        }
    
},
 editItem(item){
         this.header_name = "Edit Inventory Category";
          this.inventoryCategoryDialog=true;
          this.categoryClass = item.categoryClass;
          this.categoryDescription = item.categoryDescription;
          this.categoryTotalValue = item.categoryTotalValue;
          this.categoryValuationMethod = item.categoryValuationMethod;
          this.selectedInventoryCategory = item;
          console.log(item);
      },
       async deleteItem(item) {
      const deleteInventoryCategoryDetails = {
        inventoryCategoryId: item.inventoryCategoryId
      };

        var res = await this.$apiService.post(
          "/inventory/category/delete",
          deleteInventoryCategoryDetails
        );
        if (res && res.status === 200) {
            console.log(res,"delete res");
        //   this.inventorycategory.splice(this.selectedInventoryCategory.index,1);
        }
    },
    categoryRowClick(e) { 
      this.$router.push({
        name: "AddInventory",
        params: { categoryData: e },
      });
    },
    },
  }
</script>

<style scoped>
>>> .my-custom-dialog {
    align-self: flex-end;
  position:absolute;
  
    z-index:9999;
    right: 0px;
    margin-bottom:19%;
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
}
  .blueUline2{
    width:100%;
    border-top: 2px solid #03a9f4;
    border-color:#0398DC !important;
}
</style>