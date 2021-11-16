<template>
  <div>
    <v-dialog v-model="addAllotmentData" max-width="40%">
      <v-stepper v-model="e1" v-if="!isStepHidden">
        <h1 style="font-size:20px !important" class="text-h5 lighten-2 popup-allotment-title">
          {{ this.isOpeningSave ? "Add Adhoc Opening Balance" : "Allotment" }}
        </h1>
        <v-divider class="blueUline2"></v-divider>
        <v-stepper-content step="1">
          <v-card>
            <v-card-text>
              <div>
                <v-layout
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2%;
                    width: 100%;
                  "
                >
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
                      @input="alSharenoError = false"
                      :error="alSharenoError"
                      :error-messages="
                        alSharenoError
                          ? 'Value shouldn\'t greater than ' + alShareErrorCount
                          : ''
                      "
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <div style="width: 100%">
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
                <v-simple-table
                  style="border: 1px solid #c4c4c4; border-radius: 5px"
                >
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">No.of shares</th>
                        <th class="text-left">Face Value</th>
                        <th class="text-left">Issue Price</th>
                        <th class="text-left">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ alShareno ? alShareno : "" }}</td>
                        <td>
                          {{ alCreateFaceValue ? alCreateFaceValue : "" }}
                        </td>
                        <td>
                          {{ alCreateIssuePrice ? alCreateIssuePrice : "" }}
                        </td>
                        <td>
                          {{
                            alShareno * alCreateIssuePrice
                              ? alShareno * alCreateIssuePrice
                              : ""
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </v-card-text>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-layout
            style="
              display: flex;
              justify-content: space-evenly;
              margin-top: 2%;
              width: 100%;
            "
          >
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
          <v-layout
            style="
              display: flex;
              justify-content: space-evenly;
              margin-top: 2%;
              width: 100%;
            "
          >
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
          <v-layout style="margin-top: 2%; margin-left: 5%; width: 100%">
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
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2%;
          "
        >
          <v-stepper-header
            style="width: 33%; box-shadow: none; margin-left: 5%"
          >
            <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>

            <v-divider style="border-color: #0398dc"></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>
          </v-stepper-header>
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-left: 20%;
            "
          >
            <v-btn
              v-if="e1 != 1"
              color="primary"
              text
              @click="e1 = 1"
              class="dialog-button"
              style="
                background: #0398dc;
                color: white !important;
                margin-right: 15px !important;
              "
            >
              Previous
            </v-btn>
            <v-btn
              v-if="e1 != 1"
              color="primary"
              text
              class="dialog-button"
              style="background: #0398dc; color: white !important"
              @click="finishClick()"
            >
              Finish
            </v-btn>
          </div>
          <div style="margin-right: 8%">
            <v-btn
              v-if="e1 == 1"
              color="primary"
              text
              class="dialog-button"
              @click="alCreate2ndPageHandler"
              style="background: #0398dc; color: white !important"
            >
              Next
            </v-btn>
          </div>
        </div>
      </v-stepper>
    </v-dialog>
    <v-dialog
      v-model="currentSelection"
      content-class="my-custom-dialog"
      width="60vw"
    >
      <h1 style="font-size:20px !important;margin: 15px 60px;" class="text-h5 lighten-2 popup-allotment-title">
        Share Transfer Details
      </h1>
      <v-divider class="blueUline2"></v-divider>
      <v-layout
        style="
          margin: 15px 60px;
        "
      >
        <v-flex xs6>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Transferee Name</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{transfers[0]?transfers[0].allDetails.name:""}}</p>
            </v-flex>
          </v-layout>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Folio No</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{transfers[0]?transfers[0].allDetails.foliono:""}}</p>
            </v-flex>
          </v-layout>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Sale price per security</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{transfers[0]?transfers[0].allDetails.saleprice:""}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Date of transfer</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{transfers[0]?transfers[0].allDetails.date.split("T")[0]:""}}</p>
            </v-flex>
          </v-layout>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Number of shares</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{transfers[0]?transfers[0].allDetails.noofshares:""}}</p>
            </v-flex>
          </v-layout>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Distinctive No.</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{transfers[0]?transfers[0].allDetails.distinctivefrom:""}}-{{transfers[0]?transfers[0].allDetails.distinctiveto:""}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-simple-table
        style="
          border: 1px solid #c4c4c4;
          border-radius: 5px;
          width: 83%;
          margin-bottom: 5%;
          margin-left: 8%;
        "
      >
          <thead>
            <tr>
              <th style="text-align:center">No.of shares</th>
              <th style="text-align:center">Face Value</th>
              <th style="text-align:center">Sale Price</th>
              <th style="text-align:center">Total Consideration</th>
            </tr>
          </thead>
          <tbody>
            <tr key="1">
              <td>{{transfers[0]?transfers[0].allDetails.noofshares:""}}</td>
              <td>{{""}}</td>
              <td>{{transfers[0]?transfers[0].allDetails.saleprice:""}}</td>
              <td>{{transfers[0]?transfers[0].allDetails.noofshares*transfers[0].allDetails.saleprice:""}}</td>
            </tr>
          </tbody>
      </v-simple-table>
    </v-dialog>
    <v-dialog
      v-model="allotmentSelection"
      content-class="my-custom-dialog"
      width="60vw"
    >
      <h1 style="font-size:20px !important;margin: 15px 60px;" class="text-h5 lighten-2 popup-allotment-title">Allotment Details</h1>
      <v-divider class="blueUline2"></v-divider>
      <v-layout
        style="
          margin: 15px 60px !important;
        "
      >
        <v-flex xs6>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Type of Security</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{seeAllotmentDetails.securityType}}</p>
            </v-flex>
          </v-layout>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">No. of shares</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{seeAllotmentDetails.allDetails?seeAllotmentDetails.allDetails.no_of_shares:""}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Issue price per security</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{issueDetailData[2]}}</p>
            </v-flex>
          </v-layout>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Issue Details</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{issueDetailData[1]}}<br />Issue ₹{{issueDetailData[4]}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-simple-table
        style="
          border: 1px solid #c4c4c4;
          border-radius: 5px;
          width: 83%;
          margin-bottom: 5%;
          margin-left: 8%;
        "
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th style="text-align:center">No.of shares</th>
              <th style="text-align:center">Face Value</th>
              <th style="text-align:center">Sale Price</th>
              <th style="text-align:center">Total Consideration</th>
            </tr>
          </thead>
          <tbody>
            <tr key="1">
              <td>{{seeAllotmentDetails.allDetails?seeAllotmentDetails.allDetails.no_of_shares:""}}</td>
              <td>{{seeAllotmentDetails.allDetails?seeAllotmentDetails.allDetails.face_value:""}}</td>
              <td>{{seeAllotmentDetails.allDetails?seeAllotmentDetails.allDetails.issue_price:""}}</td>
              <td>{{seeAllotmentDetails.allDetails?seeAllotmentDetails.allDetails.no_of_shares*seeAllotmentDetails.allDetails.issue_price:""}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-layout
        style="
          margin: 15px 60px !important;
        "
      >
        <v-flex xs6>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Date of allotment</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{seeAllotmentDetails.allotmentDate}}</p>
            </v-flex>
          </v-layout>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Share Distinctive No.</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{seeAllotmentDetails.allDetails?seeAllotmentDetails.allDetails.distinctive_from:""}}-{{seeAllotmentDetails.allDetails?seeAllotmentDetails.allDetails.distinctive_to:""}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Share certificate No.</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{seeAllotmentDetails.allDetails?seeAllotmentDetails.allDetails.certificate_no:""}}</p>
            </v-flex>
          </v-layout>
          <v-layout style="display: flex; margin-bottom: 3%">
            <v-flex xs5>
              <p class="form-header">Share folio No.</p>
            </v-flex>
            <v-flex xs1 style="text-align: left"> : </v-flex>
            <v-flex xs5>
              <p class="form-data">{{seeAllotmentDetails.allDetails?selectedStakeholder.allDetails.foliono:""}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
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

    <div class="container-align">
      <div style="display: flex; align-items: center; margin-left: 60px">
        <h1 class="main-header" style="font-size:20px !important;color: #808080;font-weight: 500;
    margin-right: 2%;">Stakeholder Info</h1>
        <button class="btn-edit" style="color:#b3b2b2;font-weight:500" @click="stakeholderInfoSwitch()">
          <v-icon large style="font-size: 20px;color: #b3b2b2;"> mdi-pencil-circle </v-icon> Edit
          Info
        </button>
      </div>
      <v-row style="margin-top: 1%;margin-bottom: 1%;margin-left: 50px;color:grey;max-height: 32vh;">
        <v-col cols="6" style="margin-top: 1%;    max-height: 32vh;">
          <v-row>
            <v-col cols="2">
              <p class="form-header">Name</p>
            </v-col>
            <v-col cols="1">
              <p>:</p>
            </v-col>
            <v-col cols="9">
              <p class="form-data">{{selectedStakeholder.stakeName || stakeHolderINT.stakeName}}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <p class="form-header">Address</p>
            </v-col>
            <v-col cols="1">
              <p>:</p>
            </v-col>
            <v-col cols="9">
              <p class="form-data" v-if="selectedStakeholder.allDetails&&selectedStakeholder.allDetails.permanentadd">
                {{selectedStakeholder.allDetails.permanentadd?selectedStakeholder.allDetails.permanentadd.buildingName:""}},{{selectedStakeholder.allDetails.permanentadd?selectedStakeholder.allDetails.permanentadd.street:""}}<br/>{{selectedStakeholder.allDetails.permanentadd?selectedStakeholder.allDetails.permanentadd.city:""}}-
              {{selectedStakeholder.allDetails.permanentadd?selectedStakeholder.allDetails.permanentadd.pincode:""}},{{selectedStakeholder.allDetails.permanentadd?selectedStakeholder.allDetails.permanentadd.state:""}},{{selectedStakeholder.allDetails.permanentadd?selectedStakeholder.allDetails.permanentadd.country:stakeHolderINT&&stakeHolderINT.allDetails?stakeHolderINT.allDetails.permanentadd.country:""}}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <p class="form-header">Folio No</p>
            </v-col>
            <v-col cols="1">
              <p>:</p>
            </v-col>
            <v-col cols="9">
              <p class="form-data">{{selectedStakeholder.allDetails?selectedStakeholder.allDetails.foliono:stakeHolderINT&&stakeHolderINT.allDetails?stakeHolderINT.allDetails.foliono:""}}</p>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6" style="max-height: 32vh;margin-top: -55px;">
          <v-simple-table
            class="table-simple v-data-table__divider"
            style="margin-left: 5%;"
          >
            <template v-slot:default>
              <thead style="margin-left: 2%">
                <tr
                  style="
                    background: rgba(3, 152, 220, 0.15);
                    height: 71px;
                    border: 2px solid red;
                  "
                >
                  <th
                    class="text-left tablesimple-header"
                    style="border-right: 1px solid white"
                  >
                    Type Of Security
                  </th>
                  <th
                    class="text-left tablesimple-header"
                    style="border-right: 1px solid white"
                  >
                    No Of Shares
                  </th>
                  <th
                    class="text-left tablesimple-header"
                    style="border-right: 1px solid white"
                  >
                    Total Value
                  </th>
                  <th
                    class="text-left tablesimple-header"
                    style="border-right: 1px solid white"
                  >
                    % of Holding
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key="1" style="background: #b6aeae40">
                  <td class="row-font" style="border-right: 1px solid white">
                    Equity
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTableNoOfShares[0] }}
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTableTotalValue[0] }}
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTablePercent[0] }}
                  </td>
                </tr>
                <tr key="2" style="background: #b6aeae40">
                  <td class="row-font" style="border-right: 1px solid white">
                    Preference
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTableNoOfShares[1] }}
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTableTotalValue[1] }}
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTablePercent[1] }}
                  </td>
                </tr>
                <tr key="3" style="background: #b6aeae40">
                  <td class="row-font" style="border-right: 1px solid white">
                    Debenture
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTableNoOfShares[2] }}
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTableTotalValue[2] }}
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTablePercent[2] }}
                  </td>
                </tr>
                <tr key="4" style="background: #b6aeae40">
                  <td class="row-font" style="border-right: 1px solid white">
                    Bonds
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTableNoOfShares[3] }}
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTableTotalValue[3] }}
                  </td>
                  <td style="border-right: 1px solid white">
                    {{ topTablePercent[3] }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <!-- <v-text-field autocomplete="off" 
            dense
            outlined
            append-icon="mdi-magnify"
            class="text-field-class"
            placeholder="Search here"
            v-model="search"
            style="
              width: 359px;
              height: 41px;
              margin-right: 2%;
              margin-left: 41%;
            "
            hide-details="false"
          >
          </v-text-field> -->
        </v-col>
      </v-row>
      <v-tabs v-model="tab" class="tab-decor" grow @change="tabChange">
        <v-tab v-for="item in items" :key="item" class="tab-decor1">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card max-width="100%" style="margin-top: 0px !important;box-shadow: none;" class="table-align">
            <v-card-title>
              <button class="buttonDir-font" @click="addAllotment()">
                <v-icon style="font-size:20px">mdi-plus</v-icon>
                Add Allotment
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
              <button class="buttonDir-font" @click="deleteAllotment">
                <v-icon small style="font-size:20px">far fa-trash-alt</v-icon>
                Delete
              </button>

              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="
                allotmentsRowData.filter(
                  (val) =>
                    !search || new RegExp(search, 'i').test(val.securityType)
                )
              "
              @item-selected="selectAllotment"
              @toggle-select-all="selectedAllAllotment"
              show-select
              :single-select="false"
              item-key="allotmentDate"
              class="elevation-1 table-font"
              loading="Loading...."
              @click:row="allotmentRowClick"
            >
              <template v-slot:header.name="{ header }">
                {{ header.text.toUpperCase() }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  @click.stop.prevent
                  style="font-size:20px"
                  @click="transferItem(item)"
                  >mdi-reply-all mdi-flip-h</v-icon
                >
              </template>
            </v-data-table>
          </v-card>
          <v-dialog v-model="transferDialog" max-width="50%">
            <v-stepper v-model="e1" v-if="!isStepHidden">
              <h1 style="font-size:20px !important;margin-left: 5%;" class="text-h5 lighten-2 popup-allotment-title">Transfer</h1>
              <v-divider class="blueUline2"></v-divider>
              <v-stepper-content step="1">
                <v-layout
                  style="
                    display: flex;
                    justify-content: space-evenly;
                    margin-top: 2%;
                    width: 100%;
                  "
                >
                  <v-flex xs5>
                    <v-select
                      v-model="transferName"
                      :items="transferNameOptions.map((val) => val.stakeName)"
                      outlined
                      dense
                      label="Transferee Name"
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field autocomplete="off" 
                      v-model="transFolioNo"
                      outlined
                      dense
                      label="Folio No"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout
                  style="
                    display: flex;
                    justify-content: space-evenly;
                    margin-top: 2%;
                    width: 100%;
                  "
                >
                  <v-flex xs5>
                    <v-text-field autocomplete="off" 
                      v-model="transDate"
                      persistent-hint
                      v-bind="attrs"
                      v-on="on"
                      format="MM-dd-yyyy"
                      label="Date of transfer"
                      style="width: 373px"
                      outlined
                      type="date"
                      dense
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field autocomplete="off" 
                      v-model="transNoOfShares"
                      outlined
                      dense
                      label="Number of shares"
                      required
                      @input="transferShareError = false"
                      :error="transferShareError"
                      :error-messages="
                        transferShareError
                          ? 'No Of Share should be less than total share'
                          : ''
                      "
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card>
                  <v-card-text>
                    <div>
                      <v-layout
                        style="
                          display: flex;
                          justify-content: space-evenly;
                          width: 100%;
                        "
                      >
                        <v-flex xs4>
                          <v-text-field autocomplete="off" 
                            v-model="transSalePrice"
                            outlined
                            dense
                            label="Sale price per security"
                            class="dialog-text"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs8>
                          <v-layout
                            style="
                              display: flex;
                              margin-left: 35%;
                              align-items: baseline;
                            "
                          >
                            <p class="dialog-text">Distinctive No.</p>
                            <v-flex xs3 style="margin-right: 15px">
                              <v-text-field autocomplete="off" 
                                v-model="transDisFrom"
                                outlined
                                dense
                                label="From"
                                required
                                style="width: 90px"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                              <v-text-field autocomplete="off" 
                                v-model="transDisTo"
                                outlined
                                dense
                                label="To"
                                style="width: 90px !important"
                                required
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                      <v-simple-table
                        style="border: 1px solid #c4c4c4; border-radius: 5px"
                      >
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">No.of shares</th>
                              <th class="text-left">Face Value</th>
                              <th class="text-left">Sale Price</th>
                              <th class="text-left">Total Consideration</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr key="1">
                              <td>{{ transNoOfShares }}</td>
                              <td>{{ transFaceValue }}</td>
                              <td>{{ transSalePrice }}</td>
                              <td>
                                {{
                                  Number(transNoOfShares) *
                                  Number(transSalePrice)
                                }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                  </v-card-text>
                </v-card>
              </v-stepper-content>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 2%;
                "
              >
                <v-stepper-header
                  style="width: 33%; box-shadow: none; margin-left: 3%"
                >
                  <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>

                  <v-divider style="border-color: #0398dc"></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>
                </v-stepper-header>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin-left: 20%;
                  "
                >
                  <v-btn
                    v-if="e1 != 1"
                    color="primary"
                    text
                    @click="e1 = 1"
                    class="dialog-button"
                    style="
                      background: #0398dc;
                      color: white !important;
                      margin-right: 15px !important;
                    "
                  >
                    Previous
                  </v-btn>
                  <v-btn
                    v-if="e1 != 1"
                    color="primary"
                    text
                    class="dialog-button"
                    @click="transferData()"
                    style="background: #0398dc; color: white !important"
                  >
                    Transfer
                  </v-btn>
                </div>
                <div style="margin-right: 8%">
                  <v-btn
                    v-if="e1 == 1"
                    color="primary"
                    text
                    class="dialog-button"
                    @click="preventTransferNext"
                    style="background: #0398dc; color: white !important"
                  >
                    Next
                  </v-btn>
                </div>
              </div>
            </v-stepper>
          </v-dialog>
        </v-tab-item>
        <v-tab-item>
          <v-card max-width="100%" class="table-align">
            <v-card-title>
              <button class="buttonDir-font">
                <v-icon style="font-size:20px">mdi-arrow-collapse-up</v-icon>
                Export
              </button>
              <v-divider
                inset
                vertical
                style="margin-top: 1.2%;max-height: 15px;margin-left: 1%;margin-right: 1%;"
              ></v-divider>
              <button class="buttonDir-font" @click="deleteAllotment">
                <v-icon small style="font-size:20px">far fa-trash-alt</v-icon>
                Delete
              </button>

              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :items="
                transfers.filter(
                  (val) => !search || new RegExp(search, 'i').test(val.name)
                )
              "
              @item-selected="selectAllotment"
              @toggle-select-all="selectedAllAllotment"
              show-select
              item-key="allotmentid"
              :single-select="false"
              :headers="headerstransfer"
              class="elevation-1 table-font"
              loading="Loading...."
              @click:row="handleClick"
            >
              <template v-slot:header.name="{ header }">
                {{ header.text.toUpperCase() }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  style="font-size:20px"
                  @click="transferItem(item)"
                  disabled="true"
                  >mdi-reply-all mdi-flip-h</v-icon
                >
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card max-width="100%" class="table-align">
            <v-card-title>
              <button class="buttonDir-font" @click="addOpeningAllotment()">
                <v-icon style="font-size:20px">mdi-plus</v-icon>
                Add Adhoc Opening Balance
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
              <button class="buttonDir-font" @click="deleteAllotment">
                <v-icon small style="font-size:20px">far fa-trash-alt</v-icon>
                Delete
              </button>

              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :headers="headersopening"
              :items="
                openings.filter(
                  (val) =>
                    !search || new RegExp(search, 'i').test(val.securityType)
                )
              "
              @item-selected="selectAllotment"
              @toggle-select-all="selectedAllAllotment"
              show-select
              :single-select="false"
              class="elevation-1 table-font"
              loading="Loading...."
            >
              <template v-slot:header.name="{ header }">
                {{ header.text.toUpperCase() }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  style="font-size:20px"
                  @click="transferItem(item)"
                  disabled="true"
                  >mdi-reply-all mdi-flip-h</v-icon
                >
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <div style="margin-left: 4%">
        <button class="action-button" @click="redirection()">
          <img
            src="../assets/left-arrow.png"
            style="color: #0398dc; width: 19px; height: 8px; margin-right: 8px"
            @click="goBack()"
          />
          Back to Stakeholder
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
export default {
  data() {
    return {
      stakeHolderINT:{},
      companyName:"",
      faceValue:0,
      currentTab: 0,
      isOpeningSave: false,
      seeAllotmentDetails:{"allDetails":null},
      transferShareError: false,
      selectedTransferItem: {},
      transFolioNo: null,
      issueDetailData:[],
      transDate: null,
      transNoOfShares: null,
      transSalePrice: null,
      transDisFrom: null,
      transDisTo: null,
      transFaceValue: null,
      transferNameOptions: [],
      transferName: "",
      topTableNoOfShares: [0, 0, 0, 0],
      topTableTotalValue: [0, 0, 0, 0],
      topTablePercent: [0, 0, 0, 0],
      addAllotmentData: false,
      alSecuityType: null,
      typeOfSecurity: [],
      alShareno: null,
      alSharenoError: false,
      alIssueDetail: "",
      alIssueDetails: [],
      alCreateFaceValue: 0,
      alCreateIssuePrice: 0,
      allotmentDate: null,
      certificateno: null,
      distinctiveFrom: null,
      distinctiveTo: null,
      folioNo: null,
      allotments: [],
      search: "",
      transferDialog: false,
      currentSelection: false,
      allotmentSelection: false,
      tab: null,
      stakeHolders: [],
      alottmentToDelete: [],
      e1: 1,
      steps: 1,
      securities: [],
      items: ["Allotments", "Transfers", "Opening Balance"],
      shares: [
        {
          noOfShares: 2,
          faceValue: 20,
          salePrice: 22.0,
          totalConsideration: 100,
        },
        {
          noOfShares: 5,
          faceValue: 25,
          salePrice: 35.0,
          totalConsideration: 200,
        },
      ],
      selectedStakeholder: [],
      headers: [
        { text: "Type of Security", value: "securityType", align: "center" },
        { text: "Date of Allotment", value: "allotmentDate", align: "center" },
        { text: "No. of Securities", value: "noOfSecurities", align: "center" },
        { text: "Total Amount", value: "totalAmount", align: "center" },
        {
          text: "Available Security Balance",
          value: "AvailableSecBal",
          align: "center",
        },
        {
          text: "Make Transfer",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      headerstransfer: [
        { text: "Status", value: "status", align: "center" },
        { text: "Name", value: "name", align: "center" },
        { text: "Date of transfer", value: "transferDate", align: "center" },
        { text: "No. of Securities", value: "noOfSecurities", align: "center" },
        { text: "Total Value", value: "totalValue", align: "center" },
        {
          text: "Available Security Balance",
          value: "AvailableSecBal",
          align: "center",
        },
        {
          text: "Make Transfer",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      headersopening: [
        { text: "Type of Security", value: "securityType", align: "center" },
        {
          text: "Opening Balance Date",
          value: "allotmentDate",
          align: "center",
        },
        { text: "No. of Securities", value: "noOfSecurities", align: "center" },
        { text: "Total Amount", value: "totalAmount", align: "center" },
        {
          text: "Available Security Balance",
          value: "AvailableSecBal",
          align: "center",
        },
        {
          text: "Make Transfer",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      allotmentsRowData: [],
      transfers: [],
      openings: [],
    };
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        console.log(this.e1, "e1 value");
        this.e1 = val;
      }
    },
  },
  mounted() {
    this.companyName = JSON.parse(sessionStorage.getItem("master")).entity[0].name;
    console.log(this.tab, "tab value", this.$route.params.stakeholderData);
    this.allotments = this.$route.params.stakeholderData.allAllotment;
    this.typeOfSecurity = this.$route.params.typeOfSecurity;
    this.securities = this.$route.params.securities;
    this.stakeHolders = this.$route.params.stakeHolders;
    this.stakeHolderINT = this.$route.params.stakeHolderINT;
    if(!this.stakeHolderINT) this.stakeHolderINT = {}
    console.log(this.stakeHolderINT.stakeName,"this.stakeHolderINT")
    //this.faceValue = this.securities.filter(val=>val.securityType == ).faceValue
    console.log(this.stakeHolders, "this.stakeHolders",this.securities,this.typeOfSecurity);
    this.stakeHolders.forEach((val) => {
      this.transferNameOptions.push({
        stakeName: val.stakeName,
        stakeHolderId: val.stakeHolderId,
      });
    });
    this.selectedStakeholder = this.$route.params.selectedStakeholder;
    console.log(this.selectedStakeholder,"selected one")
    if(this.allotments)
    this.allotments.map((val) => {
      console.log(val);
      console.log(this.topTable, "this.topTable");
      if (val.type_of_security) {
        (val.isopening ? this.openings : this.allotmentsRowData).push({
          allDetails:val,
          securityType: val.type_of_security,
          allotmentDate: moment(val.date_of_allotment).format("DD-MM-YYYY"),
          noOfSecurities: val.no_of_shares,
          totalAmount: Number(val.no_of_shares) * val.issue_price,
          AvailableSecBal: val.transferedsharecount
            ? val.transferedsharecount
            : 0,
          allotmentid: val.allotmentid,
        });
      } else {
        (val.isopening ? this.openings : this.allotmentsRowData).push({
          allDetails:val,
          securityType: val.typeOfSecurity,
          allotmentDate: val.dateOfAllotment,
          noOfSecurities: val.numberOfShares,
          totalAmount: Number(val.numberOfShares) * val.issuePrice,
          AvailableSecBal: val.transferedsharecount
            ? val.transferedsharecount
            : 0,
          allotmentid: val.allotmentid,
        });
      }
      this.refreshTopTable();
    });
  },
  methods: {
    refreshTopTable() {
      this.topTableNoOfShares = [0, 0, 0, 0];
      this.topTableTotalValue = [0, 0, 0, 0];
      this.topTablePercent = [0, 0, 0, 0];
      var shareTable = this.$route.params.shareTable;
      this.allotmentsRowData.forEach((val) => {
        if (val.securityType == "Equity Shares") {
          this.topTableNoOfShares[0] += val["noOfSecurities"];
          this.topTableTotalValue[0] += val.totalAmount;
        } else if (val.securityType == "Preference Shares") {
          this.topTableNoOfShares[1] += val["noOfSecurities"];
          this.topTableTotalValue[1] += val.totalAmount;
        } else if (val.securityType == "debenture") {
          this.topTableNoOfShares[2] += val["noOfSecurities"];
          this.topTableTotalValue[2] += val.totalAmount;
        } else if (val.securityType == "Bonds") {
          this.topTableNoOfShares[3] += val["noOfSecurities"];
          this.topTableTotalValue[3] += val.totalAmount;
        }
      });
      console.log(this.topTableNoOfShares[3] , shareTable[3].authorizedUnit)
      this.topTablePercent[0] = shareTable[0].authorizedUnit?(this.topTableNoOfShares[0] / shareTable[0].authorizedUnit)*100+"%":"0%";
      this.topTablePercent[1] = shareTable[1].authorizedUnit?(this.topTableNoOfShares[1] / shareTable[1].authorizedUnit)*100+"%":"0%";
      this.topTablePercent[2] = shareTable[2].authorizedUnit?(this.topTableNoOfShares[2] / shareTable[2].authorizedUnit)*100+"%":"0%";
      this.topTablePercent[3] = shareTable[3].authorizedUnit?(this.topTableNoOfShares[3] / shareTable[3].authorizedUnit)*100+"%":"0%";
      console.log(this.securities,"this.securities",this.allotmentsRowData)
    },
    addOpeningAllotment() {
      this.isOpeningSave = true;
      this.addAllotmentData = true;
    },
    async tabChange(e) {
      console.log(e, "e");
      this.alottmentToDelete = [];
      this.currentTab = e;
      if (e == 1) {
        var res = await this.$apiService.post("/master/getAllTransfers", {
          stakeHolderId: this.selectedStakeholder.stakeHolderId,
        });
        if (res && res.status === 200) {
          console.log(res);
          this.transfers = [];
          res.data.data.forEach((val) => {
            this.transfers.push({
              status: val.isreceived ? "Transfer Received" : "Transfer Made",
              name: val.name,
              transferDate: moment(String(val.date)).format("DD-MM-YYYY"),
              noOfSecurities: val.noofshares,
              totalValue: val.total,
              AvailableSecBal: val.noofshares,
              allotmentid: val.id,
              allDetails:val
            });
          });
        }
      }
    },
    preventTransferNext() {
      if (
        Number(this.transNoOfShares > this.selectedTransferItem.AvailableSecBal)
      ) {
        this.transferShareError = true;
      } else {
        this.e1 = 2;
        this.transferShareError = false;
      }
    },
    async deleteAllotment() {
      var allotmentIds = [];
      console.log(this.alottmentToDelete, "this.alottmentToDelete");
      this.alottmentToDelete.forEach((val) => {
        allotmentIds.push(val.allotmentid);
      });
      var res = await this.$apiService.post(
        this.currentTab != 1
          ? "/master/deleteMultipleAlottment"
          : "/master/deleteMultipletransfer",
        { allotmentId: allotmentIds }
      );
      if (res && res.status === 200) {
        if (this.currentTab == 0)
          this.allotmentsRowData = this.allotmentsRowData.filter(
            (val) => allotmentIds.indexOf(val.allotmentid) == -1
          );
        else if (this.currentTab == 1)
          this.transfers = this.transfers.filter(
            (val) => allotmentIds.indexOf(val.allotmentid) == -1
          );
        else if (this.currentTab == 2)
          this.openings = this.openings.filter(
            (val) => allotmentIds.indexOf(val.allotmentid) == -1
          );
        this.refreshTopTable();
      }
    },
    selectAllotment(e) {
      if (e.value) this.alottmentToDelete.push(e.item);
      else this.alottmentToDelete.splice(e.item.index, 1);
    },
    selectedAllAllotment(e) {
      this.alottmentToDelete = [];
      if (e.value) this.alottmentToDelete = e.items;
    },
    alCreate2ndPageHandler() {
      this.alShareErrorCount = this.alCreateIssueShare;
      this.stakeHolders.forEach((val) => {
        console.log(val, this.alSecuityType, this.alIssueDetail);
        val.allAllotment.map((values) => {
          if (values.issuedetail == this.alIssueDetail)
            this.alShareErrorCount -= values.no_of_shares;
        });
      });
      if (this.alShareno > this.alShareErrorCount) {
        this.alSharenoError = true;
        return;
      }
      this.e1 = 2;
    },
    async finishClick() {
      console.log(this.selectedStakeholder);
      var newAllotmentDetails = {
        typeOfSecurity: this.alSecuityType,
        issueDetail: this.alIssueDetail,
        numberOfShares: this.alShareno,
        faceValue: this.alCreateFaceValue.toString(),
        issuePrice: this.alCreateIssuePrice,
        dateOfAllotment: this.allotmentDate,
        certificateNo: this.certificateno,
        distinctiveFrom: this.distinctiveFrom,
        distrinctiveTo: this.distinctiveTo,
        folioNo: this.folioNo,
        stakeHolderId: this.selectedStakeholder.stakeHolderId,
        isOpeningAllotment: this.isOpeningSave,
      };
      var res = await this.$apiService.post(
        "/master/createAllotment",
        newAllotmentDetails
      );
      if (res && res.status === 200) {
        this.addAllotmentData = false;
        newAllotmentDetails["allotmentid"] = res.data.data[0].allotmentid;
        (this.isOpeningSave ? this.openings : this.allotmentsRowData).push({
          securityType: this.alSecuityType,
          allotmentDate: this.allotmentDate,
          noOfSecurities: this.alShareno,
          totalAmount: Number(this.alCreateFaceValue) * this.alCreateIssuePrice,
          AvailableSecBal:
            this.alShareno -
            (this.transferedsharecount ? this.transferedsharecount : 0),
        });
        this.refreshTopTable();
      } else {
        this.addAllotmentData = false;
      }
    },
    alSecurityTypeHandle(e) {
      console.log(e, this.securities);
      this.alIssueDetails = [];
      this.securities.forEach((val) => {
        if (val.securityType == e) {
          this.alCreateFaceValue = Number(val.faceValue);
          val.allissues.forEach((x) => {
            var issue = `${x.name} - ${moment(x.date_of_issue).format(
              "DD/MM/YYYY"
            )} - ${x.no_of_shares} - ${x.issue_type} - ${x.issue_price}`;
            this.alIssueDetails.push(issue);
          });
        }
      });
    },
    alIssueHandler(e) {
      console.log(e, "e");
      this.alCreateIssuePrice = Number(e.split("-")[4]);
      this.alCreateIssueShare = Number(e.split("-")[2]);
    },
    addAllotment() {
      this.addAllotmentData = true;
      this.isOpeningSave = false;
    },
    handleClick(item) {
      console.log(item,this.transfers[0],"transferrr");
      this.currentSelection = true;
    },
    allotmentRowClick(item) {
      console.log(item);
      this.seeAllotmentDetails=item;
      this.issueDetailData = this.seeAllotmentDetails.allDetails.issuedetail.split("-");
      this.allotmentSelection = true;
      console.log(this.seeAllotmentDetails,this.issueDetailData,"allotment see")
    },
    transferItem(item) {
      console.log(item, "item");
      this.selectedTransferItem = item;
      this.securities.forEach((val) => {
        if (val.securityType == item.securityType) {
          this.transFaceValue = Number(val.faceValue);
        }
      });
      this.transferDialog = true;
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    async transferData() {
      console.log(
        this.selectedTransferItem,
        this.transFolioNo,
        this.transDate,
        this.transNoOfShares,
        this.transSalePrice,
        this.transDisFrom,
        this.transDisTo,
        this.transFaceValue,
        this.transferName
      );
      var transferRes = await this.$apiService.post("/master/createTransfer", {
        availableSecBal:
          this.selectedTransferItem.AvailableSecBal - this.transNoOfShares,
        allotmentid: this.selectedTransferItem.allotmentid,
        isReceived: false,
        name: this.transferName,
        date: this.transDate,
        noOfShares: this.transNoOfShares,
        total: this.transNoOfShares * this.transSalePrice,
        salePrice: this.transSalePrice,
        distinctiveFrom: this.transDisFrom,
        distrinctiveTo: this.transDisTo,
        folioNo: this.transFolioNo,
        stakeHolderId: this.selectedStakeholder.stakeHolderId,
      });
      if (transferRes && transferRes.status === 200) {
        console.log(transferRes);
        this.allotmentsRowData = this.allotmentsRowData.map((val) => {
          if (val.allotmentid == this.selectedTransferItem.allotmentid) {
            val.AvailableSecBal =
              this.selectedTransferItem.AvailableSecBal - this.transNoOfShares;
          }
          return val;
        });
        this.transferDialog = false;
      }
    },
    stakeholderInfoSwitch() {
      this.$router.push({ name: "StakeholderInfo",params:{stakeHolderData:this.selectedStakeholder}});
    },
  },
};
</script>



<style scoped>
>>> .my-custom-dialog {
  margin-right: 3%;
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
.blueUline {
  width: 100%;
  border-top: 3px solid #03a9f4;
}
.container-align {
  margin-top: 2vh;
  text-align: left;
  margin-right: 10px !important;
}
.main-header {
  font-size: 24px !important;
  font-style: normal;
  font-weight: 700;
  color: #0398dc;
  margin-right: 4%;
}
.btn-edit {
  font-family: Be Vietnam;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 700;
}
.table-simple {
  display: flex;
  justify-content: center;
  height: 315px;
}
.tablesimple-header {
  font-size: 18px !important;
  font-style: normal;
  font-weight: 700;
}
.table.v-table thead th {
  font-size: 18px !important;
  font-style: normal !important;
  font-weight: 500 !important;
}
.form-header {
  font-size: 16px !important;
  font-style: normal;
  font-weight: 500;
  text-align: left !important;
}
.form-data {
  font-size: 16px !important;
  font-style: normal;
  font-weight: 400;
  text-align: left !important;
}
.tab-decor {
  color: #9f9f9f;
  font-family: Be Vietnam;
  font-size: 24px !important;
  font-style: normal;
  font-weight: 900 !important;
}

.tab-decor1 {
  font-weight: 700 !important;
}
.buttonDir-font {
  font-family: Be Vietnam;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 400;
  color: black;
  margin-right: 2%;
  margin-left: 2%;
}
.table-align {
  margin-top: 2% !important;
}
.action-button {
  font-size: 14px !important;
  font-style: normal;
  font-weight: 500;
  color: #0398dc;
}
.popup-allotment-title {
  font-size: 21px !important;
  font-style: normal;
  font-weight: 700;
  color: #0398dc;
  margin: 3%;
  margin-left: 10%;
  text-align: initial;
}
.v-application .primary {
  background-color: #0398dc !important;
  border-color: #0398dc !important;
}
.dialog-button {
  font-size: 14px !important;
  font-style: normal;
  font-weight: 500 !important;
  border-radius: 4px;
}
.dialog-text {
  font-size: 14px !important;
  font-style: normal;
  font-weight: 400;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  border-bottom: none !important;
}
.blueUline2 {
  width: 100%;
  border-top: 3px solid #03a9f4;
  border-color: #0398dc !important;
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