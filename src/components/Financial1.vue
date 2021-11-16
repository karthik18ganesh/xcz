<template>
  <v-container style="display: block" fluid class="whhite darken-5">
    <v-row class="companyHeader companyHeaderNew">
      <v-col cols="3" style="padding: 0px">
        <p
          style="
            margin-bottom: 0px;
            width: 100%;
            font-size: 14px;
            text-align: start;
          "
        >
          BSY PVT Limited
          <span
            style="
              padding: 0px 5px;
              font-weight: 600;
              font-size: 14px;
              color: #828282bd;
            "
          >
            <v-icon color="#676767" style="font-size: 14px" dark
              >mdi-chevron-right</v-icon
            >
          </span>
          Balance Sheet
          <span
            style="
              padding: 0px 5px;
              font-weight: 600;
              font-size: 14px;
              color: #828282bd;
            "
          >
            <v-icon color="#676767" style="font-size: 14px" dark
              >mdi-chevron-right</v-icon
            >
          </span>
          Cash and Cash Equivalents
        </p>
      </v-col>
    </v-row>

    <div>
      <v-layout>
        <v-flex xs5 md5 style="margin-top:1%; text:align: left">
          <v-breadcrumbs :items="breadcrumbsItems" large>
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>
      <div class="container-align">
        <v-layout>
          <v-flex xs4 md4>
            <h4>
              <u style="text-decoration-color: #0398dc"
                >Note 21. Cash and Cash Equivalents</u
              >
            </h4>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs3 md3>
            <h4>Amount in .......</h4>
            
          </v-flex>
         
                        <span>
                <div style="text-align: right; padding: 10px">
                  <v-dialog persistent v-model="AE_dialog" width="850">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" outlined color="primary">
                        <v-icon small color="black"> mdi-plus </v-icon>
                        AE
                      </v-btn>
                    </template>

                    <v-card class="mx-auto" width="850">
                      <v-card-title>
                        <h3>Add Entry</h3>
                      </v-card-title>

                      <v-divider class="blueUline"></v-divider>

                      <v-layout v-for="(input, k) in addEntryInputs" :key="k">
                        <v-flex
                          xs4
                          md4
                          style="margin-right: 2%; margin-left: 2%"
                        >
                          <v-select
                            v-model="input.ledgers"
                            :items="ledgerList"
                            label="Select Ledgers"
                            outlined
                            dense
                          >
                          </v-select>
                        </v-flex>

                        <v-flex xs1 md1 style="margin-right: 2%">
                          <v-select
                            v-model="input.drCr"
                            label="Dr"
                            outlined
                            dense
                          >
                          </v-select>
                        </v-flex>
                        <v-flex xs3 m3 style="margin-right: 2%">
                          <v-text-field
                            v-model="input.amount"
                            label="Amount"
                            outlined
                            dense
                          >
                          </v-text-field>
                        </v-flex>

                        <v-flex xs2>
                          <v-btn
                            class="mx-2"
                            outlined
                            fab
                            color="primary"
                            x-small
                            @click="add(k)"
                          >
                            <v-icon x-small>mdi-plus</v-icon>
                          </v-btn>
                          <v-btn
                            class="mx-2"
                            outlined
                            fab
                            color="primary"
                            x-small
                            @click="remove(k)"
                          >
                            <v-icon x-small>mdi-minus</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>

                      <v-layout>
                        <v-flex
                          xs4
                          md4
                          style="margin-right: 2%; margin-left: 2%"
                        >
                          <!-- Add New Ledger -->
                          <v-dialog
                            v-model="newLedger_dialog"
                            persistent
                            width="580"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-select
                                label="Select Ledgers"
                                v-model="ledger2"
                                :items="ledgerList"
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                dense
                              >
                              </v-select>
                            </template>

                            <div v-if="ledger2 === 'Add New'">
                              <v-card class="mx-auto" width="600">
                                <v-card-title style="margin: 10px">
                                  <h3>Add New Ledger</h3>
                                </v-card-title>

                                <v-divider class="blueUline"></v-divider>

                                <v-row style="margin-left: 2%">
                                  <v-col cols="12" sm="10" md="8">
                                    <v-text-field
                                      outlined
                                      dense
                                      label="Name of the Ledger"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>

                                <v-row style="margin-left: 2%">
                                  <v-col cols="11" sm="13" md="10">
                                    <v-select
                                      outlined
                                      dense
                                      label="Level 1"
                                    ></v-select>
                                  </v-col>
                                </v-row>

                                <v-row style="margin-left: 2%">
                                  <v-col cols="11" sm="13" md="10">
                                    <v-select
                                      outlined
                                      dense
                                      label="Level 2"
                                    ></v-select>
                                  </v-col>
                                </v-row>

                                <v-row style="margin-left: 2%">
                                  <v-col cols="11" sm="13" md="10">
                                    <v-select
                                      outlined
                                      dense
                                      label="Level 3"
                                    ></v-select>
                                  </v-col>
                                </v-row>

                                <v-divider class="blueUline"></v-divider>

                                <v-btn
                                  small
                                  flat
                                  color="primary"
                                  @click="newLedger_dialog = false"
                                >
                                  Create
                                </v-btn>
                              </v-card>
                            </div>
                          </v-dialog>

                          <!-- ================================= -->
                        </v-flex>

                        <v-flex xs1 md1 style="margin-right: 2%">
                          <v-select label="Cr" outlined dense> </v-select>
                        </v-flex>
                        <v-flex xs3 m3 style="margin-right: 2%">
                          <v-text-field label="Amount" outlined dense>
                          </v-text-field>
                        </v-flex>

                        <v-flex xs2>
                          <v-btn
                            class="mx-2"
                            outlined
                            fab
                            color="primary"
                            x-small
                            @click="add(k)"
                          >
                            <v-icon x-small dense>mdi-plus</v-icon>
                          </v-btn>
                          <v-btn
                            class="mx-2"
                            outlined
                            fab
                            color="primary"
                            x-small
                            @click="remove(k)"
                          >
                            <v-icon x-small>mdi-minus</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>

                      <v-layout>
                        <v-flex
                          xs8
                          md8
                          style="margin-left: 2%; margin-right: 3%"
                        >
                          <v-textarea
                            background-color="grey lighten-2"
                            color="cyan"
                            label="Narration"
                          ></v-textarea>
                        </v-flex>
                      </v-layout>

                      <div style="text-align: left; margin-left: 15px">
                        <b-form-file v-model="file2" accept=".pdf" plain>
                          <img src="../assets/attachment.png" />
                        </b-form-file>
                      </div>

                      <v-divider class="blueUline"></v-divider>

                      <v-layout>
                        <v-flex xs2 md2>
                          <h6>Total</h6>
                        </v-flex>

                        <v-flex xs4 md4 style="margin-right: 0%">
                          <v-layout>
                            <v-flex xs3 md3 style="margin-right: 2%"
                              ><h6>Debits =</h6></v-flex
                            >
                            <v-flex xs3 md3>
                              <v-text-field dense outlined></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex xs4 md4>
                          <v-layout>
                            <v-flex xs3 md3 style="margin-right: 2%"
                              ><h6>Credits =</h6></v-flex
                            >
                            <v-flex xs3 md3>
                              <v-text-field dense outlined></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex xs3 md3 style="margin-right: 2%">
                          <v-btn small color="primary">
                            Save & Add New
                            <v-icon x-small> fas fa-chevron-down</v-icon></v-btn
                          >
                        </v-flex>

                        <v-flex xs2 md2>
                          <v-btn
                            small
                            color="primary"
                            @click="AE_dialog = false"
                            >Close</v-btn
                          >
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-dialog>
                </div>
              </span>
        </v-layout>

        <!--Add Entry Dialog -->

        <!--=========================================== Table data -->
        <v-row style="margin-top: 20px; display: flex; justify-content: center">
          <v-card
            v-bind:class="{ ledgerViweTbHg: !groupingSelected }"
            class="cardStyle"
            style="min-height: 60vh; margin: 6px; width: 97.5%"
          >
            <ag-grid-vue
              style="width: 100%; height: 100%"
              class="ag-theme-material"
              id="myGrid"
              :columnDefs="columnDefs"
              :rowData="rowData"
              :context="context"
              @grid-ready="onGridReady"
              :defaultColDef="defaultColDef"
              :getRowNodeId="getRowNodeId"
              :pagination="false"
              :aggFuncs="aggFuncs"
            >
            </ag-grid-vue>
          </v-card>
        </v-row>

        <v-dialog
          v-model="listLedger"
          content-class="listDialogStyle"
          width="75vw"
        >
          <v-card style="width: 100%; height: 100%">
            <v-toolbar flat dense>
              <v-layout>
                <v-flex xs3 md3>
                  <p></p>
                  <h1 style="font-weight: bold">
                    {{ listLedgerTitle }}
                  </h1>
                </v-flex>

                <v-spacer></v-spacer>
                <v-flex xs4 md4>
                  <p></p>
                  <v-checkbox
                    label="Reclassify"
                    v-model="reclassifyCheck"
                  ></v-checkbox>
                </v-flex>
              </v-layout>

              <button
                transparent
                @click="(listLedger = false), (reclassifyDialog = false)"
              >
                <img src="../assets/closeicon.png" height="35" />
              </button>
            </v-toolbar>
            <hr class="alertDivider" />
            <div v-if="reclassifyCheck === true">
              <v-layout style="margin: 0% 2%">
                <v-flex xs4 md4 style="margin-right: 2%">
                  <v-select
                    dense
                    outlined
                    label="Select Ledgers to classify"
                    multiple
                    :items="ledgerList"
                    item-text="name"
                    item-value="name"
                    @click="getLedgerList()"
                  >
                  </v-select>
                </v-flex>
                <v-flex xs4 md4>
                  <v-select
                    dense
                    outlined
                    label="Reclassification Period"
                    :items="reclassifyPeriod"
                    item-text="name"
                    item-vale="name"
                  >
                  </v-select>
                </v-flex>
              </v-layout>

              <v-layout style="margin: 0% 2%">
                <v-flex xs4 md4 style="margin-right: 2%">
                  <v-select
                    dense
                    outlined
                    label="Level 1 Reclassification"
                    :items="level1List"
                    item-text="name"
                    item-value="name"
                    :rowSelection="single" 
                    @click="getLevel1List()"
                  >
                  </v-select>
                </v-flex>

                <v-flex xs4 md4 style="margin-right: 2%">
                  <v-select
                  v-model='selectedL1Item' 
                    dense
                    outlined
                    label="Level 2 Reclassification"
                    :items="level2List"
                    item-text="name"
                    item-value="name"
                    @click="getLevel2List()"
                  >
                  </v-select>
                  
                </v-flex>

                <v-flex xs4 md4 style="margin-right: 2%">
                  <v-select dense outlined label="Level 3 Reclassification"
                  :items="level3List"
                  item-text="name"
                  item-value="name"
                  @click="getLevel3List()"
                  >
                  </v-select>
                </v-flex>

                <v-flex xs4 md4>
                  <v-select dense outlined label="Category"
                  :items="category"
                  item-text="name"
                  item-value="name"
                  > </v-select>
                </v-flex>
              </v-layout>

              <div
                style="text-align: center; margin-top: 2%; margin-bottom: 2%"
              >
                <v-dialog width="310" v-model="selectionDialog">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-on="on" v-bind="attrs"
                      >Reclassify</v-btn
                    >
                  </template>

                  <v-card width="350" >
                    <v-card-title>
                      <p>Selected ledgers have been classified</p>
                    </v-card-title>

                    <div style="text-align: center; padding: 5%">
                      <v-btn color="primary" @click="selectionDialog = false"
                        >OK</v-btn
                      >
                    </div>
                  </v-card>
                </v-dialog>
              </div>
            </div>

            
            <v-card-title class="text-h5 white darken-2"> </v-card-title>

            <ag-grid-vue
              style="width: 80vw; height: 200px"
              class="ag-theme-material"
              id="myGridList"
              :columnDefs="listColumnDefs"
              :rowData="listrowData"
              :pagination="false"
              :context="context2"
              @grid-ready="onGridReadyList"
              :defaultColDef="defaultColDef"
            >
            </ag-grid-vue>

            <!-- <v-list-item
              v-for="(item, index) in listLedgerValues"
              :key="index"

            >
              <v-list-item-title>{{item.name}} {{item.openingbal}} {{item.closingbal}}</v-list-item-title>
            </v-list-item>-->
          </v-card>
        </v-dialog>
        <v-card class="mx-auto">
            <template v-slot:cell(icons)="data">
              <div style="padding: 2px">
                <span>
                  <img
                    v-if="isRowGroupOpen[data.item.category]"
                    @click="() => rowGroupHandler(data.item.category, 1)"
                    src="../assets/ungroup.jpg"
                    height="15"
                    width="15"
                    style="
                      position: relative;
                      top: 5px;
                      cursor: pointer;
                      margin-left: 5px;
                    "
                  />
                  <img
                    v-if="!isRowGroupOpen[data.item.category]"
                    @click="() => rowGroupHandler(data.item.category, 2)"
                    src="../assets/group.jpg"
                    height="15"
                    width="15"
                    style="
                      position: relative;
                      top: 5px;
                      cursor: pointer;
                      margin-left: 5px;
                    "
                  />
                </span>

                <span>
                  <button transparent style="padding: 3px">
                    <v-icon small dense> far fa-comment-dots</v-icon>
                  </button>
                  <button transparent>
                    <v-icon small dense> fas fa-list</v-icon>
                  </button>
                </span>
              </div>
            </template>

            <template v-slot:cell(lists)="">
              <div style="text-align: left">
                <span>
                  <v-menu bottom left flat>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon small>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                   
                  </v-menu>
                </span>
              </div>
            </template>

            <template v-slot:foot(id)="">
              <span></span>
            </template>

            <!-- ================================================================================= -->
            <template v-slot:head(lists)="">
            
            </template>

            <!-- ==================================================================================== -->

            <template v-slot:foot(particulars)="">
              <span style="color: rgba(3, 152, 220, 1)">Total amount</span>
            </template>

            <template v-slot:foot(fromdate)="">
              <u
                ><span style="border-bottom: 2px solid; padding: 2px"
                  >Total amount</span
                ></u
              >
            </template>

            <template v-slot:foot(todate)="">
              <u
                ><span style="border-bottom: 2px solid; padding: 2px"
                  >Total amount</span
                ></u
              >
            </template>
<v-footer app bottom fixed class="font-weight-medium">
  <v-spacer></v-spacer>
  <v-btn flat small color="primary" style="margin-right: 2%" >
              Save
            </v-btn>
            <v-btn flat small color="primary"> Validate </v-btn>
            <v-spacer></v-spacer>
              <v-menu top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn flat small color="primary" v-on="on" v-bind="attrs">
                    Disclosures
                    <v-icon small> mdi-chevron-up</v-icon>
                  </v-btn>
                </template>
                <v-list dense class="tile">
                  <v-list-item dense>
                    <v-list-item-title>
                      <ShowDisclosure></ShowDisclosure>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item dense>
                    <v-list-item-title>
                      <AddDisclosure></AddDisclosure>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              
            
          
          </v-footer>
          
            

          
        </v-card>
      </div>
    </div>
  </v-container>
</template>



<script>
import "ag-grid-community/dist/styles/ag-grid.css";
//import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import NameComponent from "./financialNameComponent.vue";
import AcitionComponent from "./financialActionComponent.vue";
import CommentComponent from "./financialCommentComponent.vue";
import AddExplanation from "./financialAddExplanation.vue";
import AddDisclosure from "./financialAddDisclosure.vue";
import ShowDisclosure from "./financialShowDisclosure.vue";
import ListLedgerComponent from "./financialListLedgerComponent";


import { AgGridVue } from "ag-grid-vue";
//import { AgGridVueList } from "ag-grid-vue";

//import Reclassify from "./Reclassify.vue";
//import Explanation from "./financialAddExplanation.vue";
//import AddDisclosure from "./AddDisclosure.vue";
//import ShowDisclosure from "./ShowDisclosure.vue";

export default {
  name: "FinancialHome",
  components: {
    /* eslint-disable vue/no-unused-components */
     AddExplanation,
     AddDisclosure,
     ShowDisclosure,
  //  Reclassify,
   // Explanation,
   // AddDisclosure,
   // ShowDisclosure,
    "ag-grid-vue": AgGridVue,
  //  "ag-grid-vue-list": AgGridVueList,

    nameComponent: NameComponent,
    commentComponent: CommentComponent,
    acitionComponent: AcitionComponent,
    listLedgerComponent: ListLedgerComponent,

  },
  beforeMount() {
    this.columnDefs = JSON.parse(JSON.stringify(this.allColumnDefs));
  },
  data() {
    return {
      isExpandedParent: [],
      listLedger: false,
      isAllDataGot: false,
      gridApi: null,
      gridApiList: null,
      columnApi: null,
      columnApiList: null,

      

      defaultColDef: {
        editable: false,
        sortable: false,
        flex: 1,
        filter: false,
        resizable: true,
      },
      context: {
        componentParent: this,
      },
      context2: {
        componentParent2: this,
      },
      columnDefs: [],
      columnDefslist: [
      ],
      allColumnDefs: [ 
        {
          headerName: "Particulars",
          field: "name",
          // cellRenderer: "particularsComponent",
          resizable: true,
        },
        {
          headerName: "31-Mar-2021",
          field: "openingBalance",
          resizable: true,
          aggFunc: 'sum',
        },
        {
          headerName: "31-Mar-2020",
          field: "closingBalance",
          resizable: true,
        },
        {
          field: "",
          cellRenderer: "nameComponent",
          resizable: true,
        },
        {
          field: "",
          cellRenderer: "commentComponent"
        },
        {
          field: "",
          cellRenderer: "listLedgerComponent"  
        },
        {
          headerName: "",
          field: "action",
          cellRenderer: "acitionComponent",
          maxWidth: 110,
        }
        
      ],
      listColumnDefs: [
        {
          headerName: "List of Ledgers",
          field: "name",
          // cellRenderer: "particularsComponent",
          resizable: true,
        },
        {
          headerName: "31-Mar-2021",
          field: "openingbal",
          resizable: true,
        },
        {
          headerName: "31-Mar-2020",
          field: "closingbal",
          resizable: true,
        }
      ],

      rowData: null,
      listrowData: null,
      changedPossinleParents: [],
      tableHeight: "61.8vh",
      dialogWidth: "70vw",
      parentChecked: {},
      childChecked: {},
      parentDisplayErrors: [],
      parentDisplayValues: [],
      listLedgerTitle: null,
      listLedgerValues: [],
      isParentValidCheck: false,
      selectedParent: "",
      isHeadergroupOpen: true,
      isRowGroupOpen: [],
      isCollapsedParent: [],
      groupingSelected: false,
      selectionDialog: false,
      reclassifyDialog: false,
      reclassifyCheck: false,
      ledgerList: [],
      reclassifyPeriod: [
        { name: "Both Closing & Opening" },
        { name: "Closing Balance" },
        { name: "Opening Balance" },
      ],
      category: [
        { name: "Secure" },
        { name: "Insecure" },

      ],
      date: "",
      level1List: [],
      chosenItems: [],

      fields: [
        {
          key: "particulars",
          sortable: false,
          resizable: true,
        },
        {
          key: "openingbal",
          sortable: false,
        },
        {
          key: "closingbal",
          sortable: false,
        },
        {
          key: "",
          sortable: false,
          thStyle: { width: "25vw" },
          tdStyle: { width: "25vw" },
        },
      ],
    };
  },
  async mounted() {
    this.getParticularsList();
  },

  

  methods: {
    async getParticularsList() {
      var particularsListres = await this.$apiService.post(
        "financial/getGroupedLedgers",
        {
          financialId: 124,
          title: "Cash and cash equivalents",
          level: 1,
        }
      );

      if (particularsListres && particularsListres.status === 200) {
        this.rowData = JSON.parse(JSON.stringify(particularsListres.data.data));
        this.gridApi.setRowData(this.rowData);

       //alert(JSON.stringify(this.columnDefs));

       
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
      this.gridColumnApi = params.columnApi;
    },

    rowGroupHandler(name, idx) {
      this.ledgerDataCopy = this.rowData;
      var resultData = [];
      if (idx == 1) {
        this.isExpandedParent = this.isExpandedParent.filter(
          (val) => val != name
        );
        this.isRowGroupOpen[name] = false;
      } else {
        this.isExpandedParent.push(name);
        this.isRowGroupOpen[name] = true;
      }
      JSON.parse(JSON.stringify(this.ledgerDataCopy)).forEach((val) => {
        resultData.push(val);
  
        if (val.childLevel && this.isExpandedParent.indexOf(val.name) != -1)
          val.childLevel.forEach((values) => {
            values["isChild"] = true;
            resultData.push(values);
          });
      });

      
      this.gridApi.setRowData(resultData);
    },

    async openListDialog(val) {
      this.listLedgerTitle = val;
      this.listLedger = true;
      var listLedgerRes = await this.$apiService.post("financial/getLedgers", {
        financialId: 124,
        title: this.listLedgerTitle,
        level: 2,
      });


     
      if (listLedgerRes && listLedgerRes.status === 200) {
        this.listLedgerValues = listLedgerRes.data.data;
        this.columnDefslist = this.listColumnDefs;

        this.listrowData = this.listLedgerValues;

        
      }

      
    },

    async getLedgerList() {
      var LedgerListRes = await this.$apiService.post("financial/getLedgers", {
        financialId: 124,
        title: this.listLedgerTitle,
        level: 2,
      });

      this.ledgerList = LedgerListRes.data.data;
    },

    async getLevel1List() {
      var Level1ListRes = await this.$apiService.post(
        "taggingtree/level1options/",
        {
          companyid: 21,
          financialId: 124,
        }
      );

      this.level1List = Level1ListRes.data.data;
    },


    async getLevel2List() {
    //  let selectedNodes = this.gridApi.getSelectedNodes();
	//let selectedData = selectedNodes.map(node => node.data);
	//alert("Selected Nodes:\n"+JSON.stringify(selectedData));

      var Level2ListRes = await this.$apiService.post(
        "taggingtree/level2options/",
        {
          companyid: 21,
          financialId: 124,
          level1:"Intangible assets"
        }
      );

      this.level2List = Level2ListRes.data.data;
    },

    async getLevel3List() {
      var Level3ListRes = await this.$apiService.post(
        "taggingtree/level3options/",
        {
          companyid: 21,
          financialId: 124,
          level1:"Intangible assets",
          level2:"Other intangible assets"

        }
      );

      this.level3List = Level3ListRes.data.data;
    },
    onGridReadyList(params) { console.log(params,"params");
      this.gridApiList = params.api;
      this.gridApiList.sizeColumnsToFit();
      this.gridColumnApiList = params.columnApi;
    },


    add() {
      this.addEntryInputs.push({ ledgers: "", drCr: "", amount: "" });
      this.entryInputs = this.entryInputs + 1;
    },
    remove(index) {
      if (this.entryInputs > 2) {
        this.addEntryInputs.splice(index, 1);
      }
    },
  },
  computed: {
    selectedL1Item: {
      get() {
        //alert(this.value);
        return this.value;
      },
      set(level2List) {
        // Could either emit (so you can use v-model on the parent)
        // or add to array
        this.chosenItems.push(level2List)
        this.$emit("input", level2List);
      }
    }
  }
};
</script>

<style scoped  >
@import "../assets/css/tagging.css";
/* @import "../node_modules/ag-grid-community/dist/styles/ag-grid.css"; */
/* @import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css"; */
.tdNameClass {
  max-width: 150px;
}
</style>
<style  scoped>
/deep/ .v-select > .v-input__control {
  min-height: 38px;
}
/* to remove the box shadow of drop down in AE dialog */
/deep/ .v-select > .v-input__control > .v-input__slot {
  box-shadow: none !important;
}

/deep/ .header {
  font-size: 17px !important;
  font-weight: 600 !important;
  letter-spacing: 1px !important;
}

/deep/ .primaryColor {
  color: #03a9f4 !important;
}
/* ::v-deep/ .table > tbody > tr > td { */
/deep/ .table > tbody > tr > td {
  /* height: 10px !important;
  max-width: 300px; */
  text-transform: capitalize;
  font-size: 14px;
}

/deep/ thead {
  border-bottom: 4px solid #03a9f4;
}
/deep/ .table > tbody > tr > th {
  /* height: 10px !important;
  max-width: 300px; */
  font-size: 14px;
}

div {
  font-size: 14px;
}
/deep/ .table {
  width: auto;
  border-collapse: collapse;
}
/deep/.v-list-item {
  cursor: pointer;
}

.textColor {
  color: #494949 !important;
}
/deep/ p {
  color: #494949;
}
.vertical-center {
  align-items: center;
}
[role="columnheader"] {
  border: 1px solid black;
  background: rgba(48, 96, 144, 0.2);
  /* CSS goes here */
}
.formRow {
  padding: 5px;
  margin: 2px;
}
.btnRow {
  display: flex;
  /* width: 100px; */
  min-width: 2.5vw;
}
/deep/ th > .text-dark {
  padding: 0px;
  display: flex;
  justify-content: space-evenly;
}
.text-dark {
  margin-bottom: 10px;
  margin-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
}
/deep/.v-select__slot {
  font-size: 14px !important;
}
.upTab {
  margin: 5px;
  border: 1px solid black;
}
.companyHeader {
  margin-top: 10px;
  font-size: 18px;
}
.uploadBtn {
  margin: 0px;
  padding: 0px;
}
.text-left {
  text-align: left;
}

.table-borderless {
  overflow-y: auto;
}
.table-borderless > tbody > tr > td,
.table-borderless > tbody > tr > th,
.table-borderless > tfoot > tr > td,
.table-borderless > tfoot > tr > th,
.table-borderless > thead > tr > td,
.table-borderless > thead > tr > th {
  border: none;
  text-align: left;
  float: left;
  /* height: 10px !important; */
}
.LabelText {
  text-decoration: bold;
  font-size: 18px;
  margin-top: 10px;
}
.main-wrapper {
  float: left;
  align-items: left;
  display: block;
  font-size: 14px;
  font-weight: 540;
  width: 100%;
}
.tableMainTdClass {
  max-width: 150px !important;
}
.buttonDiv {
  align-items: flex-end;
}
.maxCol {
  max-width: 250px;
}
.test {
  border-width: 2px !important;
  border-color: #cdcdcd !important;
  height: 100%;
}

body,
.container,
html {
  width: 100%;
  height: 100%;
}
.blueUline {
  width: 100%;
  text-align: start;
}
.loginText {
  font-size: 21px;
  font-weight: 300;
  /* line-height: 75px; */
  /* margin-top:10px; */

  color: rgb(0, 107, 106);
  text-decoration: "none";
  text-align: left;
  letter-spacing: 0.2;
  margin-left: 15px;
}

.companyHeaderNew {
  margin: 5px !important;
  margin-top: 0px !important;
  font-size: 15px !important;
  max-height: 52px !important;
  justify-content: flex-start;
  align-items: center !important;
}

.tabelHeader {
  color: red !important;
}

.btSty {
  height: 10px;
}

.childStyle {
  margin-left: 20px;
}

.parentStyle {
  font-weight: 600;
}

.bluk1Dia {
  height: 40vh;
  font-size: 16px;
}

.alertStyle {
  height: auto;
  padding-bottom: 0px;
  font-size: 16px;
}
.alertDivider {
  height: 2px;
  background-color: #03a9f4;
  color: #03a9f4;
  border: 1px solid;
  margin-bottom: 24px;
}
.actionStyle {
  display: flex;
  justify-content: center;
}
/deep/ .v-subheader {
  font-size: 14px !important;
  font-weight: 600 !important;
  margin-left: 8px !important;
}
.cursorPointer {
  cursor: pointer;
}

.selectBackgroundStyle {
  color: white;
  background-color: #03a9f4;
}

/deep/ .v-chip-group .v-chip--active {
  color: white !important;
  background-color: #03a9f4 !important;
}

.displayValid {
  display: flex !important;
}

.filterChildStyle {
  margin-left: 10px;
  color: grey;
}

.whiteBg {
  background-color: white;
}

.hrstyle {
  width: 110%;
  position: relative;
  height: 4px;
  background-color: #03a9f4;
  margin: 5px 0px;
  left: -10px;
  border: 1px solid #03a9f4;
}

/deep/ button {
  font-size: 12px;
}

/deep/ .noHover .v-btn__content {
  background-color: #fff !important;
}

/deep/.v-list-item {
  min-height: 35px !important;
  font-size: 14px !important;
  text-align: start;
}

.onHover:hover {
  background-color: #f5f4f47d;
}
/deep/ .v-list-item__title {
  font-size: 14px !important;
}

/deep/ .v-btn__content {
  letter-spacing: normal !important;
}

/deep/.searchStyleP
  > .v-text-field--outlined.v-input--dense.v-text-field--outlined
  > .v-input__control
  > .v-input__slot {
  min-height: 32px !important;
}

/deep/ .searchStyle .v-input__append-inner {
  margin-top: 4.5px !important;
}

/deep/ input {
  font-size: 14px !important;
}

/deep/ .v-text-field--outlined.v-input--is-focused fieldset,
.v-text-field--outlined.v-input--has-state fieldset {
  border: 1px solid grey !important;
}

/deep/
  .ag-cell
  > .main-wrapper
  > .v-text-field--outlined.v-input--dense.v-text-field--single-line
  > .v-input__control
  > .v-input__slot,
.ag-cell
  > .main-wrapper
  > .v-text-field--outlined.v-input--dense.v-text-field--outlined
  > .v-input__control
  > .v-input__slot {
  min-height: 32px !important;
  margin-top: 5px !important;
  width: 100%;
}

/deep/.ag-theme-material .ag-ltr .ag-cell {
  display: flex;
  align-items: center;
}

/deep/.v-sheet.v-list {
  font-size: 14px !important;
  max-width: 22vw;
}

/deep/.v-list.v-sheet {
  font-size: 14px !important;
  max-width: 22vw;
}

/deep/.v-autocomplete__content.v-menu__content .v-select-list {
  font-size: 14px !important;
}

/deep/.v-list {
  max-width: 22vw !important;
}

/deep/.ag-theme-material .ag-icon-checkbox-checked {
color: #18B745; 
}

.col {
  font-size: 14px !important;
}

.saveMargin {
  margin-top: 5px !important;
}

.parentLedgerType {
  display: flex !important;
}
.parentLedgerWidth {
  max-width: 85% !important;
  min-width: 85% !important;
  min-height: 37px;
  display: flex;
  align-items: center;
}

.childLedgerWidth {
  max-width: 85% !important;
}

.ledgerViweTbHg {
  min-height: 69.5vh !important;
}

/deep/ .v-input .v-label {
  font-size: 14px !important;
}

/deep/
  #app
  > div.v-menu__content.theme--light.menuable__content__active.v-autocomplete__content {
  max-width: 22vw !important;
}

.cardStyle {
  border: 1px solid white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
/deep/ .ag-theme-material .ag-row {
  border: 0px !important;
  font-size: 14px !important;
  text-align: start;
}

/deep/ .ag-theme-material .ag-header-row {
  border-bottom: 5px solid #03a9f4 !important;
  text-transform: capitalize;
  font-size: 14px !important;
  text-align: start;
}

/deep/ .aeDialogStyle {
  height: 75vh !important;
}
/deep/ .aeAddDialogStyle {
  height: 70vh !important;
}

/deep/ .commentStyle {
  height: 100px !important;
}

/deep/.commentStyle > div > div {
  display: block;
}
</style>
