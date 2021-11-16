<template >
           <div class="main-wrapper" >
            <v-autocomplete
              class="inputHeight"
              hide-details
              single-line
              v-model="params.data.level1"
              :items="params.context.componentParent.l1Options"
              @change="params.context.componentParent.ledgerLevel1Changed(params.data)"
              outlined
              dense
              item-text="name"
              item-value="name"
            >
            </v-autocomplete>
          </div> 
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  mounted(){
  }
});
</script>