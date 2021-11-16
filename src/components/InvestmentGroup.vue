<template>
    <div>
           <v-dialog content-class="my-custom-dialog"
      v-model="investmentGroupDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          {{ header_name }}
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
    <v-select
                    v-model="groupType"
                    :items="investmenttype_items"
                    class="dialog-text"
                    outlined
                    style="width:373px"
                    dense
                    label="Investment Type"
                    required
                ></v-select>
                        <v-select
                    v-model="groupClassification"
                    :items="investmentclassification_items"
                    class="dialog-text"
                    outlined
                    style="width:373px"
                    dense
                    label="Investment Classification"
                    required
                ></v-select>
                <v-select
                    v-model="groupTradeability"
                    :items="tradeability_items"
                    class="dialog-text"
                    outlined
                    style="width:373px"
                    dense
                    label="Tradeability"
                    required
                ></v-select>
              <v-select
                    v-model="groupValuationMethod"
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
                 @click="()=>{if(this.header_name == 'Edit Investment Group')this.editInvestmentGroup();else this.addInvestmentGroup()}"
            >
                {{header_name == 'Edit Investment Group'?"Update":"Add"}}
            </v-btn>
            <v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="cancelInvestmentGroup()"
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
            <button class="buttonDir-font" @click="investmentGroupAddData()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Investment Group
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
            :items="investmentgroup.filter(val=>!groupSearch || new RegExp(groupSearch, 'i').test(val.groupType))"
            
            :single-select="singleSelect"
            show-select
            class="elevation-1 table-font"
            loading="Loading...."
            @click:row="groupRowClick"
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
        investmentGroupDialog:false,
        header_name: "",
        groupSearch:null,
        investmentGroupId:"",
        investmentgroup:[],
        groupType:"",
        groupTradeability:"",
        groupClassification:"",
        groupValuationMethod:"",
        selectedInvestmentGroup:{},
            investmenttype_items: [
                'Current Inventory',
                'Proprietor',
                'Partnership'
            ],
                investmentclassification_items: [
                'LLP',
                'HUF',
                'Trust',
                'Investmnet in subsidiary',
                 'Body Corporate',
            ],
                tradeability_items: [
                'Partnership',
                'Quoted',
                'HUF'
            ],
                valuationmethod_items: [
                'LLP',
                'NRV',
                'Trust',
            ],
        headers:[
                {text:'Investment Type' , value:'investmentGroupType', align: 'center'},
                {text:'Investment Classification' , value:'groupClassification', align: 'center'},
                {text:'Tradeability' , value:'groupTradeability', align: 'center'},
                {text:'Valuation Method' , value:'groupValuationMethod', align: 'center'},
                {text:'' , value:'actions', align: 'center', sortable: false}
            ],
      }
    },
         async mounted() {
    var res = await this.$apiService.post(
          "/investment/group/get",
          {companyId:Number(sessionStorage.getItem("companyId")),financialId:Number(sessionStorage.getItem("financialId"))}
        );
        if (res && res.status === 200) {
            console.log(res,"ressss")
          res.data.data.forEach((val,idx) => {              
              this.investmentgroup.push({
              investmentGroupType: val.type,
              groupClassification: val.classification,
              groupTradeability: val.tradeability,
              groupValuationMethod: val.valuationmethod,
              investmentGroupId: val.id,
              index:idx
            });
          });
        }
  },
  methods:{
      investmentGroupAddData(){
          this.header_name = "Add Investment Group";
          this.investmentGroupDialog=true;
      },
      onChangeSearch(e){
      this.groupSearch = e;
    },
    groupRowClick(e) { 
      this.$router.push({
        name: "Investments",
        params: { groupData: e },
      });
    },
      editItem(item){
         this.header_name = "Edit Investment Group";
          this.investmentGroupDialog=true;
          this.groupType = item.investmentGroupType;
          this.groupTradeability = item.groupTradeability;
          this.groupClassification = item.groupClassification;
          this.groupValuationMethod = item.groupValuationMethod;
          this.selectedInvestmentGroup = item;
          console.log(item);
      },
       async deleteItem(item) {
      const deleteInvestmentGroupDetails = {
        investmentGroupId: item.investmentGroupId
      };

        var res = await this.$apiService.post(
          "/investment/group/delete",
          deleteInvestmentGroupDetails
        );
        if (res && res.status === 200) {
            console.log(res,"delete res");
        //   this.securities.splice(this.selectedSecurity.index,1);
        //   this.calcTopTable();
        }
    },
      async addInvestmentGroup(){
      const newInvestmentGroupDetails = {
        type:this.groupType,
    classification:this.groupClassification,
    tradeability:this.groupTradeability,
    valuationMethod:this.groupValuationMethod,
        companyId:Number(sessionStorage.getItem("companyId")),financialId:Number(sessionStorage.getItem("financialId"))
      };

        var res = await this.$apiService.post(
          "/investment/group",
          newInvestmentGroupDetails
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
          this.investmentDialog=false;
        }
        else{
          this.investmentDialog=false;
        }

},
     async editInvestmentGroup(){
       //let m=this.investmentgroup.filter(x=>x.groupType.includes(this.groupType));
       console.log(this.investmentgroup,"ooohhh")
      const investmentGroupUpdateDetails = {
        type:this.groupType,
    classification:this.groupClassification,
    tradeability:this.groupTradeability,
    valuationMethod:this.groupValuationMethod,
        investmentGroupId:this.selectedInvestmentGroup.investmentGroupId
      };

        var res = await this.$apiService.put(
          "/investment/group",
          investmentGroupUpdateDetails
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
          this.investmentDialog=false;
        }
        else{
          this.investmentDialog=false;
        }

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
    margin-bottom:20%;
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