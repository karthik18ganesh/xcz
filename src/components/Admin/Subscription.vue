<template>
 <div style="height:100%">
 <v-container fluid>
  <v-tabs
      v-model="tab"
      background-color="transparent"
    
      
    >
      <v-tab
       
      >
      <h4 class="headerClassTab">Plan</h4>
      </v-tab>
      <v-tab
       
      >
       <h4 class="headerClassTab">Payment History</h4>
       
      </v-tab>
          <v-tab
       
      >
       <h4 class="headerClassTab">Invoice</h4>
       
      </v-tab>
        
       
     
    </v-tabs>
  <v-tabs-items v-model="tab">
    
         <v-tab-item
       
      
      >
         <v-card
         style="margin-top:50px"
         
          flat
        >
          <v-card-text>
              <v-row>
                  <v-col cols="12" class="ma-1 pa-1 text-left">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit quia ipsum qui ad nam. Debitis deserunt quaerat ullam delectus 
                      exercitationem natus fuga ipsa perspiciatis. Sit ratione sapiente laudantium autem incidunt!
                  </v-col>
                                  <v-col cols="12" class="ma-1 pa-1 text-left">
                                      
            <v-row>
                 <v-col cols="3">
                     <v-card
        style="margin-top:50px"
    max-width="400"
    height="600"
  >
    <v-list-item two-line >
      <v-list-item-content>
        <v-list-item-title class="text-h2">
       <h4>  $ 0</h4>
        </v-list-item-title>
        <v-list-item-subtitle>Free Forever</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text style="margin-top:15px">
      <v-row align="left" class="ma-2 pa-2">
        <v-col
          class="text-h6"
          cols="12"
        >
          Free
        </v-col>
         <v-col
          class="text-p"
          cols="12"
        >
          anyone can automate their work, start with basic plan
        </v-col>
            <v-col
          class="text-p"
          style="font-weight:600;margin-top:25px"
          cols="12"
        >
         Features Include
        
        </v-col>
     
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>5 Zaps

          
      </v-list-item-subtitle>
      
    </v-list-item>
     <v-divider>
         </v-divider>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>2 Step Zaps</v-list-item-subtitle>
    </v-list-item>
     <v-divider>
         </v-divider>

   

   
 

    <v-card-actions>
        <div clas="ma-2 pa-2">
      <v-btn class="primary center" style="margin-top:90px;width:150px" >
        Try Free
      </v-btn>
        </div>
    </v-card-actions>
  </v-card>
                </v-col>
                <v-col cols="3">
                     <v-card
        style="margin-top:50px"
    max-width="400"
    height="600"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h2">
       <h4>  $ 20</h4>
        </v-list-item-title>
        <v-list-item-subtitle>Per month billed annually or<br> billed month to month basis 25$
            
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="left" class="ma-2 pa-2">
        <v-col
          class="text-h6"
          cols="12"
        >
          Starter
        </v-col>
         <v-col
          class="text-p"
          cols="12"
           style="font-weight:600"
        >
          Unleash the power of automation for your project
        </v-col>
            <v-col
          class="text-p"
          style="font-weight:600;margin-top:25px"
          cols="12"
        >
         Everything in starter plus
        </v-col>
     
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>20 Zaps</v-list-item-subtitle>
    </v-list-item>
    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>Multi Step Zaps</v-list-item-subtitle>
    </v-list-item>
      <v-divider></v-divider>
          <v-list-item>
      <v-list-item-icon>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>Premium Apps</v-list-item-subtitle>
    </v-list-item>
      <v-divider></v-divider>

   

   
 

    <v-card-actions>
        <div clas="ma-2 pa-2">
      <v-btn class="primary center" style="margin-top:30px;width:150px" >
        Try Free
      </v-btn>
      
        </div>
    </v-card-actions>
  </v-card>
                </v-col>
                 <v-col cols="3">
                     <v-card
        style="margin-top:50px"
    max-width="400"
    height="600"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h2">
       <h4>  $ 50</h4>
        </v-list-item-title>
        <v-list-item-subtitle>Per month billed annually or<br> billed month to month basis 25$
            
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="left" class="ma-2 pa-2">
        <v-col
          class="text-h6"
          cols="12"
        >
          Professional
        </v-col>
         <v-col
          class="text-p"
          cols="12"
           style="font-weight:600"
        >
          Unleash the power of automation for your project
        </v-col>
            <v-col
          class="text-p"
          style="font-weight:600;margin-top:25px"
          cols="12"
        >
         Everything in starter plus
        </v-col>
     
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>50 Zaps</v-list-item-subtitle>
    </v-list-item>
    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>Conditional Logic</v-list-item-subtitle>
    </v-list-item>
      <v-divider></v-divider>
          <v-list-item>
      <v-list-item-icon>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>Faster Automation</v-list-item-subtitle>
    </v-list-item>
      <v-divider></v-divider>

   

   
 

    <v-card-actions>
        <div clas="ma-2 pa-2">
      <v-btn class="primary center" style="margin-top:25px;width:150px" >
        Try Free
      </v-btn>
        </div>
    </v-card-actions>
  </v-card>
                </v-col>
                  <v-col cols="3">
                     <v-card
        style="margin-top:50px"
    max-width="400"
    height="600"
  >
    <v-list-item two-line >
      <v-list-item-content>
        <v-list-item-title class="text-h2">
       <h4>  $ 125</h4>
        </v-list-item-title>
        <v-list-item-subtitle>FBilled annually or per month 162<br>month to month</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text style="margin-top:0px">
      <v-row align="left" class="ma-2 pa-2">
        <v-col
          class="text-h6"
          cols="12"
        >
          Free
        </v-col>
         <v-col
          class="text-p"
          cols="12"
        >
          anyone can automate their work, start with basic plan
        </v-col>
            <v-col
          class="text-p"
          style="font-weight:600;margin-top:25px"
          cols="12"
        >
         Features Include
        
        </v-col>
     
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>5 Zaps

          
      </v-list-item-subtitle>
      
    </v-list-item>
     <v-divider>
         </v-divider>



   

   
 

    <v-card-actions>
        <div clas="ma-2 pa-2">
      <v-btn class="primary center" style="margin-top:140px;width:150px" >
        Try Free
      </v-btn>
        </div>
    </v-card-actions>
  </v-card>
                </v-col>
            </v-row>
                                  </v-col>

              </v-row>
        
            </v-card-text>
        </v-card>
      </v-tab-item>
        <v-tab-item
       
      
      >
       <v-card
         
          flat
        >
          <v-card-text>
              <v-row>
                  <v-col cols="12" class="ma-1 pa-1 text-left">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit quia ipsum qui ad nam. Debitis deserunt quaerat ullam delectus 
                      exercitationem natus fuga ipsa perspiciatis. Sit ratione sapiente laudantium autem incidunt!
                  </v-col>
                               

              </v-row>
          <v-simple-table style="width:100%;margin-top:10px">

    <template v-slot:default>
      <thead>
        <tr width="400" class="grey lighten-4">
          <th class="text-left text--primary">
            Date
          </th>
          <th width="400" class="text-left text--primary">
            Amount
          </th>
            <th width="200" class="text-left text--primary">
            Status
          </th>
           <th width="300" class="text-left text--primary">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(group,index) in paymentHistoryArray"
          :key="group.groupName"
          v-bind:class="{ striped: index%2!=0 }"
        >
          <td  class="text-left" >{{group.date}}</td>
          <td class="text-left">
              {{group.amount}}
          </td>
             <td  class="text-left" >
     <v-btn
     x-small
     v-if="group.status=='successfull'"
              icon
              color="green"
            >
              <v-icon>mdi-checkbox-blank-circle</v-icon>
            </v-btn>
             <v-btn
     x-small
     v-if="group.status=='cancelled'"
              icon
              color="red"
            >
              <v-icon>mdi-checkbox-blank-circle</v-icon>
            </v-btn>

             </td>
              <td  class="text-left" >{{group.description}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
        </v-card>
      </v-tab-item>
       <v-tab-item
       
      
      >
       <v-card
         
          flat
        >
          <v-card-text>
              <v-row>
                  <v-col cols="12" class="ma-1 pa-1 text-left">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit quia ipsum qui ad nam. Debitis deserunt quaerat ullam delectus 
                      exercitationem natus fuga ipsa perspiciatis. Sit ratione sapiente laudantium autem incidunt!
                  </v-col>
                               

              </v-row>
          <v-simple-table style="width:100%;margin-top:10px">

    <template v-slot:default>
      <thead>
        <tr width="700" class="grey lighten-4">
          <th class="text-left text--primary">
            Invoice
          </th>
          <th width="700" class="text-left text--primary">
            Date of Invoice
          </th>
            <th width="700" class="text-left text--primary">
            Invoice No.
          </th>
           <th width="700" class="text-left text--primary">
            Amount
          </th>
          <th width="700" class="text-left text--primary">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(group,index) in invoiceArray"
          :key="group.groupName"
          v-bind:class="{ striped: index%2!=0 }"
        >
          <td  class="text-left" >{{group.id}}</td>
          <td class="text-left">
              {{group.date}}
          </td>
          <td class="text-left">
              {{group.invoiceNumber}}
          </td>
             <td  class="text-left" >{{group.amount}}</td>
              <td  class="text-left" >{{group.status}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

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
          forecast: [
          { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
          { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
          { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
        ],
        file: '',
    dragging: false,
    tab:null,
    privilageSuperAdminArray:[{name:'Sarasan',role:'None',contactNumber:'9746580306'}],
    invoiceArray:[{id:'3444_dvdv_2333jd.pdf',date:'1-March-2021',invoiceNumber:'10010',amount:'17000',status:'Paid'},
    {id:'3444_dvdhhf2333jd.pdf',date:'12-March-2021',invoiceNumber:'10011',amount:'17000',status:'Paid'}
    ],
    paymentHistoryArray:[{date:'13-March-2021',amount:'25000',status:'cancelled',description:'Premium Plan'},
    {date:'13-March-2021',amount:'22000',status:'cancelled',description:'Payment via Visa Card'},
   {date:'13-March-2021',amount:'28000',status:'successfull',description:'Payment via Visa Card'}],
        emailRules: [ v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid Email address' ],
        usersDetails:[{nameOfEntity:"Vivek",archieves:"Manager",lastLogin:'5 Hours ago',Lock:'online'}],
        entityHeaders:[{
          text: 'Name of Entities',
          align: 'start',
          sortable: false,
          value: 'nameOfEntity',
        },
        {
          text: 'Archieves',
          align: 'start',
          sortable: false,
          value: 'archieves',
        },
     
        {
          text: 'Lock',
          align: 'start',
          sortable: false,
          value: 'Lock'
          
        },
           {
          text: 'Transfer',
          align: 'start',
          sortable: false,
          value: 'transfer',
        },
              {
          text: 'Delete',
          align: 'start',
          sortable: false,
          value: 'delete',
        }],
        showImportDialog:false,
        showInviteDialog:false,
        selectedInviteList:[],
        availableEmails:["asimpremji@tecs.com","elonmust@tecs.com","bajlel@tecs.com","nee@tecs.com","asimpremji@tecs.com","elonmust@tecs.com"],
         userSearchWord:"",
         addUserDialog:false,
         rules: {required: (value) => !!value || "Required.",confirmPassword:(value) => value==this.userObject.password || "Please Confirm Password"},
         userObject:{firtstName:"",email:"",lastName:"",emailID:"",archieves:"",nameOfEntity:"",password:""}
    
      }
    },
    async mounted(){
  

    },
    methods:{
      userRowClick(item){
          console.log(item,"doru")
        
         this.$router.push({ path: '/EntityFinancial' }); 

      },
          showAddUserPopUp(){
this.addUserDialog=true;
      },
      onChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      
      if (!files.length) {
        this.dragging = false;
        return;
      }
      
      this.createFile(files[0]);
    },
    createFile(file) {
      // eslint-disable-next-line no-debugger
      debugger
      if (!file.type.match('csv.*')||file.name.substr(file.name.length-3)=='csv'||file.name.substr(file.name.length-4)=='xlsx') {
        this.showError("Please Select a valid CSV File");
        this.dragging = false;
        return;
      }
      
      if (file.size > 5000000) {
        alert('please check file size no over 5 MB.')
        this.dragging = false;
        return;
      }
      
      this.file = file;
      console.log(this.file);
      this.dragging = false;
    },
    removeFile() {
      this.file = '';
    }
    },
     computed: {
    extension() {
      return (this.file) ? this.file.name.split('.').pop() : '';
    }
  }
  }
</script>

<style scoped>
.center {
  margin: 10;
  position: absolute;
 
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
  >>> .my-custom-dialog {
    align-self: flex-start;
  position:absolute;
  overflow: hidden;
    z-index:9999;
    right: 0px;
  }
.imgdiv{
    min-width: 150px;
    margin-right:5px;
}
>>>.v-select.v-input--dense .v-chip {
    margin: 8px 4px 0 4px;
}
.data-card{
 margin-top:2em;
  width:13em;
  border-radius:5px !important;
  height:12em;
  border-left:8px solid #03A9F4 !important; 
}
.dropZone {
  width: 95%;
  margin-left:10px;
  height: 200px;
  position: relative;
  border: 2px dotted #03A9F4;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975A0;
}

.dropZone-info {
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5C5C5C;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 94%;
  margin-left:8px;
  height: 200px;
  position: relative;
  border: 2px dashed #03A9F4;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
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
.v-select.v-select--chips.v-select--chips--small .v-select__selections {
  padding:25px;
  margin:5px;
    min-height: 185px;
   
}

.theUsualHead{
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
.customRightClass{
  transform: translate(125%, 90px);
  
  transition: width 2s;
  animation-name: example;
}
.v-dialog {
    position: absolute;
    bottom: 0;
    right: 0;
}
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}
.customTransClass{
 right:0px
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

  margin-bottom: 10px;
border-bottom:4px solid #03A9F4;
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
    margin-top:20px;
    margin-right: 15px;
}
.dotted {
  height: 250px;
padding:20px;
   margin:5px;
    border: 2px dotted #03A9F4;
}
.subColomn{
    min-width:220px;
     margin-top:20px;
}
</style>