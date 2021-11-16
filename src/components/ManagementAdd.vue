<template>
<div >
 <v-dialog content-class="my-custom-dialog"
      v-model="additionalInfoDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          Additional Info
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
  <v-text-field autocomplete="off" 
                            v-model="invoiceNumber"
                            outlined
                            dense
                            label="Invoice No."
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="vendorName"
                            outlined
                            dense
                            label="Vendor Name"
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="serialNumber"
                            outlined
                            dense
                            label="Serial No."
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="identificationNumber"
                            outlined
                            dense
                            label="Asset Identification No."
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
      <v-layout>
            <v-flex xs5 style="display:flex;align-items:center;margin-top:1%;margin-right:5%">
            <p class="toggle-text">Physically Identifiable?</p>
            </v-flex>
             <v-flex xs1>
                    <v-switch
                       v-model="identifiable"
                    >
                    <template v-slot:label>
                    Yes
                    </template>
                    </v-switch>
                </v-flex>
            </v-layout>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="additionalInfoDetails()"
            >
                Add
            </v-btn>
        </v-dialog>




<v-dialog content-class="my-custom-dialog"
      v-model="additionalDepDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          Additional Depreciation
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
      <v-layout>
            <v-flex xs6 style="display:flex;align-items:center;margin-top:1%;margin-right:5%">
            <p class="toggle-text">Apply Adiitional Depreciation</p>
            </v-flex>
             <v-flex xs1>
                    <v-switch
                       v-model="isAdditionalDepreciation"
                    >
                    <template v-slot:label>
                    Yes
                    </template>
                    </v-switch>
                </v-flex>
            </v-layout>
<v-layout>
            <v-flex xs6 style="display:flex;align-items:center;margin-top:1%;margin-right:5%">
            <p class="toggle-text">Adiitional Depreciation in %</p>
            </v-flex>
             <v-flex xs2>
                    <v-text-field autocomplete="off" 
                            v-model="additionalDep"
                            outlined
                            dense
                            class="dialog-text"
                            required
                             style="width:373px;"
                        ></v-text-field>
                </v-flex>
            </v-layout>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="addDepreciation()"
            >
                Set
            </v-btn>
             <v-btn
                class="ma-2 button-font"
                color="primary"
                outlined
                style="border-color:#0398DC !important; text-transform:none;"
                 @click="cancelDepreciation()"
            >
                Cancel
            </v-btn>
        </v-dialog>


    <v-dialog content-class="my-custom-dialog"
      v-model="assetSoldDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          Sale Details
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
      <v-layout>
            <v-flex xs5 style="display:flex;align-items:center;margin-top:1%;margin-right:5%">
            <p class="toggle-text">Assets sold During the year</p>
            </v-flex>
             <v-flex xs1>
                    <v-switch
                       v-model="isAssetSoldThisYear"
                    >
                    <template v-slot:label>
                    Yes
                    </template>
                    </v-switch>
                </v-flex>
            </v-layout>
   <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="auto"
                    min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field autocomplete="off" 
                        v-model="saleDate"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        format="MM-dd-yyyy"
                        label="Date of Sale"
                        class="dialog-text"
                        style="width:373px"
                        outlined
                        dense
                    ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="saleDate"
                        no-title
                        hide-details
                        format="MM-dd-yyyy"
                        @input="menu1 = false"
                    ></v-date-picker>
                </v-menu>
                <v-text-field autocomplete="off" 
                            v-model="saleValue"
                            outlined
                            dense
                            label="Sale value in Rs."
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="addSoldDetails()"
            >
                Add
            </v-btn>
             <v-btn
                class="ma-2 button-font"
                color="primary"
                outlined
                style="border-color:#0398DC !important; text-transform:none;"
                 @click="cancelSoldDetails()"
            >
                Cancel
            </v-btn>
        </v-dialog>



  <v-dialog content-class="my-custom-dialog"
      v-model="addOpeningDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          {{ header_opening }}
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
  <v-select
                    v-model="assetGroup"
                    :items="assetgroup_items"
                    outlined
                    style="width:373px"
                    dense
                    label="Assets Group"
                    required
                ></v-select>
                <v-text-field autocomplete="off" 
                            v-model="openingWDV"
                            outlined
                            dense
                            label="Opening WDV"
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
                         <v-text-field autocomplete="off" 
                            v-model="totalLife"
                            outlined
                            v-if="!itContent"
                            @change="totalLifeChange"
                            dense
                            label="Total Life of Assets"
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
                         <v-text-field autocomplete="off" 
                            v-model="expiredLife"
                            outlined
                            v-if="!itContent"
                            @change="totalLifeChange"
                            dense
                            label="Asset Life Expired"
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
                        <div style="display:block">
                        <div v-if="!itContent" style="width:373px;display:flex;align-items:baseline">
                          <p style="margin-right:4%">Balance Life</p>
                        <v-text-field autocomplete="off" 
                            v-model="balanceLife"
                            outlined
                            disabled
                            dense
                            label=""
                            required
                        ></v-text-field>
                        </div>
                        <p v-if="!itContent" style="text-align:initial">(As on 1st Day of Current FY)</p>
                        </div>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="()=>{if(editMode==true)this.editOpening();else this.addOpening()}"
            >
                {{editMode==true?"Update":"Add"}}
            </v-btn>
             <v-btn
                class="ma-2 button-font"
                color="primary"
                outlined
                style="border-color:#0398DC !important; text-transform:none;"
                 @click="cancelOpening()"
            >
                Cancel
            </v-btn>
        </v-dialog>



  <v-dialog content-class="my-custom-dialog"
      v-model="additionDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          {{ header_name }}
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
               <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="auto"
                    min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field autocomplete="off" 
                        v-model="purchaseDate"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        format="MM-dd-yyyy"
                        label="Date of Purchase"
                        class="dialog-text"
                        style="width:373px"
                        outlined
                        dense
                    ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="purchaseDate"
                        no-title
                        hide-details
                        format="MM-dd-yyyy"
                        @input="menu1 = false"
                    ></v-date-picker>
                </v-menu>
                <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="auto"
                    min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field autocomplete="off" 
                        v-model="useDate"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        format="MM-dd-yyyy"
                        label="Date of Put to use"
                        class="dialog-text"
                        style="width:373px"
                        outlined
                        dense
                    ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="useDate"
                        no-title
                        hide-details
                        format="MM-dd-yyyy"
                        @input="menu1 = false"
                    ></v-date-picker>
                </v-menu>
                <v-text-field autocomplete="off" 
                            v-model="amount"
                            outlined
                            dense
                            label="Amount"
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="()=>{if(this.header_name == 'Edit Additions')this.editAddition();else this.addNewAddition()()}"
            >
                {{header_name == 'Edit Additions'?"Update":"Add New"}}
            </v-btn>
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
        <v-flex  style="display:flex;justify-content:space-evenly;">
        <p class="label-font">Asset Class</p>
        <p class="text-font">{{selectedGroupData.assetClass}}</p>
        </v-flex>
        <div>
          <v-divider inset vertical class="divider-size"></v-divider>
          </div>
         <v-flex  style="display:flex;justify-content:space-evenly">
         <p class="label-font">Asset Group</p>
        <p class="text-font">{{selectedGroupData.assetGroup}}</p>
        </v-flex>
        <div>
          <v-divider inset vertical class="divider-size"></v-divider>
          </div>
         <v-flex  style="display:flex;justify-content:space-evenly;">
         <p class="label-font">Asset Depreciation</p>
        <p class="text-font">20%</p>
        </v-flex>

        </v-layout>
     </div>
        <v-divider class="grey-divider"></v-divider>
        <div style="display-flex;justify-content:flex-end;margin:2%;margin-left:77%">
         <v-text-field autocomplete="off" 
                dense
                outlined
                append-icon="mdi-magnify"
                class="text-field-class"
                placeholder="Search here"
                v-model="search"
                style="width:359px;height:41px;"
                @input="onChangeSearch"
                hide-details=false
            >
            </v-text-field>
            </div>
            <v-tabs
      v-model="tab"
      class="tab-decor"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
        class="tab-decor1"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
       <v-card
        max-width="100%"
        class="table-align"
        >
        <v-card-title>
            <button class="buttonDir-font" @click="addAdditionsData()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Add
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

        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="faAddition"
            :single-select="singleSelect"
            show-select
            class="elevation-1 table-font"
            loading="Loading...."
        >
        <template v-slot:item.saleDetails="{ item }" >
          <p style="margin-top:8%">{{item.saleDetails?"Sold":"Active"}}</p>
</template>
        <template v-slot:item.isAssetSoldThisYear="{ item }" >
  <button class="action-button"  @click.stop.prevent @click="assetsold(item)">
                    {{item.isAssetSoldThisYear==true?"Yes":"No"}}
            </button>
</template>
<template v-slot:item.isAdditionalDepreciation="{ item }" >
  <button class="action-button"  @click.stop.prevent @click="additionaldep(item)">
                    {{item.isAdditionalDepreciation==true?"Yes":"No"}}
            </button>
</template>
<template v-slot:item.isAdditionalInfo="{ item }" >
  <button class="action-button" v-if="!item.isAdditionalInfo"  @click.stop.prevent @click="addInfo(item)">
                    <v-icon style="color:#0398DC;width:12px;height:12px;margin-right:8px">mdi-plus</v-icon>
                    Add
            </button>
    <p v-if="item.isAdditionalInfo" style="color:green;margin-top:8%">Added</p>
</template>
        <template v-slot:item.actions="{ item }">
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
      </v-tab-item>

      <v-tab-item>
      <v-card
        max-width="100%"
        class="table-align"
        >
        <v-card-title>
            <button class="buttonDir-font" @click="addITOpening()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Add IT Opening WDV
            </button>
             <v-divider
            inset
            vertical
            style="max-height:25px;color: #C4C4C4;"
            ></v-divider>
            <button class="buttonDir-font" @click="adhocOpening()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Add Adhoc Companies Act WDV
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

        </v-card-title>
        <v-data-table
            :headers="headersopening"
            :items="faOpening"
            :single-select="singleSelect"
            show-select
            class="elevation-1 table-font"
            loading="Loading...."
        >
        <template v-slot:item.actions="{ item }">
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
                  <v-list-item-title @click="(e)=>editItemOpening(item)"
                    ><v-icon style="margin-right: 5px"
                      >mdi-pencil-outline</v-icon
                    >Edit</v-list-item-title
                  >
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title @click="deleteItemOpening(item)"
                    ><v-icon style="margin-right: 5px"
                      >mdi-delete-outline</v-icon
                    >Delete</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
    </template>
        </v-data-table>
            
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import moment from "moment";
export default {
    data () {
      return {
        search:"",
        purchaseDate:"",
        useDate:"",
        itContent:false,
        amount:0,
        isAdditionalInfo:false,
        additionalInfo:"",
        isAssetSoldThisYear:false,
        isAdditionalDepreciation:false,
        additionalDepreciationDetails:"",
        selectedGroupData:{},
        faAddition:[],
        faAsset:[],
        faOpening:[],
        selectedAddition:{},
        editMode:false,
        transferDialog:false,
        addOpeningDialog:false,
        additionDialog:false,
        assetSoldDialog:false,
        additionalDepDialog:false,
        additionalInfoDialog:false,
        adhocOpeningDialog:false,
        totalLife:0,
        balanceLife:0,
        expiredLife:0,
         tab: null,
         e1: 1,
        steps: 1,
        items: [
          'Add Additions', 'Opening Balance',
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

            headers:[
                {text:'Date of Purchase' , value:'dateOfPurchase', align: 'center'},
                {text:'Date of Put to Use' , value:'dateOfPutToUse', align: 'center'},
                {text:'Amount' , value:'amount', align: 'center'},
                {text:'Additional Info' , value:'isAdditionalInfo', align: 'center'},
                {text:'Asset sold During the Year' , value:'isAssetSoldThisYear', align: 'center'},
                {text:'Status' , value:'saleDetails', align: 'center'},
                {text:'Additional Depreciation' , value:'isAdditionalDepreciation', align: 'center'},
                {text:'' , value:'actions', align: 'center', sortable: false}
            ],
            headersopening:[
                {text:'OB Type' , value:'obType', align: 'center'},
                {text:'Opening WDV' , value:'openingWDV', align: 'center'},
                {text:'Total Life of Assets' , value:'totalLife', align: 'center'},
                {text:'Asset Life Expired' , value:'expiredLife', align: 'center'},
                {text:'Balance Life' , value:'balanceLife', align: 'center'},
                {text:'' , value:'actions', align: 'center', sortable: false}
            ],
                  securities: [
          {
            securityType: 'Preference Shares',
            allotmentDate: '25-01-2020',
            noOfSecurities: 3,
            totalAmount: 200,
            AvailableSecBal:200,
          },
          {
            securityType: 'Equity Shares',
            allotmentDate: '25-01-2020',
            noOfSecurities: 3,
            totalAmount: 200,
            AvailableSecBal:200,
          },
        ],

           openings: [
          {
            OBType: 'Income Tax',
            openingWDV: '10,000',
            assetLife: 3,
            assetLifeExpired: 2,
            balanceLife:1,
          },
        ],
      }
    },
     watch: {
  steps (val) {
        if (this.e1 > val) {
            console.log(this.e1,"e1 value")
          this.e1 = val
        }
      },
    },
    async mounted() {
         this.selectedGroupData = this.$route.params.groupData;
         var res = await this.$apiService.post(
          "/fixedasset/getasset",
          {faGroupId:this.selectedGroupData.faGroupId}
        );
        if (res && res.status === 200) {
            console.log(res,"ressss")
          res.data.data.forEach((val,idx) => {              
              this.faAddition.push({
            faAssetId:val.id,
            dateOfPurchase:moment(String(val.dateOfPurchase)).format("DD-MM-YYYY"),
            dateOfPutToUse:moment(String(val.dateOfPutToUse)).format("DD-MM-YYYY"),
            amount:val.amount,
            isAdditionalInfo:val.isAdditionalInfo,
            additionalInfo:val.additionalInfo,
            isAssetSoldThisYear:val.isAssetSoldThisYear,
            saleDetails:val.saleDetails,
            isAdditionalDepreciation:val.isAdditionalDepreciation,
            additionalDepreciationDetails:val.additionalDepreciationDetails,
              index:idx
            });
          });
        }
           var res1 = await this.$apiService.post(
          "/fixedasset/getasset/ob",
          {faGroupId:this.selectedGroupData.faGroupId}
        );
        if (res1 && res1.status === 200) {
            console.log(res1,"ressss")
          res1.data.data.forEach((val,idx) => {              
              this.faOpening.push({
            faOpeningId:val.id,
            assetGroup:val.assetGroup,
            openingWDV:val.openingWDV,
            obType:val.obType,
            totalLife:val.totalLife,
            expiredLife:val.assetLifeexpired,
            balanceLife:val.balanceLife,
              index:idx
            });
          });

        }
        console.log(this.faOpening,"additionnnn")
    },
    methods:{
      editItemOpening(item){
        console.log(item,"itemmmm")
        if(item.obType=="Income Tax")
        {
          this.itContent=true;
          this.header_opening="Edit IT opening WDV";
        }
        else{
          this.itContent=false;
          this.header_opening="Edit Adhoc Companies Act WDV";
        }
       this.editMode=true;
          this.addOpeningDialog=true;
          this.assetGroup=item.assetGroup;
          this.openingWDV=item.openingWDV;
          this.totalLife=item.totalLife;
          this.balanceLife=item.balanceLife;
          this.expiredLife=item.expiredLife;
          this.selectedOpening=item;
          console.log(item);
      },
      editItem(item){
  console.log(item,"itemmm");
          this.additionDialog=true;
          this.header_name="Edit Additions";
          this.purchaseDate=item.purchaseDate;
          this.useDate=item.useDate;
          this.amount=item.amount;
          this.selectedAsset=item;
          console.log(item);
      },
      assetsold(item){
      this.assetSoldDialog=true;
      this.selectedAddition=item;
      },
      totalLifeChange(){
        this.balanceLife=this.totalLife-this.expiredLife;
      },
      cancelOpening(){
       this.addOpeningDialog=false;
       this.itContent=false;
      },
       additionaldep(item){
        this.additionalDepDialog=true;
        this.selectedAddition=item;
      },
       addInfo(item){
         console.log(item,"itemmmm")
        this.additionalInfoDialog=true;
        this.selectedAddition=item;
      },
       async deleteItem(item) {
      const deleteAssetGroupDetails = {
        faAssetId: item.faAssetId
      };

        var res = await this.$apiService.post(
          "/fixedasset/deleteasset",
          deleteAssetGroupDetails
        );
        if (res && res.status === 200) {
            console.log(res,"delete res");
           this.fagroup.splice(this.selectedAddition.index,1);
        }
    },
    async deleteItemOpening(item) {
      this.selectedOpening=item;
      const deleteOpeningDetails = {
        isOpenindAssetId: item.faOpeningId
      };

        var res = await this.$apiService.post(
          "/fixedasset/deleteasset/ob",
          deleteOpeningDetails
        );
        if (res && res.status === 200) {
            console.log(res,"delete res");
           this.faOpening.splice(this.selectedOpening.index,1);
        }
    },
       nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      addITOpening(){
this.addOpeningDialog=true;
this.header_opening="IT Opening WDV";
this.itContent=true;
console.log(this.itContent,"itttsss")
      },
async additionalInfoDetails(){
const additionalInfoDetails ={
  additionalInfo:{
        invoiceNo:this.invoiceNumber,
        vendorName:this.vendorName,
        serialNo:this.serialNumber,
        indentificationNo:this.identificationNumber,
        isPhysicalIdentification:this.identifiable
    },
    faAssetId:this.selectedAddition.faAssetId
}
    var res = await this.$apiService.put(
          "/fixedasset/updateasset/additionalinfo",
          additionalInfoDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
           this.faAddition = this.faAddition.map(e => {
if(e.faAssetId === this.selectedAddition.faAssetId) { 
            e.isAdditionalInfo=true,
            e.additionalInfo=additionalInfoDetails.additionalInfo
         }
return e;
            });
             this.additionalInfoDialog=false;
        }
        else{
           this.additionalInfoDialog=false;
        }
},
async addDepreciation(){
const additionalDepreciationDetailsData ={
  isAdditionalDepreciation:this.isAdditionalDepreciation,
    additionalDepreciationDetails:{
        percentage:this.additionalDep
    },
    faAssetId:this.selectedAddition.faAssetId
}
    var res = await this.$apiService.put(
          "/fixedasset/updateasset/additional/depreciation",
          additionalDepreciationDetailsData
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
           this.faAddition = this.faAddition.map(e => {
if(e.faAssetId === this.selectedAddition.faAssetId) { 
            e.isAdditionalDepreciation=true,
            e.additionalDepreciationDetails=additionalDepreciationDetailsData.additionalDepreciationDetails
         }
return e;
            });
             this.additionalDepDialog=false;
        }
        else{
           this.additionalDepDialog=false;
        }
},
async addSoldDetails(){
const saleDetailsData ={
  isAssetSoldDuringthisYear:this.isAssetSoldThisYear,
    saleDetails:{
        isAssetSoldDuringthisYear:this.isAssetSoldThisYear,
        dateOfSale:this.saleDate,
        saleValue:this.saleValue
    },
    faAssetId:this.selectedAddition.faAssetId
}
    var res = await this.$apiService.put(
          "/fixedasset/updateasset/saledetails",
          saleDetailsData
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
           this.faAddition = this.faAddition.map(e => {
if(e.faAssetId === this.selectedAddition.faAssetId) { 
            e.isAssetSoldThisYear=true,
            e.saleDetails=saleDetailsData.saleDetails
         }
return e;
            });
             this.assetSoldDialog=false;
        }
        else{
           this.assetSoldDialog=false;
        }
},
     async addNewAddition(){
        const newAdditionDetails = {
    "dateOfPurchase":this.purchaseDate,
    "dateOfPutToUse":this.useDate,
    "amount":this.amount,
    "faGroupId":this.selectedGroupData.faGroupId
    }

        var res = await this.$apiService.post(
          "/fixedasset/createasset",
          newAdditionDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
           this.faAddition.push({
            faAssetId:res.data.data[0].id,
            dateOfPurchase:this.purchaseDate,
            dateOfPutToUse:this.useDate,
            amount:this.amount,
            isAdditionalInfo:this.isAdditionalInfo,
            additionalInfo:this.additionalInfo,
            isAssetSoldThisYear:(this.isAssetSoldThisYear==true)?"Yes":"No",
            saleDetails:(this.isAssetSoldThisYear==true)?"Sold":"Active",
            isAdditionalDepreciation:(this.isAdditionalDepreciation==true)?"Yes":"No",
            additionalDepreciationDetails:this.additionalDepreciationDetails,
              index:this.faAddition.length
            });
             this.additionDialog=false;
        }
        else{
           this.additionDialog=false;
        }
    
       
      },
      async editAddition(){
        let purchasedate=moment(String(this.purchaseDate)).format('YYYY-MM-DD');
        let usedate=moment(String(this.useDate)).format('YYYY-MM-DD')
        console.log(this.useDate,purchasedate,usedate,"useee")
        const additionDetails = {
    "dateOfPurchase":purchasedate,
    "dateOfPutToUse":usedate,
    "amount":this.amount,
    "faGroupId":this.selectedGroupData.faGroupId
    }

        var res = await this.$apiService.put(
          "/fixedasset/updateasset",
          additionDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
            this.faAddition[this.selectedAddition.index].dateOfPurchase = this.purchaseDate;
          this.faAddition[this.selectedAddition.index].dateOfPutToUse = this.useDate;
          this.faAddition[this.selectedAddition.index].amount = this.amount;
           this.faAddition[this.selectedAddition.index].isAdditionalInfo = this.isAdditionalInfo;
           this.faAddition[this.selectedAddition.index].isAssetSoldThisYear = this.isAssetSoldThisYear;
           this.faAddition[this.selectedAddition.index].additionalInfo = this.additionalInfo;
           this.faAddition[this.selectedAddition.index].isAdditionalDepreciation = this.isAdditionalDepreciation;
           this.faAddition[this.selectedAddition.index].additionalDepreciationDetails = this.additionalDepreciationDetails;
           this.faAddition[this.selectedAddition.index].saleDetails = this.saleDetails;
            // this.fagroup.push({
            //   assetClass: this.assetClass,
            //   assetGroup: this.assetGroup,
            //   assetCategory: this.assetCategory,
            //   faMethod: this.faMethod,
            //   faMethodDetails: this.faMethodDetails,
            //   faGroupId:res.data.data[0].id,
            //   index:this.fagroup.length
            // });
             this.additionDialog=false;
        }
        else{
           this.additionDialog=false;
        }
    
       
      },
      adhocOpening(){
        console.log(this.itContent,"ittt");
        this.header_opening="Adhoc Opening Act WDV";
        this.addOpeningDialog=true;
        this.itContent=false;
      },
      async addOpening(){
const itOpeningDetails = {
    assetGroup:this.assetGroup,
    openingWDV:this.openingWDV,
    obType:"Income Tax",
    faGroupId:this.selectedGroupData.faGroupId
    }
    const adhocOpeningDetails = {
    assetGroup:this.assetGroup,
    openingWDV:this.openingWDV,
    obType:"Companies Act",
    totalLifeOfAsset:this.totalLife,
    assetLifeexpired:this.expiredLife,
    balanceLife:this.balanceLife,
    faGroupId:this.selectedGroupData.faGroupId
    }

        var res = await this.$apiService.post(
          "/fixedasset/createasset/ob",
          this.itContent?itOpeningDetails:adhocOpeningDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
            if(this.itContent==true){
              this.faOpening.push({
                faOpeningId:res.data.faAssetId,
                assetGroup:this.assetGroup,
                openingWDV:this.openingWDV,
                obType:"Income Tax",
                totalLife:"NA",
                expiredLife:"NA",
                balanceLife:"NA"
              })
            }
            else{
               this.faOpening.push({
                 faOpeningId:res.data.faAssetId,
                assetGroup:this.assetGroup,
                openingWDV:this.openingWDV,
                obType:"Companies Act",
                totalLife:this.totalLife,
                expiredLife:this.expiredLife,
                balanceLife:this.balanceLife
              })
            }
             this.addOpeningDialog=false;
        }
        else{
           this.addOpeningDialog=false;
        }
    
      },
            async editOpening(){
const itOpeningDetails = {
    assetGroup:this.assetGroup,
    openingWDV:this.openingWDV,
    obType:"Income Tax",
    isOpenindAssetId:this.selectedOpening.faAssetId
    }
    const adhocOpeningDetails = {
    assetGroup:this.assetGroup,
    openingWDV:this.openingWDV,
    obType:"Companies Act",
    totalLifeOfAsset:this.totalLife,
    assetLifeexpired:this.expiredLife,
    balanceLife:this.balanceLife,
    faGroupId:this.selectedOpening.faAssetId
    }

        var res = await this.$apiService.put(
          "/fixedasset/updateasset/ob",
          this.itContent?itOpeningDetails:adhocOpeningDetails
        );
        if (res && res.status === 200) {
            console.log("yipppeee")
            if(this.itContent==true){
            this.faOpening[this.selectedOpening.index].openingWDV = this.openingWDV;
          this.faOpening[this.selectedOpening.index].assetGroup = this.assetGroup;
          this.faOpening[this.selectedOpening.index].obType = "Income Tax";
          this.faOpening[this.selectedOpening.index].totalLife = "NA";
          this.faOpening[this.selectedOpening.index].expiredLife = "NA";
          this.faOpening[this.selectedOpening.index].balanceLife = "NA";
            }
            else{
          this.faOpening[this.selectedOpening.index].openingWDV = this.openingWDV;
          this.faOpening[this.selectedOpening.index].assetGroup = this.assetGroup;
          this.faOpening[this.selectedOpening.index].obType = "Companies Act";
          this.faOpening[this.selectedOpening.index].totalLife = this.totalLife;
          this.faOpening[this.selectedOpening.index].expiredLife = this.expiredLife;
          this.faOpening[this.selectedOpening.index].balanceLife = this.balanceLife;
            }
             this.addOpeningDialog=false;
        }
        else{
           this.addOpeningDialog=false;
        }
    
      },
      addNewAdhocAddition(){
        this.addITOpeningDialog=false;
      },
      addAdditionsData(){
        this.header_name="Add Additions";
this.additionDialog=true;
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
    height: 2em;
    margin-top:6% !important;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
    border-color:#03a9f4 !important;
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
.grey-divider{
    width:100%;
    border-top: 1px solid #C4C4C4;
    border-color:#C4C4C4 !important;
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
    margin-top:2% !important;
}
  .blueUline2{
    width:100%;
    border-top: 5px solid #03a9f4;
    border-color:#0398DC !important;
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
.action-button{
  color:#0398DC;

}
</style>