<template >
           <div class="main-wrapper" >
            <v-checkbox
            hide-details
            dense
            v-model="params.data.selected"
            @change="(e)=>params.context.componentParent.updateSelection(e,params.data)"
            ></v-checkbox>
          </div> 
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  mounted(){
  }
});
</script>