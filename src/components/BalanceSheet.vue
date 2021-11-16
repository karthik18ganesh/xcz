<template>
    <div>
        <v-layout>
            <v-flex xs2 md2 style="margin-top:1%; margin-left:1%">
                <p>BSY pvt.ltd > Balance Sheet</p>
            </v-flex>
            <v-flex>
                <div class="btn-row">
                    <v-btn variant="light" small>Excel</v-btn>
                    <v-btn color="blue-grey" class="ma-2 white--text" small>PDF</v-btn>
                </div>
            </v-flex>
        </v-layout>
        
        <v-divider></v-divider>
        <div class="container-align">
        
            <h4><u class="underline">Balancesheet as on 31-03-2021</u></h4>

            <v-card class="mx-auto">
                <!-- <v-data-table
                    :headers="headers"
                    :items="values"
                    item-key="name"
                    group-by="category"
                    @click:row="rowClick"
                    single-select
                    >
                    <template v-slot:group.header="{items, isOpen, toggle}">
                        <th colspan="2" style="color:#066b99">
                        <v-icon small @click="toggle">
                            {{ isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up' }}
                        </v-icon>
                        {{ items[0].category }}
                        </th>
                        <th></th>
                        <th></th>
                        
                    </template>
                    
                    <template v-slot:item="{ item }">
                        <tr @click="activerow(item)">
                        <td>{{ item.name }}</td>
                        <td>{{ item.notes }} </td>
                        <td>{{ item.fromdate }} </td>
                        <td>{{ item.todate }} </td>
                        </tr>
                    </template>
                </v-data-table>   -->     

                <b-table :fields="headers" :items="tableBSValues" @row-clicked="activerow">
                    <template v-slot:cell(notes)="data">
                        {{data.item.isParent ? '' : data.item.notes}}
                    </template>
                    <template v-slot:cell(fromdate)="data">
                        {{data.item.isParent ? '' : data.item.fromdate}}
                    </template>
                    <template v-slot:cell(todate)="data">
                        {{data.item.isParent ? '' : data.item.todate}}
                    </template>

                    <template v-slot:cell(icon)="data">
                        <span v-if="!data.item.isParent">
                        <button transparent>
                            <v-icon small dense color="success"> mdi-check-circle</v-icon>
                        </button>
                        </span>
                    </template>

                    <template v-slot:cell(particulars)="data">
                        <span v-if="data.item.isParent" style="color: #0398DC">
                           {{ data.item.particulars }}
                        </span>
                        <span v-else-if="!data.item.isParent">
                            &emsp; - {{ data.item.particulars }}
                        </span>
                    </template>

                    <template v-slot:cell(sl)="data">
                    <div style="padding:2px;" v-if="data.item.isParent">
                        <span>
                            <button v-if="isRowGroupOpen[data.item.category]" @click="()=>rowGroupHandler(data.item.category,1)" style="position: relative;top:5px;cursor: pointer;margin-left:5px">
                                <v-icon>mdi-chevron-up</v-icon>
                            </button>
                            <button v-if="!isRowGroupOpen[data.item.category]" @click="()=>rowGroupHandler(data.item.category,2)" style="position: relative;top:5px;cursor: pointer;margin-left:5px">
                                <v-icon>mdi-chevron-down</v-icon>
                            </button>
                        </span>
                    </div>
                    </template>
                </b-table>     
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    components:{

    },
    mounted(){
        this.groupBSValues()
    },
    methods: {
        activerow: function (item) {
            if(item.notes == 1){
                this.$router.push({ path: '/sharecapital' , params: {note : item.notes}})
            }else if(item.notes == 21){
                this.$router.push({ path: '/financial1' , params: {note : item.notes}})
            }
        
        },
        groupBSValues(){
            this.valuesBSAfterGroup = this.$_.groupBy(this.values,(val=>val.category));
            console.log("Values after group : ",this.valuesBSAfterGroup)
            this.tableBSValues = []
            var id = 0
            
            for(let key in this.valuesBSAfterGroup){
                var fromdate = 0
                var todate = 0
                var notes = 0
                this.valuesBSAfterGroup[key].map(val=>{ 
                    notes = val.notes;
                    fromdate = Number(val.fromdate);
                    todate = Number(val.todate);
                })
                this.tableBSValues.push({
                    child: this.valuesBSAfterGroup[key],
                    id: ++id,
                    name: '',
                    category: key,
                    particulars: key,
                    notes: notes,
                    fromdate: fromdate,
                    todate: todate,
                    isParent:this.valuesBSAfterGroup[key].length?true:false
                })
            }
            this.mainBSTableValues = JSON.parse(JSON.stringify(this.tableBSValues));
            /* var result = []
            this.tableBSValues.forEach(val=>{
                result.push(val);
                result = result.concat(val.child)
            })
            this.tableBSValues = result; */
            console.log(this.mainBSTableValues)
        },
        rowGroupHandler(name,idx){
            if(idx == 2){
                var resultData = []
                console.log(this.mainBSTableValues)
                this.mainBSTableValues.forEach(val=>{
                resultData.push(val)
                if(val.category === name){
                    val.child.forEach(val1 => {
                        val1["particulars"] = val1.name
                        if(val1.name){
                            resultData.push(val1)
                        }
                        console.log(val1)
                    })
                    //resultData = resultData.concat(val.child)
                }
            })
            this.tableBSValues = resultData
                this.isCollapsedParent.push(name);
                this.isRowGroupOpen[name] = true;
                this.$refs.table.refresh();
            }
            else {
                this.isCollapsedParent=this.isCollapsedParent.filter(val=>val!=name);this.isRowGroupOpen[name] = false;
                this.tableBSValues = this.mainBSTableValues
            }
        },    
    },

    data(){
        return{
            selectedId: -1,
            valuesBSAfterGroup: {},
            tableBSValues: [],
            mainBSTableValues: [],
            isRowGroupOpen:[],
            isCollapsedParent:[],
            id: 0,
            /* headers: [
                {text: 'Particulars', align: 'left', value: 'name',},
                {text: 'Notes', align: 'left', value: 'notes',sortable: true},
                {text: '31-03-2021', align: 'left', value: 'fromdate'},
                {text: '31-03-2020', align: 'left', value: 'todate'},
            ], */
            headers: [
                {label: '', key:'sl', align: 'left', value: '',},
                {label: 'Particulars', key:'particulars', align: 'left', value: 'name',},
                {label: 'Notes',key: 'notes', align: 'left', value: 'notes',sortable: true},
                {label: '31-03-2021', key:'fromdate', align: 'left', value: 'fromdate'},
                {label: '31-03-2020', key: 'todate', align: 'left', value: 'todate'},
                {label: '', key:'icon', align: 'left', value: '',},
            ],
            values: [
                {
                    id: 1,
                    name: 'Share capital',
                    category: 'Shareholders funds',
                    notes: 1,
                    fromdate: '24000',
                    todate: '24000'
                },
                {
                    id: 2,
                    name: 'Reserves and Surplus',
                    category: 'Shareholders funds',
                    notes: 2,
                    fromdate: '34000',
                    todate: '24000'
                },
                {
                    id: 3,
                    name: 'Money received against share warrants',
                    category: 'Shareholders funds',
                    notes: 3,
                    fromdate: '4000',
                    todate: '24000'
                },
                {
                    id: 4,
                    name: '',
                    category:'Share application money pending allotment',
                    notes: 4,
                    fromdate: '84000',
                    todate: '24000'
                },
                {
                    id: 5,
                    name: 'Long-term borrowings',
                    category: 'Non-Current Liabilties',
                    notes: 5,
                    fromdate: '54000',
                    todate: '24000'
                },
                {
                    id: 6,
                    name: 'Deferred tax liabilities (Net)',
                    category: 'Non-Current Liabilties',
                    notes: 6,
                    fromdate: '84000',
                    todate: '24000'
                },
                {
                    id: 7,
                    name: 'Other Long term liabilities',
                    category: 'Non-Current Liabilties',
                    notes: 7,
                    fromdate: '14000',
                    todate: '24000'
                },
                {
                    id: 8,
                    name: 'Long-term Provisions',
                    category: 'Non-Current Liabilties',
                    notes: 8,
                    fromdate: '40000',
                    todate: '24000'
                },
                {
                    id: 9,
                    name: 'Current investments',
                    category: 'Current Assets',
                    notes: 18,
                    fromdate: '40000',
                    todate: '24000'
                },
                {
                    id: 10,
                    name: 'Inventories',
                    category: 'Current Assets',
                    notes: 19,
                    fromdate: '40000',
                    todate: '24000'
                },
                {
                    id: 11,
                    name: ' Trade receivables',
                    category: 'Current Assets',
                    notes: 20,
                    fromdate: '40000',
                    todate: '24000'
                },
                {
                    id: 12,
                    name: 'Cash and cash equivalents',
                    category: 'Current Assets',
                    notes: 21,
                    fromdate: '40000',
                    todate: '24000'
                },
                {
                    id: 13,
                    name: 'Short-term loans and advances',
                    category: 'Current Assets',
                    notes: 22,
                    fromdate: '40000',
                    todate: '24000'
                },
                {
                    id: 14,
                    name: 'Other current assets',
                    category: 'Current Assets',
                    notes: 23,
                    fromdate: '40000',
                    todate: '24000'
                },
            ],
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam&display=swap');
tr.v-data-table__selected {
  background: #7d92f5 !important;
}
.btn-row{
    margin-top: 8px;
    text-align: right;
}
.blueUline{
    width:100%;
    border-bottom: 3px solid #066b99;
}
.container-align{
    padding: 15px;
    text-align: left;
    margin: 20px;
}
.simple-table{
    padding: 10px;
    margin: 10px;
}
.v-data-table ::v-deep th{
    font-size: 14px !important;
    border-bottom: 5px solid #03a9f4;
    padding:0px;
}
h4{
    font-size: 24px;    
    text-align: left;
    margin: 8px;
}
</style>