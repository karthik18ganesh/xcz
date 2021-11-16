<template>
  <div style="background:white; height: 100%">
    <v-container style="display: block;max-width:97%">
      <v-row style="justify-content:space-evenly">
        <v-col md="2">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card class="data-card" outlined tile :elevation="hover ? 10 : 2" @click="handleCard('master')">
                <v-row>
                  <v-col md="12" class="icon-col">
                    <img src="../assets/check.png" class="img-icon" />
                  </v-col>
                  <v-col md="12" class="col-data">
                    <img src="../assets/master.png" height="90" width="90" class="img-logo" />
                  </v-col>
                  <v-col md="12" class="col-data">
                    <p class="major-card">Master Info</p>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <v-col md="2">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card class="data-card" outlined tile :elevation="hover ? 10 : 2" @click="handleCard('tagging')">
                <v-row>
                  <v-col md="12" class="icon-col">
                    <img src="../assets/add.png" class="img-icon" />
                  </v-col>
                  <v-col md="12" class="col-data">
                    <img src="../assets/tag.png" height="90" width="90" class="img-logo" />
                  </v-col>
                  <v-col md="12" class="col-data">
                    <p class="major-card">Tagging</p>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <v-col md="2">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card class="data-card" outlined tile :elevation="hover ? 2 : 2" @click="handleCard('finance')">
                <v-row>
                  <v-col md="12" class="icon-col">
                    <img src="../assets/add.png" class="img-icon" />
                  </v-col>
                  <v-col md="12" class="col-data">
                    <img src="../assets/finance.png" height="90" width="90" class="img-logo" />
                  </v-col>
                  <v-col md="12" class="col-data">
                    <p class="major-card">Financial statement</p>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <v-col md="2">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card class="data-card" outlined tile :elevation="hover ? 2 : 2" @click="handleCard('publish')">
                <v-row>
                  <v-col md="12" class="icon-col">
                    <img src="../assets/lock.png" class="img-icon" />
                  </v-col>
                  <v-col md="12" class="col-data">
                    <img src="../assets/publish.png" height="90" width="90" class="img-logo" />
                  </v-col>
                  <v-col md="12" class="col-data col-text">
                    <p class="major-card" style="color: #ccc8c8 !important;">Publish</p>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <v-divider :key="index" style="margin-top: 25px;margin-bottom: 25px;"></v-divider>

      <div class="optiondiv" v-if="dataChoice == 'master'">
        <v-layout class="v-layout-align">
          <v-flex xs3>
            <button class="button-font" style="margin-bottom: 6%">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <v-icon style="position: absolute;right: 2px; top: 0px;" justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                <img src="../assets/master/rafiki.png" style="height: 110px;padding: 5px;" width="100%" />
              </v-card>
              Entity Profile
            </button>
          </v-flex>

          <v-flex xs3>
            <button class="button-font" style="margin-bottom: 6%;">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <v-icon style="position: absolute;right: 2px; top: 0px;" justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                <img src="../assets/master/financial.png" style="height: 110px;padding: 5px;" width="100%" />
              </v-card>
              Financial Details
            </button>
          </v-flex>

          <v-flex xs3>
            <button class="button-font" style="margin-bottom: 6%">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <v-icon style="position: absolute;right: 2px; top: 0px;" justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                <img src="../assets/master/proprietor.png" style="height: 110px;padding: 5px;" width="100%" />
              </v-card>
              Proprietor
            </button>
          </v-flex>

          <v-flex xs3>
            <button class="button-font" style="margin-bottom: 6%">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <v-icon v-if="selectionOptions.includes('securities')" style="position: absolute;right: 2px; top: 0px;" justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                <img src="../assets/master/securites.png" style="height: 110px;padding: 5px;" width="100%" />
              </v-card>
              Securities
            </button>
          </v-flex>
          <v-flex xs3>
            <button class="button-font" style="margin-bottom: 6%">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <v-icon v-if="selectionOptions.includes('stakeholder')" style="position: absolute;right: 2px; top: 0px;" justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                <img src="../assets/master/stakeholder.png" style="height: 110px;padding: 5px;" width="100%" />
              </v-card>
              Stakeholder
            </button>
          </v-flex>
        </v-layout>

        <v-layout class="v-layout-align" style="margin: 0% 10% 0% 10%">
          <v-flex xs3>
            <button class="button-font" style="margin-bottom: 6%">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <v-icon v-if="selectionOptions.includes('auditordetails')" style="position: absolute;right: 2px; top: 0px;" justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                <img src="../assets/master/auditor.png" style="height: 110px;padding: 5px;" width="100%" />
              </v-card>
              Auditor Details
            </button>
          </v-flex>

          <v-flex xs3>
            <button class="button-font" style="margin-bottom: 6%">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <v-icon v-if="selectionOptions.includes('investmentdetails')" style="position: absolute;right: 2px; top: 0px;" justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                <img src="../assets/master/investment.png" style="height: 110px;padding: 5px;" width="100%" />
              </v-card>
              Investment Details
            </button>
          </v-flex>

          <v-flex xs3 style="margin-bottom: 2%">
            <button class="button-font">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <v-icon v-if="selectionOptions.includes('fixedassetsregister')" style="position: absolute;right: 2px; top: 0px;" justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                <img src="../assets/master/fixedasset.png" style="height: 110px;padding: 5px;" width="100%" />
              </v-card>
              Fixed assets register
            </button>
          </v-flex>

          <v-flex xs3 style="margin-bottom: 2%">
            <button class="button-font">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <v-icon v-if="selectionOptions.includes('inventory')" style="position: absolute;right: 2px; top: 0px;" justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                <v-card-text>
                  <img src="../assets/master/inventory.png" style="height: 88px;padding: 5px;" width="100%" />
                </v-card-text>
              </v-card>
              Inventory
            </button>
          </v-flex>
        </v-layout>
      </div>
      <div class="optiondiv" v-if="dataChoice == 'tagging'">
        <div class="tableSectionOptions">
          <v-row style="justify-content: space-between;">
            <v-col md="6">
              <v-card class="mx-auto" style="width: 95%; height: 47vh">
                <v-card-text style="height: 43vh">
                  <v-row class="find" style="height: 22%; padding: 10px 20px; margin-top: 5px">
                    <v-col md="8" style="display:flex;">
                      <v-row class="blueHead" @click="naviagateToTaggingDisplay" style="letter-spacing: 1px;width: 35%;">Opening Balance</v-row>
                      <v-row class="date-head" style="font-size: 12px !important;padding-top: 2px;">{{ this.finData.period_from.split('T')[0] }}</v-row>
                    </v-col>
                    <v-col md="4" style="display: flex; justify-content: flex-end">
                      <v-col md="2">
                        <img src="../assets/rightCopyArrow.png" class="ma-0 pa-0" style="height:20px;width:20px;margin-top:-32px;padding-top:0px" />
                      </v-col>
                      <v-col md="2" style="margin-left: 15px;"
                        ><v-menu bottom left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon color="grey" v-bind="attrs" v-on="on" dark>mdi-dots-horizontal</v-icon>
                          </template>
                          <v-list>
                            <v-list-item>
                              <v-list-item-title>Erase Tagging Data</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title @click="navigateToImportTally()">Re Import</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu></v-col
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-divider style="width:100%;border: 1px solid #03a9f4!important;min-width: 106%;margin-left: -16px;"></v-divider>
                  </v-row>
                  <v-row style="margin:13px 0px !important;">
                    <v-col>Trial Balance Match &nbsp;<v-icon color="#0CE208" style="font-size: 14px" dark>mdi-checkbox-marked-circle</v-icon> </v-col>
                    <v-col>Tagging &nbsp;<v-icon color="#FF725E" style="font-size: 14px" dark>mdi-checkbox-blank-circle</v-icon>&nbsp; Yet To Start</v-col>
                  </v-row>
                  <v-row style="justify-content: space-evenly">
                    <v-col md="5" style="border: 1px solid #ccc8c8;border-radius: 6px;padding: 10px !important;">
                      <v-row style="margin-bottom">GROUPS</v-row>
                      <v-row><v-divider style="width=90%;border: 1px solid #03a9f4!important;margin: 3px 0px;min-width: 111%;margin-left: -10px;"></v-divider></v-row>
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Total</v-col><v-col md="6">{{ ledgerDashDetails.openingBalance.group.total }}</v-col></v-row
                      >
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Tagged</v-col><v-col md="6">{{ ledgerDashDetails.openingBalance.group.tagged }}</v-col></v-row
                      >
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Completed</v-col><v-col md="6">{{ ledgerDashDetails.openingBalance.group.total ? Math.round((ledgerDashDetails.openingBalance.group.tagged / ledgerDashDetails.openingBalance.group.total) * 100) : 0 }}%</v-col></v-row
                      >
                    </v-col>
                    <v-col md="5" style="border: 1px solid #ccc8c8;border-radius: 6px;padding: 10px !important;">
                      <v-row style="margin-bottom">Ledgers</v-row>
                      <v-row><v-divider style="width=90%;border: 1px solid #03a9f4!important;margin: 3px 0px;min-width: 111%;margin-left: -10px;"></v-divider></v-row>
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Total</v-col><v-col md="6">{{ ledgerDashDetails.openingBalance.ledger.total }}</v-col></v-row
                      >
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Tagged</v-col><v-col md="6">{{ ledgerDashDetails.openingBalance.ledger.tagged }}</v-col></v-row
                      >
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Completed</v-col><v-col md="6">{{ ledgerDashDetails.openingBalance.ledger.total ? Math.round((ledgerDashDetails.openingBalance.ledger.tagged / ledgerDashDetails.openingBalance.ledger.total) * 100) : 0 }}%</v-col></v-row
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions> </v-card-actions>
              </v-card>
            </v-col>
            <v-col md="6">
              <v-card class="mx-auto" style="width: 95%; height: 47vh">
                <v-card-text style="height: 43vh">
                  <v-row class="find" style="height: 22%; padding: 10px 20px; margin-top: 5px">
                    <v-col md="8" style="display:flex;">
                      <v-row class="blueHead" @click="naviagateToTaggingDisplay" style="letter-spacing: 1px;width: 35%;">Closing Balance</v-row>
                      <v-row class="date-head" style="font-size: 12px !important;padding-top: 2px;">{{ this.finData.period_to.split('T')[0] }}</v-row>
                    </v-col>
                    <v-col md="4" style="display: flex; justify-content: flex-end">
                      <v-col md="2">
                        <img src="../assets/leftCopyArrow.png" class="ma-0 pa-0" style="height:20px;width:20px;margin-top:-32px;padding-top:0px" />
                      </v-col>
                      <v-col md="2" style="margin-left: 15px;"
                        ><v-menu bottom left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon color="grey" v-bind="attrs" v-on="on" dark>mdi-dots-horizontal</v-icon>
                          </template>
                          <v-list>
                            <v-list-item>
                              <v-list-item-title>Erase Tagging Data</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title @click="navigateToImportTally()">Re Import</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu></v-col
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-divider style="width=100%;border: 1px solid #03a9f4!important;min-width: 106%;margin-left: -16px;"></v-divider>
                  </v-row>
                  <v-row style="margin:13px 0px !important;">
                    <v-col>Trial Balance Match &nbsp;<v-icon color="#0CE208" style="font-size: 14px" dark>mdi-checkbox-marked-circle</v-icon> </v-col>
                    <v-col>Tagging &nbsp;<v-icon color="#FF725E" style="font-size: 14px" dark>mdi-checkbox-blank-circle</v-icon>&nbsp; Yet To Start</v-col>
                  </v-row>
                  <v-row style="justify-content: space-evenly">
                    <v-col md="5" style="border: 1px solid #ccc8c8;border-radius: 6px;padding: 10px !important;">
                      <v-row style="margin-bottom">GROUPS</v-row>
                      <v-row><v-divider style="width=90%;border: 1px solid #03a9f4!important;margin: 3px 0px;min-width: 111%;margin-left: -10px;"></v-divider></v-row>
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Total</v-col><v-col md="6">{{ ledgerDashDetails.closingBalance.group.total }}</v-col></v-row
                      >
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Tagged</v-col><v-col md="6">{{ ledgerDashDetails.closingBalance.group.tagged }}</v-col></v-row
                      >
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Completed</v-col><v-col md="6">{{ ledgerDashDetails.closingBalance.group.total ? Math.round((ledgerDashDetails.closingBalance.group.tagged / ledgerDashDetails.closingBalance.group.total) * 100) : 0 }}%</v-col></v-row
                      >
                    </v-col>
                    <v-col md="5" style="border: 1px solid #ccc8c8;border-radius: 6px;padding: 10px !important;">
                      <v-row style="margin-bottom">Ledgers</v-row>
                      <v-row><v-divider style="width=90%;border: 1px solid #03a9f4!important;margin: 3px 0px;min-width: 111%;margin-left: -10px;"></v-divider></v-row>
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Total</v-col><v-col md="6">{{ ledgerDashDetails.closingBalance.ledger.total }}</v-col></v-row
                      >
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Tagged</v-col><v-col md="6">{{ ledgerDashDetails.closingBalance.ledger.tagged }}</v-col></v-row
                      >
                      <v-row style="height: 40px;display: flex;align-items: center;"
                        ><v-col md="6">Completed</v-col><v-col md="6">{{ ledgerDashDetails.closingBalance.ledger.total ? Math.round((ledgerDashDetails.closingBalance.ledger.tagged / ledgerDashDetails.closingBalance.ledger.total) * 100) : 0 }}%</v-col></v-row
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions> </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="optiondiv" v-if="dataChoice == 'finance'">
        <v-row>
          <v-col md="4">
            <v-card class="optioncard">
              <p class="card-text">Balance sheet</p>
            </v-card>
          </v-col>
          <v-col md="4">
            <v-card class="optioncard">
              <p class="card-text">Profit and Loss account</p>
            </v-card>
          </v-col>
          <v-col md="4">
            <v-card class="optioncard">
              <p class="card-text">Cash flow statements</p>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12" style="display: flex; justify-content: center">
            <v-card class="optioncard" style="width: 24%; margin-top: 3em !important">
              <p class="card-text" style="text-align: center">
                Accounting standard disclosures
              </p>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="optiondiv" v-if="dataChoice == 'publish'" style="margin-top:8% !important;">
        <v-layout class="v-layout-align">
          <v-flex xs3> </v-flex>

          <v-flex xs3 style="margin-left: 14%;">
            <button class="button-font" style="margin-bottom: 6%;">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <router-link to="/publishsettings"><img src="../assets/master/publish_settings.png" style="height: 110px;padding: 5px;" width="100%"/></router-link>
              </v-card>
              Publish Settings
            </button>
          </v-flex>

          <v-flex xs3>
            <button class="button-font" style="margin-bottom: 6%">
              <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                <router-link to="/finaldocument"><img src="../assets/master/financial_settings.png" style="height: 110px;padding: 5px;" width="100%"/></router-link>
              </v-card>
              Final Documents
            </button>
          </v-flex>

          <v-flex xs3> </v-flex>
          <v-flex xs3> </v-flex>
        </v-layout>
      </div>
      <SecurityMasterDashboard :is-visible="dataChoice"></SecurityMasterDashboard>
      <Selection :visible="masterChoice" @close="masterDialogClose"></Selection>
    </v-container>
  </div>
</template>

<script>
import SecurityMasterDashboard from '../components/SecurityMasterDashboard';
import Selection from '../components/Selection';
export default {
  components: {
    SecurityMasterDashboard,
    Selection, // eslint-disable-line
  },
  data() {
    return {
      ledgerDashDetails: {},
      idf: 0,
      selectionOptions: [],
      showOptionDiv: false,
      currentTab: 0,
      dataChoice: '',
      masterChoice: false,
      tab: null,
      header: [{ text: '', value: 'actions', sortable: false }],
      items: ['Master Data', 'Security Master', 'Stakeholder Master', 'Auditor Master'],
      details: [
        {
          name: 'a.Class A Share',
        },
        {
          name: 'b.Class B Share',
        },
        {
          name: 'c.Class C Share',
        },
      ],
      headers: [
        { text: 'Sl.no', align: 'start', sortable: false, value: 'title' },
        { text: 'Sharefolio no.', value: 'shareno', sortable: false },
        { text: 'Name of the stakeholder', value: 'name', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      stakeholders: [
        {
          title: '1',
          shareno: 'ITL00368',
          name: 'George',
        },
      ],
    };
  },
  async mounted() {
    this.idf = JSON.parse(sessionStorage.getItem('fina')).id;
    this.finData = JSON.parse(sessionStorage.getItem('fina'));
    //get reporting periodid and company type
    var res = await this.$apiService.get('ledger/requiredvalues?financialId=' + this.idf);
    if (res && res.status === 200) {
      sessionStorage.setItem('reportId', res.data.data.reportingPeriodData);
      sessionStorage.setItem('companyType', res.data.data.companyType);
      sessionStorage.setItem('taggingLevel', res.data.data.taggingLevel);
    }

    // if (
    //   this.$store.getters.getMasterData.configDetails[0].config.selection &&
    //   this.$store.getters.getMasterData.configDetails[0].config.selection
    //     .length > 0
    // ) {
    //   this.selectionOptions =
    //     this.$store.getters.getMasterData.configDetails[0].config.selection;
    // }
    this.selectionOptions = JSON.parse(sessionStorage.getItem('selectedOptions')).data;
    this.dataChoice = 'master';
    this.$store.commit('setSidebarMenu', [
      {
        action: 'mdi-home',
        hasSubmenu: false,
        items: [{ title: 'List Item' }],
        title: 'Home',
      },
      {
        action: 'mdi-view-dashboard',
        hasSubmenu: false,
        items: [{ title: 'List Item' }],
        title: 'Dashboard',
      },
      {
        action: 'mdi-medium',
        hasSubmenu: true,
        active: true,
        items: [
          {
            title: 'Entity Profile',
            active: this.selectionOptions.includes('entity') ? true : false,
          },
          {
            title: 'Financials',
            active: this.selectionOptions.includes('financial') ? true : false,
          },
          {
            title: 'Proprietor',
            active: this.selectionOptions.includes('proprietor') ? true : false,
          },
          {
            title: 'Directors',
            active: this.selectionOptions.includes('directors') ? true : false,
          },
          {
            title: 'Securities',
            active: this.selectionOptions.includes('securities') ? true : false,
          },
          {
            title: 'Stake Holders',
            active: this.selectionOptions.includes('stakeholder') ? true : false,
          },
          {
            title: 'Auditor Details',
            active: this.selectionOptions.includes('auditordetails') ? true : false,
          },
          {
            title: 'Investment Details',
            active: this.selectionOptions.includes('investmentdetails') ? true : false,
          },
          {
            title: 'Fixed Asset Register',
            active: this.selectionOptions.includes('fixedassetsregister') ? true : false,
          },
          {
            title: 'Inventory',
            active: this.selectionOptions.includes('inventory') ? true : false,
          },
        ],
        title: 'Masters',
      },
      {
        action: 'mdi-tag-multiple',
        items: [{ title: 'List Item' }],
        title: 'Tagging',
      },
    ]);
  },
  methods: {
    masterDialogClose() {
      this.masterChoice = false;
      this.selectionOptions = JSON.parse(sessionStorage.getItem('selectedOptions')).data;
      console.log(this.selectionOptions);
    },
    naviagateToTaggingDisplay() {
      if (sessionStorage.getItem('reportId') != 'null')
        this.$router.push({
          name: 'TaggingDsiplay',
          params: {},
        });
      else
        this.$router.push({
          name: 'Tagging',
          params: {},
        });
    },
    navigateToImportTally() {
      this.$router.push({
        name: 'Tagging',
        params: {},
      });
    },
    manageItem(item) {
      if (this.selectionOptions.includes(item)) {
        this.selectionOptions = this.selectionOptions.filter((e) => e !== item);
      } else {
        this.selectionOptions.push(item);
      }
    },

    async handleCard(val) {
      this.dataChoice = val;
      console.log(this.dataChoice, 'dataa getting');
      if (this.dataChoice == 'master') {
        this.masterChoice = true;
      } else if (val == 'finance') {
        this.$router.push({
          name: 'BalanceSheet',
          params: {},
        });
      } else if (val == 'tagging') {
        //get tagging dashoard value
        var res = await this.$apiService.get(`ledger/taggingdashvalue?reportingPeriodId=${sessionStorage.getItem('reportId')}&level=${sessionStorage.getItem('taggingLevel')}`);
        if (res && res.status === 200) {
          this.ledgerDashDetails = res.data.data;
        }
      }
    },
    selectSecurity() {
      this.masterChoice = true;
    },
  },
};
</script>

<style scoped>
.data-card {
  margin-top: 5px;
  width: 13em;
  border-radius: 5px !important;
  height: 12em;
}
.col-data {
  display: flex;
  justify-content: center;
}
.img-icon {
  height: 1.5em;
  width: 1.5em;
  margin: 1em 1.5em 0em 0.5em;
}
.icon-col {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0em;
}

.img-logo {
  margin-bottom: 0.5em;
}

.table-heading {
  color: #03a9f4;
}
.tab-div {
  margin-top: 1em;
}
.icon-view {
  margin: 0.5em;
  border: none !important;
  background: #f5f5f5 !important;
}
.search-tools {
  justify-content: right;
  text-align: right;
}
.toolbar {
  display: inline-block;
  margin: 2em 2em 1em 0em;
  padding: 0px;
  width: 20em;
  color: #dedede;
}
.v-data-table-header {
}
.text-start {
  font-size: 17px !important;
}
.company-popup {
  margin-top: 9%;
  width: auto;
  background: white;
  border-radius: 5px;
  text-align: center;
}
.blueHead {
  text-align: left;
  color: #03a9f4;
  font-size: 17px !important;

  font-style: normal;
  font-weight: 600;
  margin-right: 18px;
}
.date-head {
  text-align: left;
  font-size: 17px !important;

  font-style: normal;
  font-weight: 600;
  color: #686868;
}
button,
input {
  border-style: none !important;
}
.col {
  padding: 0px !important;
}
.v-application .blue {
  background: none !important;
}

.optiondiv {
  margin-top: 1.2em;
}
.optioncard {
  margin: 10% 8.5% 5% 0%;
  height: 7em;
  width: 72%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid #03a9f4;
}
.card-text {
  font-size: 20px !important;
  font-style: normal;
  font-weight: 600;
}
.master-cards {
  font-size: 20px !important;
  font-style: normal;
  font-weight: 400;
  color: #393939;
}
.icon-align {
  display: flex !important;
  justify-content: flex-end !important;
  padding: 2%;
}
.major-card {
  font-size: 17px !important;
  font-style: normal;
  font-weight: 500;
  color: #03a9f4 !important;
  margin-bottom: 10px !important;
  margin-top: 8px;
}
.table-header {
  font-size: 16px !important;
  font-style: normal;
  font-weight: 600;
  color: #686868 !important;
}
.table-row {
  font-size: 16px !important;
  font-style: normal;
  font-weight: 600;
  color: #03a9f4 !important;
}
.bottom-col {
  width: 50%;
  margin: 0% 1% 3% 4%;
  text-align: left;
}
.button-font {
  font-size: 14px !important;
  font-style: normal;
  font-weight: 400 !important;
  color: #6f6f6f !important;
}

.row {
  margin: 0px !important;
}
</style>
