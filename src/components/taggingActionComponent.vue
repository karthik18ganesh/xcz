<template >
           <div class="main-wrapper" >
<div class="btnRow">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon style="font-size:20px;" color="grey" v-bind="attrs" v-on="on" dark
                    >mdi-dots-vertical</v-icon
                  >
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-title @click="params.context.componentParent.openEditDialog(params.data.name,params.data)" style="cursor:pointer;padding:10px">Edit</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div> 
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  mounted(){
  }
});
</script>