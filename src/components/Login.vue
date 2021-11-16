<template>
<div class="wrap">
    <div class="floatleft">
 <v-container fluid fill-height>
            <v-layout align-start justify-start style="height: 96vh;">
              
               <v-flex xs12 sm12 md12>
                   <v-flex class="loginHead" xs12 sm12 md12>
                      <h2 style="font-weight: 400;font-size: 1.75rem;letter-spacing: 1px;">Welcome</h2>
                  <h2 style="font-weight: 400;font-size: 1.75rem;letter-spacing: 1px;">to sheshi</h2>
                 
                </v-flex>
                <v-row class="loginSub" style="margin-left:5vw">
                  <v-col cols="12" class="pa-0 " style="margin-top: 2%;margin-left: 2%;margin-bottom:0px !important;">
                     <h3 style="float:left;font-weight:500;font-size:0.9rem">Login</h3><br>
                  
                  </v-col>
                    <v-col cols="12" class="pa-0" style="margin-top: 0px !important;max-width: 62%;text-align: start;margin-bottom: 2.5%;margin-left:2%">
                    <h5 style="float:left;font-weight:300;" class="normalFontSize">Login in with your data that you entered during your registration</h5>

                  
                  </v-col>
                </v-row>
                 <v-flex xs12 sm12 md12 style="margin-left:4vw">
                 <div class="loginDiv">
                           <v-text-field autocomplete="off" 
                            hide-details
                           dense   
                           solo
                           v-model="userName"
                           color="white"
                              name="login"
                              class="loginIPFields"
                              style="width:68%;background-color:white;margin: 5%;box-shadow: none;"
                              placeholder="User Name"
                              type="text"
                           ></v-text-field>
                             <v-text-field autocomplete="off" 
                           dense
                           required
                           hide-details
                           solo
                           v-model="password"
                           color="#494949"
                              name="login"
                              class="loginIPFields"
                              style="width:68%;background-color:white;margin: 5%;box-shadow: none;"
                              placeholder="Password"
                              @click:append="() => (hidePassword = !hidePassword)"                              
                               :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                              :type="hidePassword ? 'password' : 'text'"  
                           ></v-text-field>
                             <v-text-field autocomplete="off" 
                             v-model="organizationID"
                           dense
                           hide-details
                           solo
                           color="white"
                              name="login"
                              class="loginIPFields"
                              style="width:68%;background-color:white;margin: 5%;box-shadow: none;margin-bottom:0px"
                              placeholder="Organization ID"       
                              type="text" 
                           ></v-text-field>
                          <div  style="margin-left:5%;margin-top:4%;display:flex" >
                            <input type="checkbox" v-model="rememberme" id="remember_me" name="remember_me" style="margin-right: 2%;" v-bind:class="{'remember_me':!rememberme}">                            
                              <span id="checkboxLabel" class="normalFontSize">Remember Me</span>
                          </div>
<v-col cols="12" class="pa-0"  style="margin-left:5%;display:flex;margin-top: 4%;">
                          <v-btn 
                          @click="validateLogin"
                            style="width:15%;box-shadow:none;height: 4.8vh;border-radius: 2px;" color="white" >
                         <span class="normalFontSize blackC" style="text-transform: capitalize;letter-spacing: normal;"> Sign In</span>
                        </v-btn>
                        </v-col>
      <v-col cols="12" class="pa-0" style="margin-left:5%;display:flex;margin-top: 3%;">
                        <h5 class="normalFontSize" style="color:white;">Forgot Password ?</h5>
                      </v-col>
                         <v-col cols="12" class="pa-0" style="margin-left:5% !important;display:flex;margin-top: 1%;">
                        <h5 class="normalFontSize" style="color:white;">Dont have an Account? Sign Up</h5>
                      </v-col>
                          

                     
                 </div>
                 </v-flex>
                   
                
                 
               </v-flex>
            </v-layout>
            <v-layout>
                
               
            </v-layout>
            
                    
            
         </v-container>
         
      
    </div>
    <div class="floatright">

    <img src="../assets/loginbg.png"  alt="welcomeImg" class="img-icon"/>
    </div>
</div>

</template>

<script>
    export default {
        name: "Login",
        props: {
           
            
        },
        data () {
      return {
        rememberme:null,
        rules: {required: (value) => !!value || "Required."},
hidePassword:true,
userName:"",
password:"",
organizationID:""

      }},
        methods:{
          showPasswordText(){
          },
 async validateLogin(){

 
try{    
 sessionStorage.setItem("orgId",this.organizationID);        
            var res = await this.$apiService.post(`/login`,{username:this.userName,password:this.password,orgId:this.organizationID});
          
            if(res&&res.status === 200) {
if (res.data.data === null) {
        this.showError("Invalid Login Details");
              } 
              else{
        this.$store.commit("setLogin" , true); 
 
        if( 1 || res.data.data.length>0 ){
          sessionStorage.setItem("userDetails",JSON.stringify(res.data))
          this.$store.commit("setUserDetails" , res.data); 
          this.$router.push({ path: '/homescreen' });        
        }
        else{
          this.$router.push({ path: '/AddCompanyDetails' });
        } 

              }
            
            
        }
        
        }
        catch(error) {
         // this.showError("Unable to Get Company Details");
           }
    }
      

//  router.push({ path: '/user', params: { userId } })
    
    
        },
        mounted(){
    //         var element = document.getElementsByClassName("mdi-close-circle")[0];
    //         element.addEventListener('click', () => {
    //  this.$store.commit("setAlertText" , ""); 
    //     this.$store.commit("setShowAlert" , false); 
    // });
        },
      
}
</script>

<style scoped>

.remember_me[type="checkbox"]:before {
    position: relative;
    display: block;
    width: 13px;
    height: 13px;
    border: 1px solid #fff;
    content: "";
    background: #309ccc;
    box-shadow: none;
}

/deep/ .v-input__control {
    min-height: 5Vh !important;
}

/deep/ input{
  color: #404040 !important;
}

/deep/ .v-input--selection-controls__input .v-icon {
    color: #fff;
    font-size: 20px;
}

/* to remove the box shadow of drop down in AE dialog */
/deep/ .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot{
  box-shadow: none !important;
}

#checkboxLabel {
   color: white;   
}

/deep/ .mdi-eye::before {
    font-size: 18px;
    color: #9e9e9e;
    cursor: pointer;
}

/deep/.mdi-eye-off::before {
    font-size: 18px;
    color: #9e9e9e;
    cursor: pointer;
}

/deep/ .v-input input {
  font-size: 0.7rem !important;
  font-weight: 400 !important;
}
.loginHead{
  color:white;
  margin-top: 7vh;
    margin-bottom: 12vh;
font-style: normal;
font-weight: 400;
}
.loginSub{
  color:white;
  margin-left:20px;
}
.img-icon{
    width: 75%;
    height: 50%;
    margin-bottom: 5%;
}
.wrap {
width: 100%;
height:100%;
display: flex;
}

.floatleft, .floatright {
    background-color: #309CCC;
    height: 100%;
}
.floatleft{
width: 46%;
}

.floatright {
  display: flex;
    align-items: flex-end;
    justify-content: center;
    background-color: white;
    width: 54%;
}
   
</style>