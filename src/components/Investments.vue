<template>
    <div>
        <v-dialog content-class="my-custom-dialog"
      v-model="investmentDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          {{ header_name }}
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
    <v-text-field autocomplete="off" 
                            v-model="entityName"
                            outlined
                            dense
                            label="Entity Name"
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
                        <v-select
                    v-model="investmentType"
                    :items="investmentType_items"
                    class="dialog-text"
                    outlined
                    style="width:373px"
                    dense
                    label="Type of Investment"
                    required
                ></v-select>
                <v-select
                    v-model="secondaryType"
                    :items="secondaryType_items"
                    class="dialog-text"
                    outlined
                    style="width:373px"
                    dense
                    label="Secondary Type"
                    required
                ></v-select>
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
                        format="MM-dd-yyyy"
                        @input="menu3 = false"
                    ></v-date-picker>
                </v-menu>
                <v-text-field autocomplete="off" 
                            v-model="unitNumber"
                            outlined
                            dense
                            label="No.of Units"
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="purchaseCost"
                            outlined
                            dense
                            label="Cost of Purchase"
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
                        <v-text-field autocomplete="off" 
                            v-model="marketValue"
                            outlined
                            dense
                            label="Market Value"
                            class="dialog-text"
                            required
                             style="width:373px"
                        ></v-text-field>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<div style="display:flex;justify-content:center">
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                  @click="()=>{if(this.header_name == 'Edit Investment')this.editInvestment();else this.addInvestment()}"
            >
                {{header_name == 'Edit Investment'?"Update":"Add"}}
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
            <button class="buttonDir-font" @click="addInvestmentData()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Add Investments
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
             :single-select="singleSelect"
            show-select
            :items="investments"
            class="elevation-1 table-font"
            loading="Loading...."
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
import moment from "moment";
  export default {
    data () {
      return {
        investmentDialog:false,
        header_name: "",
        investmentType_items:[
          "one","two","three"
        ],
        secondaryType_items:[
          "four","two","three"
        ],
        entityName:"",
        investmentType:"",
        secondaryType:"",
        purchaseDate:"",
        unitNumber:"",
        purchaseCost:"",
        marketValue:"",
        selectedInvestment:{},
        selectedInvestmentGroup:{},
        investments: [],
        headers:[
                {text:'Entity Name' , value:'entityName', align: 'center'},
                {text:'Type of Investment' , value:'investmentType', align: 'center'},
                {text:'Secondary Type' , value:'secondaryType', align: 'center'},
                {text:'Date of Purchase' , value:'purchaseDate', align: 'center'},
                {text:'No. of Units' , value:'unitNumber', align: 'center'},
                {text:'Cost of Purchase' , value:'purchaseCost', align: 'center'},
                {text:'Market Value' , value:'marketValue', align: 'center'},
                {text:'' , value:'actions', align: 'center', sortable: false}
            ],
      }
    },
     async mounted() {
         this.selectedInvestmentGroup = this.$route.params.groupData;
         console.log(this.selectedInvestmentGroup,"grouuup")
    var res = await this.$apiService.post(
          "/investment/get",
          {"investmentGroupId":this.selectedInvestmentGroup.investmentGroupId}
        );
        if (res && res.status === 200) {
            console.log(res,"ressss")
          res.data.data.forEach((val,idx) => {              
              this.investments.push({
              entityName: val.entityname,
              investmentType: val.typeofinvestment,
              secondaryType: val.secondarytype,
              purchaseDate:moment(String(val.dateofpurchase)).format("DD-MM-YYYY"),
              unitNumber:val.noofunits,
              purchaseCost:val.costofpurchase,
              marketValue:val.marketvalue,
              investmentId: val.id,
              index:idx
            });
          });
        }
  },
    methods:{
addInvestmentData(){
    console.log("haiiii")
    this.header_name = "Add Investment";
    this.investmentDialog=true;
    console.log(this.investmentDialog,"dialoggg")
},
      editItem(item){
         this.header_name = "Edit Investment";
          this.investmentDialog=true;
          this.entityName=item.entityName;
          this.investmentType=item.investmentType;
          this.secondaryType=item.secondaryType;
          this.purchaseDate=item.purchaseDate;
          this.unitNumber=item.unitNumber;
          this.purchaseCost=item.purchaseCost;
          this.marketValue=item.marketValue;
          this.selectedInvestment=item;
          console.log(item);
      },
       async deleteItem(item) {
      const deleteInvestmentDetails = {
        investmentId: item.investmentId
      };

        var res = await this.$apiService.post(
          "/investment/delete",
          deleteInvestmentDetails
        );
        if (res && res.status === 200) {
            console.log(res,"delete res");
        //   this.securities.splice(this.selectedSecurity.index,1);
        //   this.calcTopTable();
        }
    },
async addInvestment(){
      const newInvestmentDetails = {
        investmentGroupId:this.selectedInvestmentGroup.investmentGroupId,
    entityName:this.entityName,
    typeOfInvestment:this.investmentType,
    secondaryType:this.secondaryType,
    dateOfPurchase:this.purchaseDate,
    noOfUnits:this.unitNumber,
    costOfPurchase:this.purchaseCost,
    marketValue:this.marketValue,
        companyid:Number(sessionStorage.getItem("companyId")),financialid:Number(sessionStorage.getItem("financialId"))
      };

        var res = await this.$apiService.post(
          "/investment",
          newInvestmentDetails
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
          this.investmentDialog=false;
        }
        else{
          this.investmentDialog=false;
        }

},
async editInvestment(){
  let date = moment(String(this.purchaseDate)).format("YYYY-MM-DD");
  console.log(date,this.purchaseDate,"dateeee")
      const newInvestmentDetails = {
        investmentId:this.selectedInvestment.investmentId,
    entityName:this.entityName,
    typeOfInvestment:this.investmentType,
    secondaryType:this.secondaryType,
    dateOfPurchase:date,
    noOfUnits:this.unitNumber,
    costOfPurchase:this.purchaseCost,
    marketValue:this.marketValue,
      };

        var res = await this.$apiService.put(
          "/investment",
          newInvestmentDetails
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
            // })
          this.investmentDialog=false;
        }
        else{
          this.investmentDialog=false;
        }

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
    margin-bottom:10%;
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