<template>
    <v-container justify="center">
        <v-dialog
         persistent
         v-model="show"
         width="70vw">
            <v-card width="70vw" class="mx-auto">
                <v-card-title style="padding: 6px;color: #808080;">
                    <v-layout style="height:8vh;display:flex;align-items:center;justify-content:flex-start">
                        <v-flex xs3 style="    justify-content: flex-start;display: flex;margin-left: 2vw;">
                            <h4 class="header-font">Selections</h4>
                        </v-flex>

                        <v-flex xs1><v-divider class="divider-size" inset vertical></v-divider></v-flex>

                        <v-flex>
                            <p></p>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-divider class="blueUline"></v-divider>

                 <div  class="optiondiv">
   <v-layout class="v-layout-align">
                    <v-flex xs2.4>
                        <button class="button-font" style="margin-bottom:10%" @click="manageItem('entity')">
                            <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                                <v-icon style="position: absolute;right: 2px; top: 0px;"  justify="right" class="icon-align" small color="success">fa-check-circle</v-icon>
                                    <img src="../assets/master/rafiki.png" style="height: 110px;padding: 5px;" width="100%">
                            </v-card>
                            Entity Profile
                        </button>
                    </v-flex>

                    <v-flex xs2.4> 
                        <button class="button-font" style="margin-bottom:10%" @click="manageItem('financial')">
                            <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                                <v-icon style="position: absolute;
    right: 2px;
    top: 0px;" class="icon-align" small color="success">fa-check-circle</v-icon>
                                    <img src="../assets/master/financial.png" style="height: 110px;padding: 5px;" width="100%">
                            </v-card>
                            Financial Details
                        </button>
                    </v-flex>

                    <v-flex xs2.4>
                        <button class="button-font" style="margin-bottom:10%" @click="manageItem('director')"> 
                            <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                                <v-icon style="position: absolute;
    right: 2px;
    top: 0px;"   class="icon-align" small color="success">fa-check-circle</v-icon>
                                    <img src="../assets/master/proprietor.png" style="height: 110px;padding: 5px;" width="100%">
                            </v-card>
                            Director
                        </button>
                    </v-flex>

                    <v-flex xs2.4>
                        <button class="button-font" style="margin-bottom:10%" @click="manageItem('securities')"> 
                            <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                                <v-icon style="position: absolute;right: 2px;top: 0px;" v-if="selectionOptions.includes('securities')" class="icon-align" small color="success">fa-check-circle</v-icon>
                                    <img src="../assets/master/securites.png" style="height: 110px;padding: 5px;" width="100%">
                            </v-card>
                            Securities
                        </button>
                    </v-flex>
                    <v-flex xs2.4>
                        <button class="button-font" style="margin-bottom:10%" @click="manageItem('stakeholder')">
                            <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                                <v-icon style="position: absolute;right: 2px;top: 0px;" v-if="selectionOptions.includes('stakeholder')" class="icon-align" small color="success">fa-check-circle</v-icon>
                                    <img src="../assets/master/stakeholder.png" style="height: 110px;padding: 5px;" width="100%">
                            </v-card>
                            Stakeholder
                        </button>
                    </v-flex>
                </v-layout>

                <v-layout class="v-layout-align" style="margin:0% 10% 0% 10%">
                    <v-flex xs2.4> 
                        <button class="button-font" style="margin-bottom:10%" @click="manageItem('auditordetails')">
                            <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                                <v-icon style="position: absolute;right: 2px;top: 0px;" v-if="selectionOptions.includes('auditordetails')" class="icon-align" small color="success">fa-check-circle</v-icon>
                                    <img src="../assets/master/auditor.png" style="height: 110px;padding: 5px;" width="100%">
                            </v-card>
                            Auditor Details
                        </button>
                    </v-flex>

                    <v-flex xs2.4> 
                        <button class="button-font" style="margin-bottom:10%" @click="manageItem('investmentdetails')">
                            <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                                <v-icon v-if="selectionOptions.includes('investmenils')" class="icon-align" small color="success">fa-check-circle</v-icon>
                                    <img src="../assets/master/investment.png" height="106px" width="100%" >
                            </v-card>
                            Investment Details
                        </button>
                    </v-flex>

                    <v-flex xs2.4  style="margin-bottom:2%"> 
                        <button class="button-font" @click="manageItem('fixedassetsregister')">
                            <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                                <v-icon style="position: absolute;right: 2px;top: 0px;" v-if="selectionOptions.includes('fixedassetsregister')" class="icon-align" small color="success">fa-check-circle</v-icon>
                                    <img src="../assets/master/fixedasset.png" height="105px" width="100%" >
                            </v-card>
                            Fixed assets register
                        </button>
                    </v-flex>

                    <v-flex xs2.4  style="margin-bottom:2%"> 
                        <button class="button-font" @click="manageItem('inventory')">
                            <v-card class="mx-auto" width="135px" height="125px" style="border-radius:2px;padding: 10px;margin-bottom: 7px;">
                                <v-icon style="position: absolute;right: 2px;top: 0px;" v-if="selectionOptions.includes('inventory')" class="icon-align" small color="success">fa-check-circle</v-icon>
                                <v-card-text>
                                    <img src="../assets/master/inventory.png" style="height: 90px;padding: 5px;" width="100%" >
                                </v-card-text>
                            </v-card>
                            Inventory
                        </button>
                    </v-flex>
                </v-layout>
                </div>
                <div class="btn-align">
                <v-btn class="ma-2" color="#03a9f4" style="color:white" @click="saveNewMenu">Finish</v-btn>
                <v-btn class="ma-2" outlined color="#03a9f4"  @click.stop="show=false">Cancel</v-btn>
            </div>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
  props: ['visible'],
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  data(){
return{
    selectionOptions:[]
}
  },
    async mounted(){
//      if(this.$store.getters.getMasterData.configDetails[0].config.selection&&
//      this.$store.getters.getMasterData.configDetails[0].config.selection.length>0){
//        this.selectionOptions=JSON.parse(sessionStorage.getItem('setSidebarMenu')).data;

//      }
//      console.log(this.$store.getters.getMasterData,"789")
//      console.log(this.$store.getters.selectedEntity,"78910")
// console.log(this.dataChoice,this.masterChoice,"dataa ")
 this.selectionOptions=sessionStorage.getItem('selectedOptions').split();
 console.log(this.selectionOptions)
    },
  methods:{
      manageItem(item){
if(this.selectionOptions.includes(item)){
  this.selectionOptions=this.selectionOptions.filter(e => e !== item)

}
else{
  this.selectionOptions.push(item)
}
      },
            async saveNewMenu(){
try{     
   ["entity","financial","directors"].forEach(val=>{
        if(this.selectionOptions.indexOf(val)==-1)this.selectionOptions.push(val)
    })
            // var res = await this.$apiService.post('/master',{configDetails:{selection:this.selectionOptions},financialid:sessionStorage.getItem("financialId")});
 sessionStorage.setItem("selectedOptions",JSON.stringify({"data":this.selectionOptions}));
sessionStorage.setItem("setSidebarMenu",JSON.stringify({data:[
        {
          action: 'mdi-home',
          hasSubmenu:false,
          items: [{ title: 'List Item' }],
          title: 'Home',
        },
           {
          action: 'mdi-view-dashboard',
          hasSubmenu:false,
          items: [{ title: 'List Item' }],
          title: 'Dashboard',
        },
        {
          action: 'mdi-medium',
          hasSubmenu:true,
          active: true,
          items: [
             { title: 'Entity Profile',active:this.selectionOptions.includes('entity')?true:false },
             { title: 'Financials',active:this.selectionOptions.includes('financial')?true:false },
            { title: 'Proprietor',active:this.selectionOptions.includes('proprietor')?true:false },
             { title: 'Directors',active:this.selectionOptions.includes('directors')?true:false },
            { title: 'Securities',active:this.selectionOptions.includes('securities')?true:false },
            { title: 'Stake Holders',active:this.selectionOptions.includes('stakeholder')?true:false },
            { title: 'Auditor Details',active:this.selectionOptions.includes('auditordetails')?true:false },
            { title: 'Investment Details',active:this.selectionOptions.includes('investmentdetails')?true:false },
            { title: 'Fixed Asset Register',active:this.selectionOptions.includes('fixedassetsregister')?true:false },
            { title: 'Inventory',active:this.selectionOptions.includes('inventory')?true:false },
          ],
          title: 'Masters',
        },
        {
          action: 'mdi-tag-multiple',
          items: [{ title: 'List Item' }],
          title: 'Tagging',
        }]}))

console.log(this.show,"master bool")
this.show=false;    
this.$router.push({name: 'EntityProfile'});
            
        }
        catch(error) {
         console.log(error,"this is")
           }
        
      },
  }
}
</script>

<style scoped>
.divider-size{
    border-right: 1px solid grey;
        height: 25px;
    margin-left: 1%;
    margin-right: 1%;
}
.blueUline{
    width:100%;
    border: 1.2px solid #03a9f4!important;
    margin-bottom: 3%;
    background-color: #03a9f4;
}

.btn-align{
    text-align: right;
    margin-right: 45px;
    padding: 1%;
    padding-top: 0px;
}
.button-font{
font-size: 14px !important;
font-style: normal;
font-weight: 400 !important;
color: #6f6f6f !important;
}
.icon-align{
  display:flex !important;
  justify-content:flex-end !important;
  padding:2%;
}
.header-font{
font-size: 20px !important;
font-style: normal;
font-weight: 500 !important;
}
</style>