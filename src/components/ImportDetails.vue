<template>
<div class="bckgrnd-img">
    <v-container class="container-center">
        <v-card-title class="text-h5 white lighten " style="padding:16px 16px 8px 17px;">
            <div>
                <h5 style="float:left">Import Financials</h5>
            </div>
        </v-card-title>
        <v-divider class="blueUline"></v-divider>
        <v-card-text style="margin-top:5%;">
            <v-form v-model="valid"
            ref="importform"
            lazy-validation>

            <v-layout>
                <v-flex>
                    <br/>
                    <v-select
                        v-model="import_company.companyname"
                        :rules="[v => !!v || 'Company name is required']"
                        :items="this.$store.getters.companies"
                        item-text="name"
                        item-value="name"
                        label="Name of the Entity"
                        dense
                        outlined
                        required         
                    ></v-select>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs6>
                    <br/>
                    <v-select
                        v-model="import_company.period"
                        :rules="[v => !!v || 'Period is required']"
                        :items="period_options"
                        item-text="value"
                        item-value="value"
                        label="Previous years"
                        dense
                        outlined
                        required          
                ></v-select>
                </v-flex>
            </v-layout>

            <v-card-actions class="vertical-center" >
                <v-btn
                    class="ma-2"
                    color="primary"
                    @click="handleImportSubmit"
                >
                    Next
                </v-btn>
                <v-btn
                    class="ma-2"
                    outlined
                    color="indigo"
                    @click="handleImportCancel"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
            </v-form>
        </v-card-text>
    </v-container>
</div>
</template>

<script>
export default {
    mounted(){
        console.log(this.$store.getters.companies,"import_companies")
    },
    data(){
        return{
            valid: true,
            import_company: {
                companyname:null,
                period: null,
                companyid: null
            },
            company_det: [],
            period_options:[
                {id: 1, value: '2010'},
                {id: 1, value: '2011'},
                {id: 1, value: '2012'},
                {id: 1, value: '2013'},
                {id: 1, value: '2014'},
                {id: 1, value: '2015'},
                {id: 1, value: '2016'},
                {id: 1, value: '2017'},
                {id: 1, value: '2018'},
                {id: 1, value: '2019'},
                {id: 1, value: '2020'},
                {id: 1, value: '2021'}
            ]
        }
    },
    methods:{
        async getCompanies(){
        try{          
            var res = await this.$apiService.get('/company/getlist/');
                if(res&&res.status === 200) {
                    this.$store.commit("setCompanies" , res.data); 
                    console.log(res.data,"companies")
                    console.log("=========",this.company_det)
                if (res.data.status === "error") {
                    console.log("error");
                } 
                }
            }
            catch(error) {
            this.showError("Unable to Get Company Details");
            }
        } ,

        handleImportSubmit(){
            try{
                if(this.$refs.importform.validate()){
                    this.$apiService.post('/company/importcompany/',this.import_company)
                    .then((result)=>{
                    console.warn(result)
                })
                }
            }
            catch(error)
            {
                this.showError("Unable to Get Company Details");
            }
            
        },

        handleImportCancel(){
            this.$router.back()
        },
    }
}
</script>

<style scoped>
.bckgrnd-img{
    background-image: url('../assets/importimg.png');
    background-color: #000;
    background-position: right bottom;
    background-repeat: no-repeat;
    height:85% !important;
} 
.container-center{
    margin-top: 10vh;
    margin-left: 8%;
    width: auto;
    padding: 10px;
    width: 650px;
    text-align: left;
}
.vertical-center {
    text-align: left;
    justify-content: left;
}
.blueUline{
    text-align:left;
    width:25%;
    padding:0px;
    margin-left:16px;
    border-top: 4px solid #03a9f4;
}

</style>
