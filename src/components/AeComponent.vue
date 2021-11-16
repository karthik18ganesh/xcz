<template>
<div>
<v-btn
            class="ma-2"
            color="#03a9f4"
            style="
              background-color: #03a9f4 !important;
            border-color: #03a9f4;
            padding-top: 2px;
            padding-bottom: 3px;
            color: #fff;
            height: 28px !important;
            max-width: 53px !important;
            min-width: 53px;
            margin-top: 10.5px !important;
            "
            @click="openAeDialog"
          >
           <v-icon color="white" style="padding-top: 3px;padding-right: 3px;" dark>mdi-plus</v-icon> AE
          </v-btn>
<v-dialog v-model="aeEnabled" content-class="aeDialogStyle" width="75vw" >
  <v-dialog v-model="addNewEntryDialog" content-class="aeAddDialogStyle" width="40vw" >
    <v-card style="width:100%;height:100%">
    <v-card-title class="text-h5 white darken-2">
          <div>
            <v-row>
              <v-col cols="12">
                <h5
                  class="headingPopup header"
                  style="color: #03a9f4; font-size: 20px"
                >
                  Add New Ledgers
                </h5>
              </v-col>
            </v-row>
          </div>
        </v-card-title>
        <hr class="alertDivider" />
        <v-card-text style="height:66%;display: flex;flex-direction: column;padding: 0px 35px;">
          <v-row>
                <v-text-field autocomplete="off" 
                v-model="aeNew.name"
                class="searchStyle"
                :hide-details="aeNewNameError?false:true"      
                id="filter-input"
                placeholder="Ledger Name"
                @keydown="removeAeNameError"
                outlined
                dense
                :error-messages="aeNewNameError?'Ledger Name is already Exist':null"
                persistent-hint
                :error="aeNewNameError"
                  ></v-text-field>
          </v-row>
          <v-row>
            <v-autocomplete
                  hide-details
                  single-line
                  v-model="aeNew.l1"
                  :items="l1Options"
                  outlined
                  dense
                  item-text="name"
                  item-value="name"
                  placeholder="Level One- Tagging List"
                >
                </v-autocomplete>
          </v-row>
          <v-row>
            <v-autocomplete
                  hide-details
                  single-line
                  v-model="aeNew.l2"
                  :items="l2Options?l2Options[aeNew.l1]:[]"
                  outlined
                  dense
                  item-text="name"
                  item-value="name"
                  placeholder="Level Two- Tagging List"
                >
                </v-autocomplete>
          </v-row>
          <v-row>
            <v-autocomplete
                  hide-details
                  single-line
                  v-model="aeNew.l3"
                  :items="l3Options?l3Options[aeNew.l1][aeNew.l2]:[]"
                  outlined
                  dense
                  item-text="name"
                  item-value="name"
                  placeholder="Level Three- Tagging List"
                >
                </v-autocomplete>
          </v-row>
          <v-row>
            <v-select
            hide-details
            v-model="aeNew.category"
            :items='["Secure","Non Secure"]'
            label="Category"
            solo
            style="border: 1px solid #9e9e9e;box-shadow: none;height:40px"
        ></v-select>
          </v-row>
        </v-card-text>
        <v-card-actions class="actionStyle">
          <v-btn
            class="ma-2"
            style="
              padding-top: 2px;
              background-color: #03a9f4 !important;
              color: white;
              width: 25%;
              padding-bottom: 2px;
            "
            color="#03a9f4"
            @click="createNewLedger"
          >
            Create
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
       <v-card style="width:100%;height:100%">
        <v-card-title class="text-h5 white darken-2">
          <div>
            <v-row>
              <v-col cols="12">
                <h5
                  class="headingPopup header"
                  style="color: #03a9f4;margin-bottom: 4px;margin-left: 15px;"
                >
                  Add Entry
                </h5>
              </v-col>
            </v-row>
          </div>
        </v-card-title>
        <hr class="alertDivider" />

        <v-card-text style="height:67%;overflow-y: auto;padding-left: 40px;">
          <v-row v-for="(item, index) in addEntryData" v-bind:key="index">
            <v-col cols="4">
            <v-autocomplete 
              hide-details
              v-model="item.ledger"
              single-line
              outlined
              dense
              @change="(e)=>aeAddNewDialogHandle(e,index)"
              :items="aeLedgresname"
              label="Select Ledgers"
              item-text="name"
              item-value="ledgerid"
            >
            <template v-slot:selection="data">
                    {{ data.item.name }}
                  </template>
                  <template v-slot:item="data">
                    <p :key="data.item.name" v-if="data.item.ledgerid!=0" style="margin:0px">{{ data.item.name }}</p>
                    <p :key="data.item.name" v-if="data.item.ledgerid==0" style="border-bottom:1px solid #03a9f4;width: 100%;display: flex;justify-content: center;margin: 0px;
    height: 40px;
    align-items: center;
    font-size: 17px !important;"><v-icon color="#03a9f4" style="font-size: 18px !important" dark>mdi-plus</v-icon> &nbsp;Add New</p>
                  </template>
            </v-autocomplete>
            </v-col>
            <div style="width: 8%;margin: 0px 12px;">
            <v-select
            v-model="item.type"
          :items="['Dr','Cr']"
          solo
          style="border: 1px solid #9e9e9e;box-shadow: none;margin-top: 12px;"
          hide-details
        ></v-select>
            </div>
            <v-col cols="3">
                <v-text-field autocomplete="off" 
                v-model="item.amount"
                class="searchStyle"
                hide-details       
                id="filter-input"
                placeholder="Amount"
                outlined
                @input="handleAeAmount"
                dense
                  ></v-text-field>
            </v-col>
            <v-col cols="2" style="display: flex;align-items: center;">
              <div style="display:flex;justify-content: space-between;width: 50%;"> 
                <v-icon color="#03a9f4" style="font-size: 22px !important;cursor:pointer;margin-left:5px" @click="addAe" dark>mdi-plus-circle-outline</v-icon> 
                <v-icon color="#03a9f4" style="font-size: 22px !important;cursor:pointer;" @click="()=>minusAe(index)"  dark>mdi-minus-circle-outline</v-icon> 
                </div>
            </v-col>
            <!-- <v-col cols="3" v-if="aeError&&index==0">
              <p style="color:red">AE requies atleast 1 Dr and 1 Cr</p>
            </v-col> -->
          </v-row>
          <v-row style="height:100px">
            <v-col cols="6">
              <v-text-field autocomplete="off" 
                class="commentStyle"
                height="100px"
                hide-details
                placeholder="Naration"
                  outlined
                  dense
                  ></v-text-field>
            </v-col>
            <v-col cols="1" style="display: flex;align-items: flex-end;padding: 15px;"><v-icon color="#676767" style="font-size: 19px !important;
    border: 1px solid #9e9e9e;
    padding: 8px;
    border-radius: 5px;
    color: #9e9e9e;" dark>mdi-paperclip</v-icon></v-col>
          </v-row>  
        </v-card-text>
        <v-card-actions class="actionStyle" style="border-top: 2px solid #03a9f4;padding-left: 35px;">
          <div style="display:flex;width:15vw">Total</div>
          <div style="display:flex;align-items:center;width:90vw;margin:0px 10px">Debits = &nbsp; <v-text-field autocomplete="off"   hide-details  outlined  dense width="20px" :value="aeTotalDebit" ></v-text-field></div>
          <div style="display:flex;align-items:center;width:90vw;margin:0px 10px">Credits = &nbsp; <v-text-field autocomplete="off"   hide-details  outlined  dense :value="aeTotalCredit"></v-text-field></div>
          <div style="display:flex;align-items:center;width:5%"><v-icon color="#0CE208" style="font-size: 22px !important" v-if="aeTotalDebit==aeTotalCredit" dark>mdi-check-circle-outline</v-icon>
          <v-icon color="#FF725E" style="font-size: 22px !important" dark v-if="aeTotalDebit!=aeTotalCredit">mdi-close-circle-outline </v-icon></div>
          <div style="width:40%"></div>
          <v-btn
            class="ma-2"
            style="padding-top: 2px;padding-bottom:2px;background-color: #03a9f4 !important;color: white;"
            color="#03a9f4"
            @click="updateLedgerFromAe"
            :disabled="aeTotalDebit!=aeTotalCredit"
          >
            {{saveOption}}
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  style="background-color: #0000 !important;box-shadow: none;"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon  style="font-size: 14px;color:white" dark>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item                  
                  v-for="(item, index) in [{title:'Save and Add new'},{title:'Save and Close'}]"
                  @click="saveOption = item.title"
                  :key="index"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
          
          <v-btn
            class="ma-2"
            style="padding-top: 2px;padding-bottom:2px;background-color: #03a9f4 !important;color: white;"
            color="#03a9f4"
            @click="closeAeDialog"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card> 
</v-dialog>
</div>
</template>

<script>
export default {
  name: "AeComponent",
  data() {
        return {
            aeEnabled:false,  
            saveOption:'Save and Add new',          
            addEntryData:[
                {ledger:"",type:"Dr",amount:""},
                {ledger:"",type:"Cr",amount:""}
            ],
            reportingPeriodId:null,            
            aeTotalDebit:0,aeTotalCredit:0,
            aeNew:{"name":"","l1":"","l2":"","l3":"","category":""},
            aeError:false,
            addNewEntryDialog:false,            
            aeLedgresname:[],            
            aeNewNameError:false,
            l1Options: [],
            l2Options: {}, 
            l3Options: {},            
            aeEditIndex:null,
            dummyNewLedgerId:1
        }
    },
    async mounted(){
        this.reportingPeriodId = sessionStorage.getItem("reportId");
        var companyId = JSON.parse(sessionStorage.getItem("fina")).company_id;      
      // get l1 l2 l3 options by company type
      var levelsOptionsRes = await this.$apiService.post("/taggingtree", {
        companyId: companyId,
      });
      var options = JSON.parse(levelsOptionsRes.data.data);
      this.l1Options = options.l1.data;
      this.l2Options = options.l2;
      this.l3Options = options.l3;
    },
methods:{   
  async updateLedgerFromAe(){
    console.log("hitting....",this.addEntryData);
      var res = await this.$apiService.put(`/ledgerDetails/aeData`,{"data":JSON.stringify(this.addEntryData),"reportId":Number(this.reportingPeriodId),"isbalance":true});
      
      if (res && res.status === 200) {
        if( this.saveOption =='Save and Close')
        this.aeEnabled=false;
        else{
        this.addEntryData=[
                {ledger:"",type:"Dr",amount:""},
                {ledger:"",type:"Cr",amount:""}
            ];
          this.aeNew={"name":"","l1":"","l2":"","l3":"","category":""}
        }
        this.$emit("aeSuccessCallback", this.addEntryData)       
      }
      if (res.data.status === "error") {        
        this.aeEnabled=false;
        this.$emit("aeFailedCallback")      
      }
    }, 
  async createNewLedger(){ 
    // var finaId = JSON.parse(sessionStorage.getItem("fina")).id;
    console.log(this.aeEditIndex,"check")
      if(this.aeLedgresname.map(val=>val.name).indexOf(this.aeNew.name)!=-1){
        this.aeNewNameError =true;
        return false;
      }   
      this.aeNewNameError =false; 
      this.aeNew["reportingperioddataid"]=Number(this.reportingPeriodId);
      // var res = await this.$apiService.post(`/ledgerDetails/create`,this.aeNew);
      // if (res && res.status === 200) {
        // console.log(res.data.data)
        
        console.log(this.aeNew);
        this.aeLedgresname.push({"name":this.aeNew.name,"ledgerid":this.dummyNewLedgerId});
        this.addEntryData[this.aeEditIndex].ledger = this.dummyNewLedgerId;
        this.addEntryData[this.aeEditIndex]["notYetSaved"] = {
          "l1":this.aeNew.l1,
          "l2":this.aeNew.l2,
          "l3":this.aeNew.l3,
          "name":this.aeNew.name,
          "reportId":this.aeNew["reportingperioddataid"]
        };
        this.addNewEntryDialog =false;
        this.dummyNewLedgerId++;
        setTimeout(() => {
          this.aeNew={"name":"","l1":"","l2":"","l3":"","category":""}
        }, 0);
        // this.aeNew = {};
      // }
    },
    minusAe(e){
      var noOfDr=0,noOfCr=0;
      this.addEntryData.forEach(val=>{
        if(val.type == "Cr") noOfCr++;
        if(val.type == "Dr") noOfDr++;
      })
      if(noOfDr<1 || noOfCr<1){
        this.aeError=true;
      }
      else{
        this.aeError=false;
        this.addEntryData = this.addEntryData.filter((val,idx)=>idx!=e);
      }
    },
    addAe(){
      this.aeError=false;
    this.addEntryData.push({ledger:"",type:"Cr",amount:""})
    },
    async openAeDialog(){
      if(!this.aeLedgresname.length){
      //get all legdersname and id
      var ledgerNames = await this.$apiService.post("/ledgerDetails/getLedgersName", { reportingperioddataid: Number(this.reportingPeriodId) });
      if (ledgerNames && ledgerNames.status === 200) {
        this.aeLedgresname = [{"name":"","ledgerid":0}].concat(ledgerNames.data.data);
      }
      }
      this.aeEnabled = true;
    },
    closeAeDialog(){
      this.aeEnabled =false;
    },
    aeAddNewDialogHandle(e,index){ console.log(e,"e1111")
      if(e == 0){
        this.aeEditIndex = index;
        this.addNewEntryDialog =true;
      document.getElementsByClassName("aeAddDialogStyle")[0].styles.zindex = 203;
      }
    },
    handleAeAmount(){
      this.aeTotalDebit=0;
      this.aeTotalCredit=0;
      this.addEntryData.forEach(val=>{
        if(val.type == "Dr"){
            this.aeTotalDebit+=Number(val.amount);
        }
        else{
            this.aeTotalCredit+=Number(val.amount);
        }
      })
      },        
    removeAeNameError(){
      this.aeNewNameError = false;
    },
}
}
</script>

<style scoped>

/deep/ .aeDialogStyle{
  height:75vh !important;
}
/deep/ .aeAddDialogStyle{
  height:70vh !important;
  }
/deep/ .header{
  font-size: 17px !important;
    font-weight: 600 !important;
    letter-spacing: 1px !important;
}
.alertDivider {
  height: 2px;
  background-color: #03a9f4;
  color: #03a9f4;
  border: 1px solid;
  margin-bottom: 24px;
}
/deep/.searchStyleP
  > .v-text-field--outlined.v-input--dense.v-text-field--outlined
  > .v-input__control
  > .v-input__slot {
  min-height: 32px !important;
}

/deep/ .commentStyle{
    height:100px !important;
  }
  
  /deep/.commentStyle>div>div{
    display: block;
  }
  
/deep/ .searchStyle .v-input__append-inner {
  margin-top: 4.5px !important;
}
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
</style>