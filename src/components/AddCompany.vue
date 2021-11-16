<template>
<div class="bckgrnd-img">
    <v-container class="container-center" style="height:86vh">
        <v-card-title class="text-h5 white lighten" style="padding-bottom: 0px;" >
            <div>
                <h5 style="float:left;font-size:17px !important;">Add New Financials</h5>
            </div>
        </v-card-title>
        <v-divider class="blueUline"></v-divider>

        <v-card-text >

        <v-layout>
            <v-flex xs9>
                 <v-text-field autocomplete="off" 
                        v-model="company_creation.name"  
                        label="Name of the Entity"
                        outlined
                        dense
                    ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs9>
                <v-select
                    v-model="company_creation.organizationtype"
                    :items="companytype_items"
                    item-text="name"
                    item-value="id"
                    label="Type of the organization"
                    dense
                    outlined
                    required          
                ></v-select>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs4>
                <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field autocomplete="off" 
                        v-model="company_creation.reportingperioddata.fromdate"
                        
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        
                        v-on="on"
                        label="Period From"
                        outlined
                        dense
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="company_creation.reportingperioddata.fromdate"
                        format="dd-mm-yyyy"
                        no-title
                        @input="menu1 = false"
                    ></v-date-picker>
                </v-menu>
            </v-flex>

            <v-flex xs1>
            </v-flex>

            <v-flex xs4>
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field autocomplete="off" 
                        v-model="company_creation.reportingperioddata.todate"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        label="Period To"
                        outlined
                        dense
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="company_creation.reportingperioddata.todate"
                        no-title
                        @input="menu2 = false"
                    ></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs4>
                <v-select
                    v-model="company_creation.assignedusers"
                    :items="[{username:'Sharan',id:'1000'},{username:'Vivek',id:'1002'}]"
                    item-text="username"
                    item-value="id"
                    label="Assign users"
                    multiple
                    outlined
                    dense
                    required>
                </v-select>
            </v-flex>

            <v-flex xs1>
                <span></span>
            </v-flex>

            <v-flex xs4>
                <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="auto"
                    min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field autocomplete="off" 
                        v-model="company_creation.reportingperioddata.duedate"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        format="MM-dd-yyyy"
                        label="Due Date"
                        outlined
                        dense
                    ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="company_creation.reportingperioddata.duedate"
                        no-title
                        format="MM-dd-yyyy"
                        @input="menu3 = false"
                    ></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>

        <div v-if="company_creation.organizationtype === 'Company'">
            <v-layout>
                <v-flex xs4>
                    <v-select
                        v-model="company_creation.typeofcompany"
                        :items="companytype_items"
                        item-text="name"
                        item-value="id"
                        label="Type of company"
                        dense
                        outlined
                        required          
                    ></v-select>
                </v-flex>
            </v-layout>
        </div>

        <v-layout>
            <v-flex xs4 style="max-width:47%">
                <v-select
                    v-model="company_creation.reportingperioddata.priority"
                    :items="priorityItems"
                    item-text="name"
                    item-value="id"
                    label="Priority"
                    dense
                    outlined
                    hide-details>
                </v-select>
            </v-flex>
            <v-flex xs1>
                <span></span>
            </v-flex>
        </v-layout>

        <v-card-actions class="vertical-center" style="width: 78%;display: flex;justify-content: flex-end;padding-top: 0px;">

            <v-btn
                class="ma-2"
                color="#03a9f4"
                @click="handleAddSubmit"
                style="color:white"
            >
                Create
            </v-btn>
            <v-btn
                class="ma-2"
                outlined
                color="#03a9f4"
                @click="handleAddCancel"
            >
                Cancel
            </v-btn>
        </v-card-actions>
        </v-card-text>
    </v-container>
</div>
</template>

<script>

//import moment from 'moment'
export default {
    name: 'AddCompany',
    components:{
        
    },
    mounted(){
        console.log(this.$store.getters.companies,"companies")
        console.log(this.$store.getters.companiesType,"companiesType")
        console.log(this.$store.getters.assignedUser,"assignedUser")
  },
    data(){
        return{
            valid: true,
            menu1: false,
            menu2: false,
            menu3: false,
            company_creation: {
                name: null,
                fax: null,
                cin: null,
                gstin: null,
                add1: null,
                add2: null,
                state: null,
                country: null,
                zip: null,
                phone: null,
                email: null,
                dateofincorporation: null,
                pan: null,
                createdAt: null,
                updatedAt: null,
                typeofcompany: null,
                organizationtype: null,
                reportingperioddata:{
                    fromdate: "",
                    todate: "",
                    duedate: "",
                    priority: "",
                },
                assignedusers: [],
            },
            
            priorityItems: [
                {id: "None", name: 'None'},
                {id: "Low", name: 'Low'},
                {id: "Medium", name: 'Medium'},
                {id: "High", name: 'High'},
            ],
            companytype_items: [
                {id: 1, name: 'Company'},
                {id: 2, name: 'Proprietor'},
                {id: 3, name: 'Partnership'},
                {id: 4, name: 'LLP'},
                {id: 5, name: 'HUF'},
                {id: 6, name: 'Trust'},
                {id: 7, name: 'AOP/BOI'},
                {id: 8, name: 'Body Corporate'},
            ]
        }
    },
    
    methods: {
        handleAddSubmit(){
                var companyObject={name:this.company_creation.name,
                organizationId:"10",
                period_from:this.company_creation.reportingperioddata.fromdate,
                period_to:this.company_creation.reportingperioddata.todate,
                users:this.company_creation.assignedusers,
                due_date:this.company_creation.reportingperioddata.duedate,
                priority:this.company_creation.reportingperioddata.priority,
                progress:Math.floor((Math.random() * 100) + 1)
                };
                    this.$apiService.post('/financial',companyObject)
                    .then((result)=>{
                    console.log(result,"result");
                    sessionStorage.setItem("financialId",result.data.data.financialId)
                    sessionStorage.setItem("companyId",result.data.data.companyId)
                    this.$router.push({name: 'Dashboard'});
                })            
        },

        handleAddCancel(){
            this.$router.back()
        },

        /* async getCompanies(){
        try{          
            var res = await this.$apiService.get('/company/getlist/');
                if(res&&res.status === 200) {
                    this.$store.commit("setCompanies" , res.data); 
                    console.log(res.data,"companies")
                if (res.data.status === "error") {
                    console.log("error");
                } 
                }
            }
            catch(error) {
            this.showError("Unable to Get Company Details");
            }
        } */
        async getCompaniesType(){
        try{          
                var res1 = await this.$apiService.get('/company/getCompanyTypelist/');
                if(res1&&res1.status === 200) {
                    this.$store.commit("setCompaniesType" , res1.data); 
                    console.log(res1.data,"companiesType")
                if (res1.data.status === "error") {
                    console.log("error");
                } 
                }
            }
            catch(error) {
            this.showError("Unable to Get Company Details");
            }
        }
    }
}


</script>

<style scoped>
* {
  font-size: 14px !important;
}
/deep/.v-input input {
    font-size: 14px !important;
}
/deep/.v-text-field--outlined.v-input--dense .v-label {
    font-size: 14px !important;
}

/deep/ .layout {
    height: 55px;
}
.bckgrnd-img{
    background-image: url('../assets/importimg1.png');
    background-position: right;
    background-repeat: no-repeat;
    background-attachment: fixed;
} 
.img-align{
    text-align: right;
    margin-right: 1%;
}
.blueUline{
    text-align:left;
    margin-bottom:2%;
    width:25%;
    padding:0px;
    margin-left:16px;
    border-top: 4px solid #03a9f4;
}
.vertical-center {
    text-align: left;
    justify-content: left;
}
.container-center{
    margin-top: 6vh;
    margin-left: 6vh;
    width: auto;
    padding: 10px;
    width: 650px;
    text-align: left;
}
.text-yellow{
    color:yellow;
}
.text-red{
    color:red;
}
.text-grey{
    color:gray;
}
.text-green{
    color:green;
}
span{
    font-size: 14px;
    font: bold;
    letter-spacing: 2px;
    margin-left: 12px;
}
</style>