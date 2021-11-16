<template>
<div>
  <v-dialog content-class="my-custom-dialog"
      v-model="addStakeholderDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 dialog-popup" style="font-size:20px !important">
          Stakeholder
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
                       <v-text-field autocomplete="off" 
                            v-model="name"
                            outlined
                            dense
                             style="width:373px"
                            label="Name"
                            required
                        ></v-text-field>
               <v-select
                    v-model="residentialStatus"
                    :items="residentials"
                    outlined
                    style="width:373px"
                    dense
                    label="Residential Status"
                    required
                ></v-select>
 
                         <v-select
                    v-model="legalStatus"
                    :items="legals"
                    outlined
                    style="width:373px"
                    dense
                    label="Legal Status"
                    required
                ></v-select>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="isStakeEdit?editStakeholder():addStakeholderSwitch()"
            >
                {{isStakeEdit?"Update":"Add New"}}
            </v-btn>
        </v-dialog>
        <v-dialog content-class="my-custom-dialog"
      v-model="addDirectorStakeholderDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 dialog-popup" style="font-size:20px !important">
          Director Stakeholder
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
                       <v-text-field autocomplete="off" 
                            v-model="name"
                            outlined
                            dense
                             style="width:373px"
                            label="Name"
                            required
                        ></v-text-field>
               <v-select
                    v-model="residentialStatus"
                    :items="residential"
                    outlined
                    style="width:373px"
                    dense
                    label="Residential Status"
                    required
                ></v-select>
 
                         <v-select
                    v-model="legalStatus"
                    :items="legals"
                    outlined
                    style="width:373px"
                    dense
                    label="Legal Status"
                    required
                ></v-select>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="addDirectorStakeholderSwitch()"
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
<div style="margin: 1% 3%;max-height: 40vh;">
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
        <v-card
        max-width="100%;box-shadow: none;"
        class="table-align"
        >
        <v-card-title style="padding-left: 40px;">
            <button class="buttonDir-font" @click="addStakeholder()">
                <v-icon style="font-size:20px">mdi-plus</v-icon>
                    Add 
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
            <button class="buttonDir-font" @click="deleteStakeholders">
                <v-icon small style="font-size:20px">far fa-trash-alt</v-icon>
                    Delete
            </button>

            <v-spacer></v-spacer>
            <button class="buttonDir2-font" @click="addDirectorStakeholder()">
                    Add Director Stakeholder
            </button>
            <v-text-field autocomplete="off" 
                dense
                outlined
                append-icon="mdi-magnify"
                class="text-field-class"
                placeholder="Search here"
                v-model="search"
                style="width:359px;height:41px;margin-right:2%"
                @input="onChangeSearch"
                hide-details=false
            >
            </v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="stakeHolders.filter(val=>!search || new RegExp(search, 'i').test(val.stakeName))"            
            @item-selected="selectStakeholder"
            @toggle-select-all="selectedAllStakeholder"
            show-select
            :single-select="false"
            class="elevation-1 table-font"
            loading="No Rows Found"
            @click:row="stakeholderRowClick"
        >
      
      <template v-slot:item.actions="{ item }" >
      <div style="display:flex;justify-content:space-between;align-items:center;margin-right:1rem">
      <button class="action-button" @click.stop.prevent  @click="addAllotment(item)">
                <v-icon style="color:#0398DC;width:12px;height:12px;margin-right:8px">mdi-plus</v-icon>
                    Add Allotment
            </button>
           <v-menu
            bottom
            offset-y="true"
            right

          >
            <template v-slot:activator="{ on, attrs }">
                <v-icon small
                 v-bind="attrs"
                v-on="on"
        class="mr-2"
        style="color:black;width:3px;height:3px;font">mdi-dots-vertical</v-icon>
            </template>

            <v-list>
              <v-list-item
               
              >
                <v-list-item-title @click="editItem(item)"><v-icon style="margin-right:5px">mdi-pencil-outline</v-icon>Edit</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
               <v-list-item
               
              >
                <v-list-item-title @click="deleteStakeholder(item)"><v-icon style="margin-right:5px">mdi-delete-outline</v-icon>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </div>
    </template>

        </v-data-table>
            
        </v-card>
      <v-dialog v-model="addAllotmentData" max-width="40%">
<v-stepper v-model="e1" v-if="!isStepHidden" >
       <h1 class="text-h5 lighten-2 popup-allotment-title">
          Allotment
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-stepper-content step="1" >
      <v-card>
<v-card-text>
        <div>
         <v-layout style="display:flex;justify-content:space-between;margin-top:2%;width:100%">
          <v-flex xs5>
          <v-select
                    v-model="alSecuityType"
                    :items="typeOfSecurity"
                    @change="alSecurityTypeHandle"
                    outlined
                    dense
                    label="Type of Security"
                    required
                ></v-select>
          </v-flex>
          <v-flex xs5>
           <v-text-field autocomplete="off" 
                            v-model="alShareno"
                            outlined
                            dense
                            label="No of shares"
                            required
                            @input="alSharenoError=false"
                            :error="alSharenoError"
                            :error-messages="alSharenoError?'Value shouldn\'t greater than '+alShareErrorCount:''"
                        ></v-text-field>
          </v-flex>
          </v-layout>
           <div style="width:100%">
          <v-select
                    v-model="alIssueDetail"
                    :items="alIssueDetails"
                    outlined
                    @change="alIssueHandler"
                    dense
                    label="Issue Details"
                    required
                ></v-select>
          </div>
             <v-simple-table style="border:1px solid #C4C4C4;border-radius:5px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            No.of shares
          </th>
          <th class="text-left">
            Face Value
          </th>
          <th class="text-left">
            Issue Price
          </th>
          <th class="text-left">
            Total Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ alShareno?alShareno:'' }}</td>
          <td>{{ alCreateFaceValue?alCreateFaceValue:'' }}</td>
          <td>{{ alCreateIssuePrice?alCreateIssuePrice:'' }}</td>
          <td>{{ alShareno * alCreateIssuePrice?alShareno * alCreateIssuePrice:'' }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
        </div>
        </v-card-text>
      </v-card>
      </v-stepper-content>
      <v-stepper-content step="2" >
       <v-layout style="display:flex;justify-content:space-evenly;margin-top:2%;width:100%">
          <v-flex xs5>
           <v-text-field autocomplete="off" 
              v-model="allotmentDate"
              persistent-hint
              v-bind="attrs"
              v-on="on"
              format="MM-dd-yyyy"
              label="Date of Allotment"
              style="width: 373px"
              outlined
              type="date"
              dense
            ></v-text-field>
          </v-flex>
          <v-flex xs5>
           <v-text-field autocomplete="off" 
                            v-model="certificateno"
                            outlined
                            dense
                            label="Certificate No"
                            required
                        ></v-text-field>
          </v-flex>
          </v-layout>
              <v-layout style="display:flex;justify-content:space-evenly;margin-top:2%;width:100%">
          <v-flex xs5>
         <v-text-field autocomplete="off" 
                            v-model="distinctiveFrom"
                            outlined
                            dense
                            label="Distinctive No.    From"
                            required
                        ></v-text-field>
          </v-flex>
          <v-flex xs5>
           <v-text-field autocomplete="off" 
                            v-model="distinctiveTo"
                            outlined
                            dense
                            label="Distinctive No.    To"
                            required
                        ></v-text-field>
          </v-flex>
          </v-layout>
          <v-layout style="margin-top:2%;margin-left:5%;width:100%">
          <v-flex xs5>
           <v-text-field autocomplete="off" 
                            v-model="folioNo"
                            outlined
                            dense
                            label="Folio No."
                            required
                        ></v-text-field>
          </v-flex>
          </v-layout>
    </v-stepper-content>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2%">
      <v-stepper-header style="width:33%;box-shadow:none;margin-left:5%">
        <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>
  
        <v-divider style="border-color:#0398DC"></v-divider>
  
        <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step> 
      </v-stepper-header>
      <div style="display:flex;justify-content:space-between;margin-left:20%;">
             <v-btn v-if="e1!=1"
            color="primary"
            text
            @click="e1 = 1;"
            class="dialog-button"
            style="background: #0398DC;color:white !important;margin-right:15px !important;"
          >
           Previous
          </v-btn>
           <v-btn v-if="e1!=1"
            color="primary"
            text
            class="dialog-button"
            style="background: #0398DC;color:white !important;"
            @click="finishClick()"
          >
           Finish
          </v-btn>
      </div>
       <div style="margin-right:8%">
             <v-btn v-if="e1==1"
            color="primary"
            text
            class="dialog-button"
            @click="alCreate2ndPageHandler"
            style="background: #0398DC;color:white !important;"
          >
            Next
          </v-btn>
      </div>
    </div>
</v-stepper>
      </v-dialog>


</div>
</template>

<script>
import moment from "moment";
  export default {
    data() {
      return {
        companyName:"",
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
        alShareErrorCount:null,
        allotmentDate:null,
        certificateno:null,
        distinctiveFrom:null,
        distinctiveTo:null,
        folioNo:null,
        alCreateIssueShare:0,
        alCreateFaceValue:0,
        alCreateIssuePrice:0,
        alShareno:null,
        alSharenoError:false,
        alIssueDetails:[],
        alIssueDetail:"",
        typeOfSecurity:[],
        securities:[],
        stakeholdersToDelete:[],
        selectedStakeholder:{},
        isStakeEdit:false,
        name:"",
        residentialStatus:"",
        legalStatus:"",
        search:"",
        addAllotmentData: false,
        addStakeholderDialog:false,
        addDirectorStakeholderDialog:false,
        residentials:['Resident','Non-Resident'],
        legals:['Proprietor/Individual','Partnership','Private/Public Limited'],
        e1: "1",
        steps: 2,
        stakeHolders: [
          
        ],
        shares: [
          {
            noOfShares: 2,
            faceValue: 20,
            issuePrice: 22.00,
            totalAmount: 100
          },
          {
            noOfShares: 5,
            faceValue: 25,
            issuePrice: 35.00,
            totalAmount: 200
          },
        ],
        headers:[
                {text:'Name of the Stakeholder' , value:'stakeName', align: 'center'},
                {text:'Residential status' , value:'resStatus', align: 'center'},
                {text:'Legal status' , value:'legalStatus', align: 'center'},
                {text:'No.of allotments' , value:'allotment', align: 'center'},
                { text: '', value: 'actions', sortable: false },
            ],
      }
    },
     async mounted() {
       this.companyName = JSON.parse(sessionStorage.getItem("master")).entity[0].name;
    var securitiesRes = await this.$apiService.post(
          "/master/getSecurities",
          {companyid:Number(sessionStorage.getItem("companyId")),financialid:Number(sessionStorage.getItem("financialId"))}
        );
        if (securitiesRes && securitiesRes.status === 200) {
          securitiesRes.data.data.forEach((val,idx) => {  
            if(this.typeOfSecurity.indexOf(val.type_of_security)==-1)
            this.typeOfSecurity.push(val.type_of_security);                   
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
        }
    var res = await this.$apiService.post(
          "/master/getStakeholders",
          {companyid:Number(sessionStorage.getItem("companyId")),financialid:Number(sessionStorage.getItem("financialId"))}
        );
        if (res && res.status === 200) {
          res.data.data.forEach((val,idx) => { 
            val.allotments.forEach(val=>{
              if(val.type_of_security == "Equity Shares"){
                this.shareTable[0].allottedUnit += val["no_of_shares"];
                this.shareTable[0].allottedValue += val["no_of_shares"]*Number(val["issue_price"]);
              }
              else if(val.type_of_security == "Preference Shares"){
                this.shareTable[1].allottedUnit += val["no_of_shares"];
                this.shareTable[1].allottedValue += val["no_of_shares"]*Number(val["issue_price"]);
              }
              else if(val.type_of_security == "debenture"){
                this.shareTable[2].allottedUnit += val["no_of_shares"];
                this.shareTable[2].allottedValue += val["no_of_shares"]*Number(val["issue_price"]);
              }
              else if(val.type_of_security == "Bonds"){
                this.shareTable[3].allottedUnit += val["no_of_shares"];
                this.shareTable[3].allottedValue += val["no_of_shares"]*Number(val["issue_price"]);
              }

            })             
               this.stakeHolders.push({
            stakeName:val.name,
            resStatus:val.residential_status,
            legalStatus:val.legal_status,
            allotment:val.allotments.length,
            allAllotment:val.allotments,
            stakeHolderId: val.id,
            index:idx,
            allDetails:val
          });
          });
        }
  },
     watch: {
      dialog (val) {
        val || this.close()
      },
      addAllotmentData (val) {
        val || this.closeDelete()
      },
      steps (val) {
        if (this.e1 > val) {
            console.log(this.e1,"e1 value")
          this.e1 = val
        }
      },
    },
    methods:{
      stakeholderRowClick(e){
        this.$router.push({
        name: "StakeholderInfoTable",
        params: { stakeholderData: e ,typeOfSecurity:this.typeOfSecurity,securities:this.securities,stakeHolders:this.stakeHolders,selectedStakeholder:e,shareTable:this.shareTable},
      });
      },
      alCreate2ndPageHandler(){
        this.alShareErrorCount = this.alCreateIssueShare;
        this.stakeHolders.forEach(val=>{
          console.log(val,this.alSecuityType,this.alIssueDetail);          
          val.allAllotment.map(values=>{
            if(values.issuedetail == this.alIssueDetail)
            this.alShareErrorCount -= values.no_of_shares;
          })
        })
        if(this.alShareno> this.alShareErrorCount){
          this.alSharenoError=true;
          return;
        }
        this.e1 = 2;
        },
      alIssueHandler(e){
        console.log(e,"e");
        this.alCreateIssuePrice = Number(e.split("-")[4]);
        this.alCreateIssueShare = Number(e.split("-")[2]);
      },
      alSecurityTypeHandle(e){console.log(e);
      this.securities.forEach(val=>{
        if(val.securityType == e){
          this.alCreateFaceValue = Number(val.faceValue)
          val.allissues.forEach(x=>{
            var issue = `${x.name} - ${moment(x.date_of_issue).format("DD/MM/YYYY")} - ${x.no_of_shares} - ${x.issue_type} - ${x.issue_price}`; 
            this.alIssueDetails.push(issue); 
          })
        }
      })
      },
      async deleteStakeholder(item){
        const deleteStakeholderDetails = {
        stakeHolderId: item.stakeHolderId
      };

        var res = await this.$apiService.post(
          "/master/deleteStakeholders",
          deleteStakeholderDetails
        );
        if (res && res.status === 200) {
          this.stakeHolders.splice(this.selectedStakeholder.index,1);
        }
      },
    async deleteStakeholders(){
      var stakeholderIds =[];
      console.log(this.stakeholdersToDelete,"this.stakeholdersToDelete")
      this.stakeholdersToDelete.forEach(val=>{
        stakeholderIds.push(val.stakeHolderId)
      })
      var res = await this.$apiService.post(
          "/master/deleteMultipleStakeholders",
          {"stakeHolderId":stakeholderIds}
        );
        if (res && res.status === 200) {
          this.stakeHolders = this.stakeHolders.filter(val=>stakeholderIds.indexOf(val.stakeHolderId)==-1);
        }
    },  
      selectStakeholder(e){
      if(e.value)
      this.stakeholdersToDelete.push(e.item);
      else
      this.stakeholdersToDelete.splice(e.item.index,1);
    },
    selectedAllStakeholder(e){
      this.stakeholdersToDelete=[]
      if(e.value)
      this.stakeholdersToDelete=e.items;
    },
   closeDelete () {

      },
      addAllotment (item) {
        this.editedIndex = this.stakeHolders.indexOf(item)
        this.editedItem = Object.assign({}, item)

        this.alCreateFaceValue=null;
        this.alCreateIssuePrice=null;
        this.alSecuityType=null;
        this.alShareno=null;
        this.alIssueDetail=null;
        this.allotmentDate=null;
        this.certificateno=null;
        this.distinctiveFrom=null;
        this.distinctiveTo=null;
        this.folioNo=null;                
        this.selectedStakeholder = item;
        this.addAllotmentData = true;
        console.log(this.addAllotmentData,item,"yessss")
      },
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      addStakeholder()
      {
        this.isStakeEdit=false;
        this.name="";
        this.residentialStatus="";
        this.legalStatus="";
        this.addStakeholderDialog=true;
      },
      async editStakeholder(){
        console.log(this.selectedStakeholder,"this.selectedStakeholder")
      const editStakeholderDetails = {
        "name":this.name,
        "residentialStatus":this.residentialStatus,
        "legalStatus":this.legalStatus,
        "stakeHolderId":this.selectedStakeholder.stakeHolderId
      };

        var res = await this.$apiService.put(
          "/master/updateStakeholders",
          editStakeholderDetails
        );

        if (res && res.status === 200) {
          this.stakeHolders[this.selectedStakeholder.index].stakeName=this.name;
          this.stakeHolders[this.selectedStakeholder.index].residentialStatus=this.residentialStatus;
          this.stakeHolders[this.selectedStakeholder.index].legalStatus=this.legalStatus;
          this.addStakeholderDialog=false;
        }        
      },
      editItem(item){
        this.isStakeEdit=true;
        this.name=item.stakeName;
        this.residentialStatus=item.resStatus;
        this.legalStatus=item.legalStatus;
        this.selectedStakeholder = item;
        this.addStakeholderDialog=true;
      },
       addDirectorStakeholder()
      {
        this.addDirectorStakeholderDialog=true;
      },
      async addStakeholderSwitch()
      {
      const newStakeHolder = {
        name:this.name,
        residentialStatus:this.residentialStatus,
        legalStatus:this.legalStatus,
        companyid:Number(sessionStorage.getItem("companyId")),financialid:Number(sessionStorage.getItem("financialId"))
      };

        var res = await this.$apiService.post(
          "/master/createStakeholders",
          newStakeHolder
        );
        if (res && res.status === 200) {
           this.stakeHolders.push({
            stakeName:this.name,
            resStatus:this.residentialStatus,
            legalStatus:this.legalStatus,
            allotment:0,
            stakeHolderId: res.data.data[0].id,
            index:this.stakeHolders.length
          });
          this.addStakeholderDialog=false;
        }
        else{
          this.addStakeholderDialog=false;
        }
      },
       addDirectorStakeholderSwitch()
      {
        this.addDirectorStakeholderDialog=false;
      },
      async finishClick()
      {
        console.log(this.selectedStakeholder)
        var newAllotmentDetails = {
          "typeOfSecurity":this.alSecuityType,
          "issueDetail":this.alIssueDetail, 
          "numberOfShares":this.alShareno ,
          "faceValue":this.alCreateFaceValue.toString(),
          "issuePrice":this.alCreateIssuePrice,
          "dateOfAllotment":this.allotmentDate,
          "certificateNo":this.certificateno,
          "distinctiveFrom":this.distinctiveFrom,
          "distrinctiveTo":this.distinctiveTo,
          "folioNo":this.folioNo,
          "stakeHolderId":this.selectedStakeholder.stakeHolderId
        };
        var res = await this.$apiService.post(
          "/master/createAllotment",
          newAllotmentDetails
        );
        if (res && res.status === 200) {
          this.addAllotmentData=false;
           newAllotmentDetails["allotmentid"] = res.data.data[0].allotmentid;
          this.stakeHolders[this.selectedStakeholder.index].allAllotment.push(newAllotmentDetails)
          this.stakeHolders[this.selectedStakeholder.index].allotment++;
          this.$router.push({
            name: "StakeholderInfoTable",
            params: { stakeholderData: this.stakeHolders[this.selectedStakeholder.index] ,typeOfSecurity:this.typeOfSecurity,securities:this.securities,stakeHolders:this.stakeHolders,selectedStakeholder:this.selectedStakeholder,shareTable:this.shareTable},
          });
        }
        else{
           this.addAllotmentData=false;
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
    margin-bottom:19%;
    background:white !important;
    overflow:hidden;
  }
.company-font{
    font-family: Be Vietnam;
font-size: 18px !important;
font-style: normal;
font-weight: 600;
color: #0398DC;
margin:0% 1% 1% 0%;
}
.year-font{
    font-family: Be Vietnam;
font-size: 22px !important;
font-style: normal;
font-weight: 700;
margin:0% 8% 1% 5%;
}
.data-font{
    font-family: Be Vietnam;
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
    border-color:#03a9f4 !important;
}
.blueUline2{
    width:100%;
    border-top: 3px solid #03a9f4;
    border-color:#0398DC !important;
}
.table-divider
{
    border-right: 3px solid white;
    border-color:white !important;

}
.buttonDir-font{
font-family: Be Vietnam;
font-size: 14px !important;
font-style: normal;
font-weight: 400;
color:grey;
margin-right:2%;
margin-left:2%;
}
.buttonDir2-font{
font-family: Be Vietnam;
font-size: 14px !important;
font-style: normal;
font-weight: 500;
color:white;
margin-right:3%;
margin-left:2%;
background: #03a9f4;
height:35px;
width:244px;
border-radius:4px;
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
.action-button{
font-size: 16px !important;
font-style: normal;
font-weight: 400;
color:#0398DC;
}
.popup-allotment-title{
font-size: 21px !important;
font-style: normal;
font-weight: 700;
color:#0398DC;
margin:3%;
margin-left:10%;
text-align:initial;
}
.v-application .primary{
  background-color:#0398DC !important;
  border-color:#0398DC !important;
}
.dialog-button{
font-size: 18px !important;
font-style: normal;
font-weight: 500 !important;
border-radius:4px;
}
.dialog-popup{
font-style: normal;
font-weight: 700 !important;
color:#0398DC;
margin:5% 3% 3% 13%;
text-align:initial;
}
.button-font{
    font-family: Be Vietnam;
font-size: 14px !important;
font-style: normal;
font-weight: 500;
width:118px;
height:42px;
margin-bottom:4%;
}
.v-data-table>.v-data-table__wrapper>table>tbody>tr>td{
  border-bottom:none !important;
}

/deep/ .v-data-table__wrapper{
  width:100% !important;
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
  /deep/ button{
    font-size: 14px !important;
  }
</style>