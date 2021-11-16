<template >
           <div class="main-wrapper" >
<div class="btnRow">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon style="font-size:20px;" color="grey" v-bind="attrs" v-on="on" dark
                    >mdi-dots-vertical</v-icon
                  >
                </template>

               <v-list dense flat class="tile" style="text-align: left">
                                        <v-list-item dense
                                        >
                                            
                                <v-list-item-title @click="params.context.componentParent.openListDialog(params.data.name)" style="cursor:pointer;padding:10px"></v-list-item-title>
<img src="../assets/listledger.png">
                                            
                                        </v-list-item>

                                        <v-list-item dense>
                                            <v-list-item-title>
                                                Reclassify
                                            </v-list-item-title>
                                        </v-list-item>

                                        <v-list-item dense>
                                            <v-list-item-title>
                                            <add-explanation />
                                            </v-list-item-title>
                                        </v-list-item>

                                        <v-list-item dense>
                                            <v-list-item-title>
                                                <img src="../assets/insertrow.png">
                                            </v-list-item-title>
                                        </v-list-item>

                                        <v-list-item dense>
                                            <v-list-item-title>
                                                <img src="../assets/insertsubrow.png">
                                            </v-list-item-title>
                                        </v-list-item>

                                        <v-list-item dense>
                                            <v-list-item-title>
                                                <img src="../assets/deleterow.png" alt="">
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>                       
              </v-menu>
            </div>
          </div> 
</template>

<script>
import Vue from "vue";
import AddExplanation from "./AddExplanation.vue";

export default Vue.extend({
  components: { AddExplanation },
  mounted(){
  }
});
</script>