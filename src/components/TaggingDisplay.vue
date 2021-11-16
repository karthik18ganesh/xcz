<template>
  <v-container style="display: block" fluid class="whhite darken-5">
    <v-row class="companyHeader companyHeaderNew">
      <v-col cols="3" style="padding: 0px">
        <p
          style="
            margin-bottom: 0px;
            width: 100%;
            font-size: 14px;
            text-align: start;margin-left: 14px;
          "
        >
          {{fina?fina["company_name"]:''}}
          <span
            style="
              padding: 0px 5px;
              font-weight: 600;
              font-size: 14px;
              color: #828282bd;
            "
          >
            <v-icon color="#676767" style="font-size: 14px" dark>mdi-chevron-right</v-icon>
          </span>
          Tagging
        </p>
      </v-col>
      <v-col
        cols="6"
        style="
          padding-bottom: 0px;
          padding-top: 0px;
          font-size: 14px;
          font-weight: 600;
        "
      >
        <p style="margin-bottom: 0px">
          {{ totaltaggedLedger }} of {{ totalLedger }} Ledgers Successfully
          Autotagged
        </p>
      </v-col>
      <!-- <v-col cols="3" style="height:30px;padding-bottom:0px;padding-top:0px">
          <v-select
          height="20"
          style="width:50%;"
        dense
        label="Export"
       outlined
        v-model="selectedImportLevel"
     :items="['PDF','Tally']"                 
                     
   
  ></v-select>
    </v-col> -->
      <v-col
        cols="3"
        style="
          height: 20px;
          padding-bottom: 0px;
          padding-top: 0px;
          padding-right: 0px;
          margin-top: -10px;
          justify-content: flex-end;
          display: flex;
        "
      >
        <v-menu bottom offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn
              class="textColor"
              style="
                border: 0.5px solid #c7c6c6;
                box-sizing: border-box;
                border-radius: 4px;
                max-height: 30px;
                min-width: 95px;
                max-width: 95px;
                background-color: #0000;
                box-shadow: none;
                font-size: 14px;
                text-transform: capitalize;
              "
              dark
              v-on="on"
            >
              &nbsp; Export &nbsp;
              <v-icon color="grey" style="font-size: 20px" dark
                >mdi-chevron-down</v-icon
              >
              &nbsp;
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in [{ title: 'Excel' }, { title: 'PDF' }]"
              :key="index"
              @click="() => handleExport(index)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <hr
      style="
        margin-top: 10px;
        margin-left: -13px;
        width: 103%;
        margin-bottom: 10px;
      "
    />
<v-dialog v-model="editLedger" content-class="editDialogStyle" width="25vw" >
      <v-card style="width:100%;height:100%">
    <v-card-title class="text-h5 white darken-2">
          <div>
            <v-row>
              <v-col cols="12">
                <h5
                  class="headingPopup header"
                  style="color: #03a9f4; font-size: 20px"
                >
                  Edit Ledgers
                </h5>
              </v-col>
            </v-row>
          </div>
        </v-card-title>
        <hr class="alertDivider" />
        <v-card-text style="height:70%;">
        <v-row>
          <v-text-field autocomplete="off" 
            v-model="editLedgerName.oldValue"
            label="Old Ledger Name"
            disabled
            style="margin-top:16px"
            outlined
            hide-details
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field autocomplete="off" 
            v-model="editLedgerName.newValue"
            label="New Ledger Name"
            style="margin-top:27px"
            outlined
            hide-details
          ></v-text-field>
        </v-row>
        </v-card-text>
        <v-card-actions class="actionStyle">
          <v-btn
            class="ma-2"
            style="
              padding: 2px 0px;width:30%;
              background-color: #03a9f4 !important;
              color: white;
            "
            color="#03a9f4"
            @click="updateLedgerName"
          >
            Update
          </v-btn>
          <v-btn
            class="ma-2"
            style="
              padding: 2px 0px;width:30%;
              background-color: #03a9f4 !important;
              color: white;
            "
            color="#03a9f4"
            @click="closeEditDialog"
          >
            Close
          </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
    <v-dialog v-model="bulkTagLevel1Enabled" v-bind:width="dialogWidth">
      <v-card>
        <v-card-title class="text-h5 white darken-2">
          <div>
            <v-row>
              <v-col cols="12">
                <h5
                  class="headingPopup"
                  style="color: #03a9f4; font-size: 20px"
                >
                  {{ isDialogMode == 1 ? "Info" : "Bulk Tagging" }}
                </h5>
              </v-col>
            </v-row>
          </div>
        </v-card-title>
        <hr class="alertDivider" />

        <v-card-text
          v-bind:class="{
            alertStyle: isDialogMode === 1,
            bluk1Dia: isDialogMode != 1,
          }"
        >
          <v-form novalidate="true" ref="tallyForm">
            <v-row no-gutters>
              <v-col cols="12" v-if="isDialogMode == 1">
                <p style="font-size: 16px; margin: 0px">{{ alertMeassage }}</p>
              </v-col>
              <v-col
                cols="12"
                v-if="isDialogMode == 2"
                style="display: flex; justify-content: center"
              >
                <v-autocomplete
                  style="max-width: 75%"
                  hide-details
                  single-line
                  v-model="dialogL1Value"
                  :items="l1Options"
                  outlined
                  dense
                  @change="ledgerDialogl1Changed"
                  item-text="name"
                  item-value="name"
                  placeholder="Level One- Tagging List"
                >
                  <template v-slot:selection="data">
                    {{ data.item.name }}
                  </template>
                  <template v-slot:item="data">
                    {{ data.item.name }}
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col
                v-if="isDialogMode == 3"
                style="display: flex; justify-content: center; width: 50%"
              >
                <v-autocomplete
                  style="max-width: 75%"
                  hide-details
                  single-line
                  v-model="dialogL1Value"
                  :items="l1Options"
                  outlined
                  dense
                  @change="ledgerDialogl1Changed"
                  item-text="name"
                  item-value="name"
                  placeholder="Level One- Tagging List"
                >
                  <template v-slot:selection="data">
                    {{ data.item.name }}
                  </template>
                  <template v-slot:item="data">
                    {{ data.item.name }}
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col
                v-if="isDialogMode == 3"
                style="display: flex; justify-content: center; width: 50%"
              >
                <v-autocomplete
                  style="max-width: 75%"
                  hide-details
                  single-line
                  v-model="dialogL2Value"
                  :items="l2"
                  outlined
                  dense
                  placeholder="Level Two- Tagging List"
                  @change="ledgerDialogl2Changed"
                  item-text="name"
                  item-value="name"
                >
                  <template v-slot:selection="data">
                    {{ data.item.name }}
                  </template>
                  <template v-slot:item="data">
                    {{ data.item.name }}
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="actionStyle">
          <v-btn
            v-if="isDialogMode == 1 && !isDiffBulck"
            class="ma-2"
            color="#03a9f4"
            style="
              padding-top: 2px;
              background-color: #03a9f4 !important;
              color: white;
            "
            @click="closeDialog"
          >
            Ok
          </v-btn>
          <v-btn
            v-if="isDialogMode == 1 && isDiffBulck"
            class="ma-2"
            color="#03a9f4"
            style="
              padding-top: 2px;
              background-color: #03a9f4 !important;
              color: white;
            "
            @click="() => bulkTagLevel(3)"
          >
            Yes
          </v-btn>
          <v-btn
            v-if="isDialogMode == 1 && isDiffBulck"
            class="ma-2"
            color="#03a9f4"
            style="
              padding-top: 2px;
              background-color: #03a9f4 !important;
              color: white;
            "
            @click="closeDialog"
          >
            No
          </v-btn>
          <v-btn
            v-if="isDialogMode != 1"
            class="ma-2"
            style="
              padding-top: 2px;
              background-color: #03a9f4 !important;
              color: white;
            "
            color="#03a9f4"
            :disabled="
              isDialogMode == 3
                ? !dialogL2Value || !dialogL1Value
                : !dialogL1Value
            "
            @click="applyLevel1BulkTags"
          >
            Apply All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row style="justify-content: space-between">
      <v-col
        cols="5"
        style="
          padding: 0px;
          height: 40px;
          display: flex;
          align-items: center;
          margin-left: 23px;
        "
      >
        <v-col style="max-width: 6vw; padding: 0px">
          <p style="font-size: 14px" class="ma-1">Tagging &nbsp; :</p>
        </v-col>
        <v-col cols="2" style="padding: 0px">
          <v-menu offset-y bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                v-on="on"
                class="noHover"
                style="
                  height: auto !important;
                  background-color: #fff;
                  box-shadow: none;
                  font-size: 14px;
                  padding: 0px;
                  color: #494949;
                  text-transform: capitalize;
                "
              >
                {{ selectedImportLevel }}
                <v-icon dark color="grey" style="font-size: 20px"
                  >mdi-chevron-down</v-icon
                >
              </v-btn>
            </template>
            <v-list
              style="
                display: flex;
                flex-direction: column;
                padding: 10px;
                text-align: start;
              "
            >
              <v-list-tile
                style="padding: 3px; cursor: pointer; font-size: 14px"
                class="onHover"
                v-for="(item, index) in [
                  { title: 'Closing Balance' },
                  { title: 'Opening Balance' },
                ]"
                :key="index"
                @click="preventTypeChange"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-col>
      </v-col>
      <v-col
        cols="6"
        style="
          padding: 0px;
          height: 40px;
          display: flex;
          justify-content: end;
          padding-right: 16.5px;
        "
      >
      <v-col cols="2" style="padding: 0px;display: flex;justify-content: end;" v-if="selectedImportLevel == 'Closing Balance'">
        <aeComponent @aeSuccessCallback="aeSuccessCallback" @aeFailedCallback="aeFailedCallback"/>        
      </v-col>
        <v-col cols="4" style="padding: 0px">
          <v-chip-group @change="viewChange" mandatory>
            <v-chip :value="true">Groups</v-chip>
            <v-chip :value="false">Ledgers</v-chip>
          </v-chip-group>
        </v-col>
        <v-col
          cols="5"
          style="padding: 0px; display: flex; align-items: flex-end"
          class="searchStyleP"
        >
          <v-text-field autocomplete="off" 
            height="30px"
            class="searchStyle"
            hide-details
            append-icon="mdi-magnify"
            @input="filterTableByledger"
            id="filter-input"
            placeholder="Search here"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-col>
    </v-row>


    <v-row style="margin-top: 20px; display: flex; justify-content: center">
    <v-card v-bind:class="{ledgerViweTbHg:!groupingSelected}" class="cardStyle" style="min-height: 60vh; margin: 6px; width:97.5%">
    <ag-grid-vue 
    style="width: 100%; height: 100%;"
                class="ag-theme-material"
                id="myGrid"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :context="context"
        @grid-ready="onGridReady"
        :defaultColDef="defaultColDef"
        :getRowNodeId= "getRowNodeId"
        :pagination="false"> 
    </ag-grid-vue>  
    </v-card>
</v-row>

    <v-row
      style="margin-top: 0px"
      v-if="isParentValidCheck && groupingSelected"
    >
      <v-col style="max-width: 7%; padding-bottom: 0px"></v-col>
      <v-col
        style="max-width: 15%; min-width: 15%; padding-bottom: 0px"
        v-for="(item, index) in parentDisplayValues"
        :key="index"
      >
        <span>
          <v-icon
            color="#18B745"
            style="font-size: 20px; display: none"
            dark
            v-bind:class="{
              displayValid: parentDisplayErrors.indexOf(item) == -1,
            }"
            >mdi-check-circle-outline</v-icon
          >
        </span>
        <span>
          <v-icon
            color="#FF9537"
            style="font-size: 20px; display: none"
            v-bind:class="{
              displayValid: parentDisplayErrors.indexOf(item) != -1,
            }"
            dark
            >mdi-close-circle-outline</v-icon
          >
        </span>
      </v-col>
    </v-row>
    <v-row style="margin-top: 20px; margin-bottom: 0px" v-if="groupingSelected">
      <v-col style="max-width:7%;height30px;padding:0px">
        <span>
          <v-icon
            color="grey"
            style="font-size: 25px!important"
            @click="moveParent(1)"
            v-bind:class="{
              cursorPointer:
                possibleParents[0] &&
                possibleParents[0].name != parentDisplayValues[0],
            }"
            :disabled="
              (possibleParents[0] &&
                possibleParents[0].name == parentDisplayValues[0]) ||
              (changedPossinleParents[0] &&
                changedPossinleParents[0].name == parentDisplayValues[0])
            "
            dark
            >mdi-menu-left</v-icon
          >
        </span>
        <span>
          <v-icon
            color="grey"
            style="font-size: 25px !important"
            @click="moveParent(2)"
            v-bind:class="{
              cursorPointer:
                possibleParents[possibleParents.length - 1] &&
                possibleParents[possibleParents.length - 1].name ==
                  parentDisplayValues[4],
            }"
            :disabled="
              (possibleParents[possibleParents.length - 1] &&
                possibleParents[possibleParents.length - 1].name ==
                  parentDisplayValues[4]) ||
              (changedPossinleParents[changedPossinleParents.length - 1] &&
                changedPossinleParents[changedPossinleParents.length - 1]
                  .name == parentDisplayValues[4])
            "
            dark
            >mdi-menu-right</v-icon
          >
        </span>
      </v-col>
      <v-col
        style="padding: 2.5px;display:flex;align-items:center;justify-content:center;text-transform: capitalize;max-width:15%;min-width:15%;border: 1px solid #d3d3d3;height30px;cursor: pointer;"
        v-for="(item, index) in parentDisplayValues"
        v-bind:class="{ selectBackgroundStyle: item == selectedParent }"
        :key="index"
        @click="handleSelectParent(index)"
        >{{ item }}</v-col
      >
      <v-col style="max-width:10%;height30px;padding:0px"
        >{{ possibleParents.length - parentDisplayValues.length }} more
      </v-col>
    </v-row>

    <v-row
      style="margin-top: 15px"
      v-bind:class="{ saveMargin: isParentValidCheck && groupingSelected }"
    >
      <v-col cols="12" style="padding: 0px">
        <v-btn
          color="#03a9f4"
          style="color: white; height: 25px !important; margin-right: 20px"
          @click="saveAllLedgers"
        >
          Save
        </v-btn>
        <v-btn
          style="color: white; height: 25px !important"
          color="#03a9f4"
          @click="validateLedgers"
        >
          Validate
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import store from '../store'
// import { debounce } from "debounce";
import jsPDF from "jspdf";
import "jspdf-autotable";
var numeral = require("numeral");
import Vue from "vue";
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
// import DropdownCellRenderer from "./dropdownCellRenderer"
import L1Component from "./taggingL1Component.vue";import L1HederComponent from "./taggingL1HeaderComponent.vue";
import L2Component from "./taggingL2Component.vue";import L2HederComponent from "./taggingL2HeaderComponent.vue";
import L3Component from "./taggingL3Component.vue";import L3HederComponent from "./taggingL3HeaderComponent.vue";
import NameComponent from "./taggingNameComponent.vue";import NameHederComponent from "./taggingNameHeaderComponent.vue";
import AcitionComponent from "./taggingActionComponent.vue";import DrCrComponent from "./taggingDrCrComponent.vue";
import AeComponent from "./AeComponent.vue";
import SelectionComponent from "./taggingSelectionComponent.vue";
import {AgGridVue} from 'ag-grid-vue';
export default {
  name: "TaggingHome",
  components:{
    /* eslint-disable vue/no-unused-components */
    'ag-grid-vue':AgGridVue,'l1HederComponent':L1HederComponent,'l2HederComponent':L2HederComponent,'l3HederComponent':L3HederComponent,
    'l1Component':L1Component,"l2Component":L2Component,"l3Component":L3Component,"nameComponent":NameComponent,"nameHederComponent":NameHederComponent,
    "acitionComponent":AcitionComponent,"drCrComponent":DrCrComponent,"selectionComponent":SelectionComponent,"aeComponent":AeComponent
  }, 
  beforeMount() {        
    this.columnDefs=JSON.parse(JSON.stringify(this.allColumnDefs));
    },
  data() {
    return {
      constantlyChecking:null,
      editLedgerName:{oldValue:"",newValue:""},
      editLedger:false,
      isParentDetailsAvailable:[],
      isAllDataGot:false,
      gridApi: null,
            columnApi: null,
            defaultColDef: {
                editable: false,
                sortable: false,
                flex: 1,
                filter: false,
                resizable: true,
            },
            context: {
          componentParent: this
        },
      columnDefs: [],
      allColumnDefs:[
    {
      headerName: "ACTION",
      field: "action",
      cellRenderer: "acitionComponent",
      maxWidth: 110
    },

    {
      field: "name",
      cellRenderer: "nameComponent",
      headerComponent:"nameHederComponent",
      resizable: true,
    },
    {
      headerName: "AMOUNT",
      field: "balance",
      maxWidth: 150
    },
    {
      headerName: "Dr/Cr",
      field: "drcr",
      cellRenderer: "drCrComponent",
      maxWidth: 100
    },
    {
      headerName: "SELECTION",
      field: "selection",
      cellRenderer: "selectionComponent",
      maxWidth: 140
    },
    {
      headerName: "Level 1",
      field: "level1",
      cellRenderer: "l1Component",
      headerComponent:"l1HederComponent",
      hide:false,
      maxWidth: 350
    },
    {
      headerName: "Level 2",
      field: "level2",
      cellRenderer: "l2Component",
      headerComponent:"l2HederComponent",
      hide:false,
      maxWidth: 350
    },{
      headerName: "Level 3",
      field: "level3",
      cellRenderer: "l3Component",
      headerComponent:"l3HederComponent",
      hide:true,
      maxWidth: 350
    }
  ],
      rowData: null,
      changedPossinleParents: [],
      tableHeight: "61.8vh",
      l1FilterOption: [],
      parentChecked: {},
      childChecked: {},
      parentDisplayErrors: [],
      parentDisplayValues: [],
      isParentValidCheck: false,
      selectedParent: "",
      isHeadergroupOpen: true,
      isRowGroupOpen: [],
      isCollapsedParent: [],
      level1filter: null,
      level2filter: null,
      level3filter: null,
      unSavedValue: [],
      totalLedger: 0,
      totaltaggedLedger: 0,
      excelArray: [],
      dialogL1Value: "",
      dialogL2Value: "",
      alertMeassage: "",
      isDiffBulck: false,
      dialogWidth: "70vw",
      isDialogMode: 1,
      level2BulkValues: [],
      bulkTagLevel2Enabled: false,
      bulkTagLevel1Enabled: false,
      bulkTagSelectedLevel2: "",
      level1Names: [],
      checkbox: false,
      timeout: null,
      l1: [],
      l2: [],
      l3: [],
      l1Value: [],
      date: "",
      filterOn: [],
      selectedGroup: "",
      groupingSelected: true,
      tableFilter: "",
      selectedAllItems: false,
      showLevel1: true,
      showLevel2: true,
      showLevel3: false,
      tabSelection: 0,
      possibleParents: [],
      selectedImportLevel: "Closing Balance",
      tempSelect: [],
      templevel1Arryay: [],
      templevel2Arryay: [],
      templevel3Arryay: [],
      tempTreelevel1Arryay: [],
      tempTreelevel2Arryay: [],
      tempTreelevel3Arryay: [],

      selectedYear: "Current Year",
      selectedCompany: "VKC",
      showXMLDialogue: false,

      dataImported: false,
      tagSelected: false,
      selectedTag: "",
      fields: [
        {
          key: "action",
          sortable: false,
        },

        {
          key: "name",
          sortable: false,
          thStyle: { width: "25vw" },
          tdStyle: { width: "25vw" },
        },
        {
          label: "AMOUNT",
          key: "balance",
          sortable: false,
          thStyle: { width: "6vw" },
          tdStyle: { width: "6vw" },
        },
        {
          label: "Dr/Cr",
          key: "drcr",
          sortable: false,
          thStyle: { width: "5vw" },
          tdStyle: { width: "5vw" },
        },
        {
          label: "Selection",
          key: "selection",
          sortable: false,
          thStyle: { width: "3vw" },
          tdStyle: { width: "3vw" },
        },
        {
          label: "Level 1",
          key: "level1",
          sortable: false,
          thStyle: { width: "25vw" },
          tdStyle: { width: "25vw" },
        },
        {
          label: "Level 2",
          key: "level2",
          sortable: false,
          thStyle: { width: "25vw" },
          tdStyle: { width: "25vw" },
        },
      ],

      showDatatable: false,
      orginalTaggingtreeData: [],
      taggingTreeData: [],
      filteredTaggingTreeData: [],
      checkBoxValue: false,
      l1Options: [],
      l2Options: {}, 
      l3Options: {},
    };
  },
  async mounted() {
    this.getLedgerDetails();
    this.reportingPeriodId = sessionStorage.getItem("reportId");
  },
  methods: {
    closeEditDialog(){
      this.editLedger =false;
    },
    openEditDialog(val,data){ console.log(val,data)
      this.editLedgerName.oldValue = val;
      this.editLedgerName["data"]=data;
      this.editLedger =true;
    },
    async updateLedgerName(){
      console.log(this.editLedgerName)
      var res = await this.$apiService.put(`/ledgerDetails/editData`,{"data":{"ledgerid":this.editLedgerName.data.ledgerid,name:this.editLedgerName.newValue}});
      if (res && res.status === 200) {
        this.unSavedValue = [];
        this.isDialogMode = 1;
        this.dialogWidth = "35vw";
        this.alertMeassage = "Ledgers are Updated successfully.";
        this.editLedger=false;
        //update
        let orgIndex = this.$_.findLastIndex(this.orginalTaggingtreeData, {
        name: this.editLedgerName.oldValue,
        parent: this.editLedgerName.data.parent,
      });
      var rowNode = this.gridApi.getRowNode(this.editLedgerName.data.parent+this.editLedgerName.oldValue);
      rowNode.setDataValue("name", this.editLedgerName.newValue);
      if (orgIndex != -1) this.orginalTaggingtreeData[orgIndex]["name"] = this.editLedgerName.newValue; 
        setTimeout(() => {
          this.bulkTagLevel1Enabled = true;
        }, 0);
      }
      if (res.data.status === "error") {
        this.isDialogMode = 1;
        this.dialogWidth = "35vw";
        this.alertMeassage = "Ledgers are not Update successfully.";
        this.editLedger=false;
        setTimeout(() => {
          this.bulkTagLevel1Enabled = true;
        }, 0);
      }
    },
    async aeSuccessCallback(addEntryData){
      var selectedLedgersIndex =[];
      addEntryData.forEach(async (val,idx)=>{
        if(!val.notYetSaved) {   
        let orgIndex = this.$_.findLastIndex(this.orginalTaggingtreeData, {
            ledgerid: val.ledger
          });
          selectedLedgersIndex.push([orgIndex,idx]);
        }
      })
        this.unSavedValue = [];
        this.isDialogMode = 1;
        this.dialogWidth = "35vw";
        this.alertMeassage = "Ledgers are Updated successfully.";
        console.log(this.orginalTaggingtreeData,selectedLedgersIndex,addEntryData,this.rowData,"check")
        //update
        selectedLedgersIndex.forEach((val)=>{
          if(addEntryData[val[1]].type == "Dr")
          this.orginalTaggingtreeData[val[0]]["balance"] = Number(this.orginalTaggingtreeData[val[0]]["balance"]) - Number(addEntryData[val[1]].amount);
          else
          this.orginalTaggingtreeData[val[0]]["balance"] = Number(this.orginalTaggingtreeData[val[0]]["balance"]) +  Number(addEntryData[val[1]].amount);
        })
        addEntryData.forEach(val=>{
          let orgIndex = this.$_.findLastIndex(this.rowData, {
            ledgerid: val.ledger
          });  
          if(orgIndex!=-1){
            if(val.type == "Dr")
          this.rowData[orgIndex]["balance"] = Number(this.rowData[orgIndex]["balance"]) - Number(val.amount);
          else
          this.rowData[orgIndex]["balance"] = Number(this.rowData[orgIndex]["balance"]) + Number(val.amount);
          }         
        })
        addEntryData.forEach(async (val)=>{
        if(val.notYetSaved) {
            var res = await this.$apiService.get(`/ledgerDetails/getLedgerDetailsByName?reportingperioddataid=${Number(this.reportingPeriodId)}&name=${val.notYetSaved.name}`);
      
            if (res && res.status === 200 && res.data && res.data.data && res.data.data.length) { 
              console.log(res.data,"data")
              let val = res.data.data[0];
                val["level1"] = val["level1"] && val["level1"]!="0" ? val["level1"].trim() : "";
                val["level2"] = val["level2"] && val["level1"]!="0" ? val["level2"].trim() : "";
                val["level3"] = val["level3"] && val["level1"]!="0" ? val["level3"].trim() : "";
                val["drcr"] = val["drcr"]?val["drcr"]:"Dr";
                val.level2Options = this.l2Options[val["level1"]];
                if (val.level2Options)
                  val.level3Options = this.l3Options[val["level1"]][val["level2"]];
              this.orginalTaggingtreeData.push(val);
              if(this.rowData[0].groupname == val.groupname)
              this.rowData.push(val);
            }    
        }
        })
        this.gridApi.setRowData(this.rowData);
        setTimeout(() => {
          this.bulkTagLevel1Enabled = true;
        }, 0);
    },
    aeFailedCallback(){
      this.isDialogMode = 1;
      this.dialogWidth = "35vw";
      this.alertMeassage = "Ledgers are not Updated successfully.";
      setTimeout(() => {
          this.bulkTagLevel1Enabled = true;
        }, 0);
    },            
    updateSelection(e,val){
      console.log(e,val,"e",this.rowData,this.orginalTaggingtreeData);
      // let index = this.$_.findLastIndex(this.rowData, {
      //   name: val.name,
      //   parent: val.parent,
      // });
      // this.sampleRowData = JSON.parse(JSON.stringify(this.rowData))
      // this.rowData[index]["selected"] = e;
      this.rowData = this.rowData.map(value=>{
        if(this.groupingSelected){
          if(value.name == val.name && value.parent == val.parent) value["selected"] = e;
        }
        else{
          if( value.isParentName ){
            if(value.name == val.name) value["selected"] = e;
          }
          else{
            if(value.parent == val.name) value["selected"] = e;
          }
        }
        return value;
      })
      // var rowNode = this.gridApi.getRowNode(val.parent+val.name);
      // console.log(rowNode,"rowNode")
      // rowNode.setDataValue("selection", e);
      },
    getRowNodeId(data){
    return data.parent+data.name;},
    onGridReady(params) {
            this.gridApi = params.api;
            this.gridApi.sizeColumnsToFit()
            this.gridColumnApi = params.columnApi;
    },
    filterLevel1Options(e) {
      this.l1FilterOption = JSON.parse(JSON.stringify(this.l1Options)).filter((val) => {
        var regex = new RegExp(e, "ig");
        if (regex.test(val.name)) return true;
        else return false;
      });
    },
    handleParentFil(item) {
      if (this.parentChecked[item.header])
        this.parentChecked[item.header] = false;
      else this.parentChecked[item.header] = true;
      this.l1FilterOption.forEach((val) => {
        if (val.group == item.header) {
          if (this.parentChecked[item.header]) {
            this.childChecked[val.name] = true;
          } else this.childChecked[val.name] = false;
        }
      });
      //filter the table
      var check = Object.values(this.childChecked).filter((val) => val);
      var resultData = [];
      if (check.length) {
        resultData = JSON.parse(JSON.stringify(this.ledgerDataCopy)).filter(
          (val) => { console.log(val,"val",this.childChecked)
            if (!this.groupingSelected && val.isParentName) return true;
            if (this.childChecked[val.level1]) return true;
            else return false;
          }
        );

        if (!this.groupingSelected)
          resultData = resultData.filter((val, idx, arr) => {
            if (arr[idx + 1] && val.isParentName && arr[idx + 1].isParentName)
              return false;
            else return true;
          });
        console.log(resultData, resultData[resultData.length - 1],this.ledgerDataCopy);
        if (resultData[resultData.length - 1].isParentName) resultData.pop();
        this.rowData = resultData;
      } else {
        this.rowData = JSON.parse(JSON.stringify(this.ledgerDataCopy))
      }
    },
    handleChildFil(item) {
      if (this.childChecked[item.name]) {
        this.childChecked[item.name] = false;
        if (this.parentChecked[item.group])
          this.parentChecked[item.group] = false;
      } else this.childChecked[item.name] = true;
      //filter table
      var check = Object.values(this.childChecked).filter((val) => val);
      var resultData = [];
      if (check.length) {
        resultData = JSON.parse(JSON.stringify(this.ledgerDataCopy)).filter(
          (val) => {
            if (!this.groupingSelected && val.isParentName) return true;
            if (this.childChecked[val.level1]) return true;
            else return false;
          }
        );

        if (!this.groupingSelected)
          resultData = resultData.filter((val, idx, arr) => {
            if (arr[idx + 1] && val.isParentName && arr[idx + 1].isParentName)
              return false;
            else return true;
          });
        console.log(resultData, resultData[resultData.length - 1]);
        if (resultData[resultData.length - 1].isParentName) resultData.pop();
        this.gridApi.setRowData(resultData);
      } else {
        this.gridApi.setRowData(this.ledgerDataCopy);
      }
    },
    updateUnsavedValues(parent,name,orgIndex){
      let unsaveIndex = this.$_.findLastIndex(this.unSavedValue, {
        name: name,
        parent: parent,
      });
      if (unsaveIndex != -1)
        this.unSavedValue[unsaveIndex] = this.$_.pick(this.orginalTaggingtreeData[orgIndex],"ledgerid", "name", "taggingheader", "level1", "level2", "level3", "balance", "isclosingbal", "groupname", "parent", "reportingperioddataid", "drcr");
      else this.unSavedValue.push(this.$_.pick(this.orginalTaggingtreeData[orgIndex],"ledgerid", "name", "taggingheader", "level1", "level2", "level3", "isclosingbal", "balance", "groupname", "parent", "reportingperioddataid", "drcr"));
    },
    drcrChange(parent, name, value) {
      let orgIndex = this.$_.findLastIndex(this.orginalTaggingtreeData, {
        name: name,
        parent: parent,
      });
      var rowNode = this.gridApi.getRowNode(parent+name);
      rowNode.setDataValue("drcr", value);
      if (orgIndex != -1) this.orginalTaggingtreeData[orgIndex]["drcr"] = value; 
      this.updateUnsavedValues(parent, name,orgIndex);     
    },
    validateLedgers() {
      console.log(this.groupingSelected,"groupingSelected")
      if (this.groupingSelected) {
        var invalidparents = [];
        if (this.showLevel2 && this.showLevel3) {
          this.orginalTaggingtreeData.map((val) => { 
            if (!val.level1 || !val.level2 || !val.level3) {
              invalidparents.push(val.parent);
            }
          });
        } else if (this.showLevel1 && !this.showLevel2 && !this.showLevel3) {
          this.orginalTaggingtreeData.map((val) => {
            if (!val.level1) {
              invalidparents.push(val.parent);
            }
          });
        } else {
          this.orginalTaggingtreeData.map((val) => {
            if (!val.level1 || !val.level2) {
              invalidparents.push(val.parent);
            }
          });
        }
        invalidparents = this.$_.uniq(invalidparents);
        this.parentDisplayErrors = invalidparents;
        var changedPossinleParents = [];
        this.parentDisplayValues = [];
        this.possibleParents.forEach((val) => {
          if (invalidparents.indexOf(val.name) != -1)
            changedPossinleParents.unshift({ name: val.name });
          else changedPossinleParents.push({ name: val.name });
        });
        this.possibleParents = changedPossinleParents;
        changedPossinleParents.forEach((val, idx) => {
          if (idx < 5) {
            this.parentDisplayValues.push(val.name);
          }
        });
        this.changedPossinleParents = changedPossinleParents;
        this.isParentValidCheck = true;
        this.handleSelectParent(0)
      } else {
        if (this.showLevel2 && this.showLevel3) {
          this.handleTagged(0, 3);
        } else if (this.showLevel1 && !this.showLevel2 && !this.showLevel3) {
          this.handleTagged(0, 1);
        } else {
          this.handleTagged(0, 2);
        }
      }
    },
    async handleSelectParent(idx) {
      this.selectedParent = this.parentDisplayValues[idx];
      console.log(this.isParentDetailsAvailable,this.selectedParent,this.isAllDataGot,idx )
      if(this.isAllDataGot || this.isParentDetailsAvailable.indexOf(this.selectedParent)!=-1){
        console.log(this.orginalTaggingtreeData,"this.orginalTaggingtreeData")
        let resultData = this.orginalTaggingtreeData.filter(
          (val) => val.parent == this.selectedParent
        );
        this.rowData = JSON.parse(JSON.stringify(resultData));
        this.gridApi.setRowData(resultData);
      }
      else{
        //get ledger details by reportingreperiodid ,parent name and balance type
      var res = await this.$apiService.post("/ledgerDetails/get", {
        reportingperioddataid: Number(this.reportingPeriodId),
        parentName: this.selectedParent,
        isClosingBalance: true,
      });
      if (res && res.status === 200) {
        this.isParentDetailsAvailable.push(this.selectedParent);
        res.data.data = JSON.parse(res.data.data).map((val) => {
          val["level1"] = val["level1"] ? val["level1"].trim() : "";
          val["level2"] = val["level2"] ? val["level2"].trim() : "";
          val["level3"] = val["level3"] ? val["level3"].trim() : "";
          val["drcr"] = val["drcr"]?val["drcr"]:"Dr";
          val.level2Options = this.l2Options[val["level1"]];
          if (val.level2Options)
            val.level3Options = this.l3Options[val["level1"]][val["level2"]];
          return val;
        });
        this.rowData = JSON.parse(JSON.stringify(res.data.data));
        this.gridApi.setRowData(this.rowData);
        this.orginalTaggingtreeData = this.orginalTaggingtreeData.concat(JSON.parse(JSON.stringify(res.data.data)));
      }
      }      
    },
    moveParent(idx) {
      if (idx == 1) {
        this.parentDisplayValues.pop();
        let index = this.$_.findLastIndex(this.possibleParents, {
          name: this.parentDisplayValues[0],
        });
        this.parentDisplayValues.unshift(this.possibleParents[index - 1].name);
      } else {
        this.parentDisplayValues.shift();
        let index = this.$_.findLastIndex(this.possibleParents, {
          name: this.parentDisplayValues[3],
        });
        this.parentDisplayValues.push(this.possibleParents[index + 1].name);
      }
    },
    headerGroupHandel(idx) {
      var resultData = [];
      if (idx == 1) {
        this.isHeadergroupOpen = false;
        this.isCollapsedParent = [];
        for (let key in this.isRowGroupOpen) {
          this.isCollapsedParent.push(key);
          this.isRowGroupOpen[key] = false;
        }
        resultData = JSON.parse(JSON.stringify(this.ledgerDataCopy)).filter(
          (val) => {
            if (val.parent) {
              return false;
            } else return true;
          }
        );
        this.gridApi.setRowData(resultData)
      } else {
        this.isHeadergroupOpen = true;
        this.isCollapsedParent = [];
        for (let key in this.isRowGroupOpen) {
          this.isRowGroupOpen[key] = true;
        }
        let resultSData = this.$_.sortBy(
          JSON.parse(JSON.stringify(this.ledgerDataCopy)),
          function (val) {
            return val.indexForSort;
          }
        );
        this.gridApi.setRowData(resultSData)
      }
    },
    rowGroupHandler(name, idx) {
      if (idx == 1) {
        this.isCollapsedParent.push(name);
        this.isRowGroupOpen[name] = false;
      } else {
        this.isCollapsedParent = this.isCollapsedParent.filter(
          (val) => val != name
        );
        this.isRowGroupOpen[name] = true;
      }
      var resultData = [];
      resultData = JSON.parse(JSON.stringify(this.ledgerDataCopy)).filter(
        (val) => {
          if (val.parent && this.isCollapsedParent.indexOf(val.parent) != -1)
            return false;
          else return true;
        }
      );
      this.gridApi.setRowData(resultData)
      // this.rowData = JSON.parse(JSON.stringify(resultData))
    },
    handleTagged(val, level) {
      var resultData = [];
      if (level == 1) {
        console.log(this.rowData,this.level1filter)
        if (this.level1filter == val) this.level1filter = null;
        else this.level1filter = val;
        if (this.level1filter == 0) {
          resultData = JSON.parse(
            JSON.stringify(
              this.rowData
            )
          ).filter((val) => {
            if (!this.groupingSelected && val.isParentName) return true;
            if (
              val.level1 != "0" &&
              val.level1 &&
              !/no level/i.test(val.level1)
            )
              return false;
            else return true;
          });
        } else if (this.level1filter == 1) {
          resultData = JSON.parse(
            JSON.stringify(
              this.rowData
            )
          ).filter((val) => {
            if (!this.groupingSelected && val.isParentName) return true;
            if (
              val.level1 != "0" &&
              val.level1 &&
              !/no level/i.test(val.level1)
            )
              return true;
            else return false;
          });
        } else {
          resultData = JSON.parse(
            JSON.stringify(
              this.rowData
            )
          )
        }
      } else if (level == 2) {
        if (this.level2filter == val) this.level2filter = null;
        else this.level2filter = val;
        if (this.level2filter == 0) {
          resultData = JSON.parse(
            JSON.stringify(
              this.rowData
            )
          ).filter((val) => {
            if (!this.groupingSelected && val.isParentName) return true;
            if (
              val.level2 != "0" &&
              val.level2 &&
              !/no level/i.test(val.level2) &&
              val.level1 != "0" &&
              val.level1 &&
              !/no level/i.test(val.level1)
            )
              return false;
            else return true;
          });
        } else if (this.level2filter == 1) {
          resultData = JSON.parse(
            JSON.stringify(
              this.rowData
            )
          ).filter((val) => {
            if (!this.groupingSelected && val.isParentName) return true;
            if (
              val.level2 != "0" &&
              val.level2 &&
              !/no level/i.test(val.level2) &&
              val.level1 != "0" &&
              val.level1 &&
              !/no level/i.test(val.level1)
            )
              return true;
            else return false;
          });
        } else {
          resultData = JSON.parse(
            JSON.stringify(
              this.rowData
            )
          )
        }
      } else {
        if (this.level3filter == val) this.level3filter = null;
        else this.level3filter = val;
        if (this.level3filter == 0) {
          resultData = JSON.parse(
            JSON.stringify(
              this.rowData
            )
          ).filter((val) => {
            if (!this.groupingSelected && val.isParentName) return true;
            if (
              val.level3 != "0" &&
              val.level3 &&
              !/no level/i.test(val.level3) &&
              val.level2 != "0" &&
              val.level2 &&
              !/no level/i.test(val.level2) &&
              val.level1 != "0" &&
              val.level1 &&
              !/no level/i.test(val.level1)
            )
              return false;
             else return true;
          });
        } else if (this.level3filter == 1) {
          resultData = JSON.parse(
            JSON.stringify(
              this.rowData
            )
          ).filter((val) => {
            if (!this.groupingSelected && val.isParentName) return true;
            if (
              val.level3 != "0" &&
              val.level3 &&
              !/no level/i.test(val.level3) &&
              val.level2 != "0" &&
              val.level2 &&
              !/no level/i.test(val.level2) &&
              val.level1 != "0" &&
              val.level1 &&
              !/no level/i.test(val.level1)
            )
              return true;
             else return false;
          });
        } else {
          resultData = JSON.parse(
            JSON.stringify(
              this.rowData
            )
          )
        }
      }
      if (!this.groupingSelected)
        resultData = resultData.filter((val, idx, arr) => {
          if (arr[idx + 1] && val.isParentName && arr[idx + 1].isParentName)
            return false;
          else if (this.selectedParent) {
            if (this.selectedParent == val.parent) return true;
            else return false;
          } else return true;
        });
        this.gridApi.setRowData(resultData);
    },
    preventTypeChange(e) {
      if (this.unSavedValue.length) {
        this.isDialogMode = 1;
        this.dialogWidth = "35vw";
        this.alertMeassage =
          "Please Save the changes before changing the Balance Type";
        setTimeout(() => {
          this.bulkTagLevel1Enabled = true;
        }, 0);
        return;
      } else {
        let val = e.target.innerText;
        this.selectedImportLevel = val;
        this.getFullLedgerDetails();
      // this.gridApi.refreshCells();
      }
    },
    downloadCSV(data) {
      var csv = this.$papa.unparse(data);

      var csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      var csvURL = null;
      if (navigator.msSaveBlob) {
        csvURL = navigator.msSaveBlob(csvData, "ledgerDetails.csv");
      } else {
        csvURL = window.URL.createObjectURL(csvData);
      }

      var tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "ledgerDetails.csv");
      tempLink.click();
    },
    async handleExport(idx) {
      var res = null;
        if(!this.isAllDataGot){
        res = await this.$apiService.post("/ledgerDetails/get", {
          reportingperioddataid: Number(this.reportingPeriodId),
          parentName: "ALL",
          isClosingBalance: this.selectedImportLevel == "Closing Balance",
        });
        this.orginalTaggingtreeData = JSON.parse(res.data.data);
        }
      if (this.isAllDataGot || (res && res.status === 200)) {
        this.isAllDataGot = true;
        var pdfData = this.orginalTaggingtreeData.map((val) => {
          if (val.isParentName)
            return [
              { content: val.name, colSpan: 6, styles: { fontStyle: "bold" } },
            ];
          else
            return [
              val.name,numeral(val["balance"]).format("0,0"),
              // this.selectedImportLevel == "Closing Balance"
              //   ? numeral(val["balance"]).format("0,0")
              //   : numeral(val["balance"]).format("0,0"),
              val["drcr"] ? val["drcr"] : "Dr",
              val.level1,
              val.level2,
              val.level3,
            ];
        });
        if (idx == 1) {
          this.generatePdf(
            {
              theme: "grid",
              // body: [
              // [{ content: 'Text',sample:'gh', colSpan: 2, styles: { halign: 'center' } }],
              body: pdfData,
              // ],
              head: [
                [
                  "Name Of Ledgers",
                  "Amount",
                  "Dr/Cr",
                  "LEVEL 1",
                  "LEVEL 2",
                  "LEVEL 3",
                ],
              ],
              tableWidth: "auto",
              styles: { fontSize: "7.5" },
            },
            "ledgerDetails"
          );
        } else {
          this.excelArray = this.orginalTaggingtreeData.map((val) => {
            return {
              "Name Of Ledger": val.name,
              Amount:numeral(val["balance"]).format("0,0"),
                // this.selectedImportLevel == "Closing Balance"
                //   ? numeral(val["balance"]).format("0,0")
                //   : numeral(val["balance"]).format("0,0"),
              "Dr/Cr": val["drcr"] ? val["drcr"] : "Dr",
              "LEVEL 1": val.level1,
              "LEVEL 2": val.level2,
              "LEVEL 3": val.level3,
            };
          });
          this.downloadCSV(this.excelArray);
        }
      }
    },
    generatePdf(config, name) {
      const doc = new jsPDF();
      doc.autoTable(config);
      doc.save(name + ".pdf");
    },
    handleAllLedgers() {
      this.checkBoxValue = !this.checkBoxValue;
      this.rowData = this.rowData.map((x) => {
        x.selected = this.checkBoxValue;
        return x;
      });
    },
    ledgerDialogl1Changed(e) {
      this.dialogL1Value = e;
      if (this.isDialogMode == 3) {
        this.dialogL2Value = "";
        this.l2 = [];
        if (this.l2Options[e]) this.l2 = this.l2Options[e];
      }
    },
    ledgerDialogl2Changed(e) {
      this.dialogL2Value = e;
    },
    closeDialog() {
      this.bulkTagLevel1Enabled = false;
    },
    filterTableByledger(e) { 
      var resultData = [];
      this.orginalTaggingtreeData.forEach((val) => {
        if (e) {          
          var regex = new RegExp(e, "i");
          if (
            regex.test(val.name) &&
            (this.selectedParent ? this.selectedParent == val.parent : true)
          )
            resultData.push(val);
        } else if(this.selectedParent == val.parent) resultData.push(val);
      });
      this.gridApi.setRowData(resultData)
    },
    async getFullLedgerDetails(){
      store.commit('SET_IS_LOADING',true);  
      //get ledger details by reportingreperiodid ,parent name and balance type
          var res = await this.$apiService.post("/ledgerDetails/get", {
            reportingperioddataid: Number(this.reportingPeriodId),
            parentName: "ALL",
            isClosingBalance: this.selectedImportLevel == "Closing Balance",
          });
          if (res && res.status === 200) {
            res.data.data = JSON.parse(res.data.data).map((val) => {
              val["level1"] = val["level1"] && val["level1"]!="0" ? val["level1"].trim() : "";
              val["level2"] = val["level2"] && val["level1"]!="0" ? val["level2"].trim() : "";
              val["level3"] = val["level3"] && val["level1"]!="0" ? val["level3"].trim() : "";
              val["drcr"] = val["drcr"]?val["drcr"]:"Dr";

              val.level2Options = this.l2Options[val["level1"]];
              if (val.level2Options)
                val.level3Options = this.l3Options[val["level1"]][val["level2"]];
              return val;
            });
            var index = this.parentDisplayValues.indexOf(this.selectedParent);
            this.orginalTaggingtreeData = JSON.parse(JSON.stringify(res.data.data));
            this.isAllDataGot = true;
            this.handleSelectParent(index);
            // console.log(res.data.data,"res.data.data")
            // this.rowData = JSON.parse(JSON.stringify(res.data.data));
            
          }
          store.commit('SET_IS_LOADING',true); 
              //get tagging dashoard value
          var res1 = await this.$apiService.get(`ledger/taggingdashvalue?reportingPeriodId=${sessionStorage.getItem("reportId")}&level=${sessionStorage.getItem("taggingLevel")}`);
          if(res1&&res1.status === 200) {  
            this.totalLedger = res1.data.data.closingBalance.ledger.total;
            this.totaltaggedLedger = res1.data.data.closingBalance.ledger.tagged;
          } 
    },
    async getLedgerDetails() {
      store.commit('SET_IS_LOADING',true); 
      this.fina = JSON.parse(sessionStorage.getItem("fina"));
      var companyId = JSON.parse(sessionStorage.getItem("fina")).company_id;      
      // get l1 l2 l3 options by company type
      var levelsOptionsRes = await this.$apiService.post("/taggingtree", {
        companyId: companyId,
      });
      store.commit('SET_IS_LOADING',true);       
      var options = JSON.parse(levelsOptionsRes.data.data);
      this.l1Options = options.l1.data;
      this.l2Options = options.l2;
      this.l3Options = options.l3;
      this.l1FilterOption = JSON.parse(JSON.stringify(this.l1Options));
      //gorup wise tagging concept
      var total = 0;
      var parentname = [];
      var loopCount = 0;
      this.possibleParents=[];
      var firstLedgerGot = false; 
      setTimeout(() => {
        store.commit('SET_IS_LOADING',true);
      }, 100);
       store.commit('SET_IS_LOADING',true);     
      this.constantlyChecking = setInterval(async() => {
        var parentRes;
        if(!firstLedgerGot){
        //get all parents name for this reportingperiod id
        parentRes = await this.$apiService.post("/ledgerDetails/getParents", {
          reportingperioddataid: Number(this.reportingPeriodId)
        });
        
        store.commit('SET_IS_LOADING',true); 
        }
        else{
          await fetch("http://localhost:8080/ledgerDetails/getParents",{method:"POST",headers:{
            'Content-Type': 'application/json'
            },body:JSON.stringify({reportingperioddataid: Number(this.reportingPeriodId)})
          }).then(res=>res.json()).then(res=>{parentRes={"data":res}});
          
        }
        console.log(parentRes,"parentRes")
        if (parentRes) {
          if(!total) total = parentRes.data.data.totalgroup;
          console.log(parentRes.data.data.groupcompleted,"parentRes.data.data.groupcompleted")
          parentname[loopCount] = parentRes.data.data.groupcompleted;
          parentname[loopCount].forEach((val,idx)=>{
            if(val != 'Profit & Loss A/c' && idx>this.possibleParents.length-1)
              this.possibleParents.push({"name":val})
          })
          
          if(this.parentDisplayValues.length<=5)this.parentDisplayValues = this.possibleParents.map(val=>val.name).slice(0, 5);
          if(!this.selectedParent)this.selectedParent = this.parentDisplayValues[0];
          if(!this.selectedParent)this.isParentDetailsAvailable.push(this.selectedParent);
          console.log(firstLedgerGot ,this.possibleParents[0] )
          if(!firstLedgerGot && this.possibleParents[0]){
                firstLedgerGot = true;
                //get ledger details by reportingreperiodid ,parent name and balance type
                var res = await this.$apiService.post("/ledgerDetails/get", {
                  reportingperioddataid: Number(this.reportingPeriodId),
                  parentName: this.parentDisplayValues[0],
                  isClosingBalance: true,
                });
                if (res && res.status === 200) {
                  res.data.data = JSON.parse(res.data.data).map((val) => {
                    val["level1"] = val["level1"] && val["level1"]!="0" ? val["level1"].trim() : "";
                    val["level2"] = val["level2"] && val["level1"]!="0" ? val["level2"].trim() : "";
                    val["level3"] = val["level3"] && val["level1"]!="0" ? val["level3"].trim() : "";
                    val["drcr"] = val["drcr"]?val["drcr"]:"Dr";
                    val.level2Options = this.l2Options[val["level1"]];
                    if (val.level2Options)
                      val.level3Options = this.l3Options[val["level1"]][val["level2"]];
                    return val;
                  });
                  this.rowData = JSON.parse(JSON.stringify(res.data.data));
                  this.orginalTaggingtreeData = JSON.parse(JSON.stringify(res.data.data));
                }
          }
          if(total <= parentRes.data.data.groupcompleted.length) {  
            this.clearIntervalFn();          
            this.getFullLedgerDetails()
      //             //get total ledger count for this reportingperiod id
      // var totalRes = await this.$apiService.post(
      //   "/ledgerDetails/getTotalLedgerCount",
      //   { reportingperioddataid: reportingPeriodId }
      // );
      // if (totalRes && totalRes.status === 200) {
      //   this.totalLedger = totalRes.data.data[0].exact_count;
      // }
    //get tagging dashoard value
        var res1 = await this.$apiService.get(`ledger/taggingdashvalue?reportingPeriodId=${sessionStorage.getItem("reportId")}&level=${sessionStorage.getItem("taggingLevel")}`);
            if(res1&&res1.status === 200) {  
              this.totalLedger = res1.data.data.closingBalance.ledger.total;
              this.totaltaggedLedger = res1.data.data.closingBalance.ledger.tagged;
            }

          }
          loopCount++;
        } 
        else{
           clearInterval(this.constantlyChecking);
        }       
        }, 3000);
    },
    clearIntervalFn(){
      clearInterval(this.constantlyChecking)
    },
    async viewChange(e) {
      this.groupingSelected = e;
      if (e) {
        this.tableHeight = "61.8vh";
          // this.gridApi.setRowData(JSON.parse(JSON.stringify(this.orginalTaggingtreeData)))
          this.rowData = JSON.parse(JSON.stringify(this.orginalTaggingtreeData)).filter(val=>this.selectedParent == val.parent);
      } else {
        this.isRowGroupOpen = [];
        this.tableHeight = "68vh";
        var res = null;
        if(!this.isAllDataGot){
        res = await this.$apiService.post("/ledgerDetails/get", {
          reportingperioddataid: Number(this.reportingPeriodId),
          parentName: "ALL",
          isClosingBalance: this.selectedImportLevel == "Closing Balance",
        });
        this.orginalTaggingtreeData = JSON.parse(JSON.stringify(res))
        }
        else{
          res = JSON.parse(JSON.stringify(this.orginalTaggingtreeData));
        }
        if (this.isAllDataGot || (res && res.status === 200)) {
          this.isAllDataGot = true;
          let dataCopy = JSON.parse(JSON.stringify(this.orginalTaggingtreeData));
          let resultData = [];
          var temp1 = this.$_.groupBy(dataCopy, (val) => val.parent);
          var indexForSort = 0;
          for (let key in temp1) {
            this.isRowGroupOpen[key] = true;
            resultData.push({
              parent:key,
              name: key,
              isParentName: true,
              indexForSort: indexForSort++,
            });
            temp1[key] = temp1[key].map((val) => {
              val["level1"] = val["level1"] ? val["level1"].trim() : "";
          val["level2"] = val["level2"] ? val["level2"].trim() : "";
          val["level3"] = val["level3"] ? val["level3"].trim() : "";
          val["drcr"] = val["drcr"]?val["drcr"]:"Dr";

          val.level2Options = this.l2Options[val["level1"]];
          if (val.level2Options)
            val.level3Options = this.l3Options[val["level1"]][val["level2"]];
              val["indexForSort"] = indexForSort++;
              return val;
            });
            resultData = resultData.concat(temp1[key]);
          }
          this.rowData = JSON.parse(JSON.stringify(resultData));
          // this.gridApi.setRowData(JSON.parse(JSON.stringify(resultData)))
          this.ledgerDataCopy = resultData;
        }
      }
    },
    bulkTagLevel(val) {
      this.dialogL1Value = "";
      this.dialogL2Value = "";
      let selected = [];
      selected = this.rowData.filter((x) => x.selected == true);
      if (selected.length < 1) {
        this.isDialogMode = 1;
        this.dialogWidth = "35vw";
        this.alertMeassage =
          "Please Select atlest one Ledger to do Bulk tagging.";
      } else {
        this.isDialogMode = val;
        if (val == 2) this.dialogWidth = "35vw";
        else {
          let isSame = true;
          for (let i = 1; i < selected.length; i++) {
            if (selected[i].level1 != selected[i - 1].level1) {
              isSame = false;
              break;
            }
          }
          if (isSame || this.isDiffBulck) {
            this.dialogWidth = "50vw";
            this.isDiffBulck = false;
          } else {
            this.isDiffBulck = !isSame;
            this.isDialogMode = 1;
            this.dialogWidth = "35vw";
            this.alertMeassage =
              "Selected Ledgers has different L1 values,Do you want to Continue?";
          }
        }
      }
      this.bulkTagLevel1Enabled = true;
    },
    hideLevel3Fields() {
      let modifiedColumn = JSON.parse(JSON.stringify(this.allColumnDefs));
      modifiedColumn[7].hide =true;
      this.columnDefs= modifiedColumn;
      this.showLevel3 = false;
    },
    hideLevel2Fields() {
      let modifiedColumn = JSON.parse(JSON.stringify(this.allColumnDefs));
      modifiedColumn[6].hide =true;
      this.columnDefs= modifiedColumn;
      this.showLevel2 = false;
      this.showLevel3 = false;
    },
    showLevel2Fields() {
      this.showLevel2 = true;
      this.columnDefs= JSON.parse(JSON.stringify(this.allColumnDefs));
    },
    showLevel3Fields() {      
      this.showLevel3 = true;
      let modifiedColumn = JSON.parse(JSON.stringify(this.allColumnDefs));
      modifiedColumn[7].hide =false;
      this.columnDefs= modifiedColumn;
    },
    async saveAllLedgers() { 
      var res = await this.$apiService.put(`/ledgerDetails`,{"data":JSON.stringify(this.unSavedValue)});
      if (res && res.status === 200) {
        this.unSavedValue = [];
        this.isDialogMode = 1;
        this.dialogWidth = "35vw";
        this.alertMeassage = "Ledgers are saved successfully.";
        setTimeout(() => {
          this.bulkTagLevel1Enabled = true;
        }, 0);
      }
      if (res.data.status === "error") {
        this.isDialogMode = 1;
        this.dialogWidth = "35vw";
        this.alertMeassage = "Ledgers are not saved successfully.";
        setTimeout(() => {
          this.bulkTagLevel1Enabled = true;
        }, 0);
      }
    },
    ledgerLevel1Changed(val) {
      val["level2Options"] = this.l2Options[val["level1"]]
        ? this.l2Options[val["level1"]]
        : [];
      val["level3Options"] = [];
      val["level2"] = "";
      val["level3"] = "";
      val["level1"] = val["level1"] ? val["level1"].trim() : "";
      if(this.groupingSelected || !val.isParentName){
        let index = this.$_.findLastIndex(this.orginalTaggingtreeData, {
          name: val.name,
          parent: val.parent,
        });
        if(this.orginalTaggingtreeData[index]){
        this.orginalTaggingtreeData[index]["level1"] = val["level1"];
        this.orginalTaggingtreeData[index]["level2"] = val["level2"];
        this.orginalTaggingtreeData[index]["level3"] = val["level3"];
        }      
        var rowNode = this.gridApi.getRowNode(val.parent+val.name);
        rowNode.setDataValue("level1", val["level1"]);
        this.updateUnsavedValues(val.parent,val.name,index); 
      }
      else{
        this.orginalTaggingtreeData = this.orginalTaggingtreeData.map(value=>{
          if(val.isParentName && value.parent == val.parent && value.name == val.name){
        if(!value["level1"])value["level1"] = val["level1"];
        if(!value["level2"])value["level2"] = val["level2"];
        if(!value["level3"])value["level3"] = val["level3"];
          }
          else if(value.parent == val.name){
        if(!value["level1"])value["level1"] = val["level1"];
        if(!value["level2"])value["level2"] = val["level2"];
        if(!value["level3"])value["level3"] = val["level3"];
          }
          return value;
        });
        this.rowData = this.rowData.map(value=>{
          if(val.isParentName && value.parent == val.parent && value.name == val.name){
        if(!value["level1"])value["level1"] = val["level1"];
        if(!value["level2"])value["level2"] = val["level2"];
        if(!value["level3"])value["level3"] = val["level3"];
          }
          else if(value.parent == val.name){
        if(!value["level1"])value["level1"] = val["level1"];
        if(!value["level2"])value["level2"] = val["level2"];
        if(!value["level3"])value["level3"] = val["level3"];
          }
          return value;
        })
      }
    },
    BulkTagOneChanged(value) {
      let level2 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter((x) => x.level1 == value);
      if (tagFilter.length == 0) return;

      if (tagFilter.length != 0) {
        tagFilter[0].level2.forEach((element) => {
          level2.push(element.level2name);
        });
      }
      if (level2.length > 0) {
        this.level2BulkValues = level2;
      } else {
        this.level2BulkValues = [];
      }
      this.bulkTagSelectedLevel2 = "";
    },
    ledgerLevel3Changed(val) {
      val["level3"] = val["level3"] ? val["level3"].trim() : "";
      if(this.groupingSelected || !val.isParentName){
      let index = this.$_.findLastIndex(this.orginalTaggingtreeData, {
        name: val.name,
        parent: val.parent,
      });
      this.orginalTaggingtreeData[index]["level3"] = val["level3"];
      var rowNode = this.gridApi.getRowNode(val.parent+val.name);
      rowNode.setDataValue("level3", val["level3"]);
      this.updateUnsavedValues(val.parent,val.name,index); 
      }
      else{
      this.orginalTaggingtreeData = this.orginalTaggingtreeData.map(value=>{
        if(val.isParentName && value.parent == val.parent && value.name == val.name){
      if(!value["level3"])value["level3"] = val["level3"];
        }
        else if(value.parent == val.name){
      if(!value["level3"])value["level3"] = val["level3"];
        }
        return value;
      });
      this.rowData = this.rowData.map(value=>{
        if(val.isParentName && value.parent == val.parent && value.name == val.name){
      if(!value["level3"])value["level3"] = val["level3"];
        }
        else if(value.parent == val.name){
      if(!value["level3"])value["level3"] = val["level3"];
        }
        return value;
      })
    }
    },
    ledgerLevel2Changed(val) {
      val["level2"] = val["level2"] ? val["level2"].trim() : "";
      val["level3"] = "";
      val["level3Options"] = [];
      if (
        this.l3Options[val["level1"]] &&
        this.l3Options[val["level1"]][val["level2"]]
      )
      val["level3Options"] = this.l3Options[val["level1"]][val["level2"]];
      if(this.groupingSelected || !val.isParentName){
      let index = this.$_.findLastIndex(this.orginalTaggingtreeData, {
        name: val.name,
        parent: val.parent,
      });
      this.orginalTaggingtreeData[index]["level2"] = val["level2"];
      this.orginalTaggingtreeData[index]["level3"] = val["level3"];
      var rowNode = this.gridApi.getRowNode(val.parent+val.name);
      rowNode.setDataValue("level2", val["level2"]);
      this.updateUnsavedValues(val.parent,val.name,index); 
      }
      else{
      this.orginalTaggingtreeData = this.orginalTaggingtreeData.map(value=>{
        if(val.isParentName && value.parent == val.parent && value.name == val.name){
      if(!value["level2"])value["level2"] = val["level2"];
      if(!value["level3"])value["level3"] = val["level3"];
        }
        else if(value.parent == val.name){
      if(!value["level2"])value["level2"] = val["level2"];
      if(!value["level3"])value["level3"] = val["level3"];
        }
        return value;
      });
      this.rowData = this.rowData.map(value=>{
        if(val.isParentName && value.parent == val.parent && value.name == val.name){
      if(!value["level2"])value["level2"] = val["level2"];
      if(!value["level3"])value["level3"] = val["level3"];
        }
        else if(value.parent == val.name){
      if(!value["level2"])value["level2"] = val["level2"];
      if(!value["level3"])value["level3"] = val["level3"];
        }
        return value;
      })
    }
    },
    async fillLedgerData(data) {
      const allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      data.forEach((x) => {
        x["selection"] = false;
        if (parseInt(x["balance"]) < 0) {
          x["drcr"] = "Cr";
        } else {
          x["drcr"] = "Dr";
        }

        let level1 = [];

        var tagFilter = allTagHeaders.filter((row) => row.level1 == x.level1);
        if (tagFilter.length == 0) {
          return;
        } else {
          level1.push(tagFilter[0].level1);
          this.templevel1Arryay.push({
            ledgerid: x.ledgerid,
            level1: this.level1Names,
          });
        }

        if (level1.length > 0) {
          let level2 = [];
          this.templevel1Arryay.push({ ledgerid: x.ledgerid, level1: level1 });
          var tag2Filter = tagFilter.filter((row) => row.level1 == x.level1);
          if (tag2Filter.length != 0) {
            tag2Filter[0].level2.forEach((element) => {
              level2.push(element.level2name);
            });
            if (level2.length > 0) {
              let level3 = [];
              this.templevel2Arryay.push({
                ledgerid: x.ledgerid,
                level2: level2,
              });
              var tag3Filter = tag2Filter[0].level2.filter(
                (row) => row.level2name == x.level2
              );
              if (tag3Filter.length != 0) {
                tag3Filter[0].level3.forEach((element) => {
                  level3.push(element);
                });
              }
              if (level3.length > 0) {
                this.templevel3Arryay.push({
                  ledgerid: x.ledgerid,
                  level3: level3,
                });
              }
            }
          }
        }
      });
    },
    async applyLevel1BulkTags() {
      this.rowData = this.rowData.map((val) => {
        if (val.selected == true) {
          val["level1"] = this.dialogL1Value;
          val["level2"] = this.dialogL2Value;
          val["level3"] = "";
          val["level2Options"] = [];
          val.level3Options = [];
          val.level2Options = this.l2Options[val["level1"]];
          if (val.level2Options)
            val.level3Options = this.l3Options[val["level1"]][val["level2"]];
          
          let index = this.$_.findLastIndex(this.orginalTaggingtreeData, {
            name: val.name,
            parent: val.parent,
          });
          if(this.orginalTaggingtreeData[index]){
          this.orginalTaggingtreeData[index]["level1"] = val["level1"];
          this.orginalTaggingtreeData[index]["level2"] = val["level2"];
          this.orginalTaggingtreeData[index]["level3"] = val["level3"];
          }
          var rowNode = this.gridApi.getRowNode(val.parent+val.name);
          rowNode.setDataValue("level1", val["level1"]);
          rowNode.setDataValue("level2", val["level2"]);
          rowNode.setDataValue("level3", val["level3"]);
          this.updateUnsavedValues(val.parent,val.name,index);   
          val.selected = false;       
        }
        return val;
      });
      this.checkBoxValue = false;
      this.bulkTagLevel1Enabled = false;
    },
  },
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

/deep/ .v-select > .v-input__control{
  min-height: 38px;
}
/* to remove the box shadow of drop down in AE dialog */
/deep/ .v-select > .v-input__control > .v-input__slot{
  box-shadow: none !important;
}

/deep/ .header{
  font-size: 17px !important;
    font-weight: 600 !important;
    letter-spacing: 1px !important;
}

/deep/ .primaryColor{
  color:#03a9f4 !important;
}
* {
  /* font-family: "Be Vietnam" !important; */
  font-family: Be Vietnam, Helvetica, Arial, sans-serif !important;
  font-size: 14px !important;
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
  font-family: "Roboto";
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
  .ag-cell >.main-wrapper>.v-text-field--outlined.v-input--dense.v-text-field--single-line
  > .v-input__control
  > .v-input__slot,
.ag-cell >.main-wrapper>.v-text-field--outlined.v-input--dense.v-text-field--outlined
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
  background-color: #fff;
}

/deep/.v-list {
  max-width: 22vw !important;
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
  background-color: #fff;

}

/deep/ .v-menu__content {
    background-color: #fff;
}

.cardStyle{
  border: 1px solid white ;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
/deep/ .ag-theme-material .ag-row{
  border: 0px !important;
  font-size: 14px !important;
  text-align: start;
}

/deep/ .ag-theme-material .ag-header-row{
border-bottom: 5px solid #03a9f4 !important;
text-transform: capitalize;
font-size: 14px !important;
text-align: start;
}

/deep/ .aeDialogStyle{
  height:75vh !important;
}
/deep/ .aeAddDialogStyle{
  height:70vh !important;
  }

  /deep/ .commentStyle{
    height:100px !important;
  }
  
  /deep/.commentStyle>div>div{
    display: block;
  }
</style>

