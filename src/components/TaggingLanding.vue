<template>
  <v-container class="mainDiv" style="margin-top: 50px">
    <v-dialog
      content-class="my-custom-dialog"
      v-model="tallyIntegrationDialog"
      width="75vw"
      transition="dialog-bottom-transition"
    >
    <div style="height:75vh;width:98%">
      <h1
        class="text-h5 lighten-2 popup-allotment-title"
        style="font-size: 20px !important"
      >
      STEPS TO Integrate
      </h1>
      <v-divider class="blueUline2"></v-divider>
      <div style="margin: 15px 0px;">Because of Browser securities Issues ,we cant directly access the local tally system to import Data from it. </div>
    <div style="margin: 15px 0px;">Please follow the below two step to achive the Local tally integration</div>
    <v-row>
      <v-col xs5 style="height: 50vh;margin-left: 20px;margin-top: 10px;">
        <img src="https://www.keycdn.com/img/support/cors.png" width="100%" height="100%" alt="no image found"/>
        </v-col>
    <v-col xs6 style="display: flex;flex-direction: column;justify-content: center;text-align: start;">
      <div style="margin: 10px;margin-left: 50px;">Step 1: Add the below extension in your browser</div>
      <div style="margin: 10px;margin-bottom: 50px;margin-left: 50px;"><a target="_blank" href="https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino">Tally Browser Extension</a></div>
      <div style="margin: 10px;margin-left: 50px;">Step 2: Download and open the file to import from tally </div>
      <div style="margin: 10px;margin-left: 50px;cursor: pointer;" @click="downLoadFile"><p style="text-decoration-line: underline;color: #1976d2;cursor: pointer;" >Download tally integration file</p></div>
      <div style="margin: 10px;margin-left: 50px;cursor: pointer;" @click="useExistingFile"><v-btn
            class="ma-2"
            style="
              background-color: #03a9f4 !important;
    border-color: #03a9f4;
    padding: 2px 0px;
    width: 38%;
    margin: 0px !important;
    margin-top: -9px !important;
    color: #fff;
            "
            color="#03a9f4"
          >
           Or Use Existing file
          </v-btn></div>
    </v-col>        
    </v-row>
    </div>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <v-row
          class="topRow alig"
          v-bind:class="{
            minTop: activeUploadOption == 'tally',
            maxTop: activeUploadOption != 'tally',
          }"
        >
          <v-col cols="5" class="ma-1 marg" align="right">
            <v-btn
              large
              @click="UploadOptionSelected('tally')"
              color="white"
              class="btn1 btn2 pa-6"
              :style="{
                visibility: uploadOptionSelected ? 'hidden' : 'visible',
              }"
              >Import from Tally</v-btn
            >
          </v-col>
          <v-col align="left" cols="5" class="ma-1">
            <v-btn
              large
              @click="UploadOptionSelected('excel')"
              color="white"
              class="btn1 btn2 pa-6"
              :style="{
                visibility: uploadOptionSelected ? 'hidden' : 'visible',
              }"
              >Import from Excel</v-btn
            >
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <img
          src="../assets/sukuman.png"
          alt="sukman"
          height="400"
          width="390"
          class="img-logo"
        />
      </v-col>
      <v-col cols="6">
        <v-row v-if="activeUploadOption == 'tally'">
          <v-col
            align="left"
            style="padding-left: 0px; padding-bottom: 20px"
            cols="12"
          >
            <h4 style="margin-bottom: 10px">
              <u style="text-decoration: none; margin: 3px">
                Import From Tally</u
              >
            </h4>
          </v-col>
          <v-col cols="12" class="pa-1">
            <v-select
              dense
              outlined
              label="Name of the Organization"
              v-model="selectedCompany"
              :items="companies"
              item-text="name"
              item-value="id"
            ></v-select>
          </v-col>
          <v-col cols="6" class="LabelText pa-1">
            <v-menu
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  autocomplete="off"
                  :value="fromPeriod"
                  outlined
                  style="width: 95%"
                  label="Period From"
                  append-icon="mdi-calendar"
                  readonly
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="#006B6A"
                label="From Period"
                v-model="fromPeriod"
                outlined
                dense
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" class="LabelText pa-1">
            <v-menu
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  autocomplete="off"
                  :value="fromPeriod"
                  outlined
                  label="Period To"
                  style="width: 95%; float: right"
                  append-icon="mdi-calendar"
                  readonly
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="#006B6A"
                label="From Period"
                v-model="fromPeriod"
                outlined
                dense
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" class="pa-1">
            <v-select
              style="width: 95%"
              dense
              outlined
              label="Import Level"
              v-model="selectedImportLevel"
              :items="['Closing Balance', 'Opening and Closing Balance']"
            ></v-select>
          </v-col>
          <v-col cols="12" align="right">
            <v-btn class="primary ma-2" color="white" @click="importFromTally">
              Import
            </v-btn>
            <v-btn class="ma-2" outlined color="primary" @click="cancelImport">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "../store";
import moment from "moment";
// var convert = require('xml-js');
export default {
  name: "TaggingHome",
  data() {
    return {
      tallyIntegrationDialog:false,
      activeUploadOption: "",
      uploadOptionSelected: false,
      fromPeriod: "",
      selectedCompany: "",
      taggedLedgerData: [],
      companies: ["BSY Private Limited"],
    };
  },
  async mounted() {
    this.allTagHeaders = this.$store.getters.tagHeaders;
   },

  methods: {
    async checkStatus(id) {
      var res = await this.$apiService.post("/taggingUplStatus/get", {
        taggingUplStatusId: id.data,
        companyId: 21,
      });
      // console.log(res.data.data)
      store.commit("SET_IS_LOADING", true);
      if (res && res.data.data) {
        clearInterval(this.myVar);
        store.commit("SET_IS_LOADING", false);
        this.$router.push({ path: "/taggingdisplay" });
      }
    },
    async importFromTally() {
      this.$router.push({ path: "/taggingdisplay" });
      //--
      //  store.commit('SET_IS_LOADING', true);
      //create entry in status table
      // var statusPayload ={"companyId": "21","period_from": "2020-08-07","period_to": "2021-08-07"};
      // var res = await this.$apiService.post("/taggingUplStatus", statusPayload);
      //   if (res && res.status === 200) {
      //     store.commit('SET_IS_LOADING', true);
      //     this.myVar = setInterval(()=>this.checkStatus(res.data), 3000);
      //   }
      // fetch("https://jsonip.com/").then(val=>val.json()).then(async val=>{
      // console.log(val,"suc",{"id":val.ip});
      //    var res = await this.$apiService.post("/tally/getcompany", {"ip":val.ip});
      //   if (res && res.status === 200) {
      //     console.log(res.data.data.elements[0].elements[0].elements[0].elements,"list of comapnies")
      //   }

      // }
      // ).catch(val=>console.log(val,"failed"))
      // var res = await this.$apiService.post("/tally/getcompany", statusPayload);
      // if (res && res.status === 200) {
      //   store.commit('SET_IS_LOADING', true);
      //   this.myVar = setInterval(()=>this.checkStatus(res.data), 3000);
      // }
      //--
      // var parentArray=[];
      //   try{
      //       var res = await this.$apiService.get(`/processing/taggedledger/${'1'}`);
      //       if(res&&res.status === 200) {

      //           this.taggedLedgerData=res.data;
      //           if(res.data.length>0){
      //              let unique = [...new Set(res.data.map(item => item.parent))];
      //              unique.forEach(row=>{
      //                parentArray.push({name:row,validate:false})
      //              })

      //              this.$router.push({name: 'TaggingDsiplay', params : { displayData: res.data,parent:parentArray}});

      //           }

      //         if (res.data.status === "error") {
      //   console.log("error");
      //         }

      //   }

      //   }
      //   catch(error) {
      //    // this.showError("Unable to Get Company Details");
      //      }
    },
    cancelImport() {
      this.uploadOptionSelected = false;
      this.activeUploadOption = "";
    },
    async startListerning(value){
      store.commit('SET_IS_LOADING', true); 
      console.log(value,"val1")
      var watch = setInterval(async () => {
        fetch(`http://localhost:8080/tallyintegration/register/get?registerId=${value.data.registerId}`).then(res=>res.json()).then(async res=>{
      if (res ) {
        console.log(res);
        if(res.data){
          clearInterval(watch);
        store.commit('SET_IS_LOADING', true); 
        var idf = JSON.parse(sessionStorage.getItem("fina")).id;
            //get reporting periodid and company type
        var resRequiredDetails = await this.$apiService.get('ledger/requiredvalues?financialId='+idf);
        if(resRequiredDetails&&resRequiredDetails.status === 200) {  
          sessionStorage.setItem("reportId",resRequiredDetails.data.data.reportingPeriodData);
          sessionStorage.setItem("companyType",resRequiredDetails.data.data.companyType);
          sessionStorage.setItem("taggingLevel",resRequiredDetails.data.data.taggingLevel);
          setTimeout(() => {
            this.$router.push({ path: "/taggingdisplay" });
          }, 100);  
        }
        }
      }    
      else{
        clearInterval(watch);
      }
        })

      }, 10000);
    },
    async downLoadFile(){
    var time = moment().valueOf();
      // fetch('http://13.234.27.65:8080/index?time='+time)
      fetch('http://localhost:8080/tallyintegration?time='+time)
  .then(resp => resp.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = 'tallyIntegration.html';
    // a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('try again..'));
  this.tallyIntegrationDialog = false;
  store.commit('SET_IS_LOADING', true); 
  var res = await this.$apiService.post(`/tallyintegration/register`,{userId:JSON.parse(sessionStorage.userDetails).data.id,companyId:JSON.parse(sessionStorage.fina).company_id,financialId:JSON.parse(sessionStorage.fina).id,otherDetails:JSON.parse(sessionStorage.fina)});
      if (res && res.status === 200) {
        this.startListerning(res);
      }
    },
   async useExistingFile(){
     this.tallyIntegrationDialog = false;
        store.commit('SET_IS_LOADING', true); 
  var res = await this.$apiService.post(`/tallyintegration/register`,{userId:JSON.parse(sessionStorage.userDetails).data.id,companyId:JSON.parse(sessionStorage.fina).company_id,financialId:JSON.parse(sessionStorage.fina).id,otherDetails:JSON.parse(sessionStorage.fina)});
      if (res && res.status === 200) {
        this.startListerning(res);
      }
    },
    UploadOptionSelected(val) {
      console.log(val,"val")
      // this.uploadOptionSelected = true;
      // this.activeUploadOption = val;
      this.tallyIntegrationDialog = true;
  //     if(val == "tally"){
  //             var time = moment().valueOf();
  //     // fetch('http://13.234.27.65:8080/index?time='+time)
  //     fetch('http://localhost:8080/index?time='+time)
  // .then(resp => resp.blob())
  // .then(blob => {
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.style.display = 'none';
  //   a.href = url;
  //   // the filename you want
  //   a.download = 'tallyIntegration.html';
  //   // a.target = "_blank";
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // })
  // .catch(() => alert('oh no!'));
  //     }
    },
    async saveAllLedgers() {
      var res = await this.$apiService.put(
        `processing/tagging/update`,
        this.taggedLedgerData
      );
      if (res && res.status === 200) {
        this.showSuccess(res.data.message);
        this.$refs.table.refresh();
        await this.getAllLedgerData(this.selectedCompany);
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
        await this.getAllLedgerData(this.selectedCompany);
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
    async submitXml() {
      await this.getAllLedgerData(this.selectedCompany);
      this.showXMLDialogue = false;
      let formData = new FormData();

      formData.append("companyid", this.selectedCompany);
      formData.append("tallyxml", this.xmlFile);
      try {
        var res = await this.$apiService.post(
          "/ledger/upload/uploadtallyxml",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res && res.status === 200) {
          this.showXMLDialogue = false;
          // await  this.getAllLedgerData(this.selectedCompany);

          if (res.data.status === "error") {
            console.log("error");
            this.showXMLDialogue = false;
          }
        }
      } catch (error) {
        //this.showError("Unable to Get Company Details");
      }
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
>>> .my-custom-dialog {
  background: white !important;
}

.blueUline2 {
  min-width: 102%;
  border-top: 3px solid #03a9f4;
  border-color: #0398dc !important;
}
.popup-allotment-title {
  font-style: normal;
  font-weight: 700 !important;
  color: #0398dc;
  margin: 20px;
  text-align: initial;
}
.v-dialog {
  background: white !important;
}
.topRow {
  /* margin-top:40px; */
}
.minTop {
  margin-top: 10px;
}
.maxTop {
  margin-top: 40px;
}
.maxCol {
  max-width: 250px;
}
.btn2 {
  text-transform: unset !important;
  height: 65px !important;
  width: 250px !important;
  font-weight: 500 !important;
  font-size: 18px;
}
.marg {
  margin-right: 5% !important;
}
.alig {
  justify-content: center !important;
}
.btn1 {
  text-transform: unset !important;
  font-weight: 600;
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

