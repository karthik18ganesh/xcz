<template>
 <v-app style="height:100%"> 
 <!-- <vue-confirm-dialog></vue-confirm-dialog> -->
    <v-main  v-bind:class="{appbar: !/Login|/i.test(this.$router.history.current.name)}">
     
  <v-app-bar v-bind:class="{appbarDisplay: /Login|/i.test(this.$router.history.current.name)}"
    max-height="52"
        app
        color="#282828e6"
        dark
       v-if="!/Login|/i.test(this.$router.history.current.name)"
    >
        <!-- <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon> -->
        <!-- v-if="/TaggingDsiplay/i.test(this.$router.history.current.name)" -->
        <div class="d-flex align-center">
        </div>
        <v-toolbar-title>
          <h4 v-if="/EntitiesFinancial/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 15px;">Entity Financial</h4> 
          <h4 v-if="/clientusers/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 15px;">Client Users</h4> 
          <h4 v-if="/adminentities/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 15px;">Entities</h4> 
          <h4 v-if="/admingroup/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 15px;">Groups</h4>          
          <h4 v-if="/adminusers/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 15px;">Users</h4>          
          <h4 v-if="/adminorganization/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 40px;">Organization</h4>          
          <h4 v-if="/Financials/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 40px;">Financials</h4>          
          <h4 v-if="/Stakeholder/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 40px;">Stakeholder</h4>
          <h4 v-if="/NewIssue/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 40px;">Issues</h4>
          <h4 v-if="/Securities/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 40px;">Securities</h4>
          <h4 v-if="/Directors|AddDirector/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 40px;">Directors</h4>
          <h4 v-if="/EntityProfile/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 40px;">Entity Profile</h4>
          <h4 v-if="/Dashboard/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 15px;">Dashboard</h4>
          <h4 v-if="/HomeScreen|AddCompanyDetails/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 15px;">Kumar and Associates</h4>
          <h4 v-if="/tagging/i.test(this.$router.history.current.name)" style="font-size: 15px;margin-bottom: 15px;margin-left: 15px;">{{fina && fina.company_name?fina.company_name:"BSY Private Limited"}}</h4>
          <!-- <h4 v-if="this.$store.getters.selectedEntity">{{this.$store.getters.selectedEntity.company_name}}</h4> -->
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <div class="text-center">
    <v-menu
      v-model="adminMenu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
     
          v-bind="attrs"
          v-on="on"
              icon
        
             
            >
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        
      </template>
    
      <v-card style="max-width:500">
        <v-row>
          <v-col cols="3">
                 <v-list-item class="menu">
            <v-list-item-avatar  >
              <img
              size="48"
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="Sharan"
              >
            </v-list-item-avatar>
                 </v-list-item>
          </v-col>
              <v-col cols="8">
                <h4 style="float:left;margin-top:4px;padding-top:2px" class="theUsualHeader">{{$store.getters.userData&&$store.getters.userData.username?$store.getters.userData.username:'Guest User'}}</h4><br>
                 <p style="float:left;margin-top:1px;padding-top:3px;font-size: 14px;" class="normalfnt" >{{$store.getters.userData&&$store.getters.userData.email?$store.getters.userData.email:'test@nocompany.com'}}</p>
              </v-col>
        </v-row>
      
        <v-divider height="400" color="#1ea4df"></v-divider>

        <v-list
        dense
        nav
      >
        <v-list-item class="menu normalfnt"
          v-for="item in items"
          :key="item.title"
          link
          @click="userAdminClick(item)"
        >
          <v-list-item-icon>
       
                <v-btn
      class="mx-1"
      fab
      dark
      x-small
      color="#f0f0f0"
    >
      <v-icon color="black" >
      {{ item.action }}
      </v-icon>
    </v-btn>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

       
      </v-card>
    </v-menu>
  </div>
      
      
    </v-app-bar>
           <v-navigation-drawer v-if="!/Login|HomeScreen|AddCompanyDetails|/i.test(this.$router.history.current.name) && !$store.getters.adminDashboardEnabled" class="drawer" :mini-variant.sync="mini" app :permanent="$vuetify.breakpoint.mdAndUp" v-model="drawer"
     :touchless="$vuetify.breakpoint.mdAndUp ? true : false" >
              <div class="isoLogoWrapper">
 <span style="float:right;margin:10px">    <v-icon color="black"  v-bind="attrs"
                @click="mini=!mini" dark>mdi-menu</v-icon></span>
              </div>
   
<v-divider></v-divider>
   
     
     <v-list>
       <div class="sidebarText" v-for="item in getSideBar()"  :key="item.title">
      <v-list-item  @click="navigateToSection(item)" style="float:left;align-items:left" v-if="!item.hasSubmenu">
        <v-list-item-icon>
          <v-icon>{{item.action}}</v-icon>
        </v-list-item-icon>

        <v-list-item-title >{{item.title}}</v-list-item-title>
      </v-list-item>
      <v-list-group v-else
      style="float:left;align-items:left"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        
      >
        <template v-slot:activator>
          <v-list-item-content >
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <div v-for="child in item.items"
          :key="child.title">
        <v-list-item
         
          v-if="child.active"
           @click="navigateToSection(child)"
        >
          <v-list-item-content >
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </div>
      </v-list-group>
      
       </div>
     </v-list>
  </v-navigation-drawer>
     <v-navigation-drawer  v-if="$store.getters.adminDashboardEnabled"  class="drawer" :mini-variant.sync="mini" app :permanent="$vuetify.breakpoint.mdAndUp" v-model="drawer"	
     :touchless="$vuetify.breakpoint.mdAndUp ? true : false" >
              <div class="isoLogoWrapper">
 <span style="float:right;margin:10px">    <v-icon color="black"  v-bind="attrs"
                @click="mini=!mini" dark>mdi-menu</v-icon></span>
              </div>
   
<v-divider></v-divider>
   
     
     <v-list>
       <div class="sidebarText" v-for="item in adminMenuItems"  :key="item.title">
      <v-list-item  @click="navigateToAdminSection(item)" style="float:left;align-items:left" v-if="!item.hasSubmenu">
        <v-list-item-icon>
          <v-icon>{{item.action}}</v-icon>
        </v-list-item-icon>

        <v-list-item-title >{{item.title}}</v-list-item-title>
      </v-list-item>
      <v-list-group v-else
      style="float:left;align-items:left"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        
      >
        <template v-slot:activator>
          <v-list-item-content >
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <div v-for="child in item.items"
          :key="child.title">
        <v-list-item
         
          v-if="child.active"
           @click="navigateToSection(child)"
        >
          <v-list-item-content >
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </div>
      </v-list-group>
      
       </div>
     </v-list>
  </v-navigation-drawer>
     <Loader :is-visible="$store.getters.isLoading"></Loader>
    

      <router-view/>
      
    </v-main>
 </v-app>

  
  





 
</template>

<script>

import Loader from './components/Loader'

export default {
  name: "App",
  components: {
    Loader
  },
  mounted(){
//     this.getCompanies();
//     this.getTagHeaders();
this.fina = JSON.parse(sessionStorage.getItem("fina"))?JSON.parse(sessionStorage.getItem("fina")):{}
  },
  beforeMount(){
  },
  data(){
    return{
      adminMenuItems:[ {	
          action: 'mdi-home',	
          hasSubmenu:false,	
          items: [{ title: 'List Item' }],	
          title: 'Dashboard',	
          url:"myaccount"	
        },	
        {	
          action: 'mdi-home-modern',	
          hasSubmenu:false,	
          items: [{ title: 'List Item' }],	
          title: 'Organization',	
          url:"organization"	
        },	
          {	
          action: 'mdi-account-check',	
          hasSubmenu:false,	
          items: [{ title: 'List Item' }],	
          title: 'Users',	
          url:"users"	
        },	
           {	
          action: 'mdi-account-multiple',	
          hasSubmenu:false,	
          items: [{ title: 'List Item' }],	
          title: 'Groups',	
          url:"groups"	
        }	,
         {	
          action: 'mdi-chart-bar',	
          hasSubmenu:false,	
          items: [{ title: 'List Item' }],	
          title: 'Entities',	
          url:"entities"	
        }	,
           {	
          action: 'mdi-account-multiple-outline',	
          hasSubmenu:false,	
          items: [{ title: 'List Item' }],	
          title: 'Client Users',	
          url:"clientusers"	
        }	,
           {	
          action: 'mdi-account-star',	
          hasSubmenu:false,	
          items: [{ title: 'List Item' }],	
          title: 'Privileges',	
          url:"privileges"	
        },
        {	
          action: 'mdi-bell-ring-outline',	
          hasSubmenu:false,	
          items: [{ title: 'List Item' }],	
          title: 'Subscription',	
          url:"subscription"	
        }
        ],
       adminMenu:false,
      mini:true,
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      showAddCompany: true,
      showImportCompany: true,
      testText:"Initial Text",
      drawer:false,
      items: [
        {
          action: 'mdi-account',
          hasSubmenu:false,
          items: [{ title: 'List Item' }],
          title: 'My Account',
           url:"myaccount"
        },
           {
          action: 'mdi-view-dashboard',
          hasSubmenu:false,
          items: [{ title: 'List Item' }],
          title: 'Admin Console',
           url:"adminconsole"
        },
        {
          action: 'mdi-logout-variant',
          items: [{ title: 'List Item' }],
          title: 'Sign Out',
        }
        
      ]
    }
  },
  methods:{
    getSideBar(){
      console.log(this.$store.getters.adminDashboardEnabled,this.$store.getters.sidebarMenu)
      if(this.$store.getters.adminDashboardEnabled){
        return this.$store.getters.sidebarMenu;
      }
      else
      return JSON.parse(sessionStorage.getItem('setSidebarMenu'))?JSON.parse(sessionStorage.getItem('setSidebarMenu')).data:[ {
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
  }]
    },
      userAdminClick(item){
      if(item.url&&item.url=='adminconsole'){
        this.adminMenu=false;
        this.$store.commit('setAdminDashboard',true);
         this.$router.push({ path: 'admindashboard' }).catch(()=>{});  

      }
      

    },
        navigateToAdminSection(item){
      if(item.url=='organization'){
this.$router.push({ path: 'adminorganization' }).catch(()=>{}); 
      }
       else if(item.url=='myaccount'){
this.$router.push({ path: 'admindashboard' }).catch(()=>{}); 
      }
        else if(item.url=='users'){
this.$router.push({ path: 'adminusers' }).catch(()=>{}); 
      }
         else if(item.url=='groups'){
this.$router.push({ path: 'admingroup' }).catch(()=>{}); 
      }
          else if(item.url=='entities'){
this.$router.push({ path: 'adminentities' }).catch(()=>{}); 
      }
           else if(item.url=='clientusers'){
this.$router.push({ path: 'clientusers' }).catch(()=>{}); 
      }
          else if(item.url=='privileges'){
this.$router.push({ path: 'privileges' }).catch(()=>{}); 
      }
          else if(item.url=='subscription'){
this.$router.push({ path: 'subscription' }).catch(()=>{}); 
      }

    },
   toggleDrawer(){
this.drawer=!this.drawer;
this.mini=!this.mini;
console.log(this.drawer,"toggleDrawer")
   },
    changeText(){
this.testText=""
    },
    togglePopup(){
      this.showAddCompany = !this.showAddCompany;
      this.showImportCompany = !this.showImportCompany
    },
    async getCompanies(){
       try{          
            var res = await this.$apiService.get('/company/getlist');
            if(res&&res.status === 200) {
                this.$store.commit("setCompanies" , res.data); 
        
              if (res.data.status === "error") {
        console.log("error");
              } 
            
            
        }}
        catch(error) {
          this.showError("Unable to Get Company Details");
           }
    },
   
    navigateToSection(item){
      
      if(item.title=='Tagging'){
        
      if(sessionStorage.getItem("reportId"))
      this.$router.push({
        name: "TaggingDsiplay",
        params: { },
      });
      else 
      this.$router.push({
        name: "Tagging",
        params: { },
      }); 
      }
      else if(item.title=='Home'){
        this.$store.commit("setSidebar",false);
        this.$store.commit("setSidebarMenu",[ {
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
  }]);
          this.$router.push({ path: '/homescreen' }); 
      }
      else if(item.title=='Entity Profile'){
          this.$router.push({ path: 'EntityProfile' }); 
      }
        else if(item.title=='Directors'){
          this.$router.push({ path: 'Directors' }); 
      }
          else if(item.title=='Proprietor'){
          this.$router.push({ path: 'Proprietor' }); 
      }
      
       else if(item.title=='Financials'){
          this.$router.push({ path: 'Financials' }); 
      }
      else if(item.title=='Dashboard'){
      
          this.$router.push({ path: 'dashboard' }); 
          
      }
        else if(item.text=='Financials'){
      
          this.$router.push({ path: 'financials' }); 
          
      }
       else if(item.title=='Securities'){
      
          this.$router.push({ path: 'securities' }); 
          
      }
        else if(item.title=='Stake Holders'){
      
          this.$router.push({ path: 'stakeholder' }); 
          
      }
        else if(item.title=='Auditor Details'){
      
          this.$router.push({ path: 'auditfirminfo' }); 
          
      }
       else if(item.title=='Investment Details'){
      
          this.$router.push({ path: 'investments' }); 
          
      }
       else if(item.title=='Fixed Asset Register'){
      
          this.$router.push({ path: 'fixedassets' }); 
          
      }

    },
    async getTagHeaders(){
       try{          
            var res = await this.$apiService.get('/taggingtree/innestedjson/1');
            if(res&&res.status === 200) {
                this.$store.commit("setTagHeaders" , res.data); 
               
               
              if (res.data.status === "error") {
        console.log("error");
              } 
            
            
        }}
        catch(error) {
          this.showError("Unable to Get Company Details");
           }
    },
     async getCompaniesType(){
        try{          
            var res1 = await this.$apiService.get('/company/getCompanyTypelist');
            if(res1 && res1.status === 200) {
                this.$store.commit("setCompaniesType" , res1.data); 
                console.log(res1.data,"companiesType")
            if (res1.data.status === "error") {
                console.log("error");
            } 
            }
          }
          catch(error) {
            this.showError("Unable to Get Company Type");
          }
        },
        async getAssignedUsers(){
        try{          
            var res2 = await this.$apiService.get('/company/getuserlist');
            if(res2 && res2.status === 200) {
                this.$store.commit("setAssignedUser" , res2.data); 
                console.log(res2.data,"assignedUser")
            if (res2.data.status === "error") {
                console.log("error");
            } 
            }
          }
          catch(error) {
            this.showError("Unable to Get Assigned User");
          }
        }
  }
};
</script>

<style scoped>
/deep/.v-list-group__items {
    padding-left: 55px;
}
.appbarDisplay{
  display: none !important;
}

.appbar{
  padding-top: 52px !important;
}
.btnClass{
  background: #2c3e50;
  color:white;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
.isoLogoWrapper{
  height:50px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
.drawer{
  border-right:1px solid #dee7f0;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

.img_noti{
  position: absolute;
  right: 70pt;
}

.img_signup{
  position: absolute;
  right : 25pt;
}
.icon-row{
  display: flex;
  margin-bottom:15pt;
}
.column{
  flex: 100%;
}
 .v-list-item--active {
   background: linear-gradient(to right, #0398DC 10px, rgba(3,152,220,0.15) 5%);
}

</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam&display=swap');

*{
  font-family: 'Be Vietnam';
}
/deep/ .v-input__control {
    min-height: 5Vh !important;
}
/deep/ input{
  color: #404040 !important;
}

/deep/ .v-input input {
  font-size: 0.8rem !important;
}

.blueC{
  color: #309CCC;
}

.blackC{
  color: #404040;
}

.whiteC{
  color:white;
}

.blueBC{
  background-color: #309CCC;
}

.blackBC{
  background-color: #404040;
}

.whiteBC{
  background-color:white;
}


/* .btnClass{
  background: #2c3e50;
  color:white;
} */
/* #app {
  font-family: 'Be Vietnam', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* #nav {
  padding: 0px;
}
.isoLogoWrapper{
  height:50px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
.drawer{
  border-right:1px solid #dee7f0;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

.img_noti{
  position: absolute;
  right: 70pt;
}

.img_signup{
  position: absolute;
  right : 25pt;
}
.icon-row{
  display: flex;
  margin-bottom:15pt;
}
.column{
  flex: 100%;
}
.v-list-item, .v-list-group {
  width:100%;
}
.v-list-item__title {
  text-align:left;
}

.theUsualHead{
  color: #03A9F4;
  font-weight: 600
}

 menu.v-list-item--active {
  
  /* background: linear-gradient(0deg, rgba(3,152,220,0.15) 50%, rgba(3,152,220,0.15) 100%); */
   /* background-image: linear-gradient(90deg, #0398DC 10px, transparent calc(100% - 10px)); */
   /* background: linear-gradient(to right, #0398DC 10px, rgba(3,152,220,0.15) 5%);
}

.v-btn{
  text-transform:none !important;
}
/deep/ .table > tbody > tr > td {
font-size: 16px !important;
font-style: normal;
font-weight: 400 !important;
}
/deep/ thead{
font-size: 18px !important;
font-style: normal;
font-weight: 500 !important;
}
.theUsualHeader{
  color: #03A9F4;
  font-weight: 600;
}
.normalfnt{
}  */
</style>





