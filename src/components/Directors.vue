<template>
    <div>
  <v-layout>
            <v-flex xs1  style="margin-left: 2%;margin-top: 5px;">
                 <img src="../assets/profile-icon.png" height="50" width="50"/>
            </v-flex>

            <v-flex xs3 style="display:flex;align-items:center;justify-content:space-between">
                <h4 class="company-font">{{companyName}}</h4>
                 <!-- <v-divider
                inset
                vertical
                class="divider-size"
                ></v-divider> -->
            </v-flex>

            <v-flex style="display:flex;align-items:center">
      
            </v-flex>
        </v-layout>

        <v-divider class="blueUline"></v-divider>

<v-row class="card-align" style="margin: 20px 10px;display: flex;align-items: center;">
            <button class="buttonDir-font" style="margin-left: 50px;" @click="addDirector()">
                <v-icon style="color:black">mdi-plus</v-icon>
                    Add Director Details
            </button>
             <v-divider
            inset
            vertical
            style="margin-top: 1.2%;max-height: 15px;margin-left: 0.5%;margin-right: 0.5%;"
            ></v-divider>
            <button class="buttonDir-font">
                <v-icon style="color:black">mdi-arrow-collapse-down</v-icon>
                    Import
            </button>
             <v-divider
            inset
            vertical
            style="margin-top: 1.2%;max-height: 15px;margin-left: 0.5%;margin-right: 0.5%;"
            ></v-divider>
            <button class="buttonDir-font">
                <v-icon style="color:black">mdi-arrow-collapse-up</v-icon>
                    Export
            </button>
             <v-divider
            inset
            vertical
            style="margin-top: 1.2%;max-height: 15px;margin-left: 0.5%;margin-right: 0.5%;"
            ></v-divider>
            <button class="buttonDir-font">
                <v-icon small style="color:black">far fa-trash-alt</v-icon>
                    Delete
            </button>

            <v-spacer></v-spacer>

            <v-text-field
                dense
                outlined
                append-icon="mdi-magnify"
                class="text-field-class"
                placeholder="Search here"
                v-model="search"
                @input="onChangeSearch"
                hide-details
            >
            </v-text-field>
        </v-row>

        
        <v-data-table
            :headers="headers"
           :items="directorDetails"
            class="elevation-1 table-font"
            @click:row="directorRowClick"
        >
        
            <!-- <template v-slot:item="{ item }">
                <tr>
                    <template >
                    <td>{{ item.slno }}</td>
                    </template>
                    <td>{{ item.name }}</td>
                    <td>{{ getFormatDate(item.reportingperioddata.map(i => i.fromdate).join('')) }}
                         - {{ getFormatDate(item.reportingperioddata.map(i => i.fromdate).join(' ')) }}</td>
                    <td>{{ item.users.map(i => i.username).join(' ') }}</td>
                    <td>
                    </td>
                    <td>{{ getFormatDueDate(item.reportingperioddata.map(i => i.duedate).join('')) }}</td>
                </tr>
            </template> -->
        </v-data-table>

    </div>
</template>

<script>
export default {
    name: 'Directors1',
    components:{

    },
    data(){
        return{
            selected: [],
            companyName:[],
            directorDetails:[],
            headers:[
                {text:'Directors name' , value:'firstname', align: 'center'},
                {text:'Address' , value:'permanentadress.city', align: 'center'},
                {text:'Designation' , value:'directorshipdetails.designation', align: 'center'},
                {text:'DIN' , value:'directorshipdetails.din', align: 'center'},
                {text:'' , value:'', align: 'center', sortable: false}
            ],
        }
    },
     async mounted(){
         this.companyName = JSON.parse(sessionStorage.getItem("master")).entity[0].name;
 var res = await this.$apiService.post(
          "/master/getOwnership",
          {companyid:Number(sessionStorage.getItem("companyId")),financialid:Number(sessionStorage.getItem("financialId"))}
        );
        if (res && res.status === 200) {
            this.directorDetails = res.data.data;
console.log(this.directorDetails,"response")
        }
        },
    methods:{
    addDirector(){
   this.$router.push({ name: "AddDirector",params:{addNewDirector:true}}); 
      },
       directorRowClick(item) {
      this.selected=this.directorDetails.filter(val=>val.firstname==item.firstname);
      this.$router.push({ name: "AddDirector",params:{directorData:this.selected}});
      console.log(this.selected,this.directorDetails,"selected director")
    },
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
      font-size: 14px;
  }

  /deep/.theme--light.v-data-table {
    box-shadow: none !important;
  }
h3{
    margin: 20px;
}
h2{
    color: #03a9f4;
    margin-top: 2vh;
    margin-bottom: 1vh;
}
button{
    top: 1%;
    font-size: 14px;
    margin: 10px;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.container-align{
    margin-top: 2vh;
    text-align: left;
    margin-left:100px;
    font-weight: 200;
}
.table-align{
    margin-top: 20px;
}
.toolbar-align{
    margin-left: 50px;
    margin-right: 100px;
}
.toolbar-align1{
    margin-left: 100px;
}
.text-field-class{
    max-width: 20%;
    margin-right: 30px;
}
.buttonDir-font{

    font-size: 14px !important;
    font-style: normal;
    font-weight: 500;
    color: #000;
}
.company-font{
    
font-size: 18px !important;
font-style: normal;
font-weight: 600;
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
.table-heading{
font-size: 18px !important;
font-style: normal !important;
font-weight: 400 !important;
}
.divider-size{
    border-right: 1px solid rgba(64, 64, 64, 0.25);
    margin-top: 1.2%;
    max-height: 15px;
    margin-left: 0.5%;
    margin-right: 0.5%;
}


/deep/ .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 13px !important;
    font-weight: 600;
    background-color: #ecebeb;
    text-align: start !important;
    padding-left: 55px;
    color: #808080;
}

/deep/.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    font-size: 13px !important;
    text-align: start !important;
    padding-left: 4vw;
}
</style>