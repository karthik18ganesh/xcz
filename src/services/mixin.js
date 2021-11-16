const userPrivileges ={
 
}


import Swal from "sweetalert2/dist/sweetalert2.js";

// javascript-obfuscator:enable
 
 
// eslint-disable-next-line no-unused-vars
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,  
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

var myMixin = {
 
    methods: {
      async fetchUserDetails(){
        try{    
          console.log(this.$store.getters.userDetails,"try")      
          var user = JSON.parse(sessionStorage.getItem("userDetails"))
                    var res = await this.$apiService.post('/user/getUserDetails',{userID:user.data.id});
                    if(res&&res.status === 200) {
                       this.$store.commit("setUserData",res.data.userData[0]);
                       sessionStorage.setItem("userData",JSON.stringify(res.data.userData[0]))
        
                     
                    
        }
                         
                    
                }
                catch(error) {
                    console.log(error,"erro")
               
                   }
                
                },
                async fetchUserList(){
                  console.log(this.$store.getters.userData,"rash")
             try{          //change server
                              var res = await this.$apiService.post('/user/getlist',{organizationID:this.$store.getters.userData.organaizationid});
                              if(res&&res.status === 200) {
                                this.$store.commit("setUserList",res.data.data);
                                // console.log(res.data.data,"res.data.data")
                                // sessionStorage.removeItem("userList");
                                sessionStorage.setItem("userList",JSON.stringify(res.data.data)?JSON.stringify(res.data.data):[])
                              
                  }
                                   
                              
                          }
                          catch(error) {
                              console.log(error,"erro")
                         
                             }
                },
      getUserDetails(){        
        return this.$store.state.userDetails;
      },
      checkUserPrivilege(permissionObject) {       
    return this.$store.state.userDetails.PrivilegeID.includes(userPrivileges[permissionObject]);
      },
      getUserRole(){
        return this.$store.state.userDetails.RoleID;
      },
     
       
    
  
     
    
    showSuccess(msg){
      this.$fire({
        icon: 'success',
        title: msg,
        timer: 2000
      })      
    },
    showError(msg){
      // Toast.fire({
      //   icon: 'error',
      //   title: msg,
      //   timer: 4000
      // })  
      this.$store.commit("setAlertText" , msg); 
      this.$store.commit("setShowAlert" , true);
    }
    }
  }
  export var mixin = myMixin;