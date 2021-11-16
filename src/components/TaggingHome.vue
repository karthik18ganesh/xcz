<template>
  <v-container class="grey lighten-5">
    <v-dialog v-model="showXMLDialogue" width="500">
      <v-card>
        <v-card-title class="text-h5 white lighten-2">
          <div>Import from Tally</div>
        </v-card-title>
        <v-divider class="blueUline"></v-divider>

        <v-card-text>
          <v-form novalidate="true" ref="tallyForm">
            <v-container class="lighten-5">
              <v-row no-gutters>
                <v-col>
                  <h3 style="float: left">Name of the organization</h3>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-select
                    dense
                    outlined
                    v-model="selectedCompany"
                    :items="this.$store.getters.companies"
                    item-text="name"
                    item-value="id"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <h3 style="float: left">Period</h3>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <template>
                    <v-file-input
                      accept="text/xml, text/txt, text/html"
                      @change="xmlFileChanged"
                      outlined
                      ref="tallyUploader"
                      dense
                      class="ma-0"
                      prepend-icon=""
                      label="Upload File"
                    >
                      <v-btn
                        color="blue-grey"
                        @click="addDocument('xml')"
                        class="uploadBtn white--text"
                        dense
                        style="
                          padding: 15px;
                          margin-top: -6px;
                          margin-right: -8px;
                        "
                        slot="append"
                      >
                        Choose
                      </v-btn>
                    </v-file-input>
                  </template></v-col
                ></v-row
              ></v-container
            ></v-form
          ></v-card-text
        ></v-card
      ></v-dialog
    ></v-container
  >
</template>
      </v-col>
     
    </v-row>
  </v-container>
</v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="vertical-center" >
          <v-spacer></v-spacer>
   <v-btn
      class="ma-2"  
      color="primary"
      @click="submitXml"
     
    >
      Import
    </v-btn>
    <v-btn
      class="ma-2"
      outlined
      color="indigo"
    >
      Cancel
    </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog
      v-model="showExcelDialogue"
      width="500"
    >
   

      <v-card>
        <v-card-title class="text-h5 white lighten-2 ">
            <div >
                 Import from Excel
                </div>
        
        </v-card-title>
        <v-divider  class="blueUline"></v-divider>

        <v-card-text>
              <v-form novalidate="true" ref="tallyForm">
         <v-container class=" lighten-5">
             <v-row
     
      no-gutters
    >
    <v-col>
          <v-btn
          style="float:right"
     small
    
       color="blue-grey"
      class="ma-2 white--text"
     
    >
      Download Template
    </v-btn>
        </v-col>
        </v-row>
         <v-row
     
      no-gutters
    >
    <v-col style="margin-top:20px">
<template>
  <v-file-input
    accept="image/png, image/jpeg, image/bmp"
    outlined
    ref="uploader"
    dense
    class="ma-0"
    prepend-icon=""
    label="Upload File"
  >
    <v-btn
      color="blue-grey"
      @click="addDocument()"
      class="uploadBtn white--text"
      dense
      style="padding: 15px; margin-top: -6px; margin-right: -8px"
      slot="append"
    >
      Choose
    </v-btn>
  </v-file-input>
</template>
        </v-col>
        </v-row>
         
   
  </v-container>
</v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="vertical-center" >
          <v-spacer></v-spacer>
   <v-btn
      class="ma-2"    
      color="primary"
     
    >
      Import
    </v-btn>
    <v-btn
      class="ma-2"
      outlined
      color="indigo"
    >
      Cancel
    </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row no-gutters>
      <v-col
      
        cols="12"
        md="2"
        sm="4"
      >
       <h6 class="LabelText">Period</h6>
      </v-col>
        <v-col
      
        cols="12"
        md="2"
        sm="4"
         class="LabelText"
      >
        <v-select
        dense
        outlined
        v-model="selectedYear"
    :items="['Current Year', '2020-2021']"
   
  ></v-select>
      </v-col>
      <v-col
      
        cols="12"
        md="2"
        sm="4"
      >
       <h6 class="LabelText" style="float:right">Import From</h6>
      </v-col>
       <v-col
      
        cols="12"
        md="2"
        sm="4"
      >
       <v-btn
     
     
      @click="showExcelDialogue=true"
      color="blue-grey"
      class="ma-2 white--text"
     
    >
      Excel
   
    </v-btn>
      </v-col>
         <v-col
      
        cols="12"
        md="2"
        sm="4"
      >
       <v-btn
     
      color="blue-grey"
      class="ma-2 white--text"
     @click="showXMLDialogue=true"
    >
      Tally
   
    </v-btn>
      </v-col>
      <v-col>
        <v-card>
          <v-sheet
    class="mx-2"
    
  >
    <v-slide-group
 
     class="mx-2"
     v-if="dataImported"
    
      show-arrows
    >
     <v-slide-item
     v-slot="{ active, toggle }"
      class="grey white">
       <v-btn
          class="mx-2"
          :input-value="active"
          active-class="purple white--text"
          depressed
         dense
         @click="sendValue('all');toggle()"
        >
        All Ledgers
        </v-btn>
       </v-slide-item>
      <v-slide-item
       v-slot="{ active, toggle }"
        v-for="(value,index) in this.$store.getters.tagHeaders"
        class="grey white"
        :key="index"
       
      >
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="purple white--text"
          depressed
         dense
         @click="sendValue(value.group1);toggle;"
        >
        {{value.group1}}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
   
  </v-card>
        </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card v-if="!tagSelected&&dataImported">
    <b-table ref="table" striped hover :fields="fields" :items="taggedLedgerData">
      <template #head(name)="data">
        <span class="text-info">{{ data.label.toUpperCase() }}</span>
       
      </template>

<template v-slot:cell(group1)="data">
   <div class="main-wrapper">
  <b-form-select
      v-model="data.item.group1"
       :options="$store.getters.tagHeaders"
      class="form-select"
      value-field="group1"
    
      text-field="group1"
      
     @change="ledgerGroup1Changed(data.item)"
      disabled-field="notEnabled"
    ></b-form-select>
    </div>
</template>
<template v-slot:cell(group2)="data">
   <div class="main-wrapper">
  <b-form-select
      v-model="data.item.group2"
      :options="tempGroup2Arryay.filter(x=>x.ledgerid==data.item.ledgerid).length>0?tempGroup2Arryay.filter(x=>x.ledgerid==data.item.ledgerid)[0].group2:[]"
      class="form-select"
     @change="ledgerGroup2Changed(data.item)"
      disabled-field="notEnabled"
    ></b-form-select>
    </div>
</template>
<template v-slot:cell(group3)="data">
   <div class="main-wrapper">
  <b-form-select
      v-model="data.item.group3"
      :options="tempGroup3Arryay.filter(x=>x.ledgerid==data.item.ledgerid).length>0?tempGroup3Arryay.filter(x=>x.ledgerid==data.item.ledgerid)[0].group3:[]"
      class="form-select"
     
      disabled-field="notEnabled"
    ></b-form-select>
    </div>
</template>
<template v-slot:cell(action)="data">
   <div class="main-wrapper">
   <div class="btnRow">
         <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-0" fab dark x-small color="grey"
               
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
               
              >
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
               <v-list-item
               
              >
                <v-list-item-title @click="saveAllLedgers">Save All</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
                 <v-btn class="mx-0" fab dark x-small color="green" @click="onLedgerSubmit(data.item)">
                    <v-icon dark>mdi-check</v-icon>
                </v-btn>
                </div>
    </div>
</template>

    </b-table>
 
  </v-card>
  <v-card v-if="tagSelected">
   <b-table ref="treeTable" striped hover :fields="treeFields" :items="filteredTaggingTreeData">
<template v-slot:cell(tagheader)="data">
   <div class="main-wrapper">
  <b-form-select
      v-model="data.item.tagheader"
      :options="$store.getters.tagHeaders"
      class="form-select"
      value-field="tagheader"
      @change="tagTreeTagChanged(data)"
      text-field="tagheader"
      disabled-field="notEnabled"
    ></b-form-select>
    </div>
</template>
<template v-slot:cell(group1)="data">
   <div class="main-wrapper">
  <b-form-select
      v-model="data.item.group1"
      :options="$store.getters.tagHeaders"
      class="form-select"
      value-field="group1"
    
      text-field="group1"
     @change="tagTreeGroup1Changed(data.item)"
      disabled-field="notEnabled"
    ></b-form-select>
    </div>
</template>
<template v-slot:cell(group2)="data">
   <div class="main-wrapper">
  <b-form-select
      v-model="data.item.group2"
      :options="tempTreeGroup2Arryay.filter(x=>x.id==data.item.id).length>0?tempTreeGroup2Arryay.filter(x=>x.id==data.item.id)[0].group2:[]"
      class="form-select"
     @change="tagTreeGroup2Changed(data.item)"
      disabled-field="notEnabled"
    ></b-form-select>
    </div>
</template>
<template v-slot:cell(group3)="data">
   <div class="main-wrapper">
  <b-form-select
      v-model="data.item.group3"
      :options="tempTreeGroup3Arryay.filter(x=>x.id==data.item.id).length>0?tempTreeGroup3Arryay.filter(x=>x.id==data.item.id)[0].group3:[]"
      class="form-select"
     
      disabled-field="notEnabled"
    ></b-form-select>
    </div>
</template>
<template v-slot:cell(action)="data">
   <div class="main-wrapper">
   <div class="btnRow">
         <v-btn class="mx-0" fab dark x-small color="grey" >
                    <v-icon dark>mdi-dots-vertical</v-icon>
                </v-btn>
                 <v-btn class="mx-0" fab dark x-small color="green" @click="onTagTreeSubmit(data)">
                    <v-icon dark>mdi-check</v-icon>
                </v-btn>
                </div>
    </div>
</template>

    </b-table>
 
  </v-card>
     <v-col>
       <v-card>
          <v-sheet
    class="mx-2"
    
  >
    <v-slide-group
     class="mx-2"
     v-if="dataImported"
    
      show-arrows
    >
     <v-slide-item
     v-slot="{ active, toggle }"
      class="grey white">
       <v-btn
          class="mx-2"
          :input-value="active"
          active-class="purple white--text"
          depressed
         dense
         @click="sendValue('all');toggle()"
        >
        All Ledgers
        </v-btn>
       </v-slide-item>
      <v-slide-item
       v-slot="{ active, toggle }"
        v-for="(value,index) in this.$store.getters.tagHeaders"
        class="grey white"
        :key="index"
       
      >
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="purple white--text"
          depressed
         dense
         @click="sendValue(value.group1);toggle;"
        >
        {{value.group1}}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
   
  </v-card>
        </v-col>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import store from '../store'
export default {
  name: "TaggingHome",
  data() {
    return {
      date: "",
      xmlFile: null,
      tempSelect: [],
      tempGroup1Arryay: [],
      tempGroup2Arryay: [],
      tempGroup3Arryay: [],
      tempTreeGroup1Arryay: [],
      tempTreeGroup2Arryay: [],
      tempTreeGroup3Arryay: [],

      selectedYear: "Current Year",
      selectedCompany: "VKC",
      showXMLDialogue: false,

      dataImported: false,
      tagSelected: false,
      selectedTag: "",
      fields: [
        {
          key: "name",
          sortable: true,
        },
        {
          label: "Dr/Cr",
          key: "drcr",
          sortable: false,
        },

        {
          label: "Amount",
          key: "closingbal",
          sortable: false,
        },
        {
          key: "group1",
          label: "Group 1",
          sortable: true,
        },
        {
          key: "group2",
          label: "Group 2",
          sortable: true,
        },
        {
          key: "group3",
          label: "Group 3",
          sortable: true,
        },
        {
          key: "action",
          label: "Actions",
        },
      ],
      treeFields: [
        {
          key: "companytype",
          sortable: true,
          label: "Company type",
        },
        {
          key: "group1",
          label: "Group 1",
          sortable: true,
        },
        {
          key: "group2",
          label: "Group 2",
          sortable: true,
        },
        {
          key: "group3",
          label: "Group 3",
          sortable: true,
        },
        {
          key: "action",
          label: "Actions",
        },
      ],
      showExcelDialogue: false,
      showDatatable: false,
      taggedLedgerData: [],

      taggingTreeData: [],
      filteredTaggingTreeData: [],
      taggingTreHeaders: [
        { text: "Tag Hader", value: "tagheader" },
        { text: "Company Type", value: "companytype" },
        { text: "Group 1", value: "group1", width: 285 },
        { text: "Group 2", value: "group2", width: 285 },
        { text: "Group 3", value: "group3", width: 285 },
        { text: "Actions", value: "action" },
      ],
      tagHeaders: [
        { text: "Name", value: "name" },
        { text: "Tagging Header", value: "taggingheader" },

        { text: "Group 1", value: "group1" },
        { text: "Group 2", value: "group2" },
        { text: "Group 2", value: "group3" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  mounted() {
    this.allTagHeaders = this.$store.getters.tagHeaders;
    // this.$store.commit("setSidebar",true);
    console.log(this.$store.getters.sibeBarEnabled, "gp2");
  },

  methods: {
    async saveAllLedgers() {
      var res = await this.$apiService.put(
        `processing/tagging/update`,
        this.taggedLedgerData
      );
      if (res && res.status === 200) {
        this.showSuccess(res.data.message);
        this.$refs.table.refresh();
        // await this.getAllLedgerData(this.selectedCompany);
        await this.getTaggingTreeData();
        console.log("success");
      }
      if (res.data.status === "error") {
        console.log("error");
      }
    },
    async onTagTreeSubmit(data) {
      console.log(data);
      this.$refs.treeTable.refresh();
      this.filterTaggingTree(this.selectedTag);
    },
    async onLedgerSubmit(data) {
      let putData = [];
      putData.push(data);
      var res = await this.$apiService.put(
        `processing/tagging/update`,
        putData
      );
      if (res && res.status === 200) {
        this.showSuccess(res.data.message);
        this.$refs.table.refresh();
        // await this.getAllLedgerData(this.selectedCompany);
        await this.getTaggingTreeData();
        console.log("success");
      }
      if (res.data.status === "error") {
        console.log("error");
      }
      console.log(data);
    },
    ledgerGroup1Changed(value) {
      let group2 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter(
        (x) => x.group1 == value.group1
      );
      if (tagFilter.length == 0) return;

      if (tagFilter.length != 0) {
        tagFilter[0].group2.forEach((element) => {
          group2.push(element.group2name);
        });
      }
      if (group2.length > 0) {
        if (
          this.tempGroup2Arryay.filter((x) => x.ledgerid == value.ledgerid)
            .length == 0
        ) {
          this.tempGroup2Arryay.push({
            ledgerid: value.ledgerid,
            group2: group2,
          });
        } else {
          this.tempGroup2Arryay.filter(
            (x) => x.ledgerid == value.ledgerid
          )[0].group2 = group2;
          this.taggedLedgerData.filter(
            (x) => x.ledgerid == value.ledgerid
          )[0].group2 = null;
          //console.log(this.taggedLedgerData.filter(x=>x.ledgerid==value.ledgerid)[0],"shum")
        }
      }
      this.$refs.table.refresh();
    },

    ledgerGroup2Changed(item) {
      debugger; // eslint-disable-line no-debugger
      let group3 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter((x) => x.group1 == item.group1);
      if (tagFilter.length == 0) return;

      var tag3Filter = tagFilter[0].group2.filter(
        (x) => x.group2name == item.group2
      );
      if (tag3Filter.length != 0) {
        tag3Filter[0].group3.forEach((element) => {
          group3.push(element);
        });
      }
      if (group3.length > 0) {
        if (
          this.tempGroup3Arryay.filter((x) => x.ledgerid == item.ledgerid)
            .length == 0
        ) {
          this.tempGroup3Arryay.push({
            ledgerid: item.ledgerid,
            group3: group3,
          });
        } else {
          this.tempGroup3Arryay.filter(
            (x) => x.ledgerid == item.ledgerid
          )[0].group3 = group3;
          this.taggedLedgerData.filter(
            (x) => x.ledgerid == item.ledgerid
          )[0].group3 = null;
          //console.log(this.taggedLedgerData.filter(x=>x.ledgerid==value.ledgerid)[0],"shum")
        }
      }
      this.$refs.table.refresh();
    },
    ledgerTagChanged(value) {
      console.log(value, "ledgerTagChanged");
      let group1 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter(
        (x) => x.tagheader == value.item.taggingheader
      );
      tagFilter[0].group1.forEach((element) => {
        group1.push(element.group1name);
      });
      if (group1.length > 0) {
        if (
          this.tempGroup1Arryay.filter((x) => x.ledgerid == value.item.ledgerid)
            .length == 0
        ) {
          this.tempGroup1Arryay.push({
            ledgerid: value.item.ledgerid,
            group1: group1,
          });
        } else {
          this.tempGroup1Arryay.filter(
            (x) => x.ledgerid == value.item.ledgerid
          )[0].group1 = group1;
          this.taggedLedgerData.filter(
            (x) => x.ledgerid == value.item.ledgerid
          )[0].group1 = null;
          console.log(
            this.taggedLedgerData.filter(
              (x) => x.ledgerid == value.item.ledgerid
            )[0],
            "shum"
          );
        }

        this.$refs.table.refresh();
      }
      console.log(
        this.tempGroup1Arryay.filter(
          (x) => x.ledgerid == value.item.ledgerid
        )[0].group1,
        "s"
      );
    },
    tagTreeGroup2Changed(item) {
      let group3 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter(
        (row) => row.group1 == item.group1
      );
      if (tagFilter.length == 0) return;

      var tag3Filter = tagFilter[0].group2.filter(
        (x) => x.group2name == item.group2
      );
      if (tag3Filter.length != 0) {
        tag3Filter[0].group3.forEach((element) => {
          group3.push(element);
        });
      }
      if (group3.length > 0) {
        if (
          this.tempTreeGroup3Arryay.filter((x) => x.id == item.id).length == 0
        ) {
          this.tempTreeGroup3Arryay.push({ id: item.id, group3: group3 });
        } else {
          this.tempTreeGroup3Arryay.filter((x) => x.id == item.id)[0].group3 =
            group3;
          this.taggingTreeData.filter((x) => x.id == item.id)[0].group3 = null;
          //console.log(this.taggedLedgerData.filter(x=>x.ledgerid==value.ledgerid)[0],"shum")
        }
      }
      this.$refs.table.refresh();
    },
    tagTreeGroup1Changed(value) {
      let group2 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter(
        (row) => row.group1 == value.group1
      );
      if (tagFilter.length == 0) return;

      if (tagFilter.length != 0) {
        tagFilter[0].group2.forEach((element) => {
          group2.push(element.group2name);
        });
      }
      if (group2.length > 0) {
        if (
          this.tempTreeGroup2Arryay.filter((x) => x.id == value.id).length == 0
        ) {
          this.tempTreeGroup2Arryay.push({ id: value.id, group2: group2 });
        } else {
          this.tempTreeGroup2Arryay.filter((x) => x.id == value.id)[0].group2 =
            group2;
          this.taggingTreeData.filter((x) => x.id == value.id)[0].group2 = null;
          this.taggingTreeData.filter((x) => x.id == value.id)[0].group3 = null;
          //console.log(this.taggedLedgerData.filter(x=>x.ledgerid==value.ledgerid)[0],"shum")
        }
      }
    },
    tagTreeTagChanged(value) {
      let group1 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter(
        (x) => x.tagheader == value.item.tagheader
      );
      tagFilter[0].group1.forEach((element) => {
        group1.push(element.group1name);
      });
      if (group1.length > 0) {
        if (
          this.tempTreeGroup1Arryay.filter((row) => row.id == value.item.id)
            .length == 0
        ) {
          this.tempTreeGroup1Arryay.push({ id: value.item.id, group1: group1 });
        } else {
          this.tempTreeGroup1Arryay.filter(
            (x) => x.ledgerid == value.item.ledgerid
          )[0].group1 = group1;
          this.taggingTreeData.filter((x) => x.id == value.item.id)[0].group1 =
            null;
          this.taggingTreeData.filter((x) => x.id == value.item.id)[0].group2 =
            null;
          this.taggingTreeData.filter((x) => x.id == value.item.id)[0].group3 =
            null;
          //console.log(this.taggedLedgerData.filter(x=>x.ledgerid==value.item.ledgerid)[0],"shum")
        }

        this.$refs.table.refresh();
      }
      console.log(
        this.tempGroup1Arryay.filter(
          (x) => x.ledgerid == value.item.ledgerid
        )[0].group1,
        "s"
      );
    },
    async sendValue(value) {
      if (value === "all") {
        this.tagSelected = false;
        this.selectedTag = "";
      } else {
        this.tagSelected = true;
        if (this.taggingTreeData.length == 0) {
          await this.getTaggingTreeData();
          this.filterTaggingTree(value);
          this.selectedTag = value;
        } else {
          this.filterTaggingTree(value);
          this.selectedTag = value;
        }
      }
    },
    checkip(ip) {
      console.log(ip, "checkip");
    },
    getGroup2Items(item) {
      this.tempSelect = []; // eslint-disable-line no-debugger
      let group1 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter(
        (x) => x.tagheader == item.tagheader
      );
      if (tagFilter.length == 0) return;
      var tag2Filter = tagFilter[0].group1.filter(
        (x) => x.group1name == item.group1
      );
      if (tag2Filter.length != 0) {
        tag2Filter[0].group2.forEach((element) => {
          group1.push(element.group2name);
        });
      }

      this.tempSelect = group1;
    },
    getGroup3Items(item) {
      this.tempSelect = []; // eslint-disable-line no-debugger
      let group1 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter(
        (x) => x.tagheader == item.tagheader
      );
      if (tagFilter.length == 0) return;
      var tag2Filter = tagFilter[0].group1.filter(
        (x) => x.group1name == item.group1
      );
      if (tag2Filter.length == 0) return;
      var tag3Filter = tag2Filter[0].group2.filter(
        (x) => x.group2name == item.group2
      );
      if (tag3Filter.length != 0) {
        tag3Filter[0].group3.forEach((element) => {
          group1.push(element);
        });
      }
      this.tempSelect = group1;
    },
    getGroup1Items(item) {
      let group1 = [];
      this.allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      var tagFilter = this.allTagHeaders.filter((x) => x.tagheader == item);
      tagFilter[0].group1.forEach((element) => {
        group1.push(element.group1name);
      });

      this.tempSelect = group1;
    },
    // eslint-disable-next-line no-unused-vars
    async getTaggingTreeData(id) {
      try {
        var res = await this.$apiService.get(`/taggingtree/bycompany/1`);
        if (res && res.status === 200) {
          this.taggingTreeData = res.data;
          this.dataImported = true;
          await this.fillTaggingTreeData(res.data);

          if (res.data.status === "error") {
            console.log("error");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    xmlFileChanged(file) {
      this.xmlFile = file;
    },
    async fillTaggingTreeData(data) {
      const allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      data.forEach((x) => {
        let group1 = [];

        var tagFilter = allTagHeaders.filter((row) => row.group1 == x.group1);
        if (tagFilter.length === 0) {
          return;
        }
        group1.push(tagFilter[0].group1);
        if (group1.length > 0) {
          let group2 = [];

          if (tagFilter.length != 0) {
            tagFilter[0].group2.forEach((element) => {
              group2.push(element.group2name);
            });
            if (group2.length > 0) {
              let group3 = [];
              this.tempTreeGroup2Arryay.push({ id: x.id, group2: group2 });
              var tag3Filter = tagFilter[0].group2.filter(
                (row) => row.group2name == x.group2
              );
              if (tag3Filter.length != 0) {
                tag3Filter[0].group3.forEach((element) => {
                  group3.push(element);
                });
              }
              if (group3.length > 0) {
                this.tempTreeGroup3Arryay.push({ id: x.id, group3: group3 });
              }
            }
          }
        }
      });
    },
    async fillLedgerData(data) {
      const allTagHeaders = JSON.parse(
        JSON.stringify(this.$store.getters.tagHeaders)
      );
      data.forEach((x) => {
        if (parseInt(x["closingbal"]) < 0) {
          x["drcr"] = "Cr";
        } else {
          x["drcr"] = "Dr";
        }
        //debugger // eslint-disable-line no-debugger
        let group1 = [];

        var tagFilter = allTagHeaders.filter((row) => row.group1 == x.group1);
        if (tagFilter.length == 0) {
          return;
        } else {
          group1.push(tagFilter[0].group1);
        }

        if (group1.length > 0) {
          let group2 = [];
          this.tempGroup1Arryay.push({ ledgerid: x.ledgerid, group1: group1 });
          var tag2Filter = tagFilter.filter((row) => row.group1 == x.group1);
          if (tag2Filter.length != 0) {
            tag2Filter[0].group2.forEach((element) => {
              group2.push(element.group2name);
            });
            if (group2.length > 0) {
              let group3 = [];
              this.tempGroup2Arryay.push({
                ledgerid: x.ledgerid,
                group2: group2,
              });
              var tag3Filter = tag2Filter[0].group2.filter(
                (row) => row.group2name == x.group2
              );
              if (tag3Filter.length != 0) {
                tag3Filter[0].group3.forEach((element) => {
                  group3.push(element);
                });
              }
              if (group3.length > 0) {
                this.tempGroup3Arryay.push({
                  ledgerid: x.ledgerid,
                  group3: group3,
                });
              }
            }
          }
        }
      });
    },
    async checkStatus(id){
      var res = await this.$apiService.post("/taggingUplStatus/get", {"taggingUplStatusId": id,"companyId":21});
        if (res && res.status === 200) {
          clearInterval(this.myVar);
          store.commit('SET_IS_LOADING', false); 
        }
    },
    async submitXml() {

      // await this.getAllLedgerData(this.selectedCompany);
      // this.showXMLDialogue = false;
      // let formData = new FormData();

      // formData.append("companyid", this.selectedCompany);
      // formData.append("tallyxml", this.xmlFile);
      // try {
      //   var res = await this.$apiService.post(
      //     "/ledger/upload/uploadtallyxml",
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );

      //   if (res && res.status === 200) {
      //     this.showXMLDialogue = false;
      //     // await  this.getAllLedgerData(this.selectedCompany);

      //     if (res.data.status === "error") {
      //       console.log("error");
      //       this.showXMLDialogue = false;
      //     }
      //   }
      // } catch (error) {
      //   //this.showError("Unable to Get Company Details");
      // }
    },
    changeLedgerGroup(id, field, value) {
      for (var i in this.taggedLedgerData) {
        if (this.taggedLedgerData[i].ledgerid == id) {
          this.taggedLedgerData[i][field] = value;
          break; //Stop this loop, we found it!
        }
      }
    },
    changeTaggingTreeGroup(id, field, value) {
      for (var i in this.taggingTreeData) {
        if (this.taggingTreeData[i].id == id) {
          this.taggingTreeData[i][field] = value;
          break; //Stop this loop, we found it!
        }
      }
    },
    filterTaggingTree(value) {
      this.filteredTaggingTreeData = this.taggingTreeData.filter(
        (x) => x.group1 == value
      );
    },
    groupChanged(value, row, group) {
      this.changeLedgerGroup(row.ledgerid, group, value);
      console.log(this.taggedLedgerData);
    },
    // eslint-disable-next-line no-unused-vars
    async getAllLedgerData(companyID) {
      try {
        var res = await this.$apiService.get(`/processing/taggedledger/${"1"}`);
        if (res && res.status === 200) {
          this.dataImported = true;
          this.taggedLedgerData = res.data;
          this.taggedLedgerData = this.taggedLedgerData.filter(
            (x) => x.group1 == null
          );
          await this.fillLedgerData(res.data);

          if (res.data.status === "error") {
            console.log("error");
          }
        }
      } catch (error) {
        // this.showError("Unable to Get Company Details");
      }
    },
    addDocument(val) {
      if (val == "xml") {
        this.$refs.tallyUploader.$refs.input.click();
      } else {
        this.$refs.uploader.$refs.input.click();
      }
    },
  },
};
</script>

<style  scoped>
.vertical-center {
  align-items: center;

  margin-right: 20vh;
}
.formRow {
  padding: 5px;
  margin: 2px;
}
.btnRow {
  display: flex;
  width: 100px;
}
.upTab {
  margin: 5px;
  border: 1px solid black;
}
.uploadBtn {
  margin: 0px;
  padding: 0px;
}
.blueUline {
  text-align: left;
  width: 100%;
  padding: 0px;
  margin: 0px;
  border-top: 5px solid #03a9f4;
}
.LabelText {
  text-decoration: bold;
  font-size: 18px;
  margin-top: 10px;
}
.buttonDiv {
  align-items: flex-end;
}
.maxCol {
  max-width: 250px;
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
</style>

