<template>
  <div>
    <v-dialog
      content-class="my-custom-dialog"
      v-model="addIssueDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition"
    >
      <h1
        class="text-h5 lighten-2 popup-allotment-title"
        style="font-size: 20px !important"
      >
        Issues
      </h1>
      <v-divider class="blueUline2"></v-divider>
      <v-layout style="display: block; margin: 4% 13% 2% 13%">
        <v-select
          v-model="issueName"
          :items="issueNames"
          outlined
          style="width: 373px"
          dense
          label="Name of the Issue"
          required
        ></v-select>
        <v-text-field autocomplete="off" 
          v-model="issueDate"
          persistent-hint
          v-bind="attrs"
          v-on="on"
          format="MM-dd-yyyy"
          label="Date of Issue"
          style="width: 373px"
          outlined
          type="date"
          dense
        ></v-text-field>
        <v-text-field autocomplete="off" 
          v-model="issueNoOfShares"
          outlined
          dense
          style="width: 373px"
          label="No.of shares Authorized"
          required
          @change="issueShareChange"
          :error="issueError.issueShareError"
          :error-messages="
            issueError.issueShareError ? issueError.issueShareErrorMess : ''
          "
        ></v-text-field>
        <v-select
          v-model="issueType"
          :items="issueTypes"
          outlined
          style="width: 373px"
          dense
          label="Issue Type"
          required
        ></v-select>
        <v-text-field autocomplete="off" 
          v-model="issuePrice"
          outlined
          dense
          style="width: 373px"
          label="Issue Price"
          required
          @change="issuePriceChange"
          :error="issueError.issuePriceError"
          :error-messages="
            issueError.issuePriceError ? issueError.issuePriceErrorMess : ''
          "
        ></v-text-field>
      </v-layout>
      <v-divider class="blueUline2"></v-divider>
      <v-btn
        class="ma-2 button-font"
        color="primary"
        style="
          background-color: #0398dc !important;
          border-color: #0398dc !important;
          text-transform: none;
        "
        @click="addNewIssues()"
      >
        Add New
      </v-btn>
    </v-dialog>
    <v-layout>
            <v-flex xs1  style="margin-left: 2%;margin-top: 5px;">
                 <img src="../assets/profile-icon.png" height="50" width="50"/>
            </v-flex>

            <v-flex xs3 style="display:flex;align-items:center;justify-content:space-between">
                <h4 class="company-font">{{companyName}}</h4>
                 <!-- <v-divider
                inset
                vertical
                class="divider-size"
                ></v-divider> -->
            </v-flex>

            <v-flex style="display:flex;align-items:center">
      
            </v-flex>
        </v-layout>
    <v-divider class="blueUline"></v-divider>
    <div>
      <v-layout style="margin-top: 1rem; width: 100%;margin-left: 20px;">
        <v-flex
          style="
            display: flex;
            justify-content: space-evenly;
            min-width: 25%;
            max-width: 25%;
          "
        >
          <p class="label-font">Type of Security</p>
          <p class="text-font">{{ selectedSecurity.securityType }}</p>
        </v-flex>
        <div>
          <v-divider inset vertical class="divider-size"></v-divider>
        </div>
        <v-flex
          style="
            min-width: 25%;
            max-width: 25%;
            display: flex;
            justify-content: space-evenly;
          "
        >
          <p class="label-font">Class Type</p>
          <p class="text-font">{{ selectedSecurity.classType }}</p>
        </v-flex>
        <div>
          <v-divider inset vertical class="divider-size"></v-divider>
        </div>
        <v-flex
          style="
            display: flex;
            justify-content: space-evenly;
            min-width: 25%;
            max-width: 25%;
          "
        >
          <p class="label-font">Face Value</p>
          <p class="text-font">{{ selectedSecurity.faceValue }}</p>
        </v-flex>
      </v-layout>
      <!-- <v-divider class="grey-divider"></v-divider> -->
      <v-layout style="margin-top: 0.5rem;">
        <v-flex
          style="
            display: flex;
            justify-content: space-evenly;
            min-width: 26.5%;
    max-width: 27%;
          "
        >
          <p class="label-font">Authorized</p>
          <p class="text-font">{{ selectedSecurity.authShares *selectedSecurity.faceValue }}</p>
        </v-flex>
        <div>
          <v-divider inset vertical class="divider-size"></v-divider>
        </div>
        <v-flex
          style="
            display: flex;
            justify-content: space-evenly;
            min-width: 25%;
            max-width: 25%;
          "
        >
          <p class="label-font">Subscribed</p>
          <p class="text-font">{{totalSubscribed}}</p>
        </v-flex>
        <div>
          <v-divider inset vertical class="divider-size"></v-divider>
        </div>
        <v-flex
          style="
            display: flex;
            justify-content: space-evenly;
            min-width: 25%;
            max-width: 25%;
          "
        >
          <p class="label-font">Issued</p>
          <p class="text-font">{{totalIssued}}</p>
        </v-flex>
        <div>
          <v-divider inset vertical class="divider-size"></v-divider>
        </div>
        <v-flex
          style="
            display: flex;
            justify-content: space-evenly;
            min-width: 25%;
            max-width: 25%;
          "
        >
          <p class="label-font">Allotted</p>
          <p class="text-font">2,000</p>
        </v-flex>
      </v-layout>
      <v-divider class="grey-divider"></v-divider>
    </div>
    <v-card max-width="100%;box-shadow: none;" class="table-align">
      <v-card-title style="padding-left: 50px;">
        <button class="buttonDir-font" @click="addIssues()">
          <v-icon style="font-size:20px">mdi-plus</v-icon>
          Add Issues
        </button>
        <v-divider
          inset
          vertical
          style="margin-top: 1.2%;max-height: 15px;margin-left: 1%;margin-right: 1%;"
        ></v-divider>
        <button class="buttonDir-font">
          <v-icon style="font-size:20px">mdi-arrow-collapse-down</v-icon>
          Import
        </button>
        <v-divider
          inset
          vertical
          style="margin-top: 1.2%;max-height: 15px;margin-left: 1%;margin-right: 1%;"
        ></v-divider>
        <button class="buttonDir-font">
          <v-icon style="font-size:20px">mdi-arrow-collapse-up</v-icon>
          Export
        </button>
        <v-divider
          inset
          vertical
          style="margin-top: 1.2%;max-height: 15px;margin-left: 1%;margin-right: 1%;"
        ></v-divider>
        <button class="buttonDir-font"  @click="deleteIssues">
          <v-icon small style="font-size:20px">far fa-trash-alt</v-icon>
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
          hide-details="false"
        >
        </v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="issues.filter(val=>!securitySearch || new RegExp(securitySearch, 'i').test(val.issueName))"
        :single-select="singleSelect"
        @item-selected="selectedSecurities"
        @toggle-select-all="selectedAllSecurities"
        item-key="issueName"
        show-select
        class="elevation-1 table-font"
        loading="Loading...."
      >
        <template v-slot:item.actions="{ item }">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-right: 1rem;
            "
          >
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
                  <v-list-item-title @click="editItem(item)"
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
  data() {
    return {
      companyName:"",
      totalSubscribed:0,totalIssued:0,
      securitySearch:"",
      issuesToDelete:[],
      issueNames: ["Rights Issue", "Bonus Issue", "Preferential Allotment"],
      issueTypes: ["At Par", "At Premium", "At Discount"],
      addIssueDialog: false,
      singleSelect: false,
      selected: [],
      issues: [],
      selectedSecurity: {},
      issueName: null,
      issueDate: null,
      issueNoOfShares: null,
      issueType: null,
      issuePrice: null,
      issueError: {
        issuePriceError: false,
        issuePriceErrorMess: "",
        issueShareError: false,
        issueShareErrorMess: "",
      },
      headers: [
        { text: "Name of the Issue", value: "issueName", align: "center" },
        { text: "Date of issue", value: "issueDate", align: "center" },
        { text: "Issue shares", value: "issueShares", align: "center" },
        { text: "Issue price", value: "issuePrice", align: "center" },
        { text: "Issue Type", value: "issueType", align: "center" },
        { text: "", value: "", align: "center", sortable: false },
      ],
    };
  },
  mounted() {
    this.companyName = JSON.parse(sessionStorage.getItem("master")).entity[0].name;
    this.selectedSecurity = this.$route.params.securityData;
    this.issueDetails = this.selectedSecurity.allissues;
    this.issueDetails.map((val) => {
      //  this.no_of_issues = val.length;
      if (val["date_of_issue"]) {
        this.totalSubscribed += val.no_of_shares *val.issue_price;
        this.totalIssued += val.no_of_shares *val.issue_price;
        this.issues.push({
          issueName: val.name,
          issueDate: moment(String(val.date_of_issue)).format("DD-MM-YYYY"),
          issueShares: val.no_of_shares,
          issuePrice: val.issue_price,
          issueType: val.issue_type,
          id:val.issueid
        });
      } else {
        this.totalIssued += val.noOfShares *val.price;
        this.totalSubscribed += val.noOfShares *val.price;
        this.issues.push({
          issueName: val.name,
          issueDate: moment(val.date).format("DD-MM-YYYY"),
          issueShares: val.noOfShares,
          issuePrice: val.price,
          issueType: val.type,
          id:val.issueid
        });
      }
    });
  },
  methods: {
    topTableCalc(){
      if(this.issues.length){
        this.totalIssued = 0;
        this.totalSubscribed = 0;
      this.issues.forEach(val=>{
        this.totalIssued += val.issueShares *val.issuePrice;
        this.totalSubscribed += val.issueShares *val.issuePrice;
      })
      }
      else{
        this.totalIssued = 0;
        this.totalSubscribed = 0;
      }
    },
    onChangeSearch(e){
      this.securitySearch = e;
    },
        selectedSecurities(e){
      if(e.value)
      this.issuesToDelete.push(e.item);
      else
      this.issuesToDelete.splice(e.item.index,1);
    },
    selectedAllSecurities(e){
      this.issuesToDelete=[]
      if(e.value)
      this.issuesToDelete=e.items;
    },
    async deleteIssues(){
      var issuesIds =[];
      this.issuesToDelete.forEach(val=>{
        issuesIds.push(val.id)
      })
      var res = await this.$apiService.post(
          "/master/deleteMultipleIssues",
          {"issuesIds":issuesIds}
        );
        if (res && res.status === 200) {
          this.issues = this.issues.filter(val=>issuesIds.indexOf(val.id)==-1);
          this.topTableCalc()
        }
    },
        issueShareChange(){
      this.issueError.issueShareError =false;
    },
    issuePriceChange(){
      this.issueError.issuePriceError =false;
    },
    addIssues() {
      this.addIssueDialog = true;
    },
    addIssueSwitch() {
      this.$router.push("/securities");
    },
    async addNewIssues() {
           this.issueError.issueShareError=false;
     this.issueError.issueShareErrorMess='';     
      var remainingShare = this.selectedSecurity.authShares;
      this.issues.forEach(val=>{
        remainingShare-=Number(val.issueShares);
      })
      if(Number(this.issueNoOfShares)>remainingShare){
        this.issueError.issueShareError=true;
        this.issueError.issueShareErrorMess='Number of share share should be less than remaining share';
        return;        
      }

      this.issueError.issuePriceError = false;
      this.issueError.issuePriceErrorMess = '';
      if(this.issueType == "At Par" && Number(this.issuePrice) != Number(this.selectedSecurity.faceValue)){
        this.issueError.issuePriceError = true;
        this.issueError.issuePriceErrorMess = 'Issue Price should be equal to faceValue';
        return;
      }
      else if(this.issueType == "At Premium" && Number(this.issuePrice) <= Number(this.selectedSecurity.faceValue)){
        this.issueError.issuePriceError = true;
        this.issueError.issuePriceErrorMess = 'Issue Price should be greater than faceValue';
        return;
      }
      else if(this.issueType == "At Discount" && Number(this.issuePrice) >= Number(this.selectedSecurity.faceValue)){
        this.issueError.issuePriceError = true;
        this.issueError.issuePriceErrorMess = 'Issue Price should be less than faceValue';
        return;
      }


      const newIssueDetails = {
        name: this.issueName,
        date: this.issueDate,
        noOfShares: this.issueNoOfShares,
        type: this.issueType,
        price: this.issuePrice,
        securityId: this.selectedSecurity.securityId
      };

        var res = await this.$apiService.post(
          "/master/createissues",
          newIssueDetails
        );
        if (res && res.status === 200) {
          this.addIssueDialog = false;          
          this.issues.push({
          issueName: this.issueName,
          issueDate: moment(this.issueDate).format("DD-MM-YYYY"),
          issueShares: this.issueNoOfShares,
          issuePrice: this.issuePrice,
          issueType: this.issueType,
          id:res.data.data[0].issueid
        });
        this.topTableCalc();
        }
        else{
           this.addIssueDialog = false;
        }
    }
  },
};
</script>



<style scoped>
>>> .my-custom-dialog {
  align-self: flex-end;
  position: absolute;
  top: 0;
  z-index: 9999;
  right: 0px;
  margin-bottom: 19%;
  background: white !important;
  overflow: hidden;
}
.company-font{
    
font-size: 18px !important;
font-style: normal;
font-weight: 600;
color: #0398DC;
margin:0% 1% 1% 0%;
}
.year-font {
  
  font-size: 22px !important;
  font-style: normal;
  font-weight: 700;
  margin: 0% 8% 1% 5%;
}
.data-font {
  
  font-size: 17px !important;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  margin-left: 3%;
}
.divider-size {
  border-right: 1px solid rgba(64, 64, 64, 0.25);
  height: 2em;
  margin-top: 6% !important;
}
.blueUline {
  width: 100%;
  border-top: 3px solid #03a9f4;
  border-color: #03a9f4 !important;
}
.grey-divider {
  width: 100%;
  border-top: 1px solid #c4c4c4;
  border-color: #c4c4c4 !important;
}
.table-divider {
  border-right: 3px solid white;
  border-color: white !important;
}
.buttonDir-font{

    font-size: 14px !important;
    font-style: normal;
    font-weight: 500;
    color: grey;
}
.table-align {
  margin-top: 20px;
}
.label-font {
  font-size: 16px !important;
  font-style: normal;
  font-weight: 700;
  color: #0398dc;
}
.text-font {
  font-size: 16px !important;
  font-style: normal;
  font-weight: 500;
}
.card-align {
  display: flex;
  align-items: flex-initial !important;
}
.popup-allotment-title {
  font-style: normal;
  font-weight: 700 !important;
  color: #0398dc;
  margin: 5% 3% 3% 13%;
  text-align: initial;
}
.button-font {
  
  font-size: 14px !important;
  font-style: normal;
  font-weight: 500;
  width: 118px;
  height: 42px;
  margin-bottom: 4%;
}
/deep/ .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 13px !important;
    font-weight: 600;
    background-color: #ecebeb;
    text-align: start !important;
    padding-left: 55px;
    color: #808080;
}

/deep/.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    font-size: 13px !important;
    text-align: start !important;
    padding-left: 4vw;
}
  /deep/.v-input input {
      font-size: 14px !important;
  }
  /deep/.v-text-field--outlined.v-input--dense .v-label {
      font-size: 14px;
  }

  /deep/.theme--light.v-data-table {
    box-shadow: none !important;
  }
</style>