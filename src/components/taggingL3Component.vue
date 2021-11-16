<template >
           <div class="main-wrapper" >
            <v-autocomplete
              class="inputHeight"
              hide-details
              single-line
              v-model="params.data.level3"
              :items="params.data.level3Options"
              @change="params.context.componentParent.ledgerLevel3Changed(params.data)"
              :menu-props="{ maxWidth: '17.5vw' }"
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