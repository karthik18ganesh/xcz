<template >
<div style="width:100%">
           <div >
             <img 
              v-if="
                    params.context.componentParent.groupingSelected === false &&
                    params.context.componentParent.isRowGroupOpen[params.data.name]
                  "
              @click="() => params.context.componentParent.rowGroupHandler(params.data.name, 1)" 
                 src="../assets/ungroup.jpg" 
                  height="16"
                  width="16"
                  style="
                    position: relative;
                    cursor: pointer;
                    margin-left: 5px;float: center;
                  "
                  />
                  
                  <img
                  v-if="
                    params.context.componentParent.groupingSelected === false &&
                    !params.context.componentParent.isRowGroupOpen[params.data.name]
                  "
                  @click="() => params.context.componentParent.rowGroupHandler(params.data.name, 2)"
                  src="../assets/group.jpg"
                  height="16"
                  width="16"
                  style="
                    position: relative;
                    cursor: pointer;
                    margin-left: 5px;float: left;
                  "
                />
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