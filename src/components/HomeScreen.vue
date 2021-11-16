<template>
    <v-container style="" fluid>
        <v-row style="display:flex;justify-content:space-evenly;margin:0% 3% 2% 0%">
          
          <v-card
           style="margin-top:10px;height:125px;width:125px;border-radius:14px !important;"
            outlined
            tile
            :elevation="2"
            @click="handleCard('addfinancials')"
          >
            <v-row>
          
           <v-col md="12" >
            <p style="black;margin-top:20px;padding:0px;" class="card-name">ADD<br> FINANCIALS</p>
             <img src="../assets/add.png"  class="ma-0 pa-0" style="height:25px;width:25px;margin-top:-32px;padding-top:0px">
          </v-col>
        
         
          </v-row>
          </v-card>
                 <v-card
           style="margin-top:10px;height:125px;width:125px;border-radius:14px !important;"
            outlined
            tile
            :elevation="2"
            @click="handleCard('importfinancials')"
          >
            <v-row>
          
           <v-col md="12" >
            <p style="black;margin-top:20px;padding:0px;" class="card-name">IMPORT<br> FINANCIALS</p>
             <img src="../assets/import.png"  class="ma-0 pa-0" style="height:25px;width:25px;margin-top:-32px;padding-top:0px">
          </v-col>
        
         
          </v-row>
          </v-card>
 <div >
                 <v-divider
                 style="max-height:115px;max-width:2px;margin: 0px 22px;margin-top: 7px;;color:rgba(64, 64, 64, 0.54);"
  vertical
></v-divider>
</div>
  
                 <v-card
           style="margin-top:10px;height:125px;width:125px;border-radius:14px !important;"
            outlined
            tile
            :elevation="2"
            @click="handleCard('addfinancials')"
          >
            <v-row>
          
           <v-col md="12" >
            <p style="black;margin-top:15px;padding:0px" class="card-num">22</p>
             <p class="card-bottom-text">All</p>
          </v-col>
        
         
          </v-row>
          </v-card>

                 <v-card
           style="margin-top:10px;height:125px;width:125px;border-radius:14px !important;"
            outlined
            tile
            :elevation="2"
            @click="handleCard('addfinancials')"
          >
            <v-row>
          
           <v-col md="12" >
           <p style="black;margin-top:15px;padding:0px" class="card-num">05</p>
             <p class="card-bottom-text">Yet to Start</p>
          </v-col>
        
         
          </v-row>
          </v-card>

                 <v-card
           style="margin-top:10px;height:125px;width:125px;border-radius:14px !important;"
            outlined
            tile
            :elevation="2"
            @click="handleCard('addfinancials')"
          >
            <v-row>
          
           <v-col md="12" >
            <p style="black;margin-top:15px;padding:0px" class="card-num">10</p>
             <p class="card-bottom-text">In Progress</p>
          </v-col>
        
         
          </v-row>
          </v-card>

                 <v-card
           style="margin-top:10px;height:125px;width:125px;border-radius:14px !important;"
            outlined
            tile
            :elevation="2"
            @click="handleCard('addfinancials')"
          >
            <v-row>
          
           <v-col md="12" >
            <p style="black;margin-top:15px;padding:0px" class="card-num">07</p>
             <p class="card-bottom-text">Completed</p>
          </v-col>
        
         
          </v-row>
          </v-card>
                 <v-card
           style="margin-top:10px;height:125px;width:125px;border-radius:14px !important;"
            outlined
            tile
            :elevation="2"
            @click="handleCard('addfinancials')"
          >
            <v-row>
          
           <v-col md="12" >
   <p style="black;margin-top:15px;padding:0px" class="card-num">03</p>
             <p class="card-bottom-text">Overdue</p>
          </v-col>
        
         
          </v-row>
          </v-card>
</v-row>

        <v-data-table
            :headers="headers"
            :items="this.filteredData"
            item-key="company_id"
            fixed-header
            class="elevation-1"
            @click:row="homeRowClick"
        >
      <template v-slot:item.due_date="{ item }">
     
       {{ getFormatDueDate(item.due_date)  }}
      
    </template>
    <template v-slot:item.status="{ item }">   
       <v-icon v-if="item.status=='Yet To Start'" color="#D92626" style="font-size: 12px" dark>mdi-checkbox-blank-circle</v-icon>
       <v-icon v-if="item.status!='Yet To Start'" color="#26A65B" style="font-size: 12px" dark>mdi-checkbox-blank-circle</v-icon>
      
    </template>
  
      <template v-slot:item.progress="{ item }">
     
     <v-progress-linear :color="item.progress>10?'#26A65B':'#D92626'"
      v-model="item.progress"
      style="height: 4px;
    color: #0000;
    border-radius: 15px;"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
      
    </template>
        </v-data-table>
 


    </v-container>
</template>

<script>
import moment from 'moment'
export default {
    name: 'HomeScreen',
    async mounted(){
        this.fetchUserDetails();
        this.sessionValues = JSON.parse(sessionStorage.getItem("userDetails"));
        console.log(this.sessionValues ,"this.sessionValues ")
        await this.fetchFinancialDetails();
//         if(this.sessionValues.data.length>0){
//             this.companyDetails=this.sessionValues.data;
//              this.filteredData=this.sessionValues.data;
//                  this.filteredData.forEach((x,index)=>{
// x.sno=index+1;
// });
//         }

    },
    
    data(){
        return{
          sessionValues:{},
            YetToStart: '00',
            InProgress: '00',
            Completed: '00',
            OverDue: '00',
            filteredData:[],
            search: '',
            headers:[
                {text:'Name of the Entity' , value:'company_name', align: 'center', filterable: true},
                {text:'FY' , value:'financialyear', align: 'center'},
                {text:'User/Group' , value:'userassigned', align: 'center'},
                {text:'Status' , value:'status', align: 'center'},
                {text:'Priority' , value:'priority', align: 'center'},
                {text:'Progress' , value:'progress', align: 'center'},
                {text:'Due Date' , value:'due_date', align: 'center'},
                {text:'' , value:'action', align: 'right'},
            ],
            companyDetails:[]
        }
    },
    methods:{

        async fetchMasterData(item){
try{          
            var res = await this.$apiService.post('/master/get',{companyid:item.company_id,financialid:item.id});
            if(res&&res.status === 200) {
              console.log(item,"entity item")
              sessionStorage.setItem("fina",JSON.stringify(item))
                this.$store.commit("setSelectedEntity",item);
console.log(res.data.data,"setMasterData")
                this.$store.commit("setMasterData" , res.data.data); 
                if(res.data.data!=null){
this.$store.commit("setSidebar",true);
this.$router.push({name: 'Dashboard'});
                }
            
}
                 
            
        }
        catch(error) {
            console.log(error,"err")
          this.showError("The provided email id or employee id is wrong");
           }
        
        },
        async homeRowClick(item){
            await this.fetchMasterData(item);
console.log(item,"selectCompanyForMAsters")
        },
        handleCard(value){
if(value=='addfinancials'){
     this.$router.push({name: 'AddCompanyDetails'});
}
if(value=='importfinancials'){
     this.$router.push({name: 'ImportDetails'});
}
        },
        async fetchFinancialDetails(){         
            var res = await this.$apiService.post('/financial/get',{userid:this.sessionValues.data.id});
            if(res&&res.status === 200) {
console.log(res.data,"res")
                this.$store.commit("setCompanies" , res.data); 
               // this.companyDetails = res.data;
               res.data.data = res.data.data.map((val,idx)=>{
                 val["financialyear"] = val.period_from.split("-")[0]+"-"+val.period_to.split("-")[0];
                 val["status"] = val.progress>10?"In Progress":"Yet To Start";
                 val["userassigned"] = idx==1||idx==5?"Sharan,Vivek":"Shran";
                 return val;
               })
               console.log(res.data.data,"res.data")
                this.filteredData=res.data.data;
                 this.filteredData.forEach((x,index)=>{
x.sno=index+1;
});
                console.log("test2",this.filteredData)   
            
        }
   
          
        },
        getColor: function(item) {
    if (item.value.value == 50) {
      return '#009E23'
    } else if (item.value.value > 50) {
      return '#E67E22'
    } else if (item.value.value <= 50) {
      return '#ECBA0B'
    }
    return ''
  },

      getFormatDate(val){
        if (val) {
            return moment(String(val)).format('YYYY')
        }
      },
      getFormatDueDate(val){
        if (val) {
            return moment(String(val)).format('DD-MM-YYYY')
        }
      },
      filterColumns(value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1
      },
      onChangeSearch(value){
        this.filteredData=this.companyDetails.filter(x=>x.name.includes(value) || 
            x.id.toString().includes(value.trim()) || 
            x.users.map(i => i.username).join(' ').toString().includes(value) || 
            x.reportingperioddata.map(i => i.fromdate).join('') || 
            x.reportingperioddata.map(i => i.todate).join('') || 
            x.reportingperioddata.map(i => i.duedate).join(''));
            this.filteredData.forEach((x,index)=>{
x.sno=index+1;});
            console.log(value,"valuesss",this.filteredData)
      }
      },
        itemsWithSno() {
            return this.companyDetails.map((d, index) => ({ ...d, sno: index + 1 }))
        }
    }

</script>

<style scoped>
.theme--light.v-data-table {
    box-shadow: none !important;
}
.company-popup{
    padding: 10px;
    margin: 35px;
    width: auto;
    background: white;
    border-radius: 5px;
    text-align: center;
}
.main-container{
    padding: 10px;
    margin: 30px 50px;
}
.progress-details{
    margin: 50px 50px;
    display: inline-block;
}

.card-text-start{
    border-bottom: 5px solid dodgerblue;
}
.card-text-progress{
    border-bottom: 5px solid rgb(21, 1, 31);
}
.card-text-completed{
    border-bottom: 5px solid rgb(8, 161, 72);
}
.card-text-overdue{
    border-bottom: 5px solid rgb(252, 71, 71);
}
.search-tools{
    justify-content: right;
    text-align: right;  
     
}
.toolbar{
    display: inline-block;
    margin-top: 10px;
    padding: 0px;
    text-align: right;
}

.mytable{
    font-size: 14px;
}

.v-data-table ::v-deep th{
    font-size: 15px !important;
    border-bottom: 5px solid #03a9f4;
    padding:0px;
}
.tooltip-class{
    background: whitesmoke;
    margin: 0;
    width: 150px;
    padding: 5px;
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
.card-name{
font-size: 17px !important;
    font-style: normal;
    font-weight: 600;
    color: #808080;
    margin-bottom: 7px;
}
/deep/ .v-data-table > .v-data-table__wrapper > table {
height: 51vh !important;
}
/deep/ .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 13px !important;
    height: 40px !important;
    font-weight: 600;
    background-color: #ecebeb;
    color: #808080;
}

/deep/.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    font-size: 13px !important;
    height: 40px;
    text-align: start !important;
    padding-left: 4vw;
}
.card-num{
font-size: 50px !important;
    font-style: normal;
    font-weight: 600;
    margin-top: 10px !important;
    margin-bottom: -6px !important;
    color: #808080;
}
.card-bottom-text{
font-size: 17px !important;
    font-style: normal;
    font-weight: 600;
    color: #66c5f1;
    margin-top: 0px;
}
.v-data-table-header{
  background: rgba(64, 64, 64, 0.05) !important;
}
</style>