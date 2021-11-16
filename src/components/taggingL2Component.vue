<template >
           <div class="main-wrapper" >
            <v-autocomplete
              class="inputHeight"
              hide-details
              single-line
              v-model="params.data.level2"
              :items="params.data.level2Options"
              @change="params.context.componentParent.ledgerLevel2Changed(params.data)"
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