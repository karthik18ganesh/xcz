<template>
    <v-container>
        <v-dialog
        persistent
         v-model="listLedger"
          content-class="listDialogStyle"
          width="75vw"
        >

        <template v-slot:activator="{ on, attrs }">
                <p
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >
<button transparent style="padding:3px" v-bind="attrs" v-on="on"><v-icon small dense> fas fa-list </v-icon></button>

                <img src="../assets/listledger.png" alt="">
                </p>
            </template>
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
                  <v-select dense outlined label="Category"> </v-select>
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
    </v-container>
</template>

<script>


export default {
    mounted(){
        this.getExplanation()
    },

    data(){
        return{
            listLedger: false,

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

      listrowData: null,
      listLedgerTitle: null,
      listLedgerValues: [],
      selectionDialog: false,
      reclassifyDialog: false,
      reclassifyCheck: false,
      ledgerList: [],
      reclassifyPeriod: [
        { name: "Both Closing & Opening" },
        { name: "Closing Balance" },
        { name: "Opening Balance" },
      ],
      date: "",
      level1List: [],
        }

    },

    method: {
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
}

    };
    
</script>
