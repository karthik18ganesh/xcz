<template>
 <div style="height:100%">
 <v-container fluid>
     <v-row class="blueHead ma-0">
         <v-vol cols="3" md="3" lg="3" xs="3" class="imgdiv">
                 <img src="../../assets/profile-icon.png" height="60" width="60"/>
          </v-vol>
           <v-vol cols="3" md="3" lg="3" xs="3" class="subTextDiv" style="margin-left: 30px;margin-top: 2px;">
               <h3 color="#0398DC" style="text-align: start;font-size:18px;">
                   {{userDetails.organizationname}}
               </h3>
               <p style="text-align: start;">Organization Website</p>
             
         </v-vol>
           <v-col cols="1" style="max-height: 63px;">
                 <v-divider
                
                vertical
         
                ></v-divider>
         </v-col>
         <v-col cols="3" class="subColomn">
             <h5 style="font-size:18px;font-weight: 500;">Organization ID</h5>
             <p style="font-size:16px">{{userDetails.organaizationid}}</p>
         </v-col>
            <v-col cols="1" style="max-height: 63px;">
                 <v-divider 
                
                vertical
         
                ></v-divider>
         </v-col>
           <v-col cols="3" class="subColomn">
             <h5 style="font-size:18px;font-weight: 500;">Super Admin</h5>
             <p style="font-size:16px">{{userDetails.username}}</p>
         </v-col>
     </v-row>
     <v-divider class="blueUline"></v-divider>
  <v-row justify="center" align="center" class="ma-12 pa-9" style="margin:43px !important;padding: 0px 36px !important;">
      <v-col v-for="item in processItems" :key="item.title" cols="3">
             <v-card
                class="card-text-center"
                style="height:150px;width:180px;margin-top:32px;margin-left:30px;padding:10px;margin-bottom: 28px;"
            >
                <v-card-text style="padding: 35px 0px;">
                    <h2 :style="{color:item.color}"><span style="font-size: 48px;font-weight: 500;">{{ item.percentage }}</span></h2>
                    <h3 style="margin-top: 15px;font-size: 18px;font-weight: 500;">{{ item.title }}</h3>
                </v-card-text>
            </v-card>
      </v-col>
  </v-row>

      </v-container>
      
 </div>
</template>

<script>

 export default {
   components: {
                    // eslint-disable-line
  },
    data () {
      return {
          userDetails :{},
          processItems:[{title:'Yet to start',color:'#0398DC',percentage:20},
          {title:'In Progress',color:'#ECBA0B',percentage:25},
          {title:'Completed',color:'#009E23',percentage:20},
          {title:'Overdue',color:'#E67E22',percentage:20},
          {title:'Total Companies',color:'#0398DC',percentage:20},
          {title:'Users',color:'#ECBA0B',percentage:20}]
    
      }
    },
    async mounted(){
      this.userDetails = JSON.parse(sessionStorage.getItem("userData"));
      this.fetchUserList();
      var res = await this.$apiService.get(`/organization/getadmindashoardvalues?organizationId=${sessionStorage.getItem("orgId")}`);
      if(res&&res.status === 200) {
        console.log(res,"res");
        let {completed,inProgress,overdue,totalCompany,users,yetToStart} = res.data.data;
        this.processItems[0].percentage = yetToStart;
        this.processItems[1].percentage = inProgress;
        this.processItems[2].percentage = completed;
        this.processItems[3].percentage = overdue;
        this.processItems[4].percentage = totalCompany;
        this.processItems[5].percentage = users;
      }
    },
    methods:{
      
    },
  }
</script>

<style scoped>
.imgdiv{
    height: 100%;
}
.data-card{
 margin-top:2em;
  width:13em;
  border-radius:5px !important;
  height:12em;
  border-left:8px solid #03A9F4 !important; 
}
.col-data{
  display:flex;
  justify-content:center;
}
.img-icon{
  height:1.5em;
  width:1.5em;
  margin:1em 1.5em 0em 0.5em;
}
.icon-col{
  display:flex;
  justify-content:flex-end;
  margin-bottom:0em;
}

.img-logo{
  margin-bottom:0.5em;
}

.table-heading{
  color: #03A9F4;
}
.tab-div{
  margin-top:1em;
}
.icon-view{
  margin:0.5em;
  border:none !important;
  background:#F5F5F5 !important;
}
.search-tools{
    justify-content: right;
    text-align: right;    
}
.toolbar{
    display: inline-block;
    margin: 2em 2em 1em 0em;
    padding: 0px;
    width:20em;
    color:#DEDEDE;
}
.v-data-table-header{
  font-family:Be Vietnam;
}
.text-start{
  font-size:17px !important;
}
.company-popup{
    margin-top:9%;
    width: auto;
    background: white;
    border-radius: 5px;
    text-align: center;
}
.blueHead{
margin-left: 20px !important;
max-height: 65px;
padding-bottom:10px;
}
.date-head{
text-align:left;
  font-size: 17px !important;
  font-family: Be Vietnam;
font-style: normal;
font-weight: 600;
color:#686868;
}
button,input{
  border-style:none !important;
}
.col{
  padding:0px !important;
}
.v-application .blue{
  background:none !important;
}

.optiondiv{
  margin-top:4em;
  margin-right:6%;
}
.optioncard{
  margin:10% 8.5% 5% 0%;
  height:7em;
  width:72%;
  display:flex;
  justify-content:center;
  align-items:center;
  border: 1.5px solid #03A9F4;
}
.subTextDiv h3{
   color:#03A9F4 !important;
    font-family: Be Vietnam;
    text-align: start;
    font-size: 18px;
    text-transform: capitalize;
}
.subTextDiv h5{
   
    font-family: Be Vietnam;
}
.subTextDiv p{
   margin: 0px;
   font-size:14px;
    font-family: Be Vietnam;
}
.card-text{
  font-family: Be Vietnam;
font-size: 20px !important;
font-style: normal;
font-weight: 600;
}
.master-cards{
  font-family: Be Vietnam;
font-size: 20px !important;
font-style: normal;
font-weight: 400;
color:#393939;
}
.icon-align{
  display:flex !important;
  justify-content:flex-end !important;
  padding:2%;
}
.major-card{
  font-family: Be Vietnam;
font-size: 24px !important;
font-style: normal;
font-weight: 500;
color:#03A9F4 !important;
}
.table-header{
font-family: Be Vietnam;
font-size: 16px !important;
font-style: normal;
font-weight: 600;
color:#686868 !important;
}
.table-row{
font-family: Be Vietnam;
font-size: 16px !important;
font-style: normal;
font-weight: 600;
color:#03A9F4 !important;
}
.bottom-col{
  width:50%;
  margin:0% 1% 3% 4%;
  text-align:left;
}
.subTextDiv{
    min-width:220px;
    font-size: 20px;
    font-weight: 500;
}
.subColomn{
    min-width:220px;
    font-family: Be Vietnam;
    font-size: 18px;
    font-weight: 500;
}
p{
  margin: 0px ;
}
.blueUline {
  margin-top: 4px;
  width: 100%;
  border-top: 3px solid #03a9f4;
  border-color: #03a9f4 !important;
  min-width: 102%;
  margin-left: -12px;
}
</style>