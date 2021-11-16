<template>
    <div>
    <v-dialog content-class="my-custom-dialog"
      v-model="addFirmDialog"
      width="500"
      height="700"
      transition="dialog-bottom-transition">
<h1 class="text-h5 lighten-2 popup-allotment-title" style="font-size:30px !important">
          {{ header_name }}
        </h1>
<v-divider class="blueUline2"></v-divider>
<v-layout style="display:block;margin:4% 13% 2% 13%;">
                        <v-select
                    v-model="firmName"
                    :items="firmname_items"
                    v-if="this.addFirm==false"
                    outlined
                    dense
                    @change="onChangeExistingFirm"
                    style="width:373px"
                    label="Firm Name"
                    required
                ></v-select>
                <v-text-field autocomplete="off" 
                            v-model="textFirmName"
                            outlined
                            v-if="this.addFirm==true"
                            dense
                             style="width:373px"
                            label="Firm Name"
                            required
                        ></v-text-field>
                <v-text-field autocomplete="off" 
                            v-model="firmReg"
                            outlined
                            :disabled="this.addFirm==false"
                            dense
                             style="width:373px"
                            label="Firm Reg.No."
                            required
                        ></v-text-field>
</v-layout>
<v-divider class="blueUline2"></v-divider>
<v-btn
                class="ma-2 button-font"
                color="primary"
                style="background-color: #0398DC !important;border-color:#0398DC !important; text-transform:none;"
                 @click="()=>{if(this.header_name == 'Add Existing Firm')this.addExistingFirmData();else this.addNewFirmData()}"
            >
              Add
            </v-btn>
        </v-dialog>
       <v-layout>
            <v-flex xs1  style="margin-left:4%">
                <p></p>
                 <img src="../assets/profile-icon.png" height="60%" width="60%"/>
            </v-flex>

            <v-flex xs4 style="display:flex;align-items:center">
                <h4 class="company-font">Shwetha Enterprises</h4>
                <h5 class="year-font">FY 2021-22</h5>
                 <v-divider
                inset
                vertical
                class="divider-size"
                ></v-divider>
            </v-flex>

            <v-flex style="display:flex;align-items:center">
                <h6 class="data-font"></h6>
            </v-flex>
        </v-layout>

        <v-divider class="blueUline"></v-divider>

        <v-card
        max-width="100%"
        class="table-align"
        >
        <v-card-title class="card-align">
            <button class="buttonDir-font" @click="addExistingFirm()">
                <v-icon>mdi-plus</v-icon>
                    Add Existing Firm
            </button>
            <v-divider
            inset
            vertical
            style="max-height:25px;color: #C4C4C4;margin-top:1%"
            ></v-divider>
            <button class="buttonDir-font"  @click="addNewFirm()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Add New Firm
            </button>
             <v-divider
            inset
            vertical
            style="max-height:25px;color: #C4C4C4;margin-top:1%"
            ></v-divider>
            <button class="buttonDir-font">
                <v-icon small style="color:black">far fa-trash-alt</v-icon>
                    Delete
            </button>
        </v-card-title>
        <v-data-table
        
            :items="auditorfirm"
            :headers="headers"
            
            class="elevation-1"
         
        >
<template v-slot:item.actions="{ item }" >
      <div style="display:flex;justify-content:space-between;align-items:center;margin-right:1rem">
      <button class="action-button"  @click="addMember(item)">
                <v-icon style="color:#0398DC;width:12px;height:12px;margin-right:8px">mdi-plus</v-icon>
                    Add Member
            </button>
            <v-menu bottom offset-y="true" right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  style="color:black;width:3px;height:3px;font"
                  >mdi-dots-vertical</v-icon
                >
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title @click="(e)=>editItem(item)"
                    ><v-icon style="margin-right: 5px"
                      >mdi-pencil-outline</v-icon
                    >Edit</v-list-item-title
                  >
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title @click="deleteItem(item)"
                    ><v-icon style="margin-right: 5px"
                      >mdi-delete-outline</v-icon
                    >Delete</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
      </div>
    </template>
        </v-data-table>
            
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Proprietor1',
    components:{

    },
    data(){
        return{
            selectedAuditor: [],
            addFirmDialog:false,
            contacts:[],
            addFirm:false,
            existingfirm:[],
            firmName:"",
            firmReg:"",
            auditorfirm:[],
            firmname_items:[],
            headers:[
                {text:'Name of the Firm' , value:'firmName', align: 'center'},
                {text:'Address' , value:'firmAddress.floor', align: 'center'},
                {text:'FRN' , value:'firmRegNumber', align: 'center'},
                {text:'Type' , value:'firmType', align: 'center'},
                {text:'Members' , value:'memberCount', align: 'center'},
                {text:'' , value:'actions', align: 'center', sortable: false}
            ],
            ownershipDetails:[],
    filteredData:{name:"",address:"",designation:"",pan:""},
        }
    },
    async mounted() {
    var res = await this.$apiService.post(
          "/auditor/firm/get",
          {companyId:Number(sessionStorage.getItem("companyId")),financialId:Number(sessionStorage.getItem("financialId"))}
        );
        if (res && res.status === 200) {
            console.log(res.data.data,"ressss")
            this.auditorfirm = [res.data.data];
            
        //   res.data.data.forEach((val,idx) => {              
        //       this.auditorfirm.push({
        //       firmName: val.firmName,
        //       firmRegNumber: val.firmRegNumber,
        //       firmType: val.firmType,
        //       firmAddress:val.firmAddress,
        //       addressDetail:(val.firmAddress.floor,val.firmAddress.area,val.firmAddress.city,val.firmAddress.pincode,val.firmAddress.state,val.firmAddress.country),
        //       firmContacts: val.firmContacts,
        //       members:val.memberCount,
        //       index:idx
        //     });
        //   });
          console.log(this.auditorfirm,"auditor firmmmmm3")
        }
  },
    methods:{
        handleClick(){
            console.log("Hello")
        },
        onChangeExistingFirm(val){
           console.log(val,"vallll")
           const filteredFirm = this.existingfirm.filter(e => e.exisitngfirmName === val);
           this.firmReg = filteredFirm[0].existingfirmRegNo
//            this.firmReg = this.existingfirm.filter(function(elem){
//                console.log(elem.existingfirmName,"elemmmm")
//     if(elem.existingfirmName==val)
//     {
//         alert("hiiiii")
// return elem.existingfirmRegNo;
//     } 
// });

        },
         editItem(item){
  console.log(item,"itemmm");
          this.addFirmDialog=true;
          this.header_name="Edit Firm"; 
          this.firmName=item.firmName;
          this.firmReg=item.firmReg;
          this.selectedAuditor=item;
          console.log(item);
      },
             async deleteItem(item) {
      const deleteFirmDetails = {
        firmId: item.firmId
      };

        var res = await this.$apiService.post(
          "/auditor/firm/delete",
          deleteFirmDetails
        );
        if (res && res.status === 200) {
            console.log(res,"delete res");
           this.auditorfirm.splice(this.selectedAuditor.index,1);
        }
    },
    addMember(item){
      this.$router.push({
        name: "AddMember",
        params: { firmData: this.auditorfirm },
      });
      this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
    },
     add(){
            this.contacts.push({ name: '', email: '', phone: '' });
        },
        remove(index) {
            this.contacts.splice(index, 1);
        },
        addNewFirm(){
            this.header_name="Add New Firm";
   this.addFirmDialog=true;
   this.addFirm=true;
    },
    async addExistingFirm()
      {
        this.header_name="Add Existing Firm";
        this.addFirmDialog=true;
        this.addFirm=false;
         var res = await this.$apiService.post(
          "/auditor/firm/getexist",
          {organizationId:Number(sessionStorage.getItem("orgId"))}
        );
        if (res && res.status === 200) {
          res.data.data.forEach((val,idx) => {              
              this.existingfirm.push({
              existingfirmId: val.id,
              exisitngfirmName: val.name,
              existingfirmRegNo: val.regno,
              index:idx
            });
          });
          this.existingfirm.map((val)=>{
              if(val.exisitngfirmName)
              {
                  this.firmname_items.push(val.exisitngfirmName);
              }
          })
        }
      },
async addExistingFirmData()
      {
          const filteredFirm = this.existingfirm.filter(e => e.exisitngfirmName === this.firmName);
          const addExistingFirmData ={
  firmId: filteredFirm[0].existingfirmId,
    companyId:Number(sessionStorage.getItem("companyId")),
    financialId:Number(sessionStorage.getItem("financialId"))
}
console.log(filteredFirm,addExistingFirmData,"exisitngggg")
    var res1 = await this.$apiService.post(
          "/auditor/firm/addexist",
          addExistingFirmData
        );
        if (res1 && res1.status === 200) {
            console.log(res1.data.data,"yipppeee")
            //let result = res1.data.data;
            this.auditorfirm.push(res1.data.data);
        // res1.data.data.forEach((val,idx) => {              
        //       this.auditorfirm.push({
        //       firmName: val.firmName,
        //       firmRegNumber: val.firmRegNumber,
        //       firmType: val.firmType,
        //       firmAddress:val.firmAddress,
        //       addressDetail:(val.firmAddress.floor,val.firmAddress.area,val.firmAddress.city,val.firmAddress.pincode,val.firmAddress.state,val.firmAddress.country),
        //       firmContacts: val.firmContacts,
        //       members:val.memberCount,
        //       index:idx
        //     });
        //   });
              this.addFirmDialog=false;
        }
        else{
            this.addFirmDialog=false;
        }
           this.$router.push({
        name: "AddNewFirm",
        params: { firmData: this.auditorfirm },
      });
      },
      addNewFirmData(){
          this.addFirmDialog=false;
      }
}
}
</script>


<style scoped>
>>> .my-custom-dialog {
    align-self: flex-end;
  position:absolute;
  
    z-index:9999;
    right: 0px;
    margin-bottom:25%;
    background:white !important;
    overflow:hidden;
  }
h3{
    margin: 20px;
}
h2{
    color: #03a9f4;
    margin-top: 2vh;
    margin-bottom: 1vh;
}
h6{
    font-size: 14px;
}
button{
    top: 1%;
    font-size: 14px;
    margin: 10px;
}
.divider-size{
    border-right: 1px solid rgba(64, 64, 64, 0.25);
    height: 4em;
    margin-top:4%;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.container-align{
    margin-top: 2vh;
    text-align: left;
    margin-left:100px;
}
.img-border{
    border-radius: 50%;
}
.table-align{
    margin-top: 40px;
}
.text-field-class{
    max-width: 20%;
    margin-right: 30px;
}
.buttonPro-font{
    
font-size: 18px;
font-style: normal;
font-weight: 400;
}
.company-font{
    
font-size: 26px !important;
font-style: normal;
font-weight: 700;
color: #0398DC;
margin:0% 1% 1% 0%;
}
.year-font{
    
font-size: 22px !important;
font-style: normal;
font-weight: 700;
margin:0% 8% 1% 5%;
}
.data-font{
    
font-size: 17px !important;
font-style: normal;
font-weight: 400;
line-height: 23px;
text-align:left;
margin-left:3%;
}
.buttonDir-font{

font-size: 18px !important;
font-style: normal;
font-weight: 400;
color:black;
margin-right:2%;
margin-left:2%;
}
.action-button{
font-size: 16px !important;
font-style: normal;
font-weight: 400;
color:#0398DC;
}
.popup-allotment-title{
font-style: normal;
font-weight: 700 !important;
color:#0398DC;
margin:5% 3% 3% 13%;
text-align:initial;
}
.button-font{
    
font-size: 18px !important;
font-style: normal;
font-weight: 500;
width:118px;
height:42px;
margin-bottom:4%;
}
</style>