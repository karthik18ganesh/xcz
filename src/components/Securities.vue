<template>
  <div>
    <v-dialog
      content-class="my-custom-dialog"
      v-model="addSecurityDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition"
    >
      <h1
        class="text-h5 lighten-2 popup-allotment-title"
        style="font-size: 20px !important"
      >
        {{ header_name }}
      </h1>
      <v-divider class="blueUline2"></v-divider>
      <v-layout style="display: block; margin: 4% 13% 2% 13%">
        <v-select
          v-model="securityType"
          :items="securityTypeData"
          outlined
          style="width: 373px"
          dense
          label="Type of Security"
          required
        ></v-select>
        <v-select
          v-model="classType"
          :items="classTypeData"
          outlined
          style="width: 373px"
          dense
          label="Class Type"
          required
        ></v-select>
        <v-text-field autocomplete="off" 
          v-model="faceValue"
          outlined
          dense
          label="Face Value"
          required
          style="width: 373px"
        ></v-text-field>
        <v-text-field autocomplete="off" 
          v-model="noOfShares"
          outlined
          dense
          style="width: 373px"
          label="No.of shares Authorized"
          required
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
        @click="()=>{if(this.header_name == 'Edit Security')this.editSecurity();else this.addNewSecurity()}"
      >
        {{header_name == 'Edit Security'?"Update":"Add New"}}
      </v-btn>
    </v-dialog>
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
          :error-messages="issueError.issueShareError?issueError.issueShareErrorMess:''"
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
          :error-messages="issueError.issuePriceError?issueError.issuePriceErrorMess:''"
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

    <div style="margin: 1% 3.1%;">
      <v-simple-table class="table-simple v-data-table__divider ma-3">
          <thead style="margin-left: 2%">
            <tr
              style="
                background: rgba(3, 152, 220, 0.15);
                height: 71px;
                border: 2px solid red;
              "
            >
              <th></th>
              <th
                class="text-center tablesimple-header"
                style="border-right: 1px solid white"
                colspan="2"
              >
                <p>Authorized</p>
                <p></p>
                <div style="display: flex; justify-content: space-evenly">
                  <td
                    style="
                      font-size: 13px;
                      float: left !important;
                      width: 3rem;
                      margin-left: 2rem;
                    "
                  >
                    Units
                  </td>
                  <td
                    style="
                      font-size: 13px !important;
                      width: 3rem;
                      float: right;
                    "
                  >
                    Value
                  </td>
                </div>
              </th>
              <th
                class="text-center tablesimple-header"
                style="border-right: 1px solid white"
                colspan="2"
              >
                <p>Subscribed</p>
                <div style="display: flex; justify-content: space-evenly">
                  <td
                    style="
                      font-size: 13px;
                      float: left !important;
                      width: 3rem;
                      margin-left: 2rem;
                    "
                  >
                    Units
                  </td>
                  <td
                    style="
                      font-size: 13px !important;
                      width: 3rem;
                      float: right;
                    "
                  >
                    Value
                  </td>
                </div>
              </th>
              <th
                class="text-center tablesimple-header"
                style="border-right: 1px solid white"
                colspan="2"
              >
                <p>Issued</p>
                <div style="display: flex; justify-content: space-evenly">
                  <td
                    style="
                      font-size: 13px;
                      float: left !important;
                      width: 3rem;
                      margin-left: 2rem;
                    "
                  >
                    Units
                  </td>
                  <td
                    style="
                      font-size: 13px !important;
                      width: 3rem;
                      float: right;
                    "
                  >
                    Value
                  </td>
                </div>
              </th>
              <th
                class="text-center tablesimple-header"
                style="border-right: 1px solid white"
                colspan="2"
              >
                <p>Allotted</p>
                <div style="display: flex; justify-content: space-evenly">
                  <td
                    style="
                      font-size: 13px;
                      float: left !important;
                      width: 3rem;
                      margin-left: 2rem;
                    "
                  >
                    Units
                  </td>
                  <td
                    style="
                      font-size: 13px !important;
                      width: 3rem;
                      float: right;
                    "
                  >
                    Value
                  </td>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in shareTable"
              :key="item.securitiesType"
              style="background: #b6aeae40"
            >
              <td class="row-font" style="border-right: 1px solid white">
                {{ item.securitiesType }}
              </td>
              <td style="border-right: 1px solid white">
                {{ item.authorizedUnit }}
              </td>
              <td style="border-right: 1px solid white">
                {{ item.authorizedValue }}
              </td>
              <td style="border-right: 1px solid white">
                {{ item.subscribedUnit }}
              </td>
              <td style="border-right: 1px solid white">
                {{ item.subscribedValue }}
              </td>
              <td style="border-right: 1px solid white">
                {{ item.issuedUnit }}
              </td>
              <td style="border-right: 1px solid white">
                {{ item.issuedValue }}
              </td>
              <td style="border-right: 1px solid white">
                {{ item.allottedUnit }}
              </td>
              <td style="border-right: 1px solid white">
                {{ item.allottedValue }}
              </td>
            </tr>
          </tbody>
      </v-simple-table>
    </div>
    <v-divider class="blueline2"></v-divider>
    <v-card max-width="100%;margin: 5px 0px;box-shadow: none;" class="table-align">
      <v-card-title style="padding-left: 50px;">
        <button
          class="buttonDir-font"
          @click="addSecurityPop()"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon style="font-size:20px">mdi-plus</v-icon>
          Add Security
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
        <button class="buttonDir-font" @click="deleteSecurities">
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
        :items="securities.filter(val=>!securitySearch || new RegExp(securitySearch, 'i').test(val.securityType))"
        :single-select="singleSelect"
        @item-selected="selectedSecurities"
        @toggle-select-all="selectedAllSecurities"
        item-key="securityType"
        show-select
        class="elevation-1 table-font"
        loading="Loading...."
        @click:row="securityRowClick"
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
            <button class="action-button" @click.stop.prevent @click="(e)=>addIssues(item,e)">
              <v-icon
                style="
                  color: #0398dc;
                  width: 12px;
                  height: 12px;
                  margin-right: 8px;
                "
                >mdi-plus</v-icon
              >
              Add Issue
            </button>
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
  data() {
    return {
      companyName:"",
      securitySearch:null,
      issueError:{issuePriceError:false,issuePriceErrorMess:'',issueShareError:false,issueShareErrorMess:''},
      issueName:"",
      issueDate:"",
      issueNoOfShares:"",
      issueType:"",
      issuePrice:"",
      securitiesToDelete:[],
      addSecurityDialog: false,
      addIssueDialog: false,
      singleSelect: false,
      selectedSecurity: {},
      header_name: "",
      selected: [],
      no_of_issues: 0,
      securityTypeData: [
        "Equity Shares",
        "Preference Shares",
        "debenture",
        "Bonds",
      ],
      classTypeData: ["A", "B", "C", "D", "E", "F"],
      issueNames: ["Rights Issue", "Bonus Issue", "Preferential Allotment"],
      issueTypes: ["At Par", "At Premium", "At Discount"],
      securityDetails: [],
      securities: [],
      shareTable: [
        {
          securitiesType: "Equity",
          authorizedUnit: 0,
          authorizedValue: 0,
          subscribedUnit: 0,
          subscribedValue: 0,
          issuedUnit: 0,
          issuedValue: 0,
          allottedUnit: 0,
          allottedValue: 0,
        },
        {
          securitiesType: "Preference",
          authorizedUnit: 0,
          authorizedValue: 0,
          subscribedUnit: 0,
          subscribedValue: 0,
          issuedUnit: 0,
          issuedValue: 0,
          allottedUnit: 0,
          allottedValue: 0,
        },
        {
          securitiesType: "Debenture",
          authorizedUnit: 0,
          authorizedValue: 0,
          subscribedUnit: 0,
          subscribedValue: 0,
          issuedUnit: 0,
          issuedValue: 0,
          allottedUnit: 0,
          allottedValue: 0,
        },
        {
          securitiesType: "Bonds",
          authorizedUnit: 0,
          authorizedValue: 0,
          subscribedUnit: 0,
          subscribedValue: 0,
          issuedUnit: 0,
          issuedValue: 0,
          allottedUnit: 0,
          allottedValue: 0,
        },
      ],
      headers: [
        { text: "Type of Security", value: "securityType", align: "center" },
        { text: "Class Type", value: "classType", align: "center" },
        { text: "Face value", value: "faceValue", align: "center" },
        { text: "No.of issues", value: "issues", align: "center" },
        {
          text: "No.of shares authorized",
          value: "authShares",
          align: "center",
        },
        { text: "", value: "actions", align: "center", sortable: false },
      ],
    };
  },
  async mounted() {
    this.companyName = JSON.parse(sessionStorage.getItem("master")).entity[0].name;
    var res = await this.$apiService.post(
          "/master/getSecurities",
          {companyid:Number(sessionStorage.getItem("companyId")),financialid:Number(sessionStorage.getItem("financialId"))}
        );
        if (res && res.status === 200) {
          res.data.data.forEach((val,idx) => {              
              this.securities.push({
              securityType: val.type_of_security,
              classType: val.class_type,
              faceValue: val.face_value,
              issues: val.issues.length,
              allissues:val.issues,
              authShares: val.no_of_shared_authorized,
              securityId: val.id,
              index:idx
            });
          });
          this.calcTopTable();
        }
      var allotmentRes = await this.$apiService.post(
          "/master/getStakeholders",
          {companyid:Number(sessionStorage.getItem("companyId")),financialid:Number(sessionStorage.getItem("financialId"))}
        );
        if (allotmentRes && allotmentRes.status === 200) {
          allotmentRes.data.data.forEach((val) => { 
            val.allotments.forEach(val=>{
              if(val.type_of_security == "Equity Shares"){
                this.shareTable[0].allottedUnit += Number(val["no_of_shares"]);
                this.shareTable[0].allottedValue += Number(val["no_of_shares"])*Number(val["issue_price"]);
              }
              else if(val.type_of_security == "Preference Shares"){
                this.shareTable[1].allottedUnit += Number(val["no_of_shares"]);
                this.shareTable[1].allottedValue += Number(val["no_of_shares"])*Number(val["issue_price"]);
              }
              else if(val.type_of_security == "debenture"){
                this.shareTable[2].allottedUnit += Number(val["no_of_shares"]);
                this.shareTable[2].allottedValue += Number(val["no_of_shares"])*Number(val["issue_price"]);
              }
              else if(val.type_of_security == "Bonds"){
                this.shareTable[3].allottedUnit += Number(val["no_of_shares"]);
                this.shareTable[3].allottedValue += Number(val["no_of_shares"])*Number(val["issue_price"]);
              }

            })
          });
        }
  },
  methods: {
    calcTopTable(){
      this.securities.forEach(val=>{ 
                  if(val.securityType == "Equity Shares"){
              this.shareTable[0].authorizedUnit += val.authShares;
              this.shareTable[0].authorizedValue += val.authShares*Number(val.faceValue);
              val.allissues.forEach(issueValue=>{
                this.shareTable[0].subscribedUnit += issueValue.no_of_shares;
                this.shareTable[0].subscribedValue += issueValue.no_of_shares*issueValue.issue_price;
                this.shareTable[0].issuedUnit += issueValue.no_of_shares;
                this.shareTable[0].issuedValue += issueValue.no_of_shares*issueValue.issue_price;
              })              
            }
            else if(val.securityType == "Preference Shares"){
              this.shareTable[1].authorizedUnit += val.authShares;
              this.shareTable[1].authorizedValue += val.authShares*Number(val.faceValue);
              val.allissues.forEach(issueValue=>{
                this.shareTable[1].subscribedUnit += issueValue.no_of_shares;
                this.shareTable[1].subscribedValue += issueValue.no_of_shares*issueValue.issue_price;
                this.shareTable[1].issuedUnit += issueValue.no_of_shares;
                this.shareTable[1].issuedValue += issueValue.no_of_shares*issueValue.issue_price;
              })
            }
            else if(val.securityType == "debenture"){
              this.shareTable[2].authorizedUnit += val.authShares;
              this.shareTable[2].authorizedValue += val.authShares*Number(val.faceValue);
              val.allissues.forEach(issueValue=>{
                this.shareTable[2].subscribedUnit += issueValue.no_of_shares;
                this.shareTable[2].subscribedValue += issueValue.no_of_shares*issueValue.issue_price;
                this.shareTable[2].issuedUnit += issueValue.no_of_shares;
                this.shareTable[2].issuedValue += issueValue.no_of_shares*issueValue.issue_price;
              })
            }
            else if(val.securityType == "Bonds"){
              this.shareTable[3].authorizedUnit += val.authShares;
              this.shareTable[3].authorizedValue += val.authShares*Number(val.faceValue);
              val.allissues.forEach(issueValue=>{
                this.shareTable[3].subscribedUnit += issueValue.no_of_shares;
                this.shareTable[3].subscribedValue += issueValue.no_of_shares*issueValue.issue_price;
                this.shareTable[3].issuedUnit += issueValue.no_of_shares;
                this.shareTable[3].issuedValue += issueValue.no_of_shares*issueValue.issue_price;
              })
            }
      })

    },
    onChangeSearch(e){
      this.securitySearch = e;
    },
    issueShareChange(){
      this.issueError.issueShareError =false;
    },
    issuePriceChange(){
      this.issueError.issuePriceError =false;
    },
    async deleteSecurities(){
      var securityIds =[];
      this.securitiesToDelete.forEach(val=>{
        securityIds.push(val.securityId)
      })
      var res = await this.$apiService.post(
          "/master/deleteMultipleSecurities",
          {"securityIds":securityIds}
        );
        if (res && res.status === 200) {
          this.securities = this.securities.filter(val=>securityIds.indexOf(val.securityId)==-1);
          this.calcTopTable();
        }
    },
    selectedSecurities(e){
      if(e.value)
      this.securitiesToDelete.push(e.item);
      else
      this.securitiesToDelete.splice(e.item.index,1);
    },
    selectedAllSecurities(e){
      this.securitiesToDelete=[]
      if(e.value)
      this.securitiesToDelete=e.items;
    },
    addSecurityPop() {
      this.header_name = "Add Security";
      this.securityType = null;
      this.classType = null;
      this.faceValue = null;
      this.noOfShares = null;
      this.addSecurityDialog = true;
    },
    securityRowClick(e) { 
      this.$router.push({
        name: "NewIssue",
        params: { securityData: e },
      });
    },
    addIssues(item,e) {
      e.preventDefault();     
      this.selectedSecurity = item;
      this.editedIndex = this.securities.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.addIssueDialog = true;
    },
    editItem(item) {
      this.header_name = "Edit Security";
      this.addSecurityDialog = true;
      this.securityType = item.securityType;
      this.classType = item.classType;
      this.faceValue = item.faceValue;
      this.noOfShares = item.authShares;
      this.selectedSecurity = item;
    },
    async deleteItem(item) {
      const deleteSecurityDetails = {
        securityId: item.securityId
      };

        var res = await this.$apiService.post(
          "/master/deleteSecurities",
          deleteSecurityDetails
        );
        if (res && res.status === 200) {
          this.securities.splice(this.selectedSecurity.index,1);
          this.calcTopTable();
        }
    },
    async addNewSecurity() {
      const newSecurityDetails = {
        typeOfSecurity: this.securityType,
        classType: this.classType,
        faceValue: this.faceValue,
        noOfSharesAuthorized: this.noOfShares,
        companyid:Number(sessionStorage.getItem("companyId")),financialid:Number(sessionStorage.getItem("financialId"))
      };

        var res = await this.$apiService.post(
          "/master/createSecurities",
          newSecurityDetails
        );
        if (res && res.status === 200) {
           this.securities.push({
            securityType: this.securityType,
            classType: this.classType,
            faceValue: this.faceValue,
            issues: 0,
            authShares: this.noOfShares,
            securityId: res.data.data[0].id,
            index:this.securities.length,allissues:[]
          });
          this.calcTopTable();
          this.addSecurityDialog = false;
        }
        else{
          this.addSecurityDialog = false;
        }
    },
    async editSecurity() {
      const editSecurityDetails = {
        typeOfSecurity: this.securityType,
        classType: this.classType,
        faceValue: this.faceValue,
        noOfSharesAuthorized: this.noOfShares,
        securityId:this.selectedSecurity.securityId
      };

        var res = await this.$apiService.put(
          "/master/updateSecurities",
          editSecurityDetails
        );

        if (res && res.status === 200) {
          this.securities[this.selectedSecurity.index].securityType = this.securityType;
          this.securities[this.selectedSecurity.index].classType = this.classType;
          this.securities[this.selectedSecurity.index].faceValue = this.faceValue;
          this.securities[this.selectedSecurity.index].authShares = this.noOfShares;
          this.addSecurityDialog = false;
          this.calcTopTable();
        }
    },
    async addNewIssues() {
           this.issueError.issueShareError=false;
     this.issueError.issueShareErrorMess='';     
      var remainingShare = this.securities[this.selectedSecurity.index].authShares;
      this.securities[this.selectedSecurity.index].allissues.forEach(val=>{
        remainingShare-=Number(val.noOfShares);
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
        securityId: this.securities[this.selectedSecurity.index].securityId
      };

        var res = await this.$apiService.post(
          "/master/createissues",
          newIssueDetails
        );
        if (res && res.status === 200) {
          this.addIssueDialog = false;
          newIssueDetails["issueid"] = res.data.data[0].issueid;
          this.securities[this.selectedSecurity.index].allissues.push(newIssueDetails)
          this.securities[this.selectedSecurity.index].issues++;
          this.calcTopTable();
          this.$router.push({
            name: "NewIssue",
            params: { securityData: this.securities[this.selectedSecurity.index] },
          });
        }
        else{
           this.addIssueDialog = false;
        }
    },
  },
};
</script>



<style scoped>
>>> .my-custom-dialog {
  align-self: flex-end;
  position: absolute;
  top:0;
  z-index: 9999;
  right: 0px;
  margin-bottom: 19%;
  background: white !important;
  overflow: hidden;
}
.company-font{
    font-family: Be Vietnam;
font-size: 18px !important;
font-style: normal;
font-weight: 600;
color: #0398DC;
margin:0% 1% 1% 0%;
}
.year-font {
  font-family: Be Vietnam;
  font-size: 22px !important;
  font-style: normal;
  font-weight: 700;
  margin: 0% 8% 1% 5%;
}
.data-font {
  font-family: Be Vietnam;
  font-size: 17px !important;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  margin-left: 3%;
}
.divider-size {
  border-right: 1px solid rgba(64, 64, 64, 0.25);
  height: 3em;
  margin-top: 6% !important;
}
.blueline2 {
  border-top: 3px solid #0398dc;
  width: 100%;
  border-color: #0398dc !important;
}
.blueUline {
  width: 100%;
  border-top: 3px solid #03a9f4;
  border-color: #03a9f4 !important;
}
.table-divider {
  border-right: 3px solid white;
  border-color: white !important;
}
.buttonDir-font{
font-family: Be Vietnam;
    font-size: 14px !important;
    font-style: normal;
    font-weight: 500;
    color: grey;
}
.table-align {
  margin-top: 20px;
}
.blueUline2 {
  width: 100%;
  border-top: 3px solid #03a9f4;
  border-color: #0398dc !important;
}
.popup-allotment-title {
  font-style: normal;
  font-weight: 700 !important;
  color: #0398dc;
  margin: 5% 3% 3% 13%;
  text-align: initial;
}
.v-dialog {
  background: white !important;
}
.button-font {
  font-family: Be Vietnam;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 500;
  width: 118px;
  height: 42px;
  margin-bottom: 4%;
}
.action-button {
  font-size: 16px !important;
  font-style: normal;
  font-weight: 400;
  color: #0398dc;
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